import React, { useRef, useState, useCallback, useReducer } from 'react'

import KDesign from './KDesign'

const objectReducer = (state, action) => {
    switch (action.type) {
        case 'add': {
            return  [...state, action.tag ]
        }
    }
}

const Demo = () => {

    let selectedObjectRef = useRef(null)
    const svgRef = useRef()

    const [objects, setObjects] = useState([
    ])

    const addRect = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "rect", "id":id, "x": x,"y": y, "rx":"20", "ry":"20", "width":"150", "height":"150", "style": {"fill":"red"} }

        setObjects(objects => [...objects, rect])

    }, [objects])


    const addCircle = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "circle", "id":id, "x": x,"y": y, "rx":"20", "ry":"20", "width":"150", "height":"150", "style": {"fill":"green"} }

        setObjects(objects => [...objects, rect])

    }, [objects])


    const addImage = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "image", "id":id, "x": x,"y": y, "height":"150", "href":"logo512.png"}

        setObjects(objects => [...objects, rect])

    }, [objects])


    const addText = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "text", "id":id, "x": x,"y": y, text: "sample", "style": {"fill":"yellow"} }

        setObjects(objects => [...objects, rect])

    }, [objects])


    const cangeRect = () => {
    }

    const onMouseDown = useCallback( event => {
        selectedObjectRef.current = event.target
    }, [objects, selectedObjectRef])

    const onMouseMove = useCallback( event => {

        console.log("onMouseMove")

        if (selectedObjectRef.current != null) {

            const newObjects = objects.map(object => {
                if (object.id == selectedObjectRef.current.id) {
                    object.x = event.clientX - 50
                    object.y = event.clientY - 50
                }
                return object
            })
            setObjects(newObjects)
        } 

    }, [objects, selectedObjectRef])

    const onMouseUp = useCallback( event => {
        console.log("onMouseUp")
        selectedObjectRef.current = null
    }, [objects, selectedObjectRef])

    return (
        <div>
            <button onClick={addRect}> Add Rectagle </button>
            <button onClick={addCircle}> Add Circle </button>
            <button onClick={addImage}> Add Image </button>
            <button onClick={addText}> Add Text </button>


            <svg ref={svgRef} style={{
                backgroundColor: 'blue',
                width: '100%',
                height: '500px',
            }}>
                { objects.map(object => {
                    console.log(object)
                    return KDesign(object, onMouseDown, onMouseMove, onMouseUp)
                })}

            </svg>
        </div>
    )
}

export default Demo