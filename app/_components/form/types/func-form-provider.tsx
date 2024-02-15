"use client";

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { FC, PropsWithChildren, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodRule } from "./func-form";
import { z } from 'zod';
import toast from 'react-hot-toast';
import JSONbig from 'json-bigint';

export const FuncFormProvider: FC<PropsWithChildren<{zodRules: ZodRule[], url: string}>> = ({
	children,
	zodRules,
	url
}) => {

	const methods = useForm<any>({
		resolver: zodResolver(z.object(Object.fromEntries(zodRules.map((rule) => [rule.name, rule.fieldType]))))
	});
	
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit: SubmitHandler<any> = async data => {
		console.log(JSONbig.stringify(data));

		setSubmitting(true);

		let method = 'POST';

		fetch(url, {
			method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSONbig.stringify(data)
		})
		.then(response => {
			if (response.ok) {
                return response.text();
            } else {
                toast.error(`Response Error: ${response.status}}`);
            }
		})
		.then(json => {
			toast.success(`${json}`);
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
