// App Routeri Route Handler, mis registreerib NextAuthi endpointid (signin, callback, signout).
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth";

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
