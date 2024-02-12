"use client";

import { Property } from "@/types/property";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FieldError } from "../field-error";
import { ZodRule } from "./func-form";
import { z } from "zod";
import { useEffect, useState } from "react";

export const BooleanInput = ({ 
    property,
    onAddRule
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void
}) => {

    const methods = useFormContext();
    const [isRuleAdded, setHasRuleAdded] = useState(false);

    useEffect(() => {
        if (!isRuleAdded) {
            onAddRule({ name: property.name, fieldType: z.boolean() });

            setHasRuleAdded(true);
        }
    }, [property.name, isRuleAdded, onAddRule]);


    return (
        <>
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

                <ErrorMessage
                    errors={methods.formState.errors}
                    name={`${property.name}`}
                    render={FieldError}
                />
            </div>
        </>
    );
};