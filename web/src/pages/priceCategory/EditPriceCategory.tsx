import {PriceCategoryForm} from "@/modules/priceCategory/components/PriceCategoryForm.tsx";
import {Card} from "@/modules/core/components/Card.tsx";
import {useParams} from "react-router-dom";
interface Params {
    [key: string]: string;
    id: string;
}
export const EditPriceCategory = () => {
    const {id} = useParams<Params>();
    return <Card>
        <div className="grid place-items-center m-5">
            <PriceCategoryForm isEdit id={id}/>
        </div>
    </Card>
}