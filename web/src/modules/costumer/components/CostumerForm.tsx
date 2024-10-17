import LoaderBtn from "@/modules/core/components/LoaderBtn";
import { useForm } from "@/modules/core/hooks/useForm";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "@/modules/core/components/Input";
import { FaPhone, FaICursor } from "react-icons/fa6";

interface IProps {
  isEdit?: boolean;
  id?: string;
}

interface IFormData {
  Name: string;
  Phone: string;

}

export const CostumerForm: React.FC<IProps> = ({ isEdit, id }) => {
  const { post, errors, loading, data, get, inputChange } = useForm<IFormData>({
    Name: "",
    Phone: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(isEdit ? `/clientes/${id}` : "/clientes", e.currentTarget, isEdit).then((res) => {
      if (res) {
        navigate("/clientes");
      }
    });
  };

  useEffect(() => {
    if (isEdit) {
      get("/clientes/" + id);
    }
  }, []);
  return (
    <div className="w-[340px] shadow-lg rounded-lg px-5 pb-5 border">
      <h2 className="text-center text-red-500 text-sm my-2">Campo obligatorios *</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <InputText
          label="Nombre *"
          name="Name"
          value={data?.Name}
          isRequired={true}
          onChange={inputChange}
          error={!!errors?.Name}
          helperText={errors?.Name}
          icon={<FaICursor />}
        />
        <InputText
          label="Celular"
          name="Phone"
          value={data?.Phone}
          onChange={inputChange}
          error={!!errors?.Phone}
          helperText={errors?.Phone}
          icon={<FaPhone />}
        />
        <Button type="submit" disabled={loading} variant="contained">
          {loading ? <LoaderBtn /> : isEdit ? "Actualizar" : "Guardar"}
        </Button>
      </form>
    </div>
  );
};
