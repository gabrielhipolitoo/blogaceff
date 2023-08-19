import React from 'react'
import style from '../assets/css/header.module.css'
import Nav from './Nav'
const Header = () => {
  return (
    <header className={style.header}>
        <h1>BLOG ACEFF</h1>
        <p>Fique por dentro de todas nossas atividades e eventos.</p>
    </header>
  )
}

export default Header