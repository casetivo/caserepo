import React from "react";
import { ToolSeoContent } from "../seoContent";

export const imageToolsSeo: Record<string, ToolSeoContent> = {
  jpgToPngConverter: {
    title: "How does the JPG to PNG Converter work?",
    content: (
      <>
        <p>The <strong>JPG to PNG Converter</strong> decodes your JPEG image in the browser and re-saves every pixel as a PNG file at the same width and height. Nothing is uploaded: the conversion happens on your device using the browser's built-in canvas, so it works offline once the page has loaded.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to convert JPG to PNG</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Drop a .jpg or .jpeg file into the upload area, or click to choose one.</li>
          <li>Click <strong>Convert</strong>.</li>
          <li>Preview the result and click <strong>Download</strong> to save the PNG.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why convert JPG to PNG?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Edit without further loss:</strong> PNG is lossless. Every time you re-save a JPG it loses a little more detail; a PNG can be edited and saved repeatedly without new compression damage.</li>
          <li><strong>Prepare for transparency:</strong> JPG cannot store transparent pixels. Converting to PNG first lets you remove the background in an image editor and keep the transparency.</li>
          <li><strong>Meet upload requirements:</strong> Some apps, design tools, and forms only accept PNG.</li>
        </ul>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">What to expect</h3>
        <p className="mt-2">The PNG will usually be <strong>larger</strong> than the original JPG, often several times larger for photos, because PNG stores pixels without lossy compression. That is normal. If you need a small file for a website, WebP or JPG is the better choice. Converting also does not remove the background by itself: the PNG keeps the same solid background the JPG had.</p>
      </>
    ),
    faqs: [
      {
        question: "Will converting to PNG improve the image quality?",
        answer: "No. Converting a JPG to PNG cannot restore detail that JPEG compression already removed. It only prevents further quality loss when you edit and save the image again."
      },
      {
        question: "Does the PNG have a transparent background?",
        answer: "Not automatically. JPG files have no transparency, so the PNG keeps the original background. You can then remove the background in an editor and save it with transparency."
      },
      {
        question: "Why is the PNG file bigger than my JPG?",
        answer: "PNG uses lossless compression, which keeps every pixel exactly. Photos compress far less this way than with JPEG's lossy compression, so the file grows."
      },
      {
        question: "Is my image uploaded anywhere?",
        answer: "No. The image is converted locally in your browser and never sent to a server."
      }
    ]
  },
  pngToJpgConverter: {
    title: "How does the PNG to JPG Converter work?",
    content: (
      <>
        <p>The <strong>PNG to JPG Converter</strong> turns lossless PNG images into compact JPEG files directly in your browser. The image is drawn onto a white background and saved as a JPG at 92% quality, a setting that keeps photos visually sharp while cutting file size considerably.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to convert PNG to JPG</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Drop a .png file into the upload area, or click to choose one.</li>
          <li>Click <strong>Convert</strong>.</li>
          <li>Check the preview and click <strong>Download</strong> to save the JPG.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">When JPG is the better format</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Photos and screenshots of photos:</strong> JPEG compression is designed for continuous-tone images and produces much smaller files than PNG for them.</li>
          <li><strong>Email and upload limits:</strong> Smaller JPGs are easier to attach and fit size limits on forms and portals.</li>
          <li><strong>Maximum compatibility:</strong> JPG opens in virtually every app, device, and print service.</li>
        </ul>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">When to keep the PNG</h3>
        <p className="mt-2">Keep PNG for logos, icons, line art, and images with text. JPEG compression can add soft halos around sharp edges and flat colors, and it cannot store transparency. How much smaller the JPG gets depends on the image: large photos shrink a lot, while simple graphics may barely change.</p>
      </>
    ),
    faqs: [
      {
        question: "What happens to the transparent background?",
        answer: "JPG does not support transparency, so transparent areas are filled with solid white during conversion."
      },
      {
        question: "What quality setting is used?",
        answer: "The JPG is saved at 92% quality, which is visually close to the original for most photos while producing a much smaller file."
      },
      {
        question: "Can I convert the JPG back to PNG without loss?",
        answer: "You can convert it back, but the detail removed by JPEG compression is gone. Keep your original PNG if you may need it later."
      }
    ]
  },
  asciiArtGenerator: {
    title: "How does the ASCII Art Generator work?",
    content: (
      <>
        <p>The <strong>ASCII Art Generator</strong> recreates your image using plain text characters. It shrinks the image to at most 100 characters wide, measures the brightness of each spot, and swaps it for a character from a ten-step ramp: dense characters like <code>@</code> and <code>%</code> for dark areas, and light ones like <code>.</code> and spaces for bright areas.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to make ASCII art from an image</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Upload a PNG, JPG, WebP, or other image.</li>
          <li>Click <strong>Generate</strong>.</li>
          <li>Select the text output and copy it into a code comment, README, terminal, or chat.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Tips for better results</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Use high contrast:</strong> Bold shapes, silhouettes, and logos work best. Low-contrast photos turn into a uniform grey of characters.</li>
          <li><strong>Crop tightly:</strong> With only 100 characters of width, fine background detail disappears, so crop to the subject first.</li>
          <li><strong>Use a monospaced font:</strong> ASCII art only lines up in fonts where every character has the same width, such as code editors and terminals.</li>
        </ul>
        <p className="mt-2">Rows are generated at half the image's height because text characters are roughly twice as tall as they are wide, which keeps the proportions close to the original.</p>
      </>
    ),
    faqs: [
      {
        question: "What types of images work best?",
        answer: "Images with high contrast, a clear subject, and a simple background produce the most recognizable ASCII art."
      },
      {
        question: "Why does my ASCII art look stretched or squashed?",
        answer: "It is designed for monospaced fonts. In proportional fonts, characters have different widths and the image distorts. Paste it into a code block or terminal."
      },
      {
        question: "Is the output in color?",
        answer: "No. The generator produces plain-text ASCII art based on brightness only, so it can be pasted anywhere text is accepted."
      }
    ]
  },
  aiImageToText: {
    title: "How does the AI Image to Text tool work?",
    content: (
      <>
        <p>The <strong>AI Image to Text Converter</strong> uses Optical Character Recognition (OCR) to turn the text inside an image into editable, copyable text. It runs the open-source Tesseract engine, which uses an LSTM neural network to recognize lines of text. Everything happens in your browser: the image is never uploaded to a server.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to extract text from an image</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Choose the language the text is written in.</li>
          <li>Drop a PNG, JPG, WebP, BMP, or GIF image into the upload area, or click to pick a file.</li>
          <li>Click <strong>Extract</strong>. The recognized text appears below the image, ready to select and copy.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">What it works best on</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Screenshots:</strong> Copy text from error messages, chat logs, slides, or code shown in a video.</li>
          <li><strong>Scanned documents:</strong> Digitize printed letters, receipts, and book pages so you can edit or search them.</li>
          <li><strong>Photos of printed text:</strong> Signs, labels, and posters photographed straight on and in good light.</li>
        </ul>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Tips for better accuracy</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the sharpest, highest-resolution image you have. Text should be at least 10–12 pixels tall.</li>
          <li>Crop away backgrounds, photos, and decorations so only the text remains.</li>
          <li>Prefer dark text on a light, even background. Shadows, glare, and tilted pages lower accuracy.</li>
          <li>Pick the correct language. Recognizing French text with the English model will miss accents and special letters.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Is my image uploaded to a server?",
        answer: "No. Text recognition runs locally in your browser. The image never leaves your device. The only download is the OCR engine and language data, which your browser caches after the first use."
      },
      {
        question: "Does it support handwritten text?",
        answer: "Only partly. The engine is trained on printed text, so neat block capitals may work, but cursive and messy handwriting usually produce poor results."
      },
      {
        question: "Which languages are supported?",
        answer: "English, Spanish, French, German, Portuguese, Italian, Dutch, Polish, Turkish, Hindi, Arabic, and Urdu. Select the language before extracting for the best results."
      },
      {
        question: "Why is the first extraction slower?",
        answer: "The first time you use a language, your browser downloads the OCR engine and that language's data, which takes a few seconds. Later extractions reuse the cached files and start faster."
      },
      {
        question: "Can I extract text from a PDF?",
        answer: "Not directly. Take a screenshot of the PDF page, or export the page as a PNG or JPG, then upload that image."
      }
    ]
  },
  jpgToWebpConverter: {
    title: "How does the JPG to WebP Converter work?",
    content: (
      <>
        <p>The <strong>JPG to WebP Converter</strong> re-encodes JPEG images as WebP, the image format Google designed for the web. The conversion runs in your browser at 92% quality, and the image is never uploaded.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to convert JPG to WebP</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Drop a .jpg or .jpeg file into the upload area, or click to choose one.</li>
          <li>Click <strong>Convert</strong>.</li>
          <li>Download the WebP file.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why use WebP on a website?</h3>
        <p className="mt-2">Google&apos;s own comparison found lossy WebP files are about 25–34% smaller than JPEGs of similar visual quality. Smaller images download faster, which helps page speed metrics such as Largest Contentful Paint, especially on mobile connections.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Things to know before converting</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Savings vary:</strong> A JPG that is already heavily compressed may not shrink much, and re-encoding a lossy image always loses a little detail. Start from the highest-quality original you have.</li>
          <li><strong>Keep a fallback if needed:</strong> All current major browsers display WebP, but some older desktop software, email clients, and print services still expect JPG.</li>
          <li><strong>Browser encoding support:</strong> If your browser cannot encode WebP, it returns a PNG instead. Chrome, Edge, and Firefox all encode WebP.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Do all browsers support WebP?",
        answer: "All current versions of Chrome, Edge, Firefox, Safari, and Opera can display WebP images. Very old browsers and some desktop apps cannot."
      },
      {
        question: "Will the WebP look worse than my JPG?",
        answer: "At the 92% quality used here, the difference is usually not visible. Because both formats are lossy, a small amount of detail is lost in each conversion."
      },
      {
        question: "Is my image uploaded to a server?",
        answer: "No. The conversion happens entirely in your browser."
      }
    ]
  },
  pngToWebpConverter: {
    title: "How does the PNG to WebP Converter work?",
    content: (
      <>
        <p>The <strong>PNG to WebP Converter</strong> compresses PNG images into WebP while keeping transparent areas transparent. It runs in your browser, saves the result at 92% quality, and never uploads your image.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to convert PNG to WebP</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Drop a .png file into the upload area, or click to choose one.</li>
          <li>Click <strong>Convert</strong>.</li>
          <li>Download the WebP file.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why switch from PNG to WebP?</h3>
        <p className="mt-2">PNG is lossless, which makes screenshots, illustrations, and transparent graphics heavy. WebP supports the same alpha transparency but can compress far more aggressively. This tool uses lossy WebP, so the files are usually much smaller than the PNG, which makes it a good fit for website images, product photos with cut-out backgrounds, and large screenshots.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">When to keep the PNG</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Pixel-perfect assets:</strong> Lossy compression can soften very small text and one-pixel lines. Keep PNG for UI sprites and tiny icons.</li>
          <li><strong>Editing masters:</strong> Keep the original PNG as your editable source and publish the WebP copy.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Will I lose the transparent background?",
        answer: "No. WebP supports transparency, so transparent areas stay transparent after conversion."
      },
      {
        question: "Is the conversion lossless?",
        answer: "No. This tool saves lossy WebP at 92% quality to keep files small. For most images the difference is not visible, but keep your PNG if you need an exact copy."
      },
      {
        question: "Why didn't my file get smaller?",
        answer: "Very small or already optimized PNGs, such as simple icons, may not shrink much. Large screenshots and photos usually see the biggest savings."
      }
    ]
  },
  svgToPngConverter: {
    title: "How does the SVG to PNG Converter work?",
    content: (
      <>
        <p>The <strong>SVG to PNG Converter</strong> rasterizes a vector SVG file into a PNG image in your browser. The SVG is rendered at the width and height defined in the file and saved as a lossless PNG, keeping any transparent background.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to convert SVG to PNG</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Drop an .svg file into the upload area, or click to choose one.</li>
          <li>Click <strong>Convert</strong>.</li>
          <li>Download the PNG.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">When you need a PNG instead of an SVG</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Social media:</strong> Most platforms reject SVG uploads and require PNG or JPG.</li>
          <li><strong>Email signatures and documents:</strong> Many email clients and office apps do not display SVG reliably.</li>
          <li><strong>Favicons and app stores:</strong> Many icon slots require fixed-size raster images.</li>
        </ul>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Tips for a clean result</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Set the size in the SVG:</strong> The PNG uses the SVG&apos;s own <code>width</code> and <code>height</code>. To get a larger PNG, increase those values in the file before converting.</li>
          <li><strong>Embed fonts and images:</strong> For security, browsers do not load external fonts or linked images when rendering an SVG this way. Convert text to outlines and embed images to make sure they appear.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Will the PNG be transparent?",
        answer: "Yes. If the SVG has a transparent background, the PNG keeps that transparency."
      },
      {
        question: "Why is my PNG small or blurry?",
        answer: "The PNG is rendered at the size defined in the SVG. Increase the SVG's width and height attributes, then convert again for a higher-resolution PNG."
      },
      {
        question: "Why is text or an image missing from the PNG?",
        answer: "External fonts and linked images are not loaded when the SVG is rendered. Convert text to paths and embed images directly in the SVG."
      }
    ]
  },
  webpToPngConverter: {
    title: "How does the WebP to PNG Converter work?",
    content: (
      <>
        <p>The <strong>WebP to PNG Converter</strong> turns WebP images into universally supported PNG files in your browser. The image keeps its original dimensions and any transparency, and it is never uploaded to a server.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to convert WebP to PNG</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Drop a .webp file into the upload area, or click to choose one.</li>
          <li>Click <strong>Convert</strong>.</li>
          <li>Download the PNG.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why convert WebP to PNG?</h3>
        <p className="mt-2">Images saved from websites are often WebP, and some image editors, presentation apps, and upload forms still refuse to open them. PNG works almost everywhere and keeps transparent backgrounds, which makes it the safest choice for logos, stickers, and graphics you want to edit.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">What to expect</h3>
        <p className="mt-2">PNG is lossless, so the conversion adds no new compression artifacts. It cannot remove artifacts that a lossy WebP already had, and the PNG file will usually be larger than the WebP. If you need a smaller file and do not need transparency, use the WebP to JPG converter instead.</p>
      </>
    ),
    faqs: [
      {
        question: "Is this a lossless conversion?",
        answer: "The PNG is saved losslessly, so no additional quality is lost. Any detail already removed by lossy WebP compression stays missing."
      },
      {
        question: "Is transparency preserved?",
        answer: "Yes. Transparent areas in the WebP remain transparent in the PNG."
      },
      {
        question: "Why is the PNG bigger than the WebP?",
        answer: "WebP is designed for small files, while PNG stores every pixel without lossy compression. A larger PNG is expected."
      }
    ]
  },
  webpToJpgConverter: {
    title: "How does the WebP to JPG Converter work?",
    content: (
      <>
        <p>The <strong>WebP to JPG Converter</strong> converts WebP images into the JPEG format that every device and app can open. It runs in your browser, flattens any transparency onto a white background, and saves the result at 92% quality.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">How to convert WebP to JPG</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Drop a .webp file into the upload area, or click to choose one.</li>
          <li>Click <strong>Convert</strong>.</li>
          <li>Download the JPG.</li>
        </ol>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">When you need a JPG</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Printing services:</strong> Photo labs and print shops commonly require JPG.</li>
          <li><strong>Strict upload forms:</strong> Government, job, and school portals often accept only JPG or JPEG.</li>
          <li><strong>Sharing with anyone:</strong> JPG opens on every phone, computer, and photo viewer without extra software.</li>
        </ul>
        <p className="mt-2">For photos, the JPG will usually be similar in size to the WebP or slightly larger. Because both formats are lossy, convert from the original WebP once rather than converting back and forth.</p>
      </>
    ),
    faqs: [
      {
        question: "What happens to transparent WebP images?",
        answer: "JPG does not support transparency, so transparent areas are flattened onto a solid white background."
      },
      {
        question: "What quality setting is used?",
        answer: "The JPG is saved at 92% quality, which keeps photos visually close to the original."
      },
      {
        question: "Can I convert animated WebP files?",
        answer: "Only a single frame is converted, because JPG cannot store animation."
      }
    ]
  }
};
