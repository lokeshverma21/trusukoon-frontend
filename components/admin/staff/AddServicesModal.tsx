"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectStaffState,
  updateStaff,
  IStaff,
  IService,
  updateStaffServices,
} from "@/lib/features/staff/staffSlice";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AddServicesModalProps {
  staffId: string;
  allServices: IService[]; // 🔹 Pass all services from parent
}

// 🧱 Validation schema
const serviceSchema = z.object({
  serviceId: z.string().min(1, "Service is required"),
});

const formSchema = z.object({
  services: z.array(serviceSchema).min(1, "At least one service required"),
});

type ServiceFormSchema = z.infer<typeof formSchema>;

export const AddServicesModal: React.FC<AddServicesModalProps> = ({
  staffId,
  allServices,
}) => {
  const dispatch = useAppDispatch();
  const { selectedStaff, loading } = useAppSelector(selectStaffState);
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services:
        selectedStaff?.services?.map((s) => ({
          serviceId: s._id,
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  // Reset form when modal opens or staff changes
  useEffect(() => {
    if (open && selectedStaff) {
      reset({
        services:
          selectedStaff.services?.map((s) => ({
            serviceId: s?._id,
          })) || [],
      });
    }
  }, [open, selectedStaff, reset]);

  const onSubmit = async (data: ServiceFormSchema) => {
    try {
      const serviceIds = data.services.map((s) => s.serviceId);

      await dispatch(
        updateStaffServices({
          id: staffId,
          services: serviceIds,
        })
      ).unwrap();

      toast.success("Services updated successfully!");
      setOpen(false);
    } catch (err) {
      toast.error(
        typeof err === "string" ? err : "Failed to update services."
      );
    }
  };


  if (allServices.length === 0)
  return <p className="text-sm text-muted-foreground">No services available.</p>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 🔘 The modal trigger button itself */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Manage Services
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>🧩 Manage Staff Services</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-3 border p-3 rounded-md bg-gray-50"
            >
              <Controller
                name={`services.${index}.serviceId`}
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                      {allServices.map((service) => (
                        <SelectItem key={service._id} value={service._id}>
                          {service.name} ({service.duration} mins)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {errors.services && (
            <p className="text-sm text-red-500">{errors.services.message}</p>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ serviceId: "" })}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Button>

          <DialogFooter className="mt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
