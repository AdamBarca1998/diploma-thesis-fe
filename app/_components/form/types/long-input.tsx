"use client";

import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { IntegerInput } from "./integer-input";

export const LongInput = ({ 
    property,
} : { 
    property: Property, 
}) => {

    return IntegerInput({property: property, min: BigInt("-9223372036854775808"), max: BigInt("9223372036854775807")});
};