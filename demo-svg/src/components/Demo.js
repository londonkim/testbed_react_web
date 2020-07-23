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
    let selectedTextRef = useRef(null)
    const svgRef = useRef()

    const [objects, setObjects] = useState([
    ])

    const addRect = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "rect", "id":id, "x": x,"y": y, "rx":"20", "ry":"20", "width":"150", "height":"150", "style": {"fill":"red"}, "offset": {} }

        setObjects(objects => [...objects, rect])

    }, [])


    const addCircle = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "circle", "id":id, "x": x,"y": y, "rx":"20", "ry":"20", "width":"150", "height":"150", "style": {"fill":"green"},  "offset": {} }

        setObjects(objects => [...objects, rect])

    }, [])


    const addImage = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "image", "id":id, "x": x,"y": y, "height":"150", "href":"logo512.png",  "offset": {}}

        setObjects(objects => [...objects, rect])

    }, [])


    /**
     * 
     * Warning
     * 작성중 엔터를 치면 새로 새롭게 생긴다 contenteditable 사용 고민해봐야한다.
     */
    const addText = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "text", "id":id, "x": x,"y": y, text: "sample", "style": {"fill":"yellow"},  "offset": {} }

        setObjects(objects => [...objects, rect])

    }, [objects])


    const cangeRect = () => {
    }

    const onMouseDown = useCallback( event => {
        selectedObjectRef.current = event.target

        const selectedElement = event.target
        const bbox = selectedElement.getBoundingClientRect()
        const newX = event.clientX - bbox.left;
        const newY = event.clientY - bbox.top;


        if (selectedObjectRef.current != null) {

            const newObjects = objects.filter(object => (object.id != selectedObjectRef.current.id))

            const newObject = objects.find(object => (object.id == selectedObjectRef.current.id))

            newObject.offset = {
                "x": newX,
                "y": newY
            }
            setObjects([...newObjects, newObject])
        } 



    }, [objects, selectedObjectRef])

    const onMouseMove = useCallback( event => {

        

        if (selectedObjectRef.current != null) {

            const bbox = selectedObjectRef.current.getBoundingClientRect();
        const x = event.clientX - bbox.left;
        const y = event.clientY - bbox.top;


            const newObjects = objects.map(object => {
                if (object.id == selectedObjectRef.current.id) {
                    object.x = object.x - (object.offset.x - x)
                    object.y = object.y - (object.offset.y - y)
                }
                return object
            })
            setObjects(newObjects)
        } 

    }, [objects, selectedObjectRef])

    const onMouseUp = useCallback( event => {
        console.log("onMouseUp")
        selectedObjectRef.current = null
        // selectedTextRef.current = null
    }, [objects, selectedObjectRef])

    const onChange3 = (event) => {
        console.log(event)
    }
    const onBlur = (event) => {
        console.log(event.target)

    }

    const onTextClick = event => {
        selectedTextRef.current = event.target
        console.log(event.target)
    }


    /**
     * 테스트 변경은 살짝 로직이 깔끔하지 않다 
     * contentEditable 옵션을 활성화 시키고 클릭한 텍스트 객체를 중앙집중식으로 관리해야한다...
     */
    const chageTextStyle = useCallback( () => {
        if (selectedTextRef.current != null) {
            console.log("change font style")
            const newObjects = objects.filter(object => (object.id != selectedTextRef.current.id))
    
            const newObject = objects.find(object => (object.id == selectedTextRef.current.id))

            newObject.style = {
                "fontSize": "30px",
                "fill": "red"
            }

            setObjects([...newObjects, newObject])
        } else {
            console.log("change font style 22")

        }
    }, [objects, selectedTextRef] )

    const onExtendLineClick = () => {
        alert('dfsdfasf')
    }
    return (
        <div >
            <button onClick={addRect}> Add Rectagle </button>
            <button onClick={addCircle}> Add Circle </button>
            <button onClick={addImage}> Add Image </button>
            <button onClick={addText}> Add Text </button>
            <button onClick={chageTextStyle}> Chage Text Style </button>


            <div contentEditable={true} onInput={onChange3} onBlur={onBlur}>
                <svg ref={svgRef} style={{
                    backgroundColor: 'blue',
                    width: '100%',
                    height: '500px',
                    cursor: 'default'
                }}>
                    { objects.map(object => {
                        console.log(object)
                        return KDesign(object, onMouseDown, onMouseMove, onMouseUp, onTextClick, onExtendLineClick)
                    })}

                </svg>
            </div>

        </div>
    )
}

export default Demo