"use client";

import { Property } from "@/types/property";
import { ZodRule } from "../func-form";
import { IntegerInput } from "./integer-input";

export const ByteInput = ({ 
    property,
} : { 
    property: Property, 
}) => {

    return IntegerInput({property: property, min: BigInt(-128), max: BigInt(127)});
};