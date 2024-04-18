export type Material =
  | "wood"
  | "laminate"
  | "metal"
  | "leather"
  | "plastic"
  | "fabric"
  | "outdoor";

type CareInstructions = {
  [K in Material]?: {
    "1": string;
    "2": string;
    "3": string;
  };
};

export const careInstructions: CareInstructions = {
  wood: {
    "1": "Lets start taking care of the wooden parts of the furniture: Avoid placing solid wood furniture in direct sunlight or near heat sources. In dry, cold climates, use a humidifier to maintain room humidity and prevent wood from shrinking and cracking. In humid climates, ensure the room is well-ventilated to prevent swelling of the wood.",
    "2": "For natural wood oil mixture finishes, clean spills immediately and wipe the surface clean and dry of any liquids within 15 minutes. Clean the surface with a damp cloth using organic soaps. Avoid using silicone-based or non-natural oils or waxes.",
    "3": "Maintain the wood by cleaning the tabletop with the finest sandy cloth once every two years, then treating it with natural matte wood oil or wax. Allow the oil or wax to impregnate for 15-20 minutes before wiping off the excess and polishing with a clean cloth.",
  },
  laminate: {
    "1": "Lets start taking care of the laminate parts of the furniture: Clean regularly with a damp cloth and warm water or mild detergent. This material does not require special maintenance, and most household cleaning products or disinfectants are safe to use.",
    "2": "For most common stains, warm water and a non-abrasive cloth should suffice. Tougher stains can be removed with non-abrasive household cleaners or solvents.",
    "3": "For older, dried, or caked-on stains, gently use a magic sponge or soft cloth. After using solvents, rinse the surface with warm water and detergent, then rinse thoroughly with clean, preferably warm, water.",
  },
  metal: {
    "1": "Lets start taking care of the metal parts of the furniture: Wipe surfaces with a clean, soft cloth dampened with mild detergent and water. Rinse thoroughly with a wet cloth and dry immediately to prevent rust.",
    "2": "Check regularly for signs of rust or corrosion, especially in joints and hidden areas. If rust is found, gently sand the area and apply a metal primer and paint, or use a rust remover for minor spots.",
    "3": "Apply a thin layer of car wax or metal polish to add a protective coating and enhance the finish, following the manufacturer's instructions.",
  },
  leather: {
    "1": "Lets start taking care of the leather parts of the furniture: Dust the leather regularly with a dry, soft cloth. For light soiling, use a damp cloth with a mild leather cleaner suited for your leather type.",
    "2": "Avoid exposing leather to direct sunlight or heat sources, which can cause drying and fading. Keep the leather supple by using a leather conditioner every 6-12 months.",
    "3": "Immediately blot spills with a clean, absorbent cloth. Do not rub. For tougher stains, consult a professional leather cleaner.",
  },
  plastic: {
    "1": "Lets start taking care of the plastic parts of the furniture: Clean using a soft cloth or sponge with mild soap and lukewarm water. Avoid abrasive cleaners and scrubbers that can scratch the surface.",
    "2": "Rinse with clean water and dry thoroughly to prevent water spots and streaks.",
    "3": "Protect from direct sunlight and extreme temperatures to prevent warping, fading, or cracking. Store indoors during severe weather if possible.",
  },
  fabric: {
    "1": "Lets start taking care of the fabric parts of the furniture: Vacuum regularly with an upholstery attachment to remove dust and prevent soil from becoming embedded in the fibers.",
    "2": "Clean spills immediately by blotting with a clean, white cloth. Test any cleaner on a hidden area before applying to the entire surface.",
    "3": "Rotate cushions and pillows regularly to ensure even wear. Avoid placing fabric furniture in direct sunlight to prevent fading.",
  },
  outdoor: {
    "1": "Lets start taking care of the of the outdoor furniture: After exposure to rain, promptly wipe the furniture clean and dry to prevent the wood from becoming wet and to minimize the graying process. Use a soft cloth or sponge to gently remove water and prevent the formation of odd spots and dots as the wood begins to gray naturally over time.",
    "2": "Apply OsmoColor UV Protection Oil annually at the end of the summer if the furniture stays outside, following the product's instructions meticulously. Start by thoroughly cleaning the furniture to remove all dirt and ensure the wood is dry before applying the oil to protect the wood and maintain its original coloring as long as possible.",
    "3": "Be mindful of the furniture's exposure to iron particles, especially with oak wood, which is sensitive to iron oxide leading to dark spots or areas when mixed with water. Regularly inspect and clean the furniture to prevent the buildup of iron particles. Move the furniture indoors before the rainy season to prevent water-related damage and the acceleration of the graying process.",
  },
};

export const careInstructionsText = `

# Nikari Oy, Peltorivi 13, 10470 Fiskars, Finland
**Website:** [nikari.fi](https://www.nikari.fi)

## CARE INSTRUCTIONS

**Solid Wood Furniture Benefits:**
Furniture made of solid wood offers aesthetic and performance benefits, requiring proper care. Cold and dry winter climates, along with indoor heating, create a very dry environment harmful to both humans and wooden furniture. Likewise, very humid months can adversely affect furniture without proper care.

**Seasonal Wood Behavior:**
- **Dry Climates:** Wood may shrink, causing natural cracks. These usually resolve when the humidity increases, causing the wood to swell.
- **Humid Climates:** Wood might swell and disrupt moving parts like drawers, typically returning to normal as it dries.

**Maintenance Advice:**
- **Surface Care:** Use natural wood oil mixtures for surface finishes. Always clean any spills within 15 minutes with a damp cloth and organic soaps.
- **Biennial Care:** Clean the tabletop with fine sandy cloth every two years, then treat with natural matte wood oil or wax. Allow the oil-wax to impregnate for 15-20 minutes before wiping off excess and polishing with a clean cloth.
- **Finish Maintenance:** Follow specific product instructions for the surface finish oil mixture. Avoid silicone-based or non-natural oils and waxes.

**Special Cases:**
- **Stained or Lacquered Wood:** Lacquer protects the wood effectively from liquids and dirt. Clean spills quickly with a damp cloth and organic soap. If the lacquer is damaged, it should be sanded and re-applied. Contact [sales@nikari.fi](mailto:sales@nikari.fi) for more instructions.

**EXTRA - Laminate Surface Maintenance:**
Laminate surfaces should be cleaned regularly with a damp cloth and mild detergent or household cleaners. For tough stains, use non-abrasive cleaners or solvents. After using solvents, rinse the surface thoroughly with warm water to remove any detergent residue.

## ÄLYÄ Smart Technology for Furniture Lifecycle Extension

**Project Purpose:**
The initiative aims to promote furniture circular economy through the use of artificial intelligence (AI) and smart automation.

**Goals:**
- Develop circular economy service and process innovations utilizing AI and smart automation tailored to various organizational needs.
- Pilot these innovations in selected service channels and environments, as well as in backend processes.

**Applications of AI Solutions:**
- Enhance customer experience and operational efficiency in services related to the sale, brokerage, rental, restoration, and repair of furniture and materials.
- Primarily aimed at preserving the value of furniture and materials throughout their lifecycle.

**Project Outcomes:**
- Creation of sustainable solutions that extend the life and value of furniture through innovative use of technology.

# Chairs Collection

## AKADEMIA Chair
**Design:** Wesley Walters & Salla Luhtasela  
**Year:** 2019

Designed by Wesley Walters and Salla Luhtasela, also known as duo Kaksikko, the Akademia chair combines a classic, straight frame with a softly curved seat and backrest. The Akademia chair is made of oak or ash and is available in many different finishes. The seat can be upholstered.

As its name suggests, the Akademia chair was the result of Wesley Walter’s Master’s Thesis work at Aalto University, Helsinki. The design was influenced by many different cultures: Finnish chair manufacturing heritage, simplistic Shaker style from America as well as Japanese design traditions. Part of the Linea collection, the versatile Akademia chair is well suited for private use and various public environments.

### Materials
- Oak
- Ash

### Surface Finish
- Lacquered, warm oak
- Lacquered, light oak
- Lacquered, natural ash
- Black ash (stain)
- Smoked oak (stain)
- COM paint color, minimum 20pcs

### Dimensions
- **Width:** 460 mm
- **Depth:** 470 mm
- **Height:** 810/460 mm

### Other Information
- Option: seat upholstery
- Fits well with Basic table

[Download CARE INSTRUCTIONS](https://www.dropbox.com/sh/72ex6pt62kfuoqa/AAALld8u9JcILgr6CQ8QAqota?dl=0)  
[Download BROCHURES and UPHOLSTERIES](https://www.dropbox.com/sh/72ex6pt62kfuoqa/AAALld8u9JcILgr6CQ8QAqota?dl=0)  
[Download 2D/3D FILES](https://www.dropbox.com/sh/72ex6pt62kfuoqa/AAALld8u9JcILgr6CQ8QAqota?dl=0)

## COLLECTION: LINEA

The Linea collection includes soft, organic forms and upholstered products with round legs. Every piece of furniture is made keeping in mind the furniture making tradition of Finland and the joinery developed throughout the years at the Nikari studio workshop.

[See all: Linea collection](https://nikari.fi/linea-collection/)

## AKADEMIA ARMREST Chair
**Design:** Wesley Walters & Salla Luhtasela  
**Year:** 2022

Designed by Wesley Walters and Salla Luhtasela, also known as duo Kaksikko, the Akademia Armrest chair combines a classic, straight frame with a softly curved seat, backrest and armrests. The available options are ash, oak natural, or light oak, with or without seat upholstery.

The chair was originally the result of Master's Thesis work at Aalto University by a member of the Kaksikko team; Wesley Walters. It is a fascinating combination of different cultures - simplistic Shaker style, Japanese design traditions, and Finnish craftsmanship heritage.

”After three years of carefully refining the design, we are very pleased to see the Akademia armrest chair released to market. It was a challenge adding elements to such a simple typology, but we think the final result speaks the same language as the original Akademia while having its own unique presence in space. Most importantly, aside from its unique form, the ample, curved armrests make it a supremely comfortable chair to sit in.”
Kaksikko (Wesley Walters & Salla Luhtasela)

AKADEMIA ARMREST is made of sustainably grown ash or oak and molded plywood. It functions as a dining chair, meeting chair, or visitor's chair'in various surroundings, blending gracefully into different interior styles.

### Materials
- Oak
- Ash

### Surface Finish
- Lacquered, warm oak
- Lacquered, light oak
- Lacquered ash
- Smoked oak (stain)
- COM paint color, minimum 20pcs

### Dimensions
- **Width:** 600 mm
- **Depth:** 470 mm
- **Height:** 810/460 mm

### Other Information
- Option: seat upholstery
- Fits well with Basic table

[Download CARE INSTRUCTIONS](https://www.dropbox.com/sh/72ex6pt62kfuoqa/AAALld8u9JcILgr6CQ8QAqota?dl=0)  
[Download BROCHURES and UPHOLSTERIES](https://www.dropbox.com/sh/72ex6pt62kfuoqa/AAALld8u9JcILgr6CQ8QAqota?dl=0)  
[Download 2D/3D FILES](https://www.dropbox.com/sh/72ex6pt62kfuoqa/AAALld8u9JcILgr6CQ8QAqota?dl=0)

## COLLECTION: LINEA

The Linea collection includes soft, organic forms and upholstered products with round legs. Every piece of furniture is made keeping in mind the furniture making tradition of Finland and the joinery developed throughout the years at the Nikari studio workshop.

[See all: Linea collection](https://nikari.fi/linea-collection/)
`;

// HUOM MUISTA TARKISTAA ETTÄ TEKSTI ON OIKEIN!
// GPT Generoi lisää markdownia. Tässä esimerkki promptista, joka generoi lisää markdownia: 
// Muutatko tämän aSnetun tekstin markdown muotoon. Tätä tekstiä tullaan käyttämään vektori tietokannassiani yhdessä LLM mallin RAG toteutuksella vastaamaan asikkaan esittämään kysymykseen ja etssimällä ensiksi tietokannasta tietoa tämän tekstin perusteella. Eli muuta markdown muotoon, jotta se sopii minun käyttötarkoitukseen: