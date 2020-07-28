import React from 'react'
import Card from '../components/Card'
import api from '../api/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

import * as _ from 'underscore';

import queue from 'queue'

//const Card = (id, url, width, height, title, description) => {


    
const CardListScreen = () => {

    const handleClick = () => {
        const params = {}
        api.cards.getCards(params, (response) => {
            console.log(response)
        }, (error) => {

        })
    }
//       isGetting = false;
    let frontBuffer = useRef([queue()])

    let rearBuffer = useRef([queue()])

    const [isGetting, setIsGetting] = useState(false)

    const [cards, setCards] = useState([])

    const [cards2, setCards2] = useState([
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '1'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '1'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '1'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '1'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '1'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '1'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '1'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '1'
        },
    ])



    const append = [
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '2'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '2'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '2'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '2'
        },
    ]


    const shiptt2 = [
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '32'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '32'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '32'
        },
        {
            id: Math.random().toString(36),
            url: 'logo512.png',
            width: 100,
            height: 100,
            title: Math.random().toString(36),
            description: '32'
        },
    ]

    const aab =  {
        id: Math.random().toString(36),
        url: 'logo512.png',
        width: 100,
        height: 100,
        title: Math.random().toString(36),
        description: '32'
    }

    useEffect(() => {
        console.log('렌더링이 완료되었습니다!')  // componentDidMount, componentDidUpdate 합친형태
    })

    useEffect(() => {
        console.log('마운트될 때만 실행')  // componentDidMount, componentDidUpdate 합친형태
        const params = {}
        api.cards.getCards(params, (response) => {
            console.log(response.data)
            setCards(response.data.data)
        }, (error) => {
            alert('에러')
        })
        
        // setCards2(cards2.concat(append))
        // setCards2(cards2.concat(append))

    }, [])

    // useEffect(() => {
    //     console.log('변경되었습니다. ')

    //     return () => {
    //         console.log('clean up ')  // 언마운트 되기 전이나 업데이트 되기 직전에 어떠한 작업을 수행하고 싶으면..
    //     }
    // }, [inputText])"overflow:scroll; width:400px; height:200px;"
    const handleScroll2 = (event) => {    
        var node = event.target;
        const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
        if (bottom) {      
          setCards2(cards2.splice(0, append.length))
          console.log("BOTTOM REACHED:",bottom);
          setCards2(cards2.concat(append))
          console.log("BOTTOM REACHED22:",bottom);
        } 
        
        if (node.scrollTop === 0) {
            console.log('top')
            setCards2(cards2.splice(cards2.length - append.length, append.length))
            setCards2([...shiptt2, ...cards2])
            node.scrollTop = 10
        }
      }
    
      const handleScroll = (event) => {    
        var node = event.target;
        const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
        
        if (bottom) {    
            // if (isGetting) {
            //     return;
            // }
            // setIsGetting(true)
            // let params = {"cursor": "cD0xMA=="}
            // api.cards.getCards(params, (response) => {
            //     console.log(response.data)
            //     setCards(cards.concat(response.data.data))
            // }, (error) => {
            //     alert('에러')
            // })
            console.log("AAA: " + cards2.length)
          let bfs = _.clone(cards2).splice(0, (append.length))
          bfs.map(ob => {
            frontBuffer.current.push(ob)  // 화면에서 없어진 데이타 추가한다.
          })

          if (frontBuffer.current.length > 100) {
            bfs.map(ob => {
                frontBuffer.current.shift()  // 제일 오래된거 지운다..
              })
          }


          if (rearBuffer.current.length > 4) {

          } else {

          }

          setCards2(cards2.splice(-(append.length)))
          console.log("BOTTOM REACHED:",bottom);
          setCards2(cards2.concat(append))
          console.log("BOTTOM REACHED22:",bottom);
            // setIsGetting(false)
            node.scrollTop = 10
        } 
        
        if (node.scrollTop === 0) {

            if (frontBuffer.current.length > 4) {
                let lenght = 4

                let newCards = cards2.splice(0, cards2.length - lenght)
                setCards2(newCards)
                let bfs = _.clone(frontBuffer.current).slice(-lenght)
                bfs.map(ob => {
                    frontBuffer.current.pop()  // 제일 최근꺼 지운다..
                })
                console.log(JSON.stringify(bfs))
                setCards2([...bfs, ...newCards])

                node.scrollTop = 100

            } else {
                // 서버 통신해서 가져온다.

                              // 서버에서 가져온다.
                console.log("서버에서 가져온다.: " +cards2.length)

                // setCards2(cards2.splice(cards2.length - shiptt2.length, shiptt2.length))
                cards2.splice(0, shiptt2.length)

                console.log("서버에서 가져온다.: " +cards2.length)


                setCards2([...shiptt2, ...cards2])
                node.scrollTop = 100

            }

            console.log('top')
            // setCards2(cards2.splice(cards2.length - append.length, append.length))
            // setCards2([...shiptt2, ...cards2])
        }
      }


    return (
        <div>
            <div>
                {/* <p>Card 배열 크기 {cards.length}</p><button onClick={handleClick}>Test</button> */}
                <p>Card2 배열 크기 {cards2.length}</p>
                <p>Front Buffer :{ frontBuffer.current.length}</p>
                <p>Rear Buffer :{ rearBuffer.current.length}</p>


            </div>
            <div style={{display:'inline-block', width:'900px', height:'500px', overflow:'scroll'}} onScroll={handleScroll}>
            {
                // cards.map(card => (

                //     <Card key={Math.random().toString(36)} id={card.id} url={card.images.url} width={card.images.width} heigth={card.images.heigth} title={card.title} description={card.description}></Card>

                // ))
                cards2.map(card => (

                    <Card key={card.id} id={card.id} url={card.url} width={card.width} heigth={card.heigth} title={card.title} description={card.description}></Card>

                ))
            }
            </div>

            {isGetting && (<div>서버 통신중입니다.</div>)}
        </div>
    )
}

export default CardListScreen