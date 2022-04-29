/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ReactComponent as FavComponent } from '../../../Assets/Icons/favoriteHeart.svg'
import { ReactComponent as CloseComponent } from '../../../Assets/Icons/close_black_24dp.svg'
import SpinnerPokeball from '../../Spinners/SpinnerPokeball'
import StatsPokemon from '../../StatsPokemon/StatsPokemon'
import TypesPokemon from '../../TypesPokemon/TypesPokemon'
import './FocusPokemon.css'
import FavoritePokemon from '../../../Context/FavoritePokemon'
import { useContext } from 'react'
import PokemonGroup from '../../../Context/PokemonGroup'

const FocusPokemon = ({ focusPokemonControll, setFocusPokemonControll }) => {

    const { agregarPokemon, equipoS, eliminarPokemon } = useContext(FavoritePokemon)
    const { agregarPersonaje, pokemonGroup } = useContext(PokemonGroup)
    const [colorHearth, setColorHearth] = useState(false)
    const [color1, setColor1] = useState("")
    const [color2, setColor2] = useState("")

    const focusPokemon = (e) => {
        setFocusPokemonControll(false)
    }

    const agregarFavoritos = () => {
        if (!colorHearth) {
            agregarPokemon({
                "name": focusPokemonControll[0].name,
                "data": [focusPokemonControll[0], color1, color2]
            })
            setColorHearth(true)
        } else {
            eliminarPokemon(focusPokemonControll[0])
            setColorHearth(false)
        }
    }

    const agregarAlGrupo = (props) => {
        for (let index = 0; index < pokemonGroup.length; index++) {
            if (props.id === pokemonGroup[index].id) {
                alert('El pokemon ya fue agregado al grupo')
                return
            }
        }

        if (pokemonGroup.length >= 0 && pokemonGroup.length < 5) {
            agregarPersonaje(props)
        }
        if (pokemonGroup.length === 5) alert('Se a alcanzado la capacidad maxima del equipo')
    }

    useEffect(() => { // Controla el cambio de color cuando se cambia el focus de un pokemon a otro
        if (focusPokemonControll[0].types.length > 1) {
            setColor1(focusPokemonControll[1])
            setColor2(focusPokemonControll[2])
        } else {
            setColor1(focusPokemonControll[1])
            setColor2(false)
        }

    }, [focusPokemonControll])

    useEffect(() => {
        if (equipoS.length > 0) {
            for (let index = 0; index < equipoS.length; index++) {
                const element = equipoS[index];
                if (element.data[0].name === focusPokemonControll[0].name) {
                    setColorHearth(true)
                    return
                } else {
                    setColorHearth(false)
                }
            }
        } else setColorHearth(false)

    }, [equipoS, focusPokemonControll])



    return (
        <div
            style={
                color2 ? {
                    backgroundImage: `linear-gradient(to top right, ${color1}, ${color2})`
                }
                    : {
                        backgroundColor: `${color1}`
                    }
            }
            className='contenedor-Focus-Pokemon'>
            {
                Object.keys(focusPokemonControll).length > 0
                    ? <div className='contenedor-Hijo-Focus-Pokemon'>
                        <CloseComponent
                            onClick={(e) => {
                                focusPokemon(e)
                            }}
                            className='close-Focus-Component'
                        />
                        <FavComponent
                            onClick={(e) => {
                                agregarFavoritos()
                                e.stopPropagation()
                            }}
                            style={{ fill: colorHearth ? "red" : "#c5d0f9" }}
                            className='fav-Focus-Style'
                        />
                        <section className='info-Contenedor-Focus'>
                            <div className='types-Focus-Pokemon'>
                                <img src={focusPokemonControll[0].sprites.versions["generation-v"]["black-white"].animated.front_default} alt="" />
                                <h3 style={
                                    color2 ? {
                                        backgroundImage: `linear-gradient(to top right, ${color1}, ${color2})`,
                                        WebkitBackgroundClip: "text",
                                        color: "transparent"
                                    }
                                        : {
                                            color: `${color1}`
                                        }
                                }>{focusPokemonControll[0].name}</h3>
                                <section className='types-Focus-Pokemon-Name'>
                                    {
                                        color1 || color2
                                            ? focusPokemonControll[0].types.map((el, key) => {
                                                return <TypesPokemon el={el} key={key} />
                                            })
                                            : false
                                    }
                                </section>
                            </div>
                            <div className='estadisticas-Contenedor'>
                                <h3 style={{ textAlign: "center" }}>Estadisticas</h3>
                                <section className='focus-Habilidades'>
                                    {
                                        focusPokemonControll[0].stats.map((el, index) => {
                                            return <StatsPokemon el={el} key={index} />
                                        })
                                    }
                                </section>
                                <button
                                    onClick={() => agregarAlGrupo(focusPokemonControll[0])}
                                    className='btn-Agregar-Pokemon'
                                >Agregar al Grupo</button>
                            </div>
                        </section>
                    </div>
                    : <SpinnerPokeball />
            }
        </div>
    )
}

export default FocusPokemon