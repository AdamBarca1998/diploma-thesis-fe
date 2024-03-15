"use client";

import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { Input } from "@material-tailwind/react";
import { useZodContext } from "./zod-provider";
import { useEffect, useState } from "react";

export const FloatInput = ({ 
    property,
    isOptional,
} : { 
    property: Property, 
    isOptional: boolean
}) => {

    const methods = useFormContext();
    const {zodRules, setZodRules} = useZodContext();
    const [isAddedRule, setIsAddedRule] = useState(false);

    useEffect(() => {
        if (!isAddedRule) {
            const rule: ZodRule = { 
                name: property.name, 
                fieldType: isOptional 
                    ? z.coerce.number()
                    : z.string().min(1, {message: `${property.name} is not optional`}).pipe(z.coerce.number())
            };
            setZodRules(prevRules => [...prevRules, rule]);
            setIsAddedRule(true);
        }
    }, [isAddedRule, isOptional, property.name, setZodRules, zodRules]);

    return (
        <div className="form-control">
            <Input
                label={`${property.name}${isOptional ? "?" : ""}`}
                color="white"
                type="number"
                step={0.001}
                {...methods.register(property.name)}    
                crossOrigin={undefined}            
            />
        </div>
    );
};