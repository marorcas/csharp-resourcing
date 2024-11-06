import * as z from 'zod';

export const schema = z.object({
    firstName: z.string(),
    lastName: z.string()
});

export type TempFormData = z.infer<typeof schema>;