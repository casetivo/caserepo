"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Download, Save, Eye, EyeOff, Plus, ArrowLeft, Trash2, Edit } from "lucide-react";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import { createDefaultInvoice, calcTotals, formatCurrency } from "@/components/invoice/types";
import type { InvoiceData } from "@/components/invoice/types";
import { useInvoiceStore } from "@/components/invoice/useInvoiceStore";
import { downloadInvoicePDF } from "@/components/invoice/pdfGenerator";

export default function InvoiceGeneratorClient() {
  const router = useRouter();
  const { invoices, loaded, saveInvoice, deleteInvoice } = useInvoiceStore();
  const [current, setCurrent] = useState<InvoiceData>(createDefaultInvoice);
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"new" | "saved">("new");

  const handleSave = useCallback(() => {
    saveInvoice({ ...current, updatedAt: new Date().toISOString() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [current, saveInvoice]);

  const handleNew = useCallback(() => {
    setCurrent(createDefaultInvoice());
    setTab("new");
    setShowPreview(false);
  }, []);

  const handleDownload = useCallback(() => {
    downloadInvoicePDF(current);
  }, [current]);

  const handleLoadInvoice = useCallback((inv: InvoiceData) => {
    setCurrent(inv);
    setTab("new");
    setShowPreview(false);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight">Invoice Generator</h1>
              <p className="text-xs text-muted-foreground">Create & download PDF invoices</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-accent transition-colors">
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">{showPreview ? "Hide" : "Preview"}</span>
            </button>
            <button onClick={handleSave}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${saved ? "border-green-500 bg-green-50 text-green-700" : "border-border bg-card text-foreground hover:bg-accent"}`}>
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">{saved ? "Saved!" : "Save"}</span>
            </button>
            <button onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setTab("new")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "new" ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:bg-accent"}`}>
            <span className="flex items-center gap-2"><FileText className="w-4 h-4" />Editor</span>
          </button>
          <button onClick={() => setTab("saved")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === "saved" ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:bg-accent"}`}>
            <span className="flex items-center gap-2"><Save className="w-4 h-4" />Saved ({invoices.length})</span>
          </button>
          <button onClick={handleNew}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-primary/60 text-primary text-sm font-medium hover:bg-primary/5 transition-colors">
            <Plus className="w-4 h-4" />New Invoice
          </button>
        </div>

        {/* Saved Invoices Tab */}
        {tab === "saved" && (
          <div>
            {!loaded ? (
              <p className="text-muted-foreground text-sm text-center py-12">Loading...</p>
            ) : invoices.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-border rounded-xl">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
                <p className="text-muted-foreground font-medium">No saved invoices yet</p>
                <p className="text-muted-foreground text-sm mt-1">Create one in the Editor tab</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {invoices.map(inv => {
                  const { total } = calcTotals(inv);
                  return (
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
                        <div className="text-right hidden sm:block">
                          <div className="font-bold text-foreground">{formatCurrency(total, inv.currency)}</div>
                          <div className="text-xs text-muted-foreground">{inv.currency}</div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleLoadInvoice(inv)}
                            className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" title="Load & Edit">
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <Link href={`/invoice-generator/edit/${inv.id}`}
                            className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" title="Full Edit Page">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                          </Link>
                          <button onClick={() => downloadInvoicePDF(inv)}
                            className="p-2 rounded-lg border border-border hover:bg-accent transition-colors" title="Download PDF">
                            <Download className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button onClick={() => { if (confirm("Delete this invoice?")) deleteInvoice(inv.id); }}
                            className="p-2 rounded-lg border border-border hover:bg-destructive/10 hover:border-destructive/30 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Editor Tab */}
        {tab === "new" && (
          <div className={`grid gap-6 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto"}`}>
            <div>
              <InvoiceForm invoice={current} onChange={setCurrent} />
            </div>
            {showPreview && (
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Live Preview</h2>
                  <button onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-all">
                    <Download className="w-3.5 h-3.5" />PDF
                  </button>
                </div>
                <InvoicePreview invoice={current} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
