/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const types = {
    'normal': '#A8A878', 'fire': '#F08030', 'water': '#6890F0',
    'grass': '#78C850', 'electric': '#F8D030', 'fighting': '#C03028',
    'poison': '#A040A0', 'ground': '#E0C068', 'flying': '#A890F0',
    'psychic': '#F85888', 'bug': '#A8B820', 'rock': '#B8A038',
    'ghost': '#705898', 'dark': '#705848', 'dragon': '#7038F8',
    'steel': '#B8B8D0', 'fairy': '#F0B6BC', 'ice': 'rgb(127 210 255)'
}

const TypesPokemon = ({
    el, // obj con el type del Pokémon
}) => {
    const [color, setColor] = useState()
    useEffect(() => {
        const typesFilter = types[el.type.name]
        setColor(typesFilter)
        return () => {
        }
    }, [el])

    return (
        <div style={{ border: `1px solid ${color}`, width: "40%", height: "25px", textAlign:"center" }}>
            <p style={{ margin: "0", color: color }}>{el.type.name}</p>
        </div>
    )
}

export default TypesPokemon