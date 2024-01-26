import { z } from "zod";
import { resourceSchema } from "./resource";

export const serverStateSchema = z.enum([
	'Error',
	'Success',
]);

export type ServerState = z.infer<typeof serverStateSchema>;

// server schema for servers-config.json

export const serverConfigFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	url: z.string().url(),
});;

export type ServerConfig = z.infer<typeof serverConfigFormSchema>;

// server schema for app

export const serverSchema = z.object({
	config: serverConfigFormSchema,
	resources: resourceSchema.array(),
	state: serverStateSchema
});

export type AppServer = z.infer<typeof serverSchema>;