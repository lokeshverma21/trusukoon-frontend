import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/axiosInstance";
import { RootState } from "@/lib/store/store";
import { AxiosError } from "axios";
import {
  MessageTemplate,
  MessageEvent,
  PreviewMessageResponse,
} from "@/types/messageTemplate.types";

export const fetchMessageTemplates = createAsyncThunk<
  MessageTemplate[],
  void,
  { rejectValue: string }
>("messageTemplate/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/message-template");
    return res.data.data as MessageTemplate[];
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch message templates"
    );
  }
});

export const createMessageTemplate = createAsyncThunk<
  MessageTemplate,
  Omit<MessageTemplate, "_id" | "createdAt" | "updatedAt">,
  { rejectValue: string }
>("messageTemplate/create", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/message-template", payload);
    return res.data.data as MessageTemplate;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to create template"
    );
  }
});

export const updateMessageTemplate = createAsyncThunk<
  MessageTemplate,
  { id: string; data: Partial<MessageTemplate> },
  { rejectValue: string }
>("messageTemplate/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/message-template/${id}`, data);
    return res.data.data as MessageTemplate;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to update template"
    );
  }
});

export const previewMessage = createAsyncThunk<
  PreviewMessageResponse,
  {
    mode: "template" | "live";
    templateBody?: string;
    appointmentId?: string;
  },
  { rejectValue: string }
>("messageTemplate/preview", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/message/preview", payload);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to preview message"
    );
  }
});


export const logMessage = createAsyncThunk<
  void,
  {
    appointmentId: string;
    templateId: string;
    message: string;
    recipient: string;
  },
  { rejectValue: string }
>("messageTemplate/log", async (payload, { rejectWithValue }) => {
  try {
    await api.post("/message/log", payload);
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Failed to log message"
    );
  }
});

interface MessageTemplateState {
  templates: MessageTemplate[];
  previewMessage: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: MessageTemplateState = {
  templates: [],
  previewMessage: null,
  loading: false,
  error: null,
};

const messageTemplateSlice = createSlice({
  name: "messageTemplate",
  initialState,
  reducers: {
    clearPreviewMessage: (state) => {
      state.previewMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Templates
      .addCase(fetchMessageTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMessageTemplates.fulfilled,
        (state, action: PayloadAction<MessageTemplate[]>) => {
          state.loading = false;
          state.templates = action.payload;
        }
      )
      .addCase(fetchMessageTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch templates";
      })

      // Create Template
      .addCase(createMessageTemplate.fulfilled, (state, action) => {
        state.templates.push(action.payload);
      })

      // Update Template
      .addCase(updateMessageTemplate.fulfilled, (state, action) => {
        const index = state.templates.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) {
          state.templates[index] = action.payload;
        }
      })

      // Preview Message
      .addCase(previewMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(previewMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.previewMessage = action.payload.message;
      })
      .addCase(previewMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to preview message";
      });
  },
});

export const { clearPreviewMessage } = messageTemplateSlice.actions;

export const selectMessageTemplates = (state: RootState) => state.messageTemplate;

export default messageTemplateSlice.reducer;
