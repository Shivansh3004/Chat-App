"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGoogle, BsGithub } from "react-icons/bs";
import {signIn, useSession} from "next-auth/react"
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>("LOGIN");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        if(session?.status === "authenticated"){
            router.push("/users");
        }
    
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        setVariant((prev) => prev === "LOGIN" ? "REGISTER" : "LOGIN");
    }, [variant]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            username : "",
            email: "",
            password: "",
        }
    });

    const onSubmit :SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === "LOGIN") {
            signIn("credentials", {
                ...data,
                redirect: false,
            })
            .then((callback)=>{
                if(callback?.error){
                    toast.error(callback.error);
                }
                if (callback?.ok) {
                    toast.success("Logged in successfully");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        } else {
            axios.post('/api/auth/register', data)
            .then(()=>signIn("credentials", data))
            .catch((error) => {
                toast.error(error.response.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    };
    const socialAction = useCallback((provider: string) => {
        setIsLoading(true);
        signIn(provider, {redirect: false})
        .then((callback)=>{
            if(callback?.error){
                toast.error(callback.error);
            }
            if (callback?.ok) {
                toast.success("Logged in successfully");
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);
    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-gray-100 px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && <Input id="name" type="text" label="Name" register={register} errors={errors} disabled={isLoading} />}
                    <Input id="email" type="email" label="Email" register={register} errors={errors} disabled={isLoading} />
                    <Input id="password" type="password" label="Password" register={register} errors={errors} disabled={isLoading} />
                    <Button type="submit" disabled={isLoading} fullWidth>
                        {variant === "LOGIN" ? "Sign in" : "Sign up"}
                    </Button>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-100 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <AuthSocialButton icon={BsGithub} onClick={()=>{socialAction("github")}} />
                        <AuthSocialButton icon={BsGoogle} onClick={()=>{socialAction("google")}} />
                    </div>
                    <div className="flex gap-2 justify-center text-sm text-gray-600 mt-6 px-2">
                        <div>
                            {variant === "LOGIN" ? "New here?" : "Already have an account?"}
                        </div>
                        <div className="underline cursor-pointer" onClick={toggleVariant}>
                            {variant === "LOGIN" ? "Create an account" : "Sign in"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}