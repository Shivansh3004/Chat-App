'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
    isOpen? : boolean;
    onClose : () => void;
    children : React.ReactNode;
}
const Modal : React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    return (
        <Transition show={isOpen} as={Fragment} >
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity" />
                </TransitionChild>
                
                <div className="fixed inset-0 overflow-y-auto z-20">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-:100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-:100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel className="relative transform overflow-hidden bg-gray-100 rounded-lg px-4 pb-4 text-left transition-all sm:my-8 sm:w-full sm:p-6 shadow-xsl sm:max-w-lg w-full">
                            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block z-20">
                                <button type="button" className="rounded-md bg-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" onClick={onClose}>
                                    {/* <span className="sr-only">Close</span> */}
                                    <IoClose className="w-6 h-6" />
                                </button>
                            </div>
                            {children}
                        </DialogPanel>
                    </TransitionChild>
                </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Modal;