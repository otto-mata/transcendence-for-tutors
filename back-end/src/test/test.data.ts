export const TestUser1 = {
  "id": "1",
  "username": "Machin",
  "email": "machin@bidule.com",
  "displayName": "Bidule",
  "bio": "Je suis un petit machin bidule qui turbine",
  // "avatar?": "",
  // "coverImage?": "",
  "verified": true,
  "role": "",
  "createdAt": new Date("January 24, 2006 05:27:36"),
  "updatedAt": new Date("2025-12-17T03:24:00"),
}

export const TestUser2 = {
  "id": "2",
  "username": "lavien",
  "email": "lavien.rose@gmail.com",
  "displayName": "Rose",
  "bio": "Je vois la vie en rose",
  // "avatar?": "",
  // "coverImage?": "",
  "verified": false,
  "role": "BasicUser",
  "createdAt": new Date("december 24, 1998 05:27:36"),
  "updatedAt": new Date("2025-11-26T03:24:00"),
}


export const TestPost1 = {
  id: "1",
  content: "Apres 2h de cheval, j'ai manger une mangue. Je ne savais pas qu'un fruitpouvais avoir un tet gout",
  author: TestUser1,
  likes: 105,
  replies: 4,
  shares: 12,
  views: 1000,
  liked: true,
  bookmarked: true,
  createdAt: new Date("2025-11-26T03:24:00"),
  updatedAt: new Date("2025-11-26T03:24:00"),
}

export const TestPost2 = {
  id: "1",
  content: "Apres 2h de cheval, j'ai manger une mangue. Je ne savais pas qu'un fruitpouvais avoir un tet gout",
  author: TestUser1,
  likes: 1050000,
  replies: 4000,
  shares: 1200,
  views: 1000,
  liked: false,
  bookmarked: false,
  createdAt: new Date("2025-11-26T03:24:00"),
  updatedAt: new Date("2025-11-26T03:24:00"),
}

