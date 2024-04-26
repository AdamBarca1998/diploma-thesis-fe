import { Property } from "@/types/property";
import { ZodRule } from "./func-form";
import { useUrlContext } from "./providers/url-provider";
import { fetchInfoByType } from "@/api-utils/server-managment-api";
import { NotFoundInput } from "./not-found-input";
import { EnumInput } from "./enum-input";

export const UnknownInput = async ({ 
    property,
    onAddRule
} : { 
    property: Property,
    onAddRule: (rule: ZodRule) => void
}) => {

    const url = useUrlContext();
    const baseUrl = () => {
        const lastSegmentIndex = url.lastIndexOf('/management');

        if (lastSegmentIndex !== -1) {
            return url.substring(0, lastSegmentIndex + '/management'.length);
        }

        return url;
    }
    const propertyInfo = await fetchInfoByType(property.type, baseUrl());
    
    if (propertyInfo == null) {
        return <NotFoundInput property={property} onAddRule={onAddRule} />;
    } else {
        if (propertyInfo.enums.length > 0) {
            return <EnumInput property={property} values={propertyInfo.enums} />;
        }

        return (
            <div className="form-control">
                {propertyInfo.type}
            </div>
        );
    }
};