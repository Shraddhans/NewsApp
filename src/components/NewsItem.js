import React from 'react'
const NewsItem = (props)=> {
    
 
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
        <div  className="card" >
          <div style={{display: 'flex',
                       justifyContent: 'flex-end',
                       position: 'absolute',
                       right: '0'}}>
          <span className="badge rounded-pill bg-danger"> {source} </span>
          </div>
        
          <img src={!imageUrl?"https://www.livemint.com/lm-img/img/2023/07/25/600x338/stocktraders-kNDB--621x414LiveMint_1690244331211_1690244331347.jpg":imageUrl}  className="card-img-top" alt="..."/>
          <div  className="card-body">
            <h5  className="card-title">{title} </h5>
            <p  className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author}  on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} type="button" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem