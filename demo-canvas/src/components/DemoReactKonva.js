import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';




const DemoReactKonva = () => {

    const [historyStep, setHistoryStep] = useState(0)

    let initHistory = {
        x: 130,
        y: 150
      }
    const [position, setPosition] = useState({
        initHistory
    })

    const [history, setHistory] = useState([
        initHistory
    ])

    const handleUndo = () => {

        if (historyStep === 0) {
          return;
        }

        setHistoryStep(historyStep-1);
        const previous = history[historyStep];
        setPosition({
         x: previous.x,
         y: previous.y
        });

      };

    const handleRedo = () => {
        if (historyStep === history.length - 1) {
          return;
        }

        setHistoryStep(historyStep+1);

        const next = history[historyStep];
        setPosition({
            x: next.x,
            y: next.y        
        });
    };

    const handleDragEnd = e => {
        console.log("handleDragEnd")

        setHistory(history.slice(0, historyStep + 1));
        const pos = {
          x: e.target.x(),
          y: e.target.y()
        };
        setHistory(history.concat([pos]));
        // historyStep += 1;
        setHistoryStep(historyStep+1);

        setPosition({
            x: pos.x,
            y: pos.y
        });
    };
    

    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Text text="undo" onClick={handleUndo} />
                <Text text="redo" x={40} onClick={handleRedo} />
                <Rect
                x={position.x}
                y={position.y}
                width={50}
                height={50}
                fill="black"
                draggable
                onDragEnd={handleDragEnd}
                
                />

                <Rect
                x={100}
                y={200}
                width={50}
                height={50}
                fill="black"
                draggable
                onDragEnd={handleDragEnd}
                ></Rect>
            </Layer>
            </Stage>
        </div>
      );
}

export default DemoReactKonva
