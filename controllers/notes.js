const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();
const getSession =  require ("next-auth/react").getSession
const notesController = {
  get_note: async (req, res) => {
    const session = await getSession({ req })
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
    
    prisma.$disconnect();
  },

  add_note: async (req, res) => {
    const session = await getSession({ req })
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
    
    prisma.$disconnect();
  },

  del_note: async (req, res) => {
    const session = await getSession({ req })
    if (session){
        const postId = req.params.id;
        const note = await prisma.note.delete({
            where: { id: Number(postId)  },
           
          });

          
          prisma.$disconnect()
        res.json(note);
    } else {
        res.status(422).json({ message: 'Not logged in' });
    }
    
    prisma.$disconnect();
  },

  upd_note: async (req, res) => {
    const session = await getSession({ req })
    const {
        title,
         body,
         color
        } = req.body;
    if (session){
      const postId = req.params.id;
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
    
    prisma.$disconnect();
  },

  
};

module.exports = notesController;
