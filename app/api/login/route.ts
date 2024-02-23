import { Employee } from "@/app/lib/definitions";
import { EmployeeUserPass } from "@/app/zod/employee";
import { sql } from "@vercel/postgres";
import * as bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

interface RequestBody {
    username: string;
    password: string;
}
export async function POST(request: Request) {
    const body: RequestBody = await request.json();

    const validatedFields = EmployeeUserPass.safeParse({
        username: body.username,
        password: body.password,
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        console.log(validatedFields.error)
        return NextResponse.json({ error: 'Invalid Data Error' }, { status: 500 })
    }

    const { username, password } = validatedFields.data;

    try {
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
        WHERE employees.username = ${username};
        `;

        if (user.rows.length && (await bcrypt.compare(password, user.rows[0].password))) {
            const { password, ...userWithoutPass } = user.rows[0];
            return new Response(JSON.stringify(userWithoutPass));
        }
        else return new Response(JSON.stringify(null));

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Database Error' }, { status: 500 })
    }


}