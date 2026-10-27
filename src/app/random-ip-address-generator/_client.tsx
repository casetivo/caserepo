"use client";

import { useState, useCallback, useId } from "react";
import RandomToolLayout from "@/components/RandomToolLayout";
import { getSeoContent } from "@/data/seoContent";

type IPVersion = "ipv4" | "ipv6";
type SubnetScope = "any" | "public" | "private" | "documentation";

export default function ClientPage() {
  const [version, setVersion] = useState<IPVersion>("ipv4");
  const [scope, setScope] = useState<SubnetScope>("any");
  const [cidr, setCidr] = useState<string>("none");
  const [count, setCount] = useState<number>(5);
  const [output, setOutput] = useState<string>("");
  const [generatedCount, setGeneratedCount] = useState<number>(0);

  const countId = useId();
  const scopeId = useId();
  const cidrId = useId();

  // CSPRNG Random Byte Extraction
  const getRandomByte = (): number => {
    const buffer = new Uint8Array(1);
    window.crypto.getRandomValues(buffer);
    return buffer[0];
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

  const generateIPv4 = (targetScope: SubnetScope): string => {
    if (targetScope === "documentation") {
      // RFC 5737: TEST-NET-1 (192.0.2.0/24), TEST-NET-2 (198.51.100.0/24), TEST-NET-3 (203.0.113.0/24)
      const testNets = [
        `192.0.2.${getRandomInt(1, 254)}`,
        `198.51.100.${getRandomInt(1, 254)}`,
        `203.0.113.${getRandomInt(1, 254)}`,
      ];
      return testNets[getRandomInt(0, 2)];
    }

    if (targetScope === "private") {
      // RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
      const r = getRandomInt(0, 2);
      if (r === 0) {
        return `10.${getRandomByte()}.${getRandomByte()}.${getRandomInt(1, 254)}`;
      } else if (r === 1) {
        const second = 16 + getRandomInt(0, 15);
        return `172.${second}.${getRandomByte()}.${getRandomInt(1, 254)}`;
      } else {
        return `192.168.${getRandomByte()}.${getRandomInt(1, 254)}`;
      }
    }

    if (targetScope === "public") {
      // Must not be 0, 10, 127, 169.254, 172.16-31, 192.168, or >=224
      while (true) {
        const b0 = getRandomByte();
        const b1 = getRandomByte();
        const b2 = getRandomByte();
        const b3 = getRandomInt(1, 254);

        if (b0 === 0 || b0 === 10 || b0 === 127 || b0 >= 224) continue;
        if (b0 === 169 && b1 === 254) continue;
        if (b0 === 172 && b1 >= 16 && b1 <= 31) continue;
        if (b0 === 192 && b1 === 168) continue;
        if (b0 === 192 && b1 === 0 && b2 === 2) continue;
        if (b0 === 198 && b1 === 51 && b2 === 100) continue;
        if (b0 === 203 && b1 === 0 && b2 === 113) continue;

        return `${b0}.${b1}.${b2}.${b3}`;
      }
    }

    // Default "any": valid 1-255 octets avoiding 0.0.0.0
    return `${getRandomInt(1, 223)}.${getRandomByte()}.${getRandomByte()}.${getRandomInt(1, 254)}`;
  };

  const generateIPv6 = (): string => {
    const buffer = new Uint16Array(8);
    window.crypto.getRandomValues(buffer);

    // Global Unicast prefix 2000::/3 (first block 0x2000 to 0x3FFF)
    buffer[0] = 0x2000 + (buffer[0] % 0x2000);

    const parts = Array.from(buffer).map((val) => val.toString(16).padStart(4, "0"));
    return parts.join(":");
  };

  const handleGenerate = useCallback(() => {
    const ips = Array.from({ length: count }, () => {
      let ip = version === "ipv4" ? generateIPv4(scope) : generateIPv6();
      if (cidr !== "none") {
        ip += `/${cidr}`;
      }
      return ip;
    });

    setOutput(ips.join("\n"));
    setGeneratedCount(ips.length);
  }, [count, version, scope, cidr]);

  const seo = getSeoContent("random-ip-address-generator", "Random IP Address Generator");

  return (
    <RandomToolLayout
      titleKey="randomIpAddressGenerator"
      subtitleKey="randomIpAddressGeneratorSubtitle"
      actionLabelKey="randomIpAddressGeneratorAction"
      output={output}
      onGenerate={handleGenerate}
      onClear={() => {
        setOutput("");
        setGeneratedCount(0);
      }}
      seoTitle={seo.title}
      seoContent={seo.content}
      seoFaqs={seo.faqs}
      relatedPostSlugs={["how-to-generate-random-ip-addresses", "random-data-generator-testing", "how-to-generate-random-numbers"]}
      relatedPostsTitle="Network & Synthetic Testing Guides"
    >
      <div className="space-y-4 max-w-xl mx-auto">
        {/* Protocol Version Toggle */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setVersion("ipv4");
              setCidr("none");
            }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              version === "ipv4"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-foreground hover:bg-accent"
            }`}
          >
            IPv4 (32-Bit)
          </button>
          <button
            type="button"
            onClick={() => {
              setVersion("ipv6");
              setCidr("none");
            }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              version === "ipv6"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card border border-border text-foreground hover:bg-accent"
            }`}
          >
            IPv6 (128-Bit)
          </button>
        </div>

        {/* Configuration Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={countId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quantity (1 - 100)
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
            <label htmlFor={scopeId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Network Scope
            </label>
            <select
              id={scopeId}
              value={scope}
              onChange={(e) => setScope(e.target.value as SubnetScope)}
              disabled={version === "ipv6"}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
            >
              <option value="any">Any Valid IPv4</option>
              <option value="public">Routable Public Only</option>
              <option value="private">RFC 1918 Private (LAN)</option>
              <option value="documentation">RFC 5737 Test-Nets</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={cidrId} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              CIDR Suffix
            </label>
            <select
              id={cidrId}
              value={cidr}
              onChange={(e) => setCidr(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
            >
              <option value="none">None (Single IP)</option>
              {version === "ipv4" ? (
                <>
                  <option value="32">/32 (Host)</option>
                  <option value="24">/24 (Class C / 256 hosts)</option>
                  <option value="16">/16 (Class B / 65k hosts)</option>
                  <option value="8">/8 (Class A / 16M hosts)</option>
                </>
              ) : (
                <>
                  <option value="128">/128 (Single Host)</option>
                  <option value="64">/64 (Standard SLAAC Subnet)</option>
                  <option value="48">/48 (Enterprise Site Allocation)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Live Telemetry Pill */}
        {generatedCount > 0 && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-md bg-accent/40 border border-border/60 text-xs text-muted-foreground">
            <span>
              Synthesized <strong>{generatedCount}</strong> {version.toUpperCase()} address{generatedCount > 1 ? "es" : ""}
            </span>
            <span className="font-mono uppercase text-[10px] tracking-wide bg-background/80 px-2 py-0.5 rounded border border-border/40">
              Scope: {version === "ipv4" ? scope : "GLOBAL UNICAST"}
            </span>
          </div>
        )}
      </div>
    </RandomToolLayout>
  );
}
