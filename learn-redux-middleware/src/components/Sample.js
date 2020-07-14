import React from 'react'

const Sample = ({ loadingPost, post}) => {
    return (
        <div>
            <section>
                <h1>post</h1>
                {loadingPost && '로딩중'}
                {!loadingPost && post && (
                    <div>
                        <h3>{post.title}</h3>
                        <h3>{post.body}</h3>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Sample