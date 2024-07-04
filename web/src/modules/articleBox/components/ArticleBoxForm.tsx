import {InputText} from "@/modules/core/components/InputText.tsx";

import {FaDatabase, FaArrowDownWideShort, FaBarcode} from "react-icons/fa6";
import {Button} from "@mui/material";
import {Raya} from "@/modules/core/components/Raya.tsx";
export const ArticleBoxForm = () => {
  return (
    <div className="w-[350px] p-3 shadow-lg rounded-lg">
        <form className="flex flex-col gap-3">
            <InputText
                label="Descripción"
                placeholder="Enter title"
                multiline
                rows={2}
                icon={<FaArrowDownWideShort/>}
            />
            <div className="flex flex-row gap-3">
                <InputText
                    label="Código"
                    icon={<FaBarcode/>}
                />
                <Raya/>
                <InputText
                    label="Cantidad"
                    icon={<FaDatabase/>}
                />
            </div>
            <InputText
                label="Precio de compra"
                icon={<p>C$</p>}
            />
            <div className="flex justify-between">
                <Button variant="contained" type="button">
                    Atrás
                </Button>
                <Button variant="contained" type="button">
                    Guardar
                </Button>
            </div>
        </form>
    </div>
);
};