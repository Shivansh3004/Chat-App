'use client';

import { IconType } from "react-icons";
import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
    href : string;
    icon : IconType;
    label : string;
    active? : boolean;
    onClick? : ()=>void;
}
const MobileItem : React.FC<MobileItemProps> = ({href, icon : Icon, label, onClick, active}) => {
    const handleClick = ()=>{
        if (onClick) return onClick();
        
    }
    return (
        <Link href={href} onClick={onClick}
        className={clsx("group flex gap-x-3 text-sm font-semibold leading-6 w-full justify-center p-4 hover:bg-gray-200 hover:text-gray-900"
            , active && "text-gray-900 bg-gray-100"
        )}>
            <Icon className="w-6 h-6 shrink-0" />
        </Link>
    );
};

export default MobileItem;