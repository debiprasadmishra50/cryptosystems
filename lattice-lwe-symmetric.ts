import * as mathjs from "mathjs";
const math = mathjs;

// Parameters
const n: number = 256; // dimension of the lattice
const q: number = 8380417; // a large prime modulus
const sigma: number = 3.19; // standard deviation for the error distribution

// Helper function: Generate a random integer with normal distribution using the Box-Muller transform
const randomNormalInt = (sigma: number, q: number): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = Math.round(num * sigma); // Apply standard deviation and round to nearest integer
  return ((num % q) + q) % q; // Ensure the result is within the range [0, q-1]
};

// Key Generation
const generateKey = (n: number, q: number): mathjs.Matrix => {
  return math.matrix(math.randomInt([n], 0, q));
};

// Encryption
const encrypt = (key: mathjs.Matrix, message: number, q: number): [mathjs.Matrix, number] => {
  const A: mathjs.Matrix = math.matrix(math.randomInt([n, n], 0, q));
  const e: mathjs.Matrix = math.matrix(Array.from({ length: n }, () => randomNormalInt(sigma, q)));
  const b: mathjs.Matrix = math.mod(math.add(math.multiply(A, key), e), q) as mathjs.Matrix;

  const r: mathjs.Matrix = math.matrix(math.randomInt([n], 0, 2));
  const e1: mathjs.Matrix = math.matrix(Array.from({ length: n }, () => randomNormalInt(sigma, q)));
  const e2: number = randomNormalInt(sigma, q);

  const c1: mathjs.Matrix = math.mod(math.add(math.multiply(r, A), e1), q) as mathjs.Matrix;
  const c2: number = math.mod(
    math.add(math.add(math.multiply(r, b) as unknown as number, e2), message * Math.floor(q / 2)),
    q
  ) as number;

  return [c1, c2];
};

// Decryption
const decrypt = (key: mathjs.Matrix, ciphertext: [mathjs.Matrix, number], q: number): number => {
  const [c1, c2] = ciphertext;
  const m: number = math.mod(math.subtract(c2, math.multiply(c1, key) as unknown as number), q) as number;

  // Decode message
  if (m > q / 4 && m < (3 * q) / 4) {
    return 1;
  } else {
    return 0;
  }
};

// Example usage
const key: mathjs.Matrix = generateKey(n, q);
const message: number = 1; // Message to encrypt (0 or 1)
const ciphertext: [mathjs.Matrix, number] = encrypt(key, message, q);
const decryptedMessage: number = decrypt(key, ciphertext, q);

console.log(`Original message: ${message}`);
// console.log(`Ciphertext c1:`, ciphertext[0]);
// console.log(`Ciphertext c2: ${ciphertext[1]}`);
console.log(`Decrypted message: ${decryptedMessage}`);
