import { Property } from "@/types/property";
import { Select, Option } from "@material-tailwind/react";
import { Controller, useFormContext } from "react-hook-form";

export const EnumInput = async ({ 
    property,
    values
} : { 
    property: Property,
    values: string[]
}) => {

    const methods = useFormContext();

    return (
        <Controller
            control={methods.control}
            name={property.name}
            render={({ field }) => (
                <Select
                    label={property.name} 
                    placeholder={undefined} 
                    color="green" 
                    className="text-white"
                    {...field}
                >
                    {values.map((value, index) => (
                        <Option key={index} value={value}>{value}</Option>
                    ))}
                </Select>
            )}
        />
    );
};