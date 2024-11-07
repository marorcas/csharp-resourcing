import * as z from 'zod';

export const tempSchema = z.object({
    firstName: z.string().min(2, { message: "First name is required" }),
    lastName: z.string().min(2, { message: "Last name is required" })
});

export type TempFormData = z.infer<typeof tempSchema>;