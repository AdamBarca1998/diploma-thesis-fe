import { infoSchema } from "@/types/info";
import { resourceSchema } from "@/types/resource";
import { ServerConfig, serverConfigFormSchema, serverStateSchema } from "@/types/server";
import { fetchServerConfigByName } from "./server-config-api";

const TIMEOUT_DURATION = 10000;

export const fetchInfoByType = async (type: String, url: String) => {
    const finishUrl = `${url}/${type}/info`;

    try {
        const response = await fetch(finishUrl, { next: { tags: ['all'] }});

        if (response.ok) {
            const json = await response.json();

			return infoSchema.parse(json);
        } else {
            throw new Error(`Server responded with status ${response.status}`);
        }
    } catch (error) {
        // console.error(`Error fetching data from ${finishUrl}:`, error);
        return null;
    }
}

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

export async function fetchResourceByConfigAndType(config: ServerConfig, type: String) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    return fetch(`${config.url}/${type}`, {
        signal: controller.signal,
        next: { tags: ['all'] },
        cache: 'no-store'
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
            // throw new Error(`Error: ${error}`);
        });
}

export async function fetchResourcesByConfigName(configName: String) {
    const config = await fetchServerConfigByName(configName);

    if (config) {
        return fetchResources(config);
    }
}