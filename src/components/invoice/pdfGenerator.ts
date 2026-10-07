"use client";
import type { InvoiceData } from "./types";
import { formatCurrency, calcTotals, CURRENCIES } from "./types";

export function generateInvoiceHTML(invoice: InvoiceData): string {
  const { subtotal, discountAmt, taxAmt, total } = calcTotals(invoice);
  const currency = CURRENCIES.find(c => c.code === invoice.currency);
  const fmt = (n: number) => formatCurrency(n, invoice.currency);
  const color = invoice.accentColor || "#2d8f7a";

  const itemRows = invoice.items.map(item => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#374151;">${item.description || "—"}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:center;color:#374151;">${item.quantity}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;color:#374151;">${fmt(item.rate)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;font-weight:600;color:#111827;">${fmt(item.amount)}</td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Invoice ${invoice.invoiceNumber}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Helvetica Neue',Arial,sans-serif;color:#111827;background:#fff;font-size:14px;line-height:1.5;}
  @media print{body{print-color-adjust:exact;-webkit-print-color-adjust:exact;}@page{margin:0;size:A4;}}
  .page{max-width:794px;margin:0 auto;padding:48px;}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:40px;}
  .brand{font-size:26px;font-weight:700;color:${color};}
  .invoice-badge{background:${color};color:#fff;padding:6px 18px;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;}
  .invoice-num{font-size:28px;font-weight:700;color:#111827;margin-top:6px;}
  .meta-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:36px;}
  .meta-box{background:#f9fafb;border-radius:10px;padding:18px 20px;}
  .meta-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;margin-bottom:8px;}
  .meta-value{font-size:13px;color:#111827;line-height:1.6;}
  .meta-value strong{display:block;font-size:14px;margin-bottom:2px;}
  .dates-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:36px;}
  .date-box{border:1.5px solid #e5e7eb;border-radius:8px;padding:12px 16px;}
  .date-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;margin-bottom:4px;}
  .date-value{font-size:14px;font-weight:600;color:#111827;}
  table{width:100%;border-collapse:collapse;margin-bottom:24px;}
  thead tr{background:${color};}
  thead th{padding:11px 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#fff;text-align:left;}
  thead th:nth-child(2){text-align:center;}
  thead th:nth-child(3),thead th:nth-child(4){text-align:right;}
  .totals{display:flex;justify-content:flex-end;margin-bottom:32px;}
  .totals-box{width:280px;}
  .totals-row{display:flex;justify-content:space-between;padding:7px 0;font-size:13px;border-bottom:1px solid #f3f4f6;color:#374151;}
  .totals-total{display:flex;justify-content:space-between;padding:12px 16px;background:${color};border-radius:8px;margin-top:8px;color:#fff;font-weight:700;font-size:16px;}
  .footer{border-top:1.5px solid #e5e7eb;padding-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:24px;}
  .footer-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;margin-bottom:6px;}
  .footer-value{font-size:13px;color:#374151;line-height:1.6;}
  .watermark{text-align:center;margin-top:40px;font-size:11px;color:#d1d5db;}
</style>
</head>
<body>
<div class="page">
  <!-- Header -->
  <div class="header">
    <div>
      <div class="brand">${invoice.fromName || "Your Company"}</div>
      ${invoice.fromEmail ? `<div style="color:#6b7280;font-size:13px;margin-top:4px;">${invoice.fromEmail}</div>` : ""}
      ${invoice.fromPhone ? `<div style="color:#6b7280;font-size:13px;">${invoice.fromPhone}</div>` : ""}
    </div>
    <div style="text-align:right;">
      <div class="invoice-badge">Invoice</div>
      <div class="invoice-num">${invoice.invoiceNumber}</div>
      <div style="color:#6b7280;font-size:12px;margin-top:2px;">Currency: ${invoice.currency} (${currency?.symbol})</div>
    </div>
  </div>

  <!-- From / To -->
  <div class="meta-grid">
    <div class="meta-box">
      <div class="meta-label">From</div>
      <div class="meta-value">
        <strong>${invoice.fromName || "—"}</strong>
        ${invoice.fromAddress ? invoice.fromAddress.replace(/\n/g, "<br/>") : ""}
        ${invoice.fromEmail ? `<br/>${invoice.fromEmail}` : ""}
        ${invoice.fromPhone ? `<br/>${invoice.fromPhone}` : ""}
      </div>
    </div>
    <div class="meta-box">
      <div class="meta-label">Bill To</div>
      <div class="meta-value">
        <strong>${invoice.toName || "—"}</strong>
        ${invoice.toAddress ? invoice.toAddress.replace(/\n/g, "<br/>") : ""}
        ${invoice.toEmail ? `<br/>${invoice.toEmail}` : ""}
        ${invoice.toPhone ? `<br/>${invoice.toPhone}` : ""}
      </div>
    </div>
  </div>

  <!-- Dates -->
  <div class="dates-grid">
    <div class="date-box">
      <div class="date-label">Invoice No.</div>
      <div class="date-value">${invoice.invoiceNumber}</div>
    </div>
    <div class="date-box">
      <div class="date-label">Issue Date</div>
      <div class="date-value">${new Date(invoice.issueDate).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</div>
    </div>
    <div class="date-box">
      <div class="date-label">Due Date</div>
      <div class="date-value" style="color:#dc2626;">${new Date(invoice.dueDate).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</div>
    </div>
  </div>

  <!-- Items Table -->
  <table>
    <thead>
      <tr>
        <th style="border-radius:6px 0 0 6px;">Description</th>
        <th>Qty</th>
        <th>Rate</th>
        <th style="border-radius:0 6px 6px 0;">Amount</th>
      </tr>
    </thead>
    <tbody>${itemRows}</tbody>
  </table>

  <!-- Totals -->
  <div class="totals">
    <div class="totals-box">
      <div class="totals-row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
      ${invoice.discountRate > 0 ? `<div class="totals-row"><span>Discount (${invoice.discountRate}%)</span><span style="color:#dc2626;">-${fmt(discountAmt)}</span></div>` : ""}
      ${invoice.taxRate > 0 ? `<div class="totals-row"><span>Tax (${invoice.taxRate}%)</span><span>${fmt(taxAmt)}</span></div>` : ""}
      <div class="totals-total"><span>Total Due</span><span>${fmt(total)}</span></div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    ${invoice.notes ? `<div><div class="footer-label">Notes</div><div class="footer-value">${invoice.notes}</div></div>` : "<div></div>"}
    ${invoice.paymentTerms ? `<div><div class="footer-label">Payment Terms</div><div class="footer-value">${invoice.paymentTerms}</div></div>` : ""}
  </div>

  <div class="watermark">Generated with Casetivo Invoice Generator · casetivo.com</div>
</div>
</body>
</html>`;
}

export function downloadInvoicePDF(invoice: InvoiceData): void {
  const html = generateInvoiceHTML(invoice);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const printWin = window.open(url, "_blank", "width=900,height=700");
  if (!printWin) {
    alert("Please allow popups for PDF download.");
    return;
  }
  printWin.onload = () => {
    setTimeout(() => {
      printWin.print();
      URL.revokeObjectURL(url);
    }, 500);
  };
}

export function printInvoice(invoice: InvoiceData): void {
  downloadInvoicePDF(invoice);
}
