import { z } from "zod";
import { propertySchema } from "./property";

export const functionSchema = z.object({
    name: z.string().min(1),
	description: z.string(),
	returnType: z.string().min(1),
    properties: propertySchema.array(),
    validations: z.string().array(),
});

export type Function = z.infer<typeof functionSchema>;
