<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['update-word-length'])

function sendWordLength(length) {
  emit('update-word-length', length)
}
</script>

<template>
  <v-container class="text-center">
    <!-- Subheading -->
    <v-row>
      <v-col>
        <h2 class="text-h4 text-grey-darken-1">Choose the length of the word</h2>
      </v-col>
    </v-row>

    <!-- Buttons -->
    <v-row justify="center" class="mt-4">
      <v-col cols="12" sm="4" md="3">
        <v-btn color="primary" block @click="sendWordLength(4)" >4 Letters</v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <v-btn color="primary" block @click="sendWordLength(5)" >5 Letters</v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <v-btn color="primary" block @click="sendWordLength(6)" >6 Letters</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>