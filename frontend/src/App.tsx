import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";

type EventCategory = "Conflict" | "Disaster" | "Weather" | "Infrastructure";
type AtlasEvent = { id:string; title:string; category:EventCategory; region:string; lat:number; lon:number; severity:"High"|"Medium"|"Low"; time:string; summary:string };
const demoEvents: AtlasEvent[] = [
  {id:"EVT-001",title:"Seismic activity — eastern Mediterranean",category:"Disaster",region:"Eastern Mediterranean",lat:35.9,lon:27.8,severity:"Medium",time:"Demo · 12 min ago",summary:"Illustrative earthquake marker. Connect a verified seismic feed before treating this as a real event."},
  {id:"EVT-002",title:"Severe weather watch — central United States",category:"Weather",region:"Central United States",lat:36.4,lon:-97.2,severity:"High",time:"Demo · 28 min ago",summary:"Illustrative severe-weather marker. No live warning is being asserted."},
  {id:"EVT-003",title:"Maritime route monitoring area",category:"Infrastructure",region:"Arabian Sea",lat:17.4,lon:64.8,severity:"Low",time:"Demo · 41 min ago",summary:"Example monitoring point for a future public maritime data integration."},
  {id:"EVT-004",title:"Regional security watch area",category:"Conflict",region:"Eastern Europe",lat:49.1,lon:31.2,severity:"Medium",time:"Demo · 55 min ago",summary:"Illustrative watch-area marker only; it is not a report of a current incident."},
  {id:"EVT-005",title:"Tropical weather monitoring area",category:"Weather",region:"Bay of Bengal",lat:15.4,lon:88.1,severity:"Medium",time:"Demo · 1 hr ago",summary:"Example location for a future official meteorological source adapter."}
];
const colors:Record<EventCategory,string>={Conflict:"#f28b82",Disaster:"#f4b860",Weather:"#72b7e5",Infrastructure:"#a78bfa"};
function MapFocus({selected}:{selected:AtlasEvent|null}) { const map=useMap(); useEffect(()=>{ if(selected) map.flyTo([selected.lat,selected.lon],Math.max(map.getZoom(),4),{duration:.8}); },[map,selected?.id]); return null; }
function EventMap({events,selected,onSelect}:{events:AtlasEvent[];selected:AtlasEvent|null;onSelect:(event:AtlasEvent)=>void}) {
  const bounds:LatLngBoundsExpression=[[-58,-175],[78,178]];
  return <MapContainer className="atlas-map" center={[22,12]} zoom={2} minZoom={2} maxZoom={12} maxBounds={bounds} worldCopyJump>
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    <MapFocus selected={selected}/>
    {events.map(event=><CircleMarker key={event.id} center={[event.lat,event.lon]} radius={selected?.id===event.id?10:7} pathOptions={{color:colors[event.category],fillColor:colors[event.category],fillOpacity:.82,weight:selected?.id===event.id?3:1}} eventHandlers={{click:()=>onSelect(event)}}>
      <Popup><strong>{event.title}</strong><br/>{event.region}<br/><small>Demonstration record — not live intelligence</small></Popup>
    </CircleMarker>)}
  </MapContainer>;
}
export default function App() {
  const [category,setCategory]=useState("All"); const [query,setQuery]=useState(""); const [selectedId,setSelectedId]=useState<string|null>("EVT-001"); const [panel,setPanel]=useState<"events"|"sources">("events"); const [apiStatus,setApiStatus]=useState<"checking"|"online"|"offline">("checking");
  useEffect(()=>{let active=true;fetch("http://127.0.0.1:8000/api/v1/health").then(response=>{if(!response.ok) throw new Error("API unavailable");return response.json();}).then(()=>{if(active)setApiStatus("online");}).catch(()=>{if(active)setApiStatus("offline");});return()=>{active=false;};},[]);
  const filtered=useMemo(()=>demoEvents.filter(event=>(category==="All"||event.category===category)&&(!query.trim()||`${event.title} ${event.region} ${event.category}`.toLowerCase().includes(query.trim().toLowerCase()))),[category,query]);
  const selected=selectedId===null?null:(filtered.find(event=>event.id===selectedId)??filtered[0]??null);
  return <main className="app-shell">
    <header className="topbar"><a className="brand" href="/" aria-label="ATLAS home"><span className="brand-mark">A</span><span>ATLAS</span></a><span className="topbar-label">GLOBAL INTELLIGENCE &amp; SITUATIONAL AWARENESS</span><div className="topbar-right"><span className="demo-pill"><i/> DEMONSTRATION MODE</span><span className="version">v0.2.0</span></div></header>
    <section className="workspace-heading"><div><p className="eyebrow">OPERATIONS / GLOBAL VIEW</p><h1>World monitor</h1><p className="subheading">A unified geographic workspace for events, sources and context.</p></div><div className="workspace-meta"><span className="live-dot"/> API {apiStatus.toUpperCase()} · DEMO DATA ONLY <span className="meta-divider">/</span> {filtered.length} MAP RECORDS</div></section>
    <section className="dashboard"><aside className="sidebar">
      <div className="sidebar-tabs"><button className={panel==="events"?"tab active":"tab"} onClick={()=>setPanel("events")}>EVENTS <span>05</span></button><button className={panel==="sources"?"tab active":"tab"} onClick={()=>setPanel("sources")}>SOURCES</button></div>
      {panel==="events"?<><div className="search-wrap"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search events or regions…" aria-label="Search events or regions"/></div>
        <div className="filter-row">{["All","Conflict","Disaster","Weather","Infrastructure"].map(item=><button key={item} className={category===item?"filter active":"filter"} onClick={()=>setCategory(item)}>{item}</button>)}</div>
        <div className="list-label"><span>MONITORING FEED</span><span>{filtered.length} RESULTS</span></div><div className="event-list">{filtered.map(event=><button key={event.id} className={selected?.id===event.id?"event-item selected":"event-item"} onClick={()=>setSelectedId(event.id)}>
          <span className="event-line"><i style={{background:colors[event.category]}}/>{event.category.toUpperCase()}<time>{event.time.replace("Demo · ","")}</time></span><strong>{event.title}</strong><span className="event-region">{event.region}</span><span className={`severity severity-${event.severity.toLowerCase()}`}>{event.severity} priority</span>
        </button>)}{filtered.length===0&&<div className="empty-state">No demonstration records match this filter.</div>}</div>
      </>:<div className="source-panel"><p className="eyebrow">CONNECTOR STATUS</p><h3>No live providers connected</h3><p>ATLAS currently displays local demonstration records only. Provider adapters will be added with provenance, update times and licensing checks.</p>{["News & official alerts","Earthquakes & disasters","Weather services","Aviation & maritime","Public camera feeds"].map(name=><div className="source-row" key={name}><span>{name}</span><b>NOT CONNECTED</b></div>)}</div>}
      <div className="sidebar-foot"><span className="foot-icon">i</span><span>Demo records are illustrative and must not be used for operational decisions.</span></div>
    </aside>
    <section className="map-panel"><div className="map-toolbar"><div><span className="map-kicker">ATLAS EARTH</span><strong>Global event map</strong></div><div className="map-legend"><span><i className="legend-conflict"/>Conflict</span><span><i className="legend-disaster"/>Disaster</span><span><i className="legend-weather"/>Weather</span><span><i className="legend-infra"/>Infrastructure</span></div></div>
      <EventMap events={filtered} selected={selected} onSelect={event=>setSelectedId(event.id)}/><div className="map-attribution">MAP DATA © OPENSTREETMAP CONTRIBUTORS · MARKERS ARE DEMONSTRATION DATA</div>
      {selected&&<div className="detail-card"><div className="detail-top"><span>SELECTED RECORD / {selected.id}</span><button onClick={()=>setSelectedId(null)} aria-label="Clear selection">×</button></div><h3>{selected.title}</h3><p>{selected.summary}</p><div className="detail-tags"><span>{selected.category}</span><span>{selected.region}</span><span>{selected.severity} priority</span></div></div>}
    </section></section>
    <footer className="app-footer"><span>ATLAS / INDEPENDENT GLOBAL MONITORING PROJECT</span><span>PUBLIC &amp; AUTHORISED SOURCES ONLY</span><span>STATUS: FOUNDATION BUILD</span></footer>
  </main>;
}
