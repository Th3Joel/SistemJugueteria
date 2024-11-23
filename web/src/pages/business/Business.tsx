import { Card } from "@/modules/core/components/Card"
import { InputText, IOptions } from "@/modules/core/components/Input"
import { useFetch } from "@/modules/core/hooks/useFetch";
import { useEffect, useState } from "react";
import { FaDatabase, FaICursor, FaTruck } from "react-icons/fa6"
import { IArticle } from "../articles/Articles";
import { IResponseFetch } from "@/types";
import { Button } from "@mui/material";
import { useForm } from "@/modules/core/hooks/useForm";
import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { useTable } from "@/modules/core/hooks/useTable";
import Table from "@/modules/core/components/Table";
import { toast } from "sonner";
import { TitleState } from "@/modules/core/states/title-state";
import { noLetters, TErrors } from "@/modules/purchase/states/purchase-state";
import dayjs from "dayjs";

interface IFormData {
    ArticleID: string
    Quantity: string
    Reason: string
}
interface IBusiness {
    id: string
    ArticleID: string
    Article: {
        Description: string
        Category: {
            Name: string
        }
        Stock: string
    }
    Quantity: string
    Reason: string
    createdAt: string

}

const Business = () => {
    const { setTitle } = TitleState();
    const { post, loading, data, inputChange } = useForm<IFormData>({
        ArticleID: "",
        Quantity: "",
        Reason: ""
    });

    const [selectProvee, setSelectProvee] = useState<IOptions[]>([{ id: "", label: "" }]);
    const hook = useTable<IBusiness>();
    const [articles, setArticles] = useState<IArticle[]>([])
    const [errors, setErrors] = useState<TErrors>({})

    const fecthArticles = async () => {
        const res = await useFetch<IResponseFetch<IArticle>>("/articles?page=1&pageSize=2000", "GET");
        const op: IOptions[] = []
        res.all.data.map((data) => {
            if (data.Stock != "0") {
                op.push({
                    id: data.id,
                    label: data.Category.Name + " | " + data.Description,
                })
            }
        }
        );
        setArticles(res.all.data)
        setSelectProvee(op);
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let val = true
        const form = new FormData(e.currentTarget)
        const artId = form.get("ArticleID") as string
        const quan = form.get("Quantity") as string
        const reason = form.get("Reason") as string
        console.log(artId, quan, reason)

        const art = articles.find(d => d.id == artId)
        const err: TErrors = {}
        if (artId == "") {
            err["ArticleID"] = "Debe selecionar un artículo"
            val = false
        }
        if (quan == "") {
            err["Quantity"] = "Debe ingresar una cantidad"
            val = false

        } else if (!noLetters(quan)) {
            // setErrors({Quantity:"Debe ingresar un número"})
            err["Quantity"] = "Debe ingresar un número"
            val = false

        }else if(!art){
            err["Quantity"] = "Debes de seleccionar el artículo"
            val = false
        } 
        else if (Number(quan) > Number(art?.Stock)) {
            //setErrors({Quantity:"La cantidad ingresada excede el stock de este artículo"})
            err["Quantity"] = "Solo hay disponible " + art?.Stock+" en stock"
            val = false

        }
        if (reason == "") {
            err["Reason"] = "Debe ingresar un motivo"
            val = false
        }

        setErrors(err)
        if (!val) return
        post("/business", e.currentTarget).then((res) => {
            if (res) {
                toast.success("Guardado correctamente")
                hook.get("/business?page=1&pageSize=10")
            }
        });
    };


    useEffect(() => {
        fecthArticles();
        setTitle("Otras salidas de inventario");
    }, [])
    return (
        <Card>
            <div className="p-3">
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
                        />
                    </span>
                    <InputText
                        label="Cantidad"
                        name="Quantity"
                        placeholder="Requerido"
                        icon={<FaDatabase />}
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
                                    { id: "Daño", label: "Daño" },
                                    { id: "Uso personal", label: "Uso personal" },
                                    { id: "Regalía", label: "Regalía" },
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
                        colunms={["Artículo", "Cantidad", "Motivo de la salida","Fecha"]}
                        ruta="business"
                        body={() =>
                            hook.all?.data.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.Article.Category.Name + " | " + d.Article.Description}</td>
                                    <td>{d.Quantity}</td>
                                    <td>{d.Reason}</td>
                                    <td>{dayjs(d.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
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