"use client";

import { Property } from "@/types/property";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { ZodRule } from "./func-form";
import { Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useZodContext } from "./zod-provider";

const MIN_MAX = 1;

export const CharInput = ({ 
    property,
} : { 
    property: Property, 
}) => {

    const methods = useFormContext();
    const {zodRules, setZodRules} = useZodContext();
    const [isAddedRule, setIsAddedRule] = useState(false);

    useEffect(() => {
        if (!isAddedRule) {
            const rule: ZodRule = { 
                name: property.name, 
                fieldType: z.string().min(MIN_MAX, {message: `${property.name} is not optional`}).max(MIN_MAX) 
            };
            setZodRules(prevRules => [...prevRules, rule]);
            setIsAddedRule(true);
        }
    }, [isAddedRule, property.name, setZodRules, zodRules]);

    return (
        <>
            <Input
                label={`${property.name}`}
                color="white"
                maxLength={MIN_MAX}
                {...methods.register(property.name)}    
                crossOrigin={undefined}            
            />
        </>
    );
};