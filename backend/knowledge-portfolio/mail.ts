import { createTransport } from "nodemailer";

const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function makeEmail(text: string): string {

    return`
        <div style="
            border:1px solid black;
            padding: 20px;
            font-family: sans-serif;
            font-size: 20px;
        ">
        <h2>Password Reset</h2>
        <p>${text}</p>
    `
}

export async function sendPasswordResetEmail(resetToken: string, to: string): Promise<void> {
    //Email user the token
    const info = await transport.sendMail({
        to,
        from: "test@example.com",
        subject: 'Your password reset token',
        html: makeEmail(`Here is your password reset token
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset your password</a>
        `)
    })
}