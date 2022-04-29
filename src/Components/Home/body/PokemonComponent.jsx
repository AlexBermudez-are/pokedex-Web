/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './PokemonComponent.css'
import TypesPokemon from '../../TypesPokemon/TypesPokemon';
import { ReactComponent as FavComponent } from '../../../Assets/Icons/favoriteHeart.svg'
import FavoritePokemon from '../../../Context/FavoritePokemon';
import { useContext } from 'react';

const types = {
    'normal': '#A8A878', 'fire': '#F08030', 'water': '#6890F0',
    'grass': '#78C850', 'electric': '#F8D030', 'fighting': '#C03028',
    'poison': '#A040A0', 'ground': '#E0C068', 'flying': '#A890F0',
    'psychic': '#F85888', 'bug': '#A8B820', 'rock': '#B8A038',
    'ghost': '#705898', 'dark': '#705848', 'dragon': '#7038F8',
    'steel': '#B8B8D0', 'fairy': '#F0B6BC', 'ice': 'rgb(127 210 255)'
}

const PokemonComponent = ({
    setFocusPokemonControll,
    focusPokemonControll,
    buscadorPokemon, // Contiene la data del pokemon buscado
    data, // "data" contiene la data de la peticion Get del componente home
}) => {

    const { agregarPokemon, equipoS, eliminarPokemon } = useContext(FavoritePokemon)
    const [colorHearth, setColorHearth] = useState(false) // Controla el color del corazon de Fav
    const [first, setfirst] = useState({}) // contiene la toda la data general del pokemon, es recibida por las...
    // funciones [dataPokemonUnico, dataPokemonSearch] dentro del useEffect con el parametro '[buscadorPokemon]'
    const [color1, setColor1] = useState()
    const [color2, setColor2] = useState() // este estado no cambiara al menos que hayan 2 tipos de pokemons

    const focusPokemon = (e) => {
        setFocusPokemonControll({
            ...focusPokemonControll,
            data: [first, color1, color2],
            active: true
        })
        console.log(focusPokemonControll);
    }

    const agregarFavoritos = () => {
        if (!colorHearth) {
            agregarPokemon({
                "name": first.name,
                "data": [first, color1, color2]
            })
            setColorHearth(true)
        } else {
            eliminarPokemon(first)
            setColorHearth(false)
        }
    }

    useEffect(() => { // Configura el color del componente según su 'type' y cambia la data del body si se hace una busqueda

        const dataPokemonUnico = async () => { // Esta funcion se ejecuta cuando la peticion tiene mas de un elemento pokemon
            // Inicio de la peticion get
            const dataPokemon = await data.url
            const peticionDataPokemon = await axios.get(dataPokemon)
            const infoPokemonGeneral = await peticionDataPokemon.data
            setfirst(infoPokemonGeneral)
            //Fin de la peticion get
            if (infoPokemonGeneral) {
                if (infoPokemonGeneral.types.length > 1) {
                    const color1 = types[infoPokemonGeneral.types[0].type.name]
                    const color2 = types[infoPokemonGeneral.types[1].type.name]
                    setColor1(color1)
                    setColor2(color2)
                } else {
                    const color1 = types[infoPokemonGeneral.types[0].type.name]
                    setColor1(color1)
                }
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
            }
        }

        buscadorPokemon // Contiene la data de la peticion fetch del buscador de Pokemons
            ? dataPokemonSearch()
            : dataPokemonUnico()

        return () => {
        }
    }, [buscadorPokemon])

    useEffect(() => {
        if (equipoS.length !== 0) {
            for (let index = 0; index < equipoS.length; index++) {
                const element = equipoS[index];
                if (element.data[0].name === first.name) {
                    setColorHearth(true)
                    return
                } else {
                    setColorHearth(false)
                }
            }
        } else setColorHearth(false)
    }, [equipoS, focusPokemonControll])



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
                                    agregarFavoritos()
                                    e.stopPropagation()
                                }}
                                style={{ fill: colorHearth ? "red" : "#c5d0f9" }}
                                className='svg-Fav'
                            />
                            <img src={first.sprites.front_default} alt="" />
                            <h3 style={
                                color2 ? {
                                    backgroundImage: `linear-gradient(to top right, ${color1}, ${color2})`,
                                    WebkitBackgroundClip: "text",
                                    color: "transparent"
                                }
                                    : {
                                        color: `${color1}`
                                    }
                            }>{first.name}</h3>
                            <section className='pokemon-Types'>
                                {
                                    color1 || color2
                                        ? first.types.map((el, key) => {
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

export default PokemonComponent