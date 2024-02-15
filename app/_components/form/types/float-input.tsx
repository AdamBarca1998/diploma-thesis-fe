import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { useZodInput } from "./zod-input";
import { Input } from "@material-tailwind/react";

export const FloatInput = ({ 
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
        z.string().min(1, {message: `${property.name} is not optional`}).pipe(
            z.coerce.number()
        )
    );

    return (
        <div className="form-control">
            <Input
                label={`${property.name}`}
                color="white"
                type="number"
                step={0.001}
                {...methods.register(property.name)}    
                crossOrigin={undefined}            
            />

            <ErrorMessage {...errorMessageProps} />
        </div>
    );
};