import { serverConfigFormSchema } from "@/types/server";

export const fetchServerConfigs = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/server-configs", { 
            next: { tags: ['all'] } 
        });

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
        const response = await fetch(`http://localhost:3000/api/server-configs/${name}`, { 
            next: { tags: ['all'] } 
        });

        if (response.ok) {
            const json = await response.json();

			return serverConfigFormSchema.parse(json);
        } else {
            throw new Error(`Server responded with status ${response.status}`);
        }
    } catch (error) {
        console.error(`Error fetching data from AppServers:`, error);
        throw new Error(`Error: ${error}`);
    }
};