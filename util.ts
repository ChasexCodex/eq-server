// generate 100 random points between 25 and 60 for x and 30 and 65 for y

export const points = Array.from({length: 200}, () => ({
  x: Math.random() * 35 + 25,
  y: Math.random() * 35 + 30,
  ok: Math.random() > 0.5,
  count: Math.floor(Math.random() * 10000),
}));

