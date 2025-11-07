"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, CalendarClock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectStaffState,
  updateAvailability,
  IAvailabilitySlot,
} from "@/lib/features/staff/staffSlice";

// 🧱 Validation schema
const availabilitySchema = z.object({
  availability: z
    .array(
      z.object({
        weekday: z.coerce.number().min(0).max(6),
        start: z.string().min(1, "Start time is required"),
        end: z.string().min(1, "End time is required"),
      })
    )
    .min(1, "At least one availability slot is required."),
});

type AvailabilityFormSchema = z.infer<typeof availabilitySchema>;

interface AddAvailabilityModalProps {
  staffId: string;
}

const weekdays = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export const AddAvailabilityModal: React.FC<AddAvailabilityModalProps> = ({
  staffId,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedStaff, loading } = useAppSelector(selectStaffState);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AvailabilityFormSchema>({
    resolver: zodResolver(availabilitySchema) as never,
    defaultValues: {
      availability:
        selectedStaff?.availability || [{ weekday: 1, start: "09:00", end: "17:00" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "availability",
  });

  // ✅ Sync staff data into form when modal opens
  useEffect(() => {
    if (open && selectedStaff?.availability) {
      reset({ availability: selectedStaff.availability });
    }
  }, [open, selectedStaff, reset]);

  // ✅ Add new availability slot
  const handleAddSlot = () => {
    append({ weekday: 1, start: "09:00", end: "17:00" });
  };

  // ✅ Submit handler (safe for production)
  const onSubmit = (data: AvailabilityFormSchema) => {
    const payload: IAvailabilitySlot[] = data.availability;
    console.log("Submitting payload:", payload);

    dispatch(updateAvailability({ id: staffId, availability: payload }))
      .unwrap()
      .then(() => {
        toast.success("Availability updated successfully.");
        setOpen(false);
      })
      .catch((err) => {
        toast.error(
          typeof err === "string" ? err : "Failed to update availability."
        );
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-primary/80 bg-primary text-white cursor-pointer hover:text-white" size="sm">
          <CalendarClock className="h-4 w-4 mr-2" />
          Manage Availability
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Staff Availability</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-3 rounded-lg border p-4 sm:grid-cols-4"
              >
                <Controller
                  name={`availability.${index}.weekday`}
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    >
                      {weekdays.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </select>
                  )}
                />

                <Controller
                  name={`availability.${index}.start`}
                  control={control}
                  render={({ field }) => (
                    <Input type="time" {...field} className="w-full" />
                  )}
                />

                <Controller
                  name={`availability.${index}.end`}
                  control={control}
                  render={({ field }) => (
                    <Input type="time" {...field} className="w-full" />
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="mt-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {errors.availability && (
              <p className="text-sm text-red-500">
                {errors.availability.message}
              </p>
            )}

            <Button
              type="button"
              variant="secondary"
              onClick={handleAddSlot}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Slot
            </Button>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
