import { resourceSchema } from "@/types/resource";
import { ServerConfig, serverConfigFormSchema, serverSchema, serverStateSchema } from "@/types/server";

const TIMEOUT_DURATION = 1000;

export const getAppServers = async () => {
    try {
        const response = await fetch("/api/servers-config");

        if (response.ok) {
            const json = await response.json();

			const servers = serverConfigFormSchema.array().parse(json);

    		const serverDataPromises = servers.map(fetchDataFromServer);
    		const serverData = await Promise.all(serverDataPromises);

			return serverSchema.array().parse(serverData);
        }
    } catch (error) {
        console.error(`Error fetching data from AppServers:`, error);
    }

    return [];
};

async function fetchDataFromServer(serverConfig: ServerConfig) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    try {
        const response = await fetch(serverConfig.url, {
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
            const json = await response.json();

            return {
                config: serverConfig,
                resources: resourceSchema.array().parse(json),
                state: serverStateSchema.enum.Success,
            };
        }
    } catch (error) {
        // console.error(`Error fetching data from server ${serverConfig.name} ${serverConfig.url}:`, error);
    }

    return {
        config: serverConfig,
        resources: [],
        state: serverStateSchema.enum.Error,
    };
}