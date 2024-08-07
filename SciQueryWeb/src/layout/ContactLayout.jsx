import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function ContactLayout() {
  return (
    <div>
        <h1>Contact</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto veritatis autem nam quidem. Ducimus aliquam ratione expedita dicta perspiciatis distinctio accusamus vero explicabo, excepturi repudiandae fugiat dolores magnam maiores sit?</p>
        <nav>
            <NavLink to="faq">Faq</NavLink>
            <NavLink to="form">Form</NavLink>
        </nav>
        <Outlet/>
    </div>
  )
}

export default ContactLayout    