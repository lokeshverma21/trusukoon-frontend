"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchMessageTemplates,
  updateMessageTemplate,
  previewMessage,
  selectMessageTemplates,
  clearPreviewMessage,
} from "@/lib/features/message/messageTemplateSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function TemplateManagementPage() {
  const dispatch = useAppDispatch();
  const {
    templates,
    previewMessage: previewText,
    loading,
    } = useAppSelector(selectMessageTemplates);


  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [draftBody, setDraftBody] = useState("");

  const selectedTemplate = templates.find(
    (t) => t._id === selectedTemplateId
  );

  useEffect(() => {
    dispatch(fetchMessageTemplates());
  }, [dispatch]);

  const handlePreview = () => {
    if (!selectedTemplate) return;

    dispatch(
      previewMessage({
            mode: "template",
            templateBody: draftBody,
        })
    );
  };

  const handleSave = () => {
    if (!selectedTemplate) return;

    dispatch(
      updateMessageTemplate({
        id: selectedTemplate._id,
        data: { body: draftBody },
      })
    );
  };

  return (
    <div className="p-0 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Message Templates</h1>
        {selectedTemplate && (
          <Badge variant="outline">{selectedTemplate.event}</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Template Editor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedTemplate ? (
              <p className="text-sm text-muted-foreground">
                Select a template to start editing
              </p>
            ) : (
              <>
                <Textarea
                  value={draftBody}
                  onChange={(e) => setDraftBody(e.target.value)}
                  className="min-h-[260px]"
                  placeholder="Write your message template here..."
                />

                <div className="flex gap-2">
                  <Button onClick={handlePreview} variant="secondary">
                    Preview
                  </Button>
                  <Button onClick={handleSave}>Save</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-40 w-full" />
            ) : previewText ? (
              <div className="whitespace-pre-wrap text-white text-sm bg-muted p-4 rounded-md">
                {previewText}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click “Preview” to see generated message
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Variables */}
      <Card>
        <CardHeader>
          <CardTitle>Available Variables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {VARIABLES.map((v) => (
              <Badge key={v} variant="secondary">
                {v}
              </Badge>
            ))}
          </div>

          <Separator className="my-4" />

          <p className="text-xs text-muted-foreground">
            Use variables exactly as shown. Missing variables will result in
            empty values.
          </p>
        </CardContent>
      </Card>

      {/* Template List */}
      <Card>
        <CardHeader>
          <CardTitle>Select Template</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 flex-wrap">
          {templates.map((t) => (
            <Button
              key={t._id}
              variant={
                t._id === selectedTemplateId ? "default" : "outline"
              }
              size="sm"
              onClick={() => {
                    setSelectedTemplateId(t._id);
                    setDraftBody(t.body);          // ✅ local init
                    dispatch(clearPreviewMessage());
                }}
            >
              {t.name}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

const VARIABLES = [
  "{{patient.name}}",
  "{{patient.phone}}",
  "{{doctor.name}}",
  "{{appointment.date}}",
  "{{appointment.time}}",
  "{{clinic.name}}",
  "{{clinic.phone}}",
];
