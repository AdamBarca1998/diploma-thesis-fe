import React, { Suspense } from "react";
import { ServerConfig, serverStateSchema } from "@/types/server";
import { Resource } from "@/types/resource";
import { Func } from "@/types/function";
import { Property } from "@/types/property";
import { fetchResources } from "@/api-utils/server-managment-api";
import Link from "next/link";
import { fetchServerConfigs } from "@/api-utils/server-config-api";
 
export async function AppMenu() {

    const configs = await fetchServerConfigs();

    return (
        <ul className="menu">
          {configs.map((config) => (
            <Suspense key={config.url + config.name + "AppMenu"} fallback={
                <li>
                    {Summary(config.name, "fa-solid fa-spinner fa-spin")}
                </li>
            }>
              <ConfigItem config={config} />
            </Suspense>
          ))}
        </ul>
    );
}

async function ConfigItem({ config }: { config: ServerConfig }) {

    const server = await fetchResources(config);
    const itemUrl = `configs/${server.config.name}`;
    const isCollapsed = () => {
        return server.resources && server.resources.length > 0
    };

    return (
        <li key={server.config.name + server.config.url + "ConfigItem"}>
            {server.state !== "Error" ? (
                isCollapsed() ? (
                    <details open>
                        {Summary(server.config.name, "fa-solid fa-circle-check", itemUrl)}
    
                        {server.resources && server.resources.length > 0 && server.resources.map((e) => ResourceItem(e, itemUrl))}
                    </details>
                ) : (
                    Summary(server.config.name, "fa-solid fa-circle-check")
                )
            ) : (
                Summary(server.config.name, "fa-solid fa-triangle-exclamation")
            )}
        </li>
    );
}

function ResourceItem(resource: Resource, url: String) {

    const itemUrl = `${url}/${resource.type}`;

    return (
        <ul>
            <li key={resource.name + resource.type + "ResourceItem"}>
                <details open>
                    {Summary(resource.name !== "" ? resource.name : resource.type, resource.icon, itemUrl)}

                    {resource.properties.map((e) => PropertyItem(e, itemUrl))}
                    {resource.functions.map((e) => FunctionItem(e, itemUrl))}
                </details>
            </li>
        </ul>
    );
}

function FunctionItem(func: Func, url: String) {

    const itemUrl = `${url}#${func.name}`;

    const render = (
        <>
            {Summary(func.name, "fa-solid fa-code", itemUrl)}

            {func.properties.map((e) => PropertyItem(e))}
        </>
    );

    return (
        <ul>
            <li key={url + func.name + func.returnType + "AppMenuFunctionItem"}>
                {func.properties.length > 0
                ?
                    <details>
                        {render}
                    </details>
                :
                    <>
                        {render}
                    </>
                }
            </li>
        </ul>
    );
}

function PropertyItem(property: Property, url: String | undefined = undefined) {

    const itemUrl = `${url}#${property.name}`;

    return (
        <ul>
            <li key={property.name + property.type + "PropertyItem"}>
                {Summary(property.name, "fa-solid fa-cube", url == undefined ? url : itemUrl)}
            </li>
        </ul>
    );
}

function Summary(name: String, icon: String, url: String | undefined = undefined) {
    return (
        <summary>
            <i className={`${icon}`}></i>

            {url ? (
                <p className="over-ellipsis">
                    <Link href={`/${url}`}>
                        {name}
                    </Link>
                </p>
            ) : (
                <p className="over-ellipsis">
                    {name}
                </p>
            )}
        </summary>
    );
}
