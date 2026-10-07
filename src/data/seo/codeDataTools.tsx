import React from "react";
import { ToolSeoContent } from "../seoContent";

export const codeDataToolsSeo: Record<string, ToolSeoContent> = {
  jsonFormatter: {
    title: "Complete Guide to JSON Formatting and Validation",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">What is JSON and Why Format It?</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>JSON (JavaScript Object Notation)</strong> is the undisputed standard for data exchange on the modern web. It is a lightweight, text-based data format that is easy for humans to read and write, and easy for machines to parse and generate. Whether you are building a REST API, configuring a web server, or passing data between microservices, you are using JSON.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            However, when servers transmit JSON, they typically <strong>minify</strong> it to save bandwidth. Minification removes all spaces, tabs, and line breaks, resulting in a single, massive block of text. While this is great for computer networks, it is impossible for a human developer to read or debug. That is where our <strong>JSON Formatter and Validator</strong> comes in. By pasting your minified JSON into our tool, it instantly restructures the data with proper indentation, color-coding, and collapsible nodes, allowing you to visually inspect complex nested objects and arrays.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Validating JSON Syntax</h3>
          <p className="mb-3 text-muted-foreground">JSON syntax is notoriously strict. A single missing comma or unescaped quote will crash your application. Our built-in JSON validator helps you catch these errors instantly before they reach production. Common JSON errors include:</p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Trailing Commas:</strong> Placing a comma after the last item in an array or object is illegal in JSON.</li>
            <li><strong>Missing Quotes:</strong> All keys (property names) must be wrapped in double quotes. Single quotes are not allowed.</li>
            <li><strong>Unescaped Characters:</strong> Strings containing quotes, backslashes, or control characters must be properly escaped.</li>
            <li><strong>Mismatched Brackets:</strong> Forgetting to close an object or an array.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">How to Use the JSON Formatter</h3>
          <p className="mb-3 text-muted-foreground">Using our tool is incredibly straightforward and designed for developer workflows:</p>
          <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
            <li><strong>Paste:</strong> Copy your raw JSON payload from your API client, terminal, or log file and paste it into the left panel.</li>
            <li><strong>Format:</strong> Click the "Format" button. The tool will instantly parse the data and apply a standard indentation.</li>
            <li><strong>Inspect &amp; Fix:</strong> If the JSON is invalid, the tool will highlight the exact line and character where the syntax error occurred.</li>
            <li><strong>Copy or Download:</strong> Once formatted, you can copy the clean JSON back to your clipboard or download it for local storage.</li>
          </ol>
        </section>
      </div>
    ),
    faqs: [
      {
        question: "Is this JSON Formatter secure?",
        answer: "Yes, 100% secure. All JSON parsing, validation, and formatting happens locally in your web browser using JavaScript. We never send your data to our servers, meaning you can safely format sensitive API payloads containing API keys or PII."
      },
      {
        question: "Can I minify JSON with this tool?",
        answer: "Yes! In addition to beautifying JSON, you can switch to 'minify' mode. This strips all unnecessary whitespace and line breaks, giving you the most compact string possible for production deployment."
      },
      {
        question: "What is the maximum file size?",
        answer: "Because processing happens in your browser, the limit depends on your device's memory. Most modern browsers can easily format JSON payloads up to 10MB or 20MB without freezing."
      },
      {
        question: "Does it support JSON Lines (JSONL)?",
        answer: "Currently, the formatter expects a single, valid JSON object or array. JSONL (where each line is a separate JSON object) must be formatted line by line, or wrapped in a standard array bracket first."
      },
      {
        question: "How does the validator find errors?",
        answer: "The validator attempts to parse your input using strict ECMA-404 JSON standards. If parsing fails, it catches the exception and highlights the syntax error location."
      }
    ]
  },
  base64EncoderDecoder: {
    title: "Complete Guide to Base64 Encoding and Decoding",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">What is Base64 Encoding?</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Base64</strong> is a group of similar binary-to-text encoding schemes that represent binary data in an ASCII string format by translating it into a radix-64 representation. In simpler terms, it takes binary data (like images, compiled code, or special characters) and turns it into plain text consisting only of standard letters, numbers, and a few safe symbols (+, /, and =).
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            This is necessary because many legacy communication protocols, such as HTTP headers or email (SMTP), are designed to handle only standard text. If you try to send raw binary data through these systems, the data can become corrupted. Base64 acts as a protective wrapper.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Common Developer Use Cases</h3>
          <p className="mb-3 text-muted-foreground">Base64 is a fundamental utility in web development. Common use cases include:</p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Data URIs for Images:</strong> You can convert a small icon or image into a Base64 string and embed it directly into your HTML or CSS. This reduces the number of HTTP requests your website makes, potentially improving load times.</li>
            <li><strong>Basic Authentication:</strong> When sending credentials via HTTP Basic Auth, the username and password must be combined with a colon and encoded into Base64 before being sent in the header.</li>
            <li><strong>JSON Web Tokens (JWT):</strong> The header and payload of a JWT are encoded in Base64 (specifically Base64Url) to ensure they can be safely transmitted in URLs and HTTP headers.</li>
            <li><strong>Storing Complex Data:</strong> Sometimes databases or JSON payloads struggle with special characters or binary blobs. Encoding them to Base64 ensures safe storage and retrieval.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Base64 is NOT Encryption</h3>
          <p className="mb-3 text-muted-foreground">
            A common beginner mistake is using Base64 to "hide" or "secure" data, such as passwords or sensitive API keys. <strong>Base64 provides absolutely no security.</strong> It is merely an encoding format. Anyone who intercepts a Base64 string can instantly decode it back to its original form using a tool like this one. Always use proper encryption (like AES) or hashing (like bcrypt) for security.
          </p>
        </section>
      </div>
    ),
    faqs: [
      {
        question: "Is Base64 encryption?",
        answer: "No, Base64 is an encoding scheme, not encryption. It is used to format data to survive transport, but it does not securely hide the data. Anyone can decode it."
      },
      {
        question: "Does it support UTF-8 characters?",
        answer: "Yes, our tool safely encodes and decodes UTF-8 characters (like emojis, Cyrillic, or Asian characters) by properly buffering the string before encoding."
      },
      {
        question: "Why does Base64 end in equals signs (=)?",
        answer: "The equals sign (=) is used for padding. Base64 encodes data in 3-byte chunks. If the data being encoded doesn't divide evenly by 3, the output is padded with one or two '=' signs to ensure the final string length is a multiple of 4."
      },
      {
        question: "Does encoding increase file size?",
        answer: "Yes. Base64 encoding increases the size of the original data by approximately 33%. This is why you should only use it for small files (like icons) and not large images or videos."
      }
    ]
  },
  binaryCodeTranslator: {
    title: "How does the Binary Code Translator work?",
    content: (
      <>
        <p>The <strong>Binary Code Translator</strong> instantly converts readable text into binary code (1s and 0s) and translates binary code back into human-readable text. It maps each character to its corresponding 8-bit ASCII or UTF-8 binary value.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why translate to Binary?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Computer Science Education:</strong> Learn how computers natively process and store text data.</li>
          <li><strong>Puzzles and Games:</strong> Hide secret messages or easter eggs in your code or ARG campaigns.</li>
          <li><strong>Debugging:</strong> Inspect raw binary outputs from low-level systems.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "What is binary code?",
        answer: "Binary is a base-2 numeral system that represents data using only two symbols: 0 and 1. It is the fundamental language of computers."
      },
      {
        question: "Does this tool use ASCII?",
        answer: "Yes, standard letters are translated using their 8-bit ASCII representations. It also supports extended UTF-8 characters."
      }
    ]
  },
  urlEncoderDecoder: {
    title: "Complete Guide to URL Encoding (Percent-Encoding)",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">What is URL Encoding?</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>URL Encoding</strong>, officially known as Percent-Encoding, is a mechanism used to encode information in a Uniform Resource Identifier (URI). The Internet operates on strict protocols, and URLs can only be transmitted over the Internet using the US-ASCII character set.
          </p>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            If your URL contains characters outside the ASCII set (like emojis or foreign languages), or if it contains "reserved" characters that have special meaning in URLs (like spaces, `&`, `=`, `?`, or `#`), those characters must be converted into a valid ASCII format. This tool instantly performs that conversion.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Reserved vs Unreserved Characters</h3>
          <p className="mb-3 text-muted-foreground">When dealing with URLs, characters are divided into two groups:</p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Unreserved Characters:</strong> Letters (`A-Z`, `a-z`), numbers (`0-9`), hyphens (`-`), underscores (`_`), periods (`.`), and tildes (`~`). These do <strong>not</strong> need to be encoded.</li>
            <li><strong>Reserved Characters:</strong> Characters like `! * ' ( ) ; : @ & = + $ , / ? % # [ ]`. These characters serve specific structural purposes in a URL (e.g., `?` starts a query string, `&` separates parameters). If you want to pass these characters as <em>data</em> rather than structure, they must be percent-encoded.</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">How Percent-Encoding Works</h3>
          <p className="mb-3 text-muted-foreground">
            When a character is encoded, it is replaced by a percent sign `%` followed by its two-digit hexadecimal equivalent. For example:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>A space ` ` becomes `%20` (or `+` in query strings)</li>
            <li>An ampersand `&` becomes `%26`</li>
            <li>An equals sign `=` becomes `%3D`</li>
            <li>A question mark `?` becomes `%3F`</li>
          </ul>
        </section>
      </div>
    ),
    faqs: [
      {
        question: "What is percent-encoding?",
        answer: "Percent-encoding is another name for URL encoding. It involves replacing unsafe characters with a '%' followed by their two-digit hexadecimal equivalent."
      },
      {
        question: "When should I use URL decoding?",
        answer: "Use URL decoding when you have a messy URL filled with '%20' and '%3D' and you want to extract the readable parameters, text, or query strings to understand what data is being passed."
      },
      {
        question: "How are spaces handled?",
        answer: "Spaces are typically encoded as '%20'. In some specific contexts, like form data submissions (application/x-www-form-urlencoded), spaces are encoded as a plus sign (+)."
      },
      {
        question: "Is URL encoding the same as HTML encoding?",
        answer: "No. HTML encoding replaces characters like '<' and '>' with entities like '&lt;' and '&gt;' so they display correctly on a webpage. URL encoding replaces them with '%3C' and '%3E' so they can be transmitted over HTTP."
      }
    ]
  },
  csvToJsonConverter: {
    title: "How does the CSV to JSON Converter work?",
    content: (
      <>
        <p>The <strong>CSV to JSON Converter</strong> is a robust data transformation tool that takes tabular CSV (Comma Separated Values) data and parses it into a structured array of JSON objects.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Simplifying Data Migration</h3>
        <p className="mt-2">If you have exported a spreadsheet from Excel, Google Sheets, or a database dump, you usually get a CSV file. If you need to feed that data into a modern web API or a JavaScript application, JSON is required. This tool bridges that gap instantly.</p>
      </>
    ),
    faqs: [
      {
        question: "Does the first row need to be headers?",
        answer: "Yes, standard CSV to JSON conversion assumes the first row contains the column names. These names become the keys in the resulting JSON objects."
      },
      {
        question: "Can it handle commas inside quotes?",
        answer: "Yes, our parser is designed to respect standard CSV escaping rules, so commas inside quotes will not break your columns."
      }
    ]
  },
  cssFormatter: {
    title: "How does the CSS Formatter work?",
    content: (
      <>
        <p>The <strong>CSS Formatter and Beautifier</strong> is a utility that takes compressed or poorly formatted CSS code and reformats it with proper indentation, line breaks, and spacing. This makes the code readable for humans and much easier to debug.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Minify vs Beautify</h3>
        <p className="mt-2">Developers often 'minify' their CSS (remove all spaces and line breaks) before publishing a website to make it load faster. However, if you need to edit minified CSS, it is nearly impossible. This tool 'un-minifies' (beautifies) it so you can understand the styling rules again.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it support SCSS or LESS?",
        answer: "This specific tool is optimized for standard CSS. If you have nested SCSS, you should use our dedicated SCSS Formatter."
      }
    ]
  },
  caesarCipherTool: {
    title: "How does the Caesar Cipher Tool work?",
    content: (
      <>
        <p>The <strong>Caesar Cipher Tool</strong> encrypts and decrypts text using one of the oldest and simplest methods of encryption: a substitution cipher where each letter in the text is shifted a certain number of places down the alphabet.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">The History of the Cipher</h3>
        <p className="mt-2">Named after Julius Caesar, who used it to communicate with his generals, this cipher shifts letters by a fixed amount. For example, with a shift of 1, 'A' becomes 'B', and 'B' becomes 'C'. It is a fantastic educational tool for learning the basics of cryptography.</p>
      </>
    ),
    faqs: [
      {
        question: "Is the Caesar Cipher secure?",
        answer: "No, by modern standards it is extremely easy to crack (since there are only 25 possible shifts). It should only be used for puzzles, games, and education, never for securing real data."
      }
    ]
  },
  graphqlFormatter: {
    title: "How does the GraphQL Formatter work?",
    content: (
      <>
        <p>The <strong>GraphQL Formatter</strong> instantly organizes complex GraphQL queries and mutations into clean, readable, and properly indented code. It parses the query syntax to ensure deeply nested fields are visually separated.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why format GraphQL?</h3>
        <p className="mt-2">When copying queries from browser network tabs or log files, they are often compressed into a single, massive line of text. Pasting them into this tool makes it easy to understand exactly what data is being requested or modified.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it validate the GraphQL schema?",
        answer: "This tool focuses on syntax formatting. It ensures your braces and fields are structured correctly, but it cannot verify if the fields actually exist on your specific server."
      }
    ]
  },
  htmlFormatter: {
    title: "How does the HTML Formatter work?",
    content: (
      <>
        <p>The <strong>HTML Formatter & Beautifier</strong> takes messy, unindented HTML code and restructures it into a clean, hierarchical format. By adding proper indentation to nested tags, it makes the Document Object Model (DOM) easy to read.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Clean Up Your Code</h3>
        <p className="mt-2">Whether you are a student learning web development, or a senior engineer inspecting minified source code from a live website, this tool instantly restores readability to any block of HTML.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it format inline CSS and JavaScript?",
        answer: "Yes, it intelligently formats the contents of <style> and <script> tags within your HTML document as well."
      }
    ]
  },
  hexToTextConverter: {
    title: "How does the Hex to Text Converter work?",
    content: (
      <>
        <p>The <strong>Hex to Text Converter</strong> translates hexadecimal code (base-16 numeral system) back into human-readable ASCII or UTF-8 text, and vice versa. It is a critical tool for developers working with raw byte data.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">What is Hexadecimal?</h3>
        <p className="mt-2">Computers store data in binary (1s and 0s), but binary is very long and hard for humans to read. Hexadecimal uses 16 symbols (0-9 and A-F) to represent data more compactly. This tool bridges the gap between machine data and readable text.</p>
      </>
    ),
    faqs: [
      {
        question: "Can it decode hex with spaces?",
        answer: "Yes, the tool automatically ignores spaces, commas, and '0x' prefixes when decoding hexadecimal strings."
      }
    ]
  },
  markdownToHtmlConverter: {
    title: "How does the Markdown to HTML Converter work?",
    content: (
      <>
        <p>The <strong>Markdown to HTML Converter</strong> instantly parses your Markdown syntax (like `**bold**` or `# headings`) and compiles it into valid HTML5 code that can be embedded into any website.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why write in Markdown?</h3>
        <p className="mt-2">Markdown is much faster to write than raw HTML because you don't have to type opening and closing tags. You can draft your blog posts, documentation, and readmes in plain text, then use this tool to generate the HTML required for the web.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it support GitHub Flavored Markdown (GFM)?",
        answer: "Yes, it supports standard Markdown as well as modern extensions like tables, strikethroughs, and task lists."
      }
    ]
  },
  jsonStringifier: {
    title: "How does the JSON Stringifier work?",
    content: (
      <>
        <p>The <strong>JSON Stringifier</strong> takes a valid JSON object and converts it into a single-line, properly escaped string. This is essential when you need to embed JSON data inside another JSON payload, a bash script, or an environment variable.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Escaping Quotes</h3>
        <p className="mt-2">When you stringify JSON, all the internal double quotes must be 'escaped' using backslashes (`\"`) so the computer doesn't think the string has ended prematurely. This tool automates that tedious and error-prone process.</p>
      </>
    ),
    faqs: [
      {
        question: "What is the difference between this and minifying JSON?",
        answer: "Minifying removes whitespace. Stringifying goes a step further by escaping internal quotes and wrapping the entire payload in a string format."
      }
    ]
  },
  jsonToYamlConverter: {
    title: "How does the JSON to YAML Converter work?",
    content: (
      <>
        <p>The <strong>JSON to YAML Converter</strong> seamlessly translates data between JSON (JavaScript Object Notation) and YAML (YAML Ain't Markup Language). YAML is widely used for configuration files in modern DevOps tools.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why convert to YAML?</h3>
        <p className="mt-2">While JSON is great for APIs, it is very strict with quotes and brackets. YAML relies on indentation, making it much easier for humans to read and write. Tools like Docker, Kubernetes, and GitHub Actions all rely heavily on YAML.</p>
      </>
    ),
    faqs: [
      {
        question: "Can I convert YAML back to JSON?",
        answer: "Yes, the tool is bidirectional. You can paste YAML code to instantly generate the equivalent JSON object."
      }
    ]
  },
  jsonStringifyTextGenerator: {
    title: "How does the JSON Stringify Text Generator work?",
    content: (
      <>
        <p>The <strong>JSON Stringify Text Generator</strong> takes raw, unformatted text (like a multiline essay or block of code) and converts it into a safely escaped string that can be inserted directly into a JSON object without breaking the syntax.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Handling Newlines</h3>
        <p className="mt-2">If you try to paste a paragraph with line breaks directly into a JSON value, your JSON will break. This tool converts all physical line breaks into literal `\n` characters, and escapes all quotes, ensuring your JSON remains valid.</p>
      </>
    ),
    faqs: [
      {
        question: "Why do my line breaks disappear?",
        answer: "In JSON, physical line breaks are illegal inside strings. They must be represented by the escape sequence '\\n'."
      }
    ]
  },
  javascriptFormatter: {
    title: "How does the JavaScript Formatter work?",
    content: (
      <>
        <p>The <strong>JavaScript Formatter & Beautifier</strong> reorganizes messy, minified, or obfusticated JavaScript code into a clean, human-readable format. It automatically adds proper indentation, line breaks, and spacing according to standard coding conventions.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Debugging Made Easy</h3>
        <p className="mt-2">When analyzing third-party libraries or debugging production code, JavaScript is usually minified into a single line. This tool parses the syntax tree and un-minifies the code, making it infinitely easier to read, audit, and debug.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it support modern ES6+ syntax?",
        answer: "Yes, the formatter fully supports modern JavaScript features including arrow functions, async/await, and destructuring."
      }
    ]
  },
  md5HashGenerator: {
    title: "How does the MD5 Hash Generator work?",
    content: (
      <>
        <p>The <strong>MD5 Hash Generator</strong> uses the MD5 message-digest algorithm to convert any string of text into a fixed 128-bit (32-character) hexadecimal hash. This tool is frequently used for data integrity verification and legacy database work.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">File Checksums</h3>
        <p className="mt-2">MD5 hashes are commonly used as checksums to verify that a file has not been altered or corrupted during download. By generating a hash of a string, you can instantly compare it against an expected value to ensure exact data match.</p>
      </>
    ),
    faqs: [
      {
        question: "Is MD5 secure for passwords?",
        answer: "No! MD5 is considered cryptographically broken and vulnerable to collision and rainbow table attacks. Modern applications should use bcrypt or Argon2 for passwords."
      }
    ]
  },
  markdownFormatterPreviewer: {
    title: "How does the Markdown Formatter & Previewer work?",
    content: (
      <>
        <p>The <strong>Markdown Formatter & Previewer</strong> provides a split-screen interface where you can write raw Markdown on one side and see a live, styled HTML preview on the other. It also automatically formats messy markdown syntax.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Perfect for READMEs</h3>
        <p className="mt-2">Writing a README.md file for a GitHub repository can be tedious because you have to commit and push the file just to see if your tables and formatting look correct. This tool allows you to write and preview everything instantly in your browser.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it support syntax highlighting in code blocks?",
        answer: "Yes, the previewer supports standard markdown code fences (```) and renders them with proper code styling."
      }
    ]
  },
  markdownTableGenerator: {
    title: "How does the Markdown Table Generator work?",
    content: (
      <>
        <p>The <strong>Markdown Table Generator</strong> takes raw tabular data (like CSV or copy-pasted Excel cells) and automatically generates the complex pipe-and-dash syntax `(|---|)` required to render a table in Markdown.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Stop Typing Pipes Manually</h3>
        <p className="mt-2">Creating Markdown tables by hand is notoriously frustrating. Aligning the pipes and hyphens takes forever. This tool does the heavy lifting for you, creating perfectly aligned, GitHub-flavored markdown tables in a fraction of a second.</p>
      </>
    ),
    faqs: [
      {
        question: "Can I paste directly from Excel?",
        answer: "Yes! By using the 'tab' delimiter setting, you can paste cells directly from Excel or Google Sheets, and it will instantly convert to a Markdown table."
      }
    ]
  },
  morseCodeTranslator: {
    title: "How does the Morse Code Translator work?",
    content: (
      <>
        <p>The <strong>Morse Code Translator</strong> converts standard text into Morse Code (dots and dashes) and decodes Morse Code back into English. It maps standard alphanumeric characters to their internationally recognized sequences.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">A Historical Communication Tool</h3>
        <p className="mt-2">Invented in the 1830s for the telegraph, Morse Code is still used today in aviation, amateur radio, and emergency signaling (like SOS: `... --- ...`). This tool is great for education, puzzles, and escape rooms.</p>
      </>
    ),
    faqs: [
      {
        question: "How are spaces handled in Morse Code?",
        answer: "Typically, a single space separates letters, while a slash (/) or three spaces separate distinct words."
      }
    ]
  },
  numberSorter: {
    title: "How does the Number Sorter work?",
    content: (
      <>
        <p>The <strong>Number Sorter</strong> takes a messy, unsorted list of numbers and arranges them in strictly ascending (lowest to highest) or descending (highest to lowest) numerical order.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Numerical vs Alphabetical Sorting</h3>
        <p className="mt-2">Standard alphabetical sorters fail on numbers because they read '10' as coming before '2'. This specialized tool parses the input mathematically, ensuring that 2 correctly comes before 10.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it handle decimal points and negative numbers?",
        answer: "Yes, the tool uses strict numerical parsing, meaning negative numbers and floating-point decimals are sorted perfectly."
      }
    ]
  },
  rot13EncoderDecoder: {
    title: "How does the ROT13 Encoder/Decoder work?",
    content: (
      <>
        <p>The <strong>ROT13 Cipher</strong> is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet. Because there are 26 letters in the alphabet, applying ROT13 twice restores the original text.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Hiding Spoilers</h3>
        <p className="mt-2">ROT13 has been used on internet forums since the 1980s as a way to hide movie spoilers, puzzle solutions, and punchlines from a casual glance. It prevents accidental reading while allowing anyone who wants to know the answer to easily decode it.</p>
      </>
    ),
    faqs: [
      {
        question: "Do I need a separate decoder?",
        answer: "No! Because the English alphabet has 26 letters, shifting by 13 is perfectly symmetrical. Pasting ROT13 text into the encoder will instantly decode it back to normal."
      }
    ]
  },
  regexTextTool: {
    title: "How does the Regex Text Tool work?",
    content: (
      <>
        <p>The <strong>Regex Text Tool</strong> allows developers to write powerful Regular Expressions to search, match, and replace complex patterns within a block of text. It is an indispensable utility for advanced data extraction.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Advanced Pattern Matching</h3>
        <p className="mt-2">If you need to extract all email addresses from a 10,000-word document, or find every phone number regardless of its formatting, a standard 'Find' tool won't work. By writing a Regex pattern like `{"\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b"}`, you can extract exactly what you need.</p>
      </>
    ),
    faqs: [
      {
        question: "Which Regex engine does this use?",
        answer: "The tool uses the standard JavaScript (V8) Regular Expression engine, meaning it supports lookaheads, lookbehinds, and standard ECMAScript flags."
      }
    ]
  },
  scssFormatter: {
    title: "How does the SCSS Formatter work?",
    content: (
      <>
        <p>The <strong>SCSS Formatter</strong> takes messy or unindented SCSS (Sassy CSS) code and restructures it with perfect hierarchical indentation. Because SCSS allows for deep nesting of CSS rules, proper formatting is crucial for readability.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Clean Up Your Stylesheets</h3>
        <p className="mt-2">When working on large front-end frameworks, SCSS files can become deeply nested and difficult to read if a developer forgets to indent. This tool instantly realigns the curly braces, variables, and mixins to standard styling guidelines.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it compile SCSS to CSS?",
        answer: "No, this is a formatter, not a compiler. It takes SCSS code and returns beautifully formatted SCSS code. It does not convert it into standard CSS."
      }
    ]
  }
};
