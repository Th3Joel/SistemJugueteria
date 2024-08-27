import { useRef, useState } from "react";
import logoImg from '@/assets/logo.jpg'

export const ImageInput = () => {
    const [logo, setLogo] = useState<string>('');

    const fileRef = useRef<HTMLInputElement | null>(null);

    const handleFile = () => {
        if (fileRef.current) {
            const file = fileRef.current.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    setLogo(reader.result as string);

                };
            }
        }
    };
    const handleInputFile = () => {

        if (fileRef.current) {
            //fileRef.current.click();
        }
    };
    const RenderImage: React.FC<{ width: number, height?: number }> = ({ width, height }) => (
        <>
            <img src={logo ? logo : logoImg} width={width} height={height} alt="logo" />
        </>
    )

    const RenderInputFile = () => (

        <div
            onClick={handleInputFile}
            className={'mx-auto bg-gray-300 cursor-pointer w-full text-center border px-3 py-2 rounded-lg'}>
            Seleccionar imagen
            <input type="file" accept='image/*' name="file0" onChange={handleFile} ref={fileRef} />

        </div>
    )

    return {
        RenderImage,
        RenderInputFile
    }
}
