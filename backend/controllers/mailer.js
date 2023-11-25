import nodemailer from "nodemailer";
import Mailgen from "mailgen";


const sendMail = (req, res) => {
    console.log("email",process.env.REACT_APP_EMAIL)
    var {username,text,subject}=req.body;
    var decodedEmail = decodeURIComponent(req.body.email);
    var email=decodedEmail||email;
    let con={
        service:"gmail",
        auth:{
            user:process.env.REACT_APP_EMAIL,
            pass:process.env.REACT_APP_PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(con);

    let mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "TravelHub",
            link: "https://mailgen.js/",
        },
    });

    var response={
        body:{
            name:username,
            intro: text||"Welcome to our Website",
            outro:"Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }
    var emailBody = mailGenerator.generate(response);
    let message={
        from:process.env.REACT_APP_EMAIL,
        to:email,
        subject:subject||"Welcome",
        html:emailBody
    }
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({message:"Email sent"});
    })
    .catch((err)=>{
        return res.status(500).send(err.message);
    })
}
export default sendMail;