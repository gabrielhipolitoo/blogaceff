import React, { useEffect, useState } from "react";
import  "../assets/css/nav.css";
import logo from "../assets/imgs/Logo-aceff.png";
import { useLocation } from "react-router-dom";




//fontawasome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {

  
  const location = useLocation();
  const [path,setPath] = useState()
  const [background,setbackground] = useState()
  const [menuActive,setMenuActive] = useState(false)
  const [color,setColor] =  useState()
  const links_scroll = document.querySelectorAll(`.links ul li a `)


  const menuMobile = () => {
    setMenuActive(!menuActive)
  }


  const handleScroll = () => {

    if(window.scrollY >=40){

        setbackground({
        backgroundColor:"#fff",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
      })
      setColor({
        color:"#364753", 
      }) 

      
    }
    else{
      setColor({
        color:"#fff", 
      }) 
      setbackground({})
    }
  }


  const arrayLinks = [
    {
      href:"",
      texto:"Inicio"
    },
    {
      href:"",
      texto:"Sobre"
    },
    {
      href:"",
      texto:"Galeria"
    },

    {
      href:"",
      texto:"Projetos"
    },
    {
      href:"",
      texto:"Empresas Parceiras"
    },
    {
      href:"",
      texto:"Certficados"
    },
    {
      href:"",
      texto:"Doe"
    },
    {
      href:"",
      texto:"Contato"
    }
  ]

  useEffect(() => {
    const baseStyle = () => {
      if(path === "/"){
        setbackground({})
       window.addEventListener(("scroll"),handleScroll)

       links_scroll.forEach(link => {
        link.classList.remove("links_scroll");
      });
      }
  
      else{
        setbackground({
          backgroundColor:"#fff",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
        })
        links_scroll.forEach(link => {
          link.classList.add("links_scroll");
        });
      }
    }
    baseStyle()

    return () => {
      window.removeEventListener(("scroll"),handleScroll)

    }
  },[path])


  useEffect(()=> {
    setPath(location.pathname)
  },[location])

  return (
    <nav
    style={background}
      id="nav_"
      className={`nav_links ${menuActive? "active":""}`}>

      <img src={logo} alt="logo da pagina" />
      <button onClick={menuMobile}  id="btnMobile" >
      <FontAwesomeIcon fontSize="3rem" color="#364753"  icon={faBars} />
      </button>
      <div className="links">
        <button onClick={menuMobile} id="fecharMobile">
        <FontAwesomeIcon fontSize="3rem" color="#364753" icon={faXmark} />
        </button>
        <ul>
          {arrayLinks.map(({texto,href}) =>(
            <li key={texto}>
              <a style={color} href="">{texto}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
