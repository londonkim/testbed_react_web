import React from 'react'
import './Categories.scss'
import cn from 'classname'

import { NavLink } from 'react-router-dom'

const categories = [
    {
        name: 'all',
        text: '전체보기'
    },
    {
        name: 'sports',
        text: '스포츠'
    }
]

const Categories = ({ category, onSelect }) => {
    return (
        <div className="Categories">
            <ul>
                {categories && categories.map(c => {
                    console.log(category + " " + c.name)
                    return <NavLink key={c.name} className={ cn('li', { active: category == c.name}) } to={c.name === 'all' ? '/' : `/${c.name}`}>{c.text}</NavLink> 
                })}
            </ul>
        </div>
    )
}

export default Categories

