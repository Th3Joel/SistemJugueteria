import { Card } from "@/modules/core/components/Card"
import { InputText, IOptions } from "@/modules/core/components/Input"
import { useFetch } from "@/modules/core/hooks/useFetch";
import { useEffect, useState } from "react";
import { FaICursor, FaTruck } from "react-icons/fa6"
import { IArticle } from "../articles/Articles";
import { IResponseFetch } from "@/types";
import { Button } from "@mui/material";
import { useForm } from "@/modules/core/hooks/useForm";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { useTable } from "@/modules/core/hooks/useTable";
import Table from "@/modules/core/components/Table";
import { toast } from "sonner";

interface IFormData {
    ArticleID: string
    Quantity: string
    Reason: string
}
interface IBusiness {
    id: string
    ArticleID: string
    Article:{
        Description: string
    }
    Quantity: string
    Reason: string
}

const Business = () => {

    const { post, errors, loading, data, inputChange } = useForm<IFormData>({
        ArticleID: "",
        Quantity: "",
        Reason: ""
    });

    const [selectProvee, setSelectProvee] = useState<IOptions[]>([{ key: "", value: "" }]);
    const hook = useTable<IBusiness>();

    const fecthArticles = async () => {
        const res = await useFetch<IResponseFetch<IArticle>>("/articles?page=1&pageSize=2000", "GET");
        const selectProvee = res.all.data.map((data) => ({
            key: data.id,
            value: data.Description,
        }));
        setSelectProvee(selectProvee);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/business", e.currentTarget).then((res) => {
            if (res) {
                toast.success("Guardado correctamente")
                hook.get("/business?page=1&pageSize=10")
            }
        });
    };


    useEffect(() => {
        fecthArticles();
    }, [])
    return (
        <Card>
            <div className="p-3">
                <h1 className="text-xl mb-2">Otras salidas de inventario</h1>

                <form className="flex gap-3 w-full flex-wrap justify-center" onSubmit={handleSubmit}>
                    <span className="w-[300px]">

                        <InputText
                            label="Artículo"
                            icon={<FaTruck />}
                            type="select"
                            name="ArticleID"
                            value={data.ArticleID}
                            error={!!errors?.ArticleID}
                            helperText={errors?.ArticleID}
                            options={selectProvee}
                            onChange={inputChange}
                        //valueChange={(e) => {
                        //if (e != "") changeInput(e, "supplierID");
                        //}}
                        />
                    </span>
                    <InputText
                        label="Cantidad"
                        name="Quantity"
                        placeholder="Requerido"
                        icon={<FaICursor />}
                        value={data.Quantity}
                        onChange={inputChange}
                        error={!!errors?.Quantity}
                        helperText={errors?.Quantity}
                    />
                    <span className="w-[300px]">

                        <InputText
                            label="Motivo de la salida"
                            name="Reason"
                            placeholder="(requerido)"
                            icon={<FaICursor />}
                            value={data.Reason}
                            onChange={inputChange}
                            error={!!errors?.Reason}
                            helperText={errors?.Reason}
                            type="select"
                            options={
                                [
                                    { key: "Daño", value: "Daño" },
                                    { key: "Vencimiento", value: "Vencimiento" },
                                    { key: "Uso personal", value: "Uso personal" },
                                    { key: "Regalía", value: "Regalía" },
                                ]
                            }
                        />
                    </span>
                    <Button variant="contained" color="primary" type="submit">
                        {
                            loading ? <LoaderBtn /> : "Guardar"
                        }
                    </Button>
                </form>

                <div className="w-full">
                        <Table
                        v2
                        hook={hook}
                        colunms={["Artículo", "Cantidad", "Motivo de la salida"]}
                        ruta="business"
                        body={() =>
                            hook.all?.data.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.Article.Description}</td>
                                    <td>{d.Quantity}</td>
                                    <td>{d.Reason}</td>
                                </tr>
                            ))
                        }
                        />
                </div>
            </div>
        </Card>
    )
}

export default Business