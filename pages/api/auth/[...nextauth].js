import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcryptjs';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({

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
   
    })
