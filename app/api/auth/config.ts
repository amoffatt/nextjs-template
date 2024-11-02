import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import EmailProvider from "next-auth/providers/email";
import { AuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { sendVerificationRequest } from "./email"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

let providers = []

if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  providers.push(GithubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }))
}

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  providers.push(GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }))
}

if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.EMAIL_FROM) {
  providers.push(EmailProvider({
    server: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    },
    from: process.env.EMAIL_FROM,
    sendVerificationRequest
  }))
}


export const authOptions:AuthOptions = {
  // debug: true,
  providers: providers,
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  // pages: {
  //   signIn: "/enter",
  //   verifyRequest: "/enter?message=welcome",
  //   error: "/enter",
  // },
  // callbacks: {
  //   async signIn({ user, account, profile }) {
  //     const email = user?.email
  //     if (!email) {
  //       throw new Error("no-email")
  //     }
  //     const user = await fetchUserByEmail(email)
  //     if (!user) {
  //       throw new Error("no-user")
  //     }
  //     return true
  //   }
  // },
  session: {
    // strategy: "jwt",
    // maxAge: 60 * 60 * 24 * 30, // 30 days
  },
}