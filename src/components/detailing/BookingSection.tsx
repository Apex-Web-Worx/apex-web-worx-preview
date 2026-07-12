import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import DetailingDisclaimer from "@/components/detailing/DetailingDisclaimer";
import { useDetailingModal } from "@/contexts/DetailingModalContext";
import {
  DETAILING_ADDONS,
  DETAILING_SERVICE_OPTIONS,
  DETAILING_VEHICLE_TYPES,
} from "@/lib/detailing-demo";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone required"),
  vehicleYear: z.string().min(4, "Year required"),
  vehicleMake: z.string().min(1, "Make required"),
  vehicleModel: z.string().min(1, "Model required"),
  vehicleType: z.string().min(1, "Select vehicle type"),
  service: z.string().min(1, "Select a service"),
  preferredDate: z.string().min(1, "Select a date"),
  preferredTime: z.string().min(1, "Select a time"),
  condition: z.string().min(1, "Describe vehicle condition"),
  notes: z.string().optional(),
  addons: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function DetailingBookingSection() {
  const { showDetailingModal } = useDetailingModal();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vehicleYear: "",
      vehicleMake: "",
      vehicleModel: "",
      vehicleType: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      condition: "",
      notes: "",
      addons: [],
    },
  });

  async function onSubmit(_data: FormValues) {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    form.reset();
    showDetailingModal();
  }

  return (
    <section id="book" className="py-16 sm:py-24 md:py-32 bg-[#0d0d12] border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="detail-section-label mb-4 block">Schedule</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Book Your Detail
          </h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto font-light mb-6">
            Complete the form below to request an appointment. This is a demo — no real bookings
            are created.
          </p>
          <DetailingDisclaimer variant="inline" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto detail-card rounded-lg p-6 sm:p-8 md:p-10"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Full Name</FormLabel>
                      <FormControl>
                        <Input className="detail-input rounded-md" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Email</FormLabel>
                      <FormControl>
                        <Input type="email" className="detail-input rounded-md" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" className="detail-input rounded-md" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Vehicle Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="detail-input rounded-md">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DETAILING_VEHICLE_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Vehicle Year</FormLabel>
                      <FormControl>
                        <Input className="detail-input rounded-md" placeholder="2022" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleMake"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Vehicle Make</FormLabel>
                      <FormControl>
                        <Input className="detail-input rounded-md" placeholder="Toyota" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Vehicle Model</FormLabel>
                      <FormControl>
                        <Input className="detail-input rounded-md" placeholder="Camry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Selected Service</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="detail-input rounded-md">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DETAILING_SERVICE_OPTIONS.map((svc) => (
                            <SelectItem key={svc} value={svc}>
                              {svc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Preferred Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="detail-input rounded-md" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#94a3b8]">Preferred Time</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="detail-input rounded-md">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["8:00 AM", "9:30 AM", "11:00 AM", "1:00 PM", "2:30 PM", "4:00 PM"].map(
                            (time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#94a3b8]">Vehicle Condition</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="detail-input rounded-md">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent — light maintenance</SelectItem>
                          <SelectItem value="good">Good — moderate wear</SelectItem>
                          <SelectItem value="fair">Fair — needs attention</SelectItem>
                          <SelectItem value="heavy">Heavy — significant buildup or damage</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addons"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-[#94a3b8]">Add-Ons</FormLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {DETAILING_ADDONS.map((addon) => (
                        <FormField
                          key={addon.id}
                          control={form.control}
                          name="addons"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(addon.id)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value ?? [];
                                    field.onChange(
                                      checked
                                        ? [...current, addon.id]
                                        : current.filter((v) => v !== addon.id)
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal text-[#f0f4f8] cursor-pointer">
                                {addon.title}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#94a3b8]">Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        className="detail-input rounded-md min-h-[100px]"
                        placeholder="Any special requests or concerns..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={submitting}
                className="detail-btn-primary w-full py-4 text-sm rounded-md disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Request Appointment"}
              </button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
