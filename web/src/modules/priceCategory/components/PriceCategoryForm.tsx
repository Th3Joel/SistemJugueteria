import { InputText, IOptions } from "@/modules/core/components/InputText.tsx";
import { FaArrowDownWideShort, FaBarcode, FaBoxOpen, FaDatabase, FaICursor } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";
import { useForm } from "@/modules/core/hooks/useForm.ts";
import { useEffect, useState } from "react";
import { useFetch } from "@/modules/core/hooks/useFetch.ts";

interface IProps {
    isEdit?: boolean;
    id?: string;
}
interface IFormData {
    ArticleBoxID: string,
    Code: string,
    Name: string,
    Description: string,
    Stock: string,
    SalePrice: string,
}
interface ISelect {
    id: string,
    code: string,
    description: string,
}
export const PriceCategoryForm: React.FC<IProps> = ({ isEdit, id }) => {
    const [select, setSelect] = useState<IOptions[]>([{ key: "", value: "" }]);
    const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
        ArticleBoxID: "",
        Code: "",
        Name: "",
        Description: "",
        Stock: "",
        SalePrice: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(isEdit ? `/price-categories/${id}` : "/price-categories", e, isEdit).then((res) => {
            if (res) {
                navigate("/price-categories");
            }
        });
    };

    const fetchDataSelect = () => {
        useFetch<ISelect[]>("/articles-box/select", "GET").then((res) => {
            if (res) {
                setSelect(res.map((data) => ({
                    key: data.id,
                    value: data.code + " - " + data.description,
                })));
            }

        });

    }

    useEffect(() => {
        fetchDataSelect();
        if (isEdit) {
            get("/price-categories/" + id);
        }
    }, []);
    return (<div className="w-[350px] p-3 shadow-lg rounded-lg">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {<InputText
                label="Asignar a una caja de artículos"
                name="ArticleBoxId"
                value={data?.ArticleBoxID}
                onChange={inputChange}
                error={!!errors?.ArticleBoxID}
                helperText={errors?.ArticleBoxID}
                type="select"
                icon={<FaBoxOpen />}
                options={select}
            />}

            <InputText
                label="Nombre"
                name="Name"
                placeholder="Nombre"
                icon={<FaICursor />}
                value={data?.Name}
                onChange={inputChange}
                error={!!errors?.Name}
                helperText={errors?.Name}
            />
            <InputText
                label="Descripción"
                name="Description"
                multiline
                rows={2}
                placeholder="Descripción"
                icon={<FaArrowDownWideShort />}
                value={data?.Description}
                onChange={inputChange}
                error={!!errors?.Description}
                helperText={errors?.Description}
            />
            <InputText
                label="Código"
                name="Code"
                placeholder="Código"
                icon={<FaBarcode />}
                value={data?.Code}
                onChange={inputChange}
                error={!!errors?.Code}
                helperText={errors?.Code}
            />

            <InputText
                label="Cantidad"
                name="Stock"
                placeholder="Cantidad"
                icon={<FaDatabase />}
                value={data?.Stock}
                onChange={inputChange}
                error={!!errors?.Stock}
                helperText={errors?.Stock}
            />

            <InputText
                label="Precio"
                name="SalePrice"
                placeholder="Precio"
                icon={<p>C$</p>}
                value={data?.SalePrice}
                onChange={inputChange}
                error={!!errors?.SalePrice}
                helperText={errors?.SalePrice}
            />

            <div className="flex justify-between">
                <Link to="/price-categories">
                    <Button variant="contained" type="button">
                        Atrás
                    </Button>
                </Link>
                <Button variant="contained" type="submit">
                    {loading || select[0].key == "" ? <LoaderBtn /> : "Guardar"}
                </Button>
            </div>
        </form>
    </div>)
}