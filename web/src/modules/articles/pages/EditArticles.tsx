import { Card } from "@/modules/core/components/Card.tsx";
import { useParams } from "react-router-dom";
import { ArticleForm } from "@/modules/articles/components/ArticleForm";
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";
import { IParams } from "@/types";


const EditArticles = () => {
  const { id } = useParams<IParams>();
  const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Editar artículo");
    }, [])
  return (
    <Card btnBack btnBackLink="/articles">
      <div className="flex justify-center m-5">
        <ArticleForm isEdit id={id} />
      </div>
    </Card>
  );
};
export default EditArticles;