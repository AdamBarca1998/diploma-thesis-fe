"use client";

import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { IntegerInput } from "./integer-input";

export const ShortInput = ({ 
    property,
} : { 
    property: Property, 
}) => {

    return IntegerInput({property: property, min: BigInt(-32768), max: BigInt(32767)});
};