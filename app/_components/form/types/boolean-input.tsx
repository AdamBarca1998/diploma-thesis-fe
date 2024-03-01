"use client";

import { Property } from "@/types/property";
import { useFormContext } from "react-hook-form";
import { ZodRule } from "./func-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useZodContext } from "./zod-provider";

export const BooleanInput = ({ 
    property,
} : { 
    property: Property, 
}) => {

    const methods = useFormContext();
    const {zodRules, setZodRules} = useZodContext();
    const [isAddedRule, setIsAddedRule] = useState(false);

    useEffect(() => {
        if (!isAddedRule) {
            const rule: ZodRule = { name: property.name, fieldType: z.boolean() };
            setZodRules(prevRules => [...prevRules, rule]);
            setIsAddedRule(true);
        }
    }, [isAddedRule, property.name, setZodRules, zodRules]);

    return (
        <div className="form-control">
            <label className="label cursor-pointer pl-0">
                <span className="font-bold">{property.name}</span> 
                <input 
                    type="checkbox" 
                    className="toggle" 
                    checked={methods.watch(property.name) || false} 
                    {...methods.register(property.name)}
                />
            </label>
        </div>
    );
};