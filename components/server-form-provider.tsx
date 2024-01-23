"use client";

import { ServerEntity, ServerEntityForm, serverEntityFormSchema } from "@/types/server-entity";
import { FormProvider, type SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { FC, PropsWithChildren, useState, useEffect } from "react";
import { ZodObject, ZodString, ZodTypeAny } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@material-tailwind/react";
import { ErrorMessage } from "@hookform/error-message";

export const ServerFormProvider: FC<PropsWithChildren> = ({
	children
}) => {

	const methods = useForm<ServerEntity>({
		resolver: async (data, context, options) => {
			console.log("formData", data)
			console.log(
			  "validation result",
			  await zodResolver(serverEntityFormSchema)(data, context, options)
			)
			
			return zodResolver(serverEntityFormSchema)(data, context, options)
		}
	});
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit: SubmitHandler<ServerEntity> = async data => {
		console.log("work");

		// setSubmitting(true);

		// try {
		// 	let apiUrl = '/api/server';
		// 	let method = 'POST';

		// 	const response = await fetch(apiUrl, {
		// 		method,
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(data)
		// 	});

		// 	if (response.ok) {
		// 		console.log('OK');
		// 	} else {
		// 		console.error('Failed to create/update the movie');
		// 	}
		// } catch (error) {
		// 	console.error('Error:', error);
		// } finally {
		// 	setSubmitting(false);
		// }
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className="flex flex-col gap-6">
					{children}

					{submitting ?
						<button className="btn" onClick={(e) => {
							e.stopPropagation();
						}}>
							<span className="loading loading-spinner"></span>
							Loading
						</button>
					:
						<button className="btn btn-block" type="submit">Submit</button>
					}
				</div>
			</form>
		</FormProvider>
	);
};
