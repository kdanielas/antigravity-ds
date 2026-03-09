import StyleDictionary from 'style-dictionary';
import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('./tokens.json', 'utf-8'));

// Función recursiva para renombrar '$value' a 'value'
function cleanTokens(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const newObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$value') {
      newObj['value'] = value;
    } else {
      newObj[key] = cleanTokens(value);
    }
  }
  return newObj;
}

const cleanedTokens = cleanTokens({
  ...rawData['Primitives/Primitives'],
  ...rawData['Semantic/Semantic']
});

StyleDictionary.registerTransform({
  name: 'name/path-as-kebab',
  type: 'name',
  transform: (token) => token.path.join('-')
});

const sd = new StyleDictionary({
  tokens: cleanedTokens,
  platforms: {
    css: {
      buildPath: 'app/',
      transforms: ['name/path-as-kebab', 'color/css'],
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    }
  }
});

await sd.buildAllPlatforms();
console.log('--- ¡Éxito! Archivo generado en /app ---');