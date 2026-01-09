import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IStaff } from "@/lib/features/staff/staffSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { createAppointment } from "@/lib/features/appointment/appointmentSlice";

/* -------------------- Types -------------------- */

interface Staff {
  _id: string;
  name: string;
}

interface Service {
  _id: string;
  name: string;
}

interface CreateAppointmentModalProps {
  staffList: IStaff[];
  serviceList: Service[];
  onCreated?: () => void;
}

interface AppointmentFormState {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  staff: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
}

/* -------------------- Component -------------------- */

const CreateAppointmentModal: React.FC<CreateAppointmentModalProps> = ({
  staffList,
  serviceList,
  onCreated,
}) => {
    const dispatch = useAppDispatch()
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<AppointmentFormState>({
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    staff: "",
    service: "",
    date: "",
    startTime: "",
    endTime: "",
    notes: "",
  });

  const handleChange = <K extends keyof AppointmentFormState>(
    key: K,
    value: AppointmentFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

const handleSubmit = async (): Promise<void> => {
  if (
    !form.patientName ||
    !form.patientPhone ||
    !form.staff ||
    !form.service ||
    !form.date ||
    !form.startTime ||
    !form.endTime
  ) {
    alert("Missing required fields");
    return;
  }

  const startAt = new Date(`${form.date}T${form.startTime}`).toISOString();
  const endAt = new Date(`${form.date}T${form.endTime}`).toISOString();

  if (new Date(endAt) <= new Date(startAt)) {
    alert("End time must be after start time");
    return;
  }

  const payload = {
    patient: {
      name: form.patientName,
      phone: form.patientPhone,
      email: form.patientEmail || undefined,
    },
    staff: form.staff,
    service: form.service,
    startAt,
    endAt,
    notes: form.notes || undefined,
  };

  try {
    setLoading(true);
    console.log(payload)

    await dispatch(createAppointment(payload)).unwrap();

    onCreated?.();
    setOpen(false);

    setForm({
      patientName: "",
      patientPhone: "",
      patientEmail: "",
      staff: "",
      service: "",
      date: "",
      startTime: "",
      endTime: "",
      notes: "",
    });
  } catch (err) {
    alert(typeof err === "string" ? err : "Failed to create appointment");
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Appointment</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    placeholder="Patient Name *"
                    value={form.patientName}
                    onChange={(e) => handleChange("patientName", e.target.value)}
                />

                <Input
                    placeholder="Patient Phone *"
                    value={form.patientPhone}
                    onChange={(e) => handleChange("patientPhone", e.target.value)}
                />
            </div>

          <Input
            placeholder="Patient Email (optional)"
            value={form.patientEmail}
            onChange={(e) => handleChange("patientEmail", e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select onValueChange={(v) => handleChange("staff", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Staff *" />
            </SelectTrigger>
            <SelectContent>
              {staffList.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                  {s.user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(v) => handleChange("service", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Service *" />
            </SelectTrigger>
            <SelectContent>
              {serviceList.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

          <Input
            type="date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />

          <div className="flex gap-2">
            <Input
              type="time"
              value={form.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
            <Input
              type="time"
              value={form.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
            />
          </div>

          <Textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Appointment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointmentModal;
