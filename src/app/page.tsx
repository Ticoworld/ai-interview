"use client";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import Chat from "@/components/Chat";
import QuestionList from "@/components/QuestionList";
import { ScoreSummary } from "@/components/ScoreSummary";
import VideoScoreDetailCircles from "@/components/VideoScoreDetailCircles";


export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedVideo(URL.createObjectURL(file));
  };

  const [activeQuestion, setActiveQuestion] = useState("3");

  const questions = [
    {
      id: "1",
      title: "Tell us about yourself?",
      completed: true,
    },
    {
      id: "2",
      title: "Why do you think you are good at sales?",
      completed: true,
    },
    {
      id: "3",
      title: "What is the biggest deal you have closed?",
      completed: false,
    },
    {
      id: "4",
      title: "Why you choose this company?",
      completed: false,
    },
    {
      id: "5",
      title: "What your expectation in...",
      completed: false,
    },
  ];

  const metrics = [
    { label: "Professionalism", value: 80, color: "#10B981" },
    { label: "Business Acumen", value: 90, color: "#10B981" },
    { label: "Opportunistic", value: 65, color: "#F97316" },
    { label: "Closing Technique", value: 85, color: "#10B981" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-6">
      {/* Left Column - Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Section 1: Camera Container */}
        <div className="relative bg-white rounded-2xl shadow-2xl h-[60vh] overflow-hidden">
          {/* Section 2: AI Interviewer Video */}
          <div className="absolute top-4 right-4 w-[320px] z-10 shadow-xl rounded-xl overflow-hidden">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
              src="/ai-interviewer.mp4"
            />
          </div>

          {/* Top-Left Profile */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-4">
            <div className="w-20 h-20 relative rounded-full border-4 border-white overflow-hidden shadow-lg">
              <Image
                src="/ai-interviewer.jpg"
                alt="Candidate"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-500">Seo Jan Im</h2>
              <p className="text-gray-300 mt-1">Talent</p>
            </div>
          </div>

          {/* Camera/Video Area */}
          <div className="h-full flex items-center justify-center bg-black">
            {isCameraOn ? (
              <Webcam
                ref={webcamRef}
                className="w-full h-full object-cover"
                audio={false}
                mirrored
              />
            ) : uploadedVideo ? (
              <video
                src={uploadedVideo}
                className="w-full h-full object-contain"
                controls
              />
            ) : (
              <div className="text-center space-y-6">
                <button
                  onClick={() => setIsCameraOn(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-xl font-semibold transition-all"
                >
                  🎥 Start Live Camera
                </button>
                <label className="block text-gray-300">
                  or{" "}
                  <span className="text-blue-400 cursor-pointer underline">
                    upload video
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Ambition Statement */}
          {/* <div className="absolute bottom-8 left-[40%] z-10 text-white max-w-2xl">
            <p className="text-lg italic">
              &quot;I&apos;m an extremely ambitious person which motivates me in
              my professional life.&quot;
            </p>
          </div> */}
        </div>

        {/* Bottom Row - Sections 3, 4, 5 */}
        <div className="flex gap-6 h-[44vh]">
          {/* Section 3: Question List (Placeholder) */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
            <QuestionList
              questions={questions}
              activeQuestion={activeQuestion}
              setActiveQuestion={setActiveQuestion}
            />
          </div>

          {/* Section 4: Score Summary (Placeholder) */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
            <ScoreSummary />
          </div>

          {/* Section 5: Metrics (Placeholder) */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
          <VideoScoreDetailCircles metrics={metrics} />
          </div>
        </div>
      </div>

      {/* Right Column - Section 6: Chat */}
      <div className="w-[400px] h-[90vh]">
        <Chat />
      </div>
    </div>
  );
}
