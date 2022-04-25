import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import BodyDataPokemon from '../Components/Home/body/BodyDataPokemon'
import logoPokemon from '../Assets/Img/pokemonLogo.png'
import Header from '../Components/Home/Header/Header'
import './Home.css'
import { useEffect } from 'react'
import Footer from '../Components/Footer/Footer'

const Home = () => {

    const [controllSearchPokemon, setControllSearchPokemon] = useState(false)
    const [buscadorPokemon, setBuscadorPokemon] = useState()
    const [btn, setbtn] = useState("white") // cambia el color del btn de la pokebola al entrar a la pagina
    const [controllData, setControllData] = useState(false) // controla la data del panel incial de la pagina home 
    //  de los pokemons, que muestra los componentes con su data unica


    const redPokeball = useRef() // cambia las clases de la mitad de la pokebola roja para iniciar la animacion (arriba)
    const whitePokeball = useRef() // cambia las clases de la mitad de la pokebola blanca para iniciar la animacion (abajo)

    function btnPokeball() {
        setbtn("#e35478")
        redPokeball.current.className = "contenido-Pokeball-Red active"
        whitePokeball.current.className = "contenido-Pokeball-White active"
        setTimeout(() => {
            setControllData(true)
            setbtn("white")
            localStorage.setItem("controllData", true)
        }, 2000);
    }

    useEffect(() => {
        const dataLocalStorage = localStorage.getItem("controllData")
        if (dataLocalStorage) setControllData(true)
    }, [])

    window.addEventListener("beforeunload", e => {
        localStorage.removeItem("controllData")
    })


    return (
        <div>

            {
                controllData
                    ? <section style={{ zIndex: "998" }}>
                        <Header
                            buscadorPokemon={buscadorPokemon}
                            setBuscadorPokemon={setBuscadorPokemon}
                            controllSearchPokemon={controllSearchPokemon}
                            setControllSearchPokemon={setControllSearchPokemon}
                        />
                        <BodyDataPokemon
                            controllData={controllData}
                            buscadorPokemon={buscadorPokemon}
                            setBuscadorPokemon={setBuscadorPokemon}
                            controllSearchPokemon={controllSearchPokemon}
                            setControllSearchPokemon={setControllSearchPokemon}
                        />
                        <Footer />
                    </section>
                    : <section style={{ display: "flex", flexDirection: "column", overflow: "hidden", zIndex: "999" }}>
                        <div className='contenido-Pokeball-Red' ref={redPokeball}>
                            <img className='img-Logo-Pokeball' src={logoPokemon} alt="logo-Pokemón" />
                            <button onClick={btnPokeball} style={{ backgroundColor: btn }} className='btn-Pokeball-Inicial'></button>
                        </div>
                        <div className="contenido-Pokeball-White" ref={whitePokeball}></div>
                    </section>
            }
        </div>
    )
}

export default Home