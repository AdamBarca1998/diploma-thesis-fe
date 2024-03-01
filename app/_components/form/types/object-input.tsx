"use client";

import { Property } from "@/types/property";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { ZodRule, inputComponentMap } from "./func-form";
import { useZodInput } from "./input-component";
import { Input } from "@material-tailwind/react";
import { NotFoundInput } from "./not-found-input";


export const ObjectInput = ({ 
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
        z.string()
    );

    const handleAddRule = (rule: ZodRule) => {
    };

    const inputs = property.properties.map((property, index) => {
        console.log(property);
        const optionalTypeMatch = property.type.match(/^(java\.util\.Optional)<(.+)>$/);
        const outerType = optionalTypeMatch ? optionalTypeMatch[1] : property.type;

        const FieldComponent = property.properties.length > 0 
            ? ObjectInput 
            : inputComponentMap[outerType] || NotFoundInput
        ;

        return (
            <div key={property.name + property.type + index} className="mt-4">
                <FieldComponent property={property} onAddRule={handleAddRule} isOptional={false}/>
            </div>
        );
    });

    return (
        <>
            <h2 className="text-3xl font-bold">{property.name} {'{'}</h2>

            <div className="m-4">
                {inputs}
            </div>

            <h2 className="text-3xl font-bold">{'}'}</h2>
            <ErrorMessage {...errorMessageProps} />
        </>
    );
};