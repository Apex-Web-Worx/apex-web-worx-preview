import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";

interface DemoPlaceholderProps {
  title: string;
  description: string;
}

export default function DemoPlaceholder({ title, description }: DemoPlaceholderProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#F5EFE4] flex flex-col">
      <div className="container mx-auto px-6 py-12 flex-1 flex flex-col items-center justify-center text-center max-w-2xl">
        <DemoDisclaimer className="mb-8 w-full" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-[#F5EFE4]/70 text-lg font-light leading-relaxed mb-8">{description}</p>
        <p className="text-sm text-[#C8A45D]/80 mb-10">
          Demo Website Concept by Apex Web Worx — not an official business website.
        </p>
        <Button asChild variant="outline" className="rounded-none border-[#C8A45D]/40 text-[#C8A45D]">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Demo Hub
          </Link>
        </Button>
      </div>
    </div>
  );
}
