"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateStaff } from "@/lib/features/staff/staffSlice";
import { Pencil } from "lucide-react";

/* ===========================================================
   Zod Schema — EXACTLY matches controller
=========================================================== */
const editStaffSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number is required"),
  maxAppointmentsPerSlot: z
    .number()
    .int()
    .min(1, "Must be at least 1"),

  meta: z.object({
    specialties: z.array(z.string()).optional(),
    qualifications: z.array(z.string()).optional(),
    experienceYears: z.number().min(0).optional(),
    bio: z.string().optional(),
    notes: z.string().optional(),
  }),
});

type EditStaffFormData = z.infer<typeof editStaffSchema>;

const EditStaffModal = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ staffId: string }>();
  const staffId = params.staffId;

  const staff = useAppSelector(
    (state) => state.staff.selectedStaff
  );

  const [open, setOpen] = React.useState(false);

  const form = useForm<EditStaffFormData>({
    resolver: zodResolver(editStaffSchema),
    values: staff
      ? {
          name: staff.user.name,
          phone: staff.user.phone,
          maxAppointmentsPerSlot: staff.maxAppointmentsPerSlot,
          meta: {
            specialties: staff.user.meta?.specialties ?? [],
            qualifications: staff.user.meta?.qualifications ?? [],
            experienceYears: staff.user.meta?.experienceYears ?? 0,
            bio: staff.user.meta?.bio ?? "",
            notes: staff.user.meta?.notes ?? "",
          },
        }
      : undefined,
  });

  const onSubmit = (values: EditStaffFormData) => {
    dispatch(
      updateStaff({
        id: staffId,
        user: {
          name: values.name,
          phone: values.phone,
          meta: values.meta,
        },
        maxAppointmentsPerSlot: values.maxAppointmentsPerSlot,
      })
    ).unwrap()
      .then(() => setOpen(false));
  };

  if (!staff) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="w-4 h-4 mr-2" />
          Edit Staff
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Edit Staff Profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Max Appointments */}
            <FormField
              control={form.control}
              name="maxAppointmentsPerSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Appointments / Slot</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience Years */}
            <FormField
              control={form.control}
              name="meta.experienceYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience (Years)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="meta.bio"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="meta.notes"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Internal Notes</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="md:col-span-2 flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStaffModal;
