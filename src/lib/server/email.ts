import dotenv from 'dotenv'
dotenv.config()

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.URL) {
    console.warn(`!!! MISSING ENVIRONMENT VARIABLES FOR NODEMAILER !!!`)
}

import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export async function sendValidationCode(to: string, code: string) {
    try {
        await transporter.sendMail({
            from: `"Dug the moose from Demoose" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: "Verify your email with Demoose",
            html: `
                <p>Verify your Demoose account by clicking the following link:</p>
                <a href="${process.env.URL}/verify/${code}">${process.env.URL}/verify/${code}</a>
            `
        })
    } catch (error) {
        console.log("vvv ERROR SENDING EMAIL vvv")
        console.log(error)
        console.log("^^^ ERROR SENDING EMAIL ^^^")
        throw error
    }
}