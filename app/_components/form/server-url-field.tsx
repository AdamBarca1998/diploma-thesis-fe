'use client';

import { ServerConfig } from '@/types/server';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { FieldError } from './field-error';
import { Input } from '@material-tailwind/react';

export const ServerUrlField = () => {
    
	const methods = useFormContext<ServerConfig>();

	return (
        <>
            <Input label="Url" size="lg" crossOrigin={undefined} {...methods.register('url')}/>

            <ErrorMessage
                errors={methods.formState.errors}
                name="url"
                render={FieldError}
            />
        </>
	);
};