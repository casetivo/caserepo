import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { memo } from "react";

export interface RelatedTool {
  href: string;
  title: string;
  description: string;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  title?: string;
}

const RelatedTools = memo(({ tools, title = "Related Tools" }: RelatedToolsProps) => {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border/60">
      <h3 className="text-2xl font-bold tracking-tight text-foreground mb-6" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link 
            key={tool.href} 
            href={tool.href} 
            className="flex flex-col p-4 rounded-xl border border-border bg-card hover:bg-accent hover:border-border/80 transition-all group shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-semibold text-foreground group-hover-brand transition-colors">
                {tool.title}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 border border-border hover:border-primary/50 shadow-sm"
        >
          Browse All Tools
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
});

RelatedTools.displayName = "RelatedTools";
export default RelatedTools;
