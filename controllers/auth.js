const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
const { hash } = require('bcryptjs');

const authController = {
  register: async (req, res) => {
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
    
    prisma.$disconnect();
  },

  

  
};

module.exports = authController;
