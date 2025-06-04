import axios from "axios";

const consumirPokemon = async (idPokemon) => {
    const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`).then(rpt =>rpt.data);
    return respuesta;
}

export const consumirPokemonFachada = async(idPokemon) => {
    return await consumirPokemon(idPokemon);
};