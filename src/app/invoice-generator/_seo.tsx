import Link from "next/link";
import SeoContentBlock, { type FAQ } from "@/components/SeoContentBlock";

export const INVOICE_FAQS: FAQ[] = [
  {
    question: "Is this invoice generator really free?",
    answer: "Yes. You can create, preview and save as many invoices as you like with no account and no trial period. The only branding on the invoice is a small “Generated with Casetivo” line in the footer.",
  },
  {
    question: "How do I download my invoice as a PDF?",
    answer: "Click Download PDF. Your browser opens the print dialog for the finished invoice; choose “Save as PDF” as the destination and save the file. This works in Chrome, Edge, Firefox and Safari, and keeps the layout on A4 paper.",
  },
  {
    question: "Is my invoice data uploaded or stored on your servers?",
    answer: "No. The invoice is built entirely in your browser. Your draft and saved invoices are kept in your browser's local storage on your own device, and your logo is read locally and never uploaded. Clearing your browser data removes them, so download a PDF of anything you need to keep.",
  },
  {
    question: "What should an invoice include?",
    answer: "At minimum: the word “Invoice” and a unique invoice number, your business name and contact details, your client's name and address, the issue date and due date, a description of each product or service with quantity and price, the total amount due, and how to pay. Add tax and payment terms where they apply to you.",
  },
  {
    question: "Which currencies can I use?",
    answer: "20 currencies are built in, including USD, EUR, GBP, CAD, AUD, INR, PKR, AED, SAR, JPY, CNY, CHF, BRL, MXN, SGD, KRW, TRY, ZAR, NGN and EGP. Amounts are formatted with the matching currency symbol.",
  },
  {
    question: "Can I add tax or a discount to an invoice?",
    answer: "Yes. Enter a tax rate (for example VAT, GST or sales tax) and an optional discount percentage. The discount is applied to the subtotal first, then tax is calculated on the discounted amount, and the total updates live as you type.",
  },
  {
    question: "Can I add my logo?",
    answer: "Yes. Upload a PNG, JPG, SVG or WebP image under 500 KB and it appears at the top of the invoice and in the PDF.",
  },
  {
    question: "Does an invoice from this tool meet my country's legal or tax requirements?",
    answer: "Casetivo gives you a clear, professional invoice layout, but requirements such as tax registration numbers, sequential numbering or mandatory wording differ by country and business type. Check the rules that apply to you or ask an accountant, and add any required details in the notes or payment details fields.",
  },
];

const STEPS = [
  ["Add your business details", "Enter your name or company, contact details and address, and optionally upload a logo."],
  ["Fill in your client", "Add who you are billing so the invoice is addressed correctly."],
  ["Set the number, dates and currency", "Choose a payment term such as Net 30 and the due date is filled in for you."],
  ["List your items or services", "Add a description, quantity and rate for each line. Line totals and the grand total update as you type."],
  ["Add tax, discount, notes and payment details", "Include VAT, GST or sales tax, a discount, and tell the client how to pay."],
  ["Download your PDF", "Check the live preview, then click Download PDF and choose “Save as PDF” in the print dialog."],
] as const;

const FEATURES = [
  ["Live preview", "See exactly what your client will receive while you type."],
  ["20 currencies", "Invoice in USD, EUR, GBP, INR, PKR, AED and more."],
  ["Tax and discount", "Automatic subtotal, discount, tax and total calculations."],
  ["Your branding", "Add a logo and pick an accent color that suits your business."],
  ["Auto-saved drafts", "Your work in progress is kept on your device, so a refresh will not lose it."],
  ["Private by design", "Nothing is uploaded. Everything happens in your browser."],
] as const;

const USE_CASES = [
  ["Freelancers and contractors", "Bill hourly or project work with clear line items and payment terms."],
  ["Small businesses", "Send professional invoices without paying for accounting software."],
  ["Consultants and agencies", "Add your logo and payment details for a branded, trustworthy invoice."],
  ["Students and side hustles", "Create a first invoice in a few minutes with no sign-up."],
] as const;

const RELATED = [
  ["/random-number-generator", "Random Number Generator", "Generate invoice or reference numbers."],
  ["/uuid-generator", "UUID Generator", "Create unique IDs for orders and records."],
  ["/markdown-table-generator", "Markdown Table Generator", "Build tables for quotes and reports."],
  ["/csv-to-json-converter", "CSV to JSON Converter", "Convert exported billing data."],
] as const;

export default function InvoiceSeo() {
  return (
    <SeoContentBlock
      title="Free Online Invoice Generator: Create and Download a PDF Invoice"
      faqs={INVOICE_FAQS}
      content={
        <div className="space-y-10">
          <p>
            Casetivo's invoice generator is a free invoice maker that runs in your browser. Fill in the form, watch the
            invoice update in the live preview, and download a clean PDF you can email to your client. There is no account
            to create, no software to install and no limit on how many invoices you make.
          </p>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">How to create an invoice online</h3>
            <ol className="list-decimal pl-6 space-y-2">
              {STEPS.map(([title, text]) => (
                <li key={title}><strong className="text-foreground">{title}.</strong> {text}</li>
              ))}
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">What you get</h3>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
              {FEATURES.map(([title, text]) => (
                <li key={title} className="rounded-lg border border-border bg-card p-4">
                  <strong className="text-foreground block mb-1">{title}</strong>
                  <span className="text-sm">{text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">What to include on an invoice</h3>
            <p className="mb-3">A clear invoice gets paid faster. Make sure it has:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>A unique invoice number, so both sides can refer to it.</li>
              <li>Your business name, address and contact details.</li>
              <li>Your client's name and billing address.</li>
              <li>The issue date and a clear due date.</li>
              <li>An itemized list of goods or services with quantity and price.</li>
              <li>Subtotal, any discount or tax, and the total amount due.</li>
              <li>Payment terms and how to pay, such as bank transfer or PayPal details.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">Who uses this invoice maker</h3>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
              {USE_CASES.map(([title, text]) => (
                <li key={title}>
                  <strong className="text-foreground">{title}:</strong> {text}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-foreground mb-3">More free tools</h3>
            <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
              {RELATED.map(([href, name, text]) => (
                <li key={href}>
                  <Link href={href} className="font-medium text-primary hover:underline">{name}</Link>
                  <span className="text-sm"> — {text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      }
    />
  );
}
