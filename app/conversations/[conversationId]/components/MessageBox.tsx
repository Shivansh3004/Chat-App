'use client';

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    isLast : boolean;
    data : FullMessageType;
}
const MessageBox : React.FC<MessageBoxProps> = ({isLast, data}) => {
    const session = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const isOwn = session?.data?.user?.email === data?.sender?.email;
    const seenList = (data.seen || []).filter((user)=>user.email !== data?.sender?.email)
    .map((user)=>user.name).join(', ');

    const container = clsx('flex gap-3 p-4', isOwn && "justify-end");
    const avatar = clsx(isOwn && "order-2");
    const body = clsx("flex flex-col gap-2", isOwn && "items-end");
    const message = clsx("text-sm w-fit overflow-hidden", isOwn ? "text-white bg-emerald-500" : "bg-emerald-100", data.image ? "rounded-md p-0" : "rounded-full py-2 px-3");
    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'HH:mm')}
                    </div>
                </div>
                <div className={message}>
                    <ImageModal isOpen={imageModalOpen} onClose={()=>setImageModalOpen(false)} src={data.image} />
                    {data.image ? (
                        <Image src={data.image} height={288} width={288} alt="message" className="object-cover cursor-pointer hover:scale-110 transition translate" onClick={()=>setImageModalOpen(true)} />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs text-gray-500 font-light">
                        Seen by {seenList}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBox;