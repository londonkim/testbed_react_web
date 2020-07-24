import React from 'react'


        // {"type":"rect","key":"0.6246075161717781","ref":null,"props":{"id":"0.6246075161717781","x":183.08490376852208,"y":169.79009331405223,"rx":"20","ry":"20","width":"150","height":"150","style":{"fill":"red"}},"_owner":null,"_store":{}}
        // const rect = <rect key={id} id={id} x={Math.random()*200} y={Math.random()*200} rx="20" ry="20" width="150" height="150" style={{fill: 'red'}}  />

const KDesign = (tagObject, onMouseDown, onTextClick, onMouseDownScaleIcon, onMouseDownRotateIcon) => {
    const id = tagObject.id
    const type = tagObject.type

    const extraWidth = 15

    const x1 = tagObject.x - extraWidth
    const y1 = tagObject.y - extraWidth

    const x2 = tagObject.x + extraWidth + Number(tagObject.width)
    const y2 = tagObject.y - extraWidth

    const x3 = tagObject.x + extraWidth + Number(tagObject.width)
    const y3 = tagObject.y + extraWidth + Number(tagObject.height)

    const x4 = tagObject.x - extraWidth
    const y4 = tagObject.y + extraWidth + Number(tagObject.height)


    const getType = () => {
        
        if (type === "rect") {
            return (
                <g>

                    <g key={tagObject.id} style={tagObject.groupStype}>
                
                        <line x1={x1} y1={y1} x2={x2} y2={y2} style={{
                            stroke: 'black',
                            strokeWidth: '2'
                        }}/>

                        <line x1={x2} y1={y2} x2={x3} y2={y3} style={{
                            stroke: 'black',
                            strokeWidth: '2'
                        }}
                        />

                        <line x1={x3} y1={y3} x2={x4} y2={y4} style={{
                            stroke: 'black',
                            strokeWidth: '2'
                        }}
                        />

                        <line x1={x4} y1={y4} x2={x1} y2={y1} style={{
                            stroke: 'black',
                            strokeWidth: '2'
                        }}
                        />

                        <circle cx={x1} cy={y1} r={extraWidth} fill="gray" parentId={tagObject.id}
                            onMouseDown={onMouseDownScaleIcon}
                            // onMouseMove={onMouseMoveScaleIcon}
                        ></circle>
                        <circle cx={x2} cy={y2} r={extraWidth} fill="white" parentId={tagObject.id}></circle>
                        <circle cx={x3} cy={y3} r={extraWidth} fill="white" parentId={tagObject.id}></circle>
                        <circle cx={x4} cy={y4} r={extraWidth} fill="yellow" parentId={tagObject.id}
                            onMouseDown={onMouseDownRotateIcon}
                        ></circle>


                        {
                        /* <line x1={x2 - (x2-x1)/2} y1={y1} x2={x2 - (x2-x1)/2} y2={y2-extraWidth*3} style={{
                            stroke: 'black',
                            strokeWidth: '2'
                        }}/>
                        <circle cx={x2 - (x2-x1)/2} cy={y2-extraWidth*3} r={extraWidth} fill="white" parentId={tagObject.id}
                            onMouseDown={onMouseDownRotateIcon}
                        ></circle> */
                        }
                        
                    </g>

                <rect id={tagObject.id} x={tagObject.x} y={tagObject.y} width={tagObject.width} height={tagObject.height} style={tagObject.style}  
                                    onMouseDown={onMouseDown}
                                    // onMouseMove={onMouseMove}
                                    contentEditable={false}
                                    transform={tagObject.rotate}
                                    />

                </g>

            )
        }

        if (type === "circle") {
            return <circle key={tagObject.id} id={tagObject.id} cx={tagObject.x} cy={tagObject.y} r={tagObject.width} fill={tagObject.style.fill}  
            onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            contentEditable={false}

            />
        }

        if (type === "image") {
            return <image key={tagObject.id} id={tagObject.id} x={tagObject.x} y={tagObject.y} height={tagObject.height} xlinkHref={tagObject.href}  
            onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            contentEditable={false}
            />
        }

        if (type === "text") {
            return <text key={tagObject.id} id={tagObject.id} x={tagObject.x} y={tagObject.y} style={tagObject.style} text= {tagObject.text} 
            onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            onClick={onTextClick}
            >
                내용을 입력하세요.
            </text>
        }
    }

    
    return (
            getType()
        )
}

export default KDesign