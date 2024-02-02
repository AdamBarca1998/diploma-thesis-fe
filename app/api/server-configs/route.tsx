import { ServerConfig, serverConfigFormSchema, serverSchema } from '@/types/server';
import { promises as fs } from 'fs';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

const FILE_PATH = `${process.cwd()}/server-configs.json`;
const VALIDATION_SCHEMA = serverConfigFormSchema;

export const POST = async (req: Request) => {
	const bodyJson = await req.json();

	try {
		const newConfig = VALIDATION_SCHEMA.parse(bodyJson);

		const configs = await readServersConfig();
		await writeServersConfig([...configs, newConfig]);

		const responseBody = {
			server: newConfig
		};

		revalidateTag('server-configs');
		return new Response(JSON.stringify(responseBody), {
			status: 201,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

export const GET = async (_: Request) => {
	try {
		return new Response(JSON.stringify(await readServersConfig()), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error(error);
		return new Response('Something went wrong GET /server-configs', { status: 500 });
	}
};

export const readServersConfig = async () => {
	const file = await fs.readFile(FILE_PATH, 'utf8');

	return parseServers(file);
};

const writeServersConfig = async (movies: ServerConfig[]) => {
	await fs.writeFile(FILE_PATH, JSON.stringify(movies));
};

const parseServers = (input: string) => z.array(VALIDATION_SCHEMA).parse(JSON.parse(input));
