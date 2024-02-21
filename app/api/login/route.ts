import { Employee } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import * as bcrypt from 'bcrypt';

interface RequestBody {
    username: string;
    password: string;
}
export async function Post(request:Request) {
    const body:RequestBody = await request.json();

    const user = await sql<Employee>`
    SELECT
        id, number, username,
        password, firstName, lastName,
        cellPhone, homePhone, email,
        managerID, accessLevel, timeSheetRequired,
        overtimeEligible, TABNavigateOT, emailExpenseCopy,
        activeEmployee, iEnterTimeData, numTimeSheetSummaries,
        numExpenseSummaries, numDefaultTimeRows, contractor
    FROM employees
    WHERE employees.id = ${body.username};
  `;

  if (user && ( await bcrypt.compare(body.password, user.rows[0].password))) {
    const {password, ...userWithoutPass} = user.rows[0];
    return new Response(JSON.stringify(userWithoutPass));
  }
  else return new Response(JSON.stringify(null));
}