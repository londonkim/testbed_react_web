import React from 'react'

import {Link, Route, NavLink} from 'react-router-dom'

import Profile from './Profile'

const Profiles = () => {

    const activeStyle = {
        backgroud: 'black',
        color: 'red'
    }
    return (
        <div>
            사용자 목록
            <ul>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/velopert">velopert</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyle} to="/profiles/gildong">gildong</NavLink>
                </li>
            </ul>

            <Route path="/profiles" exact render={() => <div>사용자를 선택해 주세요</div>}>
            </Route>

            <Route path="/profiles/:username" component={Profile}></Route>
        </div>
    )
}

export default Profiles