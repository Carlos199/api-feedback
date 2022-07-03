import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'


const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c9c0a493836f8f",
      pass: "77213f48a0486d"
    }
  });

app.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body

 const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    })

   await transport.sendMail({
        from: 'Equipo Feedget <oi@feedget.com>',
        to: 'Luis Ortellado <luis@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111; ">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
       `</div>`
    ].join('\n')
    })

    return res.status(201).json({ data : feedback })
})

app.listen(3333, () =>{
    console.log('hola')
})