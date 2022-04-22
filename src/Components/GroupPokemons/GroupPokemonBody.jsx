/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useContext } from 'react'
import PokemonGroup from '../../Context/PokemonGroup'
import SpinnerPokeball from '../Spinners/SpinnerPokeball'
import PokemonGroupComponent from './PokemonGroupComponent'
import './GroupPokemonBody.css'

// const btnActiveArray = {
//     pokemon1: "#696969",
//     pokemon2: "#979797",
//     pokemon3: "#979797",
//     pokemon4: "#979797",
//     pokemon5: "#979797"
// }

const stats = {
    'hp': "#ff0de1", 'attack': '#ff984f', 'defense': '#88f4ff',
    'special-attack': '#cf70ff', 'special-defense': '#7f70ff', 'speed': '#93ff70'
}

const GroupPokemonBody = () => {

    const { pokemonGroup, statDominator, eliminarPokemon } = useContext(PokemonGroup)
    const [pokemonActual, setPokemonActual] = useState()
    const [statDominatingColor, setStatDominatingColor] = useState()
    const [color1, setColor1] = useState()
    const [color2, setColor2] = useState() // este estado no cambiara al menos que hayan 2 tipos de pokemons

    // const [controllBtn, setControllBtn] = useState(btnActiveArray)
    const refSlider = useRef()

    useEffect(() => {
        setPokemonActual(pokemonGroup[0])

        if (pokemonActual) {
            console.log(pokemonActual)
        }
    }, [])

    useEffect(() => {
        const colorStat = stats[statDominator]
        setStatDominatingColor(colorStat)
    }, [statDominator])
    


    return (
        <section>
            {
                pokemonActual
                    ? <div className='body-Pokemon-G' ref={refSlider}>
                        <section className="slider-Pokemon-Group">
                            <div className="slider-Pokemon" >
                                <section className="card-Slider-Pokemon" style={
                                    color2 ? {
                                        backgroundImage: `linear-gradient(to top right, ${color1}, ${color2})`
                                    }
                                        : {
                                            backgroundColor: `${color1}`
                                        }
                                }>
                                    <div className='container-White-Background'>
                                        <img src={pokemonActual.sprites.versions["generation-v"]["black-white"].animated.front_default} alt={pokemonActual.name} />
                                        <h2 style={{ margin: "0", color: "white" }}>{pokemonActual.name}</h2>
                                    </div>
                                </section>
                            </div>
                        </section>
                        <section className="info-PokemonGroup">
                            <div className="team-Icons-Pokemon-Group">
                                {
                                    Object.keys(pokemonGroup).length !== 0
                                        ? pokemonGroup.map((el, index) => <PokemonGroupComponent
                                            key={index} el={el}
                                            pokemonActual={pokemonActual}
                                            setPokemonActual={setPokemonActual}
                                            setColor1={setColor1}
                                            color1={color1}
                                            setColor2={setColor2}
                                            color2={color2}
                                            eliminarPokemon={eliminarPokemon}
                                        />)
                                        : false
                                }
                            </div>
                            <div style={{ backgroundColor: statDominatingColor }} className="info-Pokemon-Unique">
                                <h1>Stat Dominante del Equipo</h1>
                                <p>'{statDominator}'</p>
                            </div>
                        </section>
                    </div>
                    : <SpinnerPokeball />
            }
        </section>
    )
}

export default GroupPokemonBody