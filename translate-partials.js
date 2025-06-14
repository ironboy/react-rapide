const translationTable = {
  'there are many': { sv: 'det finns många' },
  'hello there': { sv: 'hej på dig' },
  'small worlds': { sv: 'små världar' },
  'islands are surrounded by water': { sv: 'öar är omgärdade av vatten' },
  'there are those that say': { sv: 'det finns de som säger' }
};

function translate(lang, phrases) {
  // Helper function to normalize text (remove punctuation, digits, extra spaces, lowercase)
  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
      .replace(/\d+/g, ' ')     // Replace digits with spaces
      .replace(/\s+/g, ' ')     // Collapse multiple spaces
      .trim();
  }

  // Create normalized lookup table with pre-compiled regexes
  const translationEntries = Object.keys(translationTable).map(key => {
    const normalized = normalize(key);
    const words = key.split(' ');
    const pattern = words.map(word =>
      word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    ).join('\\s*[\\W\\d]*\\s*');

    return {
      key: normalized,
      original: key,
      regex: new RegExp(pattern, 'gi'),
      translation: translationTable[key][lang],
      length: normalized.length
    };
  });

  // Sort by length (longest first) for greedy matching
  translationEntries.sort((a, b) => b.length - a.length);

  return phrases.map(phrase => {
    let result = phrase;

    // Single pass through sorted entries
    for (const entry of translationEntries) {
      // Reset regex lastIndex for each phrase
      entry.regex.lastIndex = 0;

      // Replace all matches for this entry
      result = result.replace(entry.regex, (match) => {
        // Apply casing logic
        const isCapitalized = /^[A-Z]/.test(match);
        const isAllCaps = match.toUpperCase() === match && /[A-Z]/.test(match);

        let translation = entry.translation;

        if (isAllCaps) {
          translation = translation.toUpperCase();
        } else if (isCapitalized) {
          translation = translation.charAt(0).toUpperCase() + translation.slice(1);
        }

        return translation;
      });
    }

    return result;
  });
}

// Test the function
const toTranslateTest = [
  'Hello there Thomas!',
  'There are many small worlds.',
  'There are many (1,050) small worlds.',
  'Hello there...',
  'Islands are surrounded by water?',
  'There are those that say islands are surrounded by water :)'
];

console.log('Original phrases:');
toTranslateTest.forEach((phrase, i) => console.log(`${i + 1}. ${phrase}`));

console.log('\nTranslated phrases:');
const translated = translate('sv', toTranslateTest);
translated.forEach((phrase, i) => console.log(`${i + 1}. ${phrase}`));

// Expected output:
// 1. Hej på dig Thomas!
// 2. Det finns många små världar.
// 3. Det finns många (1,050) små världar.
// 4. Hej på dig...
// 5. Öar är omgärdade av vatten?
// 6. Det finns de som säger öar är omgärdade av vatten :)