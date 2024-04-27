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
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "2",
        name: "wood",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "3",
        name: "wood",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
    ],
  },
  {
    name: "laminate",
    photos: [
      {
        id: "1",
        name: "laminate",
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
        name: "laminate",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
    ],
  },
  {
    name: "metal",
    photos: [
      {
        id: "1",
        name: "metal",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "2",
        name: "metal",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "3",
        name: "metal",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
    ],
  },
  {
    name: "leather",
    photos: [
      {
        id: "1",
        name: "leather",
        href: "akademia",
        imageSrc: "/care-instructions/nahkaa.jpg",
      },
      {
        id: "2",
        name: "leather",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "3",
        name: "leather",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
    ],
  },
  {
    name: "plastic",
    photos: [
      {
        id: "1",
        name: "plastic",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "2",
        name: "plastic",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "3",
        name: "plastic",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
    ],
  },
  {
    name: "fabric",
    photos: [
      {
        id: "1",
        name: "fabric",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "2",
        name: "fabric",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "3",
        name: "fabric",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
    ],
  },
  {
    name: "outdoor",
    photos: [
      {
        id: "1",
        name: "outdoor",
        href: "akademia",
        imageSrc: "/care-instructions/wood.jpg",
      },
      {
        id: "2",
        name: "outdoor",
        href: "akademia",
        imageSrc: "/care-instructions/outdoor.jpg",
      },
      {
        id: "3",
        name: "outdoor",
        href: "akademia",
        imageSrc: "/care-instructions/outdoor.jpg",
      },
    ],
  },
  // ... sama rakenne muille materiaaleille
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
