import * as z from 'zod';

export const schema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional()
});

export type JobFormData = z.infer<typeof schema>;