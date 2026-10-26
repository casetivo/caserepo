"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type HashCase = "lower" | "upper";

interface Md5Stats {
  inputLength: number;
  inputBytes: number;
  hashLength: number;
  bitLength: number;
}

// RFC 1321 compliant UTF-8 MD5 Message-Digest implementation
const computeMd5 = (stringInput: string, casing: HashCase): string => {
  if (!stringInput) return "";

  // Encode UTF-8 multi-byte characters to raw byte stream
  const utf8 = unescape(encodeURIComponent(stringInput));

  const rotateLeft = (n: number, s: number) => (n << s) | (n >>> (32 - s));
  const addUnsigned = (x: number, y: number) => {
    const x4 = x & 0x40000000;
    const y4 = y & 0x40000000;
    const x8 = x & 0x80000000;
    const y8 = y & 0x80000000;
    const rs = (x & 0x3fffffff) + (y & 0x3fffffff);
    if (x4 & y4) return rs ^ 0x80000000 ^ x8 ^ y8;
    if (x4 | y4) {
      if (rs & 0x40000000) return rs ^ 0xc0000000 ^ x8 ^ y8;
      return rs ^ 0x40000000 ^ x8 ^ y8;
    }
    return rs ^ x8 ^ y8;
  };

  const F = (x: number, y: number, z: number) => (x & y) | (~x & z);
  const G = (x: number, y: number, z: number) => (x & z) | (y & ~z);
  const H = (x: number, y: number, z: number) => x ^ y ^ z;
  const I = (x: number, y: number, z: number) => y ^ (x | ~z);

  const FF = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) =>
    addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, F(b, c, d)), addUnsigned(x, ac)), s), b);
  const GG = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) =>
    addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, G(b, c, d)), addUnsigned(x, ac)), s), b);
  const HH = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) =>
    addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, H(b, c, d)), addUnsigned(x, ac)), s), b);
  const II = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) =>
    addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, I(b, c, d)), addUnsigned(x, ac)), s), b);

  const convertToWordArray = (s: string) => {
    const lMsgLen = s.length;
    const lNBytes = ((lMsgLen + 8) >>> 6) + 1;
    const lWordArray = new Array(lNBytes * 16).fill(0);
    for (let i = 0; i < lMsgLen; i++) {
      lWordArray[i >> 2] |= (s.charCodeAt(i) & 0xff) << ((i % 4) * 8);
    }
    lWordArray[lMsgLen >> 2] |= 0x80 << ((lMsgLen % 4) * 8);
    lWordArray[lNBytes * 16 - 2] = lMsgLen * 8;
    return lWordArray;
  };

  const wordToHex = (v: number) => {
    let r = "";
    for (let i = 0; i <= 3; i++) {
      r += ("0" + ((v >>> (i * 8)) & 0xff).toString(16)).slice(-2);
    }
    return r;
  };

  const x = convertToWordArray(utf8);
  let [a, b, c, d] = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476];

  for (let k = 0; k < x.length; k += 16) {
    const [AA, BB, CC, DD] = [a, b, c, d];
    a = FF(a, b, c, d, x[k], 7, -680876936);
    d = FF(d, a, b, c, x[k + 1], 12, -389564586);
    c = FF(c, d, a, b, x[k + 2], 17, 606105819);
    b = FF(b, c, d, a, x[k + 3], 22, -1044525330);
    a = FF(a, b, c, d, x[k + 4], 7, -176418897);
    d = FF(d, a, b, c, x[k + 5], 12, 1200080426);
    c = FF(c, d, a, b, x[k + 6], 17, -1473231341);
    b = FF(b, c, d, a, x[k + 7], 22, -45705983);
    a = FF(a, b, c, d, x[k + 8], 7, 1770035416);
    d = FF(d, a, b, c, x[k + 9], 12, -1958414417);
    c = FF(c, d, a, b, x[k + 10], 17, -42063);
    b = FF(b, c, d, a, x[k + 11], 22, -1990404162);
    a = FF(a, b, c, d, x[k + 12], 7, 1804603682);
    d = FF(d, a, b, c, x[k + 13], 12, -40341101);
    c = FF(c, d, a, b, x[k + 14], 17, -1502002290);
    b = FF(b, c, d, a, x[k + 15], 22, 1236535329);

    a = GG(a, b, c, d, x[k + 1], 5, -165796510);
    d = GG(d, a, b, c, x[k + 6], 9, -1069501632);
    c = GG(c, d, a, b, x[k + 11], 14, 643717713);
    b = GG(b, c, d, a, x[k], 20, -373897302);
    a = GG(a, b, c, d, x[k + 5], 5, -701558691);
    d = GG(d, a, b, c, x[k + 10], 9, 38016083);
    c = GG(c, d, a, b, x[k + 15], 14, -660478335);
    b = GG(b, c, d, a, x[k + 4], 20, -405537848);
    a = GG(a, b, c, d, x[k + 9], 5, 568446438);
    d = GG(d, a, b, c, x[k + 14], 9, -1019803690);
    c = GG(c, d, a, b, x[k + 3], 14, -187363961);
    b = GG(b, c, d, a, x[k + 8], 20, 1163531501);
    a = GG(a, b, c, d, x[k + 13], 5, -1444681467);
    d = GG(d, a, b, c, x[k + 2], 9, -51403784);
    c = GG(c, d, a, b, x[k + 7], 14, 1735328473);
    b = GG(b, c, d, a, x[k + 12], 20, -1926607734);

    a = HH(a, b, c, d, x[k + 5], 4, -378558);
    d = HH(d, a, b, c, x[k + 8], 11, -2022574463);
    c = HH(c, d, a, b, x[k + 11], 16, 1839030562);
    b = HH(b, c, d, a, x[k + 14], 23, -35309556);
    a = HH(a, b, c, d, x[k + 1], 4, -1530992060);
    d = HH(d, a, b, c, x[k + 4], 11, 1272893353);
    c = HH(c, d, a, b, x[k + 7], 16, -155497632);
    b = HH(b, c, d, a, x[k + 10], 23, -1094730640);
    a = HH(a, b, c, d, x[k + 13], 4, 681279174);
    d = HH(d, a, b, c, x[k], 11, -358537222);
    c = HH(c, d, a, b, x[k + 3], 16, -722521979);
    b = HH(b, c, d, a, x[k + 6], 23, 76029189);
    a = HH(a, b, c, d, x[k + 9], 4, -640364487);
    d = HH(d, a, b, c, x[k + 12], 11, -421815835);
    c = HH(c, d, a, b, x[k + 15], 16, 530742520);
    b = HH(b, c, d, a, x[k + 2], 23, -995338651);

    a = II(a, b, c, d, x[k], 6, -198630844);
    d = II(d, a, b, c, x[k + 7], 10, 1126891415);
    c = II(c, d, a, b, x[k + 14], 15, -1416354905);
    b = II(b, c, d, a, x[k + 5], 21, -57434055);
    a = II(a, b, c, d, x[k + 12], 6, 1700485571);
    d = II(d, a, b, c, x[k + 3], 10, -1894986606);
    c = II(c, d, a, b, x[k + 10], 15, -1051523);
    b = II(b, c, d, a, x[k + 1], 21, -2054922799);
    a = II(a, b, c, d, x[k + 8], 6, 1873313359);
    d = II(d, a, b, c, x[k + 15], 10, -30611744);
    c = II(c, d, a, b, x[k + 6], 15, -1560198380);
    b = II(b, c, d, a, x[k + 13], 21, 1309151649);
    a = II(a, b, c, d, x[k + 4], 6, -145523070);
    d = II(d, a, b, c, x[k + 11], 10, -1120210379);
    c = II(c, d, a, b, x[k + 2], 15, 718787259);
    b = II(b, c, d, a, x[k + 9], 21, -343485551);

    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  const rawHash = (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  return casing === "upper" ? rawHash.toUpperCase() : rawHash;
};

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [casing, setCasing] = useState<HashCase>("lower");
  const [stats, setStats] = useState<Md5Stats | null>(null);

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      return;
    }

    try {
      const hash = computeMd5(input, casing);
      setOutput(hash);

      const inBytes = new Blob([input]).size;
      setStats({
        inputLength: input.length,
        inputBytes: inBytes,
        hashLength: hash.length,
        bitLength: 128,
      });
    } catch {
      setOutput("// Error generating MD5 hash.");
      setStats(null);
    }
  }, [input, casing]);

  const loadSample = () => {
    setInput("The quick brown fox jumps over the lazy dog");
  };

  return (
    <TextToolLayout
      titleKey="md5HashGenerator"
      subtitleKey="md5HashGeneratorSubtitle"
      actionLabelKey="md5HashGeneratorAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setStats(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "what-is-md5-hash-generator",
        "how-to-convert-hex-to-text",
        "how-to-encode-and-decode-base64",
      ]}
      relatedPostsTitle="Hashing, Cryptography & Checksum Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Formatting Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Casing Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Hash Casing:</span>
            {(["lower", "upper"] as const).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCasing(c);
                  if (output) {
                    setOutput(c === "upper" ? output.toUpperCase() : output.toLowerCase());
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  casing === c
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {c === "lower" ? "lowercase (standard)" : "UPPERCASE"}
              </button>
            ))}
          </div>

          {/* Quick Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample Text
          </button>
        </div>

        {/* Security Alert Note */}
        <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-400 text-xs leading-relaxed flex items-center gap-2">
          <span>⚠️</span>
          <span>
            <strong>Security Notice:</strong> MD5 is a 128-bit checksum designed for data integrity verification, file deduplication, and legacy caching (Gravatar). Due to collision vulnerabilities, <strong>never use MD5 for password hashing or cryptographic signatures</strong> (use bcrypt, Argon2, or SHA-256 instead).
          </span>
        </div>

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Input Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputLength}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Input Payload</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.inputBytes} B</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Digest Hex Length</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.hashLength} Chars</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Algorithm Bit Width</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.bitLength} Bits</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
