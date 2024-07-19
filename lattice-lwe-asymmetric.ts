import * as mathjs from "mathjs";
const math = mathjs;

// Parameters
const n: number = 5; // dimension of the lattice
const q: number = 257; // a small prime modulus for simplicity
const sigma: number = 1; // error standard deviation

// Generate a random integer between 0 and q-1
const randomInt = (q: number): number => Math.floor(Math.random() * q);

// Generate a random integer with normal distribution using the Box-Muller transform
const randomNormalInt = (sigma: number, q: number): number => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num * sigma; // Apply standard deviation
  return Math.floor(num) % q;
};

// Key Generation
interface PublicKey {
  A: mathjs.Matrix;
  b: mathjs.Matrix;
}

interface SecretKey {
  s: mathjs.Matrix;
}

const keygen = (n: number, q: number): [PublicKey, SecretKey] => {
  const A: mathjs.Matrix = math.matrix(math.randomInt([n, n], 0, q));
  const s: mathjs.Matrix = math.matrix(math.randomInt([n], 0, q));
  const e: mathjs.Matrix = math.matrix(Array.from({ length: n }, () => randomNormalInt(sigma, q)));
  const b: mathjs.Matrix = math.mod(math.add(math.multiply(A, s), e), q) as mathjs.Matrix;
  return [{ A, b }, { s }];
};

// Encryption
interface Ciphertext {
  c1: mathjs.Matrix;
  c2: number;
}

const encrypt = (pk: PublicKey, m: number, q: number): Ciphertext => {
  const { A, b } = pk;
  const r: mathjs.Matrix = math.matrix(math.randomInt([n], 0, 2));
  const e1: mathjs.Matrix = math.matrix(Array.from({ length: n }, () => randomNormalInt(sigma, q)));
  const e2: number = randomNormalInt(sigma, q);
  const c1: mathjs.Matrix = math.mod(math.add(math.multiply(r, A), e1), q) as mathjs.Matrix;
  const c2: number = math.mod(
    math.add(math.add(math.multiply(r, b) as unknown as number, e2), m * Math.floor(q / 2)),
    q
  ) as number;
  return { c1, c2 };
};

// Decryption
const decrypt = (sk: SecretKey, ct: Ciphertext, q: number): number => {
  const { c1, c2 } = ct;
  const s: mathjs.Matrix = sk.s;
  const m: number = math.mod(math.subtract(c2, math.multiply(c1, s) as unknown as number), q) as number;
  // Decode message
  if (m > q / 4 && m < (3 * q) / 4) {
    return 1;
  } else {
    return 0;
  }
};

// Example usage
const [pk, sk] = keygen(n, q);
const message: number = 1; // Message to encrypt (0 or 1)
const ciphertext: Ciphertext = encrypt(pk, message, q);
const decryptedMessage: number = decrypt(sk, ciphertext, q);

console.log(`Original message: ${message}`);
console.log(`Decrypted message: ${decryptedMessage}`);
