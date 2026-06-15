// 検索結果に表示する記事カード。
// 現状はタイトルと抜粋のみのシンプルな表示。
export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <a className="article-card__title" href={`/articles/${article.id}`}>
        {article.title}
      </a>
      <p className="article-card__excerpt">{article.excerpt}</p>
    </div>
  )
}
