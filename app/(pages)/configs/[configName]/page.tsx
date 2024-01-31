import { fetchResourcesByConfigName } from "@/api-utils/servers";
import { Resource } from "@/types/resource";
import Link from "next/link";

const ResourcesPage = async ({ 
    params 
} : { 
    params: { configName: string } 
}) => {

    const name = decodeURIComponent(params.configName.replace(/\+/g, ' '));
    const server = await fetchResourcesByConfigName(name);

	return (
		<>
            <h1 className="text-4xl font-bold over-ellipsis">{name}</h1>

            <p className="text-neutral-500 over-ellipsis">{server?.config.url}</p>

            <div className="flex flex-wrap gap-4">
                {server?.resources.map((resource) => (
                    <ResourceItem resource={resource} key={resource.name + resource.type + 'resourceItem'} />
                ))}
            </div>
        </>
	);
};

async function ResourceItem({ resource }: { resource: Resource }) {

    const itemUrl = `/configs/${resource.name}`;
  
    return (
      <Link href={`${itemUrl}`}>
        <div className="my-8">
          <div className="card w-64 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                <p className="over-ellipsis">{resource.name}</p>
              </h2>
              <p className="text-gray-500 over-ellipsis">{resource.type}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

export default ResourcesPage;