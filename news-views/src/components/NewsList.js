import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import axios from 'axios'
import usePromise from '../lib/usePromise'


const sampleArticle = {
    title: 'a',
    description: 'content',
    url: 'http://www.naver.com',
    urlToImage: 'https://media.vlpt.us/images/2ujin/post/df8998b0-5228-4c0d-979a-1b001f3bd49c/0E94E9A6-40F3-45A2-8131-94CF8EE37BE5.PNG'
}

const NewsList = ({ category }) => {

    const [loading, response, error] = usePromise(() => {

        const query = category === 'all' ? '' : `category=${category}&`
        let url = 'http://newsapi.org/v2/top-headlines?' +
        'country=us&' + query +
        'apiKey=67039f1ad70d40cd8c4d4b428e253854';

        return axios.get(url)

    }, [category])

    console.log('!!!!!!!! render')
    if (loading) {
        return <div>대기중...</div>
    }
    console.log('!!!!!!!! render1')

    if(!response) {
        return null
    }
    console.log('!!!!!!!! render3')


    if (error) {
        return <div>에러발생</div>
    }

    const { articles } = response.data

    return (
        <div>
            {articles && articles.map(article => (
                <NewsItem key={article.url} article={article}></NewsItem>
            ))}
        </div>
    )
}

export default NewsList