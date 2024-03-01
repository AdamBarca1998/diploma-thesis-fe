"use client";

import { Func } from "@/types/function";
import { FuncFormProvider } from "./func-form-provider";
import { ZodSchema } from "zod";
import { InputComponent } from "./input-component";

export type ZodRule = { name: string; fieldType: ZodSchema };

export const FuncForm = ({ func }: { func: Func }) => {

    return (
        <FuncFormProvider>
            <div className="flex flex-col">
                <div className="ml-4">
                    {func.properties.map((property) => (
                        <InputComponent key={property.name} property={property} />
                    ))}
                </div>

                {func.properties.length != 0 
                    ?
                        <h2 className="text-3xl font-bold">)</h2>
                    :
                        null
                }   
            </div>
        </FuncFormProvider>
    );    
};