import React from 'react'
import pokeballLoad from '../../Assets/Img/pokeball.png'
import './SpinnerNoFavorites.css'

const SpinnerNoFavorites = () => {
    return (
        <div className='spinerContenedorNoPokemonsFavorites'>
            <h3>No haz agregado ningún pokemon favorito (-.-")</h3>
            <img className='pokeSpinner' src={pokeballLoad} alt="" />
        </div>
    )
}

export default SpinnerNoFavorites