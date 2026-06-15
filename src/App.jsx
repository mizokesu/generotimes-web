import { useMemo, useState } from 'react'
import { articles, categories } from './articles.js'
import ArticleCard from './ArticleCard.jsx'

export default function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('すべて')
  const [activeAuthor, setActiveAuthor] = useState('すべて')

  const authors = useMemo(
    () => ['すべて', ...new Set(articles.map((a) => a.author))],
    [],
  )

  const results = useMemo(() => {
    const q = query.trim()
    return articles.filter((a) => {
      const matchQuery =
        !q ||
        a.title.includes(q) ||
        a.excerpt.includes(q) ||
        a.tags.some((t) => t.includes(q))
      const matchCategory =
        activeCategory === 'すべて' || a.category === activeCategory
      const matchAuthor = activeAuthor === 'すべて' || a.author === activeAuthor
      return matchQuery && matchCategory && matchAuthor
    })
  }, [query, activeCategory, activeAuthor])

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">DXTimes</div>
        <input
          className="searchbar"
          type="search"
          placeholder="記事を検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </header>

      <div className="app__body">
        <aside className="facets">
          <div className="facets__group">
            <h2 className="facets__title">カテゴリ</h2>
            {['すべて', ...categories].map((c) => (
              <button
                key={c}
                className={`facet ${activeCategory === c ? 'facet--active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="facets__group">
            <h2 className="facets__title">著者</h2>
            {authors.map((a) => (
              <button
                key={a}
                className={`facet ${activeAuthor === a ? 'facet--active' : ''}`}
                onClick={() => setActiveAuthor(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </aside>

        <main className="results">
          <p className="results__count">{results.length} 件の記事</p>
          {results.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
          {results.length === 0 && (
            <p className="results__empty">該当する記事がありません。</p>
          )}
        </main>
      </div>
    </div>
  )
}
