"use client";

import { useState, useCallback, useId } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

interface FieldOptions {
  name: boolean;
  email: boolean;
  phone: boolean;
  address: boolean;
  uuid: boolean;
}

type OutputFormat = "card" | "json" | "csv";

const FIRST_NAMES = [
  "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
  "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen",
  "Christopher", "Nancy", "Daniel", "Lisa", "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra"
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"
];

const DOMAINS = [
  "example.com", "testmail.io", "demo-corp.org", "sampleapp.net", "staging-user.internal", "mockdata.dev"
];

const STREETS = [
  "Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Elm St", "Washington Blvd", "Lakeview Way", "Highland Rd", "Pine Ct", "Park Place"
];

const CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA",
  "San Antonio, TX", "San Diego, CA", "Dallas, TX", "Austin, TX", "Seattle, WA", "Denver, CO"
];

export default function ClientPage() {
  const [count, setCount] = useState<number>(5);
  const [format, setFormat] = useState<OutputFormat>("card");
  const [fields, setFields] = useState<FieldOptions>({
    name: true,
    email: true,
    phone: true,
    address: true,
    uuid: true,
  });
  const [output, setOutput] = useState<string>("");
  const [generatedCount, setGeneratedCount] = useState<number>(0);

  const countId = useId();
  const formatId = useId();

  // CSPRNG Helper
  const getRandomItem = <T,>(arr: T[]): T => {
    const buffer = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / arr.length) * arr.length;
    do {
      window.crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);
    return arr[buffer[0] % arr.length];
  };

  const getRandomInt = (min: number, max: number): number => {
    const range = max - min + 1;
    const limit = Math.floor(0x100000000 / range) * range;
    const buffer = new Uint32Array(1);
    do {
      window.crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);
    return min + (buffer[0] % range);
  };

  const handleToggleField = (key: keyof FieldOptions) => {
    setFields((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      // ensure at least one field remains checked
      if (!Object.values(updated).some(Boolean)) {
        return prev;
      }
      return updated;
    });
  };

  const handleGenerate = useCallback(() => {
    const records = Array.from({ length: count }, () => {
      const f = getRandomItem(FIRST_NAMES);
      const l = getRandomItem(LAST_NAMES);
      const domain = getRandomItem(DOMAINS);
      const streetNum = getRandomInt(100, 9999);
      const street = getRandomItem(STREETS);
      const city = getRandomItem(CITIES);
      const areaCode = getRandomInt(200, 999);
      const prefix = getRandomInt(200, 999);
      const lineNum = getRandomInt(1000, 9999);
      const numTag = getRandomInt(1, 99);

      return {
        id: crypto.randomUUID(),
        name: `${f} ${l}`,
        email: `${f.toLowerCase()}.${l.toLowerCase()}${numTag}@${domain}`,
        phone: `(${areaCode}) ${prefix}-${lineNum}`,
        address: `${streetNum} ${street}, ${city}`,
      };
    });

    setGeneratedCount(records.length);

    if (format === "json") {
      const jsonRecords = records.map((r) => {
        const item: Record<string, string> = {};
        if (fields.uuid) item.id = r.id;
        if (fields.name) item.name = r.name;
        if (fields.email) item.email = r.email;
        if (fields.phone) item.phone = r.phone;
        if (fields.address) item.address = r.address;
        return item;
      });
      setOutput(JSON.stringify(jsonRecords, null, 2));
    } else if (format === "csv") {
      const headers: string[] = [];
      if (fields.uuid) headers.push("id");
      if (fields.name) headers.push("name");
      if (fields.email) headers.push("email");
      if (fields.phone) headers.push("phone");
      if (fields.address) headers.push("address");

      const rows = records.map((r) => {
        const cols: string[] = [];
        if (fields.uuid) cols.push(`"${r.id}"`);
        if (fields.name) cols.push(`"${r.name}"`);
        if (fields.email) cols.push(`"${r.email}"`);
        if (fields.phone) cols.push(`"${r.phone}"`);
        if (fields.address) cols.push(`"${r.address}"`);
        return cols.join(",");
      });

      setOutput([headers.join(","), ...rows].join("\n"));
    } else {
      // Formatted Card style
      const cardTexts = records.map((r) => {
        const lines: string[] = [];
        if (fields.uuid) lines.push(`ID:      ${r.id}`);
        if (fields.name) lines.push(`Name:    ${r.name}`);
        if (fields.email) lines.push(`Email:   ${r.email}`);
        if (fields.phone) lines.push(`Phone:   ${r.phone}`);
        if (fields.address) lines.push(`Address: ${r.address}`);
        return lines.join("\n");
      });
      setOutput(cardTexts.join("\n\n---\n\n"));
    }
  }, [count, format, fields]);

  const seo = getSeoContent("random-data-generator", "Random Data Generator");

  return (
    <RandomToolLayout
      titleKey="randomDataGenerator"
      subtitleKey="randomDataGeneratorSubtitle"
      actionLabelKey="randomDataGeneratorAction"
      output={output}
      onGenerate={handleGenerate}
      onClear={() => {
        setOutput("");
        setGeneratedCount(0);
      }}
      seoTitle={seo.title}
      seoContent={seo.content}
      seoFaqs={seo.faqs}
      relatedPostSlugs={["random-data-generator-testing", "how-to-generate-random-numbers", "how-to-generate-random-ip-addresses"]}
      relatedPostsTitle="Synthetic Testing & Randomization Guides"
    >
      <div className="space-y-4 max-w-xl mx-auto">
        {/* Quantity and Format Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={countId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Record Count (1 - 100)
            </label>
            <input
              id={countId}
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={formatId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Output Format
            </label>
            <select
              id={formatId}
              value={format}
              onChange={(e) => setFormat(e.target.value as OutputFormat)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="card">Readable Card (Text)</option>
              <option value="json">Structured JSON Array</option>
              <option value="csv">Comma-Separated (CSV)</option>
            </select>
          </div>
        </div>

        {/* Fields Toggle Checkboxes */}
        <div className="p-3 rounded-lg border border-border/80 bg-card/60 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
            Included Profile Attributes
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={fields.name}
                onChange={() => handleToggleField("name")}
                className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4"
              />
              Full Name
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={fields.email}
                onChange={() => handleToggleField("email")}
                className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4"
              />
              RFC Email
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={fields.phone}
                onChange={() => handleToggleField("phone")}
                className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4"
              />
              Phone Number
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={fields.address}
                onChange={() => handleToggleField("address")}
                className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4"
              />
              Street Address
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={fields.uuid}
                onChange={() => handleToggleField("uuid")}
                className="rounded border-border text-primary focus:ring-primary/40 h-4 w-4"
              />
              UUID v4 Identifier
            </label>
          </div>
        </div>

        {/* Live Telemetry Pill */}
        {generatedCount > 0 && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-accent/40 border border-border/60 text-xs text-muted-foreground">
            <span>
              Generated <strong>{generatedCount}</strong> synthetic records
            </span>
            <span className="font-mono uppercase text-[10px] tracking-wide bg-background/80 px-2 py-0.5 rounded border border-border/40">
              Format: {format.toUpperCase()}
            </span>
          </div>
        )}
      </div>
    </RandomToolLayout>
  );
}
