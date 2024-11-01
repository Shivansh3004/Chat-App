'use client';

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {  HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from 'next-cloudinary';

interface FormProps {
    
}
const Form : React.FC<FormProps> = () => {
    const {conversationId} = useConversation();
    const {register, handleSubmit, setValue, formState :{
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            message : ''
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
        setValue('message', '', {shouldValidate: true});
        await axios.post('/api/messages', {...data, conversationId});
    }

    const handleUpload = (result : any) => {
        axios.post('/api/messages', {image : result?.info?.secure_url, conversationId});
    }

    return (
        <div className="p-4 bg-gray-100 border-t flex items-center gap-2 lg:gap-4 w-full">
            <CldUploadButton options={{maxFiles : 1}} uploadPreset="Chat-App" onUpload={(res)=>handleUpload(res)}>
                <HiPhoto size={32} className="text-emerald-500" />
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full" >
                <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message..." />
            </form>
            <button type="submit" className="rounded-full p-2 bg-emerald-500 cursor-pointer hover:bg-emerald-600 transition">
                <HiPaperAirplane size={18} className="text-white" />
            </button>
        </div>
    );
};

export default Form;