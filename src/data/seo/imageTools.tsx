import React from "react";
import { ToolSeoContent } from "../seoContent";

export const imageToolsSeo: Record<string, ToolSeoContent> = {
  jpgToPngConverter: {
    title: "How does the JPG to PNG Converter work?",
    content: (
      <>
        <p>The <strong>JPG to PNG Converter</strong> seamlessly transforms compressed JPEG images into high-quality PNG files. By converting to PNG, you unlock the ability to add transparent backgrounds, which is a feature not supported by the JPG format.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why convert JPG to PNG?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Transparency Support:</strong> PNGs support alpha channels, allowing you to remove backgrounds for logos and icons.</li>
          <li><strong>Lossless Editing:</strong> PNG is a lossless format, meaning you can edit and save the image multiple times without degrading its quality.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Will converting to PNG improve the image quality?",
        answer: "No, converting a compressed JPG to a PNG will not restore lost quality, but it will prevent further quality loss during future edits."
      }
    ]
  },
  pngToJpgConverter: {
    title: "How does the PNG to JPG Converter work?",
    content: (
      <>
        <p>The <strong>PNG to JPG Converter</strong> reduces the file size of your images by converting heavy, lossless PNG files into highly compressed JPG images. This is essential for web performance and saving storage space.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Benefits of JPG Images</h3>
        <p className="mt-2">While PNGs are great for transparent logos, they create massive file sizes for complex photographs. Converting high-resolution photos to JPG can reduce file sizes by up to 80% with almost no visible loss in quality, dramatically speeding up your website loading times.</p>
      </>
    ),
    faqs: [
      {
        question: "What happens to the transparent background?",
        answer: "JPG does not support transparency. Any transparent areas in your PNG will be automatically filled with a solid white background during conversion."
      }
    ]
  },
  asciiArtGenerator: {
    title: "How does the ASCII Art Generator work?",
    content: (
      <>
        <p>The <strong>ASCII Art Generator</strong> takes your uploaded image and recreates it entirely using printable text characters (ASCII). By mapping dark pixels to dense characters (like '@' or '#') and light pixels to sparse characters (like '.' or '-'), it creates a stunning retro text-based replica of your image.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Creative Uses for ASCII Art</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Source Code Comments:</strong> Paste your company logo directly into your code comments or terminal interfaces.</li>
          <li><strong>Social Media:</strong> Share unique, text-based art in forums or platforms that don't support image uploads.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "What types of images work best?",
        answer: "Images with high contrast, simple subjects, and minimal background clutter produce the cleanest and most recognizable ASCII art."
      }
    ]
  },
  aiImageToText: {
    title: "How does the AI Image to Text tool work?",
    content: (
      <>
        <p>The <strong>AI Image to Text (OCR) Converter</strong> uses advanced Optical Character Recognition (OCR) to extract readable text from any image. Simply upload a screenshot, scanned document, or photograph, and our AI will instantly digitize the text.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why use an OCR tool?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Digitize Documents:</strong> Convert scanned PDFs or physical receipts into editable text formats.</li>
          <li><strong>Extract Code:</strong> Quickly copy code snippets from YouTube tutorials or screenshots without manual typing.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Does it support handwritten text?",
        answer: "Yes, our AI engine is trained to recognize clear handwriting, though printed text yields the most accurate results."
      }
    ]
  },
  jpgToWebpConverter: {
    title: "How does the JPG to WebP Converter work?",
    content: (
      <>
        <p>The <strong>JPG to WebP Converter</strong> upgrades your older JPEG images into the modern, next-generation WebP format. WebP provides superior lossless and lossy compression, drastically reducing file sizes without sacrificing visual quality.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">The Power of WebP</h3>
        <p className="mt-2">Google developed WebP specifically for the modern web. WebP images are, on average, 25-34% smaller than comparable JPEG images. By converting your site's images, you can dramatically improve your Core Web Vitals and SEO rankings.</p>
      </>
    ),
    faqs: [
      {
        question: "Do all browsers support WebP?",
        answer: "Yes, WebP is now natively supported by all major modern browsers including Chrome, Safari, Firefox, and Edge."
      }
    ]
  },
  pngToWebpConverter: {
    title: "How does the PNG to WebP Converter work?",
    content: (
      <>
        <p>The <strong>PNG to WebP Converter</strong> takes your heavy, transparent PNG files and compresses them into the highly efficient WebP format, preserving both the image quality and the transparent background (alpha channel).</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why switch from PNG to WebP?</h3>
        <p className="mt-2">While PNGs are great for transparency, their file sizes are notoriously large. WebP supports the exact same transparency features but yields file sizes that are typically 26% smaller than PNGs, making your websites load much faster.</p>
      </>
    ),
    faqs: [
      {
        question: "Will I lose the transparent background?",
        answer: "No! Unlike JPEGs, the WebP format fully supports transparent backgrounds, so your logos and icons will look exactly the same."
      }
    ]
  },
  svgToPngConverter: {
    title: "How does the SVG to PNG Converter work?",
    content: (
      <>
        <p>The <strong>SVG to PNG Converter</strong> rasterizes scalable vector graphics (SVG) into static PNG images. While SVGs are excellent for web design, many social media platforms, email clients, and older software do not support uploading SVG files.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">When to use a PNG over an SVG</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Social Media Sharing:</strong> Platforms like Twitter, Instagram, and Facebook require raster images (PNG/JPG) for uploads.</li>
          <li><strong>Email Signatures:</strong> Many email clients block SVG rendering for security reasons, making PNG the safer choice.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Will the PNG be transparent?",
        answer: "Yes, if your original SVG file had a transparent background, the resulting PNG will preserve that transparency."
      }
    ]
  },
  webpToPngConverter: {
    title: "How does the WebP to PNG Converter work?",
    content: (
      <>
        <p>The <strong>WebP to PNG Converter</strong> allows you to convert modern WebP images back into the universally compatible PNG format. This is extremely useful when dealing with older software that hasn't updated to support WebP files yet.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Compatibility Fixer</h3>
        <p className="mt-2">Have you ever downloaded an image from a website, only to find it's a `.webp` file that your image editor or presentation software refuses to open? This tool instantly converts it back into a standard PNG, complete with transparency.</p>
      </>
    ),
    faqs: [
      {
        question: "Is this a lossless conversion?",
        answer: "Yes, converting from WebP to PNG does not degrade the visual quality of the image."
      }
    ]
  },
  webpToJpgConverter: {
    title: "How does the WebP to JPG Converter work?",
    content: (
      <>
        <p>The <strong>WebP to JPG Converter</strong> transforms WebP files into the widely supported JPEG format. Because JPEG is the most recognized image format in the world, this ensures your image can be opened on any device, operating system, or legacy software.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Universal Compatibility</h3>
        <p className="mt-2">While WebP is great for web browsers, you might need a standard JPG if you are submitting photos to a printing service, uploading to a strict government portal, or sharing files with non-technical users.</p>
      </>
    ),
    faqs: [
      {
        question: "What happens to transparent WebP images?",
        answer: "Since JPG does not support transparency, any transparent areas in your WebP image will be flattened into a solid white background."
      }
    ]
  }
};
