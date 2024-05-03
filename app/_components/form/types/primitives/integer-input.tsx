"use client";

import { Property } from "@/types/property";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { ZodRule } from "../func-form";
import { z } from "zod";
import { Input } from "@material-tailwind/react";
import { useZodContext } from "../providers/zod-provider";
import { useEffect, useState } from "react";

export const IntegerInput = ({ 
    property,
    min,
    max,
} : { 
    property: Property, 
    min: bigint,
    max: bigint,
}) => {

    const methods = useFormContext();
    const {zodRules, setZodRules} = useZodContext();
    const [isAddedRule, setIsAddedRule] = useState(false);

    useEffect(() => {
        if (!isAddedRule) {
            const rule: ZodRule = { 
                name: property.name, 
                fieldType: z.string().min(1, {message: `${property.name} is not optional`}).pipe(
                    z.coerce.bigint()
                        .min(min, {message: `${property.name} must be a number with min value: ${min}`})
                        .max(max, {message: `${property.name} must be a number with max value: ${max}`})
                )
            };


            setZodRules(prevRules => [...prevRules, rule]);
            setIsAddedRule(true);
        }
    }, [isAddedRule, max, min, property.name, setZodRules, zodRules]);

    return (
        <div className="form-control">
            <div className="w-72">
                <div className="relative w-full min-w-[200px] h-10">
                    <input
                        type="number"
                        className="peer w-full h-full bg-transparent text-white font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        {...methods.register(property.name)}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-white leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-white peer-focus:text-white before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                        {property.name} 
                    </label>
                </div>
            </div>  
        </div>
    );
};