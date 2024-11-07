import * as z from 'zod';
import { tempSchema } from '../TempForm/tempSchema';

export const jobSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    startDate: z.string().nullable().optional(),
    endDate: z.string().nullable().optional(),
    temps: z.array(tempSchema).nullable().optional()
});

export type JobFormData = z.infer<typeof jobSchema>;