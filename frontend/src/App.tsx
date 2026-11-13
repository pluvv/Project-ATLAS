const modules = [
  { name: "EARTH", detail: "Global map and geospatial layers", state: "Planned" },
  { name: "INTELLIGENCE", detail: "News, events and source analysis", state: "Planned" },
  { name: "LIVE", detail: "Public and authorized camera feeds", state: "Planned" },
  { name: "TRACK", detail: "Aviation and maritime data", state: "Planned" },
  { name: "SENTINEL", detail: "Incident correlation and alerts", state: "Planned" },
];

export default function App() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="ATLAS home">
          <span className="brand-mark">A</span>
          <span>ATLAS</span>
        </a>
        <span className="topbar-label">GLOBAL INTELLIGENCE PLATFORM</span>
        <span className="system-state"><i /> FOUNDATION</span>
      </header>

      <section className="hero">
        <p className="eyebrow">ONE WORLD. CONNECTED CONTEXT.</p>
        <h1>See the world.<br /><em>Understand what’s happening.</em></h1>
        <p className="intro">
          A unified workspace for global events, trusted information sources,
          geospatial context and public live feeds.
        </p>
        <div className="hero-meta">
          <span>PROJECT ATLAS</span><span>VERSION 0.1.0</span><span>FOUNDATION BUILD</span>
        </div>
      </section>

      <section className="module-section">
        <div className="section-heading">
          <div><p className="eyebrow">PLATFORM MODULES</p><h2>Intelligence, connected.</h2></div>
          <span className="section-count">05 MODULES</span>
        </div>
        <div className="module-grid">
          {modules.map((module, index) => (
            <article className="module-card" key={module.name}>
              <div className="module-card-top"><span className="module-index">0{index + 1}</span><span className="module-state">{module.state}</span></div>
              <h3>{module.name}</h3>
              <p>{module.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <footer><span>ATLAS / INDEPENDENT GLOBAL MONITORING PROJECT</span><span>CAPABILITIES SHIP ONLY WHEN IMPLEMENTED AND VERIFIED</span></footer>
    </main>
  );
}