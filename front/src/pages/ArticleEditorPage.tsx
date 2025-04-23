import { Editor, useGetArticleQuery } from "@features/article"
import React from "react"
import { useParams } from "react-router-dom"

const ArticleEditorPage = () => {
	const { id } = useParams()
	const {data:article} = useGetArticleQuery(id||'',{skip:!id})
	return <Editor article={article} />
}
export default ArticleEditorPage