// prettier-ignore
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// randomString(4) // 'Cats'
export function randomString(length: number): string {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// randomNumber(0, 100) // 92
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

// randomizeArray([1, 2, 3]) // [3, 1, 2]
export function randomizeArray(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}

export function randomNumberGen(length: number): number {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomNumber(0, 9);
  }
  return parseInt(result);
}

// randomNumberGenerator(4) // 4213
export function randomNumberGenerator(length: number): number {
  const result = randomNumberGen(length);

  if (result.toString().split("").length === length) {
    return result;
  }

  return randomNumberGen(length);
}

// randomStringGenerator(6) // 'LjD3nY'
export function randomStringGenerator(len: number): string {
  let result = "";

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// randomColorGenerator: Generates a random hexadecimal color code.
export function randomColorGenerator(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    color += letters.charAt(randomIndex);
  }

  return color;
}

// randomizeArrayElements: Randomizes the order of elements in an array.
export function randomizeArrayElements<T>(arr: T[]): T[] {
  const copiedArray = [...arr];
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }
  return copiedArray;
}

// shuffleString: Shuffles the characters of a string.
export function shuffleString(str: string): string {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

// getRandomElement: Returns a random element from an array.
export function getRandomElement<T>(arr: T[]): T {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}
