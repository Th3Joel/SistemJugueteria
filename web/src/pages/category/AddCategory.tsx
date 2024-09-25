import {CategoryForm} from "@/modules/category/components/CategoryForm.tsx";
import {Card} from "@/modules/core/components/Card.tsx";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";

const AddCategory = () => {
    const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Agregar categoría");
    }, [])
    return (
        <Card btnBack btnBackLink="/categories">
        <div className="grid place-items-center m-5">
            <CategoryForm/>
        </div>
        </Card>
    )
}
export default AddCategory;