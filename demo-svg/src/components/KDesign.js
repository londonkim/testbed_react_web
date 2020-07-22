import React from 'react'


        // {"type":"rect","key":"0.6246075161717781","ref":null,"props":{"id":"0.6246075161717781","x":183.08490376852208,"y":169.79009331405223,"rx":"20","ry":"20","width":"150","height":"150","style":{"fill":"red"}},"_owner":null,"_store":{}}
        // const rect = <rect key={id} id={id} x={Math.random()*200} y={Math.random()*200} rx="20" ry="20" width="150" height="150" style={{fill: 'red'}}  />

const KDesign = (tagObject, onMouseDown, onMouseMove, onMouseUp) => {
    const id = tagObject.id
    const type = tagObject.type

    const getType = () => {
        if (type === "rect") {
            return <rect key={tagObject.id} id={tagObject.id} x={tagObject.x} y={tagObject.y} width={tagObject.width} height={tagObject.height} style={tagObject.style}  
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            />
        }

        if (type === "circle") {
            return <circle key={tagObject.id} id={tagObject.id} cx={tagObject.x} cy={tagObject.y} r={tagObject.width} fill={tagObject.style.fill}  
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            />
        }

        if (type === "image") {
            return <image key={tagObject.id} id={tagObject.id} x={tagObject.x} y={tagObject.y} height={tagObject.height} xlinkHref={tagObject.href}  
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            />
        }

        if (type === "text") {
            return <text key={tagObject.id} id={tagObject.id} x={tagObject.x} y={tagObject.y} style={tagObject.style}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            >
                {tagObject.text} </text>
        }
    }

    
    return (
            getType()
        )
}

export default KDesign