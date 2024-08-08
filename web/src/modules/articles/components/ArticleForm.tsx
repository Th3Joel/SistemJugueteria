import { InputText, IOptions } from "@/modules/core/components/InputText.tsx";
import { FaArrowDownWideShort, FaBarcode, FaBoxOpen, FaDatabase, FaTag } from "react-icons/fa6";
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
  CategoryID: string,
  Code: string,
  Description: string,
  Stock: string,
  SalePrice: string,
}
interface ISelect {
  id: string,
  code: string,
  description: string,
}

interface ISelect2 {
  id: string,
  name: string,
}
export const ArticleForm: React.FC<IProps> = ({ isEdit, id }) => {
  const [select, setSelect] = useState<IOptions[]>([{ key: "", value: "" }]);
  const [select2, setSelect2] = useState<IOptions[]>([{ key: "", value: "" }]);
  const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
    CategoryID: "",
    ArticleBoxID: "",
    Code: "",
    Description: "",
    Stock: "",
    SalePrice: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(isEdit ? `/articles/${id}` : "/articles", e, isEdit).then((res) => {
      if (res) {
        navigate("/articles");
      }
    });
  };

  const fetchDataSelect = async() => {
    let res = await useFetch<ISelect[]>("/articles-box/select", "GET");
    if (res) {
      setSelect(res.map((data) => ({
        key: data.id,
        value: data.code + " - " + data.description,
      })));
    }

     let res2 = await useFetch<ISelect2[]>("/categories/select", "GET");
    if (res2) {
      setSelect2(res2.map((data) => ({
        key: data.id,
        value: data.name,
      })));
    }

  }

  useEffect(() => {
    (async() => {
      await fetchDataSelect();
      if (isEdit) {
        get("/articles/" + id);
      }
    })()
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

      {<InputText
        label="Categoría"
        name="CategoryId"
        value={data?.CategoryID}
        onChange={inputChange}
        error={!!errors?.CategoryID}
        helperText={errors?.CategoryID}
        type="select"
        icon={<FaTag />}
        options={select2}
      />}


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
        label="Precio de venta"
        name="SalePrice"
        placeholder="Precio"
        icon={<p>C$</p>}
        value={data?.SalePrice}
        onChange={inputChange}
        error={!!errors?.SalePrice}
        helperText={errors?.SalePrice}
      />

      <div className="flex justify-between">
        <Link to="/articles">
          <Button variant="contained" type="button">
            Atrás
          </Button>
        </Link>
        <Button variant="contained" type="submit">
          {loading || select[0].key == "" || select2[0].key == "" ? <LoaderBtn /> : "Guardar"}
        </Button>
      </div>
    </form>
  </div>)
}