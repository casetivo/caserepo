"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Download, Save, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import ToolHeader from "@/components/ToolHeader";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import type { InvoiceData } from "@/components/invoice/types";
import { useInvoiceStore } from "@/components/invoice/useInvoiceStore";
import { downloadInvoicePDF } from "@/components/invoice/pdfGenerator";

export default function InvoiceEditClient() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { getInvoice, saveInvoice, loaded } = useInvoiceStore();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    if (!loaded) return;
    const inv = getInvoice(id);
    if (inv) setInvoice(inv);
    else setNotFound(true);
  }, [id, loaded, getInvoice]);

  const handleSave = useCallback(async () => {
    if (!invoice) return;
    setSaveStatus("saving");
    saveInvoice({ ...invoice, updatedAt: new Date().toISOString() });
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
  }, [invoice, saveInvoice]);

  const handleDownload = useCallback(() => {
    if (!invoice) return;
    downloadInvoicePDF(invoice);
  }, [invoice]);

  if (!loaded) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Loading invoice...</p>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
        <h2 className="text-xl font-bold text-foreground mb-2">Invoice Not Found</h2>
        <p className="text-muted-foreground mb-6">This invoice doesn&apos;t exist or has been deleted.</p>
        <Link href="/invoice-generator"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all">
          <ArrowLeft className="w-4 h-4" />Back to Invoice Generator
        </Link>
      </div>
    </div>
  );

  if (!invoice) return null;

  return (
    <div className="min-h-screen bg-background">
      <ToolHeader brand icon={<FileText />} title={`Editing ${invoice.invoiceNumber}`} />
      <div className="border-b border-border/60 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <Link href="/invoice-generator" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />All invoices
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover:bg-accent transition-colors">
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">{showPreview ? "Hide preview" : "Preview"}</span>
            </button>
            <button onClick={handleSave}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                saveStatus === "saved" ? "border-green-500 bg-green-50 text-green-700" : "border-border bg-card text-foreground hover:bg-accent"
              }`}>
              {saveStatus === "saved" ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span className="hidden sm:inline">{saveStatus === "saved" ? "Saved!" : "Save"}</span>
            </button>
            <button onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Unsaved changes indicator */}
      {saveStatus === "idle" && invoice.updatedAt !== getInvoice(id)?.updatedAt && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-700 font-medium">
          You have unsaved changes — click Save to keep them
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className={`grid gap-6 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto"}`}>
          <div>
            <InvoiceForm invoice={invoice} onChange={setInvoice} />
            {/* Bottom save bar */}
            <div className="mt-4 p-4 rounded-xl border border-border bg-card flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date(invoice.updatedAt).toLocaleString()}
              </p>
              <div className="flex gap-3">
                <button onClick={handleSave}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    saveStatus === "saved" ? "bg-green-100 text-green-700 border border-green-300" : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}>
                  {saveStatus === "saved" ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
                </button>
                <button onClick={handleDownload}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:bg-accent transition-colors">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
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
              <InvoicePreview invoice={invoice} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
