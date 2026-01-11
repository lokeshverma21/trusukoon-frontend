"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { useAppDispatch } from "@/lib/store/hooks";
import { createStaff } from "@/lib/features/staff/staffSlice";

const addStaffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  password: z.string().min(6, "Minimum 6 characters"),
  timezone: z.string().optional(),

  meta: z
    .object({
      specialties: z.array(z.string().min(1)).optional(),
      qualifications: z.array(z.string().min(1)).optional(),
      experienceYears: z
        .number()
        .min(0, "Invalid experience")
        .optional(),
      bio: z.string().max(500).optional(),
      notes: z.string().max(500).optional(),
    })
    .optional(),
});


type AddStaffFormData = z.infer<typeof addStaffSchema>;

const AddStaffModal = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const form = useForm<AddStaffFormData>({
    resolver: zodResolver(addStaffSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      timezone: "Asia/Kolkata",
      meta: {
        specialties: [],
        qualifications: [],
        experienceYears: undefined,
        bio: "",
        notes: "",
      },
    },
  });

  const onSubmit = async (values: AddStaffFormData) => {
    const payload = {
      ...values,
      meta: {
        ...values.meta,
        specialties: values.meta?.specialties?.filter(Boolean),
        qualifications: values.meta?.qualifications?.filter(Boolean),
      },
    };

    const res = await dispatch(createStaff(payload));

    if (createStaff.fulfilled.match(res)) {
      toast.success("Staff created successfully");
      setOpen(false);
      form.reset();
    } else {
      toast.error(res.payload as string);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Staff</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="phone" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField name="password" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

            {/* Meta fields */}
            <FormField
              name="meta.experienceYears"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience (Years)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? undefined : Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField name="meta.bio" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl><Textarea {...field} /></FormControl>
              </FormItem>
            )} />

            <FormField name="meta.notes" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Internal Notes</FormLabel>
                <FormControl><Textarea {...field} /></FormControl>
              </FormItem>
            )} />

            <div className="flex justify-end pt-2">
              <Button type="submit">Create Staff</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffModal;
