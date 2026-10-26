"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { FileText, Download, Save, Plus, Trash2, Edit, Sparkles, Pencil, Eye, CheckCircle2 } from "lucide-react";
import ToolHeader from "@/components/ToolHeader";
import Footer from "@/components/Footer";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import { createDefaultInvoice, calcTotals, formatCurrency, addDays } from "@/components/invoice/types";
import type { InvoiceData } from "@/components/invoice/types";
import { useInvoiceStore } from "@/components/invoice/useInvoiceStore";
import { downloadInvoicePDF } from "@/components/invoice/pdfGenerator";

const DRAFT_KEY = "casetivo_invoice_draft";

function sampleInvoice(base: InvoiceData): InvoiceData {
  const rows: Array<[string, number, number]> = [
    ["Website design", 1, 1200],
    ["Monthly hosting & maintenance", 3, 45],
  ];
  return {
    ...base,
    fromName: "Acme Design Studio", fromEmail: "billing@acme.example", fromPhone: "+1 555 010 2030",
    fromAddress: "123 Main St\nNew York, NY 10001",
    toName: "Client Corp", toEmail: "accounts@client.example", toPhone: "",
    toAddress: "456 Client Ave\nLos Angeles, CA 90001",
    items: rows.map(([description, quantity, rate]) => ({ id: crypto.randomUUID(), description, quantity, rate, amount: quantity * rate })),
    taxRate: 8, discountRate: 0,
    paymentTerms: "Net 30", dueDate: addDays(base.issueDate, 30),
    paymentInfo: "Bank transfer: Example Bank\nAccount: 0000 0000\nPayPal: billing@acme.example",
  };
}

export default function InvoiceGeneratorClient({ children }: { children?: React.ReactNode }) {
  const { invoices, loaded, saveInvoice, deleteInvoice } = useInvoiceStore();
  const [current, setCurrent] = useState<InvoiceData>(createDefaultInvoice);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [tab, setTab] = useState<"editor" | "saved">("editor");
  const [saved, setSaved] = useState(false);
  const draftReady = useRef(false);

  // Restore the unsaved draft once on the client.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setCurrent(JSON.parse(raw));
    } catch {}
    draftReady.current = true;
  }, []);

  // Auto-save the draft while the user types.
  useEffect(() => {
    if (!draftReady.current) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify(current)); } catch {}
    }, 400);
    return () => clearTimeout(t);
  }, [current]);

  const handleSave = useCallback(() => {
    saveInvoice({ ...current, updatedAt: new Date().toISOString() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [current, saveInvoice]);

  const handleNew = useCallback(() => {
    setCurrent(createDefaultInvoice());
    setTab("editor");
    setMobileView("edit");
  }, []);

  const handleSample = useCallback(() => {
    setCurrent(c => sampleInvoice(c));
    setTab("editor");
  }, []);

  const handleDownload = useCallback(() => downloadInvoicePDF(current), [current]);

  const handleLoad = useCallback((inv: InvoiceData) => {
    setCurrent(inv);
    setTab("editor");
    setMobileView("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { total } = calcTotals(current);
  const tabBtn = (active: boolean) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${active ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:bg-accent"}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ToolHeader brand icon={<FileText />} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 pb-28 lg:pb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
          Free Invoice Generator: Create &amp; Download PDF Invoices Online
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mb-5 max-w-3xl">
          Make a professional invoice online in minutes. Add your business and client details, line items, tax, discount
          and logo, check the live preview, then download a PDF. No sign-up, no watermark fee, and your data stays in your browser.
        </p>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button onClick={() => setTab("editor")} className={tabBtn(tab === "editor")}><FileText className="w-4 h-4" />Editor</button>
          <button onClick={() => setTab("saved")} className={tabBtn(tab === "saved")}><Save className="w-4 h-4" />Saved ({invoices.length})</button>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button onClick={handleSample}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-accent transition-colors">
              <Sparkles className="w-4 h-4" /><span className="hidden sm:inline">Fill with example</span>
            </button>
            <button onClick={() => { if (confirm("Start a new blank invoice? Unsaved changes to this one will be cleared.")) handleNew(); }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-primary/60 text-primary text-sm font-medium hover:bg-primary/5 transition-colors">
              <Plus className="w-4 h-4" /><span className="hidden sm:inline">New invoice</span>
            </button>
            <button onClick={handleSave}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${saved ? "border-green-500 bg-green-50 text-green-700" : "border-border bg-card text-foreground hover:bg-accent"}`}>
              {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
            </button>
            <button onClick={handleDownload}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm">
              <Download className="w-4 h-4" />Download PDF
            </button>
          </div>
        </div>

        {tab === "saved" && (
          <div>
            {!loaded ? (
              <p className="text-muted-foreground text-sm text-center py-12">Loading…</p>
            ) : invoices.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-border rounded-xl">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-foreground font-medium">No saved invoices yet</p>
                <p className="text-muted-foreground text-sm mt-1">Click Save in the editor to keep an invoice on this device.</p>
                <button onClick={() => setTab("editor")} className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">Back to editor</button>
              </div>
            ) : (
              <div className="grid gap-3">
                {invoices.map(inv => (
                  <div key={inv.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: inv.accentColor + "22" }}>
                        <FileText className="w-5 h-5" style={{ color: inv.accentColor }} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground truncate">{inv.invoiceNumber}</div>
                        <div className="text-sm text-muted-foreground truncate">{inv.toName || "No client"} · {new Date(inv.issueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block font-bold text-foreground">{formatCurrency(calcTotals(inv).total, inv.currency)}</div>
                      <div className="flex gap-2">
                        <button onClick={() => handleLoad(inv)} className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" title="Load into editor" aria-label="Load into editor"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                        <Link href={`/invoice-generator/edit/${inv.id}`} className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" title="Open edit page" aria-label="Open edit page"><Pencil className="w-4 h-4 text-muted-foreground" /></Link>
                        <button onClick={() => downloadInvoicePDF(inv)} className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" title="Download PDF" aria-label="Download PDF"><Download className="w-4 h-4 text-muted-foreground" /></button>
                        <button onClick={() => { if (confirm("Delete this invoice?")) deleteInvoice(inv.id); }} className="p-2 rounded-lg border border-border hover:bg-destructive/10 hover:border-destructive/30 transition-colors" title="Delete" aria-label="Delete invoice"><Trash2 className="w-4 h-4 text-destructive" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "editor" && (
          <>
            {/* Mobile switch */}
            <div className="lg:hidden flex rounded-lg border border-border p-1 mb-4 bg-card" role="tablist" aria-label="Editor or preview">
              {([["edit", "Edit", Pencil], ["preview", "Preview", Eye]] as const).map(([key, text, Icon]) => (
                <button key={key} role="tab" aria-selected={mobileView === key} onClick={() => setMobileView(key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-semibold transition-colors ${mobileView === key ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                  <Icon className="w-4 h-4" />{text}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
              <div className={mobileView === "preview" ? "hidden lg:block" : ""}>
                <InvoiceForm invoice={current} onChange={setCurrent} />
              </div>
              <div className={`lg:sticky lg:top-28 ${mobileView === "edit" ? "hidden lg:block" : ""}`}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Live preview</h2>
                  <span className="text-xs text-muted-foreground">Updates as you type</span>
                </div>
                <div className="lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto rounded-xl">
                  <InvoicePreview invoice={current} />
                </div>
              </div>
            </div>
          </>
        )}

        {children}
      </main>

      {/* Mobile action bar with running total */}
      {tab === "editor" && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 border-t border-border bg-card/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Total due</div>
            <div className="text-lg font-bold text-foreground truncate">{formatCurrency(total, current.currency)}</div>
          </div>
          <button onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.97] transition-all shadow-sm">
            <Download className="w-4 h-4" />Download PDF
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
