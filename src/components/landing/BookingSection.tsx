import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDemoModal } from "@/contexts/DemoModalContext";
import DemoDisclaimer from "@/components/demo/DemoDisclaimer";
import { DEMO_BOOKED_DATES, DEMO_BRAND } from "@/lib/demo";
import { getPricePerPerson } from "@/lib/pricing";

function calculatePrice(guestCount: string): { pricePerPerson: number; totalPrice: number; guests: number } | null {
  const guests = parseInt(guestCount, 10);
  if (isNaN(guests) || guests < 10 || guests > 400) return null;
  const pricePerPerson = getPricePerPerson(guests);
  return { pricePerPerson, totalPrice: guests * pricePerPerson, guests };
}

export default function BookingSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { showDemoModal } = useDemoModal();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, t.booking.validation.name),
    email: z.string().email(t.booking.validation.email),
    phone: z.string().min(10, t.booking.validation.phone).max(10, t.booking.validation.phone),
    eventType: z.string().min(1, t.booking.validation.eventType),
    eventDate: z.string().min(1, t.booking.validation.date),
    guestCount: z.string().min(1, t.booking.validation.guests),
    location: z.string().min(1, t.booking.validation.location),
    message: z.string().optional(),
    dietaryRestrictions: z.string().optional(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      guestCount: "",
      location: "",
      message: "",
      dietaryRestrictions: "",
    },
  });

  const guestCount = form.watch("guestCount");
  const pricing = calculatePrice(guestCount);

  function isDateBooked(dateStr: string): boolean {
    return DEMO_BOOKED_DATES.includes(dateStr);
  }

  function dateToStr(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function getMinDateStr(): string {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 14);
    return dateToStr(d);
  }

  function isDateTooSoon(dateStr: string): boolean {
    return dateStr < getMinDateStr();
  }

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const guests = parseInt(data.guestCount, 10);
      sessionStorage.setItem(
        "inquiryData",
        JSON.stringify({
          id: 9001,
          clientToken: "demo-preview",
          name: data.name,
          email: data.email,
          phone: data.phone,
          eventType: data.eventType,
          eventDate: data.eventDate,
          guestCount: guests,
          location: data.location,
          message: data.message,
        }),
      );
      showDemoModal();
      setLocation("/menu-selection");
    } catch {
      toast({
        title: t.booking.errorTitle,
        description: t.booking.errorDesc,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="book" className="py-24 md:py-32 relative bg-secondary border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[150%] bg-primary/20 blur-[150px] rounded-full" />
      </div>

      <div className="container px-6 md:px-12 mx-auto relative z-10">
        <DemoDisclaimer className="mb-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="uppercase tracking-[0.2em] text-xs text-[#C8A45D] font-medium mb-4 block">{t.booking.badge}</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t.booking.heading}</h2>
            <p className="text-foreground/70 text-lg font-light mb-8 max-w-md leading-relaxed">
              {t.booking.subheading}
            </p>

            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm tracking-wider uppercase text-foreground/50">{t.booking.emailLabel}</span>
                <span className="text-xl font-serif flex items-center gap-3 text-foreground/80">
                  <Mail className="w-5 h-5 text-[#C8A45D]" />
                  {DEMO_BRAND.email}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm tracking-wider uppercase text-foreground/50">{t.booking.phoneLabel}</span>
                <span className="text-xl font-serif flex items-center gap-3 text-foreground/80">
                  <Phone className="w-5 h-5 text-[#C8A45D]" />
                  {DEMO_BRAND.phone}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background p-5 sm:p-8 md:p-12 border border-white/5"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.fullName}</FormLabel>
                      <FormControl><Input placeholder={t.booking.placeholders.name} className="bg-secondary/50 border-white/10 rounded-none focus-visible:ring-primary h-12" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.email}</FormLabel>
                      <FormControl><Input placeholder={t.booking.placeholders.email} type="email" className="bg-secondary/50 border-white/10 rounded-none focus-visible:ring-primary h-12" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.phone}</FormLabel>
                      <FormControl><Input placeholder={t.booking.placeholders.phone} type="tel" className="bg-secondary/50 border-white/10 rounded-none focus-visible:ring-primary h-12" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="eventType" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.eventType}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary/50 border-white/10 rounded-none focus:ring-primary h-12">
                            <SelectValue placeholder={t.booking.placeholders.selectType} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-secondary border-white/10 rounded-none">
                          <SelectItem value="wedding">{t.booking.eventTypes.wedding}</SelectItem>
                          <SelectItem value="corporate">{t.booking.eventTypes.corporate}</SelectItem>
                          <SelectItem value="birthday">{t.booking.eventTypes.birthday}</SelectItem>
                          <SelectItem value="private">{t.booking.eventTypes.private}</SelectItem>
                          <SelectItem value="festival">{t.booking.eventTypes.festival}</SelectItem>
                          <SelectItem value="other">{t.booking.eventTypes.other}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="eventDate" render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.eventDate}</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value || null}
                          onChange={(date) => {
                            if (date && isDateBooked(date)) {
                              toast({ title: t.booking.dateUnavailableTitle, description: t.booking.dateUnavailableDesc, variant: "destructive" });
                              return;
                            }
                            if (date && isDateTooSoon(date)) {
                              toast({ title: t.booking.dateTooSoonTitle, description: t.booking.dateTooSoonDesc, variant: "destructive" });
                              return;
                            }
                            field.onChange(date || "");
                          }}
                          disabled={(date) => {
                            const dateStr = dateToStr(date);
                            return isDateBooked(dateStr) || dateStr < getMinDateStr();
                          }}
                        />
                      </FormControl>
                      <p className="text-xs text-foreground/40 mt-1">{t.booking.minDateNote}</p>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="guestCount" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.guests}</FormLabel>
                      <FormControl>
                        <Input type="number" min={10} max={400} placeholder={t.booking.placeholders.guests} className="bg-secondary/50 border-white/10 rounded-none focus-visible:ring-primary h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.location}</FormLabel>
                    <FormControl><Input placeholder={t.booking.placeholders.location} className="bg-secondary/50 border-white/10 rounded-none focus-visible:ring-primary h-12" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                {pricing && (
                  <div className="bg-secondary/50 border border-white/10 p-4 rounded-none">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-foreground/60">{t.booking.pricePerPerson}</span>
                      <span className="font-serif text-lg font-bold">${pricing.pricePerPerson}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-sm text-foreground/60">{t.booking.estimatedTotal} ({pricing.guests} {t.booking.guests})</span>
                      <span className="font-serif text-2xl font-bold text-[#C8A45D]">${pricing.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <FormField control={form.control} name="dietaryRestrictions" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.dietary}</FormLabel>
                    <FormControl><Textarea placeholder={t.booking.placeholders.dietary} className="bg-secondary/50 border-white/10 rounded-none focus-visible:ring-primary min-h-[80px] resize-none" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs text-foreground/60">{t.booking.formLabels.message}</FormLabel>
                    <FormControl><Textarea placeholder={t.booking.placeholders.message} className="bg-secondary/50 border-white/10 rounded-none focus-visible:ring-primary min-h-[120px] resize-none" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" className="w-full rounded-none bg-primary hover:bg-primary/90 text-primary-foreground h-auto min-h-14 py-3 text-xs tracking-[0.02em] uppercase mt-4 whitespace-normal px-4 md:text-sm md:tracking-[0.1em]" disabled={isSubmitting}>
                  {isSubmitting ? t.booking.submitting : t.booking.submitBtn}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
