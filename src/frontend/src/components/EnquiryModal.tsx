import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import type { Property } from "../backend.d";
import { useSubmitEnquiry } from "../hooks/useQueries";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  properties: Property[];
  selectedPropertyId?: bigint;
}

export default function EnquiryModal({
  open,
  onClose,
  properties,
  selectedPropertyId,
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [propertyId, setPropertyId] = useState<string>(
    selectedPropertyId !== undefined ? String(selectedPropertyId) : "general",
  );
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const { mutate: submitEnquiry, isPending } = useSubmitEnquiry();

  // Sync selectedPropertyId when modal opens with a new property
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
      if (submitStatus === "success") {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setPropertyId("general");
        setSubmitStatus("idle");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) return;

    const resolvedPropertyId =
      propertyId === "general" ? null : BigInt(propertyId);
    submitEnquiry(
      { name, email, phone, message, propertyId: resolvedPropertyId },
      {
        onSuccess: () => {
          setSubmitStatus("success");
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        },
        onError: () => {
          setSubmitStatus("error");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-ocid="enquiry.dialog"
        className="max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-navy">
            Send an Enquiry
          </DialogTitle>
        </DialogHeader>

        {submitStatus === "success" ? (
          <div
            data-ocid="enquiry.success_state"
            className="flex flex-col items-center py-10 gap-4 text-center"
          >
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <h3 className="font-display text-lg font-semibold text-navy">
              Enquiry Submitted!
            </h3>
            <p className="text-muted-foreground font-body text-sm">
              Thank you for reaching out. Our team will contact you shortly.
            </p>
            <Button
              onClick={() => {
                setSubmitStatus("idle");
                onClose();
              }}
              className="bg-navy hover:bg-navy-light text-white mt-2"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="modal-name"
                className="font-body text-sm font-medium text-navy"
              >
                Full Name *
              </Label>
              <Input
                id="modal-name"
                data-ocid="enquiry.name_input"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="font-body border-border focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="modal-email"
                className="font-body text-sm font-medium text-navy"
              >
                Email Address *
              </Label>
              <Input
                id="modal-email"
                type="email"
                data-ocid="enquiry.email_input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-body border-border focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="modal-phone"
                className="font-body text-sm font-medium text-navy"
              >
                Phone Number *
              </Label>
              <Input
                id="modal-phone"
                type="tel"
                data-ocid="enquiry.phone_input"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="font-body border-border focus:border-gold focus:ring-gold"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="modal-property"
                className="font-body text-sm font-medium text-navy"
              >
                Property of Interest
              </Label>
              <Select value={propertyId} onValueChange={setPropertyId}>
                <SelectTrigger
                  id="modal-property"
                  data-ocid="enquiry.property_select"
                  className="font-body border-border focus:border-gold"
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
                htmlFor="modal-message"
                className="font-body text-sm font-medium text-navy"
              >
                Message *
              </Label>
              <Textarea
                id="modal-message"
                data-ocid="enquiry.message_textarea"
                placeholder="Tell us about your requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                className="font-body border-border focus:border-gold focus:ring-gold resize-none"
              />
            </div>

            {submitStatus === "error" && (
              <div
                data-ocid="enquiry.error_state"
                className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2 text-destructive text-sm font-body"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                Failed to submit enquiry. Please try again.
              </div>
            )}

            <Button
              type="submit"
              data-ocid="enquiry.submit_button"
              disabled={isPending}
              className="w-full bg-navy hover:bg-navy-light text-white font-body font-semibold py-2.5 h-auto"
            >
              {isPending ? (
                <>
                  <Loader2
                    data-ocid="enquiry.loading_state"
                    className="mr-2 h-4 w-4 animate-spin"
                  />
                  Submitting...
                </>
              ) : (
                "Send Enquiry"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
