import { resourceSchema } from "@/types/resource";
import { ServerConfig, serverConfigFormSchema, serverStateSchema } from "@/types/server";

const TIMEOUT_DURATION = 10000;

export const fetchServerConfigs = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/server-configs", { next: { tags: ['all'] } });

        if (response.ok) {
            const json = await response.json();

			return serverConfigFormSchema.array().parse(json);
        }
    } catch (error) {
        console.error(`Error fetching configs:`, error);
    }

    return [];
};

export const fetchServerConfigByName = async (name: String) => {
    try {
        const response = await fetch(`http://localhost:3000/api/server-configs/${name}`, { next: { tags: ['all'] } });

        if (response.ok) {
            const json = await response.json();

			return serverConfigFormSchema.parse(json);
        }
    } catch (error) {
        console.error(`Error fetching data from AppServers:`, error);
    }
};

export async function fetchResources(serverConfig: ServerConfig) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    return fetch(serverConfig.url, {
        signal: controller.signal,
        next: { tags: ['all'] }
    })
        .then((response) => {
            clearTimeout(timeoutId);

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Server responded with status ${response.status}`);
            }
        })
        .then((json) => {
            return {
                config: serverConfig,
                resources: resourceSchema.array().parse(json),
                state: serverStateSchema.enum.Success,
            };
        })
        .catch((error) => {
            // console.error(`Error fetching resources ${serverConfig.name} ${serverConfig.url}:`, error);

            return {
                config: serverConfig,
                resources: [],
                state: serverStateSchema.enum.Error,
            };
        });
}

export async function fetchResourcesByConfigName(configName: String) {
    const config = await fetchServerConfigByName(configName);

    if (config) {
        return fetchResources(config);
    }
}

export async function fetchResourceByConfigAndType(config: ServerConfig, type: String) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    return fetch(`${config.url}/${type}`, {
        signal: controller.signal,
        next: { tags: ['all'] }
    })
        .then((response) => {
            clearTimeout(timeoutId);

            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Server responded with status ${response.status}`);
            }
        })
        .then((json) => {
            return resourceSchema.parse(json);
        })
        .catch((error) => {
            // console.error(`Error fetching resources ${serverConfig.name} ${serverConfig.url}:`, error);
        });
}