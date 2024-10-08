import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import QuestionsList from '../../components/Questions/QuestionsList/QuestionsList'
import './Home.css'
export default function Home() 
{
  return (
    <div>
      <div className="d-flex justify-content-between Align-items-center">
        <h1>Eng yaxshi savollar</h1>
        <NavLink className="button-5" role="button" to='questions/new'>Savol so'rang</NavLink>
      </div>
        <QuestionsList/> 
    </div>

  )
}
