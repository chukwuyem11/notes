import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/react"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const session = await getSession({ req })
  
    const postId = req.query.id;

       if (req.method === 'DELETE'){
        
        if (session){
            const note = await prisma.note.delete({
                where: { id: Number(postId)  },
               
              });

              
              prisma.$disconnect()
            res.json(note);
        } else {
            res.status(422).json({ message: 'Not logged in' });
        }
       }

       if (req.method === 'PUT'){
        const {
            title,
             body,
             color
            } = req.body;
        if (session){
            const note = await prisma.note.update({
                where: { id: Number(postId)  },
                data: {
                    title,
             body,
             color,}
              });

              
              prisma.$disconnect()
            res.json(note);
        } else {
            res.status(422).json({ message: 'Not logged in' });
        }
       }
  }
  