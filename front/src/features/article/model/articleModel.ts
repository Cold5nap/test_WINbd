export interface ArticleContent{
	type: string
	data:string
}

export interface Article {
	_id:string
	content:ArticleContent[]
	title: string;
	isPublished: boolean;
	publishAt: string;
}
