export type ImageToolTranslationKeys = {
  imageAndMedia: string;
  aiImageToText: string;
  aiImageToTextSubtitle: string;
  asciiArtGenerator: string;
  asciiArtGeneratorSubtitle: string;
  jpgToPng: string;
  jpgToPngSubtitle: string;
  jpgToWebp: string;
  jpgToWebpSubtitle: string;
  pngToJpg: string;
  pngToJpgSubtitle: string;
  pngToWebp: string;
  pngToWebpSubtitle: string;
  svgToPng: string;
  svgToPngSubtitle: string;
  webpToPng: string;
  webpToPngSubtitle: string;
  webpToJpg: string;
  webpToJpgSubtitle: string;
  uploadImage: string;
  dropOrClick: string;
  convert: string;
  generate: string;
  extract: string;
  downloadResult: string;
  noImageSelected: string;
  conversionComplete: string;
  processing: string;
};

// English-only for fast initial load
// Full translations (14 languages) in imageToolTranslations.ts

export const imageToolTranslationsEn = {
    imageAndMedia: "Image & Media",
    aiImageToText: "AI Image to Text",
    aiImageToTextSubtitle: "Extract text content from images using browser OCR",
    asciiArtGenerator: "ASCII Art Generator",
    asciiArtGeneratorSubtitle: "Convert images into ASCII art characters",
    jpgToPng: "JPG to PNG Converter",
    jpgToPngSubtitle: "Convert JPG/JPEG images to PNG format",
    jpgToWebp: "JPG to WebP Converter",
    jpgToWebpSubtitle: "Convert JPG/JPEG images to WebP format",
    pngToJpg: "PNG to JPG Converter",
    pngToJpgSubtitle: "Convert PNG images to JPG format",
    pngToWebp: "PNG to WebP Converter",
    pngToWebpSubtitle: "Convert PNG images to WebP format",
    svgToPng: "SVG to PNG Converter",
    svgToPngSubtitle: "Convert SVG vector images to PNG format",
    webpToPng: "WebP to PNG Converter",
    webpToPngSubtitle: "Convert WebP images to PNG format",
    webpToJpg: "WebP to JPG Converter",
    webpToJpgSubtitle: "Convert WebP images to JPG format",
    uploadImage: "Upload Image",
    dropOrClick: "Drag & drop an image here, or click to select",
    convert: "Convert",
    generate: "Generate",
    extract: "Extract Text",
    downloadResult: "Download Result",
    noImageSelected: "No image selected",
    conversionComplete: "Conversion complete!",
    processing: "Processing...",
  };

export default imageToolTranslationsEn;
