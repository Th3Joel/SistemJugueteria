import { InputText } from "@/modules/core/components/Input";

import { FaArrowDownWideShort, FaBarcode } from "react-icons/fa6";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "@/modules/core/hooks/useForm.ts";
import LoaderBtn from "@/modules/core/components/LoaderBtn.tsx";

interface IProps {
  isEdit?: boolean;
  id?: string;
}

interface IFormData {
  Code: string;
  Description: string;
  ToysQuantity: string;
  PurchasePrice: string;
}

export const ArticleBoxForm: React.FC<IProps> = ({ isEdit, id }) => {
  const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
    Code: "",
    Description: "",
    ToysQuantity: "",
    PurchasePrice: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(isEdit ? `/articles-box/${id}` : "/articles-box", e.currentTarget, isEdit).then((res) => {
      if (res) {
        navigate("/articles-box");
      }
    });
  };

  useEffect(() => {
    if (isEdit) {
      get("/articles-box/" + id);
    }

  }, []);
  return (
    <div className="w-[350px] pb-5 px-5 shadow-lg rounded-lg border">
      <h2 className="text-center text-red-500 text-sm my-2">Campo obligatorios *</h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <InputText
          label="Código *"
          name="Code"
          icon={<FaBarcode />}
          value={data?.Code}
          onChange={inputChange}
          error={!!errors?.Code}
          helperText={errors?.Code}
        />
        <InputText
          label="Descripción *"
          name="Description"
          multiline
          rows={2}
          icon={<FaArrowDownWideShort />}
          value={data?.Description}
          onChange={inputChange}
          error={!!errors?.Description}
          helperText={errors?.Description}
        />

        {/* <InputText
          label="Cantidad de artículos"
          name="ToysQuantity"
          icon={<FaDatabase />}
          value={data?.ToysQuantity}
          onChange={inputChange}
          error={!!errors?.ToysQuantity}
          helperText={errors?.ToysQuantity}
        />

        <InputText
          label="Precio de compra"
          name="PurchasePrice"
          icon={<p>C$</p>}
          value={data?.PurchasePrice}
          onChange={inputChange}
          error={!!errors?.PurchasePrice}
          helperText={errors?.PurchasePrice}
        /> */}

        <Button variant="contained" type="submit">
          {loading ? <LoaderBtn /> : isEdit ? "Actualizar" : "Guardar"}
        </Button>
      </form>
    </div>
  );
};