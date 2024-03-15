"use client";

import { Property } from "@/types/property";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { Input, Textarea } from "@material-tailwind/react";
import { ZodRule, useZodContext } from "./zod-provider";
import { useState, useEffect } from "react";

export const StringInput = ({ 
    property,
} : { 
    property: Property, 
}) => {

    const [value, setValue] = useState(property.value || "");
    const methods = useFormContext();
    const {zodRules, setZodRules} = useZodContext();
    const [isAddedRule, setIsAddedRule] = useState(false);

    const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => setValue(target.value);

    useEffect(() => {
        if (!isAddedRule) {
            const rule: ZodRule = { 
                name: property.name, 
                fieldType: z.string().min(1, {message: `${property.name} is not optional`})
            };
            setZodRules(prevRules => [...prevRules, rule]);
            setIsAddedRule(true);
        }
        setValue(property.value);
    }, [isAddedRule, property.name, property.value, setZodRules, zodRules]);

    return (
        <div className="form-control">
            <div>
                <Input crossOrigin={undefined} color="green" label={property.name} {...methods.register(property.name)} value={value ?? ""} onChange={onChange}/>
            </div>
        </div>
    );
};