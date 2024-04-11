"use client";

import { Property } from "@/types/property";
import { useState, useEffect, FC, Suspense } from "react";
import { useFormContext } from "react-hook-form";
import { ZodSchema } from "zod";
import { ZodRule } from "./func-form";
import { FieldError } from "../field-error";
import { BooleanInput } from "./boolean-input";
import { ErrorMessage } from "@hookform/error-message";
import { NotFoundInput } from "./not-found-input";
import { ByteInput } from "./byte-input";
import { ShortInput } from "./short-input";
import { IntInput } from "./int-input";
import { LongInput } from "./long-input";
import { FloatInput } from "./float-input";
import { CharInput } from "./char-input";
import { StringInput } from "./string-input";
import { OptionalInput } from "./optional-input";
import { UnknownInput } from "./unknown-input";
import Loading from "@/app/(pages)/configs/loading";
import { PieChart } from "./pie-chart-input";
import { LineChart } from "./line-chart-input";

interface InputComponentMap {
    [key: string]: FC<{ 
        property: Property, 
        isOptional: boolean
    }>;
}

export const inputComponentMap: InputComponentMap = {
    boolean: BooleanInput,
    "java.lang.Boolean": BooleanInput,
    byte: ByteInput,
    "java.lang.Byte": ByteInput,
    short: ShortInput,
    "java.lang.Short": ShortInput,
    int: IntInput,
    "java.lang.Integer": IntInput,
    long: LongInput,
    "java.lang.Long": LongInput,
    float: FloatInput,
    "java.lang.Float": FloatInput,
    double: FloatInput,
    "java.lang.Double": FloatInput,
    char: CharInput,
    "java.lang.Character": CharInput,

    "java.lang.String": StringInput,
    "java.util.Optional": OptionalInput,
    "sk.adambarca.calculatorserver.resources.charts.PieChart": PieChart,
    "sk.adambarca.calculatorserver.resources.charts.LineChart": LineChart
};


export const InputComponent = ({ 
    property,
} : { 
    property: Property, 
}) => {

    const methods = useFormContext();
    const FieldComponent = inputComponentMap[getOuterType(property.type)] || UnknownInput;
        
    const errorMessageProps = {
        errors: methods.formState.errors,
        name: property.name,
        render: FieldError
    };

    return (
        <>
            <div key={property.name + property.type} className="mt-4">
                <Suspense fallback={<Loading></Loading>}>
                    <FieldComponent property={property} isOptional={false} />
                </Suspense>
            </div>

            <ErrorMessage {...errorMessageProps} />
        </>
    );
};

const getOuterType = (type: string): string => {
    const match = type.match(/^(java\.util\.Optional)<(.+)>$/)
    return match ? match[1] : type;
};