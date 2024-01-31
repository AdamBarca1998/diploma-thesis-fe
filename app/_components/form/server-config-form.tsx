import { ServerConfigsFormProvider } from "./server-configs-form-provider";
import { ServerNameField } from "./server-name-field";
import { ServerUrlField } from "./server-url-field";

export const ServerConfigForm = ({onClose}: {onClose: () => void}) => {

    return (
        <ServerConfigsFormProvider onClose={onClose}>
            <div className="flex flex-col gap-4">
                <ServerNameField></ServerNameField>

                <ServerUrlField></ServerUrlField>
            </div>
	    </ServerConfigsFormProvider>
    );
};