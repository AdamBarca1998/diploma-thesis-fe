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
            <Input
                label={`${property.name}`}
                color="white"
                type="number"
                {...methods.register(property.name)}    
                crossOrigin={undefined}            
            />
        </div>
    );
};