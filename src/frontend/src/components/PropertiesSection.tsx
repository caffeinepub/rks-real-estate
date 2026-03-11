import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useState } from "react";
import { PropertyStatus, PropertyType } from "../backend.d";
import type { Property } from "../backend.d";
import { useGetAllProperties } from "../hooks/useQueries";
import EnquiryModal from "./EnquiryModal";
import PropertyCard from "./PropertyCard";

const PROPERTY_TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: PropertyType.apartment, label: "Apartment" },
  { value: PropertyType.villa, label: "Villa" },
  { value: PropertyType.plot, label: "Plot" },
  { value: PropertyType.commercial, label: "Commercial" },
];

const PROPERTY_STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: PropertyStatus.available, label: "Available" },
  { value: PropertyStatus.sold, label: "Sold" },
];

export default function PropertiesSection() {
  const { data: properties = [], isLoading } = useGetAllProperties();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [enquiryProperty, setEnquiryProperty] = useState<Property | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = properties.filter((p) => {
    const typeMatch = typeFilter === "all" || p.propertyType === typeFilter;
    const statusMatch = statusFilter === "all" || p.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const handleEnquire = (property: Property) => {
    setEnquiryProperty(property);
    setModalOpen(true);
  };

  return (
    <section id="properties" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold font-body text-sm font-semibold tracking-[0.15em] uppercase">
            Our Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy mt-2">
            Featured Properties
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto mt-4 rounded-full" />
          <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
            Explore our handpicked selection of premium residential and
            commercial properties across India.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-10 p-4 bg-secondary/60 rounded-lg border border-border/50"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="font-body text-sm font-medium text-muted-foreground whitespace-nowrap">
              Filter by:
            </span>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger
                data-ocid="properties.filter_type_select"
                className="flex-1 bg-card font-body"
              >
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPE_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="font-body"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              data-ocid="properties.filter_status_select"
              className="w-full sm:w-44 bg-card font-body"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_STATUS_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="font-body"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden border border-border/50"
              >
                <Skeleton className="h-52 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-7 w-1/3" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div data-ocid="properties.empty_state" className="text-center py-20">
            <div className="text-5xl mb-4">🏠</div>
            <h3 className="font-display text-xl text-navy mb-2">
              No Properties Found
            </h3>
            <p className="font-body text-muted-foreground">
              Try adjusting your filters to see more results.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property, idx) => (
              <motion.div
                key={String(property.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
              >
                <PropertyCard
                  property={property}
                  index={idx + 1}
                  onEnquire={handleEnquire}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Enquiry modal */}
      <EnquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        properties={properties}
        selectedPropertyId={enquiryProperty?.id}
      />
    </section>
  );
}
