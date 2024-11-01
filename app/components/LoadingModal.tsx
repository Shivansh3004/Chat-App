'use client';
import { Fragment } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import {ClipLoader} from "react-spinners";

const LoadingModal = () => {
    return (
        <Transition show as={Fragment}>
            <Dialog as="div" className="relative-z-50" onClose={()=>{}}>
                <TransitionChild as="div" enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-100">
                    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 transition-opacity" />
                    <div className="fixed inset-0 overflow-y-auto z-10">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <DialogPanel>
                                <ClipLoader color="#000" size={40} />
                            </DialogPanel>
                        </div>
                    </div>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
};

export default LoadingModal;