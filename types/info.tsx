import { z } from "zod";
import { propertySchema } from "./property";

export const infoSchema = z.object({
    type: z.string().min(1),
    properties: propertySchema.array(),
    enums: z.string().array(),
});

export type Info = z.infer<typeof infoSchema>;