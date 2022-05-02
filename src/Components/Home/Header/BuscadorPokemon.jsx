import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { ReactComponent as LupaSvg } from '../../../Assets/Icons/search_black_24dp.svg'
import './BuscadorPokemon.css'

const initialState = {
  search: ""
}

const BuscadorPokemon = ({ setBuscadorPokemon, setControllSearchPokemon }) => {

  const [textoBusqueda, setTextoBusqueda] = useState(initialState);

  const submit = async () => {
    const minusculasSearch = textoBusqueda.search.toLocaleLowerCase()
    if (textoBusqueda.search.length > 0) {
      const url = `https://pokeapi.co/api/v2/pokemon/${minusculasSearch}`
      const getPokemonSearch = await axios.get(url)
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert(`Error: ${error.response.status}, intenta ingresar el nombre completo y verifica que sea correcto`)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            alert("Esta tardando demasiado, intentalo despues")
          } 
        });
      const getDataPokemonSearch = await getPokemonSearch.data
      setBuscadorPokemon(getDataPokemonSearch)
      setControllSearchPokemon(true)
    } else return false
  }

  const inputTextoBusquedaPokemon = (e) => {
    setTextoBusqueda({
      ...textoBusqueda,
      [e.target.name]: e.target.value
    })
    setControllSearchPokemon(false)
  }


  return (
    <div className='contenedorBuscadorPokemon' onKeyUp={(e) => {
      if (e.key === 'Enter') submit()
    }}>
      <input
        autoComplete='off'
        className='inputBusquedaPokemon'
        onChange={(e) => { inputTextoBusquedaPokemon(e) }} type="search" name="search" id="search" />
      <button
        className='btnSubmitBusquedaPokemon'
        onClick={submit}>
        <LupaSvg />
      </button>
    </div>
  )
}

export default BuscadorPokemon