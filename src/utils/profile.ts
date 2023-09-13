export const profiles: string[] = [
  'https://res.cloudinary.com/damjxqb5f/image/upload/v1691288132/descarga_3_onsz3o.png',
  'https://res.cloudinary.com/damjxqb5f/image/upload/v1691288132/descarga_1_knjx3t.png',
  'https://res.cloudinary.com/damjxqb5f/image/upload/v1691288131/descarga_4_mcyens.png',
  'https://res.cloudinary.com/damjxqb5f/image/upload/v1691288131/descarga_2_xaft7y.png',
  'https://res.cloudinary.com/damjxqb5f/image/upload/v1691288131/descarga_5_orjgyz.png',
];
export const getRandomProfile = () => profiles[Math.floor(Math.random() * profiles.length)];
