---
title: "How to Extract Text from Images: Optical Character Recognition (OCR) and Wasm Architecture"
publish_date: "2026-10-27T05:00:00Z"
meta_description: "Learn how Optical Character Recognition (OCR) extracts text from images and screenshots. Master Tesseract WebAssembly, Otsu thresholding, and LSTM networks."
featured_image_url: "/og-image.png"
author: "founder"
---

Manual data entry from paper receipts, medical invoices, scanned contracts, and screenshot snippets is tedious, slow, and prone to human error. For decades, organizations relied on room-sized document scanners and costly enterprise software to transcribe printed text into digital systems.

Today, **Optical Character Recognition (OCR)** powered by deep neural networks can transcribe text with near-human accuracy in milliseconds. Even more impressively, with the advent of **WebAssembly (Wasm)**, industrial-grade OCR engines like Google-maintained **Tesseract** can execute entirely inside your local web browser—eliminating the security risks and bandwidth costs of transmitting confidential documents to cloud APIs.

This guide explores the computer vision architecture behind modern OCR: the multi-stage pipeline from Otsu binarization to LSTM sequence modeling, tips for maximizing transcription accuracy, and how to extract text privately in your browser.

---

## 1. The Multi-Stage Optical Character Recognition Pipeline

Transcribing text from a noisy 2D grid of pixels is an intricate computer vision problem. Modern OCR engines execute a multi-stage pipeline:

```
[Input Image] &rarr; [Binarization & Thresholding] &rarr; [Layout Segmentation] &rarr; [LSTM Character Recognition] &rarr; [Linguistic Verification] &rarr; [Text Output]
```

### Stage 1: Binarization and Preprocessing (Otsu's Thresholding)
Real-world images contain shadows, uneven ambient lighting, paper texture, and camera flash glare. The OCR engine must first convert color and grayscale pixels into a clean black-and-white mask where text is separated from the background.

The industry-standard algorithm is **Otsu's Thresholding Method**, which analyzes the image's grayscale histogram and calculates the mathematical threshold that minimizes intra-class pixel variance, isolating high-contrast text silhouettes.

### Stage 2: Page Layout Analysis & Segmentation
Before recognizing individual letters, the engine must analyze page geometry:
- Detecting text column boundaries and paragraph margins.
- Calculating the **skew angle** (the tilt of a crooked page) and mathematically rotating the canvas upright.
- Establishing the baseline and x-height of each line of typography.

### Stage 3: Neural Network Recognition (LSTM)
In modern Tesseract 4 and 5, character recognition is powered by a **Long Short-Term Memory (LSTM) Recurrent Neural Network**:
- The engine sweeps a sliding horizontal window across each text line.
- Instead of attempting to segment touching or overlapping letters in isolation (which frequently fails on kerning pairs like `fi` or `fl`), the LSTM evaluates the temporal sequence of visual strokes.
- It outputs character probabilities based on both individual letter shapes and sequence context.

### Stage 4: Linguistic Post-Processing
A dictionary and n-gram language model evaluates the LSTM's raw output. If the neural network is uncertain whether a character is the number zero (`0`) or capital letter `O` within the word `COMPUTER`, the linguistic model uses English language probability to select the letter `O`.

---

## 2. Why Client-Side WebAssembly (Wasm) Changes Everything

Historically, running an advanced neural OCR engine required either installing gigabytes of native C++ dependencies locally or calling commercial cloud APIs like Amazon Textract, Google Cloud Vision, or Microsoft Azure Cognitive Services.

### The Cloud API Privacy Risk
Uploading sensitive documents to cloud endpoints introduces significant compliance and security hazards:
- **Financial & Corporate Data:** Invoices, bank account details, and confidential contracts travel across external network infrastructure.
- **HIPAA and GDPR Compliance:** Storing or processing patient healthcare records or European citizen data on third-party servers triggers strict data residency audits.
- **API Paywalls:** Cloud providers charge per page processed, making large-scale scanning expensive.

### The In-Browser Solution: Tesseract.js via WebAssembly
By compiling Tesseract's native C++ codebase into **WebAssembly (Wasm)**, modern browsers can execute the full neural OCR engine directly on client hardware:
- **Zero Server Uploads:** Your document never leaves your machine's local RAM.
- **No Network Lag:** Processing speeds depend entirely on local CPU capability.
- **Offline Capability:** Once the language model is downloaded and cached in your browser storage, the OCR tool functions with zero internet access.

---

## 3. Best Practices to Maximize OCR Accuracy

While neural OCR engines are resilient, transcription quality is directly governed by input image quality:

| Factor | Optimal Recommendation | Common Mistake to Avoid |
| :--- | :--- | :--- |
| **Resolution** | 300 DPI (character height $\ge 20$ px) | Tiny 72 DPI web screenshots with microscopic text |
| **Orientation** | Upright ($0^\circ$ skew) | Angled or upside-down mobile photos |
| **Lighting** | Even, flat illumination | Hand shadows or bright camera flash reflections |
| **Contrast** | Dark black text on pure white paper | Gray text on textured, colored backgrounds |
| **Language** | Select matching language pack | Scanning German or French with only English model enabled |

---

## 4. How to Extract Text from Images in JavaScript (Node.js & Browser)

Using the open-source `tesseract.js` library:

```typescript
import { createWorker } from "tesseract.js";

async function extractTextFromImage(
  imageSource: File | string,
  languageCode: string = "eng"
): Promise<string> {
  // 1. Initialize worker with target language (e.g. 'eng', 'spa', 'deu')
  const worker = await createWorker(languageCode);

  try {
    // 2. Perform OCR recognition on the image buffer
    const { data } = await worker.recognize(imageSource);

    // 3. Return recognized plain text
    return data.text.trim();
  } finally {
    // 4. Terminate worker thread to free memory
    await worker.terminate();
  }
}
```

---

## 5. Recommended Workflow and Companion Tools

- **[AI Image to Text (OCR)](/ai-image-to-text):** Extract text, numbers, and structured paragraphs from screenshots, receipts, and photos in 12 languages with 100% browser privacy.
- **[Regex Text Tool](/regex-text-tool):** Extract specific patterns—such as emails, telephone numbers, dates, and amounts—from your transcribed OCR text.
- **[JPG to PNG Converter](/jpg-to-png-converter):** Convert scanned documents to lossless PNG format for archival preservation.
- **[ASCII Art Generator](/ascii-art-generator):** Render photos and logos into stylized monospaced text art.
