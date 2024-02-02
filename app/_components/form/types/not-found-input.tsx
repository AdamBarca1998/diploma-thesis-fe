import { Property } from "@/types/property";
import { ZodSchema } from "zod";
import { ZodRule } from "./func-form";

export const NotFoundInput = ({ 
    property,
    onAddRule
} : { 
    property: Property,
    onAddRule: (rule: ZodRule) => void
}) => {

    return (
        <div className="form-control">
            <label className="label">
                <span className="font-bold mr-16">{property.name}</span> 

                <div className="flex justify-between space-x-4 text-2xl">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <p>
                        No input component found for type: <strong>{property.type}</strong>
                    </p>
                </div>
            </label>
        </div>
    );
};