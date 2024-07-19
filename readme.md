# CryptoSystems

![Cryptography](./image.png)

## Table of Contents

- [CryptoSystems](#cryptosystems)
  - [Symmetric Encryption](#symmetric-encryption)
    - [AES (Advanced Encryption Standard)](#aes-advanced-encryption-standard)
  - [Asymmetric Encryption](#asymmetric-encryption)
    - [RSA (Rivest-Shamir-Adleman)](#rsa-rivest-shamir-adleman)
    - [ECC (Elliptic Curve Cryptography)](#ecc-elliptic-curve-cryptography)
  - [Hash Functions](#hash-functions)
    - [Argon 2id](#argon-2id)
    - [SHA-3 (Secure Hash Algorithm 3)](#sha-3-secure-hash-algorithm-3)
  - [Hybrid Approach](#hybrid-approach)
    - [TLS/SSL](#tlsssl)
- [List of Algorithms](#list-of-algorithms)
- [AES](#aes)
- [AES with RoundRobin Technique](#aes-with-roundrobin-technique)
- [Quantum-Resistant Algorithms](#quantum-resistant-algorithms)
  - [Lattice-based Cryptography](#lattice-based-cryptography)
  - [Hash-based Cryptography](#hash-based-cryptography)
  - [Code-based Cryptography](#code-based-cryptography)
  - [Multivariate Polynomial Cryptography](#multivariate-polynomial-cryptography)
- [Quantum-Based Algorithms](#quantum-based-algorithms)
  - [Quantum Key Distribution (QKD)](#quantum-key-distribution-qkd)
- [Learning With Errors (LWE) Problem and Lattice-Based Cryptography](#learning-with-errors-lwe-problem-and-lattice-based-cryptography)
  - [LWE in Symmetric Cryptography](#lwe-in-symmetric-cryptography)
  - [LWE in Asymmetric Cryptography](#lwe-in-asymmetric-cryptography)
    - [Public Key Encryption](#public-key-encryption)
    - [Key Exchange](#key-exchange)
    - [Digital Signatures](#digital-signatures)
  - [Example: LWE-based Public Key Encryption](#example-lwe-based-public-key-encryption)
  - [Practical Implementations](#practical-implementations)
  - [Strengths of LWE and Lattice-Based Cryptography](#strengths-of-lwe-and-lattice-based-cryptography)
  - [Weaknesses and Challenges](#weaknesses-and-challenges)
  - [Security of the Provided LWE Example](#security-of-the-provided-lwe-example)
  - [Practical Parameter Choices](#practical-parameter-choices)
  - [Exact Security Figures](#exact-security-figures)
  - [Conclusion](#conclusion)
- [Code Explanation: Learning With Errors (LWE) (Asymmetric)](#code-explanation-learning-with-errors-lwe-asymmetric)
  - [Parameters](#parameters)
  - [Helper Function](#helper-function)
  - [Key Generation (keygen)](#key-generation-keygen)
  - [Encryption (encrypt)](#encryption-encrypt)
  - [Decryption (decrypt)](#decryption-decrypt)
  - [Security Considerations](#security-considerations)
- [Code Explanation: Learning With Errors (LWE) (Symmetric)](#code-explanation-learning-with-errors-lwe-symmetric)
  - [Parameters](#parameters-1)
  - [Helper Function](#helper-function-1)
  - [Key Generation (generateKey)](#key-generation-generatekey)
  - [Encryption (encrypt)](#encryption-encrypt-1)
  - [Decryption (decrypt)](#decryption-decrypt-1)
  - [Security Considerations](#security-considerations-1)

### Symmetric Encryption:

---

#### AES (Advanced Encryption Standard):

- Strengths: AES is widely regarded as highly secure and efficient. It is used worldwide and is the encryption standard recommended by the U.S. National Institute of Standards and Technology (NIST).
- Key Sizes: 128, 192, or 256 bits.
- Use Cases: Encrypting data at rest (e.g., files, databases) and data in transit.

### Asymmetric Encryption:

---

#### RSA (Rivest-Shamir-Adleman):

- Strengths: RSA is one of the most widely used asymmetric algorithms. It provides strong security when large key sizes (2048 bits and above) are used.
- Key Sizes: Typically 2048, 3072, or 4096 bits.
- Use Cases: Secure key exchange, digital signatures, and certificates.

#### ECC (Elliptic Curve Cryptography):

- Strengths: ECC offers comparable security to RSA but with much shorter key sizes, resulting in faster computations and reduced resource consumption.
- Key Sizes: Commonly used key sizes range from 256 to 521 bits.
- Use Cases: Secure key exchange, digital signatures, and certificates, especially in resource-constrained environments (e.g., mobile devices).

### Hash Functions:

---

#### Argon 2id:

Argon2 is a password-hashing function that summarizes the state of the art in the design of memory-hard functions and can be used to hash passwords for credential storage, key derivation, or other applications.

##### Argon2i, Argon2d, and Argon2id are parametrized by:

[https://argon2.online/](https://argon2.online/)

[https://github.com/P-H-C/phc-winner-argon2/blob/master/README.md](https://github.com/P-H-C/phc-winner-argon2/blob/master/README.md)

- A time cost, which defines the amount of computation realized and therefore the execution time, given in number of iterations
- A memory cost, which defines the memory usage, given in kibibytes
- A parallelism degree, which defines the number of parallel threads

#### SHA-3 (Secure Hash Algorithm 3):

- Strengths: SHA-3 is the latest member of the Secure Hash Algorithm family, designed to provide high security with improved resistance to various attack vectors compared to its predecessors.
- Output Sizes: Commonly 224, 256, 384, and 512 bits.
- Use Cases: Data integrity verification, digital signatures, and password hashing.

### Hybrid Approach:

Combining symmetric and asymmetric encryption often provides the best balance of security and performance:

#### TLS/SSL:

Uses a combination of RSA/ECC for key exchange and AES for data encryption to secure communication channels (e.g., HTTPS).

### List of Algorithms

1. [AES](#aes)
2. [RSA (Rivest-Shamir-Adleman)](#rsa-rivest-shamir-adleman)
3. [ECC (Elliptic Curve Cryptography)](#ecc-elliptic-curve-cryptography)
4. [Quantum-Resistant Algorithms](#quantum-resistant-algorithms)
   1. [Lattice-based Cryptography](#lattice-based-cryptography)
      1. Kyber: A lattice-based key encapsulation mechanism (KEM)
      2. Dilithium: A lattice-based digital signature scheme
      3. NTRU: A well-known lattice-based encryption scheme
      4. [Learning With Errors (LWE) Problem and Lattice-Based Cryptography](#learning-with-errors-lwe-problem-and-lattice-based-cryptography)
   2. [Hash-based Cryptography](#hash-based-cryptography)
   3. [Code-based Cryptography](#code-based-cryptography)
   4. [Multivariate Polynomial Cryptography](#multivariate-polynomial-cryptography)
5. [Quantum-Based Algorithms](#quantum-based-algorithms)

## AES

AES (Advanced Encryption Standard) is a symmetric encryption algorithm, which means it uses the same key for both encryption and decryption. For asymmetric encryption (which uses a public key for encryption and a private key for decryption), you would typically use algorithms like RSA or ECC (Elliptic Curve Cryptography).

However, if you want to implement an encryption scheme in Node.js using both AES (for symmetric encryption) and an asymmetric encryption algorithm like RSA, you can follow these steps:

1. Generate RSA Key Pair: Use RSA to generate a public/private key pair.
2. Encrypt Data with AES: Use AES to encrypt the data.
3. Encrypt AES Key with RSA: Use RSA to encrypt the AES key.

AES encryption uses key sizes of 128, 192, or 256 bits, and there is no AES-512. For asymmetric encryption using RSA, you can use larger key sizes (e.g., 4096 bits), but for AES, the maximum key size is 256 bits.

If you need to use a key larger than 256 bits for symmetric encryption, you might need to use a different algorithm. However, combining AES with an asymmetric algorithm like RSA for key exchange should still suffice for most security requirements.

## AES with RoundRobin Technique

To implement AES encryption with a "Round Robin" technique, we'll assume you want to encrypt different parts of the data with different AES keys in a round-robin manner. This means that we'll have a set of AES keys and use them in a cyclic order to encrypt portions of the data.

Here’s an example of how to achieve this in Node.js:

Generate multiple AES keys.

1. Encrypt data using these keys in a round-robin fashion.
2. Encrypt the AES keys using RSA for secure transmission.

   Implementation is in `aes-rsa-roundrobin.ts`

In this implementation:

1. Multiple AES keys are generated.
2. Data is split into chunks and each chunk is encrypted with a different AES key in a round-robin manner.
3. Each AES key is encrypted using RSA.
4. The encrypted AES keys are decrypted using RSA.
5. The data chunks are decrypted using the corresponding AES keys in the same round-robin order.
6. This approach provides an additional layer of security by distributing the data encryption across multiple keys.

## Quantum-Resistant Algorithms:

#### Lattice-based Cryptography:

- Examples: NTRUEncrypt, Learning With Errors (LWE).
- Strengths: Believed to be resistant to both classical and quantum attacks.

#### Hash-based Cryptography:

- Examples: Merkle Trees, XMSS (eXtended Merkle Signature Scheme).
- Strengths: Based on the security of hash functions, providing strong security against quantum attacks.

#### Code-based Cryptography:

- Examples: McEliece Cryptosystem.
- Strengths: Based on the difficulty of decoding a general linear code.

#### Multivariate Polynomial Cryptography:

- Examples: Unbalanced Oil and Vinegar (UOV).
- Strengths: Based on the difficulty of solving systems of multivariate polynomial equations.

## Quantum-Based Algorithms:

#### Quantum Key Distribution (QKD):

- Examples: BB84 Protocol.
- Strengths: Uses principles of quantum mechanics to securely distribute encryption keys. Any attempt to eavesdrop on the key exchange can be detected.

## Learning With Errors (LWE) Problem and Lattice-Based Cryptography

### LWE in Symmetric Cryptography

LWE can be adapted to create symmetric encryption schemes, but it is more commonly used in the context of asymmetric cryptography. In symmetric scenarios, lattice-based techniques can be used to construct primitives such as pseudorandom functions or symmetric key encryption, but this is less typical compared to their asymmetric applications.

### LWE in Asymmetric Cryptography

LWE is primarily used to construct asymmetric cryptographic schemes. Here are some key applications:

#### Public Key Encryption

LWE can be used to create public key encryption schemes where the public key is used for encryption and the private key is used for decryption.

#### Key Exchange

LWE can be used for key exchange protocols, allowing two parties to securely agree on a shared secret over an insecure channel.

#### Digital Signatures

LWE can be used to construct digital signature schemes where a private key is used to sign messages, and a public key is used to verify the signatures.

### Example: LWE-based Public Key Encryption

Here is a high-level overview of how an LWE-based public key encryption scheme works:

1. **Key Generation:**

   - Generate a random matrix $A$ and a secret vector $s$.
   - Compute $b = A \cdot s + e$ where $e$ is a small error vector.
   - The public key is $(A, b)$ and the private key is $s$.

2. **Encryption:**

   - To encrypt a message $m$, generate a random vector $r$ and error vectors $e_1$ and $e_2$.
   - Compute the ciphertext as $(c_1, c_2)$, where $c_1 = r \cdot A + e_1$ and $c_2 = r \cdot b + e_2 + m \cdot \left\lfloor \frac{q}{2} \right\rfloor$.

3. **Decryption:**

   - To decrypt the ciphertext $(c_1, c_2)$, compute $m' = c_2 - c_1 \cdot s$.
   - Decode $m'$ to recover the original message $m$.

### Practical Implementations

Several well-known post-quantum cryptographic schemes are based on LWE or related problems:

- **Kyber**: A public-key encryption and key encapsulation mechanism (KEM) scheme based on the module-LWE problem.
- **FrodoKEM**: A key encapsulation mechanism based on the plain LWE problem.

### Strengths of LWE and Lattice-Based Cryptography

1. **Quantum Resistance**: LWE-based cryptographic schemes are believed to be resistant to attacks by quantum computers. This is because the best-known algorithms for solving the LWE problem, including quantum algorithms, still require exponential time.
2. **Provable Security**: LWE has reductions to worst-case lattice problems, meaning breaking an LWE instance can be as hard as solving some of the hardest problems in lattice theory.
3. **Versatility**: LWE is the basis for many cryptographic primitives, including encryption schemes, digital signatures, homomorphic encryption, and more.
4. **Efficiency**: Lattice-based schemes, including those based on LWE, can be made efficient with proper parameter selection and implementation optimizations.

### Weaknesses and Challenges

1. **Parameter Selection**: The security of LWE heavily depends on choosing appropriate parameters. If parameters are too small, the scheme might be vulnerable to attacks. If parameters are too large, the scheme might become impractical due to excessive computational and memory requirements.
2. **Error Distribution**: The choice of the error distribution (e.g., Gaussian or discrete Gaussian) and its standard deviation is crucial. Poor choices can weaken security.
3. **Implementation Complexity**: Implementing lattice-based schemes securely and efficiently is complex. Errors in implementation can introduce vulnerabilities.
4. **New Area of Study**: While promising, lattice-based cryptography is relatively new compared to classical schemes like RSA and ECC, meaning that it has undergone less scrutiny over time.

### Security of the Provided LWE Example

The provided example is a simplified educational implementation and is not suitable for practical use. Here are some specific points regarding its security:

1. **Parameter Sizes**: The parameters chosen (e.g., \( $n = 5$ \), \( $q = 257$ \)) are far too small for real-world security. In practical LWE-based schemes, \( $n$ \) would typically be in the hundreds or thousands, and \( $q$ \) would be much larger.
2. **Error Distribution**: The error distribution used in the example is a simple approximation. Practical implementations use more carefully chosen distributions.
3. **Simplifications**: The example code omits many practical considerations and optimizations needed for secure and efficient implementation.

### Practical Parameter Choices

For practical implementations, consider parameters recommended by the cryptographic community. For example:

- **Kyber (NIST PQC finalist)**: Uses module-LWE with parameters like \( $n = 256$ \), \( $q = 7681$ \), and carefully chosen error distributions.
- **FrodoKEM (NIST PQC finalist)**: Uses LWE with parameters like \( $n = 752$ \), \( q = $2^{15}$ \), and discrete Gaussian error distributions.

### Exact Security Figures

Exact security figures depend on many factors, including parameter sizes, attack models, and assumptions about computational resources. Here are some general estimates for practical parameter choices:

- **Classical Security**: For parameters chosen to target 128-bit classical security, breaking the scheme would require roughly \( $2^{128}$ \) operations with classical computers.
- **Quantum Security**: For parameters chosen to target 128-bit quantum security, breaking the scheme would require roughly \( $2^{64}$ \) operations with quantum computers (due to Grover's algorithm providing a quadratic speedup).

### Conclusion

While the provided example demonstrates the basic concepts of LWE and lattice-based cryptography, it is not suitable for practical use due to small parameter sizes and simplifications. For real-world applications, it is crucial to use well-established libraries and follow recommended parameter choices to ensure security. The strengths of LWE and lattice-based schemes lie in their quantum resistance and provable security, but proper implementation is key to leveraging these strengths effectively.

## Code Explanation: Learning With Errors (LWE) (Asymmetric)

### Parameters:

- $n$: Dimension of the lattice. A larger $n$ provides stronger security but increases computational complexity.
- $q$: A large prime modulus. This value should be chosen carefully for security.
- $\sigma$: Standard deviation for the error distribution. This value affects the error term and thus the security and correctness of the scheme.

### Helper Function:

- **randomNormalInt**: Generates a random integer with a normal distribution using the Box-Muller transform.

### Key Generation (keygen):

- Generates a random matrix $A$ and a secret vector $s$.
- Computes $b = A \cdot s + e$, where $e$ is a small error vector.
- Returns the public key $(A, b)$ and the private key $s$.

### Encryption (encrypt):

- Encrypts a message $m \in \{0, 1\}$ using the public key.
- Generates a random vector $r$ and error vectors $e_1$ and $e_2$.
- Computes the ciphertext components $c_1$ and $c_2$.

### Decryption (decrypt):

- Decrypts the ciphertext using the private key.
- Computes $m'$ by subtracting $c_1 \cdot s$ from $c_2$.
- Decodes the message based on the value of $m'$.

### Security Considerations:

- The provided parameters are for educational purposes. In practice, you should use much larger parameters to ensure security.
- Ensure the error distribution is chosen carefully. The standard deviation $\sigma$ plays a critical role in security.
- This implementation is a simplified version and does not include various optimizations and security measures required for a production system.

## Code Explanation: Learning With Errors (LWE) (Symmetric)

### Parameters:

- $n$: Dimension of the lattice. A larger $n$ provides stronger security but increases computational complexity.
- $q$: A large prime modulus. This value should be chosen carefully for security.
- $\sigma$: Standard deviation for the error distribution. This value affects the error term and thus the security and correctness of the scheme.

### Helper Function:

- **randomNormalInt**: Generates a random integer with a normal distribution using the Box-Muller transform.

### Key Generation (generateKey):

- Generates a secret key $s$.

### Encryption (encrypt):

- Encrypts a message $m$ using the secret key.
- Generates a random matrix $A$ and error vectors $e$, $e_1$, $e_2$.
- Computes the ciphertext components $c_1$ and $c_2$.

### Decryption (decrypt):

- Decrypts the ciphertext using the secret key.
- Computes $m'$ by subtracting $c_1 \cdot s$ from $c_2$.
- Decodes the message based on the value of $m'$.

### Security Considerations:

- The provided parameters are for educational purposes. In practice, you should use much larger parameters to ensure security.
- Ensure the error distribution is chosen carefully. The standard deviation $\sigma$ plays a critical role in security.
- This implementation is a simplified version and does not include various optimizations and security measures required for a production system.

<br>
<br>

<center>

Made with ❤️ by [Debi Prasad Mishra](https://debiprasadmishra.net)

</center>
