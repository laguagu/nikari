export type Photo = {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
};

export type MaterialPhotos = {
  name: string;
  photos: Photo[];
};

export const materialPhotos: MaterialPhotos[] = [
  {
    name: "wood",
    photos: [
      {
        id: "1",
        name: "wood",
        href: "wood",
        imageSrc: "/care-instructions/wood/Wood-1.jpg",
      },
      {
        id: "2",
        name: "wood",
        href: "wood",
        imageSrc: "/care-instructions/wood/Wood-2.jpg",
      },
      {
        id: "3",
        name: "wood",
        href: "wood",
        imageSrc: "/care-instructions/wood/Wood-3.jpg",
      },
    ],
  },
  {
    name: "lacqueredWood",
    photos: [
      {
        id: "1",
        name: "lacqueredWood",
        href: "wood",
        imageSrc: "/care-instructions/wood/wood-1.jpeg",
      },
      {
        id: "2",
        name: "lacqueredWood",
        href: "wood",
        imageSrc: "/care-instructions/wood/wood-3.jpeg",
      },
    ],
  },
  {
    name: "laminate",
    photos: [
      {
        id: "1",
        name: "laminate",
        href: "laminate",
        imageSrc: "/care-instructions/laminate/laminate-1.jpeg",
      },
      {
        id: "2",
        name: "laminate",
        href: "laminate",
        imageSrc: "/care-instructions/laminate/laminate-2.jpg",
      },
      {
        id: "3",
        name: "laminate",
        href: "laminate",
        imageSrc: "/care-instructions/laminate/laminate-3.png",
      },
    ],
  },
  {
    name: "metal/ei-käytössä",
    photos: [
      {
        id: "1",
        name: "metal",
        href: "metal",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "metal",
        href: "metal",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "metal",
        href: "metal",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "leather",
    photos: [
      {
        id: "1",
        name: "leather",
        href: "leather",
        imageSrc: "/care-instructions/leather/leather-2.jpg",
      },
      {
        id: "2",
        name: "leather",
        href: "leather",
        imageSrc: "/care-instructions/leather/leather-4.jpeg",
      },
      {
        id: "3",
        name: "leather",
        href: "leather",
        imageSrc: "/care-instructions/leather/leather-3.jpeg",
      },
    ],
  },
  {
    name: "vegetableTannedLeather",
    photos: [
      {
        id: "1",
        name: "vegetableTannedLeather",
        href: "vegleather",
        imageSrc: "/care-instructions/leather/vege-leat-min.jpg",
      },
      {
        id: "2",
        name: "vegetableTannedLeather",
        href: "vegleather",
        imageSrc: "/care-instructions/leather/leather-4.jpeg",
      },
      {
        id: "3",
        name: "vegetableTannedLeather",
        href: "vegleather",
        imageSrc: "/care-instructions/leather/leather-4.jpeg",
      },
    ],
  },
  {
    name: "plastic/poistettu-käytöstä",
    photos: [
      {
        id: "1",
        name: "plastic",
        href: "plastic",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "2",
        name: "plastic",
        href: "plastic",
        imageSrc: "/care-instructions/empty.png",
      },
      {
        id: "3",
        name: "plastic",
        href: "plastic",
        imageSrc: "/care-instructions/empty.png",
      },
    ],
  },
  {
    name: "fabric",
    photos: [
      {
        id: "1",
        name: "fabric",
        href: "fabric",
        imageSrc: "/care-instructions/fabric/fabric-1.jpeg",
      },
      {
        id: "2",
        name: "fabric",
        href: "fabric",
        imageSrc: "/care-instructions/fabric/fabric-2.jpg",
      },
      {
        id: "3",
        name: "fabric",
        href: "fabric",
        imageSrc: "/care-instructions/fabric/fabric-3.jpeg",
      },
    ],
  },
  {
    name: "outdoor",
    photos: [
      {
        id: "1",
        name: "outdoor",
        href: "outdoor",
        imageSrc: "/care-instructions/outdoor/outdoor.jpeg",
      },
      {
        id: "2",
        name: "outdoor",
        href: "outdoor",
        imageSrc: "/care-instructions/outdoor/outdoor2.jpeg",
      },
      {
        id: "3",
        name: "outdoor",
        href: "outdoor",
        imageSrc: "/care-instructions/outdoor/outdoor2.jpeg",
      },
    ],
  },
  {
    name: "sauna",
    photos: [
      {
        id: "1",
        name: "sauna",
        href: "sauna",
        imageSrc: "/care-instructions/sauna/sauna.jpg",
      },
      {
        id: "2",
        name: "sauna",
        href: "sauna",
        imageSrc: "/care-instructions/sauna/sauna.jpg",
      },
      {
        id: "3",
        name: "sauna",
        href: "sauna",
        imageSrc: "/care-instructions/sauna/sauna.jpg",
      },
      {
        id: "4",
        name: "sauna",
        href: "sauna",
        imageSrc: "/care-instructions/sauna/sauna.jpg",
      },
    ],
  },
];

const photos: Photo[] = [
  {
    id: "1",
    name: "wood",
    href: "akademia",
    imageSrc: "/care-instructions/wood.jpg",
  },
  {
    id: "2",
    name: "laminate",
    href: "akademia",
    imageSrc: "/care-instructions/wood.jpg",
  },
  {
    id: "3",
    name: "metal",
    href: "akademia",
    imageSrc: "/care-instructions/wood.jpg",
  },
  {
    id: "4",
    name: "leather",
    href: "akademia",
    imageSrc: "/care-instructions/wood.jpg",
  },
  {
    id: "5",
    name: "plastic",
    href: "akademia",
    imageSrc: "/care-instructions/wood.jpg",
  },
  {
    id: "6",
    name: "fabric",
    href: "akademia",
    imageSrc: "/care-instructions/wood.jpg",
  },
  {
    id: "7",
    name: "outdoor",
    href: "akademia",
    imageSrc: "/care-instructions/wood.jpg",
  },
];

export default photos;
