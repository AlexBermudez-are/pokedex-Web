/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import FavoritePokemon from '../../Context/FavoritePokemon';
import { ReactComponent as FavComponent } from '../../Assets/Icons/favoriteHeart.svg'
import TypesPokemon from '../TypesPokemon/TypesPokemon';

const types = {
    'normal': '#A8A878', 'fire': '#F08030', 'water': '#6890F0',
    'grass': '#78C850', 'electric': '#F8D030', 'fighting': '#C03028',
    'poison': '#A040A0', 'ground': '#E0C068', 'flying': '#A890F0',
    'psychic': '#F85888', 'bug': '#A8B820', 'rock': '#B8A038',
    'ghost': '#705898', 'dark': '#705848', 'dragon': '#7038F8',
    'steel': '#B8B8D0', 'fairy': '#F0B6BC', 'ice': 'rgb(127 210 255)'
}

const FavoriteComponent = ({
    setFocusPokemonControll,
    focusPokemonControll,
    buscadorPokemon, // Contiene la data del pokemon buscado
    el
}) => {

    const { agregarPokemon, equipoS, eliminarPokemon } = useContext(FavoritePokemon)
    const [colorHearth, setColorHearth] = useState(false) // Controla el color del corazon de Fav
    const [first, setfirst] = useState({}) // contiene la toda la data general del pokemon, es recibida por las...
    // funciones [dataPokemonUnico, dataPokemonSearch]
    const [color1, setColor1] = useState()
    const [color2, setColor2] = useState() // este estado no cambiara al menos que hayan 2 tipos de pokemons

    const focusPokemon = (e) => {
        setFocusPokemonControll({
            ...focusPokemonControll,
            data: [first.data[0], color1, color2],
            active: true
        })
    }

    const agregarFavoritos = () => {
        if (!colorHearth) {
            agregarPokemon({
                "name": first.data[0].name,
                "data": [first.data[0], color1, color2],
                "active": true
            })
            setColorHearth(true)
        } else {
            eliminarPokemon(first.data[0])
            setColorHearth(false)
        }
    }

    useEffect(() => {

        const dataPokemonUnico = async () => { // Esta funcion se ejecuta cuando la peticion tiene mas de un elemento pokemon
            // Inicio de la peticion get
            setfirst(el)

            if (Object.keys(first).length > 0) {
                if (first.data[0].types.length > 1) {
                    const color1 = types[first.data[0].types[0].type.name]
                    const color2 = types[first.data[0].types[1].type.name]
                    setColor1(color1)
                    setColor2(color2)
                } else {
                    const color1 = types[first.data[0].types[0].type.name]
                    setColor1(color1)
                }

                if (equipoS.length > 0 && Object.keys(first).length > 0) {
                    for (let index = 0; index < equipoS.length; index++) {
                        const element = equipoS[index];
                        if (element.data[0].name === first.data[0].name) {
                            setColorHearth(true)
                            return
                        } else {
                            setColorHearth(false)
                        }
                    }
                } else setColorHearth(false)
            }
        }

        const dataPokemonSearch = async () => { // Esta funcion se ejecuta cuando se busca un pokemon
            setfirst(buscadorPokemon) // Setea el estado del componente con la data
            if (buscadorPokemon) {
                if (buscadorPokemon.types.length > 1) {
                    const color1 = types[buscadorPokemon.types[0].type.name]
                    const color2 = types[buscadorPokemon.types[1].type.name]
                    setColor1(color1)
                    setColor2(color2)
                } else {
                    const color1 = types[buscadorPokemon.types[0].type.name]
                    setColor1(color1)
                    setColor2(false)
                }

                if (equipoS.length > 0 && buscadorPokemon) {
                    for (let index = 0; index < equipoS.length; index++) {
                        const element = equipoS[index];
                        if (element.data[0].name === buscadorPokemon.name) {
                            setColorHearth(true)
                            return
                        } else {
                            setColorHearth(false)
                        }
                    }
                } else setColorHearth(false)
            }
        }

        buscadorPokemon // Contiene la data de la peticion fetch del buscador de Pokemons
            ? dataPokemonSearch()
            : dataPokemonUnico()

        return () => {
        }
    }, [buscadorPokemon, first])

    useEffect(() => {
        if (equipoS.length !== 0) {
            equipoS.map(el => {
                if (el.data[0].name === first.name && el.active) {
                    return setColorHearth(true)
                } else {
                    return setColorHearth(false)
                }
            })
        } else setColorHearth(false)
    }, [equipoS])

    return (
        <div className='container-Card-Pokemon' onClick={(e) => {
            focusPokemon(e)
        }}>
            {
                Object.keys(first).length > 0
                    ? <div
                        style={
                            color2 ? {
                                backgroundImage: `linear-gradient(to top right, ${color1}, ${color2})`
                            }
                                : {
                                    backgroundColor: `${color1}`
                                }
                        }
                        className='card-Pokemon'>
                        <div className='borde-Types-Color'>
                            <FavComponent
                                onClick={(e) => {
                                    setColorHearth(!colorHearth)
                                    agregarFavoritos()
                                    e.stopPropagation()
                                }}
                                style={{ fill: colorHearth ? "red" : "#c5d0f9" }}
                                className='svg-Fav'
                            />
                            <img src={first.data[0].sprites.front_default} alt="" />
                            <h3 style={
                                color2 ? {
                                    backgroundImage: `linear-gradient(to top right, ${color1}, ${color2})`,
                                    WebkitBackgroundClip: "text",
                                    color: "transparent"
                                }
                                    : {
                                        color: `${color1}`
                                    }
                            }>{first.data[0].name}</h3>
                            <section className='pokemon-Types'>
                                {
                                    color1 || color2
                                        ? first.data[0].types.map((el, key) => {
                                            return <TypesPokemon el={el} key={key} />
                                        })
                                        : false
                                }
                            </section>
                        </div>
                    </div>
                    : false
            }
        </div>
    )
}



export default FavoriteComponent