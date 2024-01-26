import { ServerConfig } from "@/types/server";
import { ServerFormProvider } from "./server-form-provider";
import { ServerNameField } from "./server-name-field";
import { ServerUrlField } from "./server-url-field";

export const ServerForm = ({onClose}: {onClose: () => void}) => {

    return (
        <ServerFormProvider onClose={onClose}>
            <div className="flex flex-col gap-4">
                <ServerNameField></ServerNameField>

                <ServerUrlField></ServerUrlField>
            </div>
	    </ServerFormProvider>
    );
};