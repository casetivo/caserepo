export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  id: string;
  // Sender
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  fromPhone: string;
  // Client
  toName: string;
  toEmail: string;
  toAddress: string;
  toPhone: string;
  // Invoice details
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  // Items
  items: InvoiceItem[];
  // Totals
  taxRate: number;
  discountRate: number;
  notes: string;
  paymentTerms: string;
  // Style
  accentColor: string;
  logo?: string;
  // Status
  createdAt: string;
  updatedAt: string;
}

export const CURRENCIES = [
  { code: "USD", symbol: "$",  name: "US Dollar" },
  { code: "EUR", symbol: "€",  name: "Euro" },
  { code: "GBP", symbol: "£",  name: "British Pound" },
  { code: "PKR", symbol: "₨",  name: "Pakistani Rupee" },
  { code: "INR", symbol: "₹",  name: "Indian Rupee" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$",  name: "Australian Dollar" },
  { code: "JPY", symbol: "¥",  name: "Japanese Yen" },
  { code: "CNY", symbol: "¥",  name: "Chinese Yuan" },
  { code: "CHF", symbol: "Fr",  name: "Swiss Franc" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼",  name: "Saudi Riyal" },
  { code: "BRL", symbol: "R$",  name: "Brazilian Real" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
  { code: "SGD", symbol: "S$",  name: "Singapore Dollar" },
  { code: "KRW", symbol: "₩",  name: "South Korean Won" },
  { code: "TRY", symbol: "₺",  name: "Turkish Lira" },
  { code: "ZAR", symbol: "R",   name: "South African Rand" },
  { code: "NGN", symbol: "₦",  name: "Nigerian Naira" },
  { code: "EGP", symbol: "E£",  name: "Egyptian Pound" },
] as const;

export const ACCENT_COLORS = [
  { name: "Teal",   value: "#2d8f7a" },
  { name: "Blue",   value: "#2563eb" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Rose",   value: "#e11d48" },
  { name: "Orange", value: "#ea580c" },
  { name: "Slate",  value: "#475569" },
  { name: "Black",  value: "#111827" },
];

export function formatCurrency(amount: number, currencyCode: string): string {
  const currency = CURRENCIES.find(c => c.code === currencyCode);
  const symbol = currency?.symbol ?? "$";
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
}

export function calcTotals(invoice: InvoiceData) {
  const subtotal = invoice.items.reduce((sum, item) => sum + item.amount, 0);
  const discountAmt = subtotal * (invoice.discountRate / 100);
  const taxableAmt  = subtotal - discountAmt;
  const taxAmt      = taxableAmt * (invoice.taxRate / 100);
  const total       = taxableAmt + taxAmt;
  return { subtotal, discountAmt, taxAmt, total };
}

export function createDefaultInvoice(): InvoiceData {
  const now = new Date();
  const due = new Date(now);
  due.setDate(due.getDate() + 30);
  return {
    id: crypto.randomUUID(),
    fromName: "", fromEmail: "", fromAddress: "", fromPhone: "",
    toName: "",   toEmail: "",   toAddress: "",   toPhone: "",
    invoiceNumber: `INV-${String(now.getFullYear()).slice(2)}${String(now.getMonth()+1).padStart(2,"0")}-001`,
    issueDate: now.toISOString().slice(0, 10),
    dueDate:   due.toISOString().slice(0, 10),
    currency:  "USD",
    items: [{ id: crypto.randomUUID(), description: "", quantity: 1, rate: 0, amount: 0 }],
    taxRate: 0, discountRate: 0,
    notes: "Thank you for your business!",
    paymentTerms: "Net 30",
    accentColor: "#2d8f7a",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}
