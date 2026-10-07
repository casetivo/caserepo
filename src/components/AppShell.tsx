"use client";
import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Type, Wrench, Code, Dices, ArrowLeft, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Image } from "lucide-react";

// Static nav links — defined outside component so they're never recreated
const TEXT_TOOLS = [
  ["/sentence-case","Sentence Case"],["/lower-case","lower case"],
  ["/upper-case","UPPER CASE"],["/capitalized-case","Capitalized Case"],
  ["/title-case","Title Case"],["/inverse-case","iNVERSE cASE"],
  ["/duplicate-line-remover","Duplicate Line Remover"],["/duplicate-word-finder","Duplicate Word Finder"],
  ["/em-dash-remover","Em Dash Remover"],["/plain-text-converter","Plain Text Converter"],
  ["/remove-letters-characters","Remove Letters & Characters"],["/sentence-rewriter","Sentence Rewriter"],
  ["/repeat-text-generator","Repeat Text Generator"],["/reverse-text-generator","Reverse Text Generator"],
  ["/roman-numeral-date-converter","Roman Numeral Date Converter"],["/sort-words-alphabetically","Sort Words Alphabetically"],
  ["/text-replacement-tool","Text Replacement Tool"],
] as const;

const CODE_TOOLS = [
  ["/base64-encoder-decoder","Base64 Encoder & Decoder"],["/binary-code-translator","Binary Code Translator"],
  ["/css-formatter","CSS Formatter"],["/csv-to-json-converter","CSV to JSON Converter"],
  ["/caesar-cipher-tool","Caesar Cipher Tool"],["/graphql-formatter","GraphQL Formatter"],
  ["/html-formatter","HTML Formatter"],["/hex-to-text-converter","Hex to Text Converter"],
  ["/json-formatter","JSON Formatter"],["/url-encoder-decoder","URL Encoder & Decoder"],
  ["/markdown-to-html-converter","Markdown to HTML"],["/json-stringifier","JSON Stringifier"],
  ["/json-to-yaml-converter","JSON to YAML"],["/javascript-formatter","JavaScript Formatter"],
  ["/md5-hash-generator","MD5 Hash Generator"],["/markdown-formatter-previewer","Markdown Formatter"],
  ["/markdown-table-generator","Markdown Table Generator"],["/morse-code-translator","Morse Code Translator"],
  ["/number-sorter","Number Sorter"],["/rot13-encoder-decoder","ROT13 Encoder & Decoder"],
  ["/regex-text-tool","Regex Text Tool"],["/scss-formatter","SCSS Formatter"],
] as const;

const IMAGE_TOOLS = [
  ["/ai-image-to-text","AI Image to Text"],["/ascii-art-generator","ASCII Art Generator"],
  ["/jpg-to-png-converter","JPG to PNG"],["/jpg-to-webp-converter","JPG to WebP"],
  ["/png-to-jpg-converter","PNG to JPG"],["/png-to-webp-converter","PNG to WebP"],
  ["/svg-to-png-converter","SVG to PNG"],["/webp-to-png-converter","WebP to PNG"],
  ["/webp-to-jpg-converter","WebP to JPG"],
] as const;

const RANDOM_TOOLS = [
  ["/random-choice-generator","Random Choice Generator"],["/random-data-generator","Random Data Generator"],
  ["/random-ip-address-generator","Random IP Generator"],["/random-letter-generator","Random Letter Generator"],
  ["/random-month-generator","Random Month Generator"],["/random-number-generator","Random Number Generator"],
  ["/strong-password-generator","Password Generator"],["/uuid-generator","UUID Generator"],
] as const;

const HomeNav = memo(() => (
  <nav className="max-w-4xl w-full mx-auto px-4 pb-8">
    <div className="flex flex-wrap gap-3 justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-semibold hover:bg-accent transition-colors">
          Text Tools<ChevronDown className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[280px] sm:w-[400px] grid grid-cols-1 sm:grid-cols-2 gap-1 p-2 max-h-[80vh] overflow-y-auto">
          {TEXT_TOOLS.map(([href, label]) => (
            <DropdownMenuItem key={href} asChild>
              <Link href={href} className="flex items-center gap-2 cursor-pointer">{label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-semibold hover:bg-accent transition-colors">
          Code &amp; Data<ChevronDown className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[280px] sm:w-[500px] lg:w-[600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-2 max-h-[80vh] overflow-y-auto">
          {CODE_TOOLS.map(([href, label]) => (
            <DropdownMenuItem key={href} asChild>
              <Link href={href} className="flex items-center gap-2 cursor-pointer">{label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-semibold hover:bg-accent transition-colors">
          Image Tools<ChevronDown className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[280px] sm:w-[400px] grid grid-cols-1 sm:grid-cols-2 gap-1 p-2 max-h-[80vh] overflow-y-auto">
          {IMAGE_TOOLS.map(([href, label]) => (
            <DropdownMenuItem key={href} asChild>
              <Link href={href} className="flex items-center gap-2 cursor-pointer">{label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-semibold hover:bg-accent transition-colors">
          Random<ChevronDown className="w-4 h-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[280px] sm:w-[400px] grid grid-cols-1 sm:grid-cols-2 gap-1 p-2 max-h-[80vh] overflow-y-auto">
          {RANDOM_TOOLS.map(([href, label]) => (
            <DropdownMenuItem key={href} asChild>
              <Link href={href} className="flex items-center gap-2 cursor-pointer">{label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/blog" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-foreground text-sm font-semibold hover:bg-accent transition-colors">
        📝 Blog
      </Link>
    </div>
  </nav>
));
HomeNav.displayName = "HomeNav";

export { HomeNav };
