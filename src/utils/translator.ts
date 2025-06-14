interface Translations {
  [key: string]: { [lang: string]: string; };
}

// Translation table with normalized keys
let translationTable: Translations = {
  "they are also very reasonably priced considering they are all harvested with the greatest care": {
    "sv": "de är också mycket rimligt prissatta med tanke på att de alla skördas med största omsorg",
    "no": "de er også meget rimelig priset tatt i betraktning at de alle høstes med største omhu"
  },
  "our products are fantastic organic and fresh": {
    "sv": "våra produkter är fantastiska ekologiska och färska",
    "no": "våre produkter er fantastiske økologiske og ferske"
  },
  "product name": { "sv": "produktnamn", "no": "produktnavn" },
  "price low to high": { "sv": "pris lågt till högt", "no": "pris lav til høy" },
  "price high to low": { "sv": "pris högt till lågt", "no": "pris høy til lav" },
  "canned food": { "sv": "konserver", "no": "hermetikk" },
  "color images": { "sv": "färgbilder", "no": "fargebilder" },
  "our products": { "sv": "våra produkter", "no": "våre produkter" },
  "green olives": { "sv": "gröna oliver", "no": "grønne oliven" },
  "basmati rice": { "sv": "basmatireis", "no": "basmatireis" },
  "bay leaves": { "sv": "lagerblad", "no": "laurbærblad" },
  "bread rice": { "sv": "bröd ris", "no": "brød ris" },
  "our vision": { "sv": "vår vision", "no": "vår visjon" },
  "more info": { "sv": "mer info", "no": "mer info" },
  "vegetables": { "sv": "grönsaker", "no": "grønnsaker" },
  "artichoke": { "sv": "kronärtskocka", "no": "artisjokk" },
  "tomatoes": { "sv": "tomater", "no": "tomater" },
  "quantity": { "sv": "kvantitet", "no": "mengde" },
  "products": { "sv": "produkter", "no": "produkter" },
  "about us": { "sv": "om oss", "no": "om oss" },
  "category": { "sv": "kategori", "no": "kategori" },
  "gherkins": { "sv": "cornichoner", "no": "sylteagurk" },
  "rosemary": { "sv": "rosmarin", "no": "rosmarin" },
  "parsley": { "sv": "persilja", "no": "persille" },
  "sort by": { "sv": "sortera efter", "no": "sorter etter" },
  "spices": { "sv": "kryddor", "no": "krydder" },
  "images": { "sv": "bilder", "no": "bilder" },
  "bundle": { "sv": "knippe", "no": "bunt" },
  "canned": { "sv": "konserverad", "no": "hermetisert" },
  "large": { "sv": "stor", "no": "stor" },
  "price": { "sv": "pris", "no": "pris" },
  "buy": { "sv": "köp", "no": "kjøp" },
  "all": { "sv": "alla", "no": "alle" },
  "can": { "sv": "burk", "no": "boks" },
  "qty": { "sv": "antal", "no": "antall" },
  "pot": { "sv": "kruka", "no": "potte" }
};

interface TranslationEntry {
  original: string;
  regex: RegExp;
  translations: { [lang: string]: string; };
  length: number;
}

let translationEntries: TranslationEntry[] = [];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\d+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function initializeTranslationEntries(): void {
  translationEntries = Object.keys(translationTable).map(key => {
    const words = key.split(' ');
    const pattern = words.map(word =>
      word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    ).join('\\s*[\\W\\d]*\\s*');

    return {
      original: key,
      regex: new RegExp(pattern, 'gi'),
      translations: translationTable[key],
      length: normalize(key).length
    };
  });

  translationEntries.sort((a, b) => b.length - a.length);
}

function translatePhrase(text: string, targetLang: string): string {
  let result = text;

  for (const entry of translationEntries) {
    if (!entry.translations[targetLang]) continue;

    entry.regex.lastIndex = 0;

    result = result.replace(entry.regex, (match) => {
      const isCapitalized = /^[A-Z]/.test(match);
      const isAllCaps = match.toUpperCase() === match && /[A-Z]/.test(match);

      let translation = entry.translations[targetLang];

      if (isAllCaps) {
        translation = translation.toUpperCase();
      } else if (isCapitalized) {
        translation = translation.charAt(0).toUpperCase() + translation.slice(1);
      }

      return translation;
    });
  }

  return result;
}

// Initialize on load
initializeTranslationEntries();

const baseLang = 'en';
const priceRegex = /^[\$€£¥₹₽]/;
const translationMap = new WeakMap<Text, { [lang: string]: string; }>();

export function translate(to = 'sv', getMissingEntries = false) {
  const missingEntries: string[] = [];

  document.body.normalize();
  fixSelects();

  const textNodes = getTextNodes()
    .filter(x => x.textContent?.trim())
    .filter(x => !priceRegex.test(x.textContent || ''));

  textNodes.forEach(el => translationMap.get(el)
    || translationMap.set(el, { [baseLang]: el.textContent || '' }));

  textNodes.forEach(el => {
    const state = translationMap.get(el)!;
    if (!state[to]) {
      const originalText = state[baseLang];
      const phraseTranslation = translatePhrase(originalText, to);

      if (phraseTranslation !== originalText) {
        state[to] = phraseTranslation;
      } else {
        const exactTranslation = translationTable[originalText]?.[to];
        if (exactTranslation) {
          state[to] = exactTranslation;
        }
      }
    }

    if (getMissingEntries) {
      if (!state[to]) {
        missingEntries.push(state[baseLang]);
      }
    } else {
      if (state[to]) {
        el.textContent = state[to];
      }
    }
  });

  return getMissingEntries ? missingEntries : true;
}

function fixSelects() {
  [...document.querySelectorAll('select')].forEach(select => {
    [...select.querySelectorAll('option')].forEach(option =>
      option.hasAttribute('value')
      || option.setAttribute('value', option.textContent?.trim() || '')
    );
  });
}

function getTextNodes(el: Element = document.body) {
  const children: Text[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    children.push(walker.currentNode as Text);
  }
  return children;
}