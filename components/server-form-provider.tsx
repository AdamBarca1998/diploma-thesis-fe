"use client";

import { ServerConfig, serverConfigFormSchema } from "@/types/server";
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { FC, PropsWithChildren, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@material-tailwind/react";

export const ServerFormProvider: FC<PropsWithChildren<{onClose: () => void}>> = ({
	children,
	onClose
}) => {

	const methods = useForm<ServerConfig>({
		resolver: zodResolver(serverConfigFormSchema)
	});
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit: SubmitHandler<ServerConfig> = async data => {
		setSubmitting(true);

		try {
			let apiUrl = '/api/servers';
			let method = 'POST';

			const response = await fetch(apiUrl, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (response.ok) {
				console.log('OK');
				onClose();
			} else {
				console.error('Failed to create new server!');
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className="flex flex-col gap-6">
					{children} 

					{submitting ?
						<Button variant="gradient" onClick={(e) => {e.stopPropagation();}} fullWidth loading={true} placeholder={undefined}>
							Loading
						</Button>				
					:
						<Button variant="gradient" type="submit" fullWidth placeholder={undefined}>
							Create
						</Button>
					}
				</div>
			</form>
		</FormProvider>
	);
};
