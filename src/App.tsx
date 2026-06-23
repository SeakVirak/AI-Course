import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Menu,
  PlayCircle,
  Rocket,
  UserPlus,
  X
} from "lucide-react";
import { courses, schedule } from "./courseData";

type Course = {
  id: string;
  title: string;
  level: string;
  tag: string;
  duration: string;
  price: string;
  description: string;
  image: string;
};

type Enrollment = {
  name: string;
  email: string;
  course: string;
};

const filters = [
  { label: "All", value: "all" },
  { label: "Beginner", value: "beginner" },
  { label: "Projects", value: "project" },
  { label: "Advanced", value: "advanced" }
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [progress, setProgress] = useState(68);
  const [enrollment, setEnrollment] = useState<Enrollment>({
    name: "",
    email: "",
    course: ""
  });
  const [message, setMessage] = useState("");

  const filteredCourses = useMemo(() => {
    return filter === "all"
      ? (courses as Course[])
      : (courses as Course[]).filter((course) => course.level === filter);
  }, [filter]);

  function updateEnrollment(field: keyof Enrollment, value: string) {
    setEnrollment((current) => ({ ...current, [field]: value }));
  }

  function submitEnrollment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(`Thanks, ${enrollment.name}. Your ${enrollment.course} enrollment is ready.`);
    setEnrollment({ name: "", email: "", course: "" });
  }

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="AI Course Online home">
          <span className="brandMark">AI</span>
          <span>Course Online</span>
        </a>
        <button
          className="menuButton"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "navLinks open" : "navLinks"} aria-label="Main navigation">
          <a href="#courses" onClick={() => setMenuOpen(false)}>Courses</a>
          <a href="#path" onClick={() => setMenuOpen(false)}>Learning Path</a>
          <a href="#schedule" onClick={() => setMenuOpen(false)}>Schedule</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        </nav>
        <a className="topbarAction" href="#enroll">Enroll Now</a>
      </header>

      <main id="home">
        <section className="hero">
          <div className="heroPanel">
            <p className="eyebrow">Node.js + React + TSX front end</p>
            <h1>Learn AI online with projects, progress, and live support.</h1>
            <p className="heroCopy">
              A full-stack-ready front end for an online AI course platform, built with React,
              TypeScript, JSX-style components, and reusable JavaScript data.
            </p>
            <div className="heroActions">
              <a className="button primary" href="#courses">
                <BookOpen size={18} />
                Browse Courses
              </a>
              <a className="button secondary" href="#dashboard">
                <PlayCircle size={18} />
                View Dashboard
              </a>
            </div>
          </div>
          <div className="heroVisual" aria-label="Course dashboard preview">
            <div className="previewWindow">
              <div className="previewHeader">
                <GraduationCap size={22} />
                <span>Student progress</span>
              </div>
              {["Machine Learning", "Neural Networks", "Python Projects"].map((title, index) => {
                const values = [82, 46, 68];
                return (
                  <article className="previewItem" key={title}>
                    <strong>{title}</strong>
                    <span>{values[index]}% complete</span>
                    <div className="meter">
                      <i style={{ width: `${values[index]}%` }} />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="stats" aria-label="Platform statistics">
          <Stat value="24" label="Project lessons" />
          <Stat value="8" label="Course modules" />
          <Stat value="1:1" label="Mentor support" />
          <Stat value="100%" label="Responsive UI" />
        </section>

        <section className="section" id="courses">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Course catalog</p>
              <h2>Choose your next AI skill.</h2>
            </div>
            <div className="toolbar" aria-label="Course filters">
              {filters.map((item) => (
                <button
                  className={filter === item.value ? "filter active" : "filter"}
                  type="button"
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="courseGrid">
            {filteredCourses.map((course) => (
              <article className="courseCard" key={course.id}>
                <div className="courseMedia" style={{ backgroundImage: `url(${course.image})` }} />
                <div className="courseBody">
                  <span className="badge">{course.tag}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <div className="cardFooter">
                    <span>{course.duration}</span>
                    <strong>{course.price}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="splitSection" id="path">
          <div>
            <p className="eyebrow">Learning path</p>
            <h2>From first lesson to finished portfolio.</h2>
            <p>
              Students move through short lessons, guided practice, project checkpoints,
              and final presentation materials.
            </p>
          </div>
          <ol className="timeline">
            <Step number="01" title="Start" text="Pick a module and set your study goal." />
            <Step number="02" title="Practice" text="Complete labs with instant progress feedback." />
            <Step number="03" title="Build" text="Create portfolio-ready AI projects." />
            <Step number="04" title="Share" text="Export your certificate and project summary." />
          </ol>
        </section>

        <section className="section dashboard" id="dashboard">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Student dashboard</p>
              <h2>Track learning without clutter.</h2>
            </div>
          </div>
          <div className="dashboardGrid">
            <article className="progressCard">
              <span>Current progress</span>
              <strong>{progress}%</strong>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                aria-label="Progress percentage"
                onChange={(event) => setProgress(Number(event.target.value))}
              />
            </article>
            <article className="taskCard">
              <h3>Today</h3>
              <label><input type="checkbox" defaultChecked /> Watch lesson 04</label>
              <label><input type="checkbox" /> Upload notebook</label>
              <label><input type="checkbox" /> Join mentor call</label>
            </article>
            <article className="taskCard">
              <h3>Skills</h3>
              <Skill name="Python" value={86} />
              <Skill name="Data" value={64} />
              <Skill name="Models" value={52} />
            </article>
          </div>
        </section>

        <section className="splitSection" id="schedule">
          <div>
            <p className="eyebrow">Weekly schedule</p>
            <h2>Live classes and self-paced work.</h2>
            <p>The schedule section gives students a quick view of what is coming next.</p>
          </div>
          <div className="scheduleList">
            {schedule.map((item) => (
              <div key={`${item.day}-${item.title}`}>
                <span>{item.day}</span>
                <strong>{item.title}</strong>
                <small>{item.time}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section pricing" id="pricing">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Pricing</p>
              <h2>Simple plans for online learning.</h2>
            </div>
          </div>
          <div className="pricingGrid">
            <Plan title="Starter" price="$49" text="Core lessons, quizzes, and progress tracking." />
            <Plan title="Project Pro" price="$99" text="Mentor review, projects, and certificates." featured />
            <Plan title="Team" price="$249" text="Group learning, shared reports, and private sessions." />
          </div>
        </section>

        <section className="enroll" id="enroll">
          <div>
            <p className="eyebrow">Enrollment</p>
            <h2>Reserve your online seat.</h2>
          </div>
          <form onSubmit={submitEnrollment}>
            <label>
              Full name
              <input
                type="text"
                value={enrollment.name}
                placeholder="Your name"
                required
                onChange={(event) => updateEnrollment("name", event.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={enrollment.email}
                placeholder="you@example.com"
                required
                onChange={(event) => updateEnrollment("email", event.target.value)}
              />
            </label>
            <label>
              Course
              <select
                value={enrollment.course}
                required
                onChange={(event) => updateEnrollment("course", event.target.value)}
              >
                <option value="">Select a course</option>
                {(courses as Course[]).map((course) => (
                  <option key={course.id}>{course.title}</option>
                ))}
              </select>
            </label>
            <button className="button primary" type="submit">
              <UserPlus size={18} />
              Submit Enrollment
            </button>
            <p className="formMessage" role="status">{message}</p>
          </form>
        </section>
      </main>

      <footer>
        <span>AI Course Online</span>
        <span>Built with Node.js, React, TSX, JSX patterns, and JS modules.</span>
      </footer>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Step({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <li>
      <span>{number}</span>
      <strong>{title}</strong>
      <p>{text}</p>
    </li>
  );
}

function Skill({ name, value }: { name: string; value: number }) {
  return (
    <div className="skillRow">
      <span>{name}</span>
      <div className="meter">
        <i style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Plan({ title, price, text, featured = false }: {
  title: string;
  price: string;
  text: string;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "featured" : ""}>
      {featured ? <Rocket size={24} /> : <CheckCircle2 size={24} />}
      <h3>{title}</h3>
      <strong>{price}</strong>
      <p>{text}</p>
      <a className={featured ? "button primary" : "button secondary"} href="#enroll">
        <CalendarDays size={18} />
        Choose Plan
      </a>
    </article>
  );
}
