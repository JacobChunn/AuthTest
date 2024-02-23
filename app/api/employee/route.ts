import { EmployeeNoID } from "@/app/zod/employee";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import * as bcrypt from 'bcrypt';

//TODO, add check to make sure employee username is not already taken (It will still make a new one now and just not be accessable)

interface RequestBody {
    number: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    cellphone: string;
    homephone: string;
    email: string;
    managerid: number;
    accesslevel: number;
    timesheetrequired: boolean;
    overtimeeligible: boolean;
    tabnavigateot: boolean;
    emailexpensecopy: boolean;
    activeemployee: boolean;
    ientertimedata: boolean;
    numtimesheetsummaries: number;
    numexpensesummaries: number;
    numdefaulttimerows: number;
    contractor: boolean;
}

export async function POST(request: Request) {
    const body:RequestBody = await request.json();

    const validatedFields = EmployeeNoID.safeParse({
        number: body.number,
        username: body.username,
        password: body.password,
        firstname: body.firstname,
        lastname: body.lastname,
        cellphone: body.cellphone,
        homephone: body.homephone,
        email: body.email,
        managerid: body.managerid,
        accesslevel: body.accesslevel,
        timesheetrequired: body.timesheetrequired,
        overtimeeligible: body.overtimeeligible,
        tabnavigateot: body.tabnavigateot,
        emailexpensecopy: body.emailexpensecopy,
        activeemployee: body.activeemployee,
        ientertimedata: body.ientertimedata,
        numtimesheetsummaries: body.numtimesheetsummaries,
        numexpensesummaries: body.numexpensesummaries,
        numdefaulttimerows: body.numdefaulttimerows,
        contractor: body.contractor,
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log(validatedFields.error)
      return NextResponse.json({ error: 'Invalid Data Error' }, { status: 500 })
    }

    const {password, ...otherFields} = validatedFields.data;

    const {number, username, firstname, lastname, cellphone, homephone,
        email, managerid, accesslevel, timesheetrequired, overtimeeligible, tabnavigateot,
        emailexpensecopy, activeemployee, ientertimedata, numtimesheetsummaries,
        numexpensesummaries, numdefaulttimerows, contractor
    } = otherFields;

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

    console.log(hashedPassword);
    try {
        await sql`
        INSERT INTO employees (
          number, username, password, firstname, lastname, cellphone, homephone,
          email, managerid, accesslevel, timesheetrequired, overtimeeligible, tabnavigateot,
          emailexpensecopy, activeemployee, ientertimedata, numtimesheetsummaries,
          numexpensesummaries, numdefaulttimerows, contractor
        )
        VALUES (
          ${number}, ${username}, ${hashedPassword}, ${firstname}, ${lastname},
          ${cellphone}, ${homephone}, ${email}, ${managerid}, ${accesslevel},
          ${timesheetrequired ? 1 : 0}, ${overtimeeligible ? 1 : 0}, ${tabnavigateot ? 1 : 0},
          ${emailexpensecopy ? 1 : 0}, ${activeemployee ? 1 : 0}, ${ientertimedata ? 1 : 0},
          ${numtimesheetsummaries}, ${numexpensesummaries}, ${numdefaulttimerows},
          ${contractor ? 1 : 0}
        )
      `;
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Database Error' }, { status: 500 })
      }

    return new Response(JSON.stringify(otherFields));
}