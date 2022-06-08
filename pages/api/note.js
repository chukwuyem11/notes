import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (req.method === 'GET'){
        if (session){
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
               include: {
                notes: true
               }
              });
              prisma.$disconnect()
            res.json(user);
        } else {
            res.status(422).json({ message: 'Not logged in' });
        }
        
       }

       if (req.method === 'POST'){
        const {
            title,
             body,
             color
            } = req.body;
        if (session){
            const user = await prisma.user.findUnique({
                where: { email: session.user.email },
               
              });

              const note = await prisma.note.create({
                data: {
                    title,
             body,
             color,
             user: {
                connect: {
                  id: user.id,
                },
              },
                  },
              })
              prisma.$disconnect()
            res.json(note);
        } else {
            res.status(422).json({ message: 'Not logged in' });
        }
       }

       
  }
  