import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { NumberInput } from "./number-input";

export const LongInput = ({ 
    property,
    onAddRule,
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void,
}) => {

    return NumberInput({property: property, onAddRule: onAddRule, min: BigInt("-9223372036854775808"), max: BigInt("9223372036854775807")});
};