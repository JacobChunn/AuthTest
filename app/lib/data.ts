import { unstable_noStore as noStore } from 'next/cache';
import { Employee, Timesheet } from './definitions';
import { sql } from '@vercel/postgres';

export async function fetchTimesheetsbyEmployeeID(employeeID: number) {
	noStore();
	try {
	  const data = await sql<Timesheet>`
      SELECT *
      FROM timesheets
      WHERE employeeid = ${employeeID};      
	  `;
  
	  const timesheets = data.rows;
  
	  console.log(timesheets);
	  return timesheets;
	} catch (error) {
	  console.error('Database Error:', error);
	  throw new Error('Failed to fetch timesheets by ID.');
	}
}

export async function fetchEmployeeByCredentials(username: string, password: string) {
	noStore();
	try {
	  const data = await sql<Employee>`
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
  
	  const employee = data.rows;
  
	  console.log(employee);
	  return employee[0];
	} catch (error) {
	  console.error('Database Error:', error);
	  throw new Error('Failed to fetch invoice.');
	}
}

export async function fetchEmployeeByID(id: number) {
	noStore();
	try {
	  const data = await sql<Employee>`
		SELECT
			id, number, username,
			password, firstName, lastName,
			cellPhone, homePhone, email,
			managerID, accessLevel, timeSheetRequired,
			overtimeEligible, TABNavigateOT, emailExpenseCopy,
			activeEmployee, iEnterTimeData, numTimeSheetSummaries,
			numExpenseSummaries, numDefaultTimeRows, contractor
		FROM employees
		WHERE employees.id = ${id};
	  `;
  
	  const employee = data.rows;
  
	  console.log(employee);
	  return employee[0];
	} catch (error) {
	  console.error('Database Error:', error);
	  throw new Error('Failed to fetch invoice.');
	}
}