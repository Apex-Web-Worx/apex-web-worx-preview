import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DEMO_MODAL_MESSAGE } from "@/lib/demo";

interface DemoModalContextValue {
  showDemoModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const showDemoModal = useCallback(() => setOpen(true), []);

  return (
    <DemoModalContext.Provider value={{ showDemoModal }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-background border-white/10 rounded-none max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Demo Preview</DialogTitle>
            <DialogDescription className="text-foreground/70 text-base leading-relaxed pt-2">
              {DEMO_MODAL_MESSAGE}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              asChild
              className="rounded-none bg-primary hover:bg-primary/90 flex-1"
            >
              <a href="https://apexwebworx.com" target="_blank" rel="noopener noreferrer">
                Visit Apex Web Worx
              </a>
            </Button>
            <Button
              variant="outline"
              className="rounded-none border-white/20 flex-1"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used within DemoModalProvider");
  return ctx;
}
