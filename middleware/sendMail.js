import {createTransport } from "nodemailer"


export const sendMail = async(text)=>{
    const transporter = createTransport({
            host: process.env.SMPT_Host,
            port:process.env.SMPT_Port,
            auth: {
              user: process.env.SMPT_User,
              pass: process.env.SMPT_Password
            }
    })

    await transporter.sendMail({
        subject:"CONTACT REQUEST FROM PORTFOLIO",
        to:process.env.MyMail,
        from:process.env.MyMail,
        text:text
    })
}