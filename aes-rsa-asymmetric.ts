import {
  generateKeyPairSync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  publicEncrypt,
  privateDecrypt,
} from "crypto";

// Generate RSA key pair
function generateKeyPair(): { publicKey: string; privateKey: string } {
  return generateKeyPairSync("rsa", {
    modulusLength: 4096, // You can use larger key sizes like 4096 bits
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

// Encrypt data using AES
function encryptDataWithAES(data: string, aesKey: Buffer): { iv: string; encryptedData: string } {
  const iv: Buffer = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", aesKey, iv);
  let encrypted: string = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
}

// Encrypt AES key with RSA
function encryptAESKeyWithRSA(aesKey: Buffer, publicKey: string): Buffer {
  return publicEncrypt({ key: publicKey }, aesKey);
}

// Decrypt AES key with RSA
function decryptAESKeyWithRSA(encryptedAesKey: Buffer, privateKey: string): Buffer {
  return privateDecrypt({ key: privateKey }, encryptedAesKey);
}

// Decrypt data using AES
function decryptDataWithAES(encryptedData: string, aesKey: Buffer, iv: string): string {
  const decipher = createDecipheriv("aes-256-cbc", aesKey, Buffer.from(iv, "hex"));
  let decrypted: string = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Example usage
const { publicKey, privateKey } = generateKeyPair();
const data: string = "Hello, this is a secret message!";
const aesKey: Buffer = randomBytes(32); // AES-256 key

// Encrypt data with AES
const { iv, encryptedData } = encryptDataWithAES(data, aesKey);

// Encrypt AES key with RSA
const encryptedAesKey: Buffer = encryptAESKeyWithRSA(aesKey, publicKey);

// Decrypt AES key with RSA
const decryptedAesKey: Buffer = decryptAESKeyWithRSA(encryptedAesKey, privateKey);

// Decrypt data with AES
const decryptedData: string = decryptDataWithAES(encryptedData, decryptedAesKey, iv);

console.log("Original Data:", data);
console.log("Decrypted Data:", decryptedData);
