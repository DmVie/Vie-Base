import React, { useContext } from 'react';

// User Components 
import ArticlePortal from './ArticlePortal';
import ArticlesContext from '../context/ArticlesContext';

// Services
import GridService from '../services/GridService/GridService';

const ArticlePage = (props) => {

  const { articles } = useContext(ArticlesContext);
  const article = articles.find((article) => {
    return article.id === props.match.params.id
  })

  if(!article) {
    props.push('/articles');
  }

  return (
    <ArticlePortal>
      <section className="sect article-banner">
        <GridService addClassName="article" list={[article]} imgOverlay={true} serviceType="articlePostBanner" staticOverlay={true} />
      </section>
      <section className="sect article-page">
        {article.article}
      </section>
    </ArticlePortal>
  )
}

export default ArticlePage
