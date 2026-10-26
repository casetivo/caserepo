"use client";
import { useCallback, useRef } from "react";
import { Plus, Trash2, ImagePlus, X } from "lucide-react";
import type { InvoiceData, InvoiceItem } from "./types";
import { CURRENCIES, ACCENT_COLORS, PAYMENT_TERMS, addDays, formatCurrency } from "./types";

interface InvoiceFormProps {
  invoice: InvoiceData;
  onChange: (invoice: InvoiceData) => void;
}

const field = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";
const label = "block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5";
const card = "rounded-xl border border-border bg-card p-4 sm:p-5";
const heading = "text-sm font-bold text-foreground mb-4 flex items-center gap-2";
const MAX_LOGO_BYTES = 500 * 1024;

function StepTitle({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <h2 className={heading}>
      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">{n}</span>
      {children}
    </h2>
  );
}

export default function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const set = useCallback((patch: Partial<InvoiceData>) => {
    onChange({ ...invoice, ...patch, updatedAt: new Date().toISOString() });
  }, [invoice, onChange]);

  const setItem = useCallback((id: string, patch: Partial<InvoiceItem>) => {
    const items = invoice.items.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, ...patch };
      updated.amount = updated.quantity * updated.rate;
      return updated;
    });
    set({ items });
  }, [invoice.items, set]);

  const addItem = useCallback(() => {
    set({ items: [...invoice.items, { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 }] });
  }, [invoice.items, set]);

  const removeItem = useCallback((id: string) => {
    if (invoice.items.length === 1) return;
    set({ items: invoice.items.filter(i => i.id !== id) });
  }, [invoice.items, set]);

  const applyTerms = useCallback((labelText: string, days: number) => {
    set({ paymentTerms: labelText, dueDate: addDays(invoice.issueDate, days) });
  }, [invoice.issueDate, set]);

  const onLogo = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please choose an image file (PNG, JPG, SVG or WebP)."); return; }
    if (file.size > MAX_LOGO_BYTES) { alert("Logo is too large. Please use an image under 500 KB."); return; }
    const reader = new FileReader();
    reader.onload = () => set({ logo: String(reader.result) });
    reader.readAsDataURL(file);
  }, [set]);

  return (
    <div className="space-y-5">
      {/* 1. Your business */}
      <section className={card}>
        <StepTitle n={1}>Your business</StepTitle>
        <div className="flex items-center gap-4 mb-4">
          {invoice.logo ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={invoice.logo} alt="Your logo" className="h-14 max-w-[160px] object-contain rounded-lg border border-border bg-white p-1" />
              <button type="button" onClick={() => set({ logo: undefined })} aria-label="Remove logo"
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center">
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/60 hover:text-foreground transition-colors">
              <ImagePlus className="w-4 h-4" /> Add logo <span className="text-xs">(optional)</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => { onLogo(e.target.files?.[0]); e.target.value = ""; }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2"><label className={label} htmlFor="inv-from-name">Business or your name</label><input id="inv-from-name" className={field} value={invoice.fromName} onChange={e => set({ fromName: e.target.value })} placeholder="Acme Design Studio" autoComplete="organization" /></div>
          <div><label className={label} htmlFor="inv-from-email">Email</label><input id="inv-from-email" type="email" className={field} value={invoice.fromEmail} onChange={e => set({ fromEmail: e.target.value })} placeholder="you@example.com" autoComplete="email" /></div>
          <div><label className={label} htmlFor="inv-from-phone">Phone</label><input id="inv-from-phone" className={field} value={invoice.fromPhone} onChange={e => set({ fromPhone: e.target.value })} placeholder="+1 555 000 0000" autoComplete="tel" /></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="inv-from-address">Address</label><textarea id="inv-from-address" className={field} rows={2} value={invoice.fromAddress} onChange={e => set({ fromAddress: e.target.value })} placeholder={"123 Main St\nNew York, NY 10001"} /></div>
        </div>
      </section>

      {/* 2. Client */}
      <section className={card}>
        <StepTitle n={2}>Bill to (your client)</StepTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2"><label className={label} htmlFor="inv-to-name">Client name or company</label><input id="inv-to-name" className={field} value={invoice.toName} onChange={e => set({ toName: e.target.value })} placeholder="Client Corp" /></div>
          <div><label className={label} htmlFor="inv-to-email">Email</label><input id="inv-to-email" type="email" className={field} value={invoice.toEmail} onChange={e => set({ toEmail: e.target.value })} placeholder="client@example.com" /></div>
          <div><label className={label} htmlFor="inv-to-phone">Phone</label><input id="inv-to-phone" className={field} value={invoice.toPhone} onChange={e => set({ toPhone: e.target.value })} placeholder="+1 555 000 0001" /></div>
          <div className="sm:col-span-2"><label className={label} htmlFor="inv-to-address">Address</label><textarea id="inv-to-address" className={field} rows={2} value={invoice.toAddress} onChange={e => set({ toAddress: e.target.value })} placeholder={"456 Client Ave\nLos Angeles, CA 90001"} /></div>
        </div>
      </section>

      {/* 3. Details */}
      <section className={card}>
        <StepTitle n={3}>Invoice details</StepTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div><label className={label} htmlFor="inv-number">Invoice number</label><input id="inv-number" className={field} value={invoice.invoiceNumber} onChange={e => set({ invoiceNumber: e.target.value })} placeholder="INV-001" /></div>
          <div>
            <label className={label} htmlFor="inv-currency">Currency</label>
            <select id="inv-currency" className={field} value={invoice.currency} onChange={e => set({ currency: e.target.value })}>
              {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name} ({c.symbol})</option>)}
            </select>
          </div>
          <div><label className={label} htmlFor="inv-issue">Issue date</label><input id="inv-issue" type="date" className={field} value={invoice.issueDate} onChange={e => set({ issueDate: e.target.value })} /></div>
          <div><label className={label} htmlFor="inv-due">Due date</label><input id="inv-due" type="date" className={field} value={invoice.dueDate} onChange={e => set({ dueDate: e.target.value })} /></div>
          <div className="sm:col-span-2">
            <span className={label}>Payment terms</span>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_TERMS.map(t => (
                <button key={t.label} type="button" onClick={() => applyTerms(t.label, t.days)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${invoice.paymentTerms === t.label ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background text-foreground hover:bg-accent"}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Picking a term sets the due date from the issue date.</p>
          </div>
        </div>
      </section>

      {/* 4. Items */}
      <section className={card}>
        <StepTitle n={4}>Items &amp; services</StepTitle>
        <div className="hidden sm:grid grid-cols-12 gap-2 px-1 mb-1">
          <span className={`col-span-5 ${label}`}>Description</span>
          <span className={`col-span-2 ${label}`}>Qty</span>
          <span className={`col-span-2 ${label}`}>Rate</span>
          <span className={`col-span-2 ${label} text-right`}>Amount</span>
          <span className="col-span-1" />
        </div>
        <div className="space-y-3">
          {invoice.items.map((item, idx) => (
            <div key={item.id} className="grid grid-cols-6 sm:grid-cols-12 gap-2 items-center rounded-lg sm:rounded-none border sm:border-0 border-border/70 p-3 sm:p-0">
              <input aria-label={`Item ${idx + 1} description`} className={`${field} col-span-6 sm:col-span-5`} value={item.description} onChange={e => setItem(item.id, { description: e.target.value })} placeholder="Website design, consulting hours…" />
              <div className="col-span-2 sm:col-span-2">
                <span className="sm:hidden text-[10px] uppercase text-muted-foreground">Qty</span>
                <input aria-label={`Item ${idx + 1} quantity`} type="number" inputMode="decimal" className={field} min={0} value={item.quantity} onChange={e => setItem(item.id, { quantity: parseFloat(e.target.value) || 0 })} />
              </div>
              <div className="col-span-2 sm:col-span-2">
                <span className="sm:hidden text-[10px] uppercase text-muted-foreground">Rate</span>
                <input aria-label={`Item ${idx + 1} rate`} type="number" inputMode="decimal" className={field} min={0} step="0.01" value={item.rate} onChange={e => setItem(item.id, { rate: parseFloat(e.target.value) || 0 })} />
              </div>
              <div className="col-span-2 sm:col-span-2 text-right">
                <span className="sm:hidden block text-[10px] uppercase text-muted-foreground">Amount</span>
                <div className="px-2 py-2 rounded-lg bg-muted text-sm font-semibold text-foreground truncate">{formatCurrency(item.amount, invoice.currency)}</div>
              </div>
              <button type="button" onClick={() => removeItem(item.id)} disabled={invoice.items.length === 1} aria-label={`Remove item ${idx + 1}`}
                className="col-span-6 sm:col-span-1 flex items-center justify-center h-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-30 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addItem}
          className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-primary/50 text-primary text-sm font-medium hover:bg-primary/5 transition-colors w-full justify-center">
          <Plus className="w-4 h-4" /> Add another item
        </button>
      </section>

      {/* 5. Totals & extras */}
      <section className={card}>
        <StepTitle n={5}>Tax, discount &amp; notes</StepTitle>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={label} htmlFor="inv-tax">Tax rate (%)</label><input id="inv-tax" type="number" inputMode="decimal" className={field} min={0} max={100} step={0.1} value={invoice.taxRate} onChange={e => set({ taxRate: parseFloat(e.target.value) || 0 })} /></div>
          <div><label className={label} htmlFor="inv-discount">Discount (%)</label><input id="inv-discount" type="number" inputMode="decimal" className={field} min={0} max={100} step={0.1} value={invoice.discountRate} onChange={e => set({ discountRate: parseFloat(e.target.value) || 0 })} /></div>
          <div className="col-span-2"><label className={label} htmlFor="inv-notes">Notes</label><textarea id="inv-notes" className={field} rows={2} value={invoice.notes} onChange={e => set({ notes: e.target.value })} placeholder="Thank you for your business!" /></div>
          <div className="col-span-2"><label className={label} htmlFor="inv-payinfo">How to pay you (bank, PayPal, etc.)</label><textarea id="inv-payinfo" className={field} rows={3} value={invoice.paymentInfo ?? ""} onChange={e => set({ paymentInfo: e.target.value })} placeholder={"Bank: Example Bank\nAccount: 0000 0000\nPayPal: you@example.com"} /></div>
        </div>
      </section>

      {/* 6. Style */}
      <section className={card}>
        <StepTitle n={6}>Color</StepTitle>
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_COLORS.map(c => (
            <button type="button" key={c.value} onClick={() => set({ accentColor: c.value })} title={c.name} aria-label={`${c.name} accent color`}
              className={`w-8 h-8 rounded-full border-2 transition-all ${invoice.accentColor === c.value ? "border-foreground scale-110 shadow-md" : "border-transparent"}`}
              style={{ background: c.value }} />
          ))}
          <label className="flex items-center gap-2 ml-2 text-xs text-muted-foreground">
            Custom
            <input type="color" value={invoice.accentColor} onChange={e => set({ accentColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-border" />
          </label>
        </div>
      </section>
    </div>
  );
}
