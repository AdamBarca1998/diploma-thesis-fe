import { Property } from "@/types/property";
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ZodSchema } from "zod";
import { ZodRule } from "./func-form";
import { FieldError } from "../field-error";

export const useZodInput = (property: Property, onAddRule: (rule: ZodRule) => void, zodField: ZodSchema) => {

    const methods = useFormContext();
    const [isRuleAdded, setHasRuleAdded] = useState(false);

    useEffect(() => {
        if (!isRuleAdded) {
            onAddRule({ name: property.name, fieldType: zodField });
            setHasRuleAdded(true);
        }
    }, [property.name, isRuleAdded, onAddRule]);

    const errorMessageProps = {
        errors: methods.formState.errors,
        name: property.name,
        render: FieldError
    };

    return { errorMessageProps };
};