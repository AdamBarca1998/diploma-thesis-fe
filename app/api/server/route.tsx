import { promises as fs } from 'fs';
import { ServerEntity, serverEntitySchema } from "@/types/server-entity";
import { randomUUID } from "crypto";
import { z } from 'zod';

export const POST = async (req: Request) => {
	const bodyJson = await req.json();

	try {
		bodyJson.id = randomUUID();
		const newMovie = serverEntitySchema.parse(bodyJson);

		const movies = await readMovies();
		await writeMovies([...movies, newMovie]);

		const responseBody = {
			movie: newMovie
		};

		return new Response(JSON.stringify(responseBody), {
			status: 201,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.log(error);
		return new Response('Something went wrong', { status: 500 });
	}
};

const readMovies = async () => {
	const file = await fs.readFile(`${process.cwd()}/movies.json`, 'utf8');

	return parseMovies(file);
};

const writeMovies = async (movies: ServerEntity[]) => {
	await fs.writeFile(`${process.cwd()}/movies.json`, JSON.stringify(movies));
};

const parseMovies = (input: string) => z.array(serverEntitySchema).parse(JSON.parse(input));