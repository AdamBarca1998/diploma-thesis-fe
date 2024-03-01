import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { IntegerInput } from "./integer-input";

export const IntInput = ({ 
    property,
} : { 
    property: Property, 
}) => {

    return IntegerInput({property: property, min: BigInt(-2147483648), max: BigInt(2147483647)});
};