/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import BuscadorPokemon from './BuscadorPokemon'
import './Header.css'

const Header = ({ setBuscadorPokemon, controllSearchPokemon, setControllSearchPokemon }) => {

    const location = useLocation()
    const menuInteractive = useRef()
    const menuBtn = useRef()
    const [controllMenu, setControllMenu] = useState(false)

    const links = [
        {
            name: "Inicio",
            path: "/",
        },
        {
            name: "Grupo Pokemon",
            path: "/grupo-Pokemon"
        },
        {
            name: "Favoritos",
            path: "/favoritos",
        },
        {
            name: "Acerca de mi",
            path: "/acerca-de-mi",
        }
    ];

    useEffect(() => {
        location.pathname === links.path ? console.log(location) : console.log("location")

    }, [])

    const menu = () => {
        if (!controllMenu) {
            setControllMenu(true)
            menuBtn.current.className = 'hamburger hamburger--collapse is-active'
            menuInteractive.current.className = "contenedorRedireccionesHeader active"
        }else{
            setControllMenu(false)
            menuBtn.current.className = 'hamburger hamburger--collapse'
            menuInteractive.current.className = "contenedorRedireccionesHeader"
        }
    }


    return (
        <div className='headerContenedor'>
            <section className='contenedorRedireccionesHeader' ref={menuInteractive}>
                {
                    links
                        ? links.map((el, index) => {
                            return <NavLink
                                style={{ color: location.pathname === el.path ? "black" : "white" }}
                                to={el.path}
                                key={index}
                            >
                                {el.name}
                            </NavLink>
                        })
                        : false
                }
            </section>
            <button
                className="hamburger hamburger--collapse"
                ref={menuBtn}
                type="button"
                onClick={menu}
            >
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
            <BuscadorPokemon
                setBuscadorPokemon={setBuscadorPokemon}
                controllSearchPokemon={controllSearchPokemon}
                setControllSearchPokemon={setControllSearchPokemon}
            />
        </div>
    )
}

export default Header