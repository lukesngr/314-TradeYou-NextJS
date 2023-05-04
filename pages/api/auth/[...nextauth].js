import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient, findUnique } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {username: {label: 'username',type: 'text'},
      password: { label: 'password', type: 'password' }},
      async authorize(credentials) {
          const { userName, userPassword } = credentials;
          const userNameToBeVerified = userName;
          const userPasswordToBeVerified = userPassword;
          let userType = "user";
          let passwordHash = await prisma.tradeYouUser.findUnique({
            where: {
              username: userNameToBeVerified,
            },
            select: {
               password: true,
            }
          });

          if(passwordHash === null) {
             passwordHash = await prisma.tradeYouProfessional.findUnique({
              where: {
                username: userNameToBeVerified,
              },
              select: {
                 password: true,
              }
            });
            userType = "professional";
          }

          if(passwordHash === null) {
            passwordHash = ""; //just setting it to something so doesn't cause error
          }
          
          const passwordCorrect = await bcrypt.compare(userPassword, passwordHash.password);

          if(passwordCorrect) {
            return {username: userNameToBeVerified, userCategory: userType};
          }else{
            return null;
          }
        
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;  // Setting token in session
      return session;
    },
  },
  pages: {
    signIn: "/login",  
  },
  secret: process.env.JWT_SECRET,
})

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}