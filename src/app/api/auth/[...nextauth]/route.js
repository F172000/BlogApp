import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const filePath = path.join(process.cwd(), "public", "auth.json");
        const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const user = users.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          return { email: user.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "https://blog-app-phi-sand.vercel.app/auth"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };