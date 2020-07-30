import React, {Suspense} from 'react'


const Card = ({id, url, width, height, title, description}) => {

    return (

        <div>
            <div>{id}</div>
            <div>{title}</div>
            <img src={url} width={100} height={100}></img>
            <textarea>{description}</textarea>
        </div>
    )
}

export default Card