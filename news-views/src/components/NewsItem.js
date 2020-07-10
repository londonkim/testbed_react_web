import React from 'react'
import './NewsItem.scss'

const NewsItem = ({ article }) => {
    const { title, description, url, urlToImage } = article

    return (
        <div className="NewsItem">
            <div>
                {urlToImage && (
                    <div className="thumbnail">
                        <a href={url} target="_blank" className="imgbox">
                            <img src={urlToImage} className="img"></img>
                        </a>
                    </div>

                )}
            </div>
            <div className="content">
                <p>{title}</p>
                <p>{description}</p>
            </div>
        </div>

    )
}

export default NewsItem