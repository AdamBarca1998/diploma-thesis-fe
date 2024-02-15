import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { IntegerInput } from "./integer-input";

export const IntInput = ({ 
    property,
    onAddRule,
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void,
}) => {

    return IntegerInput({property: property, onAddRule: onAddRule, min: BigInt(-2147483648), max: BigInt(2147483647)});
};