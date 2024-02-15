import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { IntegerInput } from "./integer-input";

export const LongInput = ({ 
    property,
    onAddRule,
} : { 
    property: Property, 
    onAddRule: (rule: ZodRule) => void,
}) => {

    return IntegerInput({property: property, onAddRule: onAddRule, min: BigInt("-9223372036854775808"), max: BigInt("9223372036854775807")});
};