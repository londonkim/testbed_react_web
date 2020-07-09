import React from 'react'

const data = {
    velopert: {
        name: '김민준',
        description: '리액트를 좋아하는 개발자'
    },
    gildong: {
        name: '홍길동',
        description: '고전 소설 주인공'
    }
}

const Profile = ({ match }) => {
    const { username } = match.params;
    const profile = data[username]
    
    if (!profile) {
        return <div>존재 하지 않는 사용자입니다.</div>
    }

    return(
        <div>
            <p>{username} ({profile.name})</p>
            <p>{profile.description}</p>
        </div>
    )
}

export default Profile