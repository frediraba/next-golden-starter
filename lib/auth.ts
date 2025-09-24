// Selgitus algajale:
// - Kasutame NextAuth (Auth.js v5) GitHubi OAuth pakkujaga.
// - Sessioon salvestub JSON Web Tokenina (JWT), seega DB't pole vaja.
// - Tulevikus saad siia lisada rollid, profiili väljad, adapteri (Prisma/Drizzle) jne.

import type { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";

export const authConfig: NextAuthOptions = {
  providers: [
    // GitHub OAuth – vajab GITHUB_ID ja GITHUB_SECRET .env failis
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    // jwt(): saad siia lisada rollid/claimid kui hiljem vajad
    async jwt({ token }) {
      return token;
    },
    // session(): rikastame sessiooni (nt token.sub -> user.sub)
    async session({ session }) {
      return session;
    },
  },
};
