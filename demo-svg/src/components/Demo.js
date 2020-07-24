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
    let selectedScaleIconRef = useRef(null)
    let selectedRotateIconRef = useRef(null)

    let selectedTextRef = useRef(null)
    const svgRef = useRef()

    const [objects, setObjects] = useState([
    ])

    const addRect = useCallback( event => {
        const id = Math.random().toString(10)
        const x = Math.random() * 100
        const y = Math.random() * 100

        const rect = {"type": "rect", "id":id, "x": x,"y": y, "rx":"20", "ry":"20", "width":"150", "height":"150", "style": {"fill":"red", "transform-box":"fill-box" , "transform-origin": "center"}, "offset": {}, "offsetScaleIcon": {},
    "originPosition": {"x": x, "y": y}, "originWidthHeight": {"width": 150, "height": 150}, "offsetRotateIcon": {}, "groupStype": {}}

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


    const onMouseDown = useCallback( event => {
        selectedObjectRef.current = event.target

        const selectedElement = event.target
        const bbox = selectedElement.getBoundingClientRect()
        const newX = event.clientX - bbox.left;
        const newY = event.clientY - bbox.top;

        console.log("onMouseDown")
        console.log(selectedElement)
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

    const onMouseUp = useCallback( event => {
        console.log("onMouseUp")
        selectedObjectRef.current = null
        selectedScaleIconRef.current = null
        selectedRotateIconRef.current = null
        // selectedTextRef.current = null
    }, [objects, selectedObjectRef])

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



    const onMouseDownScaleIcon = (event) => {

        selectedScaleIconRef.current = event.target
        // console.log(selectedScaleIconRef.current)


        const selectedElement = event.target
        const bbox = selectedElement.getBoundingClientRect()
        const newX = event.clientX - bbox.left;
        const newY = event.clientY - bbox.top;

        console.log("onMouseDownScaleIcon")
        if (selectedScaleIconRef.current != null) {

            const newObjects = objects.filter(object => (object.id != selectedElement.getAttribute('parentId')))
            const newObject = objects.find(object => (object.id == selectedElement.getAttribute('parentId')))

            newObject.offsetScaleIcon = {
                "x": newX,
                "y": newY
            }
            console.log(newObject)
            setObjects([...newObjects, newObject])
        }
    }

    const onMouseDownRotateIcon = (event) => {
        selectedRotateIconRef.current = event.target 


        const selectedElement = event.target
        const bbox = selectedElement.getBoundingClientRect()
        const newX = event.clientX - bbox.left;
        const newY = event.clientY - bbox.top;

        console.log("onMouseDownRotateIcon")
        if (selectedRotateIconRef.current != null) {

            const newObjects = objects.filter(object => (object.id != selectedElement.getAttribute('parentId')))
            let newObject = objects.find(object => (object.id == selectedElement.getAttribute('parentId')))

            newObject.offsetRotateIcon = {
                "x": newX,
                "y": newY
            }
            
            // newObject.style = {"fill":"red", "transform-box":"fill-box" , "transform-origin": "center", "transform": "rotate(32deg)"}
            // newObject.groupStype = {"fill":"red", "transform-box":"fill-box" , "transform-origin": "center", "transform": "rotate(32deg)"}
            console.log(newObject)
            setObjects([...newObjects, newObject])
        }

    }


    const onMouseMoveCanvas = (event) => {


        if (selectedRotateIconRef.current != null) {

            const bbox = selectedRotateIconRef.current.getBoundingClientRect();
            const x = event.clientX - bbox.left;
            const y = event.clientY - bbox.top;

            const newObjects = objects.map(object => {

                if (object.id == selectedRotateIconRef.current.getAttribute('parentId')) {
                    // object.x = object.x - (object.offsetRotateIcon.x - x)
                    // object.y = object.y - (object.offsetRotateIcon.y - y)
                    
                    // object.width = Number(object.width) + (object.offsetScaleIcon.x - x)
                    // object.height = Number(object.height) + (object.offsetScaleIcon.y - y)
                    // object.height = object.height - (object.offsetScaleIcon.y - y)


                    if (object.offsetRotateIcon.x - x < 0) {
                        return object
                    }
                    if (object.offsetRotateIcon.y - y < 0) {
                        return object
                    }
                    let angle = Math.atan2(
                        object.offsetRotateIcon.x - x ,
                        object.offsetRotateIcon.y - y
                      );
                    
                      let asDegree = angle * 180 / Math.PI;
                      let rotation = (asDegree - 45 ) * -1;
                      object.groupStype = {"fill":"red", "transform-box":"fill-box" , "transform-origin": "center", "transform": "rotate("+rotation+"deg)"}
                      object.style = {"fill":"red", "transform-box":"fill-box" , "transform-origin": "center", "transform": "rotate("+rotation+"deg)"}
                        //https://codepen.io/gox/pen/oNgrmpK
                }
                return object
            })
            setObjects(newObjects)
        } 



        if (selectedScaleIconRef.current != null) {

            const bbox = selectedScaleIconRef.current.getBoundingClientRect();
            const x = event.clientX - bbox.left;
            const y = event.clientY - bbox.top;

            const newObjects = objects.map(object => {

                if (object.id == selectedScaleIconRef.current.getAttribute('parentId')) {
                    object.x = object.x - (object.offsetScaleIcon.x - x)
                    object.y = object.y - (object.offsetScaleIcon.y - y)
                    
                    object.width = Number(object.width) + (object.offsetScaleIcon.x - x)
                    object.height = Number(object.height) + (object.offsetScaleIcon.y - y)
                    // object.height = object.height - (object.offsetScaleIcon.y - y)

                }
                return object
            })
            setObjects(newObjects)
        } 
        

        
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

    }
    return (
        <div >
            <button onClick={addRect}> Add Rectagle </button>
            <button onClick={addCircle}> Add Circle </button>
            <button onClick={addImage}> Add Image </button>
            <button onClick={addText}> Add Text </button>
            <button onClick={chageTextStyle}> Chage Text Style </button>

            <div contentEditable={true}>
                <svg ref={svgRef} style={{
                    backgroundColor: 'blue',
                    width: '100%',
                    height: '500px',
                    cursor: 'default'
                }}
                    onMouseMove={onMouseMoveCanvas}
                    onMouseUp={onMouseUp}
                >
                    { objects.map(object => {
                        return KDesign(object, onMouseDown, onTextClick, onMouseDownScaleIcon, onMouseDownRotateIcon)
                    })}

                </svg>
            </div>

        </div>
    )
}

export default Demo