import ImageEditor from '@toast-ui/react-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css'
import { useEffect } from 'react'
import { useState } from 'react'

import React, { useRef } from 'react';

import "./DemoToastUI.css"


var customTheme = {
    'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
    'common.bisize.width': '251px',
    'common.bisize.height': '21px',
    'common.backgroundImage': 'none',
    'common.backgroundColor': 'transparent',
    'common.border': '0px',

    
    // header
    'header.backgroundImage': 'none',
    'header.backgroundColor': 'transparent',
    'header.border': '0px',
    'header.height': '0px',
    
    // load button
    'loadButton.backgroundColor': '#fff',
    'loadButton.border': '1px solid #ddd',
    'loadButton.color': '#222',
    'loadButton.fontFamily': 'NotoSans, sans-serif',
    'loadButton.fontSize': '12px',
    'loadButton.height': '0px',

    
    // download button
    'downloadButton.backgroundColor': '#fdba3b',
    'downloadButton.border': '1px solid #fdba3b',
    'downloadButton.color': '#fff',
    'downloadButton.fontFamily': 'NotoSans, sans-serif',
    'downloadButton.fontSize': '12px',
    'downloadButton.height': '0px',

    
    // icons default
    'menu.normalIcon.color': '#8a8a8a',
    'menu.activeIcon.color': '#555555',
    'menu.disabledIcon.color': '#434343',
    'menu.hoverIcon.color': '#e9e9e9',
    'submenu.normalIcon.color': '#8a8a8a',
    'submenu.activeIcon.color': '#e9e9e9',
    
    'menu.iconSize.width': '24px',
    'menu.iconSize.height': '24px',
    'submenu.iconSize.width': '32px',
    'submenu.iconSize.height': '32px',
    
    // submenu primary color
    'submenu.backgroundColor': '#1e1e1e',
    'submenu.partition.color': '#858585',
    
    // submenu labels
    'submenu.normalLabel.color': '#858585',
    'submenu.normalLabel.fontWeight': 'lighter',
    'submenu.activeLabel.color': '#fff',
    'submenu.activeLabel.fontWeight': 'lighter',
    
    // checkbox style
    'checkbox.border': '1px solid #ccc',
    'checkbox.backgroundColor': '#fff',
    
    // rango style
    'range.pointer.color': '#fff',
    'range.bar.color': '#666',
    'range.subbar.color': '#d1d1d1',
    
    'range.disabledPointer.color': '#414141',
    'range.disabledBar.color': '#282828',
    'range.disabledSubbar.color': '#414141',
    
    'range.value.color': '#fff',
    'range.value.fontWeight': 'lighter',
    'range.value.fontSize': '11px',
    'range.value.border': '1px solid #353535',
    'range.value.backgroundColor': '#151515',
    'range.title.color': '#fff',
    'range.title.fontWeight': 'lighter',
    
    // colorpicker style
    'colorpicker.button.border': '1px solid #1e1e1e',
    'colorpicker.title.color': '#fff'
    };


const DemoToastUI = () => {


    
    const refl = useRef()


    useEffect(() => {
        console.log('마운트될 때만 실행')  // componentDidMount, componentDidUpdate 합친형태
        
        // setCards2(cards2.concat(append))
        // setCards2(cards2.concat(append))

        refl.current.getInstance().on('objectActivated', function(props) {
            console.log("objectActivated")
            console.log(JSON.stringify(props));
        });

        refl.current.getInstance().on('objectMoved', function(props) {
            console.log("objectMoved")
            console.log(JSON.stringify(props));
        });

        refl.current.getInstance().on('objectRotated', function(props) {
            console.log("objectRotated")
            console.log(JSON.stringify(props));
        });

        refl.current.getInstance().on('objectScaled', function(props) {
            console.log("objectScaled")
            console.log(JSON.stringify(props));
        });

        refl.current.getInstance().on('textEditing', function(props) {
            console.log("textEditing")
            console.log(JSON.stringify(props));
        });

    }, [])

    const tempStyle={
        display:"inline-block",
        width:"100px",
        height:"100px",
        boder:"1px solid black",
        background:"orange",
        }
        


    const addImage = () => {
        console.log(refl.current)

        // refl.current.addImageObject('logo192.png').then(objectProps => {
        //     // console.log(ojectProps.id);
        // });
        // refl.current.addImage('logo192.png').then()
        refl.current.getInstance().addImageObject('logo192.png').then(objectProps => {
                console.log(objectProps.id)
                console.log(JSON.stringify(objectProps))
        });
    }

    const loadBackgroudImage = () => {
        // refl.current.getInstance().changeShape(2, { // change rectagle or triangle
        //     fill: 'red',
        //     stroke: 'blue',
        //     strokeWidth: 3,
        //     width: 100,
        //     height: 200
        // });
        refl.current.getInstance().loadImageFromURL('logo512.png', 'lena').then(result => {
            console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
            console.log('new : ' + result.newWidth + ', ' + result.newHeight);
       });
    }

    const addText = () => {
        refl.current.getInstance().addText('init text', {
            styles: {
                fill: '#000',
                fontSize: 20,
                fontWeight: 'bold'
            },
            position: {
                x: 10,
                y: 10
            }
        }).then(objectProps => {
            console.log(JSON.stringify(objectProps))
        });

    }


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
        let dataURL = refl.current.getInstance().toDataURL()
        downloadURI(dataURL, 'stage2.jpg')
      }



    return (
        <div>
            <div>
                <button onClick={addImage}>image add</button>
        </div>


            <div>
                <button onClick={loadBackgroudImage}>load backgroud image</button>
            </div>

            <div>
                <button onClick={handleDownload}>downalod image</button>
            </div>

            <div>
                <button onClick={addText}>add text</button>
            </div>

        <div className='Container'>
        
            <ImageEditor
                className='Container'
                includeUI={{
                    loadImage: {
                      path: 'logo512.png',
                      name: 'SampleImage'
                    },
                    theme: customTheme,
                    menu: ['shape', 'filter', 'text'],
                    initMenu: 'filter',
                    uiSize: {
                      width: '1000px',
                      height: '700px'
                    },
                    menuBarPosition: 'bottom'
                  }}

                ref={refl}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70
                }}
                usageStatistics={true} 
            />

        </div>
        </div>



    );

};
export default DemoToastUI;
