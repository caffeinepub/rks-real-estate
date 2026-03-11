import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bath, Bed, MapPin, Maximize } from "lucide-react";
import type { Property } from "../backend.d";
import { PropertyStatus, PropertyType } from "../backend.d";
import { formatArea, formatINR } from "../utils/formatters";

const PROPERTY_IMAGES: Record<string, string> = {
  [PropertyType.apartment]:
    "/assets/generated/property-apartment.dim_800x500.jpg",
  [PropertyType.villa]: "/assets/generated/property-villa.dim_800x500.jpg",
  [PropertyType.plot]: "/assets/generated/property-plot.dim_800x500.jpg",
  [PropertyType.commercial]:
    "/assets/generated/property-apartment.dim_800x500.jpg",
};

interface PropertyCardProps {
  property: Property;
  index: number;
  onEnquire: (property: Property) => void;
}

export default function PropertyCard({
  property,
  index,
  onEnquire,
}: PropertyCardProps) {
  const imageUrl =
    PROPERTY_IMAGES[property.propertyType] ??
    PROPERTY_IMAGES[PropertyType.apartment];
  const isAvailable = property.status === PropertyStatus.available;

  return (
    <div
      data-ocid={`property.item.${index}`}
      className="bg-card rounded-lg overflow-hidden shadow-card card-hover group border border-border/50"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            className={
              isAvailable
                ? "bg-green-500 text-white hover:bg-green-600 font-body text-xs font-semibold"
                : "bg-red-500 text-white hover:bg-red-600 font-body text-xs font-semibold"
            }
          >
            {isAvailable ? "Available" : "Sold"}
          </Badge>
          {property.featured && (
            <Badge className="bg-gold text-foreground hover:bg-gold-dark font-body text-xs font-semibold">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-navy/80 text-white border-none font-body text-xs capitalize"
          >
            {property.propertyType}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-navy mb-1 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
          <span className="font-body text-sm line-clamp-1">
            {property.location}
          </span>
        </div>

        <div className="font-display text-2xl font-bold text-navy mb-4">
          {formatINR(property.price)}
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-4 text-muted-foreground text-sm font-body mb-4 pb-4 border-b border-border/50">
          {Number(property.bedrooms) > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4 text-gold" />
              {Number(property.bedrooms)} Beds
            </span>
          )}
          {Number(property.bathrooms) > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4 text-gold" />
              {Number(property.bathrooms)} Baths
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="h-4 w-4 text-gold" />
            {formatArea(property.area)}
          </span>
        </div>

        <Button
          data-ocid={`property.enquire_button.${index}`}
          onClick={() => onEnquire(property)}
          className="w-full bg-navy hover:bg-navy-light text-white font-body font-semibold"
        >
          Enquire Now
        </Button>
      </div>
    </div>
  );
}
