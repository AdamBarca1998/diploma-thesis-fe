"use client";

import { Property } from "@/types/property";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FieldError } from "../field-error";
import { ZodRule } from "./func-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { useZodInput } from "./zod-input";

export const NumberInput = ({ 
    property,
    onAddRule,
    min,
    max
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void,
    min: bigint,
    max: bigint
}) => {

    const methods = useFormContext();
    const { errorMessageProps } = useZodInput(
        property,
        onAddRule, 
        z.string().min(1, {message: `${property.name} is not optional`}).pipe(z.coerce.bigint().min(min).max(max))
    );

    return (
        <div className="form-control">
            <Input 
                label={`${property.name}`}
                color="white"
                type="number"
                {...methods.register(property.name)}    
                crossOrigin={undefined}            
            />

            <ErrorMessage {...errorMessageProps} />
        </div>
    );
};