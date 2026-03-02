import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { InsertBooking, Booking } from "@shared/schema";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      // Validate before sending
      const validated = api.bookings.create.input.parse(data);
      
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create booking");
      }
      
      const responseData = await res.json();
      return api.bookings.create.responses[201].parse(responseData) as Booking;
    },
    // Invalidate list if we had one
    onSuccess: () => {
      // If we add bookings list in the future, invalidate here
    }
  });
}
