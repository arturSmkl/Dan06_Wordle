<script setup>
const props = defineProps({
  result: {
    type: Boolean,
    required: true
  },
  guesses: {
    type: Number,
    required: true
  },
  correctWord: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['new-game'])

function newGame() {
  emit('new-game')
}
</script>

<template>
  <v-container class="mt-6" style="max-width: 600px">
    <v-card class="pa-4" elevation="4">
      <v-row align="center">
        <v-col cols="12" sm="6" class="d-flex center justify-center">
          <v-img
              v-if="result"
              src="/src/assets/images/emoji-cool.png"
              alt="Card Image"
              aspect-ratio="1/1"
              cover
              class="rounded"
              style="max-width: 200px"
          ></v-img>
          <v-img
              v-else
              src="/src/assets/images/emoji-angry.png"
              alt="Card Image"
              aspect-ratio="1/1"
              cover
              class="rounded"
              style="max-width: 200px"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex center justify-center align-center flex-column text-center">
          <v-card-title v-if="result" class="text-h5">Congratulations!</v-card-title>
          <v-card-title v-else class="text-h5">Womp Womp</v-card-title>
          <v-card-text v-if="result">
            You've guessed the word in {{ guesses + 1 }} {{ guesses + 1 === 1 ? 'try' : 'tries' }}!
          </v-card-text>
          <v-card-text v-else>
            u stupid, the word was <strong>{{ correctWord }}</strong>!
          </v-card-text>
          <v-btn @click="newGame" color="primary" variant="tonal" prepend-icon="$prev" class="ma-4">New Game</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<style scoped>

</style>