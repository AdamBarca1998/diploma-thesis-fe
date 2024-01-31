import { revalidateTag } from 'next/cache';

export const GET = async (_: Request) => {
	revalidateTag('all');

	return new Response(JSON.stringify(true), {status: 200});
};
