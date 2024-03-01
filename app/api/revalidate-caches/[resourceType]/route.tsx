import { revalidateTag } from "next/cache";

export const GET = async (
	_: Request,
	{ params }: { params: { resourceType: string } }
) => {
	revalidateTag(params.resourceType);

	return new Response(JSON.stringify(true), {status: 200});
};
