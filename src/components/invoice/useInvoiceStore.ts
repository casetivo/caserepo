"use client";
import { useState, useEffect, useCallback } from "react";
import type { InvoiceData } from "./types";

const STORAGE_KEY = "casetivo_invoices";

export function useInvoiceStore() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setInvoices(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const save = useCallback((list: InvoiceData[]) => {
    setInvoices(list);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
  }, []);

  const saveInvoice = useCallback((invoice: InvoiceData) => {
    setInvoices(prev => {
      const exists = prev.find(i => i.id === invoice.id);
      const updated = exists
        ? prev.map(i => i.id === invoice.id ? invoice : i)
        : [invoice, ...prev];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const deleteInvoice = useCallback((id: string) => {
    setInvoices(prev => {
      const updated = prev.filter(i => i.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const getInvoice = useCallback((id: string): InvoiceData | undefined => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const list: InvoiceData[] = JSON.parse(raw);
        return list.find(i => i.id === id);
      }
    } catch {}
    return invoices.find(i => i.id === id);
  }, [invoices]);

  return { invoices, loaded, saveInvoice, deleteInvoice, getInvoice, save };
}
