/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './StatsPokemon.css'

const stats = {
    'hp': "#ff0de1", 'attack': '#ff984f', 'defense': '#88f4ff',
    'special-attack': '#cf70ff', 'special-defense': '#7f70ff', 'speed': '#93ff70'
}

const StatsPokemon = ({ el }) => {

    const [statColor, setStatColor] = useState()

    useEffect(() => {
        const colorStat = stats[el.stat.name]
        setStatColor(colorStat)
    }, [])

    return (
        <div className='stats-Component'>
            <section style={{ color: statColor }}>
                {el.stat.name[0].toUpperCase()}{el.stat.name.slice(1)}:
            </section>
            &nbsp;
            <section style={{ color: statColor }}>{el.base_stat}</section>
        </div>
    )
}

export default StatsPokemon