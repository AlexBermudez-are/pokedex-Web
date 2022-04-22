import { useState } from "react";
import { createContext } from "react";

let contador = 0

const FavoritePokemon = createContext();
const FavoritePokemonProvider = ({ children }) => {

    const [equipoS, setequipoS] = useState([])
    const arregloF = []

    const agregarPokemon = (pokemon) => {

        alert('Se agrego el personaje al grupo')

        arregloF.push(pokemon)
        setequipoS([...equipoS, ...arregloF])

    }

    const eliminarPokemon = (prop) => {

        let isDelete = window.confirm(
            `¿Estás seguro que lo quieres eliminar a ${prop.name}?`
        );

        if (isDelete && contador > 1) contador--

        if (isDelete) {
            let newData = equipoS.filter((el) => {
                return el.name !== prop.name
            });
            setequipoS(newData);
        }

    }

    const data = {
        agregarPokemon,
        eliminarPokemon,
        equipoS
    }
    return <FavoritePokemon.Provider value={data}>{children}</FavoritePokemon.Provider>
}

export { FavoritePokemonProvider };
export default FavoritePokemon