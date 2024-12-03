# Materiaalintunnistus & Hoito-ohjeet Sovellus

Next.js-pohjainen web-sovellus Nikarille, joka hyödyntää OpenAI:n Vision API:a huonekalujen materiaalien tunnistamiseen ja tarjoaa materiaaleihin perustuvat hoito-ohjeet.

## Ominaisuudet

- Materiaalien automaattinen tunnistus kuvista OpenAI:n Vision API:n avulla
- Yksityiskohtaiset hoito-ohjeet tunnistetuille materiaaleille
- Responsiivinen ja käyttäjäystävällinen käyttöliittymä
- Tehokas chat-käyttöliittymä materiaalien hoito-ohjeiden kysymiseen
- Basic-autentikaatio API-rajapinnoille (tällä hetkellä pois käytöstä)
- Monikielinen tuki (suomi, englanti)
- Mobiiliystävällinen suunnittelu

## Teknologiat

- [Next.js 14](https://nextjs.org/) - React framework
- [OpenAI API](https://openai.com/blog/openai-api) - Vision ja Chat toiminnallisuudet
- [TypeScript](https://www.typescriptlang.org/) - Tyyppiturvallinen JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Käyttöliittymän tyylit
- [Docker](https://www.docker.com/) - Kontitus


## Aloitus

1. Kloonaa repositorio:
```bash
git clone [https://github.com/laguagu/nikari]
cd [nikari]
```

2. Asenna riippuvuudet:
```bash
npm install
```

3. Kopioi `.env.example` tiedosto nimellä `.env.local`:
```bash
cp .env.example .env.local
```

Tiedoston sisältö:
```
OPENAI_API_KEY=""

# Autentikointi ei ole käytössä koska middleware on pois käytöstä "_" prefix merkillä 
# Basic auth kovakoodattu username,password katso middleware.ts
BASIC_AUTH_USER=testuser
BASIC_AUTH_PASSWORD="testpassword"
```

4. Käynnistä kehityspalvelin:
```bash
npm run dev
```

Sovellus on nyt käytettävissä osoitteessa `http://localhost:3000`

## API-dokumentaatio

### Vision API

**POST /api/visio**
- Endpoint huonekalujen materiaalien tunnistukseen kuvista OpenAI:n Vision API:n avulla
- Request body:
```json
{
  "image_url": "string"
}
```
- Response:
```json
{
  "index": 0,
  "message": {
    "role": "assistant",
    "content": {
      "wood": boolean,
      "leather": boolean,
      "metal": boolean,
      "laminate": boolean,
      "plastic": boolean,
      "fabric": boolean
    }
  },
  "finish_reason": "stop"
}
```

- Error Response (400):
```json
{
  "message": "Cant find image in req.body",
  "status": 400
}
```

- Error Response (500):
```json
{
  "message": "Internal server error",
  "status": 500
}
```

API käyttää OpenAI:n GPT-4 Vision -mallia analysoinnissa ja palauttaa JSON-muotoisen vastauksen, joka kertoo mitä materiaaleja kuvassa on havaittu.

## Käyttöönotto

### Docker-käyttöönotto

1. Rakenna Docker-image:
```bash
docker build -t nikari-app .
```

2. Käynnistä kontti:
```bash
docker run -p 3000:3000 --env-file .env.local nikari-app
```

### Rahti-käyttöönotto

1. Kirjaudu Rahti-rekisteriin:
```bash
docker login -u g -p $(oc whoami -t) image-registry.apps.2.rahti.csc.fi
```

2. Tägää ja työnnä image:
```bash
docker tag nikari-app image-registry.apps.2.rahti.csc.fi/alyakokeilut/nikari:latest
docker push image-registry.apps.2.rahti.csc.fi/alyakokeilut/nikari:latest
```

3. Tarkista imagestream:
```bash
oc get imagestream nikari
```

## Testaus

Sovellus käyttää Jest-testikehystä yksikkö- ja integraatiotesteihin:

```bash
# Aja kaikki testit
npm test

# Aja testit watch-tilassa
npm run test:watch

# Aja testikattavuusraportti
npm run test:coverage
```

## Lisenssi

Tämä projekti on lisensoitu [MIT-lisenssin](LICENSE) alaisuudessa.

## Yhteystiedot ja Tuki

Ongelmatilanteissa tai kysymyksissä ota yhteyttä:
- Sähköposti: [yhteystiedot]
- Issue Tracker: [GitHub Issues -linkki]