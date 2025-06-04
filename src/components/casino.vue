<template>
    <div class="container">
        <div v-if="mostrarMensaje" class="mensaje" :class="mensajeColor">
            <h1 v-if="puntaje >= 10">Puntaje: {{ puntaje }}</h1>
            <h2 v-if="puntaje >= 10">Felicitaciones has ganado un premio de $10.000,00</h2>
            <h1 v-else>Has utilizado tus 5 intentos</h1>
            <h2 v-if="puntaje >= 0">El juego ha terminado, inténtalo nuevamente</h2>
        </div>

        <div class="puntaje">
            <h1>Puntaje: {{ puntaje }}</h1>
            <h1>Intento: {{ intento }}</h1>
        </div>
        <div class="imagenes">
            <img v-for="(pokemon, index) in pokemones" :key="index" :src="pokemon.imagen" alt="pokemon.nombre">

        </div>
        <button @click="intento < 5 ? jugar() : reiniciarJuego()">
            {{ intento < 5 ? 'Jugar' : 'Jugar de nuevo' }} </button>

    </div>
</template>

<script>
import { consumirPokemonFachada } from "@/clients/pokemon";
export default {

    data() {
        return {
            pokemones: [
                { nombre: "XXXXX", imagen: "https://dummyimage.com/sqrpop" },
                { nombre: "XXXXX", imagen: "https://dummyimage.com/sqrpop" },
                { nombre: "XXXXX", imagen: "https://dummyimage.com/sqrpop" }
            ],
            puntaje: 0,
            intento: 0
        };
    },
    computed: {
        mostrarMensaje() {
            return  this.intento >= 5;
        },
        mensajeColor() {
            return this.puntaje >= 10 ? "azul" : "rojo";
        },
    },
    methods: {
        async jugar() {
            if (this.intento >= 5) return;
            this.intento++;

            const nuevosPokemones = [];
            const ids = [];

            for (let i = 0; i < 3; i++) {
                const id = Math.floor(Math.random() * 151) + 1;

                try {
                    const data = await consumirPokemonFachada(id);
                    ids.push(id);
                    nuevosPokemones.push({
                        nombre: data.name,
                        imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
                    });
                } catch (error) {
                    console.error("Error al obtener Pokémon:", error);
                }
            }
            const conteo = {};
            ids.forEach(id => conteo[id] = (conteo[id] || 0) + 1);




            const repeticiones = Object.values(conteo);
            if (repeticiones.includes(3)) {
                this.puntaje += 5;
            } else if (repeticiones.includes(2)) {
                this.puntaje += 2;
            }


            this.pokemones = nuevosPokemones;
        },
        reiniciarJuego() {
            this.puntaje = 0;
            this.intento = 0;
            this.pokemones = [];
        }
    }

}
</script>


<style>
img {
    margin-left: 50px;

    height: 250px;
    width: 250px;
}

.imagenes {
    display: flex;
    justify-content: center;
}

.texto {
    display: flex;
    justify-content: center;
}

.puntaje {
    display: flex;
    justify-content: center;
}

p {
    margin: 50px 125px;
}

h1 {
    margin: 30px 50px;
}

button {
    padding: 10px 30px;
    font-size: 30px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-top: 30px;
}

button:hover {
    background: rgb(165, 189, 159);
}

button:active {

    background: rgb(137, 209, 119);
}

.rojo {
  color: red;
}
.azul {
  color: blue;
}
</style>