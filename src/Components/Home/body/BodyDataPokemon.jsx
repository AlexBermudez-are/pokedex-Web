import { ReactComponent as Next } from '../../../Assets/Icons/navigate_next_black_24dp.svg'
import SpinnerPokeball from '../../Spinners/SpinnerPokeball'
import PokemonComponent from './PokemonComponent'
import FocusPokemon from './FocusPokemon'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import './BodyDataPokemon.css'
import React from 'react'
import axios from 'axios'

const initialState = {  // contiene la data del pokemon y su 'active' para cambiar el color del corazón de Favoritos
    data: {},
    active: false
}

const BodyDataPokemon = ({ controllData, buscadorPokemon, controllSearchPokemon }) => {

    const [focusPokemonControll, setFocusPokemonControll] = useState(initialState) // Contiene la data
    // ...del pokemon que se clickea en el home.

    const [dataPokemon, setDataPokemon] = useState([]) // guarda la data de las peticiones al cargar nuevos pokemons
    // 'nextBtn' y el 'useEffect'.

    const [limitControllPokemon, setLimitControllPokemon] = useState(20) // Controla el contador al cargar los siguientes
    // pokemons.

    const ContenedorPokemon = useRef()
    const InfoPokemon = useRef()

    const nextBtn = async () => { // Se ejecuta al clickear para cargar nuevos pokemons.
        const ApiRequest = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${limitControllPokemon}&limit=20`)
        const ApiData = await ApiRequest.data
        const ApiResults = await ApiData.results
        setDataPokemon([...dataPokemon, ...ApiResults]) // setea la data de la peticion
        ApiRequest ? setLimitControllPokemon(limitControllPokemon + 20) : console.log();
    }

    useEffect(() => {
        const data = async () => {
            const ApiRequest = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
            const ApiData = await ApiRequest.data
            const ApiResults = await ApiData.results
            setDataPokemon(ApiResults) // setea la data de la peticion
        }
        data()
    }, [])

    useEffect(() => {
        if (focusPokemonControll.active) {
            ContenedorPokemon.current.className = 'contenedor-De-Pokemons active'
            InfoPokemon.current.className = 'focus-Pokemon active'
        } else {
            ContenedorPokemon.current.className = 'contenedor-De-Pokemons'
            InfoPokemon.current.className = 'focus-Pokemon'
        }
        return () => {
        }
    }, [focusPokemonControll])


    return (
        <div className='dataPokemon'>
            {
                controllData // Evita que la pagina renderice sin respuesta de la api
                    ? <div className='container-Pokemon-Data-List'>
                        <section className='contenedor-De-Pokemons' ref={ContenedorPokemon}>
                            {
                                buscadorPokemon && controllSearchPokemon // Si se hizo una busqueda de un pokemon...
                                    // Este componente se ejecutará
                                    ? <div className='card-container-Pokemon-Search'>
                                        <PokemonComponent
                                            buscadorPokemon={buscadorPokemon}
                                            setFocusPokemonControll={setFocusPokemonControll}
                                            focusPokemonControll={focusPokemonControll.data}
                                        />
                                    </div>
                                    : dataPokemon.map((el, key) => {
                                        return <PokemonComponent
                                            data={el} key={key}
                                            setFocusPokemonControll={setFocusPokemonControll}
                                            focusPokemonControll={focusPokemonControll.data}
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
                    : <SpinnerPokeball />
            }
            {
                controllSearchPokemon
                    ? false
                    : <Next className='svgcito' onClick={nextBtn} />
            }
        </div>
    )
}

export default BodyDataPokemon