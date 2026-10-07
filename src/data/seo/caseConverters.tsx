import React from "react";
import Link from "next/link";
import { ToolSeoContent } from "../seoContent";

export const caseConvertersSeo: Record<string, ToolSeoContent> = {
  sentenceCase: {
    title: "Comprehensive Guide to Sentence Case Formatting",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">What is Sentence Case?</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Sentence case</strong> is a standard text formatting and capitalization style where only the first letter of the first word in a sentence is capitalized. According to standard English capitalization rules, sentence case capitalizes the first word after sentence-ending punctuation (periods, question marks, exclamation marks) while preserving the capitalization of proper nouns and acronyms. 
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Major editorial frameworks, including the APA Style Guide and the Microsoft Writing Style Guide, recommend this writing style for its high readability. It is easier to read than <Link href="/upper-case" className="text-primary hover:underline font-medium">UPPERCASE</Link> and looks more modern and conversational than <Link href="/title-case" className="text-primary hover:underline font-medium">Title Case</Link>.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Sentence Case Rules</h3>
          <p className="mb-3 text-muted-foreground">To achieve perfect English grammar and text formatting, follow these core capitalization rules:</p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Capitalize the first word</strong> of every sentence.</li>
            <li><strong>Capitalize proper nouns</strong> (names, places, brands).</li>
            <li><strong>Keep common nouns lowercase</strong> (unless they start a sentence).</li>
            <li><strong>Capitalize after punctuation</strong> (periods, question marks, and exclamation marks).</li>
            <li><strong>Preserve acronyms</strong> (e.g., NASA, HTML, ROI).</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Sentence Case Examples</h3>
          <p className="mb-3 text-muted-foreground">Here are visual examples showing how our capitalization tool instantly fixes poorly formatted paragraphs:</p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium border-b border-border">Before (Incorrect)</th>
                  <th className="px-4 py-3 font-medium border-b border-border">After (Sentence Case)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">HELLO WORLD</td>
                  <td className="px-4 py-3">Hello world</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">hELLO wORLD</td>
                  <td className="px-4 py-3">Hello world</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">THIS IS MY WEBSITE</td>
                  <td className="px-4 py-3">This is my website</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">When Should You Use Sentence Case?</h3>
          <p className="mb-3 text-muted-foreground">Sentence case is universally preferred for long-form reading. It is commonly used for:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span>•</span> Blog posts</li>
            <li className="flex items-center gap-2"><span>•</span> Emails</li>
            <li className="flex items-center gap-2"><span>•</span> Product descriptions</li>
            <li className="flex items-center gap-2"><span>•</span> Essays</li>
            <li className="flex items-center gap-2"><span>•</span> Website content</li>
            <li className="flex items-center gap-2"><span>•</span> Documentation</li>
            <li className="flex items-center gap-2"><span>•</span> User interfaces</li>
            <li className="flex items-center gap-2"><span>•</span> Social media captions</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Sentence Case vs Title Case</h3>
          <p className="mb-3 text-muted-foreground">Choosing between sentence formatting and heading formatting is a common dilemma. Here is how they compare:</p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium border-b border-border">Feature</th>
                  <th className="px-4 py-3 font-medium border-b border-border">Sentence Case</th>
                  <th className="px-4 py-3 font-medium border-b border-border">Title Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Example</td>
                  <td className="px-4 py-3">Hello world</td>
                  <td className="px-4 py-3">Hello World</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Primary Use</td>
                  <td className="px-4 py-3">Used in paragraphs</td>
                  <td className="px-4 py-3">Used in headings</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Readability</td>
                  <td className="px-4 py-3">Easier to read</td>
                  <td className="px-4 py-3">More formal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Common Sentence Case Mistakes</h3>
          <p className="mb-3 text-muted-foreground">When typing quickly or copying data, capitalization errors happen. Our sentence case converter instantly fixes these common mistakes:</p>
          <ul className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border">
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <span className="font-mono text-sm">hello World</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <span className="font-mono text-sm">HELLO WORLD</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <span className="font-mono text-sm">hELLO wORLD</span>
            </li>
            <li className="flex items-start gap-2 pt-2 border-t border-border">
              <span className="text-green-500 mt-0.5">✅</span>
              <span className="font-medium text-foreground">Hello world</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Does Sentence Case Preserve Proper Nouns?</h3>
          <p className="mb-2 text-muted-foreground">
            One of the most frequent questions writers ask is how proper nouns are handled. According to English grammar rules, proper nouns must always remain capitalized, regardless of where they appear in a sentence. Examples include:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4 text-muted-foreground">
            <li><strong>John</strong> (Names)</li>
            <li><strong>Microsoft</strong> (Companies)</li>
            <li><strong>Pakistan</strong> (Countries/Places)</li>
            <li><strong>NASA</strong> (Acronyms)</li>
            <li><strong>ChatGPT</strong> (Brands)</li>
          </ul>
          <p className="text-muted-foreground">
            <em>Note on automatic tools:</em> While human editors naturally recognize names, most automatic online text formatting tools (including this one) aggressively convert text to lowercase before capitalizing the first word. If your text contains proper nouns, you should review the final output and manually re-capitalize names and brands.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Related Capitalization Tools</h3>
          <p className="mb-3 text-muted-foreground">Need a different writing style? Explore our other free text case converters:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/upper-case" className="px-3 py-1.5 bg-muted rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">Upper Case Converter</Link>
            <Link href="/lower-case" className="px-3 py-1.5 bg-muted rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">Lower Case Converter</Link>
            <Link href="/title-case" className="px-3 py-1.5 bg-muted rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">Title Case Converter</Link>
            <Link href="/capitalized-case" className="px-3 py-1.5 bg-muted rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">Capitalize Words</Link>
            <Link href="/inverse-case" className="px-3 py-1.5 bg-muted rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors">Inverse Case</Link>
          </div>
        </section>
      </div>
    ),
    faqs: [
      {
        question: "What is sentence case?",
        answer: "Sentence case is a standard capitalization style where only the first letter of a sentence and proper nouns are capitalized. All other letters are formatted in lowercase. It is the most common and readable format used in everyday writing, books, and paragraphs."
      },
      {
        question: "Is sentence case the same as lowercase?",
        answer: "No. Lowercase means absolutely every letter is small (e.g., 'hello world. i am here'). Sentence case capitalizes the first letter of the sentence (e.g., 'Hello world. I am here'). You can use our Lower Case Converter if you need strict lowercase."
      },
      {
        question: "Can sentence case fix ALL CAPS?",
        answer: "Absolutely. Fixing accidental ALL CAPS is one of the most common reasons people use this tool. Just paste your capitalized text, and it will be instantly softened into readable sentence case."
      },
      {
        question: "Does sentence case preserve punctuation?",
        answer: "Yes, all grammar elements including commas, periods, quotes, and special characters are preserved exactly as you pasted them. The tool only affects alphabetical letters."
      },
      {
        question: "Does it preserve line breaks?",
        answer: "Yes! Our text transformation algorithm detects line breaks and respects them. If you paste multiple paragraphs, the spacing will remain intact while the text formatting is applied."
      },
      {
        question: "Is it free?",
        answer: "Yes, our sentence case converter is completely free to use. There are no word limits, no paywalls, and no account registration required."
      },
      {
        question: "Can I use it on mobile?",
        answer: "Yes, this website is fully responsive. You can easily paste text from your iPhone or Android clipboard, convert it, and copy the result back into your apps."
      },
      {
        question: "Is my text stored?",
        answer: "No. Your privacy is guaranteed. All text transformation happens locally in your browser using JavaScript. We do not upload, track, or save any of your documents on our servers."
      },
      {
        question: "Does it capitalize names?",
        answer: "In standard grammar, yes. However, automatic online converters transform everything to lowercase except the first letter. If your text contains proper nouns (like John, London, or Google), you will need to manually capitalize them after conversion."
      },
      {
        question: "What is the difference between sentence case and title case?",
        answer: "Sentence case only capitalizes the first word of a sentence (Hello world), making it ideal for paragraphs. Title case capitalizes the first letter of every major word (Hello World), making it suitable for headings and book titles."
      },
      {
        question: "Does it work with multiple paragraphs?",
        answer: "Yes! Our text transformation algorithm detects periods, question marks, and exclamation marks across line breaks. You can paste an entire essay, and it will correctly capitalize the first word of every sentence in every paragraph."
      },
      {
        question: "Can I convert copied text?",
        answer: "Yes. Simply copy any text from Word, Google Docs, PDFs, or websites, paste it into our tool, hit the 'Sentence case' button, and copy the formatted text back to your document."
      }
    ]
  },
  lowerCase: {
    title: "Complete Guide to Lowercase Text Conversion",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">What is Lowercase?</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Lowercase</strong> (also called "small letters") refers to the non-capitalized form of every letter in the alphabet (a–z). Unlike <Link href="/sentence-case" className="text-primary hover:underline font-medium">Sentence Case</Link> or <Link href="/title-case" className="text-primary hover:underline font-medium">Title Case</Link>, lowercase formatting converts every single character to its small-letter equivalent—no exceptions. It is one of the most fundamental text formatting operations in writing, programming, and data management.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Converting text to lowercase is essential for data normalization, URL slug generation, case-insensitive comparisons in code, and cleaning up messy user input from forms or databases.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Examples of Lowercase Conversion</h3>
          <p className="mb-3 text-muted-foreground">Here are examples of how different text inputs are transformed into uniform lowercase output:</p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium border-b border-border">Original Text</th>
                  <th className="px-4 py-3 font-medium border-b border-border">Lowercase Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">HELLO WORLD</td>
                  <td className="px-4 py-3 font-mono text-xs">hello world</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">John Doe From New York</td>
                  <td className="px-4 py-3 font-mono text-xs">john doe from new york</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">hElLo WoRlD 123!</td>
                  <td className="px-4 py-3 font-mono text-xs">hello world 123!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">When to Use Lowercase Text</h3>
          <p className="mb-3 text-muted-foreground">Lowercase formatting is critical in both everyday writing and technical workflows. Common scenarios include:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span>•</span> Email address normalization</li>
            <li className="flex items-center gap-2"><span>•</span> URL slug generation</li>
            <li className="flex items-center gap-2"><span>•</span> Database field standardization</li>
            <li className="flex items-center gap-2"><span>•</span> Username and handle formatting</li>
            <li className="flex items-center gap-2"><span>•</span> CSS class and ID naming</li>
            <li className="flex items-center gap-2"><span>•</span> Fixing accidental Caps Lock text</li>
            <li className="flex items-center gap-2"><span>•</span> Search query normalization</li>
            <li className="flex items-center gap-2"><span>•</span> File naming conventions</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Lowercase vs. Sentence Case</h3>
          <p className="mb-3 text-muted-foreground">People often confuse lowercase with <Link href="/sentence-case" className="text-primary hover:underline font-medium">Sentence Case</Link>. Here is a clear comparison:</p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium border-b border-border">Feature</th>
                  <th className="px-4 py-3 font-medium border-b border-border">Lowercase</th>
                  <th className="px-4 py-3 font-medium border-b border-border">Sentence Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Example</td>
                  <td className="px-4 py-3">hello world. how are you?</td>
                  <td className="px-4 py-3">Hello world. How are you?</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Capitalization</td>
                  <td className="px-4 py-3">No capital letters at all</td>
                  <td className="px-4 py-3">First letter of each sentence</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Best For</td>
                  <td className="px-4 py-3">Data, code, URLs, usernames</td>
                  <td className="px-4 py-3">Body paragraphs, emails, essays</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Common Text Formatting Mistakes</h3>
          <p className="mb-3 text-muted-foreground">When working with user-submitted data or cleaning up messy text, these are the typical issues a lowercase converter fixes:</p>
          <ul className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border">
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <div>
                <span className="font-mono text-sm">USER@EXAMPLE.COM</span>
                <p className="text-xs text-muted-foreground">ALL CAPS email — may cause duplicate entries in databases.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <div>
                <span className="font-mono text-sm">My-Blog-Post-Title</span>
                <p className="text-xs text-muted-foreground">Mixed case URL slug — inconsistent and bad for SEO.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <div>
                <span className="font-mono text-sm">hELLO wORLD</span>
                <p className="text-xs text-muted-foreground">Accidental Caps Lock — unreadable and unprofessional.</p>
              </div>
            </li>
            <li className="flex items-start gap-2 pt-2 border-t border-border">
              <span className="text-green-500 mt-0.5">✅</span>
              <div>
                <span className="font-medium text-foreground">user@example.com / my-blog-post-title / hello world</span>
                <p className="text-xs text-muted-foreground">Clean, standardized lowercase output.</p>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">How to Convert Text to Lowercase</h3>
          <p className="mb-2 text-muted-foreground">There are several ways to convert text depending on your workflow:</p>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <strong>Using Casetivo (Online):</strong> Paste any text into the input box above, click the "lower case" button, and copy the clean result. No sign-up, no limits.
            </li>
            <li>
              <strong>Microsoft Word:</strong> Select your text, then press <kbd className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">Shift</kbd> + <kbd className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">F3</kbd> and cycle until you reach all lowercase.
            </li>
            <li>
              <strong>Google Docs:</strong> Highlight the text, go to <em>Format</em> → <em>Text</em> → <em>Capitalization</em> → <em>lowercase</em>.
            </li>
            <li>
              <strong>In Code (JavaScript):</strong> Use the built-in <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">str.toLowerCase()</code> method to programmatically convert strings.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Lowercase in Programming</h3>
          <p className="text-muted-foreground leading-relaxed">
            In software development, converting strings to lowercase is a fundamental operation. It is used for case-insensitive string comparisons, normalizing search queries, generating consistent hash keys, and sanitizing user input before it enters a database. Most modern programming languages provide a native method: <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">.toLowerCase()</code> in JavaScript, <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">.lower()</code> in Python, and <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">strtolower()</code> in PHP. Our online tool provides the same functionality without writing a single line of code.
          </p>
        </section>
      </div>
    ),
    faqs: [
      {
        question: "What is lowercase?",
        answer: "Lowercase refers to the small-letter form of alphabetical characters (a–z). When you convert text to lowercase, every single letter becomes its non-capitalized version, while numbers, symbols, and punctuation remain unchanged."
      },
      {
        question: "Is lowercase the same as sentence case?",
        answer: "No. Lowercase converts every letter to small letters without exceptions (e.g., 'hello world'). Sentence case capitalizes the first letter of each sentence (e.g., 'Hello world'). Use our Sentence Case Converter if you need grammatically correct formatting."
      },
      {
        question: "Will the converter remove numbers or punctuation?",
        answer: "No. The tool only affects alphabetic characters (A–Z). Numbers, symbols, spaces, and punctuation marks are completely preserved exactly as you typed them."
      },
      {
        question: "Is there a character or word limit?",
        answer: "No. Because the conversion runs entirely in your browser using JavaScript, there are no server-side limits. You can convert thousands of words instantly."
      },
      {
        question: "Can I convert uppercase text to lowercase?",
        answer: "Absolutely. Converting ALL CAPS to lowercase is the most common use case for this tool. Just paste your capitalized text and click the button."
      },
      {
        question: "Why is lowercase important for programming?",
        answer: "In coding, lowercase is critical for case-insensitive comparisons, consistent variable naming, URL slug generation, and database normalization. Most programming languages treat 'Hello' and 'hello' as completely different strings."
      },
      {
        question: "Can I use this for email addresses?",
        answer: "Yes! Email addresses are case-insensitive by standard (RFC 5321), so converting them to lowercase ensures consistency in your database and avoids duplicate entries."
      },
      {
        question: "Does it work on mobile devices?",
        answer: "Yes. This website is fully responsive and works on all smartphones and tablets. You can paste text from any mobile app and copy the lowercase result back to your clipboard."
      },
      {
        question: "Is my text stored on your servers?",
        answer: "No. All text processing happens locally in your browser. We do not upload, store, or track any of your text. Your privacy is fully guaranteed."
      },
      {
        question: "What if I need only the first letter lowercase?",
        answer: "This tool converts every letter to lowercase. If you need more selective formatting, try our Sentence Case Converter or Title Case Converter for smarter capitalization rules."
      }
    ]
  },
  upperCase: {
    title: "Complete Guide to Uppercase Text Conversion",
    content: (
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">What is Uppercase?</h3>
          <p className="mb-4 text-muted-foreground leading-relaxed">
            <strong>Uppercase</strong> (also called "capital letters" or "ALL CAPS") is a text formatting style where every alphabetical character is converted to its capitalized form (A–Z). It is the opposite of <Link href="/lower-case" className="text-primary hover:underline font-medium">lowercase</Link> and is significantly more attention-grabbing than <Link href="/sentence-case" className="text-primary hover:underline font-medium">Sentence Case</Link> or <Link href="/title-case" className="text-primary hover:underline font-medium">Title Case</Link>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Uppercase text is commonly used for emphasis, legal documents, signage, architectural blueprints, programming constants, and headlines. While powerful for grabbing attention, overusing ALL CAPS in everyday writing is generally considered impolite, as it is often interpreted as shouting.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Examples of Uppercase Conversion</h3>
          <p className="mb-3 text-muted-foreground">Here are examples of how different text inputs are transformed into ALL CAPS output:</p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium border-b border-border">Original Text</th>
                  <th className="px-4 py-3 font-medium border-b border-border">Uppercase Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">hello world</td>
                  <td className="px-4 py-3 font-mono text-xs">HELLO WORLD</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">The Quick Brown Fox</td>
                  <td className="px-4 py-3 font-mono text-xs">THE QUICK BROWN FOX</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs">order #12345 confirmed!</td>
                  <td className="px-4 py-3 font-mono text-xs">ORDER #12345 CONFIRMED!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">When to Use Uppercase Text</h3>
          <p className="mb-3 text-muted-foreground">Uppercase formatting is essential in specific professional and creative contexts. Common scenarios include:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span>•</span> Legal disclaimers and contracts</li>
            <li className="flex items-center gap-2"><span>•</span> Poster and banner headlines</li>
            <li className="flex items-center gap-2"><span>•</span> Architectural and engineering drawings</li>
            <li className="flex items-center gap-2"><span>•</span> Programming constants and enums</li>
            <li className="flex items-center gap-2"><span>•</span> Social media emphasis</li>
            <li className="flex items-center gap-2"><span>•</span> Product labels and packaging</li>
            <li className="flex items-center gap-2"><span>•</span> Warning signs and safety notices</li>
            <li className="flex items-center gap-2"><span>•</span> Military and government documents</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Uppercase vs. Title Case</h3>
          <p className="mb-3 text-muted-foreground">Understanding the difference between ALL CAPS and <Link href="/title-case" className="text-primary hover:underline font-medium">Title Case</Link> helps you choose the right formatting for your content:</p>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium border-b border-border">Feature</th>
                  <th className="px-4 py-3 font-medium border-b border-border">Uppercase</th>
                  <th className="px-4 py-3 font-medium border-b border-border">Title Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Example</td>
                  <td className="px-4 py-3">THE QUICK BROWN FOX</td>
                  <td className="px-4 py-3">The Quick Brown Fox</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Readability</td>
                  <td className="px-4 py-3">Harder to read in long text</td>
                  <td className="px-4 py-3">Easy to scan for headlines</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-muted-foreground">Best For</td>
                  <td className="px-4 py-3">Legal, signage, emphasis</td>
                  <td className="px-4 py-3">Book titles, blog headlines</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Common Capitalization Mistakes</h3>
          <p className="mb-3 text-muted-foreground">When you need proper ALL CAPS formatting, inconsistent capitalization looks unprofessional. Our tool fixes these common issues:</p>
          <ul className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border">
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <div>
                <span className="font-mono text-sm">IMPORTANT: read this Before signing</span>
                <p className="text-xs text-muted-foreground">Mixed capitalization in a legal disclaimer — looks inconsistent and unprofessional.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <div>
                <span className="font-mono text-sm">Sale ENDS today</span>
                <p className="text-xs text-muted-foreground">Partial caps in a promotional banner — weakens the visual impact.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive mt-0.5">❌</span>
              <div>
                <span className="font-mono text-sm">max_retries</span>
                <p className="text-xs text-muted-foreground">Programming constant in lowercase — violates naming conventions in most languages.</p>
              </div>
            </li>
            <li className="flex items-start gap-2 pt-2 border-t border-border">
              <span className="text-green-500 mt-0.5">✅</span>
              <div>
                <span className="font-medium text-foreground">IMPORTANT: READ THIS BEFORE SIGNING / SALE ENDS TODAY / MAX_RETRIES</span>
                <p className="text-xs text-muted-foreground">Clean, consistent uppercase output.</p>
              </div>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">How to Convert Text to Uppercase</h3>
          <p className="mb-2 text-muted-foreground">There are several ways to capitalize all letters depending on your workflow:</p>
          <ul className="space-y-4 text-muted-foreground">
            <li>
              <strong>Using Casetivo (Online):</strong> Paste any text into the input box above, click the "UPPER CASE" button, and copy the capitalized result. No sign-up required.
            </li>
            <li>
              <strong>Microsoft Word:</strong> Select your text, then press <kbd className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">Shift</kbd> + <kbd className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">F3</kbd> and cycle until all letters are capitalized.
            </li>
            <li>
              <strong>Google Docs:</strong> Highlight the text, go to <em>Format</em> → <em>Text</em> → <em>Capitalization</em> → <em>UPPERCASE</em>.
            </li>
            <li>
              <strong>In Code (JavaScript):</strong> Use the built-in <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">str.toUpperCase()</code> method to programmatically convert strings.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 text-foreground">Uppercase in Programming</h3>
          <p className="text-muted-foreground leading-relaxed">
            In software development, uppercase is the standard naming convention for constants, environment variables, and enum values. For example, <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">MAX_CONNECTIONS</code>, <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">API_KEY</code>, and <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">DATABASE_URL</code> all follow the SCREAMING_SNAKE_CASE convention. Most languages provide a native method: <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">.toUpperCase()</code> in JavaScript, <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">.upper()</code> in Python, and <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded border border-border">strtoupper()</code> in PHP. Our online tool provides the same functionality without writing a single line of code.
          </p>
        </section>
      </div>
    ),
    faqs: [
      {
        question: "What is uppercase?",
        answer: "Uppercase (also called capital letters or ALL CAPS) is a text formatting style where every alphabetical character is converted to its capitalized form (A–Z). Numbers, symbols, and punctuation remain unchanged."
      },
      {
        question: "Does uppercase mean the same as ALL CAPS?",
        answer: "Yes. Uppercase and ALL CAPS refer to exactly the same formatting style where every letter is capitalized (e.g., LIKE THIS). The terms are interchangeable."
      },
      {
        question: "Can I convert uppercase text back to normal?",
        answer: "Yes. Use our Sentence Case Converter to restore proper grammatical capitalization, or our Lower Case Converter if you need all letters in small form."
      },
      {
        question: "Will the converter affect numbers and symbols?",
        answer: "No. The tool only affects alphabetic characters (a–z). Numbers, spaces, punctuation, and special characters are completely preserved."
      },
      {
        question: "Is there a word or character limit?",
        answer: "No. The conversion runs entirely in your browser using JavaScript, so there are no server-side limits. You can convert thousands of words instantly."
      },
      {
        question: "Why is uppercase used in legal documents?",
        answer: "Courts and regulatory bodies often require specific clauses (like liability waivers or warranty disclaimers) to appear in ALL CAPS to ensure they are conspicuous and cannot be overlooked by signers."
      },
      {
        question: "Is typing in ALL CAPS considered rude?",
        answer: "In informal communication (emails, social media, chat), writing in ALL CAPS is widely interpreted as shouting. However, in formal, legal, and design contexts, it is standard practice and perfectly appropriate."
      },
      {
        question: "Can I use this tool on mobile?",
        answer: "Yes. This website is fully responsive. You can paste text from your phone's clipboard, convert it to uppercase, and copy the result back into any app."
      },
      {
        question: "Is my text stored on your servers?",
        answer: "No. All text processing happens locally in your browser. We do not upload, store, or track any of your content. Your privacy is fully guaranteed."
      },
      {
        question: "When should I use uppercase vs. bold text?",
        answer: "Uppercase is ideal for legal emphasis, signage, constants in code, and design. Bold is better for inline emphasis within paragraphs where readability matters. Combining both (bold ALL CAPS) creates maximum visual weight."
      }
    ]
  },
  capitalizedCase: {
    title: "How does the Capitalized Case Converter work?",
    content: (
      <>
        <p>The <strong>Capitalized Case Converter</strong> automatically capitalizes the first letter of <em>every single word</em> in your text, leaving the rest of the letters lowercase. This is useful for formatting names, specific titles, or standardizing lists.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Capitalized Case vs Title Case</h3>
        <p className="mt-2">Unlike Title Case, which smartly ignores small words like "and", "or", and "the", Capitalized Case blindly capitalizes the first letter of every word regardless of grammar rules. It is best used for names (e.g., "John Doe") or lists of items rather than article titles.</p>
      </>
    ),
    faqs: [
      {
        question: "What is capitalized case used for?",
        answer: "It is most commonly used for formatting lists of names, cities, or places where every word requires capitalization."
      },
      {
        question: "Will it capitalize small words like 'a' and 'the'?",
        answer: "Yes, Capitalized Case capitalizes the first letter of every word. If you want to skip small words, use the Title Case converter instead."
      }
    ]
  },
  titleCase: {
    title: "How does the Title Case Converter work?",
    content: (
      <>
        <p>The <strong>Title Case Converter</strong> formats your text perfectly for essay titles, blog post headlines, and book covers. It capitalizes the major words while keeping minor words (like "a", "an", "the", "and", "but") in lowercase, adhering to standard editorial guidelines.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why use a Title Capitalization Tool?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Editorial Standards:</strong> Ensure your blog titles and essays follow AP, APA, or Chicago style guidelines automatically.</li>
          <li><strong>Professionalism:</strong> Correctly formatted headlines look much more professional than randomly capitalized words.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Which words are kept lowercase in Title Case?",
        answer: "Articles (a, an, the), coordinating conjunctions (and, but, or), and short prepositions (in, on, at, to) are typically kept lowercase unless they are the first or last word of the title."
      },
      {
        question: "Is this suitable for APA style?",
        answer: "Yes, our algorithm closely mimics standard editorial rules, making it a great starting point for APA and Chicago style titles."
      }
    ]
  },
  inverseCase: {
    title: "How does the Inverse Case Converter work?",
    content: (
      <>
        <p>The <strong>Inverse Case Converter</strong> flips the capitalization of every letter in your text. If a letter is uppercase, it becomes lowercase, and if it is lowercase, it becomes uppercase. This is the ultimate tool for fixing the "cAPS lOCK" mistake.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">The "Caps Lock" Fixer</h3>
        <p className="mt-2">Have you ever typed a whole paragraph without looking at the screen, only to realize your Caps Lock was on and you held Shift for the first letters? The result looks lIKE tHIS. Instead of retyping everything, just paste it into the Inverse Case converter to instantly fix it.</p>
      </>
    ),
    faqs: [
      {
        question: "What happens to numbers and punctuation?",
        answer: "Numbers and punctuation marks do not have 'cases', so they are completely ignored and remain exactly as they were."
      },
      {
        question: "Is inverse case the same as alternating case?",
        answer: "No. Inverse case flips existing capitalization (a -> A, B -> b). Alternating case (also known as mock text) forces letters into an alternating pattern (e.g., hElLo wOrLd)."
      }
    ]
  }
};
