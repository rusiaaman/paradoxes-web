import React from 'react';
import { Link } from 'react-router-dom';

const ParadoxCard = ({ title, description, link, image, gradientFrom, gradientTo }) => (
  <div className="relative group h-full transition duration-300 ease-in-out">
    {/* Glow effect */}
    <div
      className="absolute -inset-0.5 bg-gradient-to-r rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-300 ease-in-out"
      style={{
        background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo}, ${gradientFrom})`,
      }}
    />
    <div className="relative h-full bg-[#1a1b1e] rounded-lg leading-none overflow-hidden ring-1 ring-white/5 flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-8 flex flex-col flex-1">
        <h3
          className="text-3xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
            WebkitBackgroundClip: 'text',
          }}
        >
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed flex-1">
          {description}
        </p>
        <div className="mt-8">
          <Link
            to={link}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 focus:outline-none w-full"
            style={{
              background: `linear-gradient(45deg, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            <span>Explore Paradox</span>
            <svg
              className="ml-2 -mr-1 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const paradoxes = [
    {
      title: "Monty Hall Problem",
      description: "A classic probability puzzle that challenges your intuition. Should you switch doors when given the chance? Through this interactive simulation, discover why the mathematically optimal choice might surprise you, and learn how probability isn't always what it seems.",
      link: "/monty-hall",
      image: "/assets/monty-hall-preview.webp",
      gradientFrom: "#60A5FA",
      gradientTo: "#2563EB"
    },
    {
      title: "Sleeping Beauty Paradox (React)",
      description: "Dive into a fascinating thought experiment that blends probability with consciousness. When Beauty awakens, what should she believe about a coin flip that determines her awakenings? Experience this mind-bending paradox through an immersive interactive journey.",
      link: "/sleeping-beauty",
      image: "/assets/sleeping-beauty-preview.webp",
      gradientFrom: "#A78BFA",
      gradientTo: "#7C3AED"
    },
    {
      title: "Sleeping Beauty Paradox (Svelte)",
      description: "The Svelte version of our interactive Sleeping Beauty Paradox experience. Offering the same immersive journey through this fascinating thought experiment with a different technical implementation.",
      link: "/sleeping-beauty-svelte",
      image: "/assets/sleeping-beauty-preview.webp",
      gradientFrom: "#FF3E00",
      gradientTo: "#FF8C00"
    },
    {
      title: "Bertrand's Paradox",
      description: "Explore how different interpretations of 'random' can lead to different probabilities. Through an interactive geometric visualization, discover why choosing a random chord in a circle isn't as straightforward as it seems.",
      link: "/bertrand",
      image: "/assets/bertrand-preview.webp",
      gradientFrom: "#34D399",
      gradientTo: "#059669"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0E12]">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-6xl py-12">
          <div className="text-center mb-16">
            <h1 className="relative text-5xl font-bold tracking-tight text-white mb-6">
              Interactive Probability Paradoxes
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            {paradoxes.map((paradox, index) => (
              <ParadoxCard key={index} {...paradox} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;