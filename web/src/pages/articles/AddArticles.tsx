import { ArticleForm } from "@/modules/articles/components/ArticleForm"
import { Card } from "@/modules/core/components/Card"

const AddArticles = () => {
  return (
    <Card>
        <div className="flex justify-center m-5">
            <ArticleForm />
        </div>

    </Card>
  )
}

export default AddArticles;