import {Card} from "@/modules/core/components/Card.tsx";
import {PriceCategoryForm} from "@/modules/priceCategory/components/PriceCategoryForm.tsx";

export const AddPriceCategory = () => {
    return (
        <Card>
            <div className="grid place-items-center m-5">
                <PriceCategoryForm />
            </div>
        </Card>
    )
}