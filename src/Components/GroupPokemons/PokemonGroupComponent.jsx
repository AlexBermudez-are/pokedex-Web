/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react'
import './PokemonGroupComponent.css'

const types = {
    'normal': '#A8A878', 'fire': '#F08030', 'water': '#6890F0',
    'grass': '#78C850', 'electric': '#F8D030', 'fighting': '#C03028',
    'poison': '#A040A0', 'ground': '#E0C068', 'flying': '#A890F0',
    'psychic': '#F85888', 'bug': '#A8B820', 'rock': '#B8A038',
    'ghost': '#705898', 'dark': '#705848', 'dragon': '#7038F8',
    'steel': '#B8B8D0', 'fairy': '#F0B6BC', 'ice': 'rgb(127 210 255)'
}

const PokemonGroupComponent = ({
    el,
    setPokemonActual,
    pokemonActual,
    setColor1,
    setColor2,
    eliminarPokemon
}) => {

    useEffect(() => {
        if (pokemonActual.types.length > 1) {
            const color1 = types[pokemonActual.types[0].type.name]
            const color2 = types[pokemonActual.types[1].type.name]
            setColor1(color1)
            setColor2(color2)
        } else {
            const color1 = types[pokemonActual.types[0].type.name]
            setColor1(color1)
            setColor2(false)
        }
    }, [pokemonActual])

    return (
        <section
            className='container-Component-Icons-Pokemon'
            onClick={() => setPokemonActual(el)}
        >
            <div className="img-Icon-Pokemon-Component">
                <img src={el.sprites.versions["generation-viii"].icons.front_default} alt={el.name} />
            </div>
            <p>{el.name}</p>
            <button className='btn-Delete' onClick={()=>eliminarPokemon(el)}>Eliminar</button>
        </section>
    )
}

export default PokemonGroupComponent