import React from 'react'
import pokeballLoad from '../../Assets/Img/pokeball.png'
import './SpinnerPokeball.css'

const SpinnerPokeball = () => {
    return (
        <div className='spinerContenedor'>
            <img className='pokeSpinner' src={pokeballLoad} alt="" />
        </div>
    )
}

export default SpinnerPokeball