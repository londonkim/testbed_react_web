import React from 'react'
import PropTypes from 'prop-types'

const MyComponent = ({name, favoriateNumber, children}) => {
    // const {name, children} = props // 비구조화 할당
    return (
        <div>AAA {name} 태그사이값은 : {children}
            {favoriateNumber}
        </div>
    )
}

MyComponent.defaultProps = {
    name: '기본이름'
}

MyComponent.propTypes = {
    name: PropTypes.string,
    childrent: PropTypes.string,
    favoriateNumber: PropTypes.number.isRequired
}

export default MyComponent

