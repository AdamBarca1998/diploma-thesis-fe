import { MultipleFieldErrors } from "react-hook-form";

export const FieldError = (
    data: {
    message: string;
    messages?: MultipleFieldErrors | undefined;
}) => {

    return (
        <div>
            <p className="text-red-600">{data.message}</p>

            {
                data.messages && Object.entries(data.messages).map(([type, message]) => (
                    <p key={type}>{message}</p>
                ))
            }
        </div>
    );
};