import { fetchServerConfigByName } from "@/api-utils/server-config-api";
import { fetchResourceByConfigAndType } from "@/api-utils/server-managment-api";
import { AttrFormProvider } from "@/app/_components/form/types/providers/attr-form-provider";
import { FuncForm } from "@/app/_components/form/types/func-form";
import { FuncFormProvider } from "@/app/_components/form/types/providers/func-form-provider";
import { InputComponent } from "@/app/_components/form/types/input-component";
import { UrlProvider } from "@/app/_components/form/types/providers/url-provider";
import { ZodProvider } from "@/app/_components/form/types/providers/zod-provider";
import { Refresher } from "@/app/_components/refresher";
import { Func } from "@/types/function";
import { Property } from "@/types/property";
import { Validations } from "@/types/validation-consts";

const PERIOD_TIME_MS_DEFAULT = 600000; // 10min

export async function generateMetadata({
    params
}: {
    params: { configName: string, resourceType: string }
}) {
    const name = decodeURIComponent(params.configName.replace(/\+/g, ' '));
    const config = await fetchServerConfigByName(name);
    const resource = await fetchResourceByConfigAndType(config, params.resourceType);
  
    return {
      title: resource?.name,
      description: resource?.description
    }
}

const ResourcePage = async ({ 
    params 
} : { 
    params: { configName: string, resourceType: string } 
}) => {

    const name = decodeURIComponent(params.configName.replace(/\+/g, ' '));
    const config = await fetchServerConfigByName(name);
    const resource = await fetchResourceByConfigAndType(config, params.resourceType);

    return (
        <>
            <Refresher periodTimeMs={resource?.periodTimeMs || PERIOD_TIME_MS_DEFAULT}></Refresher>

            <div className="flex space-x-4 text-4xl">
                <i className={`${resource?.icon}`}></i>
                <h1 className="font-bold over-ellipsis">{resource?.name}</h1>
            </div>

            <p className="text-neutral-500 over-ellipsis">{resource?.description}</p>

            <div className="flex flex-wrap">
                {resource?.properties.map((property) => (
                    <div className="flex flex-col w-auto mr-8" key={property.name + property.type + 'PropertyItem'}>
                        <AttributeItem property={property} url={`${config.url}/${resource.type}`}/>
                    </div>
                ))}
            </div>

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

function FunctionItem({ func, url }: { func: Func, url: string }) {
  
    const name = func.properties.length == 0 ? `${func.name}()` : `${func.name}(`;

    return (
        <div className="mt-8 grid card mockup-code" id={`${func.name}`}>
            <div className="m-8 !text-white">
                <h2 className="text-3xl font-bold over-ellipsis">
                    {name}
                </h2>

                <UrlProvider url={url + "/" + func.name}>
                    <ZodProvider>
                        <FuncForm func={func}></FuncForm>
                    </ZodProvider>
                </UrlProvider>
            </div>
        </div>
    );
}

function AttributeItem({ property, url }: {property: Property, url: string}) {

    return (
        <div className="mt-8 mockup-window border bg-base-300" id={`${property.name}`}>
            <div className="bg-base-200">
                <div className="m-8 text-current">
                    <h2 className="text-3xl font-bold over-ellipsis">{property.name}</h2>
                    
                    <UrlProvider url={url}>
                        <ZodProvider>
                            <AttrFormProvider property={property}>
                                <InputComponent key={property.name} property={property} />
                            </AttrFormProvider>
                        </ZodProvider>
                    </UrlProvider>
                </div>
            </div>
        </div>
    );
}

export default ResourcePage;
