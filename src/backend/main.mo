import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  type PropertyType = {
    #apartment;
    #villa;
    #plot;
    #commercial;
  };

  type PropertyStatus = {
    #available;
    #sold;
  };

  type Property = {
    id : Nat;
    title : Text;
    propertyType : PropertyType;
    location : Text;
    price : Nat;
    bedrooms : Nat;
    bathrooms : Nat;
    area : Nat;
    description : Text;
    status : PropertyStatus;
    featured : Bool;
  };

  module Property {
    public func compare(property1 : Property, property2 : Property) : Order.Order {
      Nat.compare(property1.id, property2.id);
    };
  };

  type Enquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    propertyId : ?Nat;
    timestamp : Int;
  };

  module Enquiry {
    public func compare(enquiry1 : Enquiry, enquiry2 : Enquiry) : Order.Order {
      Int.compare(enquiry1.timestamp, enquiry2.timestamp);
    };
  };

  let properties = Map.empty<Nat, Property>();
  let enquiries = Map.empty<Nat, Enquiry>();
  var nextPropertyId = 1;
  var nextEnquiryId = 1;

  public shared ({ caller }) func addProperty(
    title : Text,
    propertyType : PropertyType,
    location : Text,
    price : Nat,
    bedrooms : Nat,
    bathrooms : Nat,
    area : Nat,
    description : Text,
    featured : Bool,
  ) : async Nat {
    let property : Property = {
      id = nextPropertyId;
      title;
      propertyType;
      location;
      price;
      bedrooms;
      bathrooms;
      area;
      description;
      status = #available;
      featured;
    };
    properties.add(nextPropertyId, property);
    nextPropertyId += 1;
    property.id;
  };

  public shared ({ caller }) func updateProperty(id : Nat, title : Text, propertyType : PropertyType, location : Text, price : Nat, bedrooms : Nat, bathrooms : Nat, area : Nat, description : Text, status : PropertyStatus, featured : Bool) : async () {
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property not found") };
      case (?_) {
        let property : Property = {
          id;
          title;
          propertyType;
          location;
          price;
          bedrooms;
          bathrooms;
          area;
          description;
          status;
          featured;
        };
        properties.add(id, property);
      };
    };
  };

  public shared ({ caller }) func deleteProperty(id : Nat) : async () {
    if (not properties.containsKey(id)) {
      Runtime.trap("Property not found");
    };
    properties.remove(id);
  };

  public query ({ caller }) func getAllProperties() : async [Property] {
    properties.values().toArray().sort();
  };

  public query ({ caller }) func getPropertyById(id : Nat) : async Property {
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) { property };
    };
  };

  public query ({ caller }) func getPropertiesByType(propertyType : PropertyType) : async [Property] {
    properties.values().toArray().filter(
      func(property) {
        property.propertyType == propertyType;
      }
    );
  };

  public query ({ caller }) func getPropertiesByStatus(status : PropertyStatus) : async [Property] {
    properties.values().toArray().filter(
      func(property) {
        property.status == status;
      }
    );
  };

  public query ({ caller }) func searchProperties(location : Text, propertyType : ?PropertyType, minPrice : ?Nat, maxPrice : ?Nat) : async [Property] {
    let filtered = properties.values().toArray().filter(
      func(property) {
        let locationMatch = property.location.toLower().contains(#text(location.toLower()));
        let typeMatch = switch (propertyType) {
          case (null) { true };
          case (?t) { property.propertyType == t };
        };
        let minPriceMatch = switch (minPrice) {
          case (null) { true };
          case (?min) { property.price >= min };
        };
        let maxPriceMatch = switch (maxPrice) {
          case (null) { true };
          case (?max) { property.price <= max };
        };
        locationMatch and typeMatch and minPriceMatch and maxPriceMatch;
      }
    );
    filtered;
  };

  public shared ({ caller }) func submitEnquiry(name : Text, email : Text, phone : Text, message : Text, propertyId : ?Nat) : async Nat {
    let enquiry : Enquiry = {
      id = nextEnquiryId;
      name;
      email;
      phone;
      message;
      propertyId;
      timestamp = Time.now();
    };
    enquiries.add(nextEnquiryId, enquiry);
    nextEnquiryId += 1;
    enquiry.id;
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.values().toArray().sort();
  };

  public shared ({ caller }) func seedProperties() : async () {
    if (properties.size() > 0) {
      Runtime.trap("Properties already seeded");
    };

    let sampleProperties : [Property] = [
      {
        id = 1;
        title = "Luxury 3 BHK Apartment in Gurgaon";
        propertyType = #apartment;
        location = "Gurgaon, Haryana";
        price = 12000000;
        bedrooms = 3;
        bathrooms = 3;
        area = 1800;
        description = "Spacious 3 BHK apartment in prime Gurgaon location with modern amenities.";
        status = #available;
        featured = true;
      },
      {
        id = 2;
        title = "Independent Villa in Noida";
        propertyType = #villa;
        location = "Noida, Uttar Pradesh";
        price = 35000000;
        bedrooms = 5;
        bathrooms = 6;
        area = 4200;
        description = "Luxurious independent villa with garden and swimming pool in Noida.";
        status = #available;
        featured = true;
      },
      {
        id = 3;
        title = "Plots for Sale in Greater Noida";
        propertyType = #plot;
        location = "Greater Noida, Uttar Pradesh";
        price = 2500000;
        bedrooms = 0;
        bathrooms = 0;
        area = 250;
        description = "Residential plots available in prime Greater Noida locations.";
        status = #available;
        featured = false;
      },
      {
        id = 4;
        title = "Ready to Move Commercial Space in Delhi";
        propertyType = #commercial;
        location = "Delhi Cantonment, Delhi";
        price = 8000000;
        bedrooms = 0;
        bathrooms = 2;
        area = 1200;
        description = "Commercial office space with parking in strategic Delhi location.";
        status = #available;
        featured = false;
      },
      {
        id = 5;
        title = "2 BHK Apartment in Dwarka, Delhi";
        propertyType = #apartment;
        location = "Dwarka, Delhi";
        price = 8000000;
        bedrooms = 2;
        bathrooms = 2;
        area = 1050;
        description = "Affordable 2 BHK apartment in well-connected Dwarka locality.";
        status = #sold;
        featured = false;
      },
      {
        id = 6;
        title = "Lake View Villa in South Delhi";
        propertyType = #villa;
        location = "South Delhi, Delhi";
        price = 55000000;
        bedrooms = 6;
        bathrooms = 7;
        area = 7000;
        description = "Premium villa with lake view and state-of-the-art facilities.";
        status = #available;
        featured = true;
      },
    ];

    for (property in sampleProperties.values()) {
      properties.add(property.id, property);
      nextPropertyId += 1;
    };
  };
};
