'use client';

import { useState, useEffect } from "react";
import Modal from "@/app/components/Modal";
import NextImage from "next/image";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
    const [imageDimensions, setImageDimensions] = useState<{ width: number, height: number } | null>(null);

    useEffect(() => {
        if (src) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setImageDimensions({
                    width: img.width,
                    height: img.height,
                });
            };
        }
    }, [src]);

    if (!src || !imageDimensions) return null;

    const aspectRatio = imageDimensions.width / imageDimensions.height;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const maxModalWidth = windowWidth * 0.72;  // 80% of window width
    const maxModalHeight = windowHeight * 0.72;  // 80% of window height

    let modalWidth, modalHeight;

    if (maxModalWidth / aspectRatio <= maxModalHeight) {
        modalWidth = maxModalWidth;
        modalHeight = modalWidth / aspectRatio;
    } else {
        modalHeight = maxModalHeight;
        modalWidth = modalHeight * aspectRatio;
    }

    return (
        <Modal isOpen={isOpen} onClose={() => onClose()}>
            <div style={{ width: modalWidth, height: modalHeight }}>
                <NextImage alt="Image" src={src} className="object-cover" fill />
            </div>
        </Modal>
    );
};

export default ImageModal;
