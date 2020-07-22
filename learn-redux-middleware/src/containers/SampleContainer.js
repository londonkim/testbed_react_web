import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Sample from '../components/Sample'
import { getPost } from '../modules/sample'

// const { useEffect } = React

const SampleContainer = ({
    getPost, post, loadingPost,
}) => {

    useEffect(() => {
        getPost(1)
    }, [getPost])

    return (
        <Sample post={post} loadingPost={loadingPost}>

        </Sample>
    )
}


export default connect(
    ({sample, loading}) => ({
        post: sample.post,
        loadingPost: loading.GET_POST,
    }),
    {
        getPost
    }
)(SampleContainer)