import type { Metadata } from "next";
import InvoiceEditClient from "./_client";

export const metadata: Metadata = {
  title: "Edit Invoice — Invoice Generator",
  description: "Edit your invoice details, update line items, change currency, and download as PDF.",
  robots: { index: false, follow: false },
};

export default function InvoiceEditPage() {
  return <InvoiceEditClient />;
}
