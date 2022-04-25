import React from 'react'
import pokeballLoad from '../../Assets/Img/pokeball.png'
import './SpinnerNoPokemons.css'

const SpinnerNoPokemons = () => {
    return (
        <div className='spinerContenedorNoPokemons'>
            <h3>No se han agregado pokemons al grupo aun (-.-")</h3>
            <img className='pokeSpinner' src={pokeballLoad} alt="" />
        </div>
    )
}

export default SpinnerNoPokemons