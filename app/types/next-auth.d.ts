import NextAuth, { DefaultSession } from "next-auth";
import { Employee } from "../lib/definitions";

export declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */


	type EmployeeWithoutPassword = Omit<Employee, "password">;

	interface Session {
		user: {
			username: string;
		};
	}

	interface User {
		username: string;
	}
	
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		username: string;
	}
}