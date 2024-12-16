import { ArticleForm } from "@/modules/articles/components/ArticleForm"
import { Card } from "@/modules/core/components/Card"
import { TitleState } from "@/modules/core/states/title-state";
import { useEffect } from "react";

const AddArticles = () => {
  const { setTitle } = TitleState();
    useEffect(() => {
        setTitle("Agregar artículo");
    }, [])
  return (
    <Card btnBack btnBackLink="/articles">
        <div className="flex justify-center m-5">
            <ArticleForm />
        </div>

    </Card>
  )
}

export default AddArticles;