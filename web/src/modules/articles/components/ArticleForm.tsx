import { InputText, IOptions } from "@/modules/core/components/Input";
import { FaArrowDownWideShort, FaBarcode, FaDatabase, FaTag } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
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
  //ArticleBoxID: string,
  MinimunStock: string,
  CategoryID: string,
  Code: string,
  Description: string,
  Stock: string,
  SalePrice: string,
}


interface ISelectCategory {
  id: string,
  name: string,
}

export const ArticleForm: React.FC<IProps> = ({ isEdit, id }) => {
  const [select, setSelect] = useState<IOptions[]>([{ id: "", label: "" }]);
  //const [select2, setSelect2] = useState<IOptions[]>([{ key: "", value: "" }]);
  //const [cost, setCost] = useState<string>("");

  const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
    CategoryID: "",
    //ArticleBoxID: "",
    MinimunStock: "",
    Code: "",
    Description: "",
    Stock: "",
    SalePrice: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(isEdit ? `/articles/${id}` : "/articles", e.currentTarget, isEdit).then((res) => {
      if (res) {
        navigate("/articles");
      }
    });
  };

  const fetchData = async () => {


    const res2 = await useFetch<ISelectCategory[]>("/categories/select", "GET");
    if (res2) {
      setSelect(res2.map((data) => ({
        id: data.id,
        label: data.name,
      })));
    }

  }

  // const fetchCost = (id: string) => {
  //   useFetch<{ status: boolean, find: number }>("/articles-box/cost/" + id, "GET").then((res) => {
  //     if (res.status) {
  //       setCost("" + res.find.toFixed(2));
  //     }
  //   });

  // }

  useEffect(() => {
    (async () => {
      await fetchData();
      if (isEdit) {
        get("/articles/" + id);
      }
    })()
  }, []);
  return (<div className="w-[350px] pb-5 px-5 shadow-lg rounded-lg border">
    <h2 className="text-center text-red-500 text-sm my-2">Campo obligatorios *</h2>
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      {/*<InputText
        label="Asignar a una caja de artículos"
        name="ArticleBoxId"
        value={data?.ArticleBoxID}
        onChange={inputChange}
        error={!!errors?.ArticleBoxID}
        helperText={errors?.ArticleBoxID}
        type="select"
        icon={<FaBoxOpen />}
        options={select}
        //valueChange={fetchCost}
      />*/}

      {<InputText
        label="Categoría *"
        name="CategoryId"
        value={data.CategoryID}
        onChange={inputChange}
        error={!!errors?.CategoryID}
        helperText={errors?.CategoryID}
        type="select"
        icon={<FaTag />}
        options={select}
      />}


      <InputText
        label="Descripción *"
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
        label="Código *"
        name="Code"
        placeholder="Código"
        icon={<FaBarcode />}
        value={data?.Code}
        onChange={inputChange}
        error={!!errors?.Code}
        helperText={errors?.Code}
      />
      <InputText
        label="Stock mínimo"
        name="MinimunStock"
        placeholder="Stock mínimo"
        icon={<FaDatabase />}
        value={data?.MinimunStock}
        onChange={inputChange}
        error={!!errors?.MinimunStock}
        helperText={errors?.MinimunStock}
      />
      <InputText
        label="Stock actual"
        name="Stock"
        placeholder="Stock actual"
        icon={<FaDatabase />}
        value={data?.Stock}
        onChange={inputChange}
        error={!!errors?.Stock}
        helperText={errors?.Stock}
      />


      <InputText
        label="Precio de venta"
        name="SalePrice"
        placeholder="Precio de venta"
        icon={<p>C$</p>}
        value={data?.SalePrice}
        onChange={inputChange}
        error={!!errors?.SalePrice}
        helperText={errors?.SalePrice}
        iconSize="13px"
      />
      <Button variant="contained" type="submit" disabled={loading || select[0].id == ""}>
        {loading || select[0].id == "" ? <LoaderBtn /> : isEdit ? "Actualizar" : "Guardar"}
      </Button>
    </form>
  </div>)
}