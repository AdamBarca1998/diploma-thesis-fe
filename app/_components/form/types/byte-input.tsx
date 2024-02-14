import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { NumberInput } from "./number-input";

export const ByteInput = ({ 
    property,
    onAddRule,
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void,
}) => {

    return NumberInput({property: property, onAddRule: onAddRule, min: BigInt(-128), max: BigInt(127)});
};