'use client';

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import {Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";
import {IoClose, IoTrash} from "react-icons/io5";
import Avatar from "@/app/components/Avatar";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface ProfileDrawerProps {
    data : Conversation & { users : User[]};
    isOpen : boolean;
    onClose : ()=>void;
}
const ProfileDrawer : React.FC<ProfileDrawerProps> = ({data, isOpen, onClose}) => {
    const otherUser = useOtherUser(data);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const {members} = useActiveList();
    const isActive = members.indexOf(otherUser.email || "") !== -1;
    const joinedDate = useMemo(()=>{
        return format(new Date(otherUser.createdAt), 'PP');
    }, [otherUser.createdAt]);

    const title = useMemo(()=>{
        return data.name || otherUser.name;
    }, [data.name, otherUser.name]);

    const statusText = useMemo(()=>{
        if (data.isGroup){
            return `${data.users.length} members`
        }

        return isActive ? 'Active' : 'Offline';
    }, [data, isActive]);


    return (
        <>
        <ConfirmModal isOpen={confirmOpen} onClose={()=> {setConfirmOpen(false)}} />
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" onClose={onClose} className="relative z-50" >
                <TransitionChild
                as={Fragment} enter="ease-out duration-500" enterFrom="opacity-0"
                enterTo="opacity-100" leave="ease-in duration-500" leaveTo="opacity-0" leaveFrom="opacity-100">
                    <div className="fixed inset-0 bg-black opacity-40" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                            <TransitionChild as={Fragment} enter="transform transition ease-in-out duration-500" enterFrom="translate-x-full" enterTo="translate-x-0"  leave="transform transition ease-in-out duration-500" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full overflow-y-scroll flex-col bg-gray-100 py-6 shadow-xl">
                                        <div className="px-4 sm:px-4">
                                            <div className="flex items-start justify-end">
                                                <div className="ml-3 items-center flex h-7">
                                                    <button type="button" onClick={onClose}className="rounded-md bg-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                                                        <span className="sr-only">Close panel</span>
                                                        <IoClose size={24} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                            <div className="flex flex-col items-center">
                                                <div className="mb-2">
                                                    {data.isGroup ? <AvatarGroup users={data.users}/> : <Avatar user={otherUser} />}
                                                </div>
                                                <div>
                                                    {title}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {statusText}
                                                </div>
                                                <div className="flex gap-10 my-8">
                                                    <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75" onClick={()=>{setConfirmOpen(true)}}>
                                                        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                                                            <IoTrash size={20} />
                                                        </div>
                                                        <div className="text-sm font-light text-neutral-600">Delete</div>
                                                    </div>
                                                </div>
                                                <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                                    <dl
                                                        className="px-4 space-y-8 sm:px-6 sm:space-y-6">
                                                            {data.isGroup && (
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500 sm:flex-shrink-0 sm:w-40">
                                                                        Emails
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                        {data.users.map((user)=>user.email).join(', ')}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500 sm:flex-shrink-0 sm:w-40">
                                                                        Email
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                                                        {otherUser.email}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data.isGroup && (
                                                                <>
                                                                <hr />
                                                                <div>
                                                                    <dt className="text-sm font-medium text-gray-500 sm:flex-shrink-0 sm:w-40">
                                                                        Joined
                                                                    </dt>
                                                                    <time className="mt-1 text-sm text-gray-900 sm:col-span-2" dateTime={joinedDate}>
                                                                        {joinedDate}
                                                                    </time>
                                                                </div>
                                                                </>
                                                            )}
                                                        </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    );
};

export default ProfileDrawer;