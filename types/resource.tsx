import { z } from "zod";
import { propertySchema } from "./property";
import { functionSchema } from "./function";

export const resourceSchema = z.object({
	name: z.string().min(1),
	description: z.string(),
	icon: z.string(),
	periodTimeMs: z.number(),
	type: z.string().min(1),

	properties: propertySchema.array(),
	functions: functionSchema.array(),
	validations: z.string().array()
});;

export type Resource = z.infer<typeof resourceSchema>;