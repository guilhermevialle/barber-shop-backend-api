export const wait = async (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
