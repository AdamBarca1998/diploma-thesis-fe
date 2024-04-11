"use client";

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { FC, PropsWithChildren, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodRule } from "./func-form";
import { z } from 'zod';
import toast from 'react-hot-toast';
import JSONbig from 'json-bigint';
import { useUrlContext } from './url-provider';
import { useZodContext } from './zod-provider';
import { Property } from '@/types/property';
import { Validations } from '@/types/validation-consts';
import { revalidateCacheByResourceType } from '@/api-utils/cache';
import { useRouter } from "next/navigation";

interface AttrFormProviderProps {
    property: Property;
}

export const AttrFormProvider: FC<PropsWithChildren<AttrFormProviderProps>> = ({ children, property }) => {

	const url = useUrlContext();
	const router = useRouter();
	const {zodRules} = useZodContext();
	const methods = useForm<any>({
		resolver: zodResolver(z.object(Object.fromEntries(zodRules.map((rule) => [rule.name, rule.fieldType]))))
	});
	
	const [submitting, setSubmitting] = useState(false);

	const isDisabble = property.validations.includes(Validations.Disable);

	const handleSubmit: SubmitHandler<any> = async (data) => {
		// const values = methods.getValues();
		// const mergedData = { ...values, ...data };
		const urlParts = url.split('/');
		const resourceType = urlParts[urlParts.length - 1];
		const finishUrl = `${url}/set${property.name.charAt(0).toUpperCase() + property.name.slice(1)}`; // create setter

		setSubmitting(true);

		fetch(finishUrl, {
			method: "POST",
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

					{isDisabble ?
						null
					:
						submitting ?
							<button className="btn btn-block btn-neutral">
								<span className="loading loading-spinner loading-lg"></span>
								Loading...
							</button>			
						:
							<button className="btn btn-block btn-neutral" type="submit">Submit</button>
					}
				</div>
			</form>
		</FormProvider>
	);
};
