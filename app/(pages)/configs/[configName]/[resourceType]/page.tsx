import { fetchResourceByConfigAndType, fetchServerConfigByName } from "@/api-utils/servers";
import { FuncForm } from "@/app/_components/form/types/func-form";
import { Func } from "@/types/function";

const MovieServerConfigPage = async ({ 
    params 
} : { 
    params: { configName: string, resourceType: string } 
}) => {

    const name = decodeURIComponent(params.configName.replace(/\+/g, ' '));
    const config = await fetchServerConfigByName(name);
    const resource = await fetchResourceByConfigAndType(config, params.resourceType);

    return (
        <>
            <div className="flex space-x-4 text-4xl">
                <i className={`${resource?.icon != "" ? resource?.icon : "fa-brands fa-sourcetree"}`}></i>
                <h1 className="font-bold over-ellipsis">{resource?.name}</h1>
            </div>

            <p className="text-neutral-500 over-ellipsis">{resource?.description}</p>

            {resource?.functions.map((func) => (
                <div className="flex flex-col w-full" key={func.name + func.returnType + 'FunctionItem'}>
                    <FunctionItem 
                        func={func}
                        url={`${config.url}/${resource.type}`}
                    />
                </div>
            ))}
        </>
    );
};

async function FunctionItem({ func, url }: { func: Func, url: string }) {
  
    return (
        <div className="mt-8 grid card mockup-code" id={`${func.name}`}>
            <div className="m-8">
                <h2 className="text-3xl font-bold over-ellipsis">{func.name}</h2>

                <FuncForm func={func} url={url}></FuncForm>
            </div>
        </div>
    );
}

export default MovieServerConfigPage;
