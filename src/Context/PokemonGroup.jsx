import { useState } from "react";
import { createContext } from "react";

const powerStats = [{
    "hp": 0,
    "attack": 0,
    "defense": 0,
    "special-attack": 0,
    "special-defense": 0,
    "speed": 0
}]

const PokemonGroup = createContext()

const PokemonGroupProvider = ({ children }) => {

    const [pokemonGroup, setPokemonGroup] = useState([])
    const [statDominator, setstatDominator] = useState()
    const [Stats, setStats] = useState([])

    const agregarPersonaje = (personaje) => {

        const arregloF = []

        alert('Se agrego el personaje al grupo')

        powerStats[0].hp += personaje.stats[0]["base_stat"]
        powerStats[0].attack += personaje.stats[1]["base_stat"]
        powerStats[0].defense += personaje.stats[2]["base_stat"]
        powerStats[0]["special-attack"] += personaje.stats[3]["base_stat"]
        powerStats[0]["special-defense"] += personaje.stats[4]["base_stat"]
        powerStats[0].speed += personaje.stats[5]["base_stat"]

        arregloF.push(personaje)
        setPokemonGroup([...pokemonGroup, ...arregloF])
        setStats(powerStats)


        let StatDominating = powerStats[0].hp
        const powerArr = powerStats[0]

        for (const key in powerArr) {

            if (powerArr[key] >= StatDominating) {
                StatDominating = powerArr[key]
                setstatDominator(key)
            }

        }

    }

    const eliminarPokemon = (personaje) => {

        let isDelete = window.confirm(
            `¿Estás seguro que lo quieres eliminar a ${personaje.name}?`
        );

        if (isDelete) {
            let newData = pokemonGroup.filter((el) => {
                return el.name !== personaje.name
            });
            setPokemonGroup(newData);
        }

        powerStats[0].hp -= personaje.stats[0]["base_stat"]
        powerStats[0].attack -= personaje.stats[1]["base_stat"]
        powerStats[0].defense -= personaje.stats[2]["base_stat"]
        powerStats[0]["special-attack"] -= personaje.stats[3]["base_stat"]
        powerStats[0]["special-defense"] -= personaje.stats[4]["base_stat"]
        powerStats[0].speed -= personaje.stats[5]["base_stat"]

        setStats(powerStats)

        let StatDominating = powerStats[0].hp
        const powerArr = powerStats[0]

        for (const key in powerArr) {

            if (powerArr[key] >= StatDominating) {
                StatDominating = powerArr[key]
                setstatDominator(key)
            }

        }

    }

    const data = {
        agregarPersonaje,
        eliminarPokemon,
        statDominator,
        pokemonGroup,
        Stats,

    }

    return (<PokemonGroup.Provider value={data}>{children}</PokemonGroup.Provider>)
}

export { PokemonGroupProvider }
export default PokemonGroup