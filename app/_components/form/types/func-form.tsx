"use client";

import { Func } from "@/types/function";
import { BooleanInput } from "./boolean-input";
import { Property } from "@/types/property";
import { NotFoundInput } from "./not-found-input";
import { FuncFormProvider } from "./func-form-provider";
import { FC, useState } from "react";
import { ZodSchema } from "zod";
import { ByteInput } from "./byte-input";
import { ShortInput } from "./short-input";
import { IntInput } from "./int-input";
import { LongInput } from "./long-input";

interface InputComponentMap {
    [key: string]: FC<{ 
        property: Property, 
        onAddRule: (rule: ZodRule) => void
    }>;
}

const inputComponentMap: InputComponentMap = {
    boolean: BooleanInput,
    "java.lang.Boolean": BooleanInput,
    byte: ByteInput,
    "java.lang.Byte": ByteInput,
    short: ShortInput,
    "java.lang.Short": ShortInput,
    int: IntInput,
    "java.lang.Integer": IntInput,
    long: LongInput,
    "java.lang.Long": LongInput
};

export type ZodRule = { name: string; fieldType: ZodSchema };

export const FuncForm = ({ func, url }: { func: Func, url: string }) => {

    const [zodRules, setZodRules] = useState<ZodRule[]>([]);

    const handleAddRule = (rule: ZodRule) => {
        setZodRules((prevRules) => [...prevRules, rule]);
    };

    const inputs = func.properties.map((property, index) => {
        const FieldComponent = inputComponentMap[property.type] || NotFoundInput;

        return (
            <div key={property.name + property.type + index} className="mt-4">
                <FieldComponent property={property} onAddRule={handleAddRule} />
            </div>
        );
    });

    return (
        <FuncFormProvider zodRules={zodRules} url={`${url}/${func.name}`}>
            {inputs}
        </FuncFormProvider>
    );
};