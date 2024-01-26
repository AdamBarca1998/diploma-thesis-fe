"use client";

import { ServerEntityForm } from "@/types/server-entity";
import { ServerFormProvider } from "./server-form-provider";
import { MultipleFieldErrors, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "@material-tailwind/react";

export const ServerForm = async () => {

    return (
        <ServerFormProvider>
            <Inputs />
	    </ServerFormProvider>
    );
};

    const methods = useFormContext<ServerEntityForm>();

    return (
        <div className="flex flex-col gap-4">
            <input
				className="w-96 rounded-lg bg-slate-50 px-2 py-1 shadow"
				{...methods.register('name')}
			/>
            <ErrorMessage
                errors={methods.formState.errors}
                name="name"
                render={renderError}
            />

            <input
				className="w-96 rounded-lg bg-slate-50 px-2 py-1 shadow"
				{...methods.register('url')}
			/>
            <ErrorMessage
                errors={methods.formState.errors}
                name="url"
                render={renderError}
            />
        </div>
    );
}

function renderError(data: {
    message: string;
    messages?: MultipleFieldErrors | undefined;
}) {
    return (
        <div>
            <p className="text-red-600">{data.message}</p>

            {
                data.messages && Object.entries(data.messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                ))
            }
        </div>
    );
}