import React from "react";
import { ToolSeoContent } from "../seoContent";

export const codeDataToolsSeo: Record<string, ToolSeoContent> = {
  jsonFormatter: {
    title: "The Complete Guide to JSON: Formatting, Validation, Data Structures, and API Debugging",
    content: (
      <>
        <p>
          JSON (JavaScript Object Notation) is the undisputed lingua franca of modern software engineering. Every time a web application requests data from a REST API, a mobile app syncs offline changes, or a microservice communicates with a backend queue, structured JSON payloads travel across the network.
        </p>
        <p className="mt-3">
          However, to maximize throughput and save bandwidth, production servers strip out all whitespace, indentation, and newlines&mdash;minifying complex datasets into dense, unbroken text blocks. Casetivo&apos;s <strong>JSON Formatter &amp; Validator</strong> restructures minified payloads into clean, readable code with customizable indentation (2 spaces, 4 spaces, or tabs), pinpoints syntax errors down to the exact line and character, and enables one-click minification, all operating 100% locally within your browser.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Understanding the ECMA-404 JSON Standard</h3>
        <p>
          While JSON takes its syntactic cues from JavaScript object literals, it is governed by its own strict international standard (ECMA-404 / RFC 8259). Unlike lenient programming languages that forgive missing quotes or extra commas, JSON parsers require absolute compliance across six core primitive types:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            <strong>Objects (<code>&#123;&#125;</code>):</strong> Unordered collections of zero or more key/value pairs. Every key must be a string enclosed in standard double quotes (<code>&quot;key&quot;</code>).
          </li>
          <li>
            <strong>Arrays (<code>[]</code>):</strong> Ordered sequences of zero or more values separated by commas.
          </li>
          <li>
            <strong>Strings:</strong> Sequences of zero or more Unicode characters wrapped in double quotes. Characters like double quotes and backslashes must be escaped with a backslash (<code>\&quot;</code> and <code>\\</code>).
          </li>
          <li>
            <strong>Numbers:</strong> Integer and floating-point values (e.g. <code>42</code>, <code>3.1415</code>, <code>-10</code>, <code>1.2e5</code>). Octal numbers with leading zeros (e.g. <code>042</code>) are explicitly forbidden.
          </li>
          <li>
            <strong>Booleans:</strong> Literal lowercase <code>true</code> or <code>false</code>.
          </li>
          <li>
            <strong>Null:</strong> Literal lowercase <code>null</code> representing an empty or non-existent value.
          </li>
        </ul>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The 4 Syntax Traps That Crash Production APIs</h3>
        <p>
          More than 90% of invalid JSON issues stem from four common syntax oversights:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1">1. The Trailing Comma Trap</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In JavaScript and Python dictionaries, trailing commas after the final element are standard practice. In strict JSON, a trailing comma (e.g. <code>&#123;&quot;a&quot;: 1, &quot;b&quot;: 2,&#125;</code>) will cause an immediate <code>SyntaxError: Unexpected token</code>. Our tool automatically detects and strips rogue trailing commas.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1">2. Single Quotes Instead of Double Quotes</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              JSON strictly requires double quotes (<code>&quot;</code>) for all property names and string values. Single quotes (<code>&apos;name&apos;</code>) are invalid syntax. Casetivo provides a one-click auto-fix to convert single quotes into compliant double quotes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1">3. Forbidden Code Comments</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Unlike configuration formats such as YAML or JSON5, standard JSON completely prohibits inline comments (<code>//</code>) and block comments (<code>/* */</code>). Pasting code with comments into a standard JSON parser will trigger a parsing exception.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1">4. Unescaped Quotes &amp; Line Breaks</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Raw unescaped quotes or raw newline characters inside string properties corrupt the parse tree. Strings containing quotation marks must use <code>\&quot;</code>, and newlines must be encoded as <code>\n</code>.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Formatting Tools Compared: Casetivo vs. IDEs vs. Cloud Utilities</h3>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse border border-border text-sm">
            <thead>
              <tr className="bg-muted/50 text-foreground">
                <th className="border border-border p-3 font-semibold">Capability</th>
                <th className="border border-border p-3 font-semibold text-primary">Casetivo Formatter</th>
                <th className="border border-border p-3 font-semibold">VS Code Prettier</th>
                <th className="border border-border p-3 font-semibold">Postman</th>
                <th className="border border-border p-3 font-semibold">Traditional JSONLint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">Zero Installation &amp; Browser-Based</td>
                <td className="border border-border p-3 text-emerald-600 dark:text-emerald-400 font-semibold">&check; Instant in browser</td>
                <td className="border border-border p-3">Requires desktop IDE</td>
                <td className="border border-border p-3">Requires app download</td>
                <td className="border border-border p-3">&check; Web tool</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">100% Client-Side Privacy (No Server Log)</td>
                <td className="border border-border p-3 text-emerald-600 dark:text-emerald-400 font-semibold">&check; 100% Local JavaScript</td>
                <td className="border border-border p-3">&check; Local desktop</td>
                <td className="border border-border p-3">Cloud synced by default</td>
                <td className="border border-border p-3">&cross; Often posted to remote backend</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">Auto-Fix Syntax Errors (Quotes &amp; Commas)</td>
                <td className="border border-border p-3 text-emerald-600 dark:text-emerald-400 font-semibold">&check; One-click Smart Fix</td>
                <td className="border border-border p-3">&cross; Manual correction required</td>
                <td className="border border-border p-3">&cross; Read-only viewer</td>
                <td className="border border-border p-3">&cross; Flags error only</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">Dual Beautify &amp; Minify Modes</td>
                <td className="border border-border p-3 text-emerald-600 dark:text-emerald-400 font-semibold">&check; One-click toggle</td>
                <td className="border border-border p-3">Requires custom shortcut/extension</td>
                <td className="border border-border p-3">&cross; Beautify only</td>
                <td className="border border-border p-3">&cross; Beautify only</td>
              </tr>
              <tr>
                <td className="border border-border p-3 font-medium text-foreground">Exact Line &amp; Column Error Locator</td>
                <td className="border border-border p-3 text-emerald-600 dark:text-emerald-400 font-semibold">&check; Instant pointer badge</td>
                <td className="border border-border p-3">&check; Squiggly underline</td>
                <td className="border border-border p-3">Basic error response</td>
                <td className="border border-border p-3">&check; Line pointer</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Why Security Matters: Protecting Production Payloads &amp; API Keys</h3>
        <p>
          Developers frequently format production API payloads containing sensitive data: Bearer tokens, Stripe customer IDs, database passwords, user email addresses, and personally identifiable information (PII).
        </p>
        <p className="mt-3">
          Many legacy web formatters transmit pasted JSON to a remote cloud server for processing. This exposes your company to severe data leaks and GDPR/HIPAA compliance violations. Casetivo executes all JSON parsing, validation, and minification locally within your client browser session. <strong>No payload data is ever logged, transmitted over the wire, or stored on any server.</strong>
        </p>
      </>
    ),
    faqs: [
      {
        question: "How does the online JSON formatter work?",
        answer: "The tool parses your raw JSON string into a structured JavaScript object and re-serializes it with clean, configurable indentation (2 spaces, 4 spaces, or tabs) and line breaks. Everything executes client-side in your web browser."
      },
      {
        question: "Can this tool fix invalid JSON automatically?",
        answer: "Yes! Our tool features an 'Auto-Fix Common Errors' button that automatically replaces single quotes with valid double quotes, strips illegal trailing commas from arrays and objects, and cleans up standard JavaScript comments."
      },
      {
        question: "How do I minify JSON for production?",
        answer: "Select the 'Minify' button in the toolbar. The tool will strip all indentation, line breaks, and unnecessary spaces, producing a compact, single-line JSON string that reduces payload size by up to 40%."
      },
      {
        question: "What is the difference between 2-space and 4-space indentation?",
        answer: "2-space indentation is the industry standard for modern web development, JavaScript, and TypeScript because it keeps deep nested structures compact. 4-space indentation is frequently favored in Python, Java, and C# environments."
      },
      {
        question: "Why does my JSON throw an 'Unexpected token' error?",
        answer: "The most common causes of 'Unexpected token' errors are trailing commas after the last item in an object or array, using single quotes instead of double quotes, missing colons between keys and values, or forgetting to close a curly brace."
      },
      {
        question: "Is it safe to format sensitive data containing API keys or user data?",
        answer: "Yes, 100% safe. Casetivo processes all JSON entirely client-side inside your browser's V8 JavaScript engine. None of your data is ever uploaded to a remote server, saved in a database, or shared."
      },
      {
        question: "Can this tool format large JSON files?",
        answer: "Yes. Because modern web browsers have fast JavaScript runtimes, you can format multi-megabyte JSON payloads (10MB to 50MB+) in a fraction of a second without browser lag."
      },
      {
        question: "What is the difference between JSON and JavaScript objects?",
        answer: "JavaScript objects allow unquoted keys, single quotes, functions, undefined values, and trailing commas. JSON is a strict data interchange format that mandates double-quoted keys, forbids functions/undefined, and rejects trailing commas."
      },
      {
        question: "Does this tool support JSON Lines (JSONL)?",
        answer: "Standard JSON formatters expect a single valid object or array. To format JSONL (where each line is an independent JSON object), wrap the lines in square brackets [ ... ] separated by commas, or format each line individually."
      },
      {
        question: "How can I download the formatted JSON file?",
        answer: "Click the 'Download' button above the output box to instantly save your clean, validated JSON as a .json file directly to your computer."
      },
      {
        question: "Can I convert JSON to YAML or CSV?",
        answer: "Yes! Casetivo offers dedicated companion tools including the JSON to YAML Converter and CSV to JSON Converter for seamless data transformation."
      },
      {
        question: "What character encoding does JSON require?",
        answer: "The official JSON specification mandates UTF-8 encoding. Standard ASCII characters are fully compatible, and international characters and emojis are supported seamlessly."
      }
    ]
  },
  base64EncoderDecoder: {
    title: "Complete Guide to Base64 Encoding & Decoding: Binary Radix-64, URL-Safe RFC 4648, and Practical Web Architecture",
    content: (
      <>
        <p>
          In modern network architecture, not all transmission channels are designed to transport raw binary bytes cleanly. Email servers using the SMTP protocol, HTTP headers, JSON serialization formats, and legacy XML feeds were designed from the ground up to transport human-readable ASCII text. If raw 8-bit binary data (such as image pixels, cryptographic keys, or compiled bytecode) passes through these systems, intermediate gateways, proxies, or character-encoding filters can alter or strip bytes, rendering the data corrupt.
        </p>
        <p className="mt-3">
          <strong>Base64</strong> is a group of binary-to-text encoding algorithms that solves this problem permanently. By translating raw 8-bit bytes into a restricted alphabet of 64 safe ASCII characters, Base64 guarantees that payloads travel intact across any network layer. Casetivo&apos;s <strong>Base64 Encoder &amp; Decoder</strong> provides two-way translation, full UTF-8 multi-byte support for emojis and international characters, RFC 4648 URL-safe formatting, line wrapping, and 100% private in-browser execution.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">How Base64 Works: The 6-Bit Radix Translation</h3>
        <p>
          At a binary level, computers store standard characters and files in 8-bit groups (octets). Base64 converts groups of 24 bits (3 standard 8-bit bytes) into 4 groups of 6 bits:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            <strong>Input:</strong> 3 bytes &times; 8 bits = 24 bits total (e.g. the ASCII word <code>&quot;Man&quot;</code> corresponds to <code>01001101 01100001 01101110</code>).
          </li>
          <li>
            <strong>Splitting:</strong> The 24 bits are partitioned into 4 distinct chunks of 6 bits each (<code>010011</code>, <code>010110</code>, <code>000101</code>, <code>101110</code>).
          </li>
          <li>
            <strong>Radix-64 Indexing:</strong> Each 6-bit chunk has a numeric value ranging from 0 to 63 (2<sup>6</sup> = 64). Each value is mapped to a character in the Base64 alphabet: <code>A-Z</code> (0&ndash;25), <code>a-z</code> (26&ndash;51), <code>0-9</code> (52&ndash;61), <code>+</code> (62), and <code>/</code> (63).
          </li>
          <li>
            <strong>Output:</strong> The 4 resulting characters form the encoded string (e.g. <code>TWFu</code>).
          </li>
        </ul>

        <div className="p-4 rounded-xl border border-border bg-card mt-5">
          <h4 className="font-semibold text-foreground mb-1 text-sm">Why Does Base64 End with Equals Signs (<code>=</code>)?</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The equals sign (<code>=</code>) serves as structural padding. Because Base64 processes data in 3-byte groups, if your input contains only 1 byte (8 bits), 2 padding characters (<code>==</code>) are appended to complete the 4-character block. If your input contains 2 bytes (16 bits), 1 padding character (<code>=</code>) is appended. If the data divides evenly by 3, no padding is needed.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Standard Base64 vs. URL-Safe Base64 (RFC 4648)</h3>
        <p>
          Standard Base64 includes the plus sign (<code>+</code>) and the forward slash (<code>/</code>). In HTTP URLs and web parameters, these two characters cause immediate routing errors:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            The <code>+</code> character represents an encoded whitespace in query parameters.
          </li>
          <li>
            The <code>/</code> character denotes a URL path segment separator.
          </li>
        </ul>
        <p className="mt-3">
          To safely transmit encoded tokens in URLs, JSON Web Tokens (JWT), and OAuth authorization codes, <strong>RFC 4648 Section 5</strong> defines the URL-safe Base64 standard: it swaps <code>+</code> for a hyphen (<code>-</code>) and <code>/</code> for an underscore (<code>_</code>), while frequently dropping trailing <code>=</code> padding characters. Casetivo lets you toggle between standard and URL-safe modes in one click.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Common Developer Use Cases in Modern Software</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Data URLs &amp; Inline Media</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Embedding small SVG icons, favicons, or thumbnails directly into HTML or CSS stylesheets using <code>data:image/png;base64,...</code>. This reduces the number of round-trip HTTP requests on initial page load.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. HTTP Basic Authentication</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              RFC 7617 requires the client to concatenate <code>username:password</code> and encode the resulting string in Base64 before attaching it to the <code>Authorization: Basic &lt;credentials&gt;</code> header.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. JSON Web Tokens (JWT)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every JWT consists of three parts separated by dots (<code>Header.Payload.Signature</code>). Both the header and payload are JSON strings encoded in URL-safe Base64.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">4. Binary Attachments in Email (MIME)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The MIME standard (RFC 2045) encodes email file attachments into Base64 blocks wrapped at 76 characters per line, preventing email transport agents from corrupting binary files.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The 33% Bandwidth Overhead Trade-off</h3>
        <p>
          Every 3 bytes of raw binary data expand into 4 characters of Base64 text. This introduces an unavoidable <strong>~33.3% increase in data size</strong>. For small payloads like icons, avatars, and authorization tokens, this overhead is negligible compared to the overhead of extra TCP handshakes. However, encoding large multi-megabyte images or video files into Base64 leads to significant memory and bandwidth waste.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Critical Distinction: Base64 is NOT Encryption</h3>
        <p>
          A frequent security error among beginners is using Base64 to &quot;hide&quot; sensitive database secrets, passwords, or personal credentials. <strong>Base64 provides zero confidentiality or cryptographic security.</strong> It is merely an encoding translation format. Anyone with access to a Base64 string can decode it back to plaintext in a browser console. Always use certified cryptography (such as AES-GCM or RSA) for confidentiality and salted hashing (such as Argon2 or bcrypt) for password storage.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How does the Base64 Encoder & Decoder work?",
        answer: "The tool converts data between raw UTF-8 text and the radix-64 ASCII representation. In encode mode, it converts 8-bit byte sequences into 6-bit index characters from the Base64 alphabet. In decode mode, it reconstructs the original UTF-8 characters."
      },
      {
        question: "Does this tool support emojis and non-English characters?",
        answer: "Yes. Many browser implementations of btoa crash when encountering characters outside the Latin1 range (such as emojis, Arabic, Chinese, or Cyrillic). Our converter properly buffers multi-byte UTF-8 sequences so all international characters encode and decode flawlessly."
      },
      {
        question: "What is URL-Safe Base64 and when should I use it?",
        answer: "Standard Base64 contains '+' and '/' characters, which have special meanings in URLs and can cause routing bugs. URL-safe Base64 (RFC 4648) replaces '+' with '-' and '/' with '_', and strips trailing '=' padding. Use URL-safe mode when creating tokens, JWTs, or query parameters."
      },
      {
        question: "Is Base64 considered encryption?",
        answer: "No. Base64 is an encoding format designed for data transport, not encryption. It contains no encryption keys, secret algorithms, or access controls. Anyone can decode a Base64 string back into plain text instantly."
      },
      {
        question: "Why do some Base64 strings end with '=' or '=='?",
        answer: "Base64 encodes data in groups of 3 bytes. If your original text does not divide evenly by 3, one or two '=' padding characters are appended to ensure the total string length is a multiple of 4."
      },
      {
        question: "Why does Base64 increase the size of the data?",
        answer: "Because Base64 translates 3 bytes (24 bits) into 4 characters (32 bits), it increases the size of the data by approximately 33%. This is why Base64 is best suited for small text payloads rather than large binary videos or datasets."
      },
      {
        question: "What is MIME 76-character line wrapping?",
        answer: "MIME standards for email attachments (RFC 2045) require Base64 strings to be broken into lines of no more than 76 characters separated by newlines. You can toggle this setting on whenever preparing payloads for SMTP email clients."
      },
      {
        question: "Can I decode a Base64 image back into a picture?",
        answer: "Yes. An image encoded in Base64 can be displayed directly in any browser by prefixing it with the data URI scheme: 'data:image/png;base64,[your-base64-string]'."
      },
      {
        question: "Is my data stored or sent to any server?",
        answer: "No. All encoding and decoding runs 100% locally in your browser using modern client-side JavaScript. Your text, keys, and tokens never leave your computer."
      },
      {
        question: "What causes an 'Invalid Base64 sequence' error when decoding?",
        answer: "This error occurs if the input string contains characters not present in the 64-character alphabet, or if the string length is not a valid multiple of 4 after removing whitespace."
      },
      {
        question: "How can I encode text to Base64 in JavaScript?",
        answer: "For standard ASCII in the browser, you can call btoa(string). For full UTF-8 support (including emojis), buffer through TextEncoder or use btoa(unescape(encodeURIComponent(string)))."
      },
      {
        question: "How do I encode and decode Base64 in Python?",
        answer: "Python provides the standard 'base64' module: call base64.b64encode(b'text') to encode, and base64.b64decode(b64_string) to decode. For URL-safe encoding, use base64.urlsafe_b64encode()."
      }
    ]
  },
  binaryCodeTranslator: {
    title: "The Ultimate Guide to Binary Code: Base-2 Architecture, ASCII Mapping, and Digital Computation",
    content: (
      <>
        <p>
          At the physical layer of every digital computer—from supercomputing clusters to microscopic smart watch microcontrollers—all human thought, software algorithms, photos, and high-frequency transactions reduce to a single physical phenomenon: the presence or absence of electrical voltage in microscopic transistors.
        </p>
        <p className="mt-3">
          This elemental two-state system is represented mathematically by the <strong>Binary Numeral System (Base-2)</strong>, consisting entirely of <code>0</code>s (low voltage / off) and <code>1</code>s (high voltage / on). Casetivo&apos;s <strong>Binary Code Translator</strong> enables two-way conversion between readable human text and 8-bit binary code with automatic UTF-8 multi-byte decoding, customizable byte delimiters, optional <code>0b</code> programming prefixes, live bit metrics, and 100% private in-browser computation.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Understanding Base-2: The Mathematics of Bits &amp; Bytes</h3>
        <p>
          In our daily lives, humans count in the <strong>Decimal System (Base-10)</strong> because we have ten fingers. Each digit position represents an increasing power of 10 ($10^0 = 1$, $10^1 = 10$, $10^2 = 100$, etc.).
        </p>
        <p className="mt-3">
          Computers operate in <strong>Base-2</strong>, where each digit position (called a <strong>bit</strong>, short for <em>binary digit</em>) represents an increasing power of 2 ($2^0 = 1$, $2^1 = 2$, $2^2 = 4$, $2^3 = 8$, $2^4 = 16$, $2^5 = 32$, $2^6 = 64$, $2^7 = 128$).
        </p>

        <div className="p-4 rounded-xl border border-border bg-card mt-4 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold text-foreground">Bit Position</th>
                <th className="py-2 px-2 text-center">Bit 7</th>
                <th className="py-2 px-2 text-center">Bit 6</th>
                <th className="py-2 px-2 text-center">Bit 5</th>
                <th className="py-2 px-2 text-center">Bit 4</th>
                <th className="py-2 px-2 text-center">Bit 3</th>
                <th className="py-2 px-2 text-center">Bit 2</th>
                <th className="py-2 px-2 text-center">Bit 1</th>
                <th className="py-2 pl-2 text-center">Bit 0</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Power of 2</td>
                <td className="py-2 px-2 text-center">2<sup>7</sup></td>
                <td className="py-2 px-2 text-center">2<sup>6</sup></td>
                <td className="py-2 px-2 text-center">2<sup>5</sup></td>
                <td className="py-2 px-2 text-center">2<sup>4</sup></td>
                <td className="py-2 px-2 text-center">2<sup>3</sup></td>
                <td className="py-2 px-2 text-center">2<sup>2</sup></td>
                <td className="py-2 px-2 text-center">2<sup>1</sup></td>
                <td className="py-2 pl-2 text-center">2<sup>0</sup></td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Decimal Value</td>
                <td className="py-2 px-2 text-center">128</td>
                <td className="py-2 px-2 text-center">64</td>
                <td className="py-2 px-2 text-center">32</td>
                <td className="py-2 px-2 text-center">16</td>
                <td className="py-2 px-2 text-center">8</td>
                <td className="py-2 px-2 text-center">4</td>
                <td className="py-2 px-2 text-center">2</td>
                <td className="py-2 pl-2 text-center">1</td>
              </tr>
              <tr className="text-primary font-bold">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Letter &apos;A&apos; (65)</td>
                <td className="py-2 px-2 text-center">0</td>
                <td className="py-2 px-2 text-center">1</td>
                <td className="py-2 px-2 text-center">0</td>
                <td className="py-2 px-2 text-center">0</td>
                <td className="py-2 px-2 text-center">0</td>
                <td className="py-2 px-2 text-center">0</td>
                <td className="py-2 px-2 text-center">0</td>
                <td className="py-2 pl-2 text-center">1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          Summing the active high bits: $64 + 1 = 65$, which precisely corresponds to the standard ASCII character code for uppercase <code>&apos;A&apos;</code>.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">ASCII vs. UTF-8: Handling Global Characters and Emojis</h3>
        <p>
          In legacy systems, characters were mapped using the 7-bit <strong>ASCII</strong> table (American Standard Code for Information Interchange), which maxed out at 128 characters—only enough for basic English letters and numbers.
        </p>
        <p className="mt-3">
          Modern software universally relies on <strong>UTF-8</strong> (Universal Character Set Transformation Format &ndash; 8-bit). Under UTF-8:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            Standard English letters and numbers occupy <strong>1 byte (8 bits)</strong>, maintaining 100% backward compatibility with ASCII.
          </li>
          <li>
            Accented European letters (e.g. <code>&eacute;</code>, <code>&uuml;</code>) occupy <strong>2 bytes (16 bits)</strong>.
          </li>
          <li>
            Asian, Arabic, and Cyrillic scripts occupy <strong>3 bytes (24 bits)</strong>.
          </li>
          <li>
            Modern emojis (e.g. <code>&#128640;</code>, <code>&#128293;</code>) occupy <strong>4 bytes (32 bits)</strong>.
          </li>
        </ul>
        <p className="mt-3">
          Unlike basic online translators that crash on non-ASCII characters, Casetivo uses the browser&apos;s native <code>TextEncoder</code> and <code>TextDecoder</code> to safely translate multi-byte UTF-8 streams into accurate binary bytes and back.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Primary Developer and Educational Use Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Computer Science Education</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Visualizing how memory addressing, bitmasks, logic gates (AND, OR, XOR, NOT), and CPU registers store variable data.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. Low-Level Protocol Debugging</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Inspecting network packet headers, serial port UART communications, and embedded IoT sensor bitstreams.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. CTF &amp; Cybersecurity Challenges</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Quickly decoding hidden payloads, steganography hints, and binary puzzles in Capture the Flag competitions.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">4. Programming Language Bit Literals</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Generating <code>0b</code>-prefixed binary literals for direct copy-pasting into C, Rust, Go, Python, or TypeScript code.
            </p>
          </div>
        </div>
      </>
    ),
    faqs: [
      {
        question: "How does the Binary Code Translator work?",
        answer: "The tool converts text characters into their underlying 8-bit UTF-8 byte sequences in base-2 binary format (0s and 1s). In reverse mode, it parses streams of binary digits, separates them into bytes, and decodes them into readable human text."
      },
      {
        question: "What is the difference between a bit and a byte?",
        answer: "A bit (binary digit) is the smallest unit of data in computing, holding a value of either 0 or 1. A byte is a group of 8 bits, capable of representing 256 unique values (from 0 to 255), which corresponds to one standard character in ASCII."
      },
      {
        question: "Can this translator decode binary back into English text?",
        answer: "Yes. The tool features an Auto-Detect mode that automatically recognizes binary patterns. You can also explicitly toggle the mode to 'Binary → Text' to convert 0s and 1s back into readable sentences."
      },
      {
        question: "Does it support emojis and foreign language characters?",
        answer: "Yes. Our engine uses true multi-byte UTF-8 encoding. Standard English letters produce 1 byte (8 bits), while emojis produce up to 4 bytes (32 bits), allowing all international alphabets to encode and decode flawlessly."
      },
      {
        question: "What byte separators can I choose between?",
        answer: "You can format your binary output with Spaces (standard readability), None (continuous unbroken bitstream), Commas (for array declarations), or Hyphens."
      },
      {
        question: "What does the '0b' binary prefix mean?",
        answer: "In programming languages like C, C++, Python, JavaScript, and Rust, the '0b' prefix tells the compiler that the following literal number is written in binary base-2 rather than standard base-10 (e.g. 0b01000001 = 65)."
      },
      {
        question: "How do I convert text to binary manually?",
        answer: "Find the decimal ASCII value of the character (e.g., 'A' is 65). Then divide by 2 repeatedly or subtract powers of 2 (64 + 1) to derive the 8-bit binary pattern (01000001)."
      },
      {
        question: "Why does my binary code have fewer or more than 8 digits?",
        answer: "Computers organize data into 8-bit octets. Some basic tools drop leading zeroes (e.g. showing '1' instead of '00000001'). Our translator always pads each byte to the full 8-bit width for consistency."
      },
      {
        question: "Can I paste an unbroken stream of binary digits without spaces?",
        answer: "Yes. If you paste a continuous sequence like '0100100001101001', our decoder automatically groups the string into 8-bit byte chunks and decodes the word 'Hi'."
      },
      {
        question: "Is binary code considered encryption?",
        answer: "No. Binary code is simply an alternative numeral representation of data. It provides zero cryptographic security because anyone can translate binary digits back into text in seconds."
      },
      {
        question: "Is my text or binary data transmitted to a server?",
        answer: "No. All conversion operations run locally inside your web browser using modern Web APIs. No data is stored, logged, or sent across the internet."
      },
      {
        question: "How do I convert text to binary in Python?",
        answer: "In Python, you can write: ' '.join(format(ord(c), '08b') for c in text). To decode back: ''.join(chr(int(b, 2)) for b in binary_str.split())."
      }
    ]
  },
  urlEncoderDecoder: {
    title: "The Ultimate Guide to URL Encoding (Percent-Encoding): RFC 3986 Standards, Query Strings, and HTTP Safety",
    content: (
      <>
        <p>
          Uniform Resource Identifiers (URIs) and URLs are the directional coordinate system of the World Wide Web. However, the foundational specifications that govern internet protocols—originating in the early 1990s—were designed to transport characters using a restricted sub-alphabet of US-ASCII characters.
        </p>
        <p className="mt-3">
          If a URL contains characters outside the standard ASCII range (such as emojis, Cyrillic, Chinese, or Arabic scripts), or if it contains &quot;reserved&quot; delimiter characters that have structural meaning in a web address (such as <code>?</code>, <code>&amp;</code>, <code>=</code>, <code>#</code>, <code>/</code>, or whitespace), the browser, proxy gateway, or backend web server will misinterpret the URL boundary or reject the request entirely. Casetivo&apos;s <strong>URL Encoder &amp; Decoder</strong> implements full RFC 3986 compliance, enabling two-way percent-encoding, parameter vs. full URI mode, space formatting toggles (<code>%20</code> vs <code>+</code>), and 100% private in-browser execution.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Reserved vs. Unreserved Characters (RFC 3986)</h3>
        <p>
          The Internet Engineering Task Force (IETF) RFC 3986 defines the exact character boundaries permitted in a URL:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">Unreserved Characters (Never Encoded)</h4>
            <p className="font-mono text-xs text-primary mb-2">A-Z, a-z, 0-9, -, _, ., ~</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              These 66 characters have no structural meaning in URL syntax. They represent pure data and should never be percent-encoded under any standard specification.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">Reserved Characters (Delimiter Controls)</h4>
            <p className="font-mono text-xs text-amber-500 mb-2">: / ? # [ ] @ ! $ &amp; &apos; ( ) * + , ; =</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              These characters serve specific structural roles: <code>?</code> initiates a query string, <code>&amp;</code> separates key-value pairs, and <code>/</code> separates path segments. If you pass these characters as literal data inside a parameter value, they must be percent-encoded.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">How Percent-Encoding Works: The Hex Triplet</h3>
        <p>
          Whenever a character requires encoding, it is translated into its underlying UTF-8 byte sequence. Each byte is then replaced by a percent sign (<code>%</code>) followed by its two-character hexadecimal value:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-sm text-muted-foreground">
          <li><strong>Space character:</strong> ASCII 32 &rarr; Hex <code>20</code> &rarr; <code>%20</code></li>
          <li><strong>Ampersand (&amp;):</strong> ASCII 38 &rarr; Hex <code>26</code> &rarr; <code>%26</code></li>
          <li><strong>Equals sign (=):</strong> ASCII 61 &rarr; Hex <code>3D</code> &rarr; <code>%3D</code></li>
          <li><strong>Question mark (?):</strong> ASCII 63 &rarr; Hex <code>3F</code> &rarr; <code>%3F</code></li>
          <li><strong>Forward slash (/):</strong> ASCII 47 &rarr; Hex <code>2F</code> &rarr; <code>%2F</code></li>
          <li><strong>Multi-byte Emoji (🚀):</strong> UTF-8 bytes <code>F0 9F 9A 80</code> &rarr; <code>%F0%9F%9A%80</code></li>
        </ul>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">encodeURI vs. encodeURIComponent: A Critical Distinction</h3>
        <p>
          JavaScript provides two native global encoding methods that serve fundamentally different purposes:
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">encodeURI() &mdash; For Full Address Strings</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Assumes the input is a complete URL (e.g. <code>https://example.com/search?q=test</code>). It intentionally preserves protocol separators (<code>://</code>), path slashes (<code>/</code>), query question marks (<code>?</code>), and ampersands (<code>&amp;</code>) so the overall URL remains functional.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">encodeURIComponent() &mdash; For Individual Query Parameters</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Assumes the input is a single data value intended to sit on the right side of an equals sign (e.g. <code>q=value</code>). It aggressively encodes slashes (<code>%2F</code>), ampersands (<code>%26</code>), and question marks (<code>%3F</code>) so they do not collide with URL routing boundaries.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The Space Dilemma: <code>%20</code> vs. <code>+</code></h3>
        <p>
          Developers frequently encounter URLs containing plus signs where spaces should be (e.g. <code>?q=apple+pie</code>).
        </p>
        <div className="p-4 rounded-xl border border-border bg-card mt-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            In standard RFC 3986 URI paths, a space <strong>must always be encoded as <code>%20</code></strong>. However, under the legacy HTML form submission standard (<code>application/x-www-form-urlencoded</code>), web browsers historically replaced spaces in form inputs with a plus sign (<code>+</code>). Modern backends generally decode both, but <code>%20</code> is strictly required when encoding URL path segments or modern REST API tokens.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Beware of Double Encoding Bugs</h3>
        <p>
          One of the most insidious bugs in web applications is <strong>double encoding</strong>. If an already encoded string containing <code>%20</code> is accidentally passed through an encoder a second time, the literal percent sign (<code>%</code>, which has ASCII hex 25) will be encoded into <code>%25</code>, producing <code>%2520</code>. When decoded once on the server, it resolves to <code>%20</code> rather than the intended space, breaking search queries and file links.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How does the URL Encoder & Decoder work?",
        answer: "The tool translates characters between plain text and RFC 3986 percent-encoded hexadecimal triplets. In encode mode, it converts reserved characters and non-ASCII glyphs into '%XX' format. In decode mode, it parses '%XX' and '+' sequences back into readable UTF-8 text."
      },
      {
        question: "What is the difference between encodeURI and encodeURIComponent?",
        answer: "encodeURI is meant for entire web addresses and leaves protocol slashes, colons, and query delimiters untouched. encodeURIComponent is designed for specific parameter values and encodes all reserved punctuation (: / ? & =) to prevent parameter collision."
      },
      {
        question: "Why are spaces sometimes encoded as '%20' and sometimes as '+'?",
        answer: "In standard RFC 3986 URLs, spaces are always '%20'. In HTML form submissions (application/x-www-form-urlencoded query strings), spaces are historically encoded as '+'. Our tool allows you to toggle between both conventions."
      },
      {
        question: "Does this tool support emojis and non-English scripts?",
        answer: "Yes. Our tool uses UTF-8 multi-byte encoding. Emojis and international characters are converted into multiple consecutive '%XX' hex bytes (e.g., the rocket emoji 🚀 becomes '%F0%9F%9A%80') and decode back flawlessly."
      },
      {
        question: "What causes a double encoding bug (%2520)?",
        answer: "Double encoding occurs when an already encoded string is encoded again. The percent sign '%' is encoded to '%25', turning '%20' into '%2520'. Decoding it once will produce '%20' instead of a space."
      },
      {
        question: "Is URL encoding the same as encryption?",
        answer: "No. URL encoding is an open data transport representation, not encryption. It contains no cryptographic keys or passwords, and anyone can decode a percent-encoded URL in a single click."
      },
      {
        question: "Which characters are considered 'unreserved' in RFC 3986?",
        answer: "The unreserved characters that never need encoding are uppercase letters (A–Z), lowercase letters (a–z), digits (0–9), hyphens (-), underscores (_), periods (.), and tildes (~)."
      },
      {
        question: "Can I decode query strings with multiple parameters?",
        answer: "Yes. You can paste an entire complex URL with multiple query arguments (e.g., '?page=1&query=hello+world'), and the decoder will convert all encoded values back into readable text."
      },
      {
        question: "Is my URL or private token sent to an external server?",
        answer: "No. All encoding and decoding operations run 100% locally inside your web browser using JavaScript. No URLs, query parameters, or authorization tokens ever leave your computer."
      },
      {
        question: "How do I encode a URL component in JavaScript?",
        answer: "Use the built-in function encodeURIComponent(value). To strictly comply with RFC 3986 for characters like ! ' ( ) *, use: encodeURIComponent(val).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16).toUpperCase())."
      },
      {
        question: "How do I URL encode strings in Python?",
        answer: "In Python 3, use the urllib.parse module: call urllib.parse.quote(string) for standard '%20' encoding, or urllib.parse.quote_plus(string) for '+' space encoding."
      },
      {
        question: "Can I copy the output directly to my clipboard?",
        answer: "Yes. Use the Copy button in the action bar to copy the encoded or decoded URL directly to your clipboard."
      }
    ]
  },
  csvToJsonConverter: {
    title: "Complete Guide to Converting CSV to JSON: Formatting, Data Types, and Schema Architecture",
    content: (
      <>
        <p>
          Data lives at the intersection of spreadsheets and application code. While business teams, analytics suites, and enterprise reporting software rely heavily on tabular formats like CSV (Comma-Separated Values) and Excel workbooks, modern web services, REST APIs, GraphQL endpoints, and document databases (such as MongoDB and PostgreSQL JSONB) strictly operate on JSON (JavaScript Object Notation).
        </p>
        <p className="mt-3">
          Converting flat two-dimensional spreadsheets into structured, nested JSON objects is one of the most frequent tasks developers, data engineers, and analysts perform. Casetivo&apos;s <strong>CSV to JSON Converter</strong> automates this migration with zero server latency, instant delimiter detection, RFC 4180 quotation compliance, flexible data structure outputs, and 100% client-side privacy.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Tabular Flat Data vs. Hierarchical JSON Trees</h3>
        <p>
          Understanding how tabular rows map to hierarchical object notation is essential for clean data modeling. In a standard CSV file, the relationship between data fields is positional:
        </p>
        <div className="p-4 rounded-xl border border-border bg-card font-mono text-xs overflow-x-auto mt-3">
          id,product,category,price,active<br />
          101,&quot;Mechanical Keyboard&quot;,Hardware,89.99,true<br />
          102,&quot;Wireless Mouse, Black&quot;,Hardware,49.50,false
        </div>
        <p className="mt-3">
          When translated into JSON, positional rows are transformed into an array of associative key-value records where every column header becomes a string property key:
        </p>
        <div className="p-4 rounded-xl border border-border bg-card font-mono text-xs overflow-x-auto mt-3">
          [<br />
          &nbsp;&nbsp;&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;id&quot;: 101,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;product&quot;: &quot;Mechanical Keyboard&quot;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;category&quot;: &quot;Hardware&quot;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;price&quot;: 89.99,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;active&quot;: true<br />
          &nbsp;&nbsp;&#125;,<br />
          &nbsp;&nbsp;&#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;id&quot;: 102,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;product&quot;: &quot;Wireless Mouse, Black&quot;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;category&quot;: &quot;Hardware&quot;,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;price&quot;: 49.50,<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&quot;active&quot;: false<br />
          &nbsp;&nbsp;&#125;<br />
          ]
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Selecting the Right Output Data Structure</h3>
        <p>
          Depending on your application&apos;s architectural requirements, tabular CSV data can be arranged in three distinct JSON paradigms:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Array of Objects</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The industry standard for REST APIs and NoSQL databases. Every row is an independent self-describing object where keys match headers. Ideal for MongoDB, Elasticsearch, and frontend React state.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. 2D Matrix (Array of Arrays)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Conserves bandwidth by eliminating repetitive property keys. The output represents an array of rows, where each row is an array of cell values. Best for charting libraries (Chart.js, D3) and matrix algorithms.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. Keyed Object (Hash Map)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Uses the values in the first column (e.g. unique user ID or SKU) as dictionary keys pointing to their record object. Provides instant O(1) lookups in client-side caching layers.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The 5 Critical Pitfalls in CSV to JSON Conversion</h3>
        <p>
          Na&iuml;ve regex splits on comma (<code>line.split(&apos;,&apos;)</code>) inevitably break down in production environments. Here is how modern parsers handle standard edge cases:
        </p>

        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Commas Inside Quoted Text Fields</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If a customer address reads <code>&quot;123 Market St, Suite 400, San Francisco&quot;</code>, a basic split splits this single cell into three separate columns, corrupting the entire row schema. RFC 4180 specifies that commas enclosed within double quotes must be treated as literal characters.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. Escaped Double Quotes Inside Cells</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When a CSV field itself contains quotation marks (e.g. <code>&quot;24&quot;&quot; Monitor&quot;</code>), standard CSV conventions double the quote mark (<code>&quot;&quot;</code>). Our parser preserves internal quotations without breaking parsing boundaries.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. Automatic Type Coercion vs. String Preservation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              CSV has no native type awareness; everything is raw text. When enabled, our type parser converts numeric values (<code>42</code>, <code>3.14</code>) into JavaScript numbers and literals (<code>true</code>, <code>false</code>) into booleans, while intelligently retaining phone numbers and postal codes with leading zeroes (e.g. <code>&quot;01234&quot;</code>) as strings.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">4. Ragged Rows and Missing Values</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When rows contain fewer cells than the header row, a careless parser produces mismatched indices or undefined values. Casetivo fills missing cells gracefully with <code>null</code> or empty strings, ensuring predictable object shapes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">5. Non-Comma Delimiters (TSV, Semicolon, Pipe)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              European locales often use semicolons (<code>;</code>) because the comma is reserved as a decimal separator. Tab-separated values (TSV) are standard in bioinformatics and log exports. Our Auto-Detect engine scans the header frequency to apply the correct delimiter instantly.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Programmatic Implementation Examples</h3>
        <p>
          For developers building automated backend pipelines, here is how you can parse CSV into JSON natively in Node.js and Python without bloated third-party dependencies:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="text-xs font-semibold text-primary mb-2">Python 3 (Standard Library)</div>
            <pre className="font-mono text-xs text-muted-foreground overflow-x-auto leading-relaxed">
{`import csv
import json

def convert_csv_to_json(csv_path, json_path):
    with open(csv_path, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        records = list(reader)
    
    with open(json_path, mode='w', encoding='utf-8') as f:
        json.dump(records, f, indent=2)

convert_csv_to_json('data.csv', 'data.json')`}
            </pre>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="text-xs font-semibold text-primary mb-2">Node.js (Native Streams)</div>
            <pre className="font-mono text-xs text-muted-foreground overflow-x-auto leading-relaxed">
{`const fs = require('fs');

function parseCSV(content) {
  const [headerLine, ...lines] = content.trim().split('\n');
  const headers = headerLine.split(',').map(h => h.trim());
  
  return lines.map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i]?.trim();
      return obj;
    }, {});
  });
}`}
            </pre>
          </div>
        </div>
      </>
    ),
    faqs: [
      {
        question: "How does the CSV to JSON Converter work?",
        answer: "The tool parses tabular text line by line according to RFC 4180 specifications. It identifies column headers in the initial row, separates individual row cells respecting quotes, and constructs a structured JSON array of objects or arrays."
      },
      {
        question: "Can it handle commas inside quoted spreadsheet cells?",
        answer: "Yes. Our parser features full quote-awareness. Any comma enclosed within quotation marks (such as addresses like '123 Main St, Suite 4') is recognized as part of the text rather than a column delimiter."
      },
      {
        question: "How does the tool distinguish between numbers, booleans, and strings?",
        answer: "When 'Parse Numbers & Booleans' is enabled, values matching numeric patterns (like 42 or 99.5) are cast to JSON numbers, and values matching 'true' or 'false' become JSON booleans. Values with leading zeros (such as ZIP codes like '02138') remain strings to prevent data corruption."
      },
      {
        question: "What output formats are supported?",
        answer: "You can export your data in three formats: Array of Objects (standard for REST APIs), 2D Matrix / Array of Arrays (compact for charting and numerical libraries), or Keyed Object (where the first column values serve as unique lookup dictionary keys)."
      },
      {
        question: "Can this tool convert Tab-Separated Values (TSV) or semicolons?",
        answer: "Yes. The delimiter dropdown lets you toggle between Auto-Detect, Comma (,), Semicolon (;), Tab (TSV), and Pipe (|). Auto-Detect analyzes your input and selects the most frequent consistent delimiter."
      },
      {
        question: "What happens if my CSV data does not have a header row?",
        answer: "Simply uncheck the 'First Row is Header' option. The tool will parse every row as data and automatically generate uniform property keys such as 'column_1', 'column_2', etc."
      },
      {
        question: "Is my CSV spreadsheet data uploaded or stored on any server?",
        answer: "No. Conversion executes 100% locally in your client's web browser using modern JavaScript engines. None of your data, files, or confidential spreadsheets ever leave your device or touch a server."
      },
      {
        question: "What is the maximum file size or row count I can convert?",
        answer: "Because conversion runs locally in browser memory, you can comfortably process tens of thousands of rows (10MB to 50MB of CSV data) in seconds without network timeouts."
      },
      {
        question: "Can I convert JSON back into CSV format?",
        answer: "Yes, Casetivo provides a companion JSON to CSV Converter that accepts any array of JSON objects and transforms it back into a downloadable spreadsheet format."
      },
      {
        question: "How does the converter handle escaped double quotes?",
        answer: "Following the RFC 4180 standard, double quotes inside quoted fields are represented by two consecutive double quotes (\\\"\\\"). The converter automatically resolves these to single literal quote marks in the output JSON string."
      },
      {
        question: "Why does my Excel CSV export have strange characters at the start?",
        answer: "Microsoft Excel often exports CSV files with a UTF-8 Byte Order Mark (BOM: \uFEFF). Our parser automatically sanitizes and removes hidden BOM characters so your first JSON key name remains clean and valid."
      },
      {
        question: "Can I copy or download the resulting JSON payload directly?",
        answer: "Yes. Use the Copy button in the top action bar to paste into your code editor, or click the Download button to save a formatted .json file directly to your disk."
      }
    ]
  },
  cssFormatter: {
    title: "Complete Guide to CSS Formatting, Beautification, Minification, and Clean Architecture",
    content: (
      <>
        <p>
          Cascading Style Sheets (CSS) govern the entire visual presentation, layout geometry, typography, and responsive animations of modern web applications. In rapid development cycles, however, stylesheets frequently degrade into unmaintainable, chaotic code blocks with erratic indentation, unclosed braces, inconsistent spacing, and duplicated rules.
        </p>
        <p className="mt-3">
          Casetivo&apos;s <strong>CSS Formatter &amp; Beautifier</strong> restores clarity to messy stylesheets. Whether you are debugging minified production CSS from third-party themes, standardizing team coding styles across large codebases, or compressing files for lightning-fast Core Web Vitals performance, our tool delivers instant indentation restructuring (2 spaces, 4 spaces, or tabs), alphabetical property sorting, minification, and syntax telemetry with 100% private in-browser execution.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Beautification vs. Minification: The Engineering Trade-off</h3>
        <p>
          Modern web development balances two opposing architectural requirements: human developer velocity and browser runtime performance:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">CSS Beautification (Development)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Expands selectors and declaration blocks onto structured lines with hierarchical indentation. Human eyes require clear vertical alignment to scan properties, spot specificity conflicts, inspect media queries, and perform accurate Git pull request diffs.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">CSS Minification (Production)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strips all non-essential characters: comments, indentation spaces, trailing semicolons, and carriage returns. Because CSS is a render-blocking resource, minification reduces file transfer size by 20% to 50%, directly speeding up First Contentful Paint (FCP).
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Why Property Ordering Matters (Alphabetical vs. Box Model)</h3>
        <p>
          When multiple developers contribute to a stylesheet without automated formatting, declaration blocks quickly turn into random lists. Two primary property ordering methodologies dominate modern engineering:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            <strong>Alphabetical Sorting (A&ndash;Z):</strong> Properties are arranged alphabetically (<code>background</code>, <code>color</code>, <code>display</code>, <code>margin</code>, <code>padding</code>, <code>z-index</code>). This is the easiest standard to automate, eliminates cognitive load during code reviews, and prevents duplicate property overrides.
          </li>
          <li>
            <strong>Concentric / Box-Model Ordering:</strong> Orders properties from outside to inside: Positioning (<code>position</code>, <code>top</code>) &rarr; Display / Flexbox &rarr; Box Model (<code>width</code>, <code>margin</code>, <code>padding</code>) &rarr; Typography (<code>font</code>, <code>color</code>) &rarr; Visuals (<code>background</code>, <code>border</code>).
          </li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          Casetivo provides a one-click <strong>Sort Properties Alphabetically</strong> toggle, instantly organizing messy blocks into consistent, predictable declarations.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Handling Complex Modern CSS Structures</h3>
        <p>
          Unlike legacy formatters that break when encountering modern CSS3 specifications, our formatting engine respects:
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. At-Rules &amp; Responsive Media Queries</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Properly indents nested declaration blocks inside <code>@media</code>, <code>@supports</code>, <code>@container</code>, and <code>@keyframes</code> animation timelines without losing context or nesting levels.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. CSS Custom Properties (Variables)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Preserves modern theme token declarations (e.g. <code>--primary-color: #2563eb;</code>) and CSS function expressions like <code>calc()</code>, <code>clamp()</code>, and <code>var()</code> without corrupting commas or mathematical operators.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. Multi-line Comment Preservation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Shields block comments (<code>/* Section Header */</code>) during formatting so architecture documentation and copyright notices remain intact.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The 4 Golden Rules of Clean CSS Architecture</h3>
        <ol className="list-decimal pl-6 mt-3 space-y-2">
          <li>
            <strong>Avoid Over-Specificity:</strong> Rely on clean class selectors rather than deeply nested tag hierarchies (prefer <code>.nav-link</code> over <code>body div.container header nav ul li a</code>).
          </li>
          <li>
            <strong>Standardize Indentation:</strong> Consistent 2-space or 4-space indentation eliminates noisy whitespace changes in Git commit histories.
          </li>
          <li>
            <strong>Eliminate Duplicate Declarations:</strong> Accidental repeated properties inside a selector bloat payload size and create confusing override bugs.
          </li>
          <li>
            <strong>Automate Formatting:</strong> Use formatters in your CI/CD pipeline and code editor to ensure unified code standards across your entire engineering team.
          </li>
        </ol>
      </>
    ),
    faqs: [
      {
        question: "How does the CSS Formatter and Beautifier work?",
        answer: "The tool parses raw CSS text, cleans irregular spacing, formats declaration blocks with uniform indentation, ensures proper line breaks after semicolons and braces, and can optionally sort properties alphabetically."
      },
      {
        question: "What indentation styles are supported?",
        answer: "You can format your CSS using 2 Spaces (modern web standard), 4 Spaces (classic enterprise style), Tab characters, or Minify (single-line compact format for production)."
      },
      {
        question: "Can this tool unminify compressed CSS files?",
        answer: "Yes. If you have a minified stylesheet where all whitespace and newlines have been stripped into a single line, paste it into the editor, select 2 Spaces or 4 Spaces, and click Format to restore complete readability."
      },
      {
        question: "Does the formatter support CSS media queries and @keyframes?",
        answer: "Yes. The formatter supports nested rules inside @media queries, @container queries, and @keyframes animations, ensuring nested blocks receive the correct secondary indentation level."
      },
      {
        question: "Why should I sort CSS properties alphabetically?",
        answer: "Sorting properties alphabetically makes large declaration blocks easy to scan, helps prevent accidental duplicate properties, and makes Git diffs clean and easy to review during pull requests."
      },
      {
        question: "Does minifying CSS improve website performance?",
        answer: "Yes. Minifying CSS removes unnecessary whitespace, newlines, and comments, typically reducing file size by 20% to 50%. Because CSS blocks browser page rendering, smaller stylesheets directly improve Core Web Vitals like First Contentful Paint (FCP)."
      },
      {
        question: "Does this tool preserve CSS comments?",
        answer: "In beautification mode (2 spaces, 4 spaces, tab), CSS comments (/* ... */) are fully preserved and properly aligned. In Minify mode, comments are stripped to minimize payload size."
      },
      {
        question: "Can it handle modern CSS features like CSS variables and clamp()?",
        answer: "Yes. CSS custom properties (--variable-name), color functions (rgb, hsl, oklch), calc(), clamp(), and min/max expressions are recognized and formatted cleanly without breaking syntax."
      },
      {
        question: "What is the difference between CSS and SCSS/SASS?",
        answer: "Standard CSS is natively understood by web browsers. SCSS and SASS are preprocessor languages that support variables, nesting, and mixins, which must be compiled into standard CSS before running in a browser."
      },
      {
        question: "Is my stylesheet code stored or uploaded anywhere?",
        answer: "No. All formatting and minification runs 100% locally in your client's web browser using JavaScript. No stylesheets, proprietary code, or brand assets are transmitted over the internet."
      },
      {
        question: "How can I format CSS in VS Code automatically?",
        answer: "In Visual Studio Code, you can install the Prettier extension and enable 'Editor: Format On Save' in your settings to format CSS automatically whenever you save a file."
      },
      {
        question: "Can I download or copy the formatted stylesheet directly?",
        answer: "Yes. Use the Copy button in the action bar to copy the formatted stylesheet to your clipboard, or click Download to save the .css file directly to your computer."
      }
    ]
  },
  caesarCipherTool: {
    title: "The Ultimate Guide to the Caesar Cipher: History, Modular Arithmetic, and Cryptanalysis",
    content: (
      <>
        <p>
          More than two thousand years ago, Roman military commander Julius Caesar faced a classic wartime security problem: how to send strategic orders to his generals across hostile territories without enemy interception compromising the campaign. His solution was a monoalphabetic substitution technique known today as the <strong>Caesar Cipher</strong> (or Shift Cipher).
        </p>
        <p className="mt-3">
          While completely insecure by modern cryptographic standards, the Caesar Cipher is the foundational milestone of classical cryptography. It introduces the core principles of algorithmic key substitution, modular arithmetic, and cryptanalysis. Casetivo&apos;s <strong>Caesar Cipher Tool</strong> lets you encrypt and decrypt messages with custom shift keys (1&ndash;25), apply instant presets like ROT13, crack unknown ciphers by brute-forcing all 25 shifts simultaneously, and analyze letter frequencies with 100% private in-browser execution.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The Mathematics of Shift Ciphers: Modular Arithmetic</h3>
        <p>
          The Caesar Cipher maps the 26 letters of the Latin alphabet to integers from 0 to 25 ($A = 0, B = 1, dots, Z = 25$). Encryption and decryption are governed by modular arithmetic ($pmod{26}$):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">Encryption Formula</h4>
            <p className="font-mono text-xs text-primary mb-2">E_n(x) = (x + k) mod 26</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Where $x$ is the numeric position of the plaintext letter, $k$ is the secret shift key (typically $k=3$ historically), and $E_n(x)$ is the resulting ciphertext letter. If a shift pushes a letter past &apos;Z&apos;, the modulo operator loops back to &apos;A&apos;.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">Decryption Formula</h4>
            <p className="font-mono text-xs text-primary mb-2">D_n(x) = (x - k) mod 26</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              To reverse the cipher, subtract the shift key $k$ from the ciphertext position. If the result is negative, adding 26 returns the correct positive modular index.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Step-by-Step Example: Shift of 3 (Classic Caesar)</h3>
        <p>
          Let&apos;s encrypt the word <code>&quot;ROME&quot;</code> using Julius Caesar&apos;s traditional shift of $k=3$:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-sm text-muted-foreground">
          <li><strong>R:</strong> Position 17 &rarr; $(17 + 3) pmod{26} = 20$ &rarr; <strong>U</strong></li>
          <li><strong>O:</strong> Position 14 &rarr; $(14 + 3) pmod{26} = 17$ &rarr; <strong>R</strong></li>
          <li><strong>M:</strong> Position 12 &rarr; $(12 + 3) pmod{26} = 15$ &rarr; <strong>P</strong></li>
          <li><strong>E:</strong> Position 4 &rarr; $(4 + 3) pmod{26} = 7$ &rarr; <strong>H</strong></li>
        </ul>
        <p className="mt-3 text-sm font-semibold text-foreground">
          Plaintext: <code>ROME</code> &rarr; Ciphertext: <code>URPH</code>
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The Special Case of ROT13</h3>
        <p>
          In online forums (such as Reddit and Usenet) and developer communities, a specific variation of the Caesar Cipher called <strong>ROT13</strong> (Rotate by 13 places) is widely used. Because the English alphabet has exactly 26 letters, shifting by 13 is symmetric:
        </p>
        <div className="p-4 rounded-xl border border-border bg-card mt-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Applying ROT13 twice restores the exact original text: $E(E(x)) = (x + 13 + 13) pmod{26} = x + 26 equiv x$. This makes ROT13 the internet&apos;s favorite lightweight method for obscuring movie spoilers, puzzle hints, and offensive jokes without needing separate encryption and decryption algorithms.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">How to Break the Caesar Cipher (Cryptanalysis)</h3>
        <p>
          The Caesar Cipher provides zero security against modern cryptanalysis. An attacker can break it using two trivial techniques:
        </p>

        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Exhaustive Key Search (Brute-Force)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Because the alphabet only contains 26 letters, there are only <strong>25 possible shift keys</strong>. A human can generate and read all 25 variants in under thirty seconds to spot the legible message. Casetivo&apos;s &quot;Crack / All 25 Shifts&quot; mode executes this brute-force attack instantaneously.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. Frequency Analysis (Al-Kindi&apos;s Breakthrough)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pioneered in the 9th century by Arab polymath Al-Kindi, frequency analysis exploits the fact that natural human languages do not use all letters equally. In English, the letter <strong>&apos;E&apos;</strong> appears approximately 12.7% of the time, followed by <strong>&apos;T&apos;</strong> (9.1%) and <strong>&apos;A&apos;</strong> (8.2%). In any sufficiently long Caesar ciphertext, whichever character appears most frequently almost always corresponds to &apos;E&apos;, instantly revealing the secret shift key.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Why We Still Study the Caesar Cipher</h3>
        <p>
          While no modern engineer would protect credit cards or passwords with a substitution shift, studying the Caesar Cipher is essential for:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-sm text-muted-foreground">
          <li><strong>Introductory Cryptography:</strong> Understanding key spaces, symmetric ciphers, and algorithmic complexity.</li>
          <li><strong>Geocaching &amp; ARG Puzzles:</strong> Designing interactive mystery games, escape rooms, and treasure hunts.</li>
          <li><strong>Cybersecurity CTFs:</strong> Cracking beginner challenge flags in capture-the-flag competitions.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "How does the Caesar Cipher Tool work?",
        answer: "The tool shifts each English letter in your input text by a fixed number of positions along the alphabet. In encrypt mode, it moves letters forward; in decrypt mode, it moves them backward; in brute-force mode, it calculates all 25 possible shifts at once."
      },
      {
        question: "What is ROT13 and how does it relate to Caesar Cipher?",
        answer: "ROT13 is a Caesar Cipher with a fixed shift key of 13. Because the alphabet has 26 letters, rotating by 13 is reciprocal: the same function both encrypts and decrypts the message."
      },
      {
        question: "How do I crack an encrypted message if I do not know the shift key?",
        answer: "Select the 'Crack / All 25 Shifts' mode. The tool will print all 25 potential decryptions in the output area. Simply scroll through the list to identify the one line containing readable English words."
      },
      {
        question: "Does the Caesar Cipher encrypt numbers, punctuation, and spaces?",
        answer: "Traditional Caesar ciphers only substitute alphabetic letters (A–Z). Numbers, punctuation marks, emojis, and spaces are preserved unchanged to maintain sentence structure and readability."
      },
      {
        question: "Is the Caesar Cipher secure for modern communication?",
        answer: "No. The Caesar Cipher offers zero cryptographic security. With only 25 possible keys, it can be broken by hand in seconds using frequency analysis or brute-force testing."
      },
      {
        question: "What happens when a shift goes past the letter 'Z'?",
        answer: "The algorithm uses modular arithmetic (mod 26). When a shift moves past 'Z', it wraps around smoothly back to the beginning of the alphabet ('A')."
      },
      {
        question: "Can I preserve uppercase and lowercase letters?",
        answer: "Yes. By default, 'Preserve Letter Case' is enabled, ensuring uppercase letters stay uppercase and lowercase letters stay lowercase."
      },
      {
        question: "What is frequency analysis in cryptography?",
        answer: "Frequency analysis is a technique that measures how often each letter appears in a ciphertext. Because 'E' is the most common letter in English, the most common letter in a Caesar cipher usually represents 'E', revealing the shift."
      },
      {
        question: "Who invented the Caesar Cipher?",
        answer: "The cipher is named after Roman general Julius Caesar, who used it with a shift of 3 around 58 BC to protect military dispatches sent to his officers."
      },
      {
        question: "Is my text uploaded to a server when using this tool?",
        answer: "No. All encryption, decryption, and brute-force cracking calculations execute 100% locally in your web browser. No text ever leaves your machine."
      },
      {
        question: "How do I implement a Caesar Cipher in Python?",
        answer: "You can shift characters using: ''.join(chr((ord(c) - 65 + k) % 26 + 65) if c.isupper() else chr((ord(c) - 97 + k) % 26 + 97) if c.islower() else c for c in text)."
      },
      {
        question: "What modern ciphers replaced the Caesar Cipher?",
        answer: "Modern cryptography replaced simple substitution shifts with complex polyalphabetic ciphers, and eventually advanced symmetric block ciphers like AES (Advanced Encryption Standard) and asymmetric algorithms like RSA."
      }
    ]
  },
  graphqlFormatter: {
    title: "Complete Guide to GraphQL Query Formatting, Schema Architecture, and API Optimization",
    content: (
      <>
        <p>
          Unlike legacy REST APIs that force client applications to accept fixed data models across multiple round-trip endpoints, GraphQL gives client applications the power to request exactly what they need and nothing more. Through declarative query documents, developers define the precise shape of the data returned by the backend service.
        </p>
        <p className="mt-3">
          However, when queries pass through production network payloads, browser developer tools, or server error logs, they are compressed into single unbroken lines. Complex queries with deeply nested fragments, variables, and field arguments become nearly impossible to audit. Casetivo&apos;s <strong>GraphQL Formatter &amp; Beautifier</strong> cleans and restructures messy GraphQL documents with customizable indentation (2 spaces, 4 spaces, or tabs), redundant comma stripping, production payload minification, and selection depth analysis with 100% private in-browser execution.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Understanding the 3 Root Operation Types</h3>
        <p>
          Every GraphQL document defines operations executed against an underlying schema. Modern GraphQL recognizes three distinct root operation types:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Query (Read)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fetches data idempotently without modifying state. Analogous to an HTTP <code>GET</code> request in REST, queries can request parallel nested resources in a single execution tree.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. Mutation (Write)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modifies server-side state (creates, updates, or deletes data), analogous to <code>POST</code>, <code>PUT</code>, or <code>DELETE</code>. Unlike queries, mutations execute serially to ensure data consistency.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. Subscription (Real-Time)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Establishes a persistent bi-directional channel (usually over WebSockets) where the server pushes real-time event updates to the client whenever data changes.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Why Commas Are Optional in GraphQL</h3>
        <p>
          A common source of confusion for developers coming from JSON or JavaScript is whether fields in a GraphQL selection set require commas. 
        </p>
        <div className="p-4 rounded-xl border border-border bg-card mt-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            According to the <strong>official GraphQL Specification (Section 2.1.8)</strong>, commas (<code>,</code>) are formally defined as &quot;insignificant whitespace&quot;. A query formatted with commas (<code>&#123; id, name, email &#125;</code>) is syntactically identical to one formatted with newlines alone (<code>&#123; id
 name
 email &#125;</code>). In idiomatic GraphQL, commas are intentionally omitted in favor of clean vertical alignment. Casetivo automatically strips redundant commas to enforce community style standards.
          </p>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Anatomy of an Idiomatic GraphQL Query</h3>
        <p>
          Production GraphQL operations should always be named and utilize typed variables rather than inline string interpolation:
        </p>

        <div className="p-4 rounded-xl border border-border bg-card font-mono text-xs overflow-x-auto mt-3">
          <span className="text-primary font-bold">query</span> GetUserDashboard($userId: ID!, $limit: Int = 10) &#123;<br />
          &nbsp;&nbsp;user(id: $userId) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;id<br />
          &nbsp;&nbsp;&nbsp;&nbsp;displayName: name<br />
          &nbsp;&nbsp;&nbsp;&nbsp;email<br />
          &nbsp;&nbsp;&nbsp;&nbsp;organization &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tier<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;recentActivities(first: $limit) @include(if: true) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...ActivityFields<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
          &nbsp;&nbsp;&#125;<br />
          &#125;
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The Danger of Unchecked Query Depth</h3>
        <p>
          Because GraphQL allows nested queries, an unformatted or unchecked query can inadvertently trigger massive relational database joins (the notorious <em>N+1 problem</em>). For instance:
        </p>
        <p className="mt-2 text-xs text-muted-foreground font-mono">
          author &rarr; books &rarr; author &rarr; books &rarr; author...
        </p>
        <p className="mt-3">
          Our formatter analyzes your selection tree and calculates the <strong>Max Nesting Depth</strong>. Keeping query depth under 5 levels protects your server from performance exhaustion attacks and memory spikes.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How does the GraphQL Formatter work?",
        answer: "The tool cleans up messy GraphQL documents by normalizing spacing around braces and arguments, setting clean hierarchical indentation, and aligning fields vertically for maximum readability."
      },
      {
        question: "Are commas required in GraphQL queries?",
        answer: "No. The official GraphQL specification treats commas as optional whitespace. Idiomatic GraphQL relies on line breaks instead of commas. Our tool includes an option to strip redundant commas automatically."
      },
      {
        question: "What indentation options are supported?",
        answer: "You can format your operations using 2 Spaces (the standard GraphQL community convention), 4 Spaces, Tab characters, or Minify (which collapses queries into a single line for lightweight HTTP POST payloads)."
      },
      {
        question: "Does this tool format mutations and subscriptions?",
        answer: "Yes. The formatter supports all three GraphQL root operation types: queries, mutations, and subscriptions, as well as reusable fragment definitions."
      },
      {
        question: "How does the tool calculate maximum nesting depth?",
        answer: "The formatter traces every open brace '{' to determine how deeply nested your field selections are. In production, limiting depth to 4 or 5 levels prevents runaway N+1 database queries."
      },
      {
        question: "Can this tool minify GraphQL for network payloads?",
        answer: "Yes. Selecting 'Minify (Compact)' strips all comments, extra spaces, and redundant commas, producing a minimal payload ideal for Apollo Client, Relay, or direct fetch() POST bodies."
      },
      {
        question: "Does the formatter support GraphQL variables and directives?",
        answer: "Yes. Typed variables (e.g. $userId: ID!) and schema directives (e.g. @include, @skip, @deprecated) are fully preserved and formatted cleanly."
      },
      {
        question: "Does it validate whether fields exist on my schema?",
        answer: "This tool focuses purely on structural and syntactic formatting. It ensures your braces and selection sets are valid, but it does not connect to your backend schema to verify field names."
      },
      {
        question: "Are comments preserved during formatting?",
        answer: "Yes. Single-line comments starting with '#' are preserved and aligned with their parent fields in beautify mode. In Minify mode, comments are removed to reduce byte size."
      },
      {
        question: "Is my query data sent to any third-party server?",
        answer: "No. All formatting and depth inspection executes entirely within your browser using client-side JavaScript. No queries, variables, or private API keys leave your device."
      },
      {
        question: "How do I format GraphQL queries in VS Code?",
        answer: "You can install the official 'GraphQL: Syntax Highlighting' and 'Prettier' extensions in Visual Studio Code, which will format .graphql and .gql files on save."
      },
      {
        question: "What is the difference between a named query and an anonymous query?",
        answer: "An anonymous query starts directly with '{' without an operation name. A named query uses 'query OperationName { ... }'. Named queries are strongly recommended in production because they enable server-side caching, logging, and error tracing."
      }
    ]
  },
  htmlFormatter: {
    title: "The Comprehensive Guide to HTML Formatting, DOM Architecture, and Markup Optimization",
    content: (
      <>
        <p>
          HyperText Markup Language (HTML) is the foundational structural skeleton of the World Wide Web. Every webpage, web application, and interactive interface begins as a hierarchical tree of HTML elements known as the Document Object Model (DOM).
        </p>
        <p className="mt-3">
          Over time, template engines, CMS outputs, and rapid edits cause HTML documents to degrade into unreadable code blocks with broken nesting, missing closing tags, erratic indentation, and excessive whitespace. Casetivo&apos;s <strong>HTML Formatter &amp; Beautifier</strong> restores structural clarity to chaotic markup. Whether you are debugging production source code, unminifying web components, or stripping bytes for lightning-fast Core Web Vitals, our tool provides instant indentation controls (2 spaces, 4 spaces, or tabs), void tag intelligence, HTML minification, and DOM nesting depth analysis with 100% private in-browser execution.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">HTML Beautification vs. Minification: The Production Equation</h3>
        <p>
          Engineering high-performance web applications requires balancing human developer readability with browser network economics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">HTML Beautification (Source Code)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Structures tags with consistent vertical indentation. Hierarchical parent-child indentation makes it simple to verify that every opening tag (like <code>&lt;div&gt;</code> or <code>&lt;section&gt;</code>) has a matching closing tag, ensuring accessible and semantically valid markup.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">HTML Minification (Production Delivery)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strips redundant whitespace between tags, removes comments, and collapses empty lines. Minifying HTML reduces payload size over HTTP streams, allowing the browser&apos;s HTML parser to reach the initial render tree faster.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The HTML5 Void Element Standard</h3>
        <p>
          A frequent bug in amateur formatters is incorrectly adding closing tags to elements that should never be closed. According to the <strong>W3C HTML5 Specification</strong>, <em>Void Elements</em> can never have child nodes or closing tags:
        </p>
        <div className="p-4 rounded-xl border border-border bg-card font-mono text-xs overflow-x-auto mt-3">
          &lt;area&gt;, &lt;base&gt;, &lt;br&gt;, &lt;col&gt;, &lt;embed&gt;, &lt;hr&gt;, &lt;img&gt;, &lt;input&gt;, &lt;link&gt;, &lt;meta&gt;, &lt;param&gt;, &lt;source&gt;, &lt;track&gt;, &lt;wbr&gt;
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Writing <code>&lt;img&gt;&lt;/img&gt;</code> or <code>&lt;input&gt;&lt;/input&gt;</code> is technically invalid HTML5. Casetivo&apos;s formatting engine natively recognizes all 14 void elements and handles them cleanly without increasing indentation or creating ghost closing tags.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The 4 Golden Rules of Semantic HTML</h3>
        <ol className="list-decimal pl-6 mt-3 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong>Use Semantic Landmark Elements:</strong> Replace generic <code>&lt;div&gt;</code> wrappers with structural landmarks like <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;article&gt;</code>, and <code>&lt;footer&gt;</code> to enhance SEO and screen reader accessibility.
          </li>
          <li>
            <strong>Maintain Strict Heading Hierarchy:</strong> Never skip heading levels (e.g., jump from <code>&lt;h1&gt;</code> directly to <code>&lt;h3&gt;</code>). Use a single logical <code>&lt;h1&gt;</code> per document.
          </li>
          <li>
            <strong>Always Provide Descriptive Alt Text:</strong> Ensure all <code>&lt;img&gt;</code> tags include purposeful <code>alt</code> attributes for visual accessibility and search engine image indexing.
          </li>
          <li>
            <strong>Watch DOM Nesting Depth:</strong> Keep your DOM tree under 32 levels deep (and under 1,500 total nodes) to prevent performance degradation during browser style recalculations and layout reflows.
          </li>
        </ol>
      </>
    ),
    faqs: [
      {
        question: "How does the HTML Formatter & Beautifier work?",
        answer: "The tool parses the Document Object Model (DOM) token by token, normalizes whitespace between tags, and indents nested elements hierarchically based on your selected indentation style."
      },
      {
        question: "What indentation styles are available?",
        answer: "You can format your markup with 2 Spaces (modern web standard), 4 Spaces (classic enterprise style), Tab characters, or Minify (single-line compact format for production builds)."
      },
      {
        question: "How does the tool handle void and self-closing tags?",
        answer: "The formatter automatically recognizes standard HTML5 void elements (like <img>, <br>, <hr>, <input>, and <meta>) and formats them without expecting a closing tag, preventing indent drift."
      },
      {
        question: "Can this tool unminify compressed HTML from a website?",
        answer: "Yes. Simply paste the single-line minified HTML source code into the input area, select 2 Spaces or 4 Spaces, and click Format to instantly restore complete hierarchical readability."
      },
      {
        question: "Does the formatter preserve HTML comments?",
        answer: "Yes. In beautification mode, HTML comments (<!-- ... -->) are preserved and indented inline with their sibling tags. In Minify mode, comments can be stripped to reduce file size."
      },
      {
        question: "Why should I minify HTML for production?",
        answer: "Minification eliminates redundant whitespace, comments, and empty lines, reducing file transfer size over HTTP and allowing the browser to parse the HTML DOM faster."
      },
      {
        question: "Does it format inline <style> and <script> tags?",
        answer: "Yes. The formatter preserves the containment of inline <style> and <script> blocks, ensuring internal code remains aligned within the parent element."
      },
      {
        question: "What is DOM nesting depth and why does it matter?",
        answer: "DOM nesting depth measures how many parent elements wrap a child node. Excessive depth (more than 32 levels) slows down browser rendering, memory usage, and CSS selector matching."
      },
      {
        question: "Is my HTML code uploaded or sent to an external server?",
        answer: "No. All formatting, beautification, and minification runs 100% locally in your web browser using client-side JavaScript. None of your markup or sensitive credentials leave your device."
      },
      {
        question: "Can I download or copy the formatted HTML directly?",
        answer: "Yes. Use the Copy button in the action bar to copy the formatted markup to your clipboard, or click Download to save the .html file directly to your disk."
      },
      {
        question: "How do I format HTML automatically in VS Code?",
        answer: "In Visual Studio Code, press Shift+Alt+F (Windows) or Shift+Option+F (Mac) to format the active document, or configure 'Editor: Format On Save' in settings."
      },
      {
        question: "What is the difference between HTML and XHTML?",
        answer: "HTML5 is lenient and allows self-closing void elements without trailing slashes. XHTML is based on XML and strictly requires all tags to be closed (e.g. <img /> instead of <img>) and case-sensitive lowercase tags."
      }
    ]
  },
  hexToTextConverter: {
    title: "Complete Guide to Hexadecimal to Text Conversion: Base-16 Radix, ASCII Nibbles, and Memory Inspection",
    content: (
      <>
        <p>
          While computers operate strictly in binary (1s and 0s), raw binary streams are unwieldy for human engineers to read or debug. A single 64-bit memory address written in binary requires 64 characters of eye-straining ones and zeroes.
        </p>
        <p className="mt-3">
          To solve this ergonomic challenge, the computing industry standardized on the <strong>Hexadecimal Numeral System (Base-16)</strong>. Because $2^4 = 16$, exactly four bits of binary data (known as a <em>nibble</em>) map into a single hexadecimal digit. A standard 8-bit byte maps cleanly into exactly two hex characters. Casetivo&apos;s <strong>Hex to Text Converter</strong> provides instant bidirectional translation between hex and readable UTF-8 text, custom byte separators, uppercase/lowercase toggles, optional <code>0x</code> prefixes, and 100% private in-browser execution.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Understanding Base-16: The 16 Hexadecimal Symbols</h3>
        <p>
          In our standard decimal system (Base-10), we count from 0 to 9. Hexadecimal requires 16 distinct symbols to represent values 0 through 15:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-sm text-muted-foreground">
          <li><strong>Digits 0 through 9:</strong> Represent numerical values 0 through 9.</li>
          <li><strong>Letters A through F:</strong> Represent values 10 through 15 (<code>A=10, B=11, C=12, D=13, E=14, F=15</code>).</li>
        </ul>

        <div className="p-4 rounded-xl border border-border bg-card mt-4 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold text-foreground">Character</th>
                <th className="py-2 px-2 text-center">ASCII Dec</th>
                <th className="py-2 px-2 text-center">8-Bit Binary</th>
                <th className="py-2 px-2 text-center">High Nibble</th>
                <th className="py-2 px-2 text-center">Low Nibble</th>
                <th className="py-2 pl-2 text-center font-bold text-primary">Hex Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">&apos;H&apos;</td>
                <td className="py-2 px-2 text-center">72</td>
                <td className="py-2 px-2 text-center">0100 1000</td>
                <td className="py-2 px-2 text-center">0100 (4)</td>
                <td className="py-2 px-2 text-center">1000 (8)</td>
                <td className="py-2 pl-2 text-center font-bold text-primary">48</td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">&apos;i&apos;</td>
                <td className="py-2 px-2 text-center">105</td>
                <td className="py-2 px-2 text-center">0110 1001</td>
                <td className="py-2 px-2 text-center">0110 (6)</td>
                <td className="py-2 px-2 text-center">1001 (9)</td>
                <td className="py-2 pl-2 text-center font-bold text-primary">69</td>
              </tr>
              <tr className="text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">&apos;!&apos;</td>
                <td className="py-2 px-2 text-center">33</td>
                <td className="py-2 px-2 text-center">0010 0001</td>
                <td className="py-2 px-2 text-center">0010 (2)</td>
                <td className="py-2 px-2 text-center">0001 (1)</td>
                <td className="py-2 pl-2 text-center font-bold text-primary">21</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Thus, the greeting string <code>&quot;Hi!&quot;</code> encodes cleanly into the hex string <code>48 69 21</code>.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Why Software Engineers Use Hexadecimal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Memory Addresses &amp; Core Dumps</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When debugging segmentation faults in C, C++, or Rust, pointer memory addresses are printed in hexadecimal (e.g. <code>0x7ffee4b28a10</code>) because each hex pair maps directly to a physical byte in RAM.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. Network Packet Inspection</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Packet analyzers like Wireshark display raw ethernet and TCP packet payloads side-by-side: hexadecimal bytes on the left and decoded ASCII text on the right.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. Cryptographic Hashes &amp; UUIDs</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Algorithms like SHA-256 and MD5 output raw byte arrays that are standardly serialized into 64-character or 32-character hex strings for display in API payloads and Git commit hashes.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">4. Web Colors (Hex Codes)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              CSS color codes like <code>#2563EB</code> are three-byte hexadecimal representations of Red (<code>25</code> = 37), Green (<code>63</code> = 99), and Blue (<code>EB</code> = 235).
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Full Support for UTF-8 and Modern Emojis</h3>
        <p>
          Legacy hex tools only support 7-bit ASCII characters (values 0–127). If you try to convert an emoji or foreign alphabet character, they produce broken gibberish or crash.
        </p>
        <p className="mt-3">
          Casetivo&apos;s converter utilizes true multi-byte <strong>UTF-8 stream encoding</strong>. For example, the rocket emoji (<code>&#128640;</code>) requires 4 bytes in UTF-8, which translates accurately to:
        </p>
        <div className="p-4 rounded-xl border border-border bg-card font-mono text-xs overflow-x-auto mt-2">
          F0 9F 9A 80
        </div>
      </>
    ),
    faqs: [
      {
        question: "How does the Hex to Text Converter work?",
        answer: "The tool translates between hexadecimal (base-16) byte sequences and human-readable UTF-8 text. In hex-to-text mode, it takes pairs of hex digits, converts them to byte values, and decodes them into characters. In text-to-hex mode, it converts each character's byte values into two-digit hex codes."
      },
      {
        question: "What does the '0x' prefix mean?",
        answer: "In programming languages like C, C++, JavaScript, and Python, the '0x' prefix denotes that the number is written in base-16 hexadecimal rather than standard base-10 decimal."
      },
      {
        question: "Why does each byte need two hexadecimal digits?",
        answer: "One hexadecimal digit represents 4 bits (a nibble). Since a standard byte consists of 8 bits, exactly two hex characters (4 bits + 4 bits) represent one full byte (values 00 to FF, or 0 to 255)."
      },
      {
        question: "Does this tool support emojis and non-English scripts?",
        answer: "Yes. Our engine uses UTF-8 encoding. Standard English letters convert to single hex pairs (like 41 for 'A'), while emojis convert to 4 hex pairs (e.g., F0 9F 9A 80 for the rocket emoji)."
      },
      {
        question: "What byte separators can I use?",
        answer: "You can format your hex output with Spaces (standard readability), None (unbroken continuous string), Commas, or Colons (standard for MAC addresses)."
      },
      {
        question: "Can I convert hex without spaces back to text?",
        answer: "Yes. The decoder automatically handles continuous hex strings like '48656C6C6F', grouping every two characters into one byte to decode 'Hello'."
      },
      {
        question: "What causes an 'Odd number of hex characters' error?",
        answer: "Hexadecimal bytes always come in pairs of two digits. If your input has an odd number of characters (e.g. 5 digits), one byte is incomplete and cannot be accurately translated."
      },
      {
        question: "Is hexadecimal considered encryption?",
        answer: "No. Hexadecimal is simply a base-16 numeral representation of data. It provides zero cryptographic security because anyone can convert hex back into text instantly."
      },
      {
        question: "How do I convert hex to string in JavaScript?",
        answer: "To decode hex in modern JavaScript: hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join(''). For full UTF-8 support, buffer through Uint8Array and TextDecoder."
      },
      {
        question: "How do I convert text to hex in Python?",
        answer: "In Python: text.encode('utf-8').hex() returns a continuous hex string. To decode back: bytes.fromhex(hex_string).decode('utf-8')."
      },
      {
        question: "Is my text or hexadecimal data sent to a server?",
        answer: "No. All conversion operations execute 100% locally in your client's web browser using JavaScript. No sensitive keys, memory dumps, or text leave your machine."
      },
      {
        question: "Can I choose between uppercase and lowercase hex?",
        answer: "Yes. Use the Upper/Lower toggle in the formatting bar to output either uppercase (48 65 6C 6C 6F) or lowercase (48 65 6c 6c 6f) hex letters."
      }
    ]
  },
  markdownToHtmlConverter: {
    title: "Complete Guide to Converting Markdown to HTML: GFM Syntax, AST Parsing, and Semantic Publishing",
    content: (
      <>
        <p>
          Created in 2004 by John Gruber and Aaron Swartz, <strong>Markdown</strong> revolutionized digital writing. Before Markdown, authors, documentation engineers, and technical writers were forced to manually craft complex HTML tags (<code>&lt;p&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;a href&gt;</code>) just to publish formatted articles on the web.
        </p>
        <p className="mt-3">
          Markdown introduced a clean, human-readable plain text syntax that can be read naturally in a terminal or text editor while compiling deterministically into clean, valid HTML5. Today, Markdown powers GitHub READMEs, static site generators (Next.js, Astro, Hugo), documentation hubs, and headless CMS platforms. Casetivo&apos;s <strong>Markdown to HTML Converter</strong> transforms standard CommonMark and GitHub Flavored Markdown (GFM) into semantic HTML, featuring live rendered preview, GFM tables, fenced code blocks, task lists, document wrapping, and 100% private in-browser compilation.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">CommonMark vs. GitHub Flavored Markdown (GFM)</h3>
        <p>
          As Markdown exploded in popularity, different software vendors created incompatible flavors. To restore consistency, two primary standards emerged:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">CommonMark (The Base Specification)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A rigorous, unambiguous specification of original Markdown syntax. It standardizes heading parsing, nested lists, blockquotes, inline emphasis, and link definitions across all programming languages.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">GitHub Flavored Markdown (GFM Extensions)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              A strict superset of CommonMark adopted across the software industry. GFM introduces essential engineering additions: pipe tables (<code>| Col | Col |</code>), fenced code blocks with language syntax tags (<code>```typescript</code>), strikethroughs (<code>~~deleted~~</code>), and interactive task lists (<code>- [x]</code>).
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Markdown Syntax to HTML5 Mapping Reference</h3>
        <div className="p-4 rounded-xl border border-border bg-card mt-4 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold text-foreground">Markdown Element</th>
                <th className="py-2 px-2 text-primary font-semibold">Raw Markdown Syntax</th>
                <th className="py-2 pl-2 text-foreground font-semibold">Compiled HTML5 Output</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Heading Level 1</td>
                <td className="py-2 px-2"># Main Heading</td>
                <td className="py-2 pl-2">&lt;h1&gt;Main Heading&lt;/h1&gt;</td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Bold / Strong</td>
                <td className="py-2 px-2">**Bold Text**</td>
                <td className="py-2 pl-2">&lt;strong&gt;Bold Text&lt;/strong&gt;</td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Italic / Emphasis</td>
                <td className="py-2 px-2">*Italic Text*</td>
                <td className="py-2 pl-2">&lt;em&gt;Italic Text&lt;/em&gt;</td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Hyperlink</td>
                <td className="py-2 px-2">[Casetivo](https://casetivo.com)</td>
                <td className="py-2 pl-2">&lt;a href=&quot;https://casetivo.com&quot;&gt;Casetivo&lt;/a&gt;</td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Inline Code</td>
                <td className="py-2 px-2">`const x = 10;`</td>
                <td className="py-2 pl-2">&lt;code&gt;const x = 10;&lt;/code&gt;</td>
              </tr>
              <tr className="text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Blockquote</td>
                <td className="py-2 px-2">&gt; Important note</td>
                <td className="py-2 pl-2">&lt;blockquote&gt;Important note&lt;/blockquote&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">How Markdown Parsers Work: Lexing, AST &amp; Compilation</h3>
        <p>
          Behind the scenes, modern Markdown engines do not simply execute naive regular expression replacements. They operate like miniature compilers:
        </p>
        <ol className="list-decimal pl-6 mt-3 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong>Lexical Tokenization:</strong> The plain text stream is scanned line by line into structural tokens (HeadingToken, TableToken, ListToken, TextToken).
          </li>
          <li>
            <strong>Abstract Syntax Tree (AST):</strong> Tokens are assembled into a hierarchical node tree representing parent-child nesting relationships.
          </li>
          <li>
            <strong>HTML Serialization:</strong> The AST nodes are transformed into semantic, sanitized HTML5 tags and formatted with clean indentation.
          </li>
        </ol>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Why HTML Sanitation Matters (Security)</h3>
        <p>
          Because standard Markdown permits raw HTML tags within documents, allowing unauthenticated users to submit unescaped Markdown can expose your application to <strong>Cross-Site Scripting (XSS)</strong> attacks:
        </p>
        <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-xs text-muted-foreground mt-3">
          Never render user-generated Markdown into the DOM without a sanitizer library (such as DOMPurify or sanitize-html). Malicious users can embed <code>&lt;script&gt;</code> tags or <code>&lt;img onerror=&quot;...&quot;&gt;</code> vectors directly into markdown fields.
        </div>
      </>
    ),
    faqs: [
      {
        question: "How does the Markdown to HTML Converter work?",
        answer: "The tool parses plain text formatted in Markdown syntax, tokenizes headings, lists, tables, links, and code blocks, and compiles them into clean, valid HTML5 markup with live preview capabilities."
      },
      {
        question: "Does it support GitHub Flavored Markdown (GFM)?",
        answer: "Yes. The compiler supports GFM extensions including pipe tables, fenced code blocks with language identifiers, task checkboxes (- [x]), and strikethroughs (~~text~~)."
      },
      {
        question: "Can I view the rendered HTML visually?",
        answer: "Yes. Toggle the 'Live Visual Preview' tab in the top bar to inspect how your rendered HTML content will look on a live web page."
      },
      {
        question: "Can I export a complete HTML document with <html> and <body> tags?",
        answer: "Yes. Check the 'Wrap in Full HTML5 Boilerplate' option to wrap your converted markup inside <!DOCTYPE html>, <html>, <head>, and <body> tags."
      },
      {
        question: "How do I format tables in Markdown?",
        answer: "Create tables using pipes (|) to separate columns and hyphens (-) on the second line to separate the header row: '| Name | Role |\n|---|---|\n| Alice | Lead |'."
      },
      {
        question: "How are code blocks formatted in HTML?",
        answer: "Single backticks (`code`) compile to inline <code> tags. Triple backticks (```lang ... ```) compile to preformatted <pre><code class=\\\"language-lang\\\"> blocks with preserved line breaks."
      },
      {
        question: "Is raw HTML allowed inside Markdown?",
        answer: "Yes. Standard Markdown allows embedding inline HTML tags (like <span>, <div>, or <iframe>) directly within plain text documents."
      },
      {
        question: "Is my Markdown content uploaded or stored anywhere?",
        answer: "No. Conversion and rendering execute 100% locally in your client's web browser using JavaScript. No drafts, proprietary notes, or documents leave your computer."
      },
      {
        question: "How do I convert Markdown to HTML in Python?",
        answer: "In Python, install the 'markdown' package and run: import markdown; html = markdown.markdown(text, extensions=['tables', 'fenced_code'])."
      },
      {
        question: "How do I convert Markdown to HTML in Node.js?",
        answer: "In Node.js, popular libraries include 'marked' or 'markdown-it': const marked = require('marked'); const html = marked.parse(markdownString);"
      },
      {
        question: "Can I copy the compiled HTML directly to my clipboard?",
        answer: "Yes. Use the Copy button in the action bar to instantly copy the generated HTML source code or use Download to save it as an .html file."
      },
      {
        question: "What is the difference between CommonMark and standard Markdown?",
        answer: "Original Markdown had ambiguity in edge cases (such as nested lists and bold punctuation). CommonMark is a formal specification that standardizes the grammar so every compliant parser produces the exact same HTML."
      }
    ]
  },
  jsonStringifier: {
    title: "Complete Guide to JSON Stringification: Escaping Rules, Serializing Objects, and Nested Payloads",
    content: (
      <>
        <p>
          In modern web architectures, passing structured data between systems is rarely as straightforward as pasting raw JSON into an editor. Frequently, developers need to store an entire JSON object inside an environment variable (<code>.env</code>), embed JSON as a string property inside another parent JSON payload, or pass complex data via a command-line <code>cURL</code> argument.
        </p>
        <p className="mt-3">
          In all these scenarios, raw double quotes (<code>&quot;</code>), line breaks (<code>\n</code>), and backslashes (<code>\</code>) will immediately break parsing boundaries unless they are properly escaped. Casetivo&apos;s <strong>JSON Stringifier</strong> automates this conversion: it takes raw text or formatted JSON objects and serializes them into safely escaped single-line strings (the browser equivalent of <code>JSON.stringify()</code>) with custom quote wrapping, unescape capabilities, and 100% private in-browser execution.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Minification vs. Stringification: Understanding the Difference</h3>
        <p>
          Developers often confuse minifying JSON with stringifying JSON:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">Minified JSON</h4>
            <p className="font-mono text-xs text-primary mb-2">&#123;&quot;id&quot;:1,&quot;name&quot;:&quot;Alice&quot;&#125;</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Removes indentation and whitespace. The output is still a first-class JSON object structure parsed directly by browsers and APIs.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">Stringified &amp; Escaped JSON</h4>
            <p className="font-mono text-xs text-amber-500 mb-2">&quot;&#123;\&quot;id\&quot;:1,\&quot;name\&quot;:\&quot;Alice\&quot;&#125;&quot;</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Escapes every internal quotation mark with a backslash (<code>\&quot;</code>) and wraps the entire object in outer quotes. The output is a string literal that can safely live inside other JSON fields.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The RFC 8259 String Escaping Rules</h3>
        <p>
          According to the international JSON specification (RFC 8259 Section 7), any character inside a JSON string literal that could conflict with syntax delimiters must be prefixed with an escape backslash:
        </p>

        <div className="p-4 rounded-xl border border-border bg-card mt-4 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold text-foreground">Character</th>
                <th className="py-2 px-2 text-primary font-semibold">Escape Sequence</th>
                <th className="py-2 pl-2 text-foreground font-semibold">Reason for Escaping</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Double Quote (<code>&quot;</code>)</td>
                <td className="py-2 px-2"><code>\&quot;</code></td>
                <td className="py-2 pl-2">Prevents premature termination of the string literal</td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Backslash (<code>\</code>)</td>
                <td className="py-2 px-2"><code>\\</code></td>
                <td className="py-2 pl-2">Escapes the escape character itself</td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Newline (Line Feed)</td>
                <td className="py-2 px-2"><code>\n</code></td>
                <td className="py-2 pl-2">JSON strings cannot contain physical multiline linebreaks</td>
              </tr>
              <tr className="border-b border-border/50 text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Carriage Return</td>
                <td className="py-2 px-2"><code>\r</code></td>
                <td className="py-2 pl-2">Standardizes Windows CRLF line endings</td>
              </tr>
              <tr className="text-muted-foreground">
                <td className="py-2 pr-4 font-sans font-medium text-foreground">Tab</td>
                <td className="py-2 px-2"><code>\t</code></td>
                <td className="py-2 pl-2">Replaces horizontal tabulation characters</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The 3 Most Common Developer Use Cases</h3>
        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Nested JSON Inside Webhook &amp; Queue Payloads</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Event architectures (like AWS SQS, Kafka, or Stripe webhooks) often require passing a dynamic payload inside a generic string property (e.g. <code>&#123;&quot;event&quot;: &quot;order.created&quot;, &quot;data&quot;: &quot;&#123;\&quot;orderId\&quot;: 101&#125;&quot;&#125;</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. Storing Configs in .env and Kubernetes Secrets</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Environment files cannot safely span multiple lines without quotation escaping. Stringifying your configuration object creates a reliable one-line string: <code>SERVICE_CONFIG=&quot;&#123;\&quot;timeout\&quot;:5000&#125;&quot;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. Command-Line cURL Invocations</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When executing <code>curl -X POST -d &quot;...&quot;</code> in bash or PowerShell, shell quotation rules frequently collide with raw JSON double quotes. Stringifying eliminates shell parsing errors.
            </p>
          </div>
        </div>
      </>
    ),
    faqs: [
      {
        question: "How does the JSON Stringifier work?",
        answer: "The tool converts raw text or structured JSON objects into single-line escaped strings. It escapes internal double quotes with backslashes (\\\"), turns physical newlines into \\n tokens, and wraps the result in quotes."
      },
      {
        question: "What is the difference between minifying and stringifying JSON?",
        answer: "Minifying strips spaces and newlines but keeps the output as a JSON object ({'id':1}). Stringifying escapes all quotes and wraps the object in a string literal (\\\"{\\\\\\\"id\\\\\\\":1}\\\")."
      },
      {
        question: "Can I convert an escaped string back into normal JSON?",
        answer: "Yes. Switch to 'Unescape to Plain Text' mode. The tool will parse backslash escapes (\\\", \\n, \\\\) and reconstruct the original readable text or formatted JSON object."
      },
      {
        question: "Why does JSON require backslash escaping for quotes?",
        answer: "In JSON, double quotes indicate the beginning and end of a string. If a string contains a literal quote without a backslash (\"), the parser interprets it as the end of the string, causing a syntax crash."
      },
      {
        question: "Can this tool handle multiline text with line breaks?",
        answer: "Yes. All physical carriage returns and line feeds are automatically converted into literal '\n' and '\r' escape characters."
      },
      {
        question: "How does this compare to JavaScript's JSON.stringify()?",
        answer: "This tool performs the exact same escaping logic as JSON.stringify(JSON.stringify(object)) in JavaScript, but provides a visual web interface with custom quote toggles and unescaping."
      },
      {
        question: "Does it escape forward slashes?",
        answer: "In the official JSON standard, escaping forward slashes (\/) is optional. Our stringifier retains standard forward slashes (/) for clean URLs while escaping necessary delimiters."
      },
      {
        question: "How do I stringify JSON in Python?",
        answer: "In Python, use json.dumps(): import json; json_string = json.dumps(json.dumps(data_dict))."
      },
      {
        question: "How do I stringify JSON in Node.js / JavaScript?",
        answer: "In JavaScript: const escapedString = JSON.stringify(JSON.stringify(obj)); To escape a plain string: JSON.stringify(rawText)."
      },
      {
        question: "Is my data sent to any third-party server?",
        answer: "No. All stringification, quote escaping, and unescaping runs 100% locally in your client's browser. None of your payload contents are uploaded or logged."
      },
      {
        question: "Why should I use JSON stringify for .env files?",
        answer: "Environment variables (.env) do not support multiline JSON structures without breaking parser lines. Stringifying compresses the JSON into an escaped single line that survives shell parsing."
      },
      {
        question: "Can I copy the escaped string directly to my clipboard?",
        answer: "Yes. Use the Copy button in the action bar to copy the escaped output string directly to your clipboard in one click."
      }
    ]
  },
  jsonToYamlConverter: {
    title: "Complete Guide to Converting JSON to YAML: Data Structures, Indentation Rules, and DevOps Configurations",
    content: (
      <>
        <p>
          In modern software engineering, data serialization formats bridge the gap between application runtimes and human operators. While <strong>JSON (JavaScript Object Notation)</strong> is the universal standard for client-server REST APIs and programmatic data interchange, its strict syntax—requiring balanced braces (<code>&#123;&#125;</code>), brackets (<code>[]</code>), and double-quoted keys—makes large configuration files exhausting for human engineers to write and maintain by hand.
        </p>
        <p className="mt-3">
          To solve this problem, DevOps, cloud infrastructure, and CI/CD tools standardized on <strong>YAML (YAML Ain&apos;t Markup Language)</strong>. By replacing syntactic punctuation with intuitive vertical whitespace and indentation, YAML produces clean, human-readable configuration files. Casetivo&apos;s <strong>JSON to YAML Converter</strong> provides seamless translation of complex JSON objects into idiomatic YAML, featuring custom indentation (2 or 4 spaces), automatic multiline pipe blocks (<code>|</code>), quote toggles, and 100% private in-browser conversion.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">JSON vs. YAML: Architectural Comparison</h3>
        <p>
          Both formats represent associative key-value maps and ordered sequences, but their syntax philosophies differ radically:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">JSON (JavaScript Object Notation)</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
              <li>Governed by RFC 8259 and ECMA-404.</li>
              <li>Strict requirement for double quotes around all keys.</li>
              <li>No comments permitted under the official specification.</li>
              <li>Delimiter-based: uses braces <code>&#123;&#125;</code> and commas <code>,</code>.</li>
              <li>Ideal for high-throughput machine-to-machine APIs.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">YAML (YAML Ain&apos;t Markup Language)</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
              <li>Governed by the YAML 1.2 Specification (a superset of JSON).</li>
              <li>Whitespace and indentation determine nesting hierarchy.</li>
              <li>Native support for single-line comments (<code># comment</code>).</li>
              <li>Quotes are optional for standard string scalars.</li>
              <li>The de facto standard for Kubernetes, Docker Compose, and CI/CD.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">The 3 Essential Indentation Rules of YAML</h3>
        <p>
          Because YAML relies on indentation rather than closing brackets to determine nesting hierarchy, following strict spacing rules is non-negotiable:
        </p>
        <ol className="list-decimal pl-6 mt-3 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong>Never Use Tab Characters:</strong> The YAML specification strictly forbids the use of the Tab character (<code>\t</code>) for indentation. You must always use spaces. Mixing tabs and spaces results in an immediate <code>YAMLException: tabs are not allowed as indent</code>.
          </li>
          <li>
            <strong>Consistent Indentation Width:</strong> Standard practice is 2 spaces per indentation level (the universal standard in Kubernetes manifests and GitHub Actions workflows).
          </li>
          <li>
            <strong>Hyphen Alignment in Arrays:</strong> Array elements are denoted by a leading hyphen and space (<code>- item</code>). Nested properties inside array objects must be indented cleanly below the item key.
          </li>
        </ol>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Why DevOps Relies on YAML</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">1. Kubernetes Manifests</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every Pod, Deployment, Service, and Ingress rule in Kubernetes is declared in YAML (e.g. <code>kubectl apply -f deployment.yaml</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">2. GitHub Actions CI/CD</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automated build, test, and release pipelines located in <code>.github/workflows/*.yml</code> require concise, readable multi-stage workflows.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-semibold text-foreground mb-1 text-sm">3. Docker Compose Stacks</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Defining multi-container local development environments with networking and mounted volumes in <code>docker-compose.yml</code>.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">Handling Multiline Strings: Pipe (<code>|</code>) vs. Folded (<code>&gt;</code>)</h3>
        <p>
          One of YAML&apos;s greatest advantages over JSON is native multiline text representation without messy <code>\n</code> escapes:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-sm text-muted-foreground">
          <li>
            <strong>Literal Block Scalar (<code>|</code>):</strong> Preserves all newlines exactly as written. Used for bash scripts and SSH keys inside configuration files.
          </li>
          <li>
            <strong>Folded Block Scalar (<code>&gt;</code>):</strong> Folds newlines into spaces, forming a continuous paragraph while preserving blank line breaks.
          </li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "How does the JSON to YAML Converter work?",
        answer: "The tool parses your input JSON into an in-memory object tree and serializes it into clean, idiomatic YAML syntax by replacing braces and quotes with consistent 2-space or 4-space vertical indentation."
      },
      {
        question: "Why does YAML forbid the use of Tab characters?",
        answer: "The official YAML specification forbids tabs for indentation because different text editors render tabs at different column widths (2, 4, or 8 spaces), which would corrupt the visual nesting structure."
      },
      {
        question: "What indentation widths are supported?",
        answer: "You can format your YAML output using 2 Spaces (the standard DevOps convention for Kubernetes and GitHub Actions) or 4 Spaces (common in Python-oriented environments)."
      },
      {
        question: "How are multiline JSON strings formatted in YAML?",
        answer: "Strings containing line breaks are automatically converted into clean YAML literal blocks prefixed by a pipe (|), preserving readable line breaks without ugly '\n' escape tokens."
      },
      {
        question: "Can this tool convert Kubernetes deployment JSON to YAML?",
        answer: "Yes. Use the 'Load Kubernetes Deployment Sample' button to see how complex nested Kubernetes JSON definitions map directly into clean, deployable YAML manifests."
      },
      {
        question: "Do strings always need quotation marks in YAML?",
        answer: "No. In YAML, quotes are optional for basic alphanumeric strings. Quotes are only required if a string contains special characters like colons (:), pound signs (#), or matches reserved boolean keywords ('true', 'false', 'yes', 'no')."
      },
      {
        question: "Is YAML a superset of JSON?",
        answer: "Yes. Under the YAML 1.2 specification, every valid JSON document is technically valid YAML. YAML parsers can natively parse JSON structures."
      },
      {
        question: "Can I convert YAML back into JSON?",
        answer: "Yes, Casetivo provides companion converters that can parse YAML manifests back into formatted JSON objects."
      },
      {
        question: "How do I convert JSON to YAML in Python?",
        answer: "In Python, install PyYAML and use: import json, yaml; data = json.loads(json_str); yaml_output = yaml.dump(data, sort_keys=False, indent=2)."
      },
      {
        question: "How do I convert JSON to YAML in Node.js?",
        answer: "In Node.js, install the 'yaml' package: const YAML = require('yaml'); const yamlStr = YAML.stringify(JSON.parse(jsonStr));"
      },
      {
        question: "Is my JSON configuration uploaded or stored on any server?",
        answer: "No. All conversion operations run 100% locally in your client's web browser using JavaScript. No confidential Kubernetes tokens, passwords, or configs leave your device."
      },
      {
        question: "Can I copy the YAML output directly to my clipboard?",
        answer: "Yes. Use the Copy button in the action bar to instantly copy the YAML output to your clipboard, or click Download to save the .yaml file directly."
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
