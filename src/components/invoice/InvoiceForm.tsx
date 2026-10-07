"use client";
import { useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { InvoiceData, InvoiceItem } from "./types";
import { CURRENCIES, ACCENT_COLORS } from "./types";

interface InvoiceFormProps {
  invoice: InvoiceData;
  onChange: (invoice: InvoiceData) => void;
}

const field = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";
const label = "block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5";

export default function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
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

  return (
    <div className="space-y-6">
      {/* Invoice Details */}
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">Invoice Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={label}>Invoice Number</label>
            <input className={field} value={invoice.invoiceNumber} onChange={e => set({ invoiceNumber: e.target.value })} placeholder="INV-001" />
          </div>
          <div>
            <label className={label}>Currency</label>
            <select className={field} value={invoice.currency} onChange={e => set({ currency: e.target.value })}>
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.code} — {c.name} ({c.symbol})</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Issue Date</label>
            <input type="date" className={field} value={invoice.issueDate} onChange={e => set({ issueDate: e.target.value })} />
          </div>
          <div>
            <label className={label}>Due Date</label>
            <input type="date" className={field} value={invoice.dueDate} onChange={e => set({ dueDate: e.target.value })} />
          </div>
          <div className="col-span-2">
            <label className={label}>Payment Terms</label>
            <input className={field} value={invoice.paymentTerms} onChange={e => set({ paymentTerms: e.target.value })} placeholder="Net 30" />
          </div>
        </div>
      </section>

      {/* From / To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">From (Your Info)</h2>
          <div className="space-y-3">
            <div><label className={label}>Name / Company</label><input className={field} value={invoice.fromName} onChange={e => set({ fromName: e.target.value })} placeholder="Acme Corp" /></div>
            <div><label className={label}>Email</label><input type="email" className={field} value={invoice.fromEmail} onChange={e => set({ fromEmail: e.target.value })} placeholder="you@example.com" /></div>
            <div><label className={label}>Phone</label><input className={field} value={invoice.fromPhone} onChange={e => set({ fromPhone: e.target.value })} placeholder="+1 (555) 000-0000" /></div>
            <div><label className={label}>Address</label><textarea className={field} rows={3} value={invoice.fromAddress} onChange={e => set({ fromAddress: e.target.value })} placeholder="123 Main St&#10;New York, NY 10001" /></div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">Bill To (Client)</h2>
          <div className="space-y-3">
            <div><label className={label}>Name / Company</label><input className={field} value={invoice.toName} onChange={e => set({ toName: e.target.value })} placeholder="Client Corp" /></div>
            <div><label className={label}>Email</label><input type="email" className={field} value={invoice.toEmail} onChange={e => set({ toEmail: e.target.value })} placeholder="client@example.com" /></div>
            <div><label className={label}>Phone</label><input className={field} value={invoice.toPhone} onChange={e => set({ toPhone: e.target.value })} placeholder="+1 (555) 000-0001" /></div>
            <div><label className={label}>Address</label><textarea className={field} rows={3} value={invoice.toAddress} onChange={e => set({ toAddress: e.target.value })} placeholder="456 Client Ave&#10;Los Angeles, CA 90001" /></div>
          </div>
        </section>
      </div>

      {/* Line Items */}
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">Line Items</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 px-1">
            <span className={`col-span-5 ${label}`}>Description</span>
            <span className={`col-span-2 ${label}`}>Qty</span>
            <span className={`col-span-2 ${label}`}>Rate</span>
            <span className={`col-span-2 ${label}`}>Amount</span>
            <span className="col-span-1" />
          </div>
          {invoice.items.map(item => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <input className={`${field} col-span-5`} value={item.description} onChange={e => setItem(item.id, { description: e.target.value })} placeholder="Service description..." />
              <input type="number" className={`${field} col-span-2`} min={0} value={item.quantity} onChange={e => setItem(item.id, { quantity: parseFloat(e.target.value) || 0 })} />
              <input type="number" className={`${field} col-span-2`} min={0} step="0.01" value={item.rate} onChange={e => setItem(item.id, { rate: parseFloat(e.target.value) || 0 })} />
              <div className="col-span-2 px-3 py-2 rounded-lg bg-muted text-sm font-semibold text-foreground text-right">
                {item.amount.toFixed(2)}
              </div>
              <button onClick={() => removeItem(item.id)} disabled={invoice.items.length === 1}
                className="col-span-1 flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-30 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addItem}
          className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-primary/50 text-primary text-sm font-medium hover:bg-primary/5 transition-colors w-full justify-center">
          <Plus className="w-4 h-4" /> Add Line Item
        </button>
      </section>

      {/* Tax / Discount / Notes */}
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">Totals & Notes</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className={label}>Tax Rate (%)</label>
            <input type="number" className={field} min={0} max={100} step={0.1} value={invoice.taxRate} onChange={e => set({ taxRate: parseFloat(e.target.value) || 0 })} placeholder="0" />
          </div>
          <div>
            <label className={label}>Discount (%)</label>
            <input type="number" className={field} min={0} max={100} step={0.1} value={invoice.discountRate} onChange={e => set({ discountRate: parseFloat(e.target.value) || 0 })} placeholder="0" />
          </div>
          <div className="col-span-2">
            <label className={label}>Notes</label>
            <textarea className={field} rows={2} value={invoice.notes} onChange={e => set({ notes: e.target.value })} placeholder="Thank you for your business!" />
          </div>
        </div>
      </section>

      {/* Accent Color */}
      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">Invoice Color</h2>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map(c => (
            <button key={c.value} onClick={() => set({ accentColor: c.value })}
              title={c.name}
              className={`w-8 h-8 rounded-full border-2 transition-all ${invoice.accentColor === c.value ? "border-foreground scale-110 shadow-md" : "border-transparent"}`}
              style={{ background: c.value }} />
          ))}
          <div className="flex items-center gap-2 ml-2">
            <label className="text-xs text-muted-foreground">Custom:</label>
            <input type="color" value={invoice.accentColor} onChange={e => set({ accentColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border border-border" />
          </div>
        </div>
      </section>
    </div>
  );
}
