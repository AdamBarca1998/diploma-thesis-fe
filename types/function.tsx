import { z } from "zod";
import { propertySchema } from "./property";

export const functionSchema = z.object({
    name: z.string().min(1),
	returnType: z.string().min(1),
    properties: propertySchema.array(),
});

export type Func = z.infer<typeof functionSchema>;
