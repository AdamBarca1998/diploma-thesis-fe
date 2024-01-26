"use client";

import React, {useEffect, useState} from "react";
import { AppServer } from "@/types/server";
import { getAppServers } from "@/api-utils/servers";
import { Resource } from "@/types/resource";
import { boolean } from "zod";
import { Function } from "@/types/function";
import { Property } from "@/types/property";
import { ChevronDownIcon, PresentationChartBarIcon, ChevronRightIcon, ShoppingBagIcon, InboxIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/16/solid";
import { Card, Typography, List, Accordion, ListItem, AccordionHeader, ListItemPrefix, AccordionBody, ListItemSuffix, Chip } from "@material-tailwind/react";
 
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
        <ul className="menu bg-white bg-opacity-75 max-w-xs">
            {servers.map((e) => ServerItem(e))}
        </ul>
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
                    {Summary(server.config.name)}

                    {server.resources && server.resources.length > 0 && server.resources.map((e) => ResourceItem(e))}
                </details>
            ) : (
                Summary(server.config.name)
            )}
        </li>
    );
}

function ResourceItem(resource: Resource) {
    return (
        <ul>
            <li key={resource.name + resource.type}>
                <details>
                    {Summary(resource.name !== "" ? resource.name : resource.type)}

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
                    {Summary(func.name)}

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
                {Summary(property.name)}
            </li>
        </ul>
    );
}

function Summary(name: String) {
    return (
        <summary>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
            </svg>

            {name}
        </summary>
    );
}