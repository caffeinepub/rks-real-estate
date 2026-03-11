import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Property, PropertyStatus, PropertyType } from "../backend.d";
import { useActor } from "./useActor";

export type { PropertyType, PropertyStatus };

export function useGetAllProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      if (!actor) return [];
      const props = await actor.getAllProperties();
      return props;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSeedProperties() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      await actor.seedProperties();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
}

export function useSubmitEnquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
      propertyId,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
      propertyId: bigint | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitEnquiry(name, email, phone, message, propertyId);
    },
  });
}

export function useSearchProperties(
  location: string,
  propertyType: PropertyType | null,
  minPrice: bigint | null,
  maxPrice: bigint | null,
) {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: [
      "properties",
      "search",
      location,
      propertyType,
      minPrice?.toString(),
      maxPrice?.toString(),
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchProperties(location, propertyType, minPrice, maxPrice);
    },
    enabled: !!actor && !isFetching,
  });
}
