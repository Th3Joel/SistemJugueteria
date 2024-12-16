import {Card} from "@/modules/core/components/Card.tsx";
import {ArticleBoxForm} from "@/modules/articleBox/components/ArticleBoxForm.tsx";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";
const AddArticleBox = () => {
  const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Agregar caja de artículos");
    }, [])
  return (
    <Card btnBack btnBackLink="/articles-box">
        <div className="flex justify-center m-5">
            <ArticleBoxForm />
        </div>

    </Card>
  );
};
export default AddArticleBox;