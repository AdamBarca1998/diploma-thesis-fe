import { z } from "zod";

export const serverEntityFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	url: z.string().url(),
});

export const serverEntitySchema = serverEntityFormSchema.extend({
	id: z.string()
});

export type ServerEntity = z.infer<typeof serverEntitySchema>;
export type ServerEntityForm = z.infer<typeof serverEntityFormSchema>;