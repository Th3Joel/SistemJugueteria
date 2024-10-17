import { InputText } from "@/modules/core/components/Input"
import { ModalProps } from "@/modules/core/components/Modal"
import { useForm } from "@/modules/core/hooks/useForm"
import React from "react"
import { FaICursor, FaPhone } from "react-icons/fa6"

interface IProps {
    RenderModal: React.FC<ModalProps>
    getData: () => void
    setModalShow: (show: boolean) => void
}
interface IFormData {
    Name: string
    Phone: string
}
export const AddCostumer: React.FC<IProps> = ({ RenderModal, getData,setModalShow }) => {

    const { post, loading, errors,setData } = useForm<IFormData>({
        Name: "",
        Phone: "",
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/clientes", e.currentTarget).then((res) => {
            if (res) {
                setModalShow(false)
                setData({Name:"",Phone:""})
                getData()
            }
        });
    }

    return (
        <RenderModal onSubmit={onSubmit} title="Agregar cliente" loadBtn={loading}>
            <div className="w-[300px] flex flex-col gap-3">
                <small className="text-center text-red-500 -my-2">Campo obligatorios *</small>
                <InputText
                    label="Nombre *"
                    name="Name"
                    icon={<FaICursor />}
                    error={!!errors?.Name}
                    helperText={errors?.Name}
                />
                <InputText
                    label="Celular"
                    name="Phone"
                    icon={<FaPhone />}
                    error={!!errors?.Phone}
                    helperText={errors?.Phone}
                />
            </div>
        </RenderModal>
    )
}
