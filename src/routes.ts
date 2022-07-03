import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c9c0a493836f8f",
      pass: "77213f48a0486d"
    }
  });

routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body

 const prismaFeedbacksRepository = new PrismaFeedbacksRepository() 
 const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository)

 await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
 })

   await transport.sendMail({
        from: 'Equipo Feedget <oi@feedget.com>',
        to: 'Luis Ortellado <luis@gmail.com>',
        subject: 'Nuevo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111; ">`,
        `<p>Tipo de feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
       `</div>`
    ].join('\n')
    })

    return res.status(201).json()
})
