import { readServersConfig } from "../route";

export const GET = async (
	_: Request,
	{ params }: { params: { configName: string } }
) => {
	try {
		const configs = await readServersConfig();

		return new Response(JSON.stringify(configs.find(e => e.name === params.configName)), { status: 200 });
	} catch (error) {
		console.error(error);

		return new Response('Something went wrong', { status: 500 });
	}
};