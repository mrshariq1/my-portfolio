import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>

        <div
          style={{
            fontSize: "130px",
            fontWeight: "900",
            color: "#00ff88",
            lineHeight: "1",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "32px",
            margin: "20px 0 10px",
          }}
        >
          PAGE NOT FOUND
        </h1>

        <p
          style={{
            color: "#888",
            fontSize: "15px",
            marginBottom: "30px",
          }}
        >
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "13px 25px",
            background: "#00ff88",
            color: "#050505",
            textDecoration: "none",
            borderRadius: "7px",
            fontWeight: "700",
          }}
        >
          ← BACK TO HOME
        </Link>

      </div>
    </div>
  );
}

export default NotFound;