<script setup>
import {nextTick, onMounted, ref} from "vue";
import {loadWordList, getRandomWordByLength, isValidWord} from '/src/utils/wordLoader.js'
import {green, amber} from "vuetify/util/colors";
import VirtualKeyboard from "@/components/VirtualKeyboard.vue";
import GameResult from "@/components/GameResult.vue";

const props = defineProps({
  wordLength: Number,
})

const keyboardInput = ref(null) // hidden input to capture keyboard events

// 2d array to store inputted letters
const grid = ref(Array.from({ length: 6 }, () => Array(props.wordLength).fill('')))

// 2d array to store booleans for styling for each letter box
const gridStyle = ref(
    Array.from({ length: 6 }, () =>
        Array.from({ length: props.wordLength }, () => ({ selected: false, correctPos: false, correctLet: false }))
    )
)
const currentRow = ref(0)
const currentCol = ref(0)

const selectedWord = ref("")
const allWords = ref(new Set) // to store all words loaded from the word list

const keyStates = ref({})  // for the virtual keyboard {'correctPos' | 'correctLet' | 'wrong' }

const gameFinished = ref(false)
const success = ref(false) // to track if the game was won

// Function to set the selected state for the current letter box
function setGridStyleSelected() {
  for (let i = 0; i < grid.value.length; i++) {
    for (let j = 0; j < grid.value[i].length; j++) {
      gridStyle.value[i][j].selected = (currentRow.value === i && currentCol.value === j)
    }
  }
}

function handleKey(e) {
  if (gameFinished.value) {
    return;
  }

  // e could either be a KeyboardEvent or a string from the virtual keyboard
  if (typeof(e) === 'object'){
    e = e.key;
  }

  if (e.length === 1 && e.match(/^[a-zA-Zá-žÁ-Žěščřžýáíéúůťňď]+$/) && currentCol.value < props.wordLength) {
    grid.value[currentRow.value][currentCol.value] = e.toUpperCase()
    currentCol.value++
  } else if (e === 'Backspace' && currentCol.value > 0) {
    currentCol.value--
    grid.value[currentRow.value][currentCol.value] = ''
  } else if (e === 'Enter' && currentCol.value === props.wordLength) {
    submitWord()
  }

  setGridStyleSelected();
}

function submitWord() {
  if (!isValidWord(allWords.value, grid.value[currentRow.value].join(''))) {
    alert('Not a valid word');
    return
  }

  for (const [i, letter] of grid.value[currentRow.value].entries()) {
    const key = letter.toUpperCase()
    const correct = selectedWord.value[i] === key
    const exists = selectedWord.value.includes(key)

    if (correct) {
      gridStyle.value[currentRow.value][i].correctPos = true
      keyStates.value[key] = 'correctPos'
    } else if (exists) {
      gridStyle.value[currentRow.value][i].correctLet = true
      if (keyStates.value[key] !== 'correctPos') {
        keyStates.value[key] = 'correctLet'
      }
    } else {
      if (!keyStates.value[key]) {
        keyStates.value[key] = 'wrong'
      }
    }
  }

  if (grid.value[currentRow.value].join('') === selectedWord.value) {
    success.value = true;
    gameFinished.value = true;
    return;
  }

  if (currentRow.value < 5) {
    currentRow.value++;
    currentCol.value = 0;
  }
  else {
    gameFinished.value = true;
  }
}
// Focus the hidden input to capture keyboard events
function focus() {
  keyboardInput.value?.focus()
}

const emit = defineEmits(['new-game'])

function newGame() {
  emit('new-game')
}

onMounted(async () => {
  allWords.value = await loadWordList();
  selectedWord.value = getRandomWordByLength(allWords.value, props.wordLength).toUpperCase();
  console.log('Chosen word:', selectedWord.value)
  await nextTick(() => {
    focus();
  })
  setGridStyleSelected();
})
</script>

<template>
  <input
      ref="keyboardInput"
      type="text"
      @keydown="handleKey"
      class="hidden-input"
  />
  <v-container class="pa-4" style="max-width: 400px" @click="focus" >
    <v-row
        v-for="row in 6"
        :key="row"
        class="justify-center"
    >
      <v-col
          v-for="col in props.wordLength"
          :key="col"
          cols="2"
          class="d-flex align-center justify-center pa-1"
      >
        <div class="d-flex align-center justify-center letter-box"
             :class="{ selected: gridStyle[row - 1][col - 1].selected,
              'bg-green-darken-3 no-border': gridStyle[row - 1][col - 1].correctPos,
               'bg-amber-darken-4 no-border': gridStyle[row - 1][col - 1].correctLet
              }"
        >
          {{ grid[row - 1][col - 1] }}
        </div>
      </v-col>
    </v-row>
  </v-container>
  <GameResult v-if=gameFinished @new-game="newGame" :guesses=currentRow :result=success :correct-word=selectedWord />
  <VirtualKeyboard v-else @key-press="handleKey" :keyStates="keyStates" />

</template>

<style scoped>

.hidden-input {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}

.letter-box {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: transparent;
  border: 2px solid #979797;
  border-radius: 8px;
  font-size: 30px;
  line-height: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.1s ease;
}

.selected {
  border: 3px solid #ececec;
}

.no-border {
  border: none;
}

</style>