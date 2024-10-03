import nodemailer from 'nodemailer';

export const sendEmail = (link, email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass:  process.env.PASSWORD
        }
    })

    const mailOption = {
        from : process.env.EMAIL,
        to : email,
        subject: "Verification Email",
        html:`<h2>Please click below to verify email</h2>
        <a href=${link}>VERIFY</a>
        `
    }

    transporter.sendMail(mailOption, (error, info) => {
        if(error){
            console.log("Error SendMail",error.message)
        }else{
            console.log("email sent",info.response);
            res.status(200).json({info})
        }
    })

}

