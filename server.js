const express = require('express');
const next = require('next');
const url = require('url');
const bodyParser = require("body-parser")
const dev = process.env.NODE_ENV !== 'production';
const path = require('path');

const port = process.env.PORT || 3000;
const app = next({ dev })
const handle = app.getRequestHandler()
const NextAuth = require("next-auth").default;

const CredentialsProvider =  require('next-auth/providers/credentials').default;
const  {compare}  =   require('bcryptjs');
const notesController = require('./controllers/notes')
const authController = require('./controllers/auth')


const nextApp = next({ dir: '.', dev });
  const nextHandler = nextApp.getRequestHandler();
  const cookieParser = require("cookie-parser");

  const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

nextApp.prepare()
    .then(() => {
  
      const server = express();
      server.use(bodyParser.json());
      server.use(cookieParser());
      server.use(bodyParser.urlencoded({ extended: true }));
      

      
      server.use(express.static(path.join(__dirname, 'public')));
    
    
      server.route('/api/register')
      .post(authController.register)

      server.route('/api/note')
      .post(notesController.add_note)
      .get(notesController.get_note)

      server.route('/api/note/:id')
      .delete(notesController.del_note)
      .put(notesController.upd_note)
      //auth
      const baseUrl = "/api/auth/";
      server.use((req, res, next) => {
        if (!req.url.startsWith(baseUrl)) {
            return next();
          }
        // Fill in the "nextauth" [catch all route parameter](https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes)
        req.query.nextauth = req.url // start with request url
          .slice(baseUrl.length) // make relative to baseUrl
          .replace(/\?.*/, "") // remove query part, use only path part
          .split("/"); // as array of strings
        NextAuth(req, res, options);
      });
      
      const options = {
        providers: [
        
            CredentialsProvider({
                // The name to display on the sign in form (e.g. 'Sign in with...')
                name: 'Password',
                // The credentials is used to generate a suitable form on the sign in page.
                // You can specify whatever fields you are expecting to be submitted.
                // e.g. domain, username, password, 2FA token, etc.
                credentials: {
                 
                  email: {
                    label: 'email',
                    type: 'email',
                    placeholder: 'jsmith@example.com',
                  },
                  password: {  label: "Password", type: "password" }
                },
                async authorize(credentials) {
               console.log(credentials.email)
               console.log(credentials.password)
               const email = credentials.email
      
                    const user = await prisma.user.findMany({
                      where: { email: email },
                     
                    });
                    console.log("user")
      
                    console.log(user)
                    console.log("user")
      
                    if (!user) {
                      
                     
                      throw new Error('No user found with the email');
                  }
                  
                  const checkPassword = await compare(credentials.password, user[0].password);
                  if (!checkPassword) {
                    
                    
                    throw new Error('Password doesnt match');
                }
               
                  
                  
                
                 
                if (user) {
                  
                      console.log("user")
                      console.log(user[0])
                      console.log("user")
                      prisma.$disconnect()
                  return user[0];
              }else {
                // If you return null then an error will be displayed advising the user to check their details.
                console.log("user[0]")
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
                    // prisma.$disconnect();
                    
                  
                  
            
             
                }
              }),
             
             
              
            ],
            secret: process.env.JWT_SECRET,
            callbacks: {
              async signIn({ user, account, profile, email, credentials }) {
                return true
              },
              async redirect({ url, baseUrl }) {
                return baseUrl
              },
              async session({ session, user, token }) {
                return session
              },
              async jwt({ token, user, account, profile, isNewUser }) {
                token.user = user
                return token
              }
        
          },
      

       
      };

      server.get('*', (req, res) => {
        // return handle(req, res)
        const parsedUrl = url.parse(req.url, true);
        nextHandler(req, res, parsedUrl);
        // if (req.subdomains) {
        //    app.render(req, res, `/ani`, req.query)
        //  } else {
        //    app.render(req, res, `/`, req.query)
        //  }
        
      })
      server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
    });