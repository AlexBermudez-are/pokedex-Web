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

const BodyFavorite = ({ equipoS, buscadorPokemon, controllSearchPokemon }) => {

    const [focusPokemonControll, setFocusPokemonControll] = useState(initialState) // Contiene la data
    // ...del pokemon que se clickea en el home.

    const ContenedorPokemon = useRef()
    const InfoPokemon = useRef()

    useEffect(() => {
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

    return (
        <div>{
            equipoS.length > 0
                ? <div style={{ display: "flex", overflow: "hidden" }}>
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