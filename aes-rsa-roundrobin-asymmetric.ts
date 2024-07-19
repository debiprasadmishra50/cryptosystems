import {
  generateKeyPairSync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  publicEncrypt,
  privateDecrypt,
} from "crypto";

interface KeyPair {
  publicKey: string;
  privateKey: string;
}

interface EncryptedData {
  ivs: string[];
  encryptedData: string;
}

// Generate RSA key pair
function generateKeyPair(): KeyPair {
  return generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
}

// Generate multiple AES keys
function generateAESKeys(numKeys: number): Buffer[] {
  const keys: Buffer[] = [];
  for (let i = 0; i < numKeys; i++) {
    keys.push(randomBytes(32)); // AES-256 key
  }
  return keys;
}

// Encrypt data using AES with round robin technique
function encryptDataWithRoundRobinAES(data: string, aesKeys: Buffer[]): EncryptedData {
  const iv = randomBytes(16);
  const dataBuffer = Buffer.from(data, "utf8");
  const chunkSize = Math.ceil(dataBuffer.length / aesKeys.length);
  let encryptedData = "";
  let ivs: string[] = [];

  for (let i = 0; i < aesKeys.length; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, dataBuffer.length);
    const chunk = dataBuffer.slice(start, end);

    const cipher = createCipheriv("aes-256-cbc", aesKeys[i], iv);
    let encryptedChunk = cipher.update(chunk, undefined, "hex");
    encryptedChunk += cipher.final("hex");
    encryptedData += encryptedChunk;

    ivs.push(iv.toString("hex"));
  }

  return { ivs, encryptedData };
}

// Encrypt AES keys with RSA
function encryptAESKeysWithRSA(aesKeys: Buffer[], publicKey: string): Buffer[] {
  return aesKeys.map((key) => publicEncrypt({ key: publicKey }, key));
}

// Decrypt AES keys with RSA
function decryptAESKeysWithRSA(encryptedAesKeys: Buffer[], privateKey: string): Buffer[] {
  return encryptedAesKeys.map((encryptedKey) => privateDecrypt({ key: privateKey }, encryptedKey));
}

// Decrypt data using AES with round robin technique
function decryptDataWithRoundRobinAES(encryptedData: string, aesKeys: Buffer[], ivs: string[]): string {
  const encryptedBuffer = Buffer.from(encryptedData, "hex");
  const chunkSize = Math.ceil(encryptedBuffer.length / aesKeys.length);
  let decryptedData = "";

  for (let i = 0; i < aesKeys.length; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, encryptedBuffer.length);
    const chunk = encryptedBuffer.slice(start, end);

    const decipher = createDecipheriv("aes-256-cbc", aesKeys[i], Buffer.from(ivs[i], "hex"));
    let decryptedChunk = decipher.update(chunk, undefined, "utf8");
    decryptedChunk += decipher.final("utf8");
    decryptedData += decryptedChunk;
  }

  return decryptedData;
}

// Example usage
const { publicKey, privateKey } = generateKeyPair();
const data = "Hello, this is a secret message!";
const aesKeys = generateAESKeys(3); // Generate 3 AES-256 keys

// Encrypt data with round robin AES
const { ivs, encryptedData } = encryptDataWithRoundRobinAES(data, aesKeys);

// Encrypt AES keys with RSA
const encryptedAesKeys = encryptAESKeysWithRSA(aesKeys, publicKey);

// Decrypt AES keys with RSA
const decryptedAesKeys = decryptAESKeysWithRSA(encryptedAesKeys, privateKey);

// Decrypt data with round robin AES
const decryptedData = decryptDataWithRoundRobinAES(encryptedData, decryptedAesKeys, ivs);

console.log("Original Data:", data);
console.log("Decrypted Data:", decryptedData);
