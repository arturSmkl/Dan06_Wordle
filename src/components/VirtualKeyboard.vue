<script setup>
const emit = defineEmits(['key-press'])

const props = defineProps({
  keyStates: Object
})


const row0 = ['Ě', 'Š', 'Č', 'Ř', 'Ž', 'Ý', 'Á', 'Í', 'É', 'Ů']
const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const row3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

function emitKey(key) {
  emit('key-press', key)
}

function getKeyColor(key) {
  const status = props.keyStates?.[key.toUpperCase()]
  if (status === 'correctPos') return 'green-darken-3'
  if (status === 'correctLet') return 'amber-darken-4'
  if (status === 'wrong') return 'grey-darken-4'
  return 'grey-darken-3'
}

</script>

<template>
  <v-container class="pa-2 mt-4 d-flex flex-column align-center">
    <!-- Top row: Czech letters -->
    <div class="d-flex justify-center mb-2">
      <v-btn
          v-for="key in row0"
          :key="key"
          class="mx-1 font-weight-bold"
          :color="getKeyColor(key)"
          elevation="1"
          @click="emitKey(key)"
      >
        {{ key }}
      </v-btn>
    </div>

    <!-- QWERTY rows -->
    <div class="d-flex justify-center mb-2">
      <v-btn
          v-for="key in row1"
          :key="key"
          class="mx-1 font-weight-bold"
          :color="getKeyColor(key)"
          elevation="1"
          @click="emitKey(key)"
      >
        {{ key }}
      </v-btn>
    </div>

    <div class="d-flex justify-center mb-2">
      <v-btn
          v-for="key in row2"
          :key="key"
          class="mx-1 font-weight-bold"
          :color="getKeyColor(key)"
          elevation="1"
          @click="emitKey(key)"
      >
        {{ key }}
      </v-btn>

      <!-- Enter button now part of this row -->
      <v-btn class="mx-1" color="primary" @click="emitKey('Enter')">
        Submit
      </v-btn>
    </div>

    <div class="d-flex justify-center">
      <v-btn
          v-for="key in row3"
          :key="key"
          class="mx-1 font-weight-bold"
          :color="getKeyColor(key)"
          elevation="1"
          @click="emitKey(key)"
      >
        {{ key }}
      </v-btn>

      <!-- Backspace button after 'M' -->
      <v-btn class="mx-1" color="error" @click="emitKey('Backspace')">
        ⌫
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>

</style>
