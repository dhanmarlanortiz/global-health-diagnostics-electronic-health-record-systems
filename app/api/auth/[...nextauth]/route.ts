import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

declare module 'next-auth' {
    interface User {
      id: number;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Username' },
                password: { label: 'Password', type: 'password', placeholder: 'Password' }
            },
            async authorize(credentials, req) {
                if(!credentials?.username || !credentials.password) return null;

                const user = await prisma.user.findUnique({ 
                    where: { username: credentials.username }
                });

                if(!user) return null

                const passworsMatch = await bcrypt.compare(
                    credentials.password, 
                    user.hashedPassword!
                );

                return passworsMatch ? user : null;
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
