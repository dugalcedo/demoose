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

export async function sendResetEmail(to: string, code: string) {
    try {
        const url = `${process.env.URL}/resetPassword/${code}`
        await transporter.sendMail({
            from: `"Dug the moose from Demoose" <${process.env.EMAIL_USER}>`,
            to,
            subject: "Reset your Demoose password",
            html: `
                <p>If you're receiving this email, it's because you or somebody else is trying to reset the password on your Demoose account. If it wasn't you, just ignore this email. If it was you, and you want to reset your password, click here:</p>
                <a href="${url}">${url}</a>
            `
        })
    } catch (error) {
        console.log("vvv ERROR SENDING EMAIL vvv")
        console.log(error)
        console.log("^^^ ERROR SENDING EMAIL ^^^")
        throw error
    }
}