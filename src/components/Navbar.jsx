import "./Navbar.css"
function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="brand-logo">
        <span className="brand-name">SHARIQ</span>
        <span className="code-icon">&lt;/&gt;</span></a>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#skills">Skills</a>
        <a href="#about">About</a>
        < a className="project-link" href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;