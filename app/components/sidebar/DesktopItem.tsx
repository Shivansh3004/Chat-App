'use client';
import { IconType } from "react-icons";
import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
    href : string;
    icon : IconType;
    label : string;
    active? : boolean;
    onClick? : ()=>void;
}
const DesktopItem : React.FC<DesktopItemProps> = ({label, href, icon : Icon, active, onClick}) => {
    const handleClick = ()=>{
        if (onClick)
            return onClick();
    }
    return (
        <li onClick={handleClick}>
            <Link href={href} className={clsx("group flex gap-x-3 rounded-md text-sm p-3 leading-6 text-gray-600 hover:text-black hover:bg-gray-100",
                active && "text-black bg-gray-100"
            )}>
                <Icon className="w-6 h-6 shrink-0" />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    );
};

export default DesktopItem;