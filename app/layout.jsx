import "./globals.css";

export const metadata = {
  title: "Enterprise AI Maturity Assessment",
  description:
    "Discover your organization's AI maturity stage with our comprehensive 30-question assessment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* GLOBAL HEADER */}
        <header
          style={{
            backgroundColor: "#1a1a2e",
            color: "white",
            padding: "1.5rem 1.5rem",
            textAlign: "center",
            borderBottom: "1px solid #333",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "1.8rem",
              margin: 0,
              color: "white",
            }}
          >
            Enterprise AI Maturity Assessment
          </h1>
        </header>

        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <main style={{ flex: 1 }}>{children}</main>
          <footer
            style={{
              backgroundColor: "#E8E5DD",
              padding: "2rem",
              textAlign: "center",
              borderTop: "1px solid #ddd",
              marginTop: "3rem",
            }}
          >
            <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "#666" }}>
              © 2026{" "}
              <a href="https://www.linkedin.com/in/mariyabreyter/" target="_blank" rel="noopener noreferrer" style={{ color: "#666", textDecoration: "underline" }}>
                Mariya Breyter, Ph.D.
              </a>{" "}
              All rights reserved.
            </p>
            <p style={{ margin: 0, fontSize: "0.9rem" }}>
              <a
                href="https://linkedin.com/in/mariyabreyter"
                style={{ color: "#1a5276", textDecoration: "none" }}
              >
                linkedin.com/in/mariyabreyter
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
