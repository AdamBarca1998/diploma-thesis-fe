'use client';

import { ServerConfig } from '@/types/server';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { FieldError } from './field-error';
import { Input } from '@material-tailwind/react';

export const ServerNameField = () => {
	const methods = useFormContext<ServerConfig>();

	return (
        <>
            <Input label="Name" size="lg" crossOrigin={undefined} {...methods.register('name')}/>

            <ErrorMessage
                errors={methods.formState.errors}
                name="name"
                render={FieldError}
            />
        </>
	);
};