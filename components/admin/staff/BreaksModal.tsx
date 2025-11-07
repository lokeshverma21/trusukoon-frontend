"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarX, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/store/hooks";
import { updateBreaks } from "@/lib/features/staff/staffSlice";

// ==========================================================
// 🧱 Schema + Type
// ==========================================================
const breakSlotSchema = z.object({
  date: z.string().optional(),
  start: z.string().min(1, "Start time required"),
  end: z.string().min(1, "End time required"),
});

const breaksFormSchema = z.object({
  breaks: z.array(breakSlotSchema).min(1, "At least one break required"),
});

type BreaksFormSchema = z.infer<typeof breaksFormSchema>;

// ==========================================================
// 🧱 Component
// ==========================================================
interface BreaksModalProps {
  staffId: string;
  existingBreaks?: {
    date?: string;
    start: string;
    end: string;
  }[];
}

const BreaksModal: React.FC<BreaksModalProps> = ({ staffId, existingBreaks = [] }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset, register } = useForm<BreaksFormSchema>({
    resolver: zodResolver(breaksFormSchema),
    defaultValues: {
      breaks: existingBreaks.length ? existingBreaks : [{ start: "", end: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "breaks",
  });

  useEffect(() => {
    if (existingBreaks.length) reset({ breaks: existingBreaks });
  }, [existingBreaks, reset]);

  useEffect(() => {
  if (existingBreaks.length) {
    const formattedBreaks = existingBreaks.map((b) => ({
      ...b,
      date: b.date ? new Date(b.date).toISOString().split("T")[0] : "",
    }));
    reset({ breaks: formattedBreaks });
  }
}, [existingBreaks, reset]);


  // ==========================================================
  // 🧱 Submit Handler
  // ==========================================================
  const onSubmit = (data: BreaksFormSchema) => {
    const payload = data.breaks.map((b) => ({
      ...b,
      date: b.date ? new Date(b.date).toISOString() : undefined,
    }));

    dispatch(updateBreaks({ id: staffId, breaks: payload }));

    toast.success("Breaks updated successfully!");
    setOpen(false);
  };

  // ==========================================================
  // 🧱 UI
  // ==========================================================
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="text-white" size="sm">
        <CalendarX />
          Manage Breaks
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4"><CalendarX /> Manage Breaks</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex grid-cols-4 w-full gap-3 items-center border border-primary/20 p-2 rounded-lg bg-gray-50"
            >
              <Input
                type="date"
                {...register(`breaks.${index}.date` as const)}
              />
              <Input
                type="time"
                {...register(`breaks.${index}.start` as const)}
              />
              <Input
                type="time"
                {...register(`breaks.${index}.end` as const)}
              />

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                className="w-fit p-2"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ start: "", end: "" })}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Break
          </Button>

          <DialogFooter className="mt-4">
            <Button type="submit">Save Breaks</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BreaksModal;
