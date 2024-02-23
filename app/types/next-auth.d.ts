import NextAuth, { DefaultSession } from "next-auth"
import { Employee } from "../lib/definitions"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  type EmployeeWithoutPassword = Omit<Employee, 'password'>;
  interface Session {
    user: EmployeeWithoutPassword
  }
}