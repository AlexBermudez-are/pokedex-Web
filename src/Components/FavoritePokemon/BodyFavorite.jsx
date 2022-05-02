/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import FavoriteComponent from './FavoriteComponent';
import './BodyFavorite.css'
import { useRef } from 'react';
import { useState } from 'react';
import FocusPokemon from '../Home/body/FocusPokemon';
import { useEffect } from 'react';
import PokemonComponent from '../Home/body/PokemonComponent'
import SpinnerNoFavorites from '../Spinners/SpinnerNoFavorites';

const initialState = {
    data: {},
    active: false
}

const style = {
    margin: "",
    height: ""
}

const BodyFavorite = ({ equipoS, buscadorPokemon, controllSearchPokemon }) => {

    const [focusPokemonControll, setFocusPokemonControll] = useState(initialState) // Contiene la data
    // ...del pokemon que se clickea en el home.
    const [mQ, setmQ] = useState(style)

    const ContenedorPokemon = useRef()
    const InfoPokemon = useRef()

    useEffect(() => {

        window.scrollTo(0,0)
        
        if (equipoS.length > 0) {
            if (focusPokemonControll.active) {
                ContenedorPokemon.current.className = 'contenedor-De-Pokemons active'
                InfoPokemon.current.className = 'focus-Pokemon active'
            } else {
                ContenedorPokemon.current.className = 'contenedor-De-Pokemons'
                InfoPokemon.current.className = 'focus-Pokemon'
            }
        }
        return () => {
        }
    }, [focusPokemonControll])

    useEffect(() => {

        if (window.screen.availWidth <= 425 && window.screen.availWidth >= 376 && equipoS.length <= 2) {
            return setmQ({
                ...mQ,
                margin: "5% 0px 10% 0px",
                height: "480px"
            })
        } else setmQ({
            ...mQ,
            margin: "inerit",
            height: "inerit"
        })

        if (window.screen.availWidth === 768 && equipoS.length <= 2) {
            return setmQ({
                ...mQ,
                height: "550px"
            })
        } else setmQ({
            height: "inerit"
        })

        if (window.screen.availWidth === 1024 && equipoS.length <= 3) {
            return setmQ({
                ...mQ,
                height: "540px"
            })
        } else setmQ({
            height: "inerit"
        })

        if (window.screen.availWidth === 1440 && window.screen.availHeight === 705 && equipoS.length <= 3) {
            return setmQ({
                ...mQ,
                height: "570px"
            })
        } else setmQ({
            height: "inerit"
        })

        if (window.screen.availWidth === 1440 && equipoS.length <= 3) {
            return setmQ({
                ...mQ,
                height: "625px"
            })
        } else setmQ({
            height: "inerit"
        })
    }, [equipoS]) // Media Queries para el tamaño de los pokemons que ocupan poco espacio a lo ancho

    return (
        <div>{
            equipoS.length > 0
                ? <div style={{ height: mQ.height, margin: mQ.margin }} className='container-Padre'>
                    <section className='contenedor-De-Pokemons' ref={ContenedorPokemon}>
                        {
                            buscadorPokemon && controllSearchPokemon
                                ? <PokemonComponent
                                    buscadorPokemon={buscadorPokemon}
                                    setFocusPokemonControll={setFocusPokemonControll}
                                />
                                : equipoS.map((el, key) => {
                                    return <FavoriteComponent
                                        el={el} key={key}
                                        setFocusPokemonControll={setFocusPokemonControll}
                                    />
                                })
                        }
                    </section>
                    <section ref={InfoPokemon} className='focus-Pokemon'>
                        {
                            focusPokemonControll.active
                                ? <FocusPokemon
                                    focusPokemonControll={focusPokemonControll.data}
                                    setFocusPokemonControll={setFocusPokemonControll}
                                />
                                : false
                        }
                    </section>
                </div>
                : <SpinnerNoFavorites />
        }</div>
    )
}

export default BodyFavorite