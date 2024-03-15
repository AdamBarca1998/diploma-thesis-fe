"use client";

import { Property } from "@/types/property";
import { Select, Option } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { z } from "zod";
import { useZodContext, ZodRule } from "./zod-provider";

export const EnumInput = ({ 
    property,
    values
} : { 
    property: Property,
    values: readonly string[]
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
                fieldType: z.enum(values as readonly [string, ...string[]])
            };
            
            setZodRules(prevRules => [...prevRules, rule]);
            setIsAddedRule(true);
        }
        setValue(property.value);
    }, [isAddedRule, property.name, property.value, setZodRules, values, zodRules]);

    return (
        <Controller
            control={methods.control}
            name={property.name}
            render={({ field }) => (
                <Select
                    label={property.name} 
                    placeholder={undefined} 
                    color="green" 
                    className="text-white"
                    {...field}
                >
                    {values.map((value, index) => (
                        <Option key={index} value={value}>{value}</Option>
                    ))}
                </Select>
            )}
        />
    );
};