import React from "react";
import { ToolSeoContent } from "../seoContent";

export const textToolsSeo: Record<string, ToolSeoContent> = {
  duplicateLineRemover: {
    title: "How does the Duplicate Line Remover work?",
    content: (
      <>
        <p>The <strong>Duplicate Line Remover</strong> instantly scans your text document or code and removes any identical lines, leaving you with only unique lines of text. This is a critical tool for data analysts, developers, and writers working with large lists.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Top Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Email Lists:</strong> Clean up your marketing email lists by ensuring no email address appears twice.</li>
          <li><strong>Code Refactoring:</strong> Remove accidentally duplicated import statements or CSS rules.</li>
          <li><strong>Data Cleaning:</strong> Sanitize raw data dumps before importing them into Excel or a database.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Does the tool check for case sensitivity?",
        answer: "By default, exact matches are case-sensitive. 'Apple' and 'apple' will be treated as unique lines."
      },
      {
        question: "Does it sort the lines after removing duplicates?",
        answer: "No, it preserves the original order of your lines. The first occurrence of a line is kept, and subsequent duplicates are removed."
      }
    ]
  },
  duplicateWordFinder: {
    title: "How does the Duplicate Word Finder work?",
    content: (
      <>
        <p>The <strong>Duplicate Word Finder</strong> highlights words that appear multiple times in your text. This tool is a lifesaver for copywriters, editors, and students who want to improve their writing by avoiding repetitive vocabulary.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why avoid duplicate words?</h3>
        <p className="mt-2">Using the same word too many times in a paragraph can make your writing sound robotic and unprofessional. By identifying overused words, you can easily replace them with synonyms to make your text more engaging and articulate.</p>
      </>
    ),
    faqs: [
      {
        question: "Does it count small words like 'the' and 'and'?",
        answer: "Yes, it counts all repeated words. However, editors generally use this tool to spot overused adjectives, nouns, and verbs."
      }
    ]
  },
  emDashRemover: {
    title: "How does the EM Dash Remover work?",
    content: (
      <>
        <p>The <strong>EM Dash Remover</strong> automatically scans your document and strips out all EM dashes (—) and EN dashes (–), or replaces them with standard hyphens (-). This is useful for formatting text for systems that do not support special typography characters.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Typography Standardization</h3>
        <p className="mt-2">Many word processors like Microsoft Word automatically convert double hyphens into long EM dashes. While this looks nice in print, it often breaks when pasted into older databases, coding environments, or plain text systems.</p>
      </>
    ),
    faqs: [
      {
        question: "What is an EM dash?",
        answer: "An EM dash (—) is a long dash used in writing to indicate a break in thought, whereas a standard hyphen (-) is used to connect words."
      }
    ]
  },
  plainTextConverter: {
    title: "How does the Plain Text Converter work?",
    content: (
      <>
        <p>The <strong>Plain Text Converter</strong> removes all rich formatting (bold, italics, underlines, hyperlinks, fonts, and colors) from your text. If you've ever pasted text from a website into an email only to bring the messy background colors with it, this tool fixes that instantly.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Why use Plain Text?</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Clean Pasting:</strong> Strip hidden HTML tags before pasting content into your CMS or blog.</li>
          <li><strong>Email Formatting:</strong> Ensure your emails look professional without accidental font size changes.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Does it remove images?",
        answer: "Yes. Plain text only supports characters. Any embedded images, tables, or interactive elements will be completely stripped out."
      }
    ]
  },
  sentenceRewriter: {
    title: "How does the Sentence Rewriter work?",
    content: (
      <>
        <p>The <strong>Sentence Rewriter</strong> helps you paraphrase and restructure your text to improve clarity, avoid plagiarism, or find a better tone of voice. Simply paste your sentence, and it generates alternative ways to express the same idea.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Who is this for?</h3>
        <p className="mt-2">This tool is perfect for content creators, students writing essays, and professionals who want to refine their emails. It ensures your message is delivered clearly without losing its original meaning.</p>
      </>
    ),
    faqs: [
      {
        question: "Will the meaning of my sentence change?",
        answer: "No, the rewriter uses advanced algorithms to preserve the core intent of your sentence while changing the vocabulary and structure."
      }
    ]
  },
  sortWordsAlphabetically: {
    title: "How does Alphabetical Sorting work?",
    content: (
      <>
        <p>The <strong>Alphabetical Word Sorter</strong> takes a list of words, names, or items and instantly arranges them in A-to-Z or Z-to-A order. It is incredibly useful for organizing directories, glossaries, bibliographies, and class rosters.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Effortless Organization</h3>
        <p className="mt-2">Sorting large lists manually is prone to human error and takes hours. Whether your list is separated by spaces, commas, or newlines, this tool parses the items and perfectly alphabetizes them in milliseconds.</p>
      </>
    ),
    faqs: [
      {
        question: "Can I sort in reverse alphabetical order?",
        answer: "Yes, you can toggle between ascending (A-Z) and descending (Z-A) sorting modes."
      },
      {
        question: "How does it handle numbers and symbols?",
        answer: "Numbers and symbols are sorted based on their standard ASCII value, meaning symbols usually come first, followed by numbers, then letters."
      }
    ]
  },
  removeLettersCharacters: {
    title: "How does the Remove Characters tool work?",
    content: (
      <>
        <p>The <strong>Remove Letters & Characters</strong> tool allows you to specify a string of characters (like numbers, punctuation, or specific letters) and instantly strips them from your entire text document. It is a highly customizable tool for cleaning raw text data.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Advanced Data Cleaning</h3>
        <p className="mt-2">If you have copied a list of phone numbers and need to remove all the dashes and parentheses, or if you need to strip all numbers from a block of text, simply type the characters you want gone into the filter box and watch them disappear instantly.</p>
      </>
    ),
    faqs: [
      {
        question: "Can I remove spaces or line breaks?",
        answer: "Yes! You can specify spaces, tabs, or newline characters in the filter box to strip all whitespace from your document."
      }
    ]
  },
  repeatTextGenerator: {
    title: "How does the Repeat Text Generator work?",
    content: (
      <>
        <p>The <strong>Repeat Text Generator</strong> takes a single string of text and duplicates it as many times as you want, separated by a space, comma, or new line. This is incredibly useful for generating placeholder text or testing layout constraints.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Creating Placeholder Data</h3>
        <p className="mt-2">Web developers often need massive blocks of text to test how a website container expands or handles scrollbars. Instead of copying and pasting 'Lorem Ipsum' manually, you can generate 10,000 repetitions of a word instantly with this tool.</p>
      </>
    ),
    faqs: [
      {
        question: "Is there a limit to how many times I can repeat text?",
        answer: "The tool can handle thousands of repetitions, but generating millions of characters at once may slow down your web browser."
      }
    ]
  },
  reverseTextGenerator: {
    title: "How does the Reverse Text Generator work?",
    content: (
      <>
        <p>The <strong>Reverse Text Generator</strong> flips your entire string of text backward. The first letter becomes the last, and the last letter becomes the first. It is a fun utility for creating mirror text, generating passwords, or solving word puzzles.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Common Uses for Mirror Text</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Security:</strong> Take a memorable word and reverse it to create a harder-to-guess password base.</li>
          <li><strong>Puzzles & Escapes:</strong> Create backwards clues that can only be read by holding them up to a mirror.</li>
        </ul>
      </>
    ),
    faqs: [
      {
        question: "Does it reverse the order of words or letters?",
        answer: "It reverses every single character. For example, 'Hello World' becomes 'dlroW olleH'."
      }
    ]
  },
  romanNumeralDateConverter: {
    title: "How does the Roman Numeral Converter work?",
    content: (
      <>
        <p>The <strong>Roman Numeral Date Converter</strong> translates standard numbers (Arabic numerals) into classic Roman Numerals (I, V, X, L, C, D, M). It is widely used for stylizing dates for tattoos, copyright years, and movie sequels.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Stylizing Important Dates</h3>
        <p className="mt-2">Whether you are designing a wedding invitation or getting a tattoo of a birth date, Roman Numerals add a timeless, classic aesthetic to numbers. This tool ensures you get the exact mathematical translation without mistakes.</p>
      </>
    ),
    faqs: [
      {
        question: "What is the highest number it can convert?",
        answer: "Standard Roman numerals top out at 3,999 (MMMCMXCIX). Converting numbers higher than this requires specialized overline notation which is not supported in standard text."
      }
    ]
  },
  textReplacementTool: {
    title: "How does the Text Replacement Tool work?",
    content: (
      <>
        <p>The <strong>Text Replacement Tool</strong> functions like a mass 'Find and Replace' feature. Enter a target word or phrase, and enter the new text you want to swap it with. The tool scans your document and replaces every single instance instantly.</p>
        <h3 className="text-lg font-semibold mt-6 mb-2 text-foreground">Mass Editing and Refactoring</h3>
        <p className="mt-2">If you have written a 10-page essay and realized you misspelled a character's name throughout, or if you need to rename a variable in a massive block of code, this tool will fix it in milliseconds without requiring a complex IDE.</p>
      </>
    ),
    faqs: [
      {
        question: "Is the find and replace case-sensitive?",
        answer: "You can toggle case-sensitivity on or off. By default, it looks for exact matches to prevent accidental replacements."
      }
    ]
  }
};
