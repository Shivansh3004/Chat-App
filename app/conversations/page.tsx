"use client";

import clsx from "clsx";
import useConversation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

const Home = () => {
    const {isOpen} = useConversation();
    return (
        <div className={clsx(
            "lg:pl-20 h-full block",
            isOpen ? "block" : "hidden"
        )}>
            <EmptyState />
        </div>
    )
}

export default Home;