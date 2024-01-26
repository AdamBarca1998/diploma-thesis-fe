"use client";

import React, {useEffect, useState} from "react";
import { AppServer } from "@/types/server";
import { getAppServers } from "@/api-utils/servers";
import { Resource } from "@/types/resource";
import { Function } from "@/types/function";
import { Property } from "@/types/property";
 
export function AppMenu() {
    const [servers, setServers] = useState<AppServer[]>([]);
  
    useEffect(() => {
      const fetchServers = async () => {
        try {
          const fetchedServers = await getAppServers();
          setServers(fetchedServers);
        } catch (error) {
          console.error("Error fetching servers:", error);
        }
      };
  
      fetchServers();
    }, []);
  
    return (
        <div className="resize-x">
            <ul className="menu bg-white bg-opacity-75">
                {servers.map((e) => ServerItem(e))}
            </ul>
        </div>
    );
  }
  

function ServerItem(server: AppServer) {
    console.log(server.resources.length);

    const isCollapsed = () => {
        return server.resources && server.resources.length > 0
    };

    return (
        <li key={server.config.name + server.config.url}>
            {isCollapsed() ? (
                <details open>
                    {Summary(server.config.name, "fa-solid fa-circle-check")}

                    {server.resources && server.resources.length > 0 && server.resources.map((e) => ResourceItem(e))}
                </details>
            ) : (
                Summary(server.config.name, "fa-solid fa-triangle-exclamation")
            )}
        </li>
    );
}

function ResourceItem(resource: Resource) {
    return (
        <ul>
            <li key={resource.name + resource.type}>
                <details>
                    {Summary(resource.name !== "" ? resource.name : resource.type, "fa-brands fa-sourcetree")}

                    {resource.functions.map((e) => FunctionItem(e))}
                </details>
            </li>
        </ul>
    );
}

function FunctionItem(func: Function) {
    return (
        <ul>
            <li key={func.name + func.returnType}>
                <details>
                    {Summary(func.name, "fa-solid fa-code")}

                    {func.properties.map((e) => PropertyItem(e))}
                </details>
            </li>
        </ul>
    );
}

function PropertyItem(property: Property) {
    return (
        <ul>
            <li key={property.name + property.type}>
                {Summary(property.name, "")}
            </li>
        </ul>
    );
}

function Summary(name: String, icon: String) {
    return (
        <summary>
            <i className={`${icon}`}></i>

            {name}
        </summary>
    );
}