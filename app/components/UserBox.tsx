'use client';

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import Avatar from "./Avatar";
import LoadingModal from "./LoadingModal";

interface UserBoxProps {
    data : User;
}
const UserBox : React.FC<UserBoxProps> = ({data}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        axios.post("api/conversations", {
            userId : data.id
        })
        .then((response)=>{
            router.push(`/conversations/${response.data.id}`);
        })
        .finally(()=>{
            setIsLoading(false);
        });
    }, [data, router]);
    return (
        <>
            {isLoading && <LoadingModal /> }
            <div onClick={handleClick} 
            className="w-full relative flex items-center space-x-3 bg-gray-100 p-3 hover:bg-gray-200 transition cursor-pointer rounded-lg">
                <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-md font-semibold text-gray-900">
                                {data.name}
                            </p>    
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserBox;