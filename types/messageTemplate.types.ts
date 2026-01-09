export type MessageEvent =
  | "APPOINTMENT_CONFIRMATION"
  | "APPOINTMENT_REMINDER"
  | "APPOINTMENT_CANCELLATION"
  | "PAYMENT_REMINDER";

export type MessageChannel = "whatsapp" | "sms" | "email";

export interface MessageTemplate {
  _id: string;
  name: string;
  event: MessageEvent;
  channel: MessageChannel;
  body: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PreviewMessageResponse {
  message: string;
}