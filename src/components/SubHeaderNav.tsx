"use client";
import { memo, useState, useRef } from "react";
import Link from "next/link";
import { Type, Wrench, Code, Image, Dices, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useI18n } from "@/hooks/useI18n";

const HoverMenu = ({ triggerContent, children, contentClassName }: { triggerContent: React.ReactNode, children: React.ReactNode, contentClassName?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger
        className="flex items-center gap-1 sm:gap-1.5 text-foreground text-sm font-medium hover:text-primary transition-colors cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {triggerContent}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className={contentClassName}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SubHeaderNav = memo(({ children }: { children?: React.ReactNode }) => {
  const { t } = useI18n("base");
  const { t: tt } = useI18n("text");
  const { t: it } = useI18n("image");
  const { t: rt } = useI18n("random");

  const Divider = () => <li className="text-border/60 select-none px-1">|</li>;

  return (
    <ul className="flex items-center flex-wrap justify-center gap-y-2 gap-x-1 sm:gap-x-2 list-none m-0 p-0">
      <li className="shrink-0">
        <HoverMenu
          triggerContent={<>{tt.textTools}<ChevronDown className="w-3 h-3 text-muted-foreground" /></>}
          contentClassName="w-[280px] sm:w-[500px] lg:w-[600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-2 max-h-[80vh] overflow-y-auto"
        >
          {([{ href: "/sentence-case", key: "sentenceCase", dict: t }, { href: "/lower-case", key: "lowerCase", dict: t }, { href: "/upper-case", key: "upperCase", dict: t }, { href: "/capitalized-case", key: "capitalizedCase", dict: t }, { href: "/title-case", key: "titleCase", dict: t }, { href: "/inverse-case", key: "inverseCase", dict: t }]).map(({ href, key, dict }) => (
            <DropdownMenuItem key={href} asChild><Link href={href} className="flex items-center gap-2 cursor-pointer">{dict[key as keyof typeof dict]}</Link></DropdownMenuItem>
          ))}
          {([["duplicate-line-remover", "duplicateLineRemover"], ["duplicate-word-finder", "duplicateWordFinder"], ["em-dash-remover", "emDashRemover"], ["plain-text-converter", "plainTextConverter"], ["remove-letters-characters", "removeLettersCharacters"], ["sentence-rewriter", "sentenceRewriter"], ["repeat-text-generator", "repeatTextGenerator"], ["reverse-text-generator", "reverseTextGenerator"], ["roman-numeral-date-converter", "romanNumeralDateConverter"], ["sort-words-alphabetically", "sortWordsAlphabetically"], ["text-replacement-tool", "textReplacementTool"]] as const).map(([href, key]) => (
            <DropdownMenuItem key={href} asChild><Link href={`/${href}`} className="flex items-center gap-2 cursor-pointer">{tt[key]}</Link></DropdownMenuItem>
          ))}
        </HoverMenu>
      </li>
      <Divider />

      <li className="shrink-0">
        <HoverMenu
          triggerContent={<>{tt.codeAndData}<ChevronDown className="w-3 h-3 text-muted-foreground" /></>}
          contentClassName="w-[280px] sm:w-[500px] lg:w-[600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-2 max-h-[80vh] overflow-y-auto"
        >
          {([["base64-encoder-decoder", "base64EncoderDecoder"], ["binary-code-translator", "binaryCodeTranslator"], ["css-formatter", "cssFormatter"], ["csv-to-json-converter", "csvToJsonConverter"], ["caesar-cipher-tool", "caesarCipherTool"], ["graphql-formatter", "graphqlFormatter"], ["html-formatter", "htmlFormatter"], ["hex-to-text-converter", "hexToTextConverter"], ["json-formatter", "jsonFormatter"], ["url-encoder-decoder", "urlEncoderDecoder"], ["markdown-to-html-converter", "markdownToHtmlConverter"], ["json-stringifier", "jsonStringifier"], ["json-to-yaml-converter", "jsonToYamlConverter"], ["json-stringify-text-generator", "jsonStringifyTextGenerator"], ["javascript-formatter", "javascriptFormatter"], ["md5-hash-generator", "md5HashGenerator"], ["markdown-formatter-previewer", "markdownFormatterPreviewer"], ["markdown-table-generator", "markdownTableGenerator"], ["morse-code-translator", "morseCodeTranslator"], ["number-sorter", "numberSorter"], ["rot13-encoder-decoder", "rot13EncoderDecoder"], ["regex-text-tool", "regexTextTool"], ["scss-formatter", "scssFormatter"]] as const).map(([href, key]) => (
            <DropdownMenuItem key={href} asChild><Link href={`/${href}`} className="flex items-center gap-2 cursor-pointer">{tt[key]}</Link></DropdownMenuItem>
          ))}
        </HoverMenu>
      </li>
      <Divider />

      <li className="shrink-0">
        <HoverMenu
          triggerContent={<>{it.imageAndMedia}<ChevronDown className="w-3 h-3 text-muted-foreground" /></>}
          contentClassName="w-[280px] sm:w-[320px] grid grid-cols-1 sm:grid-cols-2 gap-1 p-2 max-h-[80vh] overflow-y-auto"
        >
          {([{ href: "/ai-image-to-text", label: it.aiImageToText }, { href: "/ascii-art-generator", label: it.asciiArtGenerator }, { href: "/jpg-to-png-converter", label: it.jpgToPng }, { href: "/jpg-to-webp-converter", label: it.jpgToWebp }, { href: "/png-to-jpg-converter", label: it.pngToJpg }, { href: "/png-to-webp-converter", label: it.pngToWebp }, { href: "/svg-to-png-converter", label: it.svgToPng }, { href: "/webp-to-png-converter", label: it.webpToPng }, { href: "/webp-to-jpg-converter", label: it.webpToJpg }]).map(({ href, label }) => (
            <DropdownMenuItem key={href} asChild><Link href={href} className="flex items-center gap-2 cursor-pointer">{label}</Link></DropdownMenuItem>
          ))}
        </HoverMenu>
      </li>
      <Divider />

      <li className="shrink-0">
        <HoverMenu
          triggerContent={<>{rt.randomGenerators}<ChevronDown className="w-3 h-3 text-muted-foreground" /></>}
          contentClassName="w-[280px] sm:w-[320px] grid grid-cols-1 sm:grid-cols-2 gap-1 p-2 max-h-[80vh] overflow-y-auto"
        >
          {([{ href: "/random-choice-generator", label: rt.randomChoiceGenerator }, { href: "/random-data-generator", label: rt.randomDataGenerator }, { href: "/random-ip-address-generator", label: rt.randomIpAddressGenerator }, { href: "/random-letter-generator", label: rt.randomLetterGenerator }, { href: "/random-month-generator", label: rt.randomMonthGenerator }, { href: "/random-number-generator", label: rt.randomNumberGenerator }, { href: "/strong-password-generator", label: rt.strongPasswordGenerator }, { href: "/uuid-generator", label: rt.uuidGenerator }]).map(({ href, label }) => (
            <DropdownMenuItem key={href} asChild><Link href={href} className="flex items-center gap-2 cursor-pointer">{label}</Link></DropdownMenuItem>
          ))}
        </HoverMenu>
      </li>
      <Divider />

      <li className="shrink-0">
        <Link href="/blog" className="flex items-center gap-1 sm:gap-1.5 text-foreground text-sm font-medium hover:text-primary transition-colors cursor-pointer">
          Blog
        </Link>
      </li>
      <Divider />

      <li className="shrink-0">
        <Link href="/invoice-generator" className="flex items-center gap-1 sm:gap-1.5 text-foreground text-sm font-medium hover:text-primary transition-colors cursor-pointer">
          Invoice
        </Link>
      </li>

      {children && (
        <>
          <Divider />
          {children}
        </>
      )}
    </ul>
  );
});

SubHeaderNav.displayName = "SubHeaderNav";
export default SubHeaderNav;

