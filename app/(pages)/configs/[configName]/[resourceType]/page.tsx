import { fetchResourceByConfigAndType, fetchResources, fetchResourcesByConfigName, fetchServerConfigByName } from "@/api-utils/servers";
import { Function } from "@/types/function";

const MovieServerConfigPage = async ({ 
    params 
} : { 
    params: { configName: string, resourceType: string } 
}) => {

    const name = decodeURIComponent(params.configName.replace(/\+/g, ' '));
    const config = await fetchServerConfigByName(name);

    if (config) {
        const resource = await fetchResourceByConfigAndType(config, params.resourceType);

        return (
            <>
                <h1 className="text-4xl font-bold over-ellipsis">{params.resourceType}</h1>

                <p className="text-neutral-500 over-ellipsis">{config.name}</p>

                {resource?.functions.map((func) => (
                    <div className="flex flex-col w-full" key={resource.name + resource.type + 'FunctionItem'}>
                        <FunctionItem 
                            func={func}
                        />
                    </div>
                ))}
            </>
        );
    }
};

async function FunctionItem({ func }: { func: Function }) {
  
    return (
        <div className="my-8 grid card bg-base-100" id={`${func.name}`}>
            <div className="m-8">
                <h2 className="text-3xl font-bold over-ellipsis">{func.name}</h2>
            </div>
        </div>
    );
}

export default MovieServerConfigPage;