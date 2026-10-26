"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type UrlMode = "encode" | "decode";
type EncodeScope = "component" | "full-uri";
type SpaceFormat = "%20" | "+";

interface UrlStats {
  charCount: number;
  byteCount: number;
  encodedEntitiesCount: number;
  sizeDelta: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<UrlMode>("encode");
  const [scope, setScope] = useState<EncodeScope>("component");
  const [spaceFormat, setSpaceFormat] = useState<SpaceFormat>("%20");
  const [stats, setStats] = useState<UrlStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const plusSpaceId = useId();

  // Perform RFC 3986 encoding / decoding
  const processUrl = (
    text: string,
    operation: UrlMode,
    targetScope: EncodeScope,
    spaceMode: SpaceFormat
  ): string => {
    if (!text) return "";

    if (operation === "encode") {
      let encoded = targetScope === "component" ? encodeURIComponent(text) : encodeURI(text);

      // In component mode, adhere strictly to RFC 3986 for characters like ! ' ( ) *
      if (targetScope === "component") {
        encoded = encoded.replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
      }

      if (spaceMode === "+") {
        encoded = encoded.replace(/%20/g, "+");
      }

      return encoded;
    } else {
      // Decode mode: replace '+' with space before decoding if coming from form-urlencoded query
      const normalized = text.replace(/\+/g, " ");
      return decodeURIComponent(normalized);
    }
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const result = processUrl(input, mode, scope, spaceFormat);
      setOutput(result);
      setErrorMsg(null);

      // Compute statistics
      const inBytes = new Blob([input]).size;
      const outBytes = new Blob([result]).size;
      const entities = (result.match(/%[0-9a-fA-F]{2}/g) || []).length;

      setStats({
        charCount: result.length,
        byteCount: outBytes,
        encodedEntitiesCount: entities,
        sizeDelta: outBytes - inBytes,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to process URL.");
      setOutput(`// URL Processing Error:\n// ${err.message || "Invalid percent-encoded sequence."}`);
      setStats(null);
    }
  }, [input, mode, scope, spaceFormat]);

  const loadSample = () => {
    if (mode === "encode") {
      setInput("https://example.com/search?category=laptops & tech&query=M3 MacBook Pro 16\"!&location=New York");
    } else {
      setInput("https%3A%2F%2Fexample.com%2Fsearch%3Fcategory%3Dlaptops%20%26%20tech%26query%3DM3%20MacBook%20Pro%2016%22!%26location%3DNew%20York");
    }
  };

  return (
    <TextToolLayout
      titleKey="urlEncoderDecoder"
      subtitleKey="urlEncoderDecoderSubtitle"
      actionLabelKey="urlEncoderDecoderAction"
      inputText={input}
      onInputChange={t => {
        setInput(t);
        if (!t) {
          setOutput("");
          setStats(null);
          setErrorMsg(null);
        }
      }}
      outputText={output}
      onAction={handleAction}
      relatedPostSlugs={[
        "how-to-url-encode-a-link",
        "how-to-encode-and-decode-base64",
        "how-to-format-json-online",
      ]}
      relatedPostsTitle="URL, Base64 & Web Transport Guides"
    >
      <div className="flex flex-col gap-4">
        {/* Mode Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Operation Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">Mode:</span>
            {(["encode", "decode"] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setOutput("");
                  setStats(null);
                  setErrorMsg(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  mode === m
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {m === "encode" ? "Encode URL" : "Decode URL"}
              </button>
            ))}
          </div>

          {/* Quick Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Sample {mode === "encode" ? "URL" : "Encoded String"}
          </button>
        </div>

        {/* Granular Encoding Options */}
        {mode === "encode" && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
            {/* Scope Selection */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground mr-1">Encoding Scope:</span>
              {[
                { id: "component", label: "Query Parameter (encodeURIComponent)" },
                { id: "full-uri", label: "Full URL Address (encodeURI)" },
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setScope(item.id as EncodeScope)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    scope === item.id
                      ? "bg-primary/90 text-primary-foreground"
                      : "border border-border/80 bg-background hover:bg-accent text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Space Encoding Format */}
            <label htmlFor={plusSpaceId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
              <input
                id={plusSpaceId}
                type="checkbox"
                checked={spaceFormat === "+"}
                onChange={e => setSpaceFormat(e.target.checked ? "+" : "%20")}
                className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
              />
              <span>Encode spaces as <code>+</code> (form-urlencoded) instead of <code>%20</code></span>
            </label>
          </div>
        )}

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">Error:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Telemetry Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Output Characters</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.charCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Output Bytes</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.byteCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">% Entities Escaped</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {stats.encodedEntitiesCount}
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Size Change</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {(stats.sizeDelta > 0 ? "+" : "") + stats.sizeDelta} B
              </div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
