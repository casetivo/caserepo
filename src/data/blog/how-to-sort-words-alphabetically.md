---
title: "How to Sort Words and Lists Alphabetically: Rules, Exceptions, and Practical Tips"
publish_date: "2026-10-23T10:00:00Z"
meta_description: "Learn how to alphabetize lists of words, names, and titles correctly. Practical guide covering word-by-word rules, leading articles, natural numbers, and free tools."
featured_image_url: "/og-image.png"
author: "founder"
---

Alphabetizing a short list seems like something anyone can do in their sleep. Put *Apple* before *Banana*, *Banana* before *Cherry*, and you are done.

However, the moment you need to organize a 500-person customer registry, a bibliography of academic sources, a catalog of book titles, or a list of product inventory SKUs, alphabetical sorting becomes deceptively complex:

- Does *New York* come before or after *Newark*?
- Where do titles starting with *The* or *A* belong?
- Why do computers sort *Item 10* before *Item 2*?
- How should hyphenated surnames like *Smith-Jones* be handled?

Here is a practical, human-written guide to understanding how alphabetical sorting actually works, the industry rules used by librarians and publishers, and how to sort any list in seconds.

---

## 1. Word-by-Word vs. Letter-by-Letter Sorting

The biggest question in alphabetical sorting is how to treat the space between words. Over centuries of cataloging, two distinct traditions emerged:

### Method A: Word-by-Word Sorting (&ldquo;Nothing Before Something&rdquo;)
In word-by-word sorting, the space between words is treated as coming **before** the letter &lsquo;A&rsquo;. As a result, any shorter word finishes sorting before a longer compound word begins.

- **Example:**
  1. *New Jersey*
  2. *New York*
  3. *Newark*

Notice that *New York* appears **before** *Newark*, because the space after *New* takes priority over the &lsquo;a&rsquo; in *Newark*. 

**Where it is used:** The Chicago Manual of Style, APA academic bibliographies, Wikipedia, and Google Search results all use word-by-word sorting. It is the modern gold standard.

### Method B: Letter-by-Letter Sorting
In letter-by-letter sorting, all spaces and punctuation marks are completely ignored. The sorter reads characters continuously as if the entire phrase were one giant word.

- **Example:**
  1. *Newark* (evaluated as *newark*)
  2. *New Jersey* (evaluated as *newjersey*)
  3. *New York* (evaluated as *newyork*)

Notice that *Newark* now appears **before** *New York*, because the letter &lsquo;a&rsquo; comes before &lsquo;y&rsquo;.

**Where it is used:** Traditional telephone directories, geographical gazetteers, and older library card catalogs.

---

## 2. The &ldquo;The&rdquo; Problem: Handling Leading Articles

If you have ever tried sorting a list of movies or books, you know the frustration: half your entire collection ends up clustered under the letter **T** because of the word *The*:

- *The Great Gatsby*
- *The Hobbit*
- *The Lord of the Rings*
- *The Matrix*

In professional publishing and library science, leading English articles&mdash;specifically **A**, **An**, and **The**&mdash;are ignored during sorting:
- *The Hobbit* sorts under **H** (*Hobbit, The*)
- *A Tale of Two Cities* sorts under **T** (*Tale of Two Cities, A*)
- *The Matrix* sorts under **M** (*Matrix, The*)

When using Casetivo's [Sort Words Alphabetically](/sort-words-alphabetically) tool, simply toggle the **&ldquo;Ignore Leading Articles&rdquo;** checkbox to automatically sort titles by their meaningful keywords rather than by *The*.

---

## 3. Natural Numbers vs. Computer ASCII Sorting

Have you ever sorted a list in a spreadsheet or file explorer and seen something like this?

- ❌ **Computer Binary Sort:**
  - `Chapter 1`
  - `Chapter 10`
  - `Chapter 100`
  - `Chapter 2`
  - `Chapter 20`

This occurs because standard computer algorithms evaluate characters one by one. The character `'1'` comes before `'2'`, so the computer puts `10` before `2`.

To fix this, you need **Natural Numeric Sorting**. Natural sorting recognizes embedded digits as whole numerical values:

- &check; **Natural Numeric Sort:**
  - `Chapter 1`
  - `Chapter 2`
  - `Chapter 10`
  - `Chapter 20`
  - `Chapter 100`

Casetivo's sorter enables natural numeric sorting by default, ensuring your chapters, invoice numbers, and version tags sort logically.

---

## 4. How to Sort People's Names Correctly

Computer programs sort from the very first letter of each line. If your contact list is written as:

```text
John Doe
Jane Smith
Albert Johnson
```

Sorting it directly will organize people by their **first names** (*Albert*, *Jane*, *John*). 

To alphabetize a directory or roster by **last name**, follow this simple rule:

1. Format the names as `Lastname, Firstname` before sorting:
   ```text
   Doe, John
   Johnson, Albert
   Smith, Jane
   ```
2. Run the list through the [Sort Words Alphabetically](/sort-words-alphabetically) tool.
3. If desired, you can keep the format or flip them back after sorting.

### What About Surnames with Prefixes (Mc, Mac, De, Van)?
In modern word-by-word sorting, names with prefixes like *De La Cruz*, *Van Buren*, and *McDonald* are sorted strictly as spelled:
- *De La Cruz* sorts under **D**
- *MacDonald* sorts before *McDonald* (because *Mac* precedes *Mc*)
- *O'Connor* sorts under **O**

---

## 5. How to Alphabetize a List in 3 Clicks

Instead of wrestling with complex spreadsheet formulas or third-party plugins, you can alphabetize any list directly in your browser:

1. **Copy your list** from your document, spreadsheet, or notes.
2. Open Casetivo's [Sort Words Alphabetically](/sort-words-alphabetically) tool.
3. Paste your text into the input box.
4. Choose your options:
   - **Line by Line:** Treats each row as an independent item (best for lists, names, and keywords).
   - **Word by Word:** Splits continuous paragraphs into individual sorted words.
   - **A &rarr; Z or Z &rarr; A:** Choose ascending or descending order.
   - **Remove Duplicates:** Automatically deletes identical lines while alphabetizing.
   - **Ignore Leading Articles:** Bypasses *A, An, The* for media and book titles.
5. Click **Sort Words** and copy your clean, alphabetized list.

Because the entire sorting script runs locally inside your browser, none of your private contact names, customer data, or internal documents are ever transmitted over the network.

---

## Final Checklist Before Alphabetizing

Before you hit sort, run through this quick checklist to ensure flawless results:

- [ ] **Check for leading spaces:** A rogue space before a word (e.g., `" Apple"`) can push that item to the top of your list.
- [ ] **Standardize capitalization:** If you don't want uppercase words separated from lowercase words, make sure Case Sensitive mode is turned off.
- [ ] **Remove duplicate entries:** If your raw list has multiple copies of the same item, enable the deduplication toggle to clean your list in the same step.

For more text cleaning workflows, check out our companion guides on [How to Remove Duplicate Lines](/blog/how-to-remove-duplicate-lines-from-text) and [How to Strip Formatting to Plain Text](/blog/how-to-strip-formatting-and-convert-to-plain-text).
