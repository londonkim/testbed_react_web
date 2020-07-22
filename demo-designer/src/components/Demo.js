import React, { Component, useState } from 'react';

import Designer, {Text, Rect, Image} from 'react-designer';


const Demo = () => {
    const [objects, setObjects] = useState(
       [
            // {type: "text", x: 10, y: 20, text: "Hello!", fill: "red", fontFamily: 'Helvetica'},
            // {type: "rect", x: 50, y: 70, fill: "red"}
          ]
    )

    return (
            <Designer width={500} height={500}
                objectTypes={{
                    'text': Text,
                    'rect': Rect,
                    'image': Image,
                }}
                onUpdate={(objects) => {
                    console.log("update", objects);
                    return setObjects(objects);
                }}
                objects={objects} />
    )
}

export default Demo