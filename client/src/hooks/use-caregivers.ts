import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { Caregiver } from "@shared/schema";

export function useCaregivers() {
  return useQuery({
    queryKey: [api.caregivers.list.path],
    queryFn: async () => {
      const res = await fetch(api.caregivers.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch caregivers");
      const data = await res.json();
      return api.caregivers.list.responses[200].parse(data) as Caregiver[];
    },
  });
}

export function useCaregiver(id: number) {
  return useQuery({
    queryKey: [api.caregivers.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.caregivers.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch caregiver");
      const data = await res.json();
      return api.caregivers.get.responses[200].parse(data) as Caregiver;
    },
    enabled: !!id && !isNaN(id),
  });
}
