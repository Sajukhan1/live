// app/page.js

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
        📺 Video Restriction Manager
      </h1>
      <div id="video-list">Loading videos...</div>

      {/* JS Script to handle fetch and display */}
      <script src="/cms.js"></script>
    </main>
  );
}
