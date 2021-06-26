const sentence = "The quick brown fox jumps over a lazy dog."

const counts = {}

for (const letter of sentence.toLowerCase()) {
  if (letter in counts) {
    counts[letter] += 1
  } else {
    counts[letter] = 1
  }
}

const summary = {
  sentence: sentence,
  counts: { ...counts },
}

console.log(summary)
