import { z } from "zod";

const basePropertySchema = z.object({
    name: z.string().min(1),
	description: z.string(),
	type: z.string().min(1),
    value: z.any(),
    validations: z.string().array(),
});

export type Property = z.infer<typeof basePropertySchema> & {
    properties: Property[];
};
  
export const propertySchema: z.ZodType<Property> = basePropertySchema.extend({
    properties: z.lazy(() => propertySchema.array()),
});