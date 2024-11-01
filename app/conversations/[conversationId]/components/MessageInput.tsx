'use client';
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
    id : string;
    placeholder? : string;
    register : UseFormRegister<FieldValues>;
    required? : boolean;
    type?: string;
    errors : FieldErrors;
}
const MessageInput : React.FC<MessageInputProps> = ({id, placeholder, register, errors, type, required}) => {
    return (
        <div className="relative w-full">
            <input type={type} id={id} placeholder={placeholder} 
            {...register(id, {required})} autoComplete={id} className="text-black font-light py-2 px-4 bg-neutral-100 rounded-full w-full focus:outline-none border border-neutral-300 placeholder:text-neutral-600" />
        </div>
    );
};

export default MessageInput;