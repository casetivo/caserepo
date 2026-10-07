"use client";
import { memo } from "react";
import type { InvoiceData } from "./types";
import { formatCurrency, calcTotals, CURRENCIES } from "./types";

const InvoicePreview = memo(({ invoice }: { invoice: InvoiceData }) => {
  const { subtotal, discountAmt, taxAmt, total } = calcTotals(invoice);
  const currency = CURRENCIES.find(c => c.code === invoice.currency);
  const fmt = (n: number) => formatCurrency(n, invoice.currency);
  const color = invoice.accentColor || "#2d8f7a";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden text-sm font-sans" style={{ fontFamily: "Arial, sans-serif", color: "#111827" }}>
      <div style={{ padding: "36px 40px" }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color }}>{invoice.fromName || "Your Company"}</div>
            {invoice.fromEmail && <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>{invoice.fromEmail}</div>}
            {invoice.fromPhone && <div style={{ color: "#6b7280", fontSize: 12 }}>{invoice.fromPhone}</div>}
          </div>
          <div className="text-right">
            <span style={{ background: color, color: "#fff", padding: "4px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Invoice</span>
            <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>{invoice.invoiceNumber}</div>
            <div style={{ color: "#6b7280", fontSize: 11, marginTop: 2 }}>Currency: {invoice.currency} ({currency?.symbol})</div>
          </div>
        </div>

        {/* From / To */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {[
            { label: "From", name: invoice.fromName, addr: invoice.fromAddress, email: invoice.fromEmail, phone: invoice.fromPhone },
            { label: "Bill To", name: invoice.toName, addr: invoice.toAddress, email: invoice.toEmail, phone: invoice.toPhone },
          ].map(({ label, name, addr, email, phone }) => (
            <div key={label} style={{ background: "#f9fafb", borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: 6 }}>{label}</div>
              <div style={{ fontWeight: 700, marginBottom: 2 }}>{name || "—"}</div>
              {addr && <div style={{ color: "#374151", fontSize: 12 }}>{addr}</div>}
              {email && <div style={{ color: "#374151", fontSize: 12 }}>{email}</div>}
              {phone && <div style={{ color: "#374151", fontSize: 12 }}>{phone}</div>}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Invoice No.", value: invoice.invoiceNumber },
            { label: "Issue Date", value: invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—" },
            { label: "Due Date", value: invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—", red: true },
          ].map(({ label, value, red }) => (
            <div key={label} style={{ border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: 4 }}>{label}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: red ? "#dc2626" : "#111827" }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Items Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}>
          <thead>
            <tr style={{ background: color }}>
              {["Description", "Qty", "Rate", "Amount"].map((h, i) => (
                <th key={h} style={{ padding: "9px 8px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#fff", textAlign: i === 1 ? "center" : i > 1 ? "right" : "left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "9px 8px", fontSize: 12, color: "#374151" }}>{item.description || "—"}</td>
                <td style={{ padding: "9px 8px", fontSize: 12, textAlign: "center", color: "#374151" }}>{item.quantity}</td>
                <td style={{ padding: "9px 8px", fontSize: 12, textAlign: "right", color: "#374151" }}>{fmt(item.rate)}</td>
                <td style={{ padding: "9px 8px", fontSize: 12, textAlign: "right", fontWeight: 600, color: "#111827" }}>{fmt(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div style={{ width: 260 }}>
            {[
              { label: "Subtotal", value: fmt(subtotal), show: true },
              { label: `Discount (${invoice.discountRate}%)`, value: `-${fmt(discountAmt)}`, show: invoice.discountRate > 0, red: true },
              { label: `Tax (${invoice.taxRate}%)`, value: fmt(taxAmt), show: invoice.taxRate > 0 },
            ].filter(r => r.show).map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12, borderBottom: "1px solid #f3f4f6", color: row.red ? "#dc2626" : "#374151" }}>
                <span>{row.label}</span><span>{row.value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: color, borderRadius: 8, marginTop: 8, color: "#fff", fontWeight: 700, fontSize: 15 }}>
              <span>Total Due</span><span>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        {(invoice.notes || invoice.paymentTerms) && (
          <div style={{ borderTop: "1.5px solid #e5e7eb", paddingTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {invoice.notes && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: 6 }}>Notes</div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{invoice.notes}</div>
              </div>
            )}
            {invoice.paymentTerms && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b7280", marginBottom: 6 }}>Payment Terms</div>
                <div style={{ fontSize: 12, color: "#374151" }}>{invoice.paymentTerms}</div>
              </div>
            )}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 28, fontSize: 10, color: "#d1d5db" }}>Generated with Casetivo Invoice Generator · casetivo.com</div>
      </div>
    </div>
  );
});
InvoicePreview.displayName = "InvoicePreview";
export default InvoicePreview;
