"use client";

import { Property } from "@/types/property";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { FieldError } from "../field-error";
import { ZodRule } from "./func-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useZodInput } from "./zod-input";

export const BooleanInput = ({ 
    property,
    onAddRule
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void
}) => {

    const methods = useFormContext();
    const { errorMessageProps } = useZodInput(property, onAddRule, z.boolean());

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

            <ErrorMessage {...errorMessageProps} />
        </div>
    );
};