import dotenv from 'dotenv'
dotenv.config()


import { type RequestHandler, type RequestEvent } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { User, type UserInterface } from './models/models.js';
import { useDB } from './db.js';
import { Types } from 'mongoose';

type DugDemoResponse = {
    message?: string
    status?: number
    error?: boolean
    data?: any
}

type DugdemoRequestHandlerContext = {
    user?: UserInterface | null
}

type DugdemoRequestHandlerOptions = {
    findUserData?: boolean
    populateUser?: boolean
    mustBeAdmin?: boolean
    mustBeVerified?: boolean
}


type SvelteKitRequestEvent = RequestEvent<Partial<Record<string, string>>, string | null>;

type DugdemoRequestHandlerCallback = (evt: SvelteKitRequestEvent, ctx: DugdemoRequestHandlerContext) => DugDemoResponse | Promise<DugDemoResponse>

export const createDugdemoRequestHandler = (callback: DugdemoRequestHandlerCallback, options?: DugdemoRequestHandlerOptions): RequestHandler => {
    return async (evt) => {
        // Logger
        log(evt)


        try {
            // Must be admin
            if (options?.mustBeAdmin) {
                if (evt.request.headers.get('x-admin') !== process.env.ADMIN_PWD) throw {
                    message: "You must be an admin to do this.",
                    status: 401
                }
            }

            await useDB()
            const ctx = await getContext(evt, options)
            const dugDemoResponse = await callback(evt, ctx)
            if (dugDemoResponse.error) throw dugDemoResponse;

            return Response.json({
                message: dugDemoResponse.message,
                data: dugDemoResponse.data
            }, {
                status: dugDemoResponse.status || 200
            })
        } catch (error) {
            console.log(error)
            return Response.json({
                message: (error as any)?.message || "Internal server error.",
                error: true
            }, {
                status: (error as any)?.status || 500
            })
        }
    }
}

const getContext = async (evt: SvelteKitRequestEvent, options: DugdemoRequestHandlerOptions = {}): Promise<DugdemoRequestHandlerContext> => {
    const ctx: DugdemoRequestHandlerContext = {}

    if (options.findUserData) {
        ctx.user = await tryFindingUserData(evt)
    }

    if (options.mustBeVerified) {
        if (!ctx.user?.verified) throw {
            status: 401,
            message: "You must be verified to do this."
        }
    }

    return ctx
}

const tryFindingUserData = async (evt: SvelteKitRequestEvent): Promise<UserInterface | null> => {
    const token = evt.cookies.get('dugdemotoken') || evt.request.headers.get('x-token')
    if (!token) return null;
    const payload = tryParsingToken(token);
    if (!payload) return null;
    const user = await User.findById(payload._id).lean()
    return user || null
}

const tryParsingToken = (token: string): jwt.JwtPayload | null => {
    try {
        // environment
        if (!process.env.JWT_SECRET) {
            console.error(`MISSING JWT SECERET!!!`)
            throw { status: 503, message: `Database down.` }
        }

        // payload
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof payload === 'string') return null;
        return payload;

    } catch (error) {
        console.log(`Failed parsing token`, error)
        return null
    }
}

const log = (evt: SvelteKitRequestEvent) => {
    console.log("-----")
    console.log(`${evt.request.method} @ ${evt.request.url}`)
}
