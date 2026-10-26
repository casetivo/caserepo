"use client";
import SearchButton from "@/components/SearchButton";
import { memo } from "react";
import Link from "next/link";
import SubHeaderNav from "@/components/SubHeaderNav";
import { ArrowLeft, LayoutGrid, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

interface ToolHeaderProps {
  icon: React.ReactNode;
  title: string;
  relatedTools?: Array<{ href: string; label: string }>;
}

const ToolHeader = memo(({ icon, title, relatedTools }: ToolHeaderProps) => (
  <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between xl:justify-start gap-4">
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/"
          prefetch={true}
          aria-label="Back to all tools"
          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center [&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-primary-foreground">
          {icon}
        </div>
        <h1 className="text-lg font-bold tracking-tight text-foreground truncate max-w-[200px] sm:max-w-none" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h1>
      </div>
      
      <div className="hidden xl:flex flex-1 overflow-hidden justify-center">
        <SubHeaderNav>
          <li className="shrink-0 flex items-center">
            <SearchButton />
          </li>
          <li className="text-border/60 select-none px-1">|</li>
          <li className="shrink-0 flex items-center">
            <ThemeToggle />
          </li>
          {relatedTools && relatedTools.length > 0 && (
            <>
              <li className="text-border/60 select-none px-1">|</li>
              <li className="shrink-0 flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                  <span className="hidden sm:inline">More Tools</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {relatedTools.map(({ href, label }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link href={href} prefetch={true} className="cursor-pointer">{label}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem asChild>
                    <Link href="/" className="cursor-pointer font-medium text-primary">← All Tools</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            </>
          )}
        </SubHeaderNav>
      </div>
      
      <div className="flex xl:hidden items-center gap-2 shrink-0">
        <SearchButton />
        <ThemeToggle />
        {relatedTools && relatedTools.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
              <span className="hidden sm:inline">More Tools</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {relatedTools.map(({ href, label }) => (
                <DropdownMenuItem key={href} asChild>
                  <Link href={href} prefetch={true} className="cursor-pointer">{label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild>
                <Link href="/" className="cursor-pointer font-medium text-primary">← All Tools</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
    <div className="xl:hidden border-t border-border/60 bg-card/30 py-1 px-4">
      <SubHeaderNav />
    </div>
  </header>
));
ToolHeader.displayName = "ToolHeader";

export default ToolHeader;
