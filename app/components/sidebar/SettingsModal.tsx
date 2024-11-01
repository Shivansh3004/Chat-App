'use client';

import axios from "axios";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image"
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
    isOpen : boolean;
    onClose : ()=>void;
    currentUser : User;
}
const SettingsModal : React.FC<SettingsModalProps> = ({isOpen, onClose, currentUser}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, setValue, watch, formState : {
        errors
    }} = useForm<FieldValues>({
        defaultValues : {
            name : currentUser?.name,
            image : currentUser?.image,
        }
    });

    const image = watch("image");

    const handleUpload = (result : any) =>{
        setValue("image", result?.info?.secure_url, {shouldValidate : true});
    }

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/settings/', data)
        .then( () => {
            router.refresh();
            onClose();
        })
        .catch( (error) => { toast.error(error?.response?.data?.message || error.message); })
        .finally( () => setIsLoading(false));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Profile
                    </h2>
                    <p className="text-sm leading-6 text-gray-700 mt-1">
                        Update your profile information.
                    </p>
                    <div className="mt-10 flex flex-col gap-y-8">
                        <Input disabled={isLoading} errors={errors} label="Name" id="name" register={register} required />
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                Profile Picture
                            </label>
                            <div className="mt-3 flex items-center gap-x-3">
                                <Image height="32" width="32" src={image || currentUser?.image || "/images/placeholder.jpg"} alt="profile-picture" />
                                <CldUploadButton options={{maxFiles : 1}} onUpload={(res)=>handleUpload(res)} uploadPreset="Chat-App" >
                                    <Button disabled={isLoading} type="button" secondary>
                                        Change
                                    </Button>
                                </CldUploadButton>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-3">
                        <Button disabled={isLoading} secondary onClick={onClose}>Cancel</Button>
                        <Button disabled={isLoading} type="submit" onClick={onClose}>Submit</Button>
                    </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SettingsModal;