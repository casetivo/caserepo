"use client";

import { useState, useCallback, useId } from "react";
import TextToolLayout from "@/components/TextToolLayout";

type YamlIndent = 2 | 4;

interface YamlStats {
  jsonBytes: number;
  yamlBytes: number;
  keysCount: number;
  arraysCount: number;
  sizeRatioPercent: number;
}

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentSize, setIndentSize] = useState<YamlIndent>(2);
  const [quoteStrings, setQuoteStrings] = useState(false);
  const [stats, setStats] = useState<YamlStats | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const quoteStringsId = useId();

  // Robust, standard YAML serializer
  const serializeToYaml = (val: unknown, depth = 0, indentSpaces = 2, forceQuotes = false): string => {
    const pad = " ".repeat(depth * indentSpaces);

    if (val === null) return "null";
    if (typeof val === "boolean" || typeof val === "number") return String(val);

    if (typeof val === "string") {
      // Multiline string: use YAML block literal pipe (|)
      if (val.includes("\n")) {
        const lines = val.split("\n").map(l => " ".repeat((depth + 1) * indentSpaces) + l);
        return `|\n${lines.join("\n")}`;
      }
      // Check if string needs quotes (contains special characters or looks like a number/bool)
      const needsQuotes =
        forceQuotes ||
        /^[0-9]+$/.test(val) ||
        /^(true|false|null|yes|no|on|off)$/i.test(val) ||
        /[:#{}[\],&*!|>'"%@`]/.test(val) ||
        val.trim() === "";

      if (needsQuotes) {
        return `"${val.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
      }
      return val;
    }

    if (Array.isArray(val)) {
      if (val.length === 0) return "[]";
      return val
        .map(item => {
          if (typeof item === "object" && item !== null && !Array.isArray(item)) {
            // Nested object inside array
            const objEntries = Object.entries(item as Record<string, unknown>);
            if (objEntries.length === 0) return `${pad}- {}`;
            const [firstKey, firstVal] = objEntries[0];
            const firstSerialized = serializeToYaml(firstVal, depth + 2, indentSpaces, forceQuotes);
            const firstLine = `${pad}- ${firstKey}:${typeof firstVal === "object" && firstVal !== null ? "\n" + firstSerialized : " " + firstSerialized}`;

            const restLines = objEntries.slice(1).map(([k, v]) => {
              const subSerialized = serializeToYaml(v, depth + 2, indentSpaces, forceQuotes);
              const subPad = " ".repeat((depth + 1) * indentSpaces);
              return `${subPad}${k}:${typeof v === "object" && v !== null ? "\n" + subSerialized : " " + subSerialized}`;
            });

            return [firstLine, ...restLines].join("\n");
          }
          return `${pad}- ${serializeToYaml(item, depth + 1, indentSpaces, forceQuotes)}`;
        })
        .join("\n");
    }

    if (typeof val === "object" && val !== null) {
      const entries = Object.entries(val as Record<string, unknown>);
      if (entries.length === 0) return "{}";

      return entries
        .map(([k, v]) => {
          const formattedVal = serializeToYaml(v, depth + 1, indentSpaces, forceQuotes);
          const isComplex = typeof v === "object" && v !== null && Object.keys(v).length > 0;
          return `${pad}${k}:${isComplex ? "\n" + formattedVal : " " + formattedVal}`;
        })
        .join("\n");
    }

    return String(val);
  };

  const countElements = (obj: unknown): { keys: number; arrays: number } => {
    let keys = 0;
    let arrays = 0;

    const traverse = (item: unknown) => {
      if (Array.isArray(item)) {
        arrays++;
        item.forEach(traverse);
      } else if (typeof item === "object" && item !== null) {
        const objKeys = Object.keys(item);
        keys += objKeys.length;
        Object.values(item).forEach(traverse);
      }
    };

    traverse(obj);
    return { keys, arrays };
  };

  const handleAction = useCallback(() => {
    if (!input.trim()) {
      setOutput("");
      setStats(null);
      setErrorMsg(null);
      return;
    }

    try {
      const parsedJson = JSON.parse(input);
      const yamlResult = serializeToYaml(parsedJson, 0, indentSize, quoteStrings);
      setOutput(yamlResult);
      setErrorMsg(null);

      const inBytes = new Blob([input]).size;
      const outBytes = new Blob([yamlResult]).size;
      const elements = countElements(parsedJson);

      setStats({
        jsonBytes: inBytes,
        yamlBytes: outBytes,
        keysCount: elements.keys,
        arraysCount: elements.arrays,
        sizeRatioPercent: inBytes > 0 ? Math.round((outBytes / inBytes) * 100) : 100,
      });
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid JSON syntax.");
      setOutput(`// Error: ${err.message || "Failed to parse JSON"}\n// Please make sure your input is valid JSON before converting.`);
      setStats(null);
    }
  }, [input, indentSize, quoteStrings]);

  const loadSample = () => {
    const sample = `{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "casetivo-api",
    "labels": {
      "app": "casetivo",
      "tier": "backend"
    }
  },
  "spec": {
    "replicas": 3,
    "selector": {
      "matchLabels": {
        "app": "casetivo"
      }
    },
    "template": {
      "metadata": {
        "labels": {
          "app": "casetivo"
        }
      },
      "spec": {
        "containers": [
          {
            "name": "web-service",
            "image": "casetivo/api:latest",
            "ports": [
              {
                "containerPort": 8080
              }
            ],
            "env": [
              {
                "name": "NODE_ENV",
                "value": "production"
              }
            ]
          }
        ]
      }
    }
  }
}`;
    setInput(sample);
  };

  return (
    <TextToolLayout
      titleKey="jsonToYamlConverter"
      subtitleKey="jsonToYamlConverterSubtitle"
      actionLabelKey="jsonToYamlConverterAction"
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
        "how-to-convert-json-to-yaml",
        "what-is-json-formatter",
        "how-to-convert-csv-to-json",
      ]}
      relatedPostsTitle="JSON, YAML & DevOps Configuration Tutorials"
    >
      <div className="flex flex-col gap-4">
        {/* Settings Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/60 text-sm">
          {/* Indent Selection */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground mr-1">YAML Indentation:</span>
            {([2, 4] as const).map(spaces => (
              <button
                key={spaces}
                type="button"
                onClick={() => setIndentSize(spaces)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  indentSize === spaces
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {spaces} Spaces {spaces === 2 ? "(Standard)" : ""}
              </button>
            ))}
          </div>

          {/* Sample Button */}
          <button
            type="button"
            onClick={loadSample}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-secondary/80 text-foreground hover:bg-secondary transition-all"
          >
            Load Kubernetes Deployment Sample
          </button>
        </div>

        {/* Casing / Formatting Options */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card/40 text-xs sm:text-sm">
          <label htmlFor={quoteStringsId} className="flex items-center gap-2 cursor-pointer select-none text-xs text-foreground">
            <input
              id={quoteStringsId}
              type="checkbox"
              checked={quoteStrings}
              onChange={e => setQuoteStrings(e.target.checked)}
              className="rounded border-border text-primary focus:ring-primary/20 h-3.5 w-3.5"
            />
            <span>Quote All String Literals (e.g. <code>name: &quot;value&quot;</code>)</span>
          </label>

          <span className="text-xs text-muted-foreground">
            Supports nested arrays, objects, multiline blocks (|), &amp; boolean values
          </span>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-xs flex items-center gap-2">
            <span className="font-bold">JSON Error:</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Metrics Dashboard */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-2xl mx-auto w-full text-center">
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">JSON Input Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {(stats.jsonBytes / 1024).toFixed(2)} KB
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">YAML Output Size</div>
              <div className="text-base sm:text-lg font-bold text-foreground">
                {(stats.yamlBytes / 1024).toFixed(2)} KB
              </div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Object Properties</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.keysCount}</div>
            </div>
            <div className="p-2.5 rounded-lg border border-border bg-card">
              <div className="text-xs text-muted-foreground font-medium">Array Sequences</div>
              <div className="text-base sm:text-lg font-bold text-foreground">{stats.arraysCount}</div>
            </div>
          </div>
        )}
      </div>
    </TextToolLayout>
  );
}
