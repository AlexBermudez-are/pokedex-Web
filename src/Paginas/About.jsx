import React from 'react'
import Header from '../Components/Home/Header/Header'
import photoPersonal from '../Assets/Img/fotoPerfil.jpg'
import './About.css'
import pokeballSupLeft from '../Assets/Img/pokeball.png'
import pokeballBottomLeft from '../Assets/Img/pokeball.png'
import pokeballBottomRight from '../Assets/Img/pokeball.png'
import pokeballSupRight from '../Assets/Img/pokeball.png'
import Footer from '../Components/Footer/Footer'

const About = () => {
  return (
    <div>
      <Header />
      <div className='container-About-Pokemon'>
        <img className='pokeball-Bottom-Right' src={pokeballBottomRight} alt="" />
        <img className='pokeball-Sup-Right' src={pokeballSupRight} alt="" />
        <img className='pokeball-Bottom-Left' src={pokeballBottomLeft} alt="" />
        <img className='pokeball-Sup-Left' src={pokeballSupLeft} alt="" />
        <section className="foto-Personal">
          <img src={photoPersonal} alt="photoPersonal" />
        </section>
        <section className="info-acerca-de-mi">
          <p>
            Hola Mundo!
            <br />
            Mi nombre es Alexis Bermúdez, tengo 23 años, soy Mexicano y actualmente vivo en Argentina.
            Desde hace un año inicie en el mundo del desarrollo web por mi propia cuenta y asi fuí adquiriendo experiencia y puliendo mis habilidades.
            <br />
            Me gusta dibujar, escuchar OST de Videojuegos ❤️ y aspiro a poder trabajar como desarrollador de videojuegos.
          </p>
        </section>
      </div>
      <section className='footer-About'>
        <Footer />
      </section>
    </div>
  )
}

export default About