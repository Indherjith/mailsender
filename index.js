const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send('mailsender is ready to send mail!')
});

app.post("/sendmail",async(req,res)=>{
    const {name,email,htmlcontent,subject,ticket,textContent,invoice} = req.body;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", 
        port: 587,                
        secure: false,            
        auth: {
            user: 'buvanesifet26@gmail.com', 
            pass: 'jfqm cryc neld xjaz'       
        }
    });

    let mailOptions = {
        from: '"Ticket Booking" <buvanesifet26@gmail.com>',
        to: email,
        subject: subject || 'Confirmation of Your Tickets',
        text: textContent || `Dear ${name},\nThank you for purchasing tickets! We are excited to have you join us for an unforgettable celebration at one of the most anticipated events of the year.\n\nTicket Booking,\nCustomer Service Team\n8072454199, buvanesifet26@gmail.com.`,
        html: htmlcontent || '',
        attachments: [
            {
                filename: 'ticket.jpg',
                path: ticket // URL of the ticket image
            },
            {
                filename: 'invoice.jpg',
                path: invoice // URL of the invoice image
            }
        ]
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        res.sendStatus(200);
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        res.sendStatus(500);
    }
})

app.listen(8080,()=>{
    console.log("Server running on port 8080!");
});