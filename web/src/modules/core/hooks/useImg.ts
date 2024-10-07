import { useRef, useState } from "react";

export const useImg = () => { 
    const [img, setImg] = useState<string>('');

    const fileRef = useRef<HTMLInputElement | null>(null);

    const handleFile = () => {
        if (fileRef.current) {
            const file = fileRef.current.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setImg(reader.result as string);

                };
            }
        }
    };

    const handleInputFile = () => {

        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    return {
        fileRef,
        img,
        handleFile,
        handleInputFile
    }
}