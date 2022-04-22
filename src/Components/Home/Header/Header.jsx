import React from 'react'
import { NavLink } from 'react-router-dom'
import BuscadorPokemon from './BuscadorPokemon'
import './Header.css'

const Header = ({ setBuscadorPokemon, controllSearchPokemon, setControllSearchPokemon }) => {
    return (
        <div className='headerContenedor'>
            <section className='contenedorRedireccionesHeader'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/grupo-Pokemon">Grupo Pokemon</NavLink>
                <NavLink to="/favoritos">Favoritos</NavLink>
                <NavLink to="/portfolio">Portfolio</NavLink>
            </section>
            <BuscadorPokemon
                setBuscadorPokemon={setBuscadorPokemon}
                controllSearchPokemon={controllSearchPokemon}
                setControllSearchPokemon={setControllSearchPokemon}
            />
        </div>
    )
}

export default Header