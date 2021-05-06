import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <div>
        <h1>Expensify</h1>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add">Add</NavLink>
        <NavLink to="/edit">Edit</NavLink>
        <NavLink to="/help">Help</NavLink>
    </div>
)

export default Header