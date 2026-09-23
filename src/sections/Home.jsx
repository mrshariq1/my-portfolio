import "./Home.css";
import "../components/footer.css";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState("");
    const [sending, setSending] = useState(false);
    
    const projectsRef = useRef(null);
    const autoScrollRef = useRef(null);

    const scrollProjects = (direction) => {
        if (projectsRef.current) {
            const scrollAmount = 350;
            projectsRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    const triggerAutoScroll = () => {
        if (projectsRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = projectsRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 10) {
                projectsRef.current.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                projectsRef.current.scrollBy({ left: 350, behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            autoScrollRef.current = setInterval(triggerAutoScroll, 3000);
        }, 1500);

        return () => {
            clearTimeout(timer);
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
        };
    }, []);

    const pauseAutoScroll = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
        }
    };

    const resumeAutoScroll = () => {
        if (autoScrollRef.current) clearInterval(autoScrollRef.current);
        autoScrollRef.current = setInterval(triggerAutoScroll, 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() ||
            !formData.email.trim() ||
            !formData.subject.trim() ||
            !formData.message.trim()) {
            setStatus("Please fill all fields ❌");
            return;
        }

        setSending(true);
        setStatus("");

        try {
            const response = await fetch("https://my-portfolio-git-main-mrshariq1.vercel.app/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send message");
            }

            if (data.success) {
                setStatus("Message sent successfully! ✅");
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                setStatus(data.message || "Something went wrong ❌");
            }

        } catch (error) {
            console.error("Contact form error:", error);
            setStatus("Unable to send message. Please try again later ❌");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="home-page">
            <section id="home" className="hero-section">
                <div className="hero-content">
                    <p className="hero-small">WELCOME TO MY PORTFOLIO</p>
                    <h1 className="hero-title">
                        Hey, I'm <span>Shariq</span>
                    </h1>
                    <h2 className="hero-role"> <span className="type-text">MERN STACK <span>DEVELOPER</span></span></h2>
                    <p className="hero-statment">
                        I build modern, scalable and user-friendly
                        web applications that turn ideas into reality.
                    </p>
                    <div className="two-btn">
                        <a href="#projects"> <button className="view-projects">
                            View Projects ↗
                        </button></a>
                       <a href="#contact"> <button className="lets-talk">
                            Let's Talk
                        </button></a>
                    </div>
                    <div className="hero-stats">
                        <div>
                            <h3>05+</h3>
                            <p>Projects</p>
                        </div>
                        <div>
                            <h3>1+</h3>
                            <p>Years Learning</p>
                        </div>
                        <div>
                            <h3>100%</h3>
                            <p>Passion</p>
                        </div>
                    </div>
                </div>

                <div className="hero-image">
                    <div className="image-glow"></div>
                    <img
                        src="image.png"
                        alt="Shariq"
                    />
                    <div className="available">
                        <span></span>
                        Available for work
                    </div>
                </div>
            </section>

            <section id="skills" className="tech-stack">
                <p className="section-label">MY SKILLS</p>
                <h2 className="t-heading">
                    MY <span>EXPERTISE</span>
                </h2>
                <p className="t-des">
                    Technologies and tools I use to build modern web experiences.
                </p>
                <div className="expertise-cards">
                    <div className="skill-card">
                        <h3>React.js</h3>
                        <p>Building fast and interactive user interfaces.</p>
                    </div>
                    <div className="skill-card">
                        <h3>JavaScript</h3>
                        <p>Creating dynamic and functional web experiences.</p>
                    </div>
                    <div className="skill-card">
                        <h3>Node.js</h3>
                        <p>Building scalable server-side applications.</p>
                    </div>
                    <div className="skill-card">
                        <h3>Express.js</h3>
                        <p>Developing fast and efficient REST APIs.</p>
                    </div>
                    <div className="skill-card">
                        <h3>MongoDB</h3>
                        <p>Managing flexible and scalable databases.</p>
                    </div>
                    <div className="skill-card">
                        <h3>Git & GitHub</h3>
                        <p>Managing code and version control.</p>
                    </div>
                </div>
            </section>

            <section id="about" className="about-me">
                <div className="about-content">
                    <p className="section-label">GET TO KNOW ME</p>
                    <h2 className="about-heading">
                        About <span>Me</span>
                    </h2>
                    <p className="about-statment">
                        I'm Muhammad Shariq, a
                        <span> MERN Stack Developer </span>
                        passionate about building fast, scalable and
                        user-friendly web applications.
                    </p>
                    <p className="about-statment">
                        I work with
                        <strong> MongoDB, Express.js, React.js </strong>
                        and
                        <strong> Node.js </strong>
                        to transform ideas into complete full-stack
                        products that solve real problems.
                    </p>
                    <button className="read-morebtn">
                        Read More ↗
                    </button>
                </div>
                <div className="about-image-wrapper">
                    <div className="about-image-glow"></div>
                    <img
                        src="image.png"
                        alt="Shariq"
                    />
                </div>
            </section>

            {/* === PROJECTS-SECTION ======================= */}
            <section id="projects" className="projects-section">
                <div className="projects-header">
                    <p className="section-label">
                        MY WORK
                    </p>
                    <h2 className="projects-heading">
                        FEATURED <span>PROJECTS</span>
                    </h2>
                    <p className="projects-description">
                        A selection of actual projects I've built and deployed.
                    </p>
                </div>

                <div className="projects-slider-wrapper">
                    <button
                        type="button"
                        className="project-arrow project-arrow-left"
                        onClick={() => scrollProjects("left")}
                        aria-label="Previous projects">
                        &lt;
                    </button>

                    <div
                        className="projects-container"
                        ref={projectsRef}
                        onMouseEnter={pauseAutoScroll}
                        onMouseLeave={resumeAutoScroll}
                    >
                        {/* ================= PROJECT 01 ================= */}
                        <article className="project-card">
                            <div className="project-image">
                                <img src="/pro1-image.png" alt="Easy Converter Tool" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="project-overlay">
                                    <span>VIEW PROJECT</span>
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">01</span>
                                    <span className="project-category">WEB APP</span>
                                </div>
                                <h3>Easy Converter Tool</h3>
                                <p>
                                    A fast and user-friendly online file and format conversion platform.
                                </p>
                                <div className="project-tech">
                                    <span>HTML</span>
                                    <span>CSS</span>
                                    <span>JavaScript</span>
                                </div>
                                <div className="project-links">
                                    <a href="https://github.com/mrshariq1/easyconvertertool" target="_blank" rel="noreferrer" className="github-btn">
                                        GitHub <span>↗</span>
                                    </a>
                                    <a href="https://easyconvertertool.netlify.app/" target="_blank" rel="noreferrer" className="live-btn">
                                        Live Website <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>

                        {/* ================= PROJECT 02 ================= */}
                        <article className="project-card">
                            <div className="project-image">
                                <img src="/pro2-image.png" alt="ToolNova" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="project-overlay">
                                    <span>VIEW PROJECT</span>
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">02</span>
                                    <span className="project-category">FULL-STACK</span>
                                </div>
                                <h3>ToolNova</h3>
                                <p>
                                    A dynamic web suite featuring full-stack tools and serverless integrations.
                                </p>
                                <div className="project-tech">
                                    <span>React</span>
                                    <span>TypeScript</span>
                                    <span>Node.js</span>
                                </div>
                                <div className="project-links">
                                    <a href="https://github.com/mrshariq1/toolnova" target="_blank" rel="noreferrer" className="github-btn">
                                        GitHub <span>↗</span>
                                    </a>
                                    <a href="https://toolnova-three.vercel.app/" target="_blank" rel="noreferrer" className="live-btn">
                                        Live App <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>

                        {/* ================= PROJECT 03 ================= */}
                        <article className="project-card">
                            <div className="project-image">
                                <img src="/pro3-image.jpg" alt="My Portfolio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="project-overlay">
                                    <span>VIEW PROJECT</span>
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">03</span>
                                    <span className="project-category">PORTFOLIO</span>
                                </div>
                                <h3>My Portfolio</h3>
                                <p>
                                    A modern, responsive developer portfolio showcasing interactive design and skills.
                                </p>
                                <div className="project-tech">
                                    <span>React</span>
                                    <span>JavaScript</span>
                                    <span>CSS3</span>
                                </div>
                                <div className="project-links">
                                    <a href="https://github.com/mrshariq1/my-portfolio" target="_blank" rel="noreferrer" className="github-btn">
                                        GitHub <span>↗</span>
                                    </a>
                                    <a href="https://my-portfolio-71.vercel.app/" target="_blank" rel="noreferrer" className="live-btn">
                                        Live Website <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>

                        {/* ================= PROJECT 04 ================= */}
                        <article className="project-card">
                            <div className="project-image">
                                <img src="/pro4-image.png" alt="ShopHub E-Commerce" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="project-overlay">
                                    <span>COMING SOON</span>
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">04</span>
                                    <span className="project-category">E-COMMERCE</span>
                                </div>
                                <h3>ShopHub E-Commerce</h3>
                                <p>
                                    A modern, fast, and secure online shopping platform with advanced product features.
                                </p>
                                <div className="project-tech">
                                    <span>React</span>
                                    <span>Node.js</span>
                                    <span>MongoDB</span>
                                </div>
                                <div className="project-links">
                                    <div className="github-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.65, cursor: 'not-allowed', flex: 1, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', textAlign: 'center' }}>
                                        Locked <span>🔒</span>
                                    </div>
                                    <div className="live-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.65, cursor: 'not-allowed', flex: 1, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)', color: '#00ff88', textAlign: 'center' }}>
                                        Soon <span>🚀</span>
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* ================= PROJECT 05 ================= */}
                        <article className="project-card">
                            <div className="project-image">
                                <img src="/pro5-image.jfif" alt="Ed Manage Student System" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div className="project-overlay">
                                    <span>COMING SOON</span>
                                </div>
                            </div>

                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">05</span>
                                    <span className="project-category">DASHBOARD</span>
                                </div>
                                <h3>Ed Manage Student Portal</h3>
                                <p>
                                    Streamlined student portal system with real-time stats, scheduling, and reports.
                                </p>
                                <div className="project-tech">
                                    <span>React</span>
                                    <span>Express</span>
                                    <span>Tailwind</span>
                                </div>
                                <div className="project-links">
                                    <div className="github-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.65, cursor: 'not-allowed', flex: 1, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', textAlign: 'center' }}>
                                        Locked <span>🔒</span>
                                    </div>
                                    <div className="live-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: 0.65, cursor: 'not-allowed', flex: 1, padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: '500', background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)', color: '#00ff88', textAlign: 'center' }}>
                                        Soon <span>🚀</span>
                                    </div>
                                </div>
                            </div>
                        </article>

                    </div>

                    <button
                        type="button"
                        className="project-arrow project-arrow-right"
                        onClick={() => scrollProjects("right")}
                        aria-label="Next projects">
                        &gt;
                    </button>
                </div>
            </section>

            {/* ======= RESUME-SECTION ======================= */}
            <section className="resume-section">
                <div className="resume-content">
                    <p className="section-label-resume">
                        MY RESUME
                    </p>
                    <h2 className="resume-heading">
                        LET'S BUILD SOMETHING <span>GREAT</span>
                    </h2>
                    <p className="resume-description">
                        Want to know more about my skills, experience and development
                        journey? Download my resume and let's connect.
                    </p>
                    <a
                        href="/my-resume.pdf"
                        download="Shariq-Resume.pdf"
                        className="resume-btn">
                        Download Resume
                        <span>↓</span>
                    </a>
                </div>
            </section>

            {/* ====== CONTACT-SECTION ====== */}
            <section id="contact" className="contact-section">
                <div className="contact-header">
                    <p className="section-label">
                        GET IN TOUCH
                    </p>
                    <h2 className="contact-heading">
                        LET'S <span>WORK TOGETHER</span>
                    </h2>
                    <p className="contact-description">
                        Have a project idea, collaboration opportunity or just
                        want to say hello? I'd love to hear from you.
                    </p>
                </div>

                <div className="contact-container">
                    <div className="contact-info">
                        <span className="contact-small-title">
                            HAVE A PROJECT IN MIND?
                        </span>
                        <h3>
                            Let's build something
                            <span> amazing.</span>
                        </h3>
                        <p>
                            I'm open to freelance projects, collaborations and
                            exciting opportunities. Feel free to reach out
                            through any of the platforms below.
                        </p>
                        <div className="contact-details">
                            <a
                                href="mailto:shariqrx50@gmail.com"
                                className="contact-item">
                                <span className="contact-icon">
                                    ✉
                                </span>
                                <div>
                                    <small>Email</small>
                                    <p>shariqrx50@gmail.com</p>
                                </div>
                            </a>
                            <a
                                href="https://wa.me/923187237129"
                                target="_blank"
                                rel="noreferrer"
                                className="contact-item">
                                <span className="contact-icon">
                                    ☎
                                </span>
                                <div>
                                    <small>WhatsApp</small>
                                    <p>+92 3187237129</p>
                                </div>
                            </a>
                            <div className="contact-item">
                                <span className="contact-icon">
                                    📍
                                </span>
                                <div>
                                    <small>Location</small>
                                    <p>Pakistan</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links">
                            <a href="https://github.com/mrshariq1" target="_blank" rel="noreferrer">
                                GitHub ↗
                            </a>
                            <a href="https://www.linkedin.com/in/mrshariq1" target="_blank" rel="noreferrer">
                                LinkedIn ↗
                            </a>
                            <a href="https://wa.me/923187237129" target="_blank" rel="noreferrer">
                                WhatsApp ↗
                            </a>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="input-row">
                            <div className="input-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label>Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                placeholder="What is this about?"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                rows="6"
                                placeholder="Tell me about your project..."
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="send-message-btn"
                            disabled={sending}
                        >
                            {sending ? "Sending..." : "Send Message"}
                            <span>↗</span>
                        </button>
                        {status && (
                            <p className="form-status" style={{color: status.includes("✅") ? "#00ff88" : "#ff4d4d", marginTop: "10px"}}>
                                {status}
                            </p>
                        )}
                    </form>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="footer">
                <div className="footer-main">
                    <div className="footer-brand">
                        <a href="#home" className="footer-logo">
                            SHARIQ <span>&lt;/&gt;</span>
                        </a>
                        <p>
                            MERN Stack Developer focused on building modern,
                            responsive and user-friendly web applications.
                        </p>
                        <div className="footer-status">
                            <span></span>
                            Available for opportunities
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3>QUICK LINKS</h3>
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#skills">Skills</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div className="footer-column">
                        <h3>SERVICES</h3>
                        <a href="#projects">Web Development</a>
                        <a href="#projects">Frontend Development</a>
                        <a href="#projects">React Development</a>
                        <a href="#projects">MERN Stack</a>
                    </div>

                    <div className="footer-column">
                        <h3>TECHNOLOGIES</h3>
                        <div className="footer-tech">
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JavaScript</span>
                            <span>React</span>
                            <span>Node.js</span>
                            <span>Express</span>
                            <span>MongoDB</span>
                            <span>Git</span>
                        </div>
                    </div>
                </div>

                <div className="footer-middle">
                    <div>
                        <span className="footer-small-title">
                            LET'S CONNECT
                        </span>
                        <p>
                            Have an idea? Let's turn it into reality.
                        </p>
                    </div>
                    <div className="footer-socials">
                        <a href="https://github.com/mrshariq1" target="_blank" rel="noreferrer">
                            GitHub ↗
                        </a>
                        <a href="https://www.linkedin.com/in/mrshariq1" target="_blank" rel="noreferrer">
                            LinkedIn ↗
                        </a>
                        <a
                            href="/my-resume.pdf"
                            download="Shariq-Resume.pdf"
                            className="footer-resume">
                            Download Resume ↓
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>
                        © 2026 <strong>Shariq</strong>. All rights reserved.
                    </p>
                    <p>
                        Built with <span>♥</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}