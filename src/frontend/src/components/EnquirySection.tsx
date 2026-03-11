import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetAllProperties, useSubmitEnquiry } from "../hooks/useQueries";

const WHATSAPP_URL = "https://wa.me/919910396406";

export default function EnquirySection() {
  const { data: properties = [] } = useGetAllProperties();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [propertyId, setPropertyId] = useState<string>("general");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const { mutate: submitEnquiry, isPending } = useSubmitEnquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedId = propertyId === "general" ? null : BigInt(propertyId);
    submitEnquiry(
      { name, email, phone, message, propertyId: resolvedId },
      {
        onSuccess: () => {
          setSubmitStatus("success");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setPropertyId("general");
        },
        onError: () => setSubmitStatus("error"),
      },
    );
  };

  const handleReset = () => {
    setSubmitStatus("idle");
  };

  return (
    <section id="contact" className="py-20 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold font-body text-sm font-semibold tracking-[0.15em] uppercase">
              Get In Touch
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mt-2 mb-4">
              Let's Find Your Perfect Property
            </h2>
            <div className="w-16 h-1 bg-gold mb-6 rounded-full" />
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">
              Whether you're looking to buy, sell, or invest, our expert team at
              RKS Real Estate is here to guide you every step of the way. Fill
              out the form and we'll get back to you promptly.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <div className="font-body font-semibold text-navy text-sm">
                    Phone
                  </div>
                  <a
                    href="tel:+919910396406"
                    className="font-body text-muted-foreground hover:text-gold transition-colors"
                  >
                    +91 99103 96406
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <svg
                    className="h-4 w-4 text-gold"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="img"
                    aria-label="WhatsApp"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="font-body font-semibold text-navy text-sm">
                    WhatsApp
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-muted-foreground hover:text-gold transition-colors"
                  >
                    +91 99103 96406
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <div className="font-body font-semibold text-navy text-sm">
                    Email
                  </div>
                  <a
                    href="mailto:info@rksrealestate.in"
                    className="font-body text-muted-foreground hover:text-gold transition-colors"
                  >
                    info@rksrealestate.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <div className="font-body font-semibold text-navy text-sm">
                    Location
                  </div>
                  <span className="font-body text-muted-foreground">
                    Pan-India Operations
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-xl border border-border/60 shadow-card p-8"
          >
            {submitStatus === "success" ? (
              <div
                data-ocid="enquiry.success_state"
                className="flex flex-col items-center py-12 gap-4 text-center"
              >
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h3 className="font-display text-xl font-semibold text-navy">
                  Thank You!
                </h3>
                <p className="text-muted-foreground font-body text-sm max-w-xs">
                  Your enquiry has been received. Our team will get in touch
                  with you within 24 hours.
                </p>
                <Button
                  onClick={handleReset}
                  className="bg-navy hover:bg-navy-light text-white font-body mt-2"
                >
                  Send Another Enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-navy mb-1">
                  Send Us an Enquiry
                </h3>
                <p className="font-body text-muted-foreground text-sm mb-4">
                  All fields marked with * are required.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="enq-name"
                      className="font-body text-sm font-medium text-navy"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="enq-name"
                      data-ocid="enquiry.name_input"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="font-body"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="enq-phone"
                      className="font-body text-sm font-medium text-navy"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="enq-phone"
                      type="tel"
                      data-ocid="enquiry.phone_input"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="font-body"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="enq-email"
                    className="font-body text-sm font-medium text-navy"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="enq-email"
                    type="email"
                    data-ocid="enquiry.email_input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="font-body"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="enq-property"
                    className="font-body text-sm font-medium text-navy"
                  >
                    Property of Interest
                  </Label>
                  <Select value={propertyId} onValueChange={setPropertyId}>
                    <SelectTrigger
                      id="enq-property"
                      data-ocid="enquiry.property_select"
                      className="font-body"
                    >
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      {properties.map((p) => (
                        <SelectItem key={String(p.id)} value={String(p.id)}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="enq-message"
                    className="font-body text-sm font-medium text-navy"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="enq-message"
                    data-ocid="enquiry.message_textarea"
                    placeholder="Tell us about your requirements, budget, preferred location..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="font-body resize-none"
                  />
                </div>

                {submitStatus === "error" && (
                  <div
                    data-ocid="enquiry.error_state"
                    className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2.5 text-destructive text-sm font-body"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please try again or contact us on
                    WhatsApp.
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="enquiry.submit_button"
                  disabled={isPending}
                  className="w-full bg-gold hover:bg-gold-dark text-foreground font-body font-semibold py-3 h-auto text-base"
                >
                  {isPending ? (
                    <>
                      <Loader2
                        data-ocid="enquiry.loading_state"
                        className="mr-2 h-4 w-4 animate-spin"
                      />
                      Sending Enquiry...
                    </>
                  ) : (
                    "Send Enquiry"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
