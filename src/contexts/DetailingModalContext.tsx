import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DETAILING_MODAL_MESSAGE } from "@/lib/detailing-demo";

interface DetailingModalContextValue {
  showDetailingModal: () => void;
}

const DetailingModalContext = createContext<DetailingModalContextValue | null>(null);

export function DetailingModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const showDetailingModal = useCallback(() => setOpen(true), []);

  return (
    <DetailingModalContext.Provider value={{ showDetailingModal }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="detailing-modal bg-[#16161e] border-white/10 rounded-lg max-w-[calc(100vw-2rem)] sm:max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl sm:text-2xl text-[#f0f4f8]">
              Demo Booking Confirmed
            </DialogTitle>
            <DialogDescription className="text-[#94a3b8] text-sm sm:text-base leading-relaxed pt-2">
              {DETAILING_MODAL_MESSAGE}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-2">
            <a
              href="https://apexwebworx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="detail-btn-primary inline-flex items-center justify-center min-h-12 px-6 py-3 text-sm rounded-md touch-manipulation"
            >
              Visit Apex Web Worx
            </a>
            <button
              type="button"
              className="detail-btn-outline inline-flex items-center justify-center min-h-12 px-6 py-3 text-sm rounded-md touch-manipulation"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </DetailingModalContext.Provider>
  );
}

export function useDetailingModal() {
  const ctx = useContext(DetailingModalContext);
  if (!ctx) throw new Error("useDetailingModal must be used within DetailingModalProvider");
  return ctx;
}
