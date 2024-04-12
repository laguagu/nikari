export type Material = 'wood' | 'laminate' | 'metal' | 'leather' | 'plastic' | 'fabric' | 'outdoor';

type CareInstructions = {
  [K in Material]?: {
    "1": string;
    "2": string;
    "3": string;
  }
}

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
