"use client";

import { Property } from "@/types/property";
import { NotFoundInput } from "./not-found-input";
import { inputComponentMap } from "./input-component";


export const OptionalInput = ({ 
    property,
} : { 
    property: Property, 
}) => {

    const input = () => {
        const optionalTypeMatch = property.type.match(/^java\.util\.Optional<(.+)>$/);
        const innerType = optionalTypeMatch ? optionalTypeMatch[1] : property.type;

        const FieldComponent = inputComponentMap[innerType] || NotFoundInput;

        // update property info
        const updatedProperty = { ...property };
        updatedProperty.type = innerType;

        return (
            <div key={property.name + property.type} className="mt-4">
                <FieldComponent property={updatedProperty} isOptional={true}/>
            </div>
        );
    };

    return input();
};