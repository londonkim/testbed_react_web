
import React, {useEffect, useRef} from 'react'


const HistorySample = ({location, match, history}) => {
    const handleGoBack = () => {
        history.goBack()
    }

    const handleGoHome = () => {
        history.push('/')
    }
    let unblock

    useEffect(() => {
        unblock = history.block('정말 떠나실거냐')
        return () => {
            if (unblock) {
                unblock()
            }
        }
    }, [])

    return (
        <div>
            <button onClick={handleGoBack}>GoBack</button>
            <button onClick={handleGoHome}>handleGoHome</button>
            {JSON.stringify(location)}
            {JSON.stringify(match)}
        </div>
    )
}

export default HistorySample