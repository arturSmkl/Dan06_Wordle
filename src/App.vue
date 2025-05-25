<script setup>
import LengthSelection from "@/components/LengthSelection.vue";
import {ref} from "vue";
import GameComponent from "@/components/GameComponent.vue";

const playing = ref(false)
const desiredWordLength = ref(0)

function startGame(wordLength) {
  console.log(wordLength)
  desiredWordLength.value = wordLength;
  playing.value = true
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
    <GameComponent v-if="playing" :word-length="desiredWordLength" />
  </v-app>
</template>

<style scoped>

</style>
