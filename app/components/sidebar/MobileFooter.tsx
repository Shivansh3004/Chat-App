"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () =>{
    const routes = useRoutes();
    const {isOpen} = useConversation();

    if (isOpen) return null;
    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-gray-100 border-t-[1px] lg:hidden">
            {routes.map((item)=>(
                <MobileItem
                key={item.label}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={item.active}
                onClick={item.onClick}
                />
            ))}
        </div>
    )
}

export default MobileFooter;