import { useState, useEffect } from "react";
import "./styles.css";

const SKILLS = [
  { name: "HTML",       pct: 92 },
  { name: "CSS",        pct: 88 },
  { name: "JavaScript", pct: 82 },
  { name: "React",      pct: 80 },
  { name: "Node.js",    pct: 75 },
  { name: "MongoDB",    pct: 72 },
  { name: "MySQL",      pct: 68 },
  { name: "Git",        pct: 85 },
];

const PROJECTS = [
  {
    num: "01",
    title: "AI Career Pathway Recommendation System",
    desc: "AI-powered platform that recommends career paths to students based on their skills and interests using intelligent matching algorithms.",
    tech: ["React", "Node.js", "MongoDB", "AI/ML"],
    github: "https://github.com/Lalittesh",
  },
  {
    num: "02",
    title: "Facebook Signup Page Clone",
    desc: "A pixel-perfect, responsive Facebook signup page recreated using semantic HTML and modern CSS, demonstrating precision UI skills.",
    tech: ["HTML", "CSS"],
    github: "https://github.com/Lalittesh",
  },
  {
    num: "03",
    title: "Second Serve – Food Donation Platform",
    desc: "Full-stack platform that bridges restaurants and NGOs, enabling seamless donation of surplus food to reduce waste and help communities.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Lalittesh",
  },
];

const TYPING_WORDS = ["MERN Stack Developer", "React Developer", "Full Stack Developer"];

function useTyping(words) {
  const [display, setDisplay]   = useState("");
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause]       = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1600);
      return () => clearTimeout(t);
    }
    const word = words[wordIdx];
    if (!deleting) {
      if (charIdx < word.length) {
        const t = setTimeout(() => {
          setDisplay(word.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        }, 72);
        return () => clearTimeout(t);
      } else {
        setPause(true);
        setDeleting(true);
      }
    } else {
      if (charIdx > 0) {
        const t = setTimeout(() => {
          setDisplay(word.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        }, 38);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }
  }, [charIdx, deleting, pause, wordIdx, words]);

  return display;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useSkillFill() {
  useEffect(() => {
    const fills = document.querySelectorAll(".progress-fill[data-pct]");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.pct + "%";
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.3 }
    );
    fills.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Portfolio() {
  const typed    = useTyping(TYPING_WORDS);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  useSkillFill();

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* animated mesh bg */}
      <div className="mesh-bg"><div className="mesh-orb" /></div>
      <div className="noise" />

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="#home" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo("home"); }}>
          LK<span>.</span>
        </a>
        <ul className="nav-links">
          {["home","about","skills","projects","contact"].map(s => (
            <li key={s}>
              <a href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {["home","about","skills","projects","contact"].map(s => (
          <a key={s} href={`#${s}`} onClick={e => { e.preventDefault(); scrollTo(s); }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </a>
        ))}
      </div>

      <div className="site">

        {/* ── HERO ── */}
        <section id="home" className="hero section">
          <div className="container">
            <div className="hero-inner">
              <div>
                <div className="hero-tag reveal">Available for Work</div>
                <h1 className="hero-name reveal">
                  Hi, I'm<br /><span className="teal">Lalittesh Kumar</span>
                </h1>
                <div className="hero-typing-wrap reveal reveal-delay-1">
                  <span className="hero-typing">{typed}</span>
                  <span className="cursor" />
                </div>
                <p className="hero-bio reveal reveal-delay-2">
                  I build modern web applications using React, Node.js and MongoDB.
                  Passionate about creating clean user experiences and solving
                  real-world problems with technology.
                </p>
                <div className="btn-row reveal reveal-delay-3">
                  <button className="btn-primary" onClick={() => scrollTo("projects")}>
                    View Projects →
                  </button>
                  <a className="btn-outline" href="/resume.pdf" download="Lalittesh_Kumar_Resume.pdf">
                    ↓ Download Resume
                  </a>
                </div>
              </div>

              <div className="hero-visual reveal reveal-delay-2">
                <div className="hero-card">
                  <div className="hc-label">Currently Based In</div>
                  <div className="hc-value">📍 Madurai, Tamil Nadu</div>
                  <div className="hc-sub">India</div>
                </div>
                <div className="hero-card">
                  <div className="hc-label">Primary Stack</div>
                  <div className="hc-value">MERN Stack</div>
                  <div className="hc-sub">MongoDB · Express · React · Node.js</div>
                </div>
                <div className="hero-stats">
                  {[
                    { num: "3+",   lbl: "Projects Built" },
                    { num: "8+",   lbl: "Tech Skills"    },
                    { num: "CSE",  lbl: "Student"        },
                    { num: "100%", lbl: "Dedication"     },
                  ].map(s => (
                    <div className="stat-box" key={s.lbl}>
                      <div className="stat-num">{s.num}</div>
                      <div className="stat-lbl">{s.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-eyebrow">// about me</div>
              <h2 className="sec-title">Who I Am</h2>
              <div className="sec-line" />
            </div>
            <div className="about-grid">
              <div className="about-card reveal">
                <p className="about-text">
                  I am a <strong>Computer Science and Engineering student</strong> passionate
                  about full-stack web development and building modern, scalable applications.
                  I enjoy learning new technologies and developing{" "}
                  <strong>responsive, user-friendly digital products</strong> that make a real impact.
                  <br /><br />
                  My journey in web development started with curiosity and has grown into a
                  deep passion for crafting seamless user experiences. I believe great software
                  is built at the intersection of{" "}
                  <strong>clean code and thoughtful design</strong>.
                </p>
              </div>
              <div className="about-details reveal reveal-delay-1">
                {[
                  { icon: "📧", label: "Email",    val: "lalitteshkumar2006@gmail.com"        },
                  { icon: "📱", label: "Phone",    val: "+91 9345819147"                      },
                  { icon: "📍", label: "Location", val: "Madurai, Tamil Nadu, India"          },
                  { icon: "🎓", label: "Degree",   val: "B.E. Computer Science & Engineering" },
                  { icon: "💡", label: "Interests",val: "Full-Stack Dev · AI · Open Source"  },
                ].map(d => (
                  <div className="detail-row" key={d.label}>
                    <span className="detail-icon">{d.icon}</span>
                    <div>
                      <div className="detail-label">{d.label}</div>
                      <div className="detail-val">{d.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-eyebrow">// technical skills</div>
              <h2 className="sec-title">What I Know</h2>
              <div className="sec-line" />
            </div>
            <div className="skills-grid">
              {SKILLS.map((sk, i) => (
                <div className={`skill-item reveal reveal-delay-${(i % 4) + 1}`} key={sk.name}>
                  <div className="skill-top">
                    <span className="skill-name">{sk.name}</span>
                    <span className="skill-pct">{sk.pct}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" data-pct={sk.pct} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-eyebrow">// my work</div>
              <h2 className="sec-title">Projects</h2>
              <div className="sec-line" />
            </div>
            <div className="projects-grid">
              {PROJECTS.map((p, i) => (
                <div className={`project-card reveal reveal-delay-${i + 1}`} key={p.num}>
                  <div className="project-num">Project {p.num}</div>
                  <div className="project-title">{p.title}</div>
                  <p className="project-desc">{p.desc}</p>
                  <div className="tech-pills">
                    {p.tech.map(t => <span className="tech-pill" key={t}>{t}</span>)}
                  </div>
                  <div className="project-footer">
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn-primary btn-sm">
                      GitHub →
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline btn-sm">
                      Live Demo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section">
          <div className="container">
            <div className="sec-header reveal">
              <div className="sec-eyebrow">// get in touch</div>
              <h2 className="sec-title">Contact Me</h2>
              <div className="sec-line" />
            </div>
            <div className="contact-grid">
              <div className="contact-card reveal">
                <h3 className="contact-title">Let's talk 👋</h3>
                <p className="contact-sub">
                  I'm currently open to new opportunities. Whether you have a project
                  in mind, a role to discuss, or just want to connect — my inbox is always open.
                </p>
                <div className="contact-items">
                  <a href="mailto:lalitteshkumar2006@gmail.com" className="contact-item">
                    <span className="contact-item-icon">📧</span>
                    <div>
                      <div className="contact-item-label">Email</div>
                      <div className="contact-item-val">lalitteshkumar2006@gmail.com</div>
                    </div>
                  </a>
                  <a href="tel:+919345819147" className="contact-item">
                    <span className="contact-item-icon">📱</span>
                    <div>
                      <div className="contact-item-label">Phone</div>
                      <div className="contact-item-val">+91 9345819147</div>
                    </div>
                  </a>
                  <div className="contact-item">
                    <span className="contact-item-icon">📍</span>
                    <div>
                      <div className="contact-item-label">Location</div>
                      <div className="contact-item-val">Madurai, Tamil Nadu, India</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="social-card reveal reveal-delay-1">
                <div className="github-big">⬡</div>
                <h3>Check out my GitHub</h3>
                <p>Explore my repositories, contributions, and open-source work.</p>
                <a href="https://github.com/Lalittesh" target="_blank" rel="noreferrer" className="btn-primary">
                  Visit GitHub →
                </a>
                <a href="mailto:lalitteshkumar2006@gmail.com" className="btn-outline">
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <span className="footer-brand">LK<span>.</span></span>
          <span>Designed &amp; built by <strong style={{ color: "#F0F4FF" }}>Lalittesh Kumar</strong></span>
          <span>© {new Date().getFullYear()} · Madurai, India</span>
        </footer>

      </div>
    </>
  );
}
