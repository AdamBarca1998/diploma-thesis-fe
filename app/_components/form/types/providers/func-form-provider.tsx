"use client";

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { FC, PropsWithChildren, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodRule } from "../func-form";
import { z } from 'zod';
import toast from 'react-hot-toast';
import JSONbig from 'json-bigint';
import { useUrlContext } from './url-provider';
import { useZodContext } from './zod-provider';
import { useRouter } from 'next/navigation';

export const FuncFormProvider: FC<PropsWithChildren> = ({children}) => {

	const url = useUrlContext();
	const router = useRouter();
	const {zodRules} = useZodContext();
	const methods = useForm<any>({
		resolver: zodResolver(z.object(Object.fromEntries(zodRules.map((rule) => [rule.name, rule.fieldType]))))
	});
	
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit: SubmitHandler<any> = async (data) => {
		// const values = methods.getValues();
		// const mergedData = { ...values, ...data }; 

		setSubmitting(true);

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSONbig.stringify(data)
		})
		.then(async response => {
			if (response.ok) {
                return response.text();
            } else {
                const text = await response.text();
				throw new Error(`Response Error: ${text}`);
            }
		})
		.then(text => {
			toast.success(`${text}`);
			router.refresh();
		})
		.catch(e => {
			toast.error(`${e}`);
			console.error('Error:', e);
		})
		.finally(() => setSubmitting(false));
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(handleSubmit)}>
				<div className="flex flex-col gap-6">
					{children} 

					{submitting ?
						<button className="btn btn-block">
							<span className="loading loading-spinner loading-lg"></span>
							Loading...
						</button>			
					:
						<button className="btn btn-block" type="submit">Submit</button>
					}
				</div>
			</form>
		</FormProvider>
	);
};
