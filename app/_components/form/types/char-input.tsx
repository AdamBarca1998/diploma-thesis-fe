"use client";

import { Property } from "@/types/property";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { ZodRule } from "./func-form";
import { useZodInput } from "./zod-input";
import RICIBs from 'react-individual-character-input-boxes';
import { Input } from "@material-tailwind/react";

export const CharInput = ({ 
    property,
    onAddRule,
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void,
}) => {

    const methods = useFormContext();
    const { errorMessageProps } = useZodInput(
        property,
        onAddRule, 
        z.string().min(1, {message: `${property.name} is not optional`}).max(1)
    );

    return (
        <div className="form-control">
            <Input
                label={`${property.name}`}
                color="white"
                maxLength={1}
                {...methods.register(property.name)}    
                crossOrigin={undefined}            
            />

            <ErrorMessage {...errorMessageProps} />
        </div>
    );
};