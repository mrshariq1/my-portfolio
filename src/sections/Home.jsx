import "./Home.css";
import "../components/footer.css";
import { useEffect, useRef, useState } from "react";

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
  const response = await fetch("/api/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(formData)
});

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to send message"
            );
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
            setStatus(
                data.message || "Something went wrong ❌"
            );
        }

    } catch (error) {
        console.error("Contact form error:", error);

        setStatus(
            "Unable to send message. Please try again later ❌"
        );
    } finally {
        setSending(false);
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
                            <h3>10+</h3>
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
                        alt="Shariq - MERN Stack Developer"
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
                    <p className="about-statment">
                        I focus on writing clean code, creating smooth
                        user experiences and continuously improving
                        my development skills.
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
                    <div className="about-image-border"></div>

                </div>
            </section>
            {/* === PROJECTS-SECTION ======================= */}

            <section id="projects" className="projects-section">

                {/* ===== PROJECT HEADER ================= */}

                <div className="projects-header">

                    <p className="section-label">
                        MY WORK
                    </p>

                    <h2 className="projects-heading">
                        FEATURED <span>PROJECTS</span>
                    </h2>

                    <p className="projects-description">
                        A selection of projects I've built using modern web
                        technologies, clean design and real-world development practices.
                    </p>

                </div>

                <div className="projects-slider-wrapper">

                    {/* ===== LEFT ARROW ================= */}
                    <button
                        type="button"
                        className="project-arrow project-arrow-left"
                        onClick={() => scrollProjects("left")}
                        aria-label="Previous projects">
                        &lt;
                    </button>

                    {/* ===== PROJECTS CONTAINER ============ */}

                    <div
                        className="projects-container"
                        ref={projectsRef}

                        onMouseEnter={pauseAutoScroll}
                        onMouseLeave={resumeAutoScroll}

                        onTouchStart={pauseAutoScroll}
                        onTouchEnd={resumeAutoScroll}

                        onFocus={pauseAutoScroll}
                        onBlur={resumeAutoScroll}
                    >
                        {/* =================================
                PROJECT 01
            ================================== */}
                        <article className="project-card">
                            <div className="project-image">
                                <img
                                    src="/projectimage.png"
                                    alt="E-Commerce Website" />
                                <div className="project-overlay">
                                    <span>
                                        VIEW PROJECT
                                    </span>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">
                                        01
                                    </span>
                                    <span className="project-category">
                                        WEB APPLICATION
                                    </span>
                                </div>
                                <h3>
                                    E-Commerce Website
                                </h3>
                                <p>
                                    A modern and responsive e-commerce platform designed
                                    for a smooth shopping experience with clean UI and
                                    scalable frontend architecture.
                                </p>
                                <div className="project-tech">
                                    <span>React</span>
                                    <span>JavaScript</span>
                                    <span>CSS</span>
                                    <span>Responsive</span>
                                </div>
                                <div className="project-links">
                                    <a
                                        href="https://github.com/mrshariq1/ecommerce"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="github-btn">
                                        GitHub
                                        <span>↗</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="live-btn"
                                        onClick={(e) => e.preventDefault()}>
                                        Live Demo
                                        <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>

                        {/* ========PROJECT 02======================= */}
                        <article className="project-card">
                            <div className="project-image">
                                <img
                                    src="/project2-image.jfif"
                                    alt="Student Management System" />
                                <div className="project-overlay">
                                    <span>
                                        VIEW PROJECT
                                    </span>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">
                                        02
                                    </span>
                                    <span className="project-category">
                                        EDUCATION MANAGEMENT
                                    </span>
                                </div>
                                <h3>
                                    Student Management System
                                </h3>
                                <p>
                                    A modern management system for schools and academies
                                    to efficiently manage students, classes, attendance
                                    and academic records in one organized platform.
                                </p>
                                <div className="project-tech">
                                    <span>React</span>
                                    <span>Node.js</span>
                                    <span>Express.js</span>
                                    <span>MongoDB</span>
                                </div>
                                <div className="project-links">
                                    <a
                                        href="https://github.com/yourusername/student-management-system"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="github-btn">
                                        GitHub
                                        <span>↗</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="live-btn"
                                        onClick={(e) => e.preventDefault()}>
                                        Live Demo
                                        <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                        {/* ==========================project-3============ */}
                        <article className="project-card">
                            <div className="project-image">
                                <img
                                    src="/project4-image.jfif"
                                    alt="DineFlow Restaurant Management System" />
                                <div className="project-overlay">
                                    <span>
                                        IN DEVELOPMENT
                                    </span>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">
                                        03
                                    </span>
                                    <span className="project-category">
                                        FULL-STACK SAAS
                                    </span>
                                </div>
                                <h3>
                                    DineFlow
                                </h3>
                                <p>
                                    An advanced restaurant management platform for
                                    managing menus, tables, reservations, orders,
                                    inventory and real-time kitchen operations.
                                </p>
                                <div className="project-tech">

                                    <span>React</span>
                                    <span>Node.js</span>
                                    <span>Express</span>
                                    <span>MongoDB</span>
                                    <span>Socket.io</span>
                                </div>
                                <div className="project-links">
                                    <a
                                        href="#"
                                        className="github-btn"
                                        onClick={(e) => e.preventDefault()}>
                                        GitHub
                                        <span>↗</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="live-btn"
                                        onClick={(e) => e.preventDefault()}>
                                        Coming Soon
                                        <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>

                        {/* ======= PROJECT 04================== */}
                        <article className="project-card">
                            <div className="project-image">
                                <img
                                    src="/project3-image.pnggitg"
                                    alt="Personal Portfolio" />
                                <div className="project-overlay">
                                    <span>
                                        VIEW PROJECT
                                    </span>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">
                                        04
                                    </span>
                                    <span className="project-category">
                                        PORTFOLIO
                                    </span>
                                </div>
                                <h3>
                                    Personal Portfolio
                                </h3>
                                <p>
                                    A professional developer portfolio showcasing my
                                    skills, projects and development journey with a
                                    modern responsive interface.
                                </p>
                                <div className="project-tech">
                                    <span>React</span>
                                    <span>JavaScript</span>
                                    <span>CSS</span>
                                    <span>React Router</span>
                                </div>
                                <div className="project-links">
                                    <a
                                        href="https://github.com/yourusername/portfolio"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="github-btn">
                                        GitHub
                                        <span>↗</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="live-btn"
                                        onClick={(e) => e.preventDefault()}>
                                        Live Demo
                                        <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                        
                        {/* ========== PROJECT 05====================== */}
                        <article className="project-card">
                            <div className="project-image">
                                <img
                                    src="/project5-image.jfif"
                                    alt="Video Downloader Web Application"
                                />
                                <div className="project-overlay">
                                    <span>
                                        IN DEVELOPMENT
                                    </span>
                                </div>
                            </div>
                            <div className="project-content">
                                <div className="project-top">
                                    <span className="project-number">
                                        05
                                    </span>
                                    <span className="project-category">
                                        WEB APPLICATION
                                    </span>
                                </div>
                                <h3>
                                    Video Downloader
                                </h3>
                                <p>
                                    A modern video downloading web application designed
                                    with a clean interface, fast processing and a simple
                                    user-friendly experience.
                                </p>
                                <div className="project-tech">
                                    <span>React</span>
                                    <span>Node.js</span>
                                    <span>Express</span>
                                    <span>API</span>
                                    <span>CSS</span>
                                </div>
                                <div className="project-links">
                                    <a
                                        href="#"
                                        className="github-btn"
                                        onClick={(e) => e.preventDefault()}>
                                        GitHub
                                        <span>↗</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="live-btn"
                                        onClick={(e) => e.preventDefault()}>
                                        Coming Soon
                                        <span>↗</span>
                                    </a>
                                </div>
                            </div>
                        </article>
                    </div>
                    {/* ===== RIGHT ARROW ================= */}
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
                        download
                        className="resume-btn">
                        Download Resume
                        <span>↓</span>
                    </a>
                </div>
            </section>


            {/* ====== CONTACT--SECTION ====-----======= */}

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
                                href="shariqrx50@gmail.com"
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
                                href="https://wa.me/03187237129"
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
                            <a
                                href="https://github.com/mrshariq1"
                                target="_blank"
                                rel="noreferrer">
                                GitHub ↗
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mrshariq1"
                                target="_blank"
                                rel="noreferrer">
                                LinkedIn ↗
                            </a>
                            <a
                                href="https://wa.me/923187237129"
                                target="_blank"
                                rel="noreferrer">
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
                            <p className="form-status">
                                {status}
                            </p>
                        )}
                    </form>
                </div>

            </section>

            {/* -----=========------- */}

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
            <a href="https://github.com/" target="_blank" rel="noreferrer">
                GitHub ↗
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
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
            Built with <span>♥</span> and code.
        </p>
        <a href="#home" className="back-top">
            Back to top ↑
        </a>
    </div>
</footer>


        </div>
    );
}

export default Home;

