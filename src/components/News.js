import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props)=> {
  const [articles, setArticles] = useState([])
  //const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  // document.title= `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults)

    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [])
  
const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
};
    return (
      <div className="container my-3">
        <h1 className='text-center' style={{margin: '30px 0px', marginTop: '90px'}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)}</h1>
        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<h4>Loading...</h4>}

        >
          <div className="container">
        <div className="row">
        {articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name} />
            </div>
        })}  
        </div>
        </div>
        </InfiniteScroll>
      </div>
    )
  
}

News.deafultProps = {
  country: 'in', 
  pageSize: 8,
  category: 'general'
  
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
} 
export default News