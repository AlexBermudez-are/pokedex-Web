import React from 'react'
import Footer from '../Components/Footer/Footer'
import GroupPokemonBody from '../Components/GroupPokemons/GroupPokemonBody'
import Header from '../Components/Home/Header/Header'

const GroupPokemon = () => {
    return (
        <div>
            <Header />
            <GroupPokemonBody />
            <section className='footer-Group'>
                <Footer />
            </section>
        </div>
    )
}

export default GroupPokemon