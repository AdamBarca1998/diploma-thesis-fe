import { z } from "zod";

export const propertySchema = z.object({
    name: z.string().min(1),
	type: z.string().min(1),
    value: z.any(),
    validations: z.string().array(),
});

export type Property = z.infer<typeof propertySchema>;