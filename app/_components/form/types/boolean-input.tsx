"use client";

import { Property } from "@/types/property";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FieldError } from "../field-error";
import { ZodSchema, z } from "zod";
import { useState } from "react";
import { ZodRule } from "./func-form";

export const BooleanInput = ({ 
    property,
    onAddRule
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void
}) => {

    onAddRule({ name: property.name, fieldType: z.boolean() });

    const methods = useFormContext();

    return (
        <>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="font-bold">{property.name}</span> 
                    <input 
                        type="checkbox" 
                        className="toggle" 
                        checked={methods.watch(property.name) || false} 
                        {...methods.register(property.name)}
                    />
                </label>
            </div>

            <ErrorMessage
                errors={methods.formState.errors}
                name={`${property.name}`}
                render={FieldError}
            />
        </>
    );
};