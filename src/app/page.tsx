'use client';
import Image from "next/image";
import Link from 'next/link';

export default function HomePage() {

  const skills = [
              "HTML",
              "CSS",
              "JavaScript",
              "python",
              "React",
              "Next.js",
              "Django",
              "Tailwind CSS",
              "Git",
              "GitHub",
            ]


  const projects = [
  {
    title: "software company Website",
    description: "A modern portfolio website built with React and Tailwind CSS.",
    image: "/softiva.png",
    github: "https://github.com/Sahla1138/software-company",
  },
  {
    title: "resturant Website",
    description: "A modern restaurant website built with React and Tailwind CSS.",
    image: "/logo2.png",
    github: "https://github.com/Sahla1138/react-vite-tailwind-website",
  },
  {
    title: "hospital Website",
    description: "A modern hospital website built with python and Django.",
    image: "cityhospital.png",
    github: "https://github.com/yourusername/hospital-website",
  },
];         

const experiences = [
  {
    company: "Raihsoft Technologies",
    role: "Software Developer Intern",
    duration: "2026 - Present",
    description: [
      "Developed web applications using Next.js and React.",
      "Built responsive UI with Tailwind CSS.",
      "Used Git and GitHub for version control."
    ]
  }
];

  return (
    <main className="bg-gray-950 text-white min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-6">
       
<div className="col-span-2 relative flex items-center justify-center">
  <div className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

<Image
  src="/profile .jpeg"
  alt="Profile"
  width={224}
  height={224}
  className="relative rounded-full object-cover border-4 border-cyan-400 animate-pulse"
/>
</div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
         Hi, I&apos;m <span className=" bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Sahla sahanas</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-6">
          Frontend Developer passionate about building modern,
          responsive, and user-friendly web applications.
        </p>

        <div className="flex gap-4">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className=" bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500  text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            View Projects
          </button>

           <Link
  href="/contact"
  className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
>
  Contact Me
</Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
  <div className="max-w-5xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-10">
      About Me
    </h2>

    <div className="bg-gray-900 p-8 rounded-2xl space-y-10">
      {/* About Content */}
      <div>
        <p className="text-gray-300 leading-8">
          I am a web developer specializing in React, Tailwind CSS,
          Next.js, Django, and JavaScript. I enjoy creating clean,
          responsive, and high-performance websites with modern UI.
        </p>
      </div>

      {/* Experience Content */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-white">
          Experience
        </h3>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="border-l-2 border-blue-500 pl-6"
            >
              <h4 className="text-xl font-semibold text-white">
                {exp.role}
              </h4>

              <p className="text-gray-400">
                {exp.company}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                {exp.duration}
              </p>

              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">
            Skills
          </h2>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {skills.map((skill) => (
    <div
      key={skill}
      className="
      bg-slate-900
      border border-cyan-400 
      rounded-2xl
      p-6
      text-center
      hover:-translate-y-3
      hover:border-slate-800
      hover:shadow-lg
      hover:shadow-cyan-500/20
      transition-all duration-300"
    >
      {skill}
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">
            Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
  {projects.map((project) => (
    <div
      key={project.title}
      className="bg-gray-900 rounded-2xl overflow-hidden hover:-translate-y-2
       border border-slate-500
      hover:border-cyan-400
      hover:shadow-lg
      hover:shadow-cyan-500/20
      transition-all duration-300"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">
          {project.title}
        </h3>

        <p className="text-gray-400 mb-4">
          {project.description}
        </p>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300"
        >
          View Project →
        </a>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>

    </main>
  );
}