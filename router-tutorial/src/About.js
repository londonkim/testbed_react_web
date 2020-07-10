import React from 'react'
import qs from 'qs'

// query 스트링은 props location 
const About = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true // 이 설정을 통해  문자 ? 생략
    })

    const  showDetail = query.detail === 'true'
    return (
        <div>
            <h1>
                소개
            </h1>

            <p>
                예저 프로젝트입니다. 
            </p>
            {showDetail && <p>querystring true</p>}
        </div>
    )
}

export default About