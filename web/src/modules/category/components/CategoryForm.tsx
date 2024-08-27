import {InputText} from "@/modules/core/components/Input";
import {FaArrowDownWideShort, FaICursor} from "react-icons/fa6";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {useForm} from "@/modules/core/hooks/useForm.ts";
import {useEffect} from "react";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";

interface IProps {
    isEdit?: boolean;
    id?: string;
}
interface IFormData {
    Name: string;
    Description: string;
}

export const CategoryForm:React.FC<IProps> = ({isEdit,id}) => {
    const {post,errors,loading,data,get,inputChange} = useForm<IFormData>({
        Name: "",
        Description: "",
    });

    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(isEdit ? `/categories/${id}` : "/categories", e.currentTarget, isEdit).then((res) => {
            if (res) {
                navigate("/categories");
            }
        });
    };

    useEffect(() => {
        if (isEdit) {
            get("/categories/" + id);
        }

    }, []);
    return (
        <div className="w-[350px] p-3 shadow-lg rounded-lg">
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
                    icon={<FaArrowDownWideShort/>}
                    value={data?.Description}
                    onChange={inputChange}
                    error={!!errors?.Description}
                    helperText={errors?.Description}
                />
                <div className="flex justify-between">
                   <Link to="/categories">
                       <Button variant="contained" type="button">
                           Atrás
                       </Button>
                    </Link>

                    <Button variant="contained" type="submit" disabled={loading}>
                        {loading ? <LoaderBtn /> : "Guardar"}
                    </Button>
                </div>

                </form>

        </div>
    )
}