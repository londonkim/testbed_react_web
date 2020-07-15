import React, { Component, useState, useRef } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer, Text, Image } from 'react-konva';
import useImage from 'use-image';


const Rectangle = ({ shapeProps, x, y, isSelected, onSelect, onChange, onDragEnd }) => {

  const [image] = useImage('https://konvajs.org/assets/lion.png', 'Anonymous');

  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  console.log("Rectagle render " + x + " " + y )
  return (
    <React.Fragment>
      <Image image={image}
        x={x}
        y={y}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          console.log("onDragEndonDragEnd")
          onChange({
            ...shapeProps,
            // x: e.target.x(),
            // y: e.target.y()
          });
          onDragEnd(e)
        }}
        onTransformEnd={e => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          console.log("onTransformEnd " + JSON.stringify(e))
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            rotation: e.target.attrs.rotation,
            scaleX: e.target.attrs.scaleX,
            scaleY: e.target.attrs.scaleY,
            skewX: e.target.attrs.skewX,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};


const DemoReactKonvaTransForm = () => {

  const initialRectangles = [
    {
      width: 100,
      height: 100,
      fill: 'red',
      id: 'rect1'
    }
  ];

  const initRectagle =     {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
    rotation: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  }

  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [rectangle, setRectangle] = React.useState(initRectagle);
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };


  const [historyShapeStep, setHistoryShapeStep] = useState(0)
  const [historyShape, setHistoryShape] = useState([
    initRectagle
  ])


  const [historyStep, setHistoryStep] = useState(0)

  let initHistory = {
      x: 130,
      y: 150
    }
  const [position, setPosition] = useState(
      initHistory
  )

  const [history, setHistory] = useState([
      initHistory
  ])

  const handleUndo = () => {
    

      if (historyStep === 0) {
        return;
      }

      setHistoryStep(historyStep-1);
      const previous = history[historyStep];

      console.log(JSON.stringify(previous))

      setPosition({
       x: previous.x,
       y: previous.y
      });

    };

  const handleRedo = () => {
    if (historyShapeStep === 0) {
      return;
    }

    setHistoryShapeStep(historyShapeStep-1);
    const previous = historyShape[historyShapeStep];

    console.log(JSON.stringify(previous))
    setRectangle({
      x: previous.x,
      y: previous.y,
      width: previous.width,
      height: previous.height,
      fill: 'red',
      id: 'rect1',
      rotation: previous.rotation,
      skewX: previous.skewX,
      scaleX: previous.scaleX,
      scaleY: previous.scaleY
    })
    
  };

  const handleDragEnd = e => {
      console.log(JSON.stringify(e))
      // setHistory(history.slice(0, historyStep + 1));
      // const pos = {
      //   x: e.target.x(),
      //   y: e.target.y()
      // };
      // setHistory(history.concat([pos]));
      // // historyStep += 1;
      // setHistoryStep(historyStep+1);

      // setPosition({
      //     x: pos.x,
      //     y: pos.y
      // });

      const attr = e.target.attrs

      setHistoryShape(historyShape.slice(0, historyShapeStep + 1));
      const pos = {
        x: attr.x,
        y: attr.y,
        width: attr.width,
        height: attr.height,
        fill: 'red',
        id: 'rect1',
        rotation: attr.rotation,
        skewX: attr.skewX,
        scaleX: attr.scaleX,
        scaleY: attr.scaleY
      }
      setHistoryShape(historyShape.concat([pos]));
      // historyStep += 1;
      setHistoryShapeStep(historyShapeStep+1);
  
      setRectangle({
        x: attr.x,
        y: attr.y,
        width: attr.width,
        height: attr.height,
        fill: 'red',
        id: 'rect1',
        rotation: attr.rotation,
        skewX: attr.skewX,
        scaleX: attr.scaleX,
        scaleY: attr.scaleY
      })

  };


  const handleChange = attr => {

    setHistoryShape(historyShape.slice(0, historyShapeStep + 1));
    const pos = {
      x: attr.x,
      y: attr.y,
      width: attr.width,
      height: attr.height,
      fill: 'red',
      id: 'rect1',
      rotation: attr.rotation,
      skewX: attr.skewX,
      scaleX: attr.scaleX,
      scaleY: attr.scaleY
    }
    setHistoryShape(historyShape.concat([pos]));
    // historyStep += 1;
    setHistoryShapeStep(historyShapeStep+1);

    setRectangle({
      x: attr.x,
      y: attr.y,
      width: attr.width,
      height: attr.height,
      fill: 'red',
      id: 'rect1',
      rotation: attr.rotation,
      skewX: attr.skewX,
      scaleX: attr.scaleX,
      scaleY: attr.scaleY
    })
};

const downloadURI = (uri, name) => {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


const handleDownload = (event) => {
    console.log(stageRef)
    let dataURL = stageRef.current.getStage().toDataURL()
    console.log(dataURL)
    downloadURI(dataURL, 'stage.png')
}
  const stageRef = useRef()
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      ref={stageRef}
    >
      <Layer>
          {/* <Text text="undo" onClick={handleUndo} /> */}
          <Text text="undo2" x={40} onClick={handleRedo} />
          <Text text="download" x={80} onClick={handleDownload}></Text>
            <Rectangle
              shapeProps={rectangle}
              x={rectangle.x}
              y={rectangle.y}
              isSelected={rectangle.id === selectedId}
              onSelect={() => {
                selectShape(rectangle.id);
              }}
              onChange={newAttrs => {
                // const rects = rectangles.slice();
                // rects[i] = newAttrs;
                // setRectangles(rects);
                console.log("newAttrs " + JSON.stringify(newAttrs))
                // setRectangle(newAttrs)
                handleChange(newAttrs)
              }}
              onDragEnd={handleDragEnd}
            />

      </Layer>
    </Stage>
  );
}

export default DemoReactKonvaTransForm
