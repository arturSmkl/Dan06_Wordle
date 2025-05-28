<script setup>
import LengthSelection from "@/components/LengthSelection.vue";
import {ref} from "vue";
import GameComponent from "@/components/GameComponent.vue";

const playing = ref(false) // to track if the game is in progress
const desiredWordLength = ref(0)

function startGame(wordLength) {
  desiredWordLength.value = wordLength;
  playing.value = true
}

function newGame() {
  playing.value = false;
}

</script>

<template>
  <v-app>
    <v-container class="text-center">
      <!-- Heading -->
      <v-row>
        <v-col>
          <h1 class="text-h2 font-weight-bold">Wordle</h1>
        </v-col>
      </v-row>
    </v-container>
    <LengthSelection v-if="!playing" @update-word-length="startGame" />
    <GameComponent v-if="playing" @new-game="newGame" :word-length="desiredWordLength" />
  </v-app>
</template>

<style scoped>

</style>
