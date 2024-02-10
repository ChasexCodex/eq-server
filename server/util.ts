// generate 100 points between 25 and 60 for x and 30 and 65 for y
// @ts-ignore

export const makePoints = (length = 200) => {
  return Array.from({length}, () => ({
    x: Math.random() * 35 + 25,
    y: Math.random() * 35 + 30,
    ok: {
      yes: Math.floor(Math.random() * 10000),
      no: Math.floor(Math.random() * 10000),
    },
  }));
}

