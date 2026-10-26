---
title: "How to Convert Hexadecimal to Text (and Vice Versa): A Practical Developer Guide"
publish_date: "2026-10-26T16:00:00Z"
meta_description: "Learn how hexadecimal (base-16) encoding works, how to convert hex to text and text to hex, why 4 bits equal one nibble, and code examples in Python and JS."
featured_image_url: "/og-image.png"
author: "founder"
---

Whenever you inspect a memory dump, debug a network TCP packet in Wireshark, examine an Ethereum smart contract transaction, or copy a CSS color code, you will encounter strings composed of numbers and letters from `A` to `F`.

This is **Hexadecimal (Base-16)** notation.

While raw binary (1s and 0s) is what physical transistors actually process, reading an unbroken string of 64 binary digits is virtually impossible for human eyes. Hexadecimal solves this by compressing binary into a concise, elegant, human-readable format.

Here is a practical developer guide on how hexadecimal to text conversion works, why each byte maps to two hex characters, how to handle UTF-8 emojis, and how to implement conversions in modern code.

---

## 1. What is Hexadecimal? (The Base-16 Numeral System)

In our everyday decimal system (Base-10), we count using ten digits: `0` through `9`. When we reach ten, we carry over to the next place value.

**Hexadecimal** uses **sixteen distinct symbols**:
- `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` (representing numerical values 0 through 9)
- `A` (10), `B` (11), `C` (12), `D` (13), `E` (14), `F` (15)

### The Mathematical Magic: Why Hexadecimal?
Computers operate in powers of two. The number 16 is an exact power of two:

$$2^4 = 16$$

Because of this mathematical alignment, **exactly 4 bits of binary** can represent any value from 0 (`0000`) to 15 (`1111`). In computer science, a 4-bit chunk is formally called a **nibble**:

| 4-Bit Binary | Decimal Value | Hexadecimal Character |
| :---: | :---: | :---: |
| `0000` | 0 | **0** |
| `0001` | 1 | **1** |
| `0010` | 2 | **2** |
| `0011` | 3 | **3** |
| `0100` | 4 | **4** |
| `0101` | 5 | **5** |
| `0110` | 6 | **6** |
| `0111` | 7 | **7** |
| `1000` | 8 | **8** |
| `1001` | 9 | **9** |
| `1010` | 10 | **A** |
| `1011` | 11 | **B** |
| `1100` | 12 | **C** |
| `1101` | 13 | **D** |
| `1110` | 14 | **E** |
| `1111` | 15 | **F** |

### Why Every Byte Requires Exactly Two Hex Characters
A standard computer byte consists of **8 bits**. Because $8 \text{ bits} \div 4 \text{ bits} = 2$, every single byte in computer memory can be represented by **exactly two hexadecimal characters**:
- First character: Represents the high nibble (upper 4 bits).
- Second character: Represents the low nibble (lower 4 bits).

A full byte ranges from `00` (`0x00` = 0) up to `FF` (`0xFF` = 255).

---

## 2. Step-by-Step Walkthrough: Converting "Code" to Hexadecimal

Let's convert the word `"Code"` into hexadecimal using standard ASCII values:

1. **'C'**:
   - ASCII Decimal: 67
   - 8-bit Binary: `0100 0011`
   - High nibble: `0100` = 4
   - Low nibble: `0011` = 3
   - Hex value: **`43`**

2. **'o'**:
   - ASCII Decimal: 111
   - 8-bit Binary: `0110 1111`
   - High nibble: `0110` = 6
   - Low nibble: `1111` = F
   - Hex value: **`6F`**

3. **'d'**:
   - ASCII Decimal: 100
   - 8-bit Binary: `0110 0100`
   - High nibble: `0110` = 6
   - Low nibble: `0100` = 4
   - Hex value: **`64`**

4. **'e'**:
   - ASCII Decimal: 101
   - 8-bit Binary: `0110 0101`
   - High nibble: `0110` = 6
   - Low nibble: `0101` = 5
   - Hex value: **`65`**

Combined with spaces between each byte:
```
Text: "Code"  -->  Hex: 43 6F 64 65
```

---

## 3. How to Convert Hexadecimal Back to Plain Text

Suppose you receive the hexadecimal payload:
```
48 65 6C 6C 6F 21
```

To decode it back into readable text:
1. **Split the string into two-character pairs:**
   `48`, `65`, `6C`, `6C`, `6F`, `21`
2. **Convert each hex pair to its decimal equivalent:**
   - `48` &rarr; $(4 \times 16) + 8 = 72$
   - `65` &rarr; $(6 \times 16) + 5 = 101$
   - `6C` &rarr; $(6 \times 16) + 12 = 108$
   - `6C` &rarr; $(6 \times 16) + 12 = 108$
   - `6F` &rarr; $(6 \times 16) + 15 = 111$
   - `21` &rarr; $(2 \times 16) + 1 = 33$
3. **Look up the decimal character codes:**
   - 72 = `'H'`
   - 101 = `'e'`
   - 108 = `'l'`
   - 108 = `'l'`
   - 111 = `'o'`
   - 33 = `'!'`
4. **Decoded message:** `"Hello!"`

---

## 4. Multi-Byte UTF-8 and Modern Emojis

Standard ASCII only maps characters up to 127 (`0x7F`). What happens when you convert an emoji or non-English script?

Modern software universally uses **UTF-8**, where characters span across multiple bytes:
- English text: 1 byte (2 hex characters)
- Emojis (e.g. 🚀): 4 bytes (8 hex characters)

For example, the rocket emoji (🚀) has the UTF-8 hex encoding:
```
F0 9F 9A 80
```
Casetivo's [Hex to Text Converter](/hex-to-text-converter) natively implements UTF-8 stream decoding, ensuring international scripts and emojis convert cleanly without corruption.

---

## 5. How to Convert Hex to Text in Code

### In Python 3
```python
# Text to Hexadecimal
text = "Hello 🚀"
hex_output = text.encode('utf-8').hex(' ') # Delimited with space
print(hex_output) # "68 65 6c 6c 6f 20 f0 9f 9a 80"

# Hexadecimal to Text
raw_hex = "68 65 6c 6c 6f 20 f0 9f 9a 80"
decoded_text = bytes.fromhex(raw_hex).decode('utf-8')
print(decoded_text) # "Hello 🚀"
```

### In TypeScript / Modern JavaScript
```typescript
// Text to Hex (UTF-8 Compliant)
function textToHex(str: string, delimiter: string = " "): string {
  const bytes = new TextEncoder().encode(str);
  return Array.from(bytes, b => b.toString(16).padStart(2, "0").toUpperCase()).join(delimiter);
}

// Hex to Text (UTF-8 Compliant)
function hexToText(hex: string): string {
  const cleanHex = hex.replace(/0x/gi, "").replace(/[\s,:-]/g, "");
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(cleanHex.substr(i * 2, 2), 16);
  }
  return new TextDecoder("utf-8").decode(bytes);
}

console.log(textToHex("Hello!")); // "48 65 6C 6C 6F 21"
console.log(hexToText("48 65 6C 6C 6F 21")); // "Hello!"
```

---

## Summary

Hexadecimal is the essential bridge between raw binary hardware and human software developers. Whether you are inspecting low-level protocols, validating hash digests, or writing system software, mastering hex conversion is a fundamental programming skill.

For fast, privacy-safe bidirectional conversion with customizable byte delimiters, uppercase/lowercase controls, and 0x prefix toggles, use Casetivo's free online [Hex to Text Converter](/hex-to-text-converter).
