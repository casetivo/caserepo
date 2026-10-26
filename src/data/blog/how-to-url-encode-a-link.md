---
title: "How to URL Encode a Link and Query String: A Developer Guide"
publish_date: "2026-10-05T09:00:00Z"
meta_description: "Learn how URL percent-encoding works under RFC 3986, the difference between encodeURI and encodeURIComponent, why spaces become %20 or +, and how to prevent double encoding bugs."
featured_image_url: "/og-image.png"
author: "founder"
---

Whenever you perform a Google search, authenticate via OAuth, or share a product link, you will observe complex sequences of percent signs, numbers, and plus symbols embedded inside the address bar:

```
https://example.com/search?q=M3+MacBook+Pro&category=laptops%20%26%20tech
```

This is **URL Encoding** (officially known as **Percent-Encoding**).

While URLs appear to accept any text you type into modern address bars, the underlying HTTP protocol specifications strictly limit valid URL characters to a small subset of standard US-ASCII characters.

If your web application transmits unencoded spaces, ampersands, slashes, or foreign characters in an HTTP request, network routers and backend web frameworks can misinterpret the query structure, truncate user input, or throw a `400 Bad Request` error.

Here is a practical developer guide on how URL encoding works under RFC 3986, the crucial difference between `encodeURI` and `encodeURIComponent`, and how to avoid the notorious double-encoding trap.

---

## 1. Why URLs Require Percent-Encoding

The architecture of the internet relies on **Uniform Resource Identifiers (URIs)** defined by RFC 3986. To allow web servers to parse a URL unambiguously, characters are divided into two distinct classes:

### 1. Unreserved Characters (Never Encoded)
These 66 characters have zero structural meaning in URL syntax. They represent literal data and never require encoding:
- Uppercase letters: `A-Z`
- Lowercase letters: `a-z`
- Decimal digits: `0-9`
- Four safe punctuation symbols: `-` (hyphen), `_` (underscore), `.` (period), and `~` (tilde)

### 2. Reserved Characters (Structural Delimiters)
These characters act as the syntax punctuation of a URL:
- `:` and `/` separate the protocol scheme and directory path (`https://...`)
- `?` marks the start of the query string parameter block
- `&` separates individual query parameters (`key1=val1&key2=val2`)
- `=` binds a parameter key to its value
- `#` marks an in-page fragment identifier

### The Conflict: Data vs. Syntax
Suppose a user searches for `"Rock & Roll"`. If you append the unencoded string directly to a search parameter:

```
https://example.com/search?query=Rock & Roll
```

The web server encounters the unencoded space and ampersand (`&`). The server interprets `&` as a syntax delimiter separating two distinct query variables (`query=Rock` and `Roll`). The search query is corrupted.

To preserve the ampersand as literal data rather than syntax, it must be percent-encoded:

```
https://example.com/search?query=Rock%20%26%20Roll
```

Now the server correctly reads a single query parameter with the value `"Rock & Roll"`.

---

## 2. How Percent-Encoding Works: The Hex Triplet

Percent-encoding transforms unsafe or reserved characters into a **percent sign (`%`) followed by a two-digit hexadecimal number** representing the character's byte value in the ASCII / UTF-8 character set:

| Character | ASCII Decimal | Hexadecimal Value | Percent-Encoded String |
| :---: | :---: | :---: | :---: |
| **Space** | 32 | `20` | `%20` |
| **Exclamation Mark (`!`)** | 33 | `21` | `%21` |
| **Double Quote (`"`)** | 34 | `22` | `%22` |
| **Number Sign (`#`)** | 35 | `23` | `%23` |
| **Dollar Sign (`$`)** | 36 | `24` | `%24` |
| **Percent Sign (`%`)** | 37 | `25` | `%25` |
| **Ampersand (`&`)** | 38 | `26` | `%26` |
| **Forward Slash (`/`)** | 47 | `2F` | `%2F` |
| **Colon (`:`)** | 58 | `3A` | `%3A` |
| **Equals Sign (`=`)** | 61 | `3D` | `%3D` |
| **Question Mark (`?`)** | 63 | `3F` | `%3F` |

### Handling International Scripts & Emojis (UTF-8)
Characters outside the 7-bit ASCII range (such as emojis or international alphabets) are first converted into multi-byte UTF-8 sequences. Each byte is then percent-encoded:

- The rocket emoji (🚀) has four UTF-8 bytes: `F0 9F 9A 80`
- Encoded in a URL: `%F0%9F%9A%80`

---

## 3. The Big Dilemma: `%20` vs. `+` for Spaces

Why do some URLs show `%20` for spaces while others show `+`?

There are two competing specifications:

1. **RFC 3986 (Universal URI Standard):**
   Specifies that spaces must **always be encoded as `%20`**. This applies to URL paths (e.g. `/my%20documents/file.pdf`), query keys, and REST API headers.
2. **HTML Form Specification (`application/x-www-form-urlencoded`):**
   Historically, web browsers submitting HTML `<form method="GET">` forms converted spaces in form input fields into plus signs (`+`) for brevity.

### The Rule of Thumb:
- In URL path segments: **Always use `%20`**. Using `+` in a file path will look for a literal plus character on the server.
- In query strings: Modern backend servers (Node.js, Django, Rails, Spring) automatically decode both `+` and `%20` to whitespace. However, `%20` is the safer, universal standard.

You can toggle between `%20` and `+` space formatting in Casetivo's [URL Encoder & Decoder](/url-encoder-decoder).

---

## 4. `encodeURI` vs. `encodeURIComponent`: When to Use Each

In JavaScript, one of the most frequent junior developer bugs is using `encodeURI` when they should use `encodeURIComponent`:

```javascript
// ❌ WRONG: encodeURI does not encode '&' or '='
const tag = "rock & roll";
const url = "https://api.example.com/search?tag=" + encodeURI(tag);
// Result: "https://api.example.com/search?tag=rock%20&%20roll" (Still broken!)

// ✅ CORRECT: encodeURIComponent encodes '&' into '%26'
const urlCorrect = "https://api.example.com/search?tag=" + encodeURIComponent(tag);
// Result: "https://api.example.com/search?tag=rock%20%26%20roll" (Flawless!)
```

### The Difference:
- **`encodeURI(fullUrl)`**: Use when you have an entire URL address and only want to escape invalid characters (like spaces and emojis) while leaving `://`, `?`, `/`, and `&` functional.
- **`encodeURIComponent(paramValue)`**: Use on **individual parameter values** before concatenating them onto a query string.

---

## 5. The Double Encoding Bug (`%2520`)

One of the most elusive bugs in web development is double encoding.

If a string that is already encoded (`"Hello%20World"`) is passed through an encoding function again, the percent sign (`%`) itself is encoded to `%25`:

$$\text{"Hello World"} \xrightarrow{\text{Encode 1}} \text{"Hello%20World"} \xrightarrow{\text{Encode 2}} \text{"Hello%2520World"}$$

When your server decodes `"Hello%2520World"` once, it receives the literal string `"Hello%20World"` rather than `"Hello World"`, causing broken search results and missing file downloads. Always ensure parameters are only encoded once at the point of request construction.

---

## 6. How to Encode and Decode URLs in Code

### In Modern JavaScript / TypeScript
```typescript
// Query Parameter Encoding (RFC 3986 Compliant)
function encodeQueryParam(val: string): string {
  return encodeURIComponent(val).replace(/[!'()*]/g, c => 
    '%' + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

// Decoding
function decodeParam(encoded: string): string {
  return decodeURIComponent(encoded.replace(/\+/g, ' '));
}

console.log(encodeQueryParam("Tech & Innovation (2026)!"));
// "Tech%20%26%20Innovation%20%282026%29%21"
```

### In Python 3
```python
import urllib.parse

# Percent-encoding with %20
param = "Tech & Innovation"
encoded = urllib.parse.quote(param) # "Tech%20%26%20Innovation"

# Percent-encoding with + for form queries
form_encoded = urllib.parse.quote_plus(param) # "Tech+%26+Innovation"

# Decoding
decoded = urllib.parse.unquote_plus(form_encoded) # "Tech & Innovation"
```

---

## Summary

URL encoding guarantees that parameters, tokens, and international scripts travel intact across the global web without breaking HTTP routing boundaries.

For fast, privacy-safe encoding and decoding with space toggles (`%20` vs `+`), full URI vs component scope, and live byte metrics, use Casetivo's free online [URL Encoder & Decoder](/url-encoder-decoder).
