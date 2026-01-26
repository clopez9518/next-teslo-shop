
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import type { User as NextAuthUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: NextAuthUser & DefaultSession["user"];
    }

    interface User {
        id: string;
        email: string;
        name?: string;
        role?: string;
        emailVerified: Date | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        data: NextAuthUser;
    }
}
