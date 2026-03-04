"use client";

import { useState } from "react";

type PersonalityType = "bold" | "artisan" | "pragmatist" | "cozy";

interface Question {
  text: string;
  answers: { emoji: string; label: string; type: PersonalityType }[];
}

const questions: Question[] = [
  {
    text: "Which Hogwarts house do you belong in?",
    answers: [
      { emoji: "🦁", label: "Gryffindor", type: "bold" },
      { emoji: "🦅", label: "Ravenclaw", type: "artisan" },
      { emoji: "🦡", label: "Hufflepuff", type: "cozy" },
      { emoji: "🐍", label: "Slytherin", type: "pragmatist" },
    ],
  },
  {
    text: "What's your ideal movie night?",
    answers: [
      { emoji: "🔥", label: "Action thriller", type: "bold" },
      { emoji: "🎬", label: "Indie arthouse film", type: "artisan" },
      { emoji: "🛋️", label: "Cozy comfort rewatch", type: "cozy" },
      { emoji: "📱", label: "Whatever's trending", type: "pragmatist" },
    ],
  },
  {
    text: "What's your dream vacation?",
    answers: [
      { emoji: "🪂", label: "Skydiving in New Zealand", type: "bold" },
      { emoji: "🍜", label: "Food tour through Japan", type: "artisan" },
      { emoji: "🏨", label: "Luxury all-inclusive resort", type: "pragmatist" },
      { emoji: "🏕️", label: "Cozy cabin in the woods", type: "cozy" },
    ],
  },
  {
    text: "What does your Spotify Wrapped say about you?",
    answers: [
      { emoji: "⚡", label: "High-energy bangers only", type: "bold" },
      { emoji: "🎷", label: "Jazz and obscure vinyl finds", type: "artisan" },
      { emoji: "🎵", label: "Feel-good classics", type: "cozy" },
      { emoji: "📊", label: "Whatever the algorithm says", type: "pragmatist" },
    ],
  },
  {
    text: "What's your role in your friend group?",
    answers: [
      { emoji: "🚀", label: "The one with wild ideas", type: "bold" },
      { emoji: "🍽️", label: "The one who picks the restaurant", type: "artisan" },
      { emoji: "📅", label: "The one who organizes everything", type: "pragmatist" },
      { emoji: "🎂", label: "The one who remembers birthdays", type: "cozy" },
    ],
  },
  {
    text: "What does your ideal Saturday morning look like?",
    answers: [
      { emoji: "🏃", label: "5am run, then conquer the day", type: "bold" },
      { emoji: "☕", label: "Slow pour-over and a book", type: "artisan" },
      { emoji: "📰", label: "Catching up on news and emails", type: "pragmatist" },
      { emoji: "🌧️", label: "Rain sounds and zero plans", type: "cozy" },
    ],
  },
  {
    text: "Which Star Wars character are you?",
    answers: [
      { emoji: "⚔️", label: "Rey — fierce and determined", type: "bold" },
      { emoji: "🤖", label: "C-3PO — precise and knowledgeable", type: "artisan" },
      { emoji: "🚀", label: "Han Solo — practical and resourceful", type: "pragmatist" },
      { emoji: "🌿", label: "Yoda — wise and peaceful", type: "cozy" },
    ],
  },
];

const personalities: Record<
  PersonalityType,
  { name: string; coffee: string; tagline: string; color: string; bg: string }
> = {
  bold: {
    name: "Bold Adventurer",
    coffee: "Double Espresso",
    tagline: "You live life at full speed and take it straight — no sugar coating needed.",
    color: "#8b5e3c",
    bg: "#f5e6d3",
  },
  artisan: {
    name: "Artisan Snob",
    coffee: "Pour-Over Single Origin",
    tagline: "You appreciate the craft, the story, and the terroir — coffee is an experience.",
    color: "#6b4c30",
    bg: "#ede0d4",
  },
  pragmatist: {
    name: "Practical Pragmatist",
    coffee: "Large Drip Coffee",
    tagline: "You need fuel, not fuss. Reliable, efficient, gets the job done.",
    color: "#7a6550",
    bg: "#ede8e0",
  },
  cozy: {
    name: "Cozy Classic",
    coffee: "Medium Roast Drip",
    tagline: "Warmth, comfort, and the simple pleasure of a familiar cup.",
    color: "#9c6b3c",
    bg: "#fdf0e3",
  },
};

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonalityType[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [started, setStarted] = useState(false);

  function handleAnswer(type: PersonalityType) {
    const newAnswers = [...answers, type];
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setAnswers(newAnswers);
      setQuizComplete(true);
    }
  }

  function handleRestart() {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizComplete(false);
    setStarted(false);
  }

  const counts = answers.reduce<Record<string, number>>((acc, p) => {
    acc[p] = (acc[p] || 0) + 1;
    return acc;
  }, {});

  const allTypes: PersonalityType[] = ["bold", "artisan", "pragmatist", "cozy"];
  const results = allTypes
    .map((type) => ({
      type,
      count: counts[type] || 0,
      percent: Math.round(((counts[type] || 0) / 7) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);

  const primaryType = results[0]?.type;

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-lg rounded-2xl p-8 shadow-lg text-center"
          style={{ background: "#fdf6ef", border: "1px solid #e8d5c0" }}
        >
          <div className="text-6xl mb-4">☕</div>
          <h1
            className="text-3xl font-bold mb-3 leading-tight"
            style={{ fontFamily: "var(--font-lora), serif", color: "#3d2b1f" }}
          >
            What's Your Coffee Personality?
          </h1>
          <p className="text-base mb-8" style={{ color: "#a0785a" }}>
            7 pop culture questions to reveal your perfect brew. Discover which
            of 4 coffee personalities matches your vibe.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "#8b5e3c" }}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const primary = personalities[primaryType];
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg space-y-4">
          <div
            className="rounded-2xl p-8 shadow-lg text-center"
            style={{
              background: primary.bg,
              border: `2px solid ${primary.color}`,
            }}
          >
            <div className="text-5xl mb-3">☕</div>
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-1"
              style={{ color: primary.color }}
            >
              Your Coffee Personality
            </p>
            <h2
              className="text-3xl font-bold mb-1"
              style={{ fontFamily: "var(--font-lora), serif", color: "#3d2b1f" }}
            >
              {primary.name}
            </h2>
            <p
              className="text-lg font-medium mb-3"
              style={{ color: primary.color }}
            >
              {personalities[primaryType].coffee}
            </p>
            <p className="text-sm" style={{ color: "#a0785a" }}>
              {primary.tagline}
            </p>
          </div>

          <div
            className="rounded-2xl p-6 shadow-md"
            style={{ background: "#fdf6ef", border: "1px solid #e8d5c0" }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ fontFamily: "var(--font-lora), serif", color: "#3d2b1f" }}
            >
              Your Full Breakdown
            </h3>
            <div className="space-y-4">
              {results.map(({ type, percent }, i) => {
                const p = personalities[type];
                return (
                  <div key={type}>
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#3d2b1f" }}
                        >
                          {p.name}
                        </span>
                        {i === 0 && (
                          <span
                            className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{
                              background: p.color,
                              color: "#fff",
                            }}
                          >
                            Top Match
                          </span>
                        )}
                        <p className="text-xs" style={{ color: "#a0785a" }}>
                          {p.coffee}
                        </p>
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: p.color }}
                      >
                        {percent}%
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full h-2"
                      style={{ background: "#e8d5c0" }}
                    >
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${percent}%`,
                          background: p.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{
              background: "#fdf6ef",
              border: "1px solid #e8d5c0",
              color: "#8b5e3c",
            }}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-4">
        <div
          className="rounded-2xl p-6 shadow-lg"
          style={{ background: "#fdf6ef", border: "1px solid #e8d5c0" }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium" style={{ color: "#a0785a" }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium" style={{ color: "#a0785a" }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div
            className="w-full rounded-full h-2 mb-6"
            style={{ background: "#e8d5c0" }}
          >
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: "#8b5e3c" }}
            />
          </div>

          <h2
            className="text-xl font-bold mb-6 leading-snug"
            style={{ fontFamily: "var(--font-lora), serif", color: "#3d2b1f" }}
          >
            {q.text}
          </h2>

          <div className="space-y-3">
            {q.answers.map((answer) => (
              <button
                key={answer.type}
                onClick={() => handleAnswer(answer.type)}
                className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  background: "#fdf6ef",
                  border: "1px solid #e8d5c0",
                  color: "#3d2b1f",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#8b5e3c";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "#e8d5c0";
                }}
              >
                <span className="text-2xl">{answer.emoji}</span>
                <span className="text-sm font-medium">{answer.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
