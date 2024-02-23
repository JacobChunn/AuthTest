import { z } from 'zod';

export const EmployeeSchema = z.object({
	id: z.coerce.number(),
	number: z.coerce.number(),
	username: z.string().max(50),
	password: z.string().max(24),
	firstname: z.string().max(50),
	lastname: z.string().max(50),
	cellphone: z.string().max(32),
	homephone: z.string().max(32),
	email: z.string().max(50),
	managerid: z.coerce.number(),
	accesslevel: z.coerce.number(),
	timesheetrequired: z.coerce.boolean(),
	overtimeeligible: z.coerce.boolean(),
	tabnavigateot: z.coerce.boolean(),
	emailexpensecopy: z.coerce.boolean(),
	activeemployee: z.coerce.boolean(),
	ientertimedata: z.coerce.boolean(),
	numtimesheetsummaries: z.coerce.number(),
	numexpensesummaries: z.coerce.number(),
	numdefaulttimerows: z.coerce.number(),
	contractor: z.coerce.boolean(),
});

export const EmployeeNoID = EmployeeSchema.omit({ id: true });
export const EmployeeUserPass = EmployeeSchema.pick({ username: true, password: true});