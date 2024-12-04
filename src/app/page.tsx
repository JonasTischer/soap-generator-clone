'use client';

import { useState } from 'react';
import { Mic, PauseCircle, Languages } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import dynamic from 'next/dynamic';
import { PartialBlock } from '@blocknote/core';

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

export default function ConsultPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<
    Array<PartialBlock>
  >([{ type: 'paragraph', content: '' }]);
  const handleStartStop = () => {
    if (isRecording) {
      // Stop recording and generate a mock note
      setIsRecording(false);
      setIsPaused(false);
      setGeneratedNote([
        {
          type: 'heading',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
            level: 3,
          },
          content: [
            {
              type: 'text',
              text: 'SOAP Note',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [],
          children: [],
        },
        {
          type: 'heading',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
            level: 3,
          },
          content: [
            {
              type: 'text',
              text: 'Subjective:',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: 'Chief Complaint: Patient reports persistent lower back pain for the past 2 weeks.',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: 'History: Pain began after lifting heavy boxes during a move. Pain is worse in the morning and improves with movement.',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'heading',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
            level: 3,
          },
          content: [
            {
              type: 'text',
              text: 'Objective:',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: 'Vital Signs: BP 120/80, HR 72, RR 16, Temp 98.6°F',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: 'Physical Examination: Limited range of motion in lumbar spine. Tenderness noted on palpation of lower paraspinal muscles.',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'heading',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
            level: 3,
          },
          content: [
            {
              type: 'text',
              text: 'Assessment:',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: 'Primary Diagnosis: Acute lumbar strain',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: 'Differential Diagnoses: Muscle spasm, herniated disc, sciatica',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'heading',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
            level: 3,
          },
          content: [
            {
              type: 'text',
              text: 'Plan:',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: '1. Medications: Prescribed NSAIDs for pain management',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: '2. Physical Therapy: Referral for 6 sessions',
              styles: {},
            },
          ],
          children: [],
        },
        {
          type: 'paragraph',
          props: {
            textColor: 'default',
            backgroundColor: 'default',
            textAlignment: 'left',
          },
          content: [
            {
              type: 'text',
              text: '3. Follow-up: Return in 2 weeks if symptoms persist',
              styles: {},
            },
          ],
          children: [],
        },
      ]);
    } else {
      // Start recording
      setIsRecording(true);
      setGeneratedNote([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Header Controls */}
        <div className="flex items-center gap-3 mb-6">
          <Input
            placeholder="Patient Name"
            className="max-w-[200px]"
          />
          <Select defaultValue="male">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="soap">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Note type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="soap">Note: SOAP</SelectItem>
              <SelectItem value="progress">Note: Progress</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="en">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">
                <div className="flex items-center">
                  <Languages className="w-4 h-4 mr-2" />
                  en → en
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsPaused(!isPaused)}
              disabled={!isRecording}
            >
              <PauseCircle className="w-4 h-4" />
              Pause
            </Button>
            <Button
              variant="default"
              className="bg-blue-700 hover:bg-blue-800"
              onClick={handleStartStop}
            >
              {isRecording ? 'Stop listening' : 'Start listening'}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Panel - Notepad */}
          <div className="border rounded-lg shadow-sm">
            <div className="border-b px-4 py-2">
              <h2 className="font-medium">Notepad</h2>
            </div>
            <div className="p-4 space-y-4 text-gray-600 min-h-[400px]">
              <p>Enter non-verbalised notes here.</p>
              <p>
                Notes entered here will be included in your
                post-consult summary.
              </p>
            </div>
            <div className="border-t p-3">
              <div className="relative">
                <Input
                  placeholder="Enter non-verbalised notes here, press Ctrl + Shift + D to dictate"
                  className="pr-20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-gray-500" />
                  <div className="w-4 h-4 border rounded-sm border-gray-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Listening Status or Generated Note */}
          <div className="border rounded-lg shadow-sm">
            {isRecording ? (
              <div className="p-6">
                <div className="flex flex-col items-center justify-center h-full gap-6">
                  <h2 className="text-xl">Lyrebird is listening</h2>
                  <div className="w-full max-w-md space-y-4">
                    <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full w-2/3 animate-[recording_2s_ease-in-out_infinite]" />
                    </div>
                    <Select defaultValue="default">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select microphone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">
                          Default - MacBook Pro Microphone (Built-in)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <Editor value={generatedNote} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
