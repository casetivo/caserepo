"use client";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FAQ { question: string; answer: string; }
export interface SeoContentBlockProps { title?: string; content?: React.ReactNode; faqs?: FAQ[]; }

const SeoContentBlock: React.FC<SeoContentBlockProps> = ({ title, content, faqs }) => {
  if (!title && !content && (!faqs || faqs.length === 0)) return null;

  return (
    <article className="mt-12 pt-8 border-t border-border/40 text-left">
      {title && (
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h2>
      )}
      {content && (
        <div className="prose prose-sm dark:prose-invert max-w-none mb-8 text-muted-foreground leading-relaxed">
          {content}
        </div>
      )}
      {faqs && faqs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Frequently Asked Questions</h3>
          <Accordion 
            type="multiple" 
            className="w-full"
            defaultValue={faqs.map((_, i) => `item-${i}`)}
          >
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline hover-brand transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </article>
  );
};

export default SeoContentBlock;
