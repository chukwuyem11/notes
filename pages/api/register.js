import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {

    if (req.method === 'POST'){
    const {
        name,
         email,
         password
        } = req.body;
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' });
            return;
        }
        const post = await prisma.user.create({
         data: {
           name,
             email : email,
             password: await hash(password, 12),
         }
        });
        res.status(201).json({ message: 'User created', ...post })
        res.json(post);
        prisma.$disconnect();}
  }
  