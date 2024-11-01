'use client';

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import {find} from "lodash";
import { pusherClient } from "@/app/libs/pusher";

interface BodyProps {
    initialMessages: FullMessageType[]
}
const Body : React.FC<BodyProps> = ({initialMessages}) => {
    const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const {conversationId} = useConversation();

    useEffect(()=>{
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId]);
    
    useEffect(()=>{
        pusherClient.subscribe(conversationId!)
        bottomRef.current?.scrollIntoView({behavior : "smooth"});
        
        const messageHandler = (message: FullMessageType)=>{
            axios.post(`/api/conversations/${conversationId}/seen`)
            setMessages((current)=>{
                if (find(current, {id : message.id})) return current;
                return [...current, message];
            });
            bottomRef.current?.scrollIntoView({behavior : "smooth"});
        }
        const updateMessageHandler = (newMessage: FullMessageType)=>{
            axios.post(`/api/conversations/${conversationId}/seen`)
            setMessages((current)=>
                current.map((message)=>{
                    if (message.id === newMessage.id) return newMessage;
                    return message;
                }
            ));
            bottomRef.current?.scrollIntoView({behavior : "smooth"});
        }
        pusherClient.bind("messages:new", messageHandler);
        pusherClient.bind("message:update", updateMessageHandler);
        return ()=>{
            pusherClient.unsubscribe(conversationId!)
            pusherClient.unbind("messages:new");
            pusherClient.unbind("message:update");
        }
    }, [conversationId]);
    
    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message, index)=>(
                <MessageBox key={message.id} isLast={index === messages.length - 1} data={message} />
            ))}
            <div ref={bottomRef} className="pt-24"></div>
        </div>
    );
};

export default Body;