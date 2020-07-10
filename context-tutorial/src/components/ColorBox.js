import React from 'react'

import { ColorConsumer } from '../contexts/color'

const ColorBox = () => {
    return (
        <ColorConsumer>
        {
            value => (
                <div>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: value.state.color
                    }}>

                    </div>

                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: value.state.subcolor
                    }}>
                    </div>

                </div>
            )
        }
        </ColorConsumer>
    )
}

export default ColorBox