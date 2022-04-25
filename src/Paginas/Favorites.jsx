/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import BodyFavorite from '../Components/FavoritePokemon/BodyFavorite'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Home/Header/Header'
import FavoritePokemon from '../Context/FavoritePokemon'

const Favorites = () => {

    const { equipoS } = useContext(FavoritePokemon)

    const [controllSearchPokemon, setControllSearchPokemon] = useState(false)
    const [buscadorPokemon, setBuscadorPokemon] = useState()
    const [controllData, setControllData] = useState(true)


    return (
        <div>
            <Header
                buscadorPokemon={buscadorPokemon}
                setBuscadorPokemon={setBuscadorPokemon}
                controllSearchPokemon={controllSearchPokemon}
                setControllSearchPokemon={setControllSearchPokemon} />
            <BodyFavorite
                equipoS={equipoS}
                controllData={controllData}
                buscadorPokemon={buscadorPokemon}
                setBuscadorPokemon={setBuscadorPokemon}
                controllSearchPokemon={controllSearchPokemon}
                setControllSearchPokemon={setControllSearchPokemon} />
            <section className='footer-Fav'>
                <Footer />
            </section>
        </div>
    )
}

export default Favorites