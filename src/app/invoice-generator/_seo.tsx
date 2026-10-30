import Link from "next/link";
import SeoContentBlock, { type FAQ } from "@/components/SeoContentBlock";

export const INVOICE_FAQS: FAQ[] = [
  {
    question: "Is this invoice generator really free?",
    answer: "Yes. You can create, preview, print, and save unlimited invoices with no account creation, no credit card, and no trial period. The generated PDF belongs 100% to you, containing only a discrete footer attribution.",
  },
  {
    question: "How do I download my invoice as a clean PDF?",
    answer: "Click the Download PDF button in the action bar. Your browser opens its native print preview dialog; simply choose 'Save as PDF' as the destination. The layout uses CSS print media rules calibrated for clean single-page A4 and US Letter document standards.",
  },
  {
    question: "Is my invoice data uploaded or stored on your servers?",
    answer: "No. The invoice is constructed entirely inside your client browser. Drafts and line items persist solely in your browser's localStorage on your own hardware, and uploaded logos are converted to base64 Data URLs locally. Nothing is ever transmitted to or stored on remote servers.",
  },
  {
    question: "What essential elements must every legal invoice include?",
    answer: "At minimum: the word 'Invoice' and a sequential invoice number, your company or trade name, phone and email contact info, client legal name and address, issue date, payment due date, itemized line descriptions with quantities and unit rates, subtotal, applicable taxes (VAT/GST/Sales Tax), total amount due, and remittance instructions (IBAN, ACH, or PayPal).",
  },
  {
    question: "Which global currencies and formats are supported?",
    answer: "20 global currencies are pre-configured: USD ($), EUR (€), GBP (£), CAD ($), AUD ($), INR (₹), PKR (Rs), AED (AED), SAR (SAR), JPY (¥), CNY (¥), CHF (CHF), BRL (R$), MXN ($), SGD ($), KRW (₩), TRY (₺), ZAR (R), NGN (₦), and EGP (E£). Currency symbols and decimal calculations update dynamically as you type.",
  },
  {
    question: "Can I apply compound taxes or promotional discounts?",
    answer: "Yes. Enter your regional tax percentage (such as 20% VAT, 10% GST, or state sales tax) and an optional discount percentage. The generator applies discounts to the raw subtotal first, calculates taxes accurately against the discounted subtotal, and updates the grand total in real time.",
  },
  {
    question: "How do I add my company logo?",
    answer: "Click the logo placeholder at the top of the invoice form and upload any PNG, JPG, WebP, or SVG file under 500 KB. The image is parsed via a local FileReader instance and rendered with high-DPI clarity both in the interactive preview and in the final PDF export.",
  },
  {
    question: "Does an invoice created here meet statutory accounting standards?",
    answer: "Yes, provided you input the mandatory legal fields required by your tax jurisdiction. In regions like the UK, EU, or Australia, you can enter your VAT/GST registration number and company incorporation number directly into the Business Details or Payment Notes field.",
  },
  {
    question: "What standard payment terms should I choose for clients?",
    answer: "Common business standards include 'Due Upon Receipt' for immediate billing, 'Net 15' (payment due within 15 calendar days), 'Net 30' (the standard commercial term for B2B invoices), and 'Net 60' for enterprise procurement. Our selector automatically computes the exact calendar due date based on your selected term.",
  },
  {
    question: "Can I manage multiple client invoices without losing my previous work?",
    answer: "Yes. Your active draft is continuously auto-saved in your browser's local cache. If you accidentally close your browser tab or reload, your line items, logo, and client information remain intact. Use the 'Clear Form' button only when starting an entirely fresh invoice.",
  },
  {
    question: "How do I format banking and remittance details for fast wire transfer?",
    answer: "Use the dedicated 'Payment Details' card at the bottom of the invoice. Include your Bank Name, Account Holder Name, Routing/Sort Code, Account Number, SWIFT/BIC code for international wires, and IBAN for cross-border European and Middle Eastern payments.",
  },
  {
    question: "Can I use this tool for hourly contract billing and milestone retainers?",
    answer: "Yes. You can list hourly consulting services by typing your hourly rate in the Price column and total billable hours in the Quantity column. For milestone retainers or flat-fee deliverables, enter quantity 1 and the agreed project fee.",
  },
];

const STEPS = [
  ["Add your business identity", "Enter your trade name, legal entity, registration number, email, and address. Upload your high-resolution logo for a trustworthy presentation."],
  ["Specify client details", "Input your client's company name, point of contact, and billing department address so the accounts payable team can process the document immediately."],
  ["Configure invoice number and dates", "Assign a unique sequential invoice number (e.g. INV-2026-001), set the issue date, and select payment terms (such as Net 30) to compute the due date."],
  ["Itemize deliverables & services", "Add clear line items with detailed scope descriptions, unit quantities, and hourly or unit rates. Line calculations update instantly."],
  ["Apply discounts and tax rates", "Incorporate regional VAT, GST, or state sales tax, apply agreed promotional discounts, and specify accepted remittance options in the payment details."],
  ["Export publication-ready PDF", "Review the live canvas preview to verify typography and spacing, then click Download PDF to save or email your client immediately."],
] as const;

const FEATURES = [
  ["Instant Interactive Canvas", "See the high-fidelity A4 invoice render in real time on screen as you modify rates and line items."],
  ["20 International Currencies", "Invoice global clients in USD, EUR, GBP, AUD, CAD, INR, AED, and 13 additional fiat currencies."],
  ["Automated Precision Math", "Subtotals, tiered discounts, compounded tax rates, and grand totals are calculated accurately to two decimal places."],
  ["Bespoke Visual Branding", "Upload your business logo and choose custom accent palettes to align with your corporate brand guidelines."],
  ["Local Storage Draft Persistence", "Your work in progress is auto-saved locally on your device. Never lose your invoice draft to an accidental page refresh."],
  ["Zero Server Storage & Total Privacy", "Client billing records and financial details never leave your hardware. No remote tracking, no server database uploads."],
] as const;

const USE_CASES = [
  ["Freelancers & Independent Contractors", "Bill software development, UI/UX design, copywriting, and technical consulting hours with clean itemization."],
  ["Agencies & Digital Studios", "Deliver high-value corporate invoices with bespoke logos, project milestone breakdowns, and international wire instructions."],
  ["Small Business Owners & Tradespeople", "Generate professional PDF receipts and billing vouchers for retail goods, physical services, and equipment leasing."],
  ["Startups & Side Hustlers", "Send professional, compliant billing requests in minutes without paying for costly subscription invoicing software."],
] as const;

const RELATED = [
  ["/random-number-generator", "Random Number Generator", "Generate sequential invoice numbers and audit control codes."],
  ["/uuid-generator", "UUID Generator", "Generate unique transaction identifiers for databases and accounting software."],
  ["/markdown-table-generator", "Markdown Table Generator", "Construct clean financial comparison tables and scope quotes."],
  ["/csv-to-json-converter", "CSV to JSON Converter", "Transform exported bookkeeping and invoice spreadsheets into structured JSON."],
] as const;

export default function InvoiceSeo() {
  return (
    <SeoContentBlock
      title="Free Online Invoice Generator: Create Professional PDF Invoices Online"
      faqs={INVOICE_FAQS}
      content={
        <div className="space-y-10">
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">Professional Billing Made Effortless</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Casetivo&apos;s free online invoice generator empowers freelancers, digital agencies, contractors, and small business owners to draft and export publication-ready PDF invoices directly within the browser. Traditional enterprise accounting software is bloated with complex setup wizards, monthly subscription fees, and cumbersome interfaces. Our client-side invoice maker provides a streamlined, distraction-free environment: fill in your line items, observe the live rendered canvas, and export a pixel-perfect PDF in seconds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Because the entire application executes client-side using modern web APIs and CSS print media modules, your proprietary business data, customer addresses, billing rates, and company revenues are never transmitted over the internet or stored on external servers. You get complete financial privacy paired with instantaneous performance.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">How to Create and Download an Invoice Online</h3>
            <ol className="list-decimal pl-6 space-y-3 text-muted-foreground">
              {STEPS.map(([title, text]) => (
                <li key={title}>
                  <strong className="text-foreground">{title}:</strong> {text}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">Core Platform Capabilities</h3>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
              {FEATURES.map(([title, text]) => (
                <li key={title} className="rounded-lg border border-border bg-card p-4">
                  <strong className="text-foreground block mb-1">{title}</strong>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">Checklist: What Every Compliant Invoice Must Include</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Clear, comprehensive invoices minimize client payment friction and accelerate cash flow. When preparing billing documents, ensure you satisfy all core accounting requirements:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Sequential Invoice Number:</strong> Maintain an unbroken chronological sequence (e.g. <code className="text-xs bg-muted px-1.5 py-0.5 rounded">INV-2026-042</code>) to satisfy tax auditor review guidelines.</li>
              <li><strong>Complete Seller Identification:</strong> Full legal trading name, physical headquarters address, direct email, phone, and company tax registration ID (VAT, GST, or EIN).</li>
              <li><strong>Accurate Client Records:</strong> Client corporate entity name, accounts payable email, billing address, and optional project purchase order (PO) reference number.</li>
              <li><strong>Critical Milestone Dates:</strong> Explicit date of issue and binding payment due date computed from your agreed payment terms (such as Net 15 or Net 30).</li>
              <li><strong>Itemized Scope Breakdown:</strong> Transparent item titles, quantities, unit prices, and deliverable descriptions to prevent client billing disputes.</li>
              <li><strong>Financial Reconciliation:</strong> Accurate raw subtotal, calculated discounts, statutory tax itemization, and unambiguous net balance due.</li>
              <li><strong>Remittance Instructions:</strong> Explicit bank wire directions including account name, IBAN, SWIFT/BIC, ACH routing number, or digital payment links.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">Who Benefits from Our Free Invoice Generator?</h3>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
              {USE_CASES.map(([title, text]) => (
                <li key={title} className="rounded-lg border border-border/80 bg-card/60 p-4">
                  <strong className="text-foreground block mb-1">{title}</strong>
                  <span className="text-sm text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">Complementary Developer & Data Utilities</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Streamline your financial workflow and data operations with our suite of free online utilities:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
              {RELATED.map(([href, name, text]) => (
                <li key={href} className="p-3 rounded-lg border border-border bg-card/30">
                  <Link href={href} className="font-semibold text-primary hover:underline block mb-1">
                    {name}
                  </Link>
                  <span className="text-xs text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      }
    />
  );
}
