export async function loadWordList(url = '/wordList.txt') {
    const response = await fetch(url)
    const text = await response.text()

    const words = text
        .split('\n')
        .map(line => line.split('/')[0].trim())  // keep only the word part
        .filter(word => word.length > 0 && /^[a-zA-Zá-žÁ-Žěščřžýáíéúůťňď]+$/.test(word)) // basic Czech filtering

    const wordSet = new Set(words);
    const uppercaseSet = new Set(
        Array.from(wordSet).map(word => word.toUpperCase())
    )
    return uppercaseSet;
}

export function getRandomWordByLength(wordSet, length) {
    const wordArray = Array.from(wordSet) // Convert Set to Array
    const filtered = wordArray.filter(w => w.length === length)
    if (filtered.length === 0) return null
    return filtered[Math.floor(Math.random() * filtered.length)]
}

export function isValidWord(wordSet, guess) {
    return wordSet.has(guess.toUpperCase())
}
