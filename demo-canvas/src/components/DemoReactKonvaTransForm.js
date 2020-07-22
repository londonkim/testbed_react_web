import React, { Component, useState, useRef } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer, Text, Image, Group } from 'react-konva';
import useImage from 'use-image';
import Quill from 'quill';
import html2canvas from 'html2canvas';


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
  console.log("Rectagle render " + x + " " + y)
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

  const initRectagle = {
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


  const handleRedo = () => {
    if (historyShapeStep === historyShape.length - 1) {
      return;
    }

    setHistoryShapeStep(historyShapeStep + 1);
    const next = historyShape[historyShapeStep];

    console.log(JSON.stringify(next))
    setRectangle({
      x: next.x,
      y: next.y,
      width: next.width,
      height: next.height,
      fill: 'red',
      id: 'rect1',
      rotation: next.rotation,
      skewX: next.skewX,
      scaleX: next.scaleX,
      scaleY: next.scaleY
    })

  }

  const handleUndo = () => {
    if (historyShapeStep === 0) {
      return;
    }

    setHistoryShapeStep(historyShapeStep - 1);
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
    setHistoryShapeStep(historyShapeStep + 1);

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
    setHistoryShapeStep(historyShapeStep + 1);

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

  // const saveAs = (uri, filename) => {
  //   // 캡쳐된 파일을 이미지 파일로 내보낸다.
  //     var link = document.createElement('a');
  //     if (typeof link.download === 'string') {
  //     link.href = uri;
  //     link.download = filename;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     } else {
  //     window.open(uri);
  //     }
  //   }
    
    
  const handleDownload = (event) => {
    let dataURL = stageRef.current.getStage().toDataURL()
    console.log(dataURL)
    downloadURI(dataURL, 'stage.png')
  }

  const stageRef = useRef()
  const textRef = useRef()
  const layerRef = useRef()
  const groupRef =useRef()
  const imageTextRef =useRef()
  const textHTML = useRef()
  const imageTextRefTrans = useRef()


  const [forceRerender, setForceRerender] = React.useState(true);


  const sizeUpText = (event) => {
    console.log('text sizeup' +  JSON.stringify(textRef.current.getAttrs()))
    let attrs = {
      fontSize: 24,
      text: 'asdfsdfsdsdfsdfsdfsdfsdfsdf'
    }
    textRef.current.setAttrs(attrs)
  }

  const refreshStage = () => {
    setForceRerender(!forceRerender)
  }


  const renderText = (event) => {
    // convert DOM into image

    html2canvas(document.querySelector('.ql-editor'), {
      backgroundColor: 'rgba(0,0,0,0)',
      scale: 4.0,
      letterRendering: true,
      onrendered: function(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
      },
      width: 200,
      height: 100

    }).then((canvas) => {
      // show it inside Konva.Image
      // shape.image(canvas);
      imageTextRef.current.image(canvas)
      imageTextRef.current.scaleX(0.25)
      imageTextRef.current.scaleY(0.25)
      layerRef.current.batchDraw();
    });


    // html2canvas(document.querySelector('.ql-editor'), {
    //   backgroundColor: 'rgba(0,0,0,0)',
    //   scale: 1,
    //   letterRendering: true,
    //   onrendered: function(canvas) {
    //     var ctx = canvas.getContext('2d');
    //     ctx.webkitImageSmoothingEnabled = false;
    //     ctx.mozImageSmoothingEnabled = false;
    //     ctx.imageSmoothingEnabled = false;
    //   },
    //   width: 200,
    //   height: 100

    // }).then((canvas) => {
    //   // show it inside Konva.Image
    //   // shape.image(canvas);
    //   imageTextRefTrans.current.image(canvas)
    //   imageTextRefTrans.current.scaleX(1)
    //   imageTextRefTrans.current.scaleY(1)
    //   layerRef.current.batchDraw();
    // });

    // imageTextRefTrans

  }

  const onClickText = (event) => {

    console.log('onClickText')

            // at first lets find position of text node relative to the stage:
            var textPosition = textRef.current.getAbsolutePosition();

            // then lets find position of stage container on the page:
            var stageBox = stageRef.current.getStage().container().getBoundingClientRect();
    
            // so position of textarea will be the sum of positions above:
            var areaPosition = {
              x: stageBox.left + textPosition.x,
              y: stageBox.top + textPosition.y,
            };

            // var textarea = document.createElement('textarea');
            // document.body.appendChild(textarea);

            // textarea.value = textRef.current.text();
            // textarea.style.position = 'absolute';
            // textarea.style.top = areaPosition.y + 'px';
            // textarea.style.left = areaPosition.x + 'px';
            // textarea.style.width = textRef.current.width();
    
            // textarea.focus();
    
            // textarea.addEventListener('keydown', function (e) {
            //   // hide on enter
            //   if (e.keyCode === 13) {
            //     textRef.current.text(textarea.value);
            //     layerRef.current.draw();
            //     document.body.removeChild(textarea);
            //   }
            // });

            let div = document.createElement('div')
            div.style.position = 'absolute';
            div.style.top = areaPosition.y + 'px';
            div.style.left = areaPosition.x + 'px';
            div.style.width = textRef.current.width();
            div.setAttribute("id", "rootdiv");


            let textarea = document.createElement('div')
            textarea.setAttribute("id", "textarea");

            div.appendChild(textarea)
            document.body.appendChild(div)

            var toolbarOptions = [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block', 'image'],
            
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
            
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
            
              ['clean']                                         // remove formatting button
            ];

            var quill = new Quill('#textarea', {
              modules: {
                toolbar: toolbarOptions
              },
              placeholder: 'Compose an epic...',
              theme: 'snow', // or 'bubble'
            });


            quill.getHTML = () => {
              return document.querySelector('.ql-editor').innerHTML
            };

            quill.on('text-change', function() {
              // textHTML.current.text("html : " + quill.getHTML())
              renderText()
            })
            

            div.addEventListener('focusout', (event) => {
              if(div.contains(event.relatedTarget)) {
                return
              }
              document.body.removeChild(div);
            })

            // quill.addEventListener('focusout', () => {
            //   document.body.removeChild(div);
            // })

            // quill.on('focusout', () => {
            //   document.body.removeChild(div);
            // })

            // textarea.addEventListener('keydown', function (e) {
            //   // hide on enter
            //   if (e.keyCode === 13) {
            //     // textNode.text(textarea.value);
            //     // layer.draw();
            //     renderText()
            //     document.body.removeChild(div);
            //   }
            // });


  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      ref={stageRef}
    >
      <Layer ref={layerRef}>
        <Text text="Redo" onClick={handleRedo} />
        <Text text="Undo" x={40} onClick={handleUndo} />
        <Text text="download" x={80} onClick={handleDownload}></Text>
        <Text text="textSizeUp" x={200} onClick={sizeUpText}></Text>
        <Text text="refresh" x={300} onClick={refreshStage}></Text>

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
        <Group ref={groupRef}>
        <Text ref={textRef} x={0} y={150} text="HTML 에서 CANVAS로 텍스트를 표현할 때 해상도가 흐리다. 이를 보정하는 작업이 쉽지 않다" onClick={onClickText}></Text>
          <Text ref={textRef} x={0} y={200} text="텍스트를 추가 할려면 이곳을 클릭하시오" onClick={onClickText}></Text>
        </Group>

        <Image ref={imageTextRefTrans} x={0} y={300} draggable></Image>

        
        <Image ref={imageTextRef} x={0} y={400} draggable>

        </Image>


          
          <Text ref={textHTML} x={0} y={500} draggable></Text>
      </Layer>
    </Stage>
  );
}

export default DemoReactKonvaTransForm
