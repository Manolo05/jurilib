import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// JURILIB — Plateforme de rendez-vous pour avocats
// Design luxe noir / or — Inspiré Doctolib
// ═══════════════════════════════════════════════════════════════

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8D48B";
const GOLD_DARK = "#A07C2A";
const BG_DARK = "#0A0A0F";
const BG_CARD = "#13131A";
const BG_CARD_HOVER = "#1A1A24";
const BORDER = "#2A2A35";
const TEXT = "#E8E6E1";
const TEXT_MUTED = "#8A8A95";
const SUCCESS = "#2ECC71";
const DANGER = "#E74C3C";

const SPECIALTIES = [
  { id: "all", label: "Toutes spécialités", icon: "⚖️" },
  { id: "famille", label: "Droit de la famille", icon: "👨‍👩‍👧‍👦" },
  { id: "penal", label: "Droit pénal", icon: "🔒" },
  { id: "travail", label: "Droit du travail", icon: "💼" },
  { id: "immobilier", label: "Droit immobilier", icon: "🏠" },
  { id: "affaires", label: "Droit des affaires", icon: "📊" },
  { id: "fiscal", label: "Droit fiscal", icon: "📋" },
  { id: "numerique", label: "Droit du numérique", icon: "🖥️" },
  { id: "propriete", label: "Propriété intellectuelle", icon: "💡" },
];

const CITIES = ["Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Nantes", "Strasbourg", "Lille", "Nice", "Montpellier"];

const CONSULT_TYPES = ["Cabinet", "Visio", "Téléphone"];

const LAWYERS = [
  { id: 1, name: "Maître Sophie Durand", specialty: "famille", city: "Paris", address: "42 Av. des Champs-Élysées, 75008", rating: 4.9, reviews: 234, price: 150, experience: 18, barreau: "Paris", languages: ["Français", "Anglais"], bio: "Spécialisée en droit de la famille depuis 18 ans. Divorce, garde d'enfants, succession et médiation familiale.", consultTypes: ["Cabinet", "Visio"], initials: "SD" },
  { id: 2, name: "Maître Jean-Pierre Martin", specialty: "penal", city: "Paris", address: "15 Rue du Fg Saint-Honoré, 75008", rating: 4.8, reviews: 189, price: 200, experience: 25, barreau: "Paris", languages: ["Français", "Anglais", "Espagnol"], bio: "Ancien bâtonnier adjoint. Défense pénale, droit pénal des affaires, gardes à vue et comparutions immédiates.", consultTypes: ["Cabinet", "Visio", "Téléphone"], initials: "JM" },
  { id: 3, name: "Maître Claire Lefèvre", specialty: "travail", city: "Lyon", address: "28 Rue de la République, 69002", rating: 4.7, reviews: 156, price: 120, experience: 12, barreau: "Lyon", languages: ["Français"], bio: "Licenciement abusif, harcèlement moral, négociation de rupture conventionnelle et contentieux prud'homal.", consultTypes: ["Cabinet", "Visio"], initials: "CL" },
  { id: 4, name: "Maître Alexandre Moreau", specialty: "immobilier", city: "Bordeaux", address: "8 Place de la Bourse, 33000", rating: 4.9, reviews: 312, price: 180, experience: 20, barreau: "Bordeaux", languages: ["Français", "Anglais"], bio: "Transactions immobilières, baux commerciaux, copropriété, construction et vices cachés.", consultTypes: ["Cabinet"], initials: "AM" },
  { id: 5, name: "Maître Nadia Benali", specialty: "affaires", city: "Paris", address: "1 Rue de Rivoli, 75001", rating: 4.6, reviews: 98, price: 250, experience: 15, barreau: "Paris", languages: ["Français", "Arabe", "Anglais"], bio: "Création d'entreprise, contrats commerciaux, fusions-acquisitions et restructurations.", consultTypes: ["Cabinet", "Visio", "Téléphone"], initials: "NB" },
  { id: 6, name: "Maître François Petit", specialty: "fiscal", city: "Marseille", address: "22 Cours Pierre Puget, 13006", rating: 4.8, reviews: 167, price: 175, experience: 22, barreau: "Marseille", languages: ["Français", "Italien"], bio: "Optimisation fiscale, contrôle fiscal, fiscalité internationale des entreprises et des particuliers.", consultTypes: ["Cabinet", "Visio"], initials: "FP" },
  { id: 7, name: "Maître Émilie Rousseau", specialty: "famille", city: "Toulouse", address: "5 Place du Capitole, 31000", rating: 4.9, reviews: 278, price: 130, experience: 14, barreau: "Toulouse", languages: ["Français"], bio: "Médiation familiale, divorce amiable, protection de l'enfance et adoption internationale.", consultTypes: ["Cabinet", "Visio", "Téléphone"], initials: "ER" },
  { id: 8, name: "Maître Lucas Bernard", specialty: "numerique", city: "Nantes", address: "12 Rue Crébillon, 44000", rating: 4.7, reviews: 89, price: 160, experience: 8, barreau: "Nantes", languages: ["Français", "Anglais"], bio: "RGPD, e-commerce, contrats SaaS, cybersécurité juridique et propriété intellectuelle numérique.", consultTypes: ["Cabinet", "Visio"], initials: "LB" },
  { id: 9, name: "Maître Isabelle Garnier", specialty: "propriete", city: "Lyon", address: "3 Place Bellecour, 69002", rating: 4.8, reviews: 145, price: 190, experience: 16, barreau: "Lyon", languages: ["Français", "Allemand"], bio: "Brevets, marques, droits d'auteur, contrefaçon et licences de propriété intellectuelle.", consultTypes: ["Cabinet", "Visio"], initials: "IG" },
  { id: 10, name: "Maître Omar Diallo", specialty: "penal", city: "Marseille", address: "45 La Canebière, 13001", rating: 4.5, reviews: 76, price: 140, experience: 10, barreau: "Marseille", languages: ["Français", "Wolof", "Anglais"], bio: "Défense pénale générale, droit des étrangers, violences conjugales et aide juridictionnelle.", consultTypes: ["Cabinet", "Téléphone"], initials: "OD" },
  { id: 11, name: "Maître Camille Dupont", specialty: "travail", city: "Paris", address: "90 Bd Haussmann, 75008", rating: 4.9, reviews: 421, price: 220, experience: 19, barreau: "Paris", languages: ["Français", "Anglais"], bio: "Négociations collectives, plans sociaux, discrimination au travail et conseil en droit social.", consultTypes: ["Cabinet", "Visio"], initials: "CD" },
  { id: 12, name: "Maître Antoine Leclerc", specialty: "affaires", city: "Nice", address: "7 Promenade des Anglais, 06000", rating: 4.7, reviews: 134, price: 195, experience: 17, barreau: "Nice", languages: ["Français", "Anglais", "Russe"], bio: "Droit des sociétés, investissements étrangers, contentieux commercial international.", consultTypes: ["Cabinet", "Visio", "Téléphone"], initials: "AL" },
];

function generateSlots() {
  const slots = {};
  const base = new Date();
  for (let d = 0; d < 14; d++) {
    const dt = new Date(base);
    dt.setDate(dt.getDate() + d);
    if (dt.getDay() === 0) continue;
    const key = dt.toISOString().split("T")[0];
    const times = [];
    const possible = ["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];
    possible.forEach(t => { if (Math.random() > 0.35) times.push(t); });
    slots[key] = times;
  }
  return slots;
}

const formatDateLabel = (str) => {
  const d = new Date(str + "T00:00:00");
  const days = ["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"];
  const months = ["jan","fév","mars","avr","mai","juin","juil","août","sept","oct","nov","déc"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
};

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: GOLD, fontSize: 14, letterSpacing: 1 }}>
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
};

// ── Global Styles ──
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@200;300;400;500;600;700&display=swap');

  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:${BG_DARK}; color:${TEXT}; font-family:'Outfit',sans-serif; overflow-x:hidden; }
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:${BG_DARK}; }
  ::-webkit-scrollbar-thumb { background:${GOLD_DARK}; border-radius:3px; }
  ::selection { background:${GOLD}33; color:${GOLD_LIGHT}; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes shimmer { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
  @keyframes slideDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }

  .gold-line {
    height:1px;
    background:linear-gradient(90deg, transparent, ${GOLD}66, transparent);
  }
  .gold-glow {
    box-shadow: 0 0 30px ${GOLD}15, 0 0 60px ${GOLD}08;
  }
  input:focus, select:focus, textarea:focus {
    outline:none;
    border-color:${GOLD} !important;
    box-shadow: 0 0 0 2px ${GOLD}22;
  }
  button { cursor:pointer; font-family:'Outfit',sans-serif; }
`;

// ═══════════════════════════════════════
// HEADER
// ═══════════════════════════════════════
const Header = ({ page, setPage, isScrolled }) => (
  <header style={{
    position:"fixed", top:0, left:0, right:0, zIndex:1000,
    background: isScrolled ? `${BG_DARK}EE` : "transparent",
    backdropFilter: isScrolled ? "blur(20px)" : "none",
    borderBottom: isScrolled ? `1px solid ${BORDER}` : "none",
    transition:"all 0.4s ease",
    padding:"0 40px",
  }}>
    <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, cursor:"pointer" }} onClick={() => setPage("home")}>
        <div style={{
          width:42, height:42, borderRadius:10,
          background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:20, fontWeight:700, color:BG_DARK, fontFamily:"'Cormorant Garamond',serif",
        }}>J</div>
        <span style={{ fontSize:22, fontWeight:600, letterSpacing:1, color: TEXT }}>
          Juri<span style={{ color:GOLD }}>lib</span>
        </span>
      </div>

      <nav style={{ display:"flex", gap:32, alignItems:"center" }}>
        {[
          { key:"home", label:"Accueil" },
          { key:"search", label:"Trouver un avocat" },
          { key:"how", label:"Comment ça marche" },
        ].map(n => (
          <button key={n.key} onClick={() => setPage(n.key)} style={{
            background:"none", border:"none", color: page === n.key ? GOLD : TEXT_MUTED,
            fontSize:14, fontWeight:500, letterSpacing:0.5,
            transition:"color 0.3s", position:"relative",
            paddingBottom:4,
          }}>
            {n.label}
            {page === n.key && <span style={{
              position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
              width:20, height:2, background:GOLD, borderRadius:1,
            }} />}
          </button>
        ))}
        <button onClick={() => setPage("login")} style={{
          background:"none", border:`1px solid ${GOLD}44`,
          color:GOLD, padding:"8px 20px", borderRadius:8, fontSize:13,
          fontWeight:500, letterSpacing:0.5, transition:"all 0.3s",
        }}
          onMouseEnter={e => { e.target.style.background = `${GOLD}15`; e.target.style.borderColor = GOLD; }}
          onMouseLeave={e => { e.target.style.background = "none"; e.target.style.borderColor = `${GOLD}44`; }}
        >Connexion</button>
        <button onClick={() => setPage("register")} style={{
          background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
          border:"none", color:BG_DARK, padding:"8px 20px", borderRadius:8,
          fontSize:13, fontWeight:600, letterSpacing:0.5, transition:"all 0.3s",
        }}
          onMouseEnter={e => e.target.style.opacity = "0.9"}
          onMouseLeave={e => e.target.style.opacity = "1"}
        >Inscription</button>
      </nav>
    </div>
  </header>
);

// ═══════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════
const HomePage = ({ setPage, setSearchQuery, setSearchCity }) => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = () => {
    setSearchQuery(query);
    setSearchCity(city);
    setPage("search");
  };

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",
        textAlign:"center", padding:"120px 20px 80px",
        position:"relative", overflow:"hidden",
      }}>
        {/* Background effects */}
        <div style={{
          position:"absolute", top:"-30%", right:"-10%", width:600, height:600,
          background:`radial-gradient(circle, ${GOLD}08 0%, transparent 70%)`,
          borderRadius:"50%", pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:"-20%", left:"-10%", width:500, height:500,
          background:`radial-gradient(circle, ${GOLD}05 0%, transparent 70%)`,
          borderRadius:"50%", pointerEvents:"none",
        }} />

        <div style={{ animation:"fadeUp 0.8s ease", position:"relative" }}>
          <div style={{
            display:"inline-block", padding:"6px 18px", borderRadius:20,
            border:`1px solid ${GOLD}33`, background:`${GOLD}08`,
            fontSize:12, color:GOLD, letterSpacing:2, textTransform:"uppercase",
            fontWeight:500, marginBottom:32,
          }}>La référence juridique en ligne</div>

          <h1 style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:72, fontWeight:300,
            lineHeight:1.1, marginBottom:24, maxWidth:800,
            background:`linear-gradient(135deg, ${TEXT}, ${GOLD_LIGHT})`,
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          }}>
            Trouvez votre <em style={{ fontWeight:600, fontStyle:"italic" }}>avocat</em><br />en toute confiance
          </h1>

          <p style={{ color:TEXT_MUTED, fontSize:18, lineHeight:1.7, maxWidth:560, margin:"0 auto 48px", fontWeight:300 }}>
            Prenez rendez-vous en ligne avec les meilleurs avocats de France.
            Consultation en cabinet, en visio ou par téléphone.
          </p>
        </div>

        {/* Search bar */}
        <div style={{
          display:"flex", gap:0, maxWidth:720, width:"100%",
          background:BG_CARD, borderRadius:16, overflow:"hidden",
          border:`1px solid ${BORDER}`, animation:"fadeUp 1s ease",
          boxShadow:`0 20px 60px ${BG_DARK}CC, 0 0 40px ${GOLD}08`,
        }}>
          <div style={{ flex:1, padding:"16px 24px", borderRight:`1px solid ${BORDER}` }}>
            <div style={{ fontSize:11, color:TEXT_MUTED, marginBottom:6, textTransform:"uppercase", letterSpacing:1.5, fontWeight:500 }}>Spécialité ou nom</div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Ex: Divorce, droit du travail..."
              style={{ width:"100%", background:"none", border:"none", color:TEXT, fontSize:15, fontFamily:"'Outfit',sans-serif" }}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
            />
          </div>
          <div style={{ flex:0.7, padding:"16px 24px" }}>
            <div style={{ fontSize:11, color:TEXT_MUTED, marginBottom:6, textTransform:"uppercase", letterSpacing:1.5, fontWeight:500 }}>Ville</div>
            <select value={city} onChange={e => setCity(e.target.value)}
              style={{ width:"100%", background:"none", border:"none", color: city ? TEXT : TEXT_MUTED, fontSize:15, fontFamily:"'Outfit',sans-serif" }}>
              <option value="">Toutes les villes</option>
              {CITIES.map(c => <option key={c} value={c} style={{ background:BG_CARD, color:TEXT }}>{c}</option>)}
            </select>
          </div>
          <button onClick={handleSearch} style={{
            padding:"0 32px", background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
            border:"none", color:BG_DARK, fontSize:15, fontWeight:600,
            letterSpacing:0.5, transition:"opacity 0.3s", flexShrink:0,
          }}
            onMouseEnter={e => e.target.style.opacity = "0.9"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >Rechercher</button>
        </div>

        {/* Quick specialties */}
        <div style={{ display:"flex", gap:12, marginTop:32, flexWrap:"wrap", justifyContent:"center", animation:"fadeUp 1.2s ease" }}>
          {SPECIALTIES.filter(s => s.id !== "all").slice(0, 5).map(s => (
            <button key={s.id} onClick={() => { setSearchQuery(s.label); setPage("search"); }} style={{
              background:`${BG_CARD}AA`, border:`1px solid ${BORDER}`, borderRadius:10,
              padding:"10px 18px", color:TEXT_MUTED, fontSize:13, display:"flex", gap:8,
              alignItems:"center", transition:"all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}55`; e.currentTarget.style.color = TEXT; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = TEXT_MUTED; }}
            >
              <span>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding:"60px 40px", borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", justifyContent:"space-around", textAlign:"center" }}>
          {[
            { num:"12 500+", label:"Avocats inscrits" },
            { num:"850 000+", label:"Rendez-vous pris" },
            { num:"4.8/5", label:"Note moyenne" },
            { num:"98%", label:"Clients satisfaits" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:36, fontWeight:600, color:GOLD }}>{s.num}</div>
              <div style={{ color:TEXT_MUTED, fontSize:13, marginTop:4, letterSpacing:1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding:"100px 40px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:12, color:GOLD, letterSpacing:3, textTransform:"uppercase", marginBottom:16, fontWeight:500 }}>Simple & rapide</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:400, marginBottom:60, color:TEXT }}>
            Comment ça <em style={{ color:GOLD, fontStyle:"italic" }}>marche</em>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:40 }}>
            {[
              { step:"01", title:"Recherchez", desc:"Trouvez l'avocat spécialisé dans votre domaine juridique, dans votre ville.", icon:"🔍" },
              { step:"02", title:"Réservez", desc:"Choisissez un créneau disponible et le type de consultation souhaité.", icon:"📅" },
              { step:"03", title:"Consultez", desc:"Rencontrez votre avocat en cabinet, en visioconférence ou par téléphone.", icon:"💬" },
            ].map((item, i) => (
              <div key={i} style={{
                padding:40, borderRadius:16, border:`1px solid ${BORDER}`,
                background:BG_CARD, transition:"all 0.4s", position:"relative", overflow:"hidden",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}44`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  position:"absolute", top:-20, right:-10, fontSize:100, fontWeight:700,
                  fontFamily:"'Cormorant Garamond',serif", color:`${GOLD}08`,
                }}>{item.step}</div>
                <div style={{ fontSize:36, marginBottom:20 }}>{item.icon}</div>
                <h3 style={{ fontSize:20, fontWeight:600, marginBottom:12, color:TEXT }}>{item.title}</h3>
                <p style={{ color:TEXT_MUTED, fontSize:14, lineHeight:1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top lawyers */}
      <section style={{ padding:"80px 40px", background:`${BG_CARD}88` }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ fontSize:12, color:GOLD, letterSpacing:3, textTransform:"uppercase", marginBottom:16, fontWeight:500, textAlign:"center" }}>Excellence juridique</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:42, fontWeight:400, marginBottom:48, textAlign:"center" }}>
            Avocats les mieux <em style={{ color:GOLD, fontStyle:"italic" }}>notés</em>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:24 }}>
            {LAWYERS.filter(l => l.rating >= 4.8).slice(0, 3).map(l => (
              <LawyerCard key={l.id} lawyer={l} onClick={() => {}} compact />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"100px 40px", textAlign:"center" }}>
        <div style={{ maxWidth:600, margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:38, fontWeight:400, marginBottom:20 }}>
            Vous êtes <em style={{ color:GOLD, fontStyle:"italic" }}>avocat</em> ?
          </h2>
          <p style={{ color:TEXT_MUTED, fontSize:16, lineHeight:1.7, marginBottom:36 }}>
            Rejoignez Jurilib et développez votre clientèle. Gestion d'agenda intelligente, visioconférence intégrée et pré-qualification IA des dossiers.
          </p>
          <button style={{
            background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
            border:"none", color:BG_DARK, padding:"14px 36px", borderRadius:10,
            fontSize:15, fontWeight:600, letterSpacing:0.5,
          }}>Rejoindre Jurilib — Essai gratuit 30 jours</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${BORDER}`, padding:"60px 40px 30px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <div style={{
                width:36, height:36, borderRadius:8,
                background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:18, fontWeight:700, color:BG_DARK, fontFamily:"'Cormorant Garamond',serif",
              }}>J</div>
              <span style={{ fontSize:18, fontWeight:600 }}>Juri<span style={{ color:GOLD }}>lib</span></span>
            </div>
            <p style={{ color:TEXT_MUTED, fontSize:13, lineHeight:1.7, maxWidth:280 }}>
              La plateforme de référence pour prendre rendez-vous avec un avocat en France.
            </p>
          </div>
          {[
            { title:"Plateforme", links:["Trouver un avocat","Comment ça marche","Tarifs","FAQ"] },
            { title:"Avocats", links:["Rejoindre Jurilib","Espace pro","Gestion d'agenda","Visioconférence"] },
            { title:"Légal", links:["Mentions légales","CGU","Politique de confidentialité","Cookies"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 style={{ color:GOLD, fontSize:12, letterSpacing:2, textTransform:"uppercase", marginBottom:16, fontWeight:500 }}>{col.title}</h4>
              {col.links.map((l, j) => (
                <div key={j} style={{ color:TEXT_MUTED, fontSize:13, marginBottom:10, cursor:"pointer", transition:"color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = TEXT}
                  onMouseLeave={e => e.target.style.color = TEXT_MUTED}
                >{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1100, margin:"40px auto 0", borderTop:`1px solid ${BORDER}`, paddingTop:24, textAlign:"center" }}>
          <p style={{ color:TEXT_MUTED, fontSize:12 }}>© 2026 Jurilib. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

// ═══════════════════════════════════════
// LAWYER CARD
// ═══════════════════════════════════════
const LawyerCard = ({ lawyer, onClick, compact }) => {
  const l = lawyer;
  const spec = SPECIALTIES.find(s => s.id === l.specialty);

  return (
    <div onClick={() => onClick?.(l)} style={{
      background:BG_CARD, borderRadius:16, border:`1px solid ${BORDER}`,
      padding: compact ? 24 : 28, cursor:"pointer", transition:"all 0.4s",
      position:"relative", overflow:"hidden",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${GOLD}44`; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${BG_DARK}CC`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ display:"flex", gap:16, marginBottom:16 }}>
        <div style={{
          width:56, height:56, borderRadius:14,
          background:`linear-gradient(135deg, ${GOLD}22, ${GOLD}44)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:18, fontWeight:600, color:GOLD, fontFamily:"'Cormorant Garamond',serif",
          border:`1px solid ${GOLD}33`, flexShrink:0,
        }}>{l.initials}</div>
        <div style={{ flex:1 }}>
          <h3 style={{ fontSize:16, fontWeight:600, color:TEXT, marginBottom:4 }}>{l.name}</h3>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
            <span style={{ fontSize:12, color:GOLD, background:`${GOLD}11`, padding:"2px 8px", borderRadius:4 }}>{spec?.icon} {spec?.label}</span>
          </div>
          <div style={{ fontSize:12, color:TEXT_MUTED }}>📍 {l.city} · Barreau de {l.barreau}</div>
        </div>
      </div>

      {!compact && <p style={{ color:TEXT_MUTED, fontSize:13, lineHeight:1.6, marginBottom:16 }}>{l.bio}</p>}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <Stars rating={l.rating} />
          <span style={{ color:TEXT_MUTED, fontSize:12 }}>{l.rating} ({l.reviews} avis)</span>
        </div>
        <span style={{ color:GOLD, fontWeight:600, fontSize:15 }}>{l.price}€</span>
      </div>

      <div style={{ display:"flex", gap:6, marginTop:12 }}>
        {l.consultTypes.map(t => (
          <span key={t} style={{
            fontSize:11, padding:"3px 10px", borderRadius:6,
            background:`${GOLD}0A`, border:`1px solid ${GOLD}22`, color:TEXT_MUTED,
          }}>{t}</span>
        ))}
      </div>

      <div style={{
        marginTop:16, padding:"10px 0 0", borderTop:`1px solid ${BORDER}`,
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <span style={{ fontSize:12, color:SUCCESS }}>● Disponible aujourd'hui</span>
        <span style={{ fontSize:12, color:GOLD, fontWeight:500 }}>Voir le profil →</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// SEARCH / RESULTS PAGE
// ═══════════════════════════════════════
const SearchPage = ({ setPage, searchQuery, searchCity, setSelectedLawyer }) => {
  const [query, setQuery] = useState(searchQuery || "");
  const [city, setCity] = useState(searchCity || "");
  const [specialty, setSpecialty] = useState("all");
  const [consultType, setConsultType] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const results = useMemo(() => {
    let list = [...LAWYERS];
    if (specialty !== "all") list = list.filter(l => l.specialty === specialty);
    if (city) list = list.filter(l => l.city === city);
    if (consultType) list = list.filter(l => l.consultTypes.includes(consultType));
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.bio.toLowerCase().includes(q) ||
        SPECIALTIES.find(s => s.id === l.specialty)?.label.toLowerCase().includes(q)
      );
    }
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "reviews") list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [query, city, specialty, consultType, sortBy]);

  return (
    <div style={{ paddingTop:90, minHeight:"100vh" }}>
      {/* Search bar */}
      <div style={{ background:BG_CARD, borderBottom:`1px solid ${BORDER}`, padding:"20px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", gap:12, alignItems:"center" }}>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un avocat, une spécialité..."
            style={{
              flex:1, background:`${BG_DARK}`, border:`1px solid ${BORDER}`, borderRadius:10,
              padding:"12px 18px", color:TEXT, fontSize:14, fontFamily:"'Outfit',sans-serif",
            }} />
          <select value={city} onChange={e => setCity(e.target.value)} style={{
            background:BG_DARK, border:`1px solid ${BORDER}`, borderRadius:10,
            padding:"12px 18px", color: city ? TEXT : TEXT_MUTED, fontSize:14, fontFamily:"'Outfit',sans-serif",
          }}>
            <option value="">Toutes les villes</option>
            {CITIES.map(c => <option key={c} value={c} style={{ background:BG_CARD }}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"30px 40px", display:"flex", gap:30 }}>
        {/* Sidebar filters */}
        <aside style={{ width:240, flexShrink:0 }}>
          <h3 style={{ fontSize:14, fontWeight:600, color:GOLD, letterSpacing:1, textTransform:"uppercase", marginBottom:20 }}>Filtres</h3>

          <div style={{ marginBottom:28 }}>
            <h4 style={{ fontSize:12, color:TEXT_MUTED, marginBottom:10, letterSpacing:1, textTransform:"uppercase" }}>Spécialité</h4>
            {SPECIALTIES.map(s => (
              <button key={s.id} onClick={() => setSpecialty(s.id)} style={{
                display:"block", width:"100%", textAlign:"left", background: specialty === s.id ? `${GOLD}15` : "none",
                border: specialty === s.id ? `1px solid ${GOLD}33` : `1px solid transparent`,
                borderRadius:8, padding:"8px 12px", color: specialty === s.id ? GOLD : TEXT_MUTED,
                fontSize:13, marginBottom:4, transition:"all 0.2s",
              }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          <div style={{ marginBottom:28 }}>
            <h4 style={{ fontSize:12, color:TEXT_MUTED, marginBottom:10, letterSpacing:1, textTransform:"uppercase" }}>Type de consultation</h4>
            {CONSULT_TYPES.map(t => (
              <button key={t} onClick={() => setConsultType(consultType === t ? "" : t)} style={{
                display:"block", width:"100%", textAlign:"left",
                background: consultType === t ? `${GOLD}15` : "none",
                border: consultType === t ? `1px solid ${GOLD}33` : `1px solid transparent`,
                borderRadius:8, padding:"8px 12px", color: consultType === t ? GOLD : TEXT_MUTED,
                fontSize:13, marginBottom:4, transition:"all 0.2s",
              }}>{t}</button>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize:12, color:TEXT_MUTED, marginBottom:10, letterSpacing:1, textTransform:"uppercase" }}>Trier par</h4>
            {[
              { key:"rating", label:"Meilleure note" },
              { key:"price", label:"Prix croissant" },
              { key:"reviews", label:"Plus d'avis" },
            ].map(s => (
              <button key={s.key} onClick={() => setSortBy(s.key)} style={{
                display:"block", width:"100%", textAlign:"left",
                background: sortBy === s.key ? `${GOLD}15` : "none",
                border: sortBy === s.key ? `1px solid ${GOLD}33` : `1px solid transparent`,
                borderRadius:8, padding:"8px 12px", color: sortBy === s.key ? GOLD : TEXT_MUTED,
                fontSize:13, marginBottom:4, transition:"all 0.2s",
              }}>{s.label}</button>
            ))}
          </div>
        </aside>

        {/* Results */}
        <main style={{ flex:1 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
            <h2 style={{ fontSize:18, fontWeight:500, color:TEXT }}>
              <span style={{ color:GOLD, fontWeight:700 }}>{results.length}</span> avocat{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}
            </h2>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {results.map((l, i) => (
              <div key={l.id} style={{ animation:`fadeUp 0.5s ease ${i * 0.05}s both` }}>
                <LawyerCard lawyer={l} onClick={() => { setSelectedLawyer(l); setPage("profile"); }} />
              </div>
            ))}
            {results.length === 0 && (
              <div style={{ textAlign:"center", padding:60, color:TEXT_MUTED }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
                <p style={{ fontSize:16 }}>Aucun avocat trouvé pour ces critères.</p>
                <p style={{ fontSize:14, marginTop:8 }}>Essayez d'élargir votre recherche.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// LAWYER PROFILE + BOOKING
// ═══════════════════════════════════════
const ProfilePage = ({ lawyer, setPage }) => {
  const l = lawyer;
  if (!l) return null;
  const spec = SPECIALTIES.find(s => s.id === l.specialty);
  const [slots] = useState(() => generateSlots());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedConsultType, setSelectedConsultType] = useState(l.consultTypes[0]);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0);

  const dates = Object.keys(slots).slice(weekOffset * 5, weekOffset * 5 + 5);

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      setBookingConfirmed(true);
    }
  };

  if (bookingConfirmed) {
    return (
      <div style={{ paddingTop:120, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{
          background:BG_CARD, borderRadius:20, border:`1px solid ${GOLD}33`,
          padding:60, textAlign:"center", maxWidth:500, animation:"scaleIn 0.5s ease",
          boxShadow:`0 0 60px ${GOLD}10`,
        }}>
          <div style={{ fontSize:64, marginBottom:24 }}>✓</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, fontWeight:400, marginBottom:16, color:TEXT }}>
            Rendez-vous <em style={{ color:GOLD }}>confirmé</em>
          </h2>
          <div style={{ color:TEXT_MUTED, fontSize:15, lineHeight:1.8, marginBottom:32 }}>
            <p><strong style={{ color:TEXT }}>{l.name}</strong></p>
            <p>{spec?.label}</p>
            <p style={{ color:GOLD, fontWeight:500, marginTop:8 }}>{formatDateLabel(selectedDate)} à {selectedTime}</p>
            <p>{selectedConsultType}</p>
          </div>
          <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
            <button onClick={() => { setBookingConfirmed(false); setPage("home"); }} style={{
              background:`${GOLD}15`, border:`1px solid ${GOLD}33`, color:GOLD,
              padding:"12px 24px", borderRadius:10, fontSize:14, fontWeight:500,
            }}>Retour à l'accueil</button>
            <button style={{
              background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
              border:"none", color:BG_DARK, padding:"12px 24px", borderRadius:10, fontSize:14, fontWeight:600,
            }}>Ajouter au calendrier</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop:90, minHeight:"100vh" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"30px 40px" }}>
        <button onClick={() => setPage("search")} style={{
          background:"none", border:"none", color:TEXT_MUTED, fontSize:13, marginBottom:24,
          display:"flex", alignItems:"center", gap:6,
        }}>← Retour aux résultats</button>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:30 }}>
          {/* Left - Profile info */}
          <div>
            <div style={{
              background:BG_CARD, borderRadius:20, border:`1px solid ${BORDER}`,
              padding:36, marginBottom:24,
            }}>
              <div style={{ display:"flex", gap:20, marginBottom:24 }}>
                <div style={{
                  width:80, height:80, borderRadius:20,
                  background:`linear-gradient(135deg, ${GOLD}22, ${GOLD}44)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:28, fontWeight:600, color:GOLD, fontFamily:"'Cormorant Garamond',serif",
                  border:`1px solid ${GOLD}33`,
                }}>{l.initials}</div>
                <div>
                  <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:500, marginBottom:6 }}>{l.name}</h1>
                  <div style={{ fontSize:14, color:GOLD, marginBottom:4 }}>{spec?.icon} {spec?.label}</div>
                  <div style={{ fontSize:13, color:TEXT_MUTED }}>📍 {l.address}</div>
                </div>
              </div>

              <div className="gold-line" style={{ marginBottom:24 }} />

              <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16, marginBottom:24 }}>
                {[
                  { label:"Expérience", val:`${l.experience} ans` },
                  { label:"Tarif", val:`${l.price}€` },
                  { label:"Note", val:`${l.rating}/5` },
                  { label:"Avis", val:l.reviews },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign:"center", padding:16, background:`${BG_DARK}88`, borderRadius:12 }}>
                    <div style={{ fontSize:20, fontWeight:600, color:GOLD, fontFamily:"'Cormorant Garamond',serif" }}>{item.val}</div>
                    <div style={{ fontSize:11, color:TEXT_MUTED, marginTop:4, textTransform:"uppercase", letterSpacing:1 }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontSize:14, fontWeight:600, color:TEXT, marginBottom:10 }}>À propos</h3>
              <p style={{ color:TEXT_MUTED, fontSize:14, lineHeight:1.8, marginBottom:20 }}>{l.bio}</p>

              <h3 style={{ fontSize:14, fontWeight:600, color:TEXT, marginBottom:10 }}>Langues parlées</h3>
              <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                {l.languages.map(lang => (
                  <span key={lang} style={{ fontSize:12, padding:"4px 12px", borderRadius:6, background:`${GOLD}0A`, border:`1px solid ${GOLD}22`, color:TEXT_MUTED }}>{lang}</span>
                ))}
              </div>

              <h3 style={{ fontSize:14, fontWeight:600, color:TEXT, marginBottom:10 }}>Types de consultation</h3>
              <div style={{ display:"flex", gap:8 }}>
                {l.consultTypes.map(t => (
                  <span key={t} style={{ fontSize:12, padding:"6px 14px", borderRadius:8, background:`${GOLD}0A`, border:`1px solid ${GOLD}22`, color:GOLD }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Reviews section */}
            <div style={{ background:BG_CARD, borderRadius:20, border:`1px solid ${BORDER}`, padding:36 }}>
              <h3 style={{ fontSize:16, fontWeight:600, color:TEXT, marginBottom:20 }}>Avis patients ({l.reviews})</h3>
              {[
                { name:"Marie L.", date:"Il y a 2 jours", rating:5, text:"Très à l'écoute, explications claires. Je recommande vivement." },
                { name:"Thomas D.", date:"Il y a 1 semaine", rating:5, text:"Excellent accompagnement pour mon dossier de divorce. Professionnalisme exemplaire." },
                { name:"Sarah K.", date:"Il y a 2 semaines", rating:4, text:"Bons conseils juridiques, rendez-vous ponctuel. Tarif un peu élevé mais justifié." },
              ].map((r, i) => (
                <div key={i} style={{ padding:"16px 0", borderBottom: i < 2 ? `1px solid ${BORDER}` : "none" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <div><span style={{ fontWeight:500, color:TEXT, fontSize:14 }}>{r.name}</span> <span style={{ color:TEXT_MUTED, fontSize:12 }}>· {r.date}</span></div>
                    <Stars rating={r.rating} />
                  </div>
                  <p style={{ color:TEXT_MUTED, fontSize:13, lineHeight:1.6 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Booking */}
          <div>
            <div style={{
              background:BG_CARD, borderRadius:20, border:`1px solid ${BORDER}`,
              padding:28, position:"sticky", top:100,
            }}>
              <h3 style={{ fontSize:16, fontWeight:600, color:TEXT, marginBottom:20, textAlign:"center" }}>Prendre rendez-vous</h3>

              {/* Consult type */}
              <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                {l.consultTypes.map(t => (
                  <button key={t} onClick={() => setSelectedConsultType(t)} style={{
                    flex:1, padding:"10px 0", borderRadius:8, fontSize:12, fontWeight:500,
                    border: selectedConsultType === t ? `1px solid ${GOLD}` : `1px solid ${BORDER}`,
                    background: selectedConsultType === t ? `${GOLD}15` : "none",
                    color: selectedConsultType === t ? GOLD : TEXT_MUTED,
                    transition:"all 0.2s",
                  }}>{t}</button>
                ))}
              </div>

              {/* Calendar nav */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <button onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))} disabled={weekOffset === 0}
                  style={{ background:"none", border:"none", color: weekOffset === 0 ? `${TEXT_MUTED}44` : TEXT_MUTED, fontSize:18 }}>‹</button>
                <span style={{ fontSize:13, color:TEXT_MUTED, fontWeight:500 }}>Semaine {weekOffset + 1}</span>
                <button onClick={() => setWeekOffset(Math.min(2, weekOffset + 1))} disabled={weekOffset === 2}
                  style={{ background:"none", border:"none", color: weekOffset === 2 ? `${TEXT_MUTED}44` : TEXT_MUTED, fontSize:18 }}>›</button>
              </div>

              {/* Date pills */}
              <div style={{ display:"flex", gap:6, marginBottom:16, overflowX:"auto" }}>
                {dates.map(d => (
                  <button key={d} onClick={() => { setSelectedDate(d); setSelectedTime(null); }} style={{
                    flex:1, padding:"10px 4px", borderRadius:10, fontSize:11, textAlign:"center",
                    border: selectedDate === d ? `1px solid ${GOLD}` : `1px solid ${BORDER}`,
                    background: selectedDate === d ? `${GOLD}15` : "none",
                    color: selectedDate === d ? GOLD : TEXT_MUTED,
                    transition:"all 0.2s", minWidth:0,
                  }}>
                    <div style={{ fontWeight:500 }}>{formatDateLabel(d).split(" ")[0]}</div>
                    <div style={{ fontSize:15, fontWeight:600, margin:"2px 0", color: selectedDate === d ? GOLD : TEXT }}>{formatDateLabel(d).split(" ")[1]}</div>
                    <div>{formatDateLabel(d).split(" ")[2]}</div>
                  </button>
                ))}
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div style={{ animation:"slideDown 0.3s ease" }}>
                  <div style={{ fontSize:12, color:TEXT_MUTED, marginBottom:10 }}>Créneaux disponibles</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:6, marginBottom:20 }}>
                    {(slots[selectedDate] || []).map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)} style={{
                        padding:"10px 0", borderRadius:8, fontSize:13, fontWeight:500,
                        border: selectedTime === t ? `1px solid ${GOLD}` : `1px solid ${BORDER}`,
                        background: selectedTime === t ? `${GOLD}15` : "none",
                        color: selectedTime === t ? GOLD : TEXT,
                        transition:"all 0.2s",
                      }}>{t}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Book button */}
              <button onClick={handleBook} disabled={!selectedDate || !selectedTime} style={{
                width:"100%", padding:"14px 0", borderRadius:10, fontSize:14, fontWeight:600,
                border:"none", letterSpacing:0.5, transition:"all 0.3s",
                background: (selectedDate && selectedTime) ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})` : `${BORDER}`,
                color: (selectedDate && selectedTime) ? BG_DARK : TEXT_MUTED,
                cursor: (selectedDate && selectedTime) ? "pointer" : "not-allowed",
              }}>
                {selectedDate && selectedTime
                  ? `Confirmer — ${formatDateLabel(selectedDate)} à ${selectedTime}`
                  : "Sélectionnez un créneau"}
              </button>

              <p style={{ color:TEXT_MUTED, fontSize:11, textAlign:"center", marginTop:12, lineHeight:1.5 }}>
                Annulation gratuite jusqu'à 24h avant le rendez-vous
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// HOW IT WORKS PAGE
// ═══════════════════════════════════════
const HowItWorksPage = ({ setPage }) => (
  <div style={{ paddingTop:120, minHeight:"100vh" }}>
    <div style={{ maxWidth:800, margin:"0 auto", padding:"0 40px 80px", textAlign:"center" }}>
      <div style={{ fontSize:12, color:GOLD, letterSpacing:3, textTransform:"uppercase", marginBottom:16, fontWeight:500 }}>Guide</div>
      <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, fontWeight:400, marginBottom:20 }}>
        Comment utiliser <em style={{ color:GOLD, fontStyle:"italic" }}>Jurilib</em>
      </h1>
      <p style={{ color:TEXT_MUTED, fontSize:16, lineHeight:1.7, marginBottom:60, maxWidth:560, margin:"0 auto 60px" }}>
        Trouver un avocat et prendre rendez-vous n'a jamais été aussi simple.
      </p>

      {[
        { step:"01", title:"Recherchez votre avocat", desc:"Utilisez notre moteur de recherche pour trouver un avocat par spécialité, par ville ou par nom. Filtrez par type de consultation (cabinet, visio, téléphone), par note ou par tarif.", icon:"🔍" },
        { step:"02", title:"Consultez son profil", desc:"Découvrez l'expérience de l'avocat, ses domaines d'expertise, ses avis clients, ses tarifs et ses disponibilités en temps réel.", icon:"👤" },
        { step:"03", title:"Choisissez votre créneau", desc:"Sélectionnez le type de consultation et le créneau qui vous convient. L'agenda est mis à jour en temps réel.", icon:"📅" },
        { step:"04", title:"Confirmez votre rendez-vous", desc:"Recevez une confirmation instantanée par email et SMS. Rappel automatique 24h et 1h avant votre rendez-vous.", icon:"✅" },
        { step:"05", title:"Consultez votre avocat", desc:"Rendez-vous en cabinet ou connectez-vous à la visioconférence directement depuis Jurilib. Paiement sécurisé en ligne.", icon:"💬" },
      ].map((item, i) => (
        <div key={i} style={{
          display:"flex", gap:30, alignItems:"flex-start", textAlign:"left",
          padding:"36px 0", borderBottom: i < 4 ? `1px solid ${BORDER}` : "none",
          animation:`fadeUp 0.5s ease ${i * 0.1}s both`,
        }}>
          <div style={{
            width:60, height:60, borderRadius:16, flexShrink:0,
            background:`${GOLD}0A`, border:`1px solid ${GOLD}22`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:28,
          }}>{item.icon}</div>
          <div>
            <div style={{ fontSize:11, color:GOLD, letterSpacing:2, marginBottom:6, fontWeight:500 }}>ÉTAPE {item.step}</div>
            <h3 style={{ fontSize:20, fontWeight:600, marginBottom:8, color:TEXT }}>{item.title}</h3>
            <p style={{ color:TEXT_MUTED, fontSize:14, lineHeight:1.7 }}>{item.desc}</p>
          </div>
        </div>
      ))}

      <button onClick={() => setPage("search")} style={{
        marginTop:48,
        background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
        border:"none", color:BG_DARK, padding:"14px 36px", borderRadius:10,
        fontSize:15, fontWeight:600, letterSpacing:0.5,
      }}>Trouver un avocat maintenant</button>
    </div>
  </div>
);

// ═══════════════════════════════════════
// LOGIN / REGISTER
// ═══════════════════════════════════════
const AuthPage = ({ type, setPage }) => {
  const isLogin = type === "login";
  return (
    <div style={{ paddingTop:120, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{
        background:BG_CARD, borderRadius:24, border:`1px solid ${BORDER}`,
        padding:48, width:420, animation:"scaleIn 0.4s ease",
        boxShadow:`0 20px 60px ${BG_DARK}CC`,
      }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{
            width:56, height:56, borderRadius:14, margin:"0 auto 16px",
            background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:24, fontWeight:700, color:BG_DARK, fontFamily:"'Cormorant Garamond',serif",
          }}>J</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:400 }}>
            {isLogin ? "Connexion" : "Créer un compte"}
          </h2>
          <p style={{ color:TEXT_MUTED, fontSize:13, marginTop:8 }}>
            {isLogin ? "Accédez à votre espace Jurilib" : "Rejoignez Jurilib gratuitement"}
          </p>
        </div>

        {!isLogin && (
          <div style={{ display:"flex", gap:12, marginBottom:16 }}>
            <div style={{ flex:1 }}>
              <label style={{ fontSize:12, color:TEXT_MUTED, display:"block", marginBottom:6 }}>Prénom</label>
              <input style={{
                width:"100%", background:BG_DARK, border:`1px solid ${BORDER}`, borderRadius:10,
                padding:"12px 16px", color:TEXT, fontSize:14, fontFamily:"'Outfit',sans-serif",
              }} placeholder="Jean" />
            </div>
            <div style={{ flex:1 }}>
              <label style={{ fontSize:12, color:TEXT_MUTED, display:"block", marginBottom:6 }}>Nom</label>
              <input style={{
                width:"100%", background:BG_DARK, border:`1px solid ${BORDER}`, borderRadius:10,
                padding:"12px 16px", color:TEXT, fontSize:14, fontFamily:"'Outfit',sans-serif",
              }} placeholder="Dupont" />
            </div>
          </div>
        )}

        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, color:TEXT_MUTED, display:"block", marginBottom:6 }}>Email</label>
          <input type="email" style={{
            width:"100%", background:BG_DARK, border:`1px solid ${BORDER}`, borderRadius:10,
            padding:"12px 16px", color:TEXT, fontSize:14, fontFamily:"'Outfit',sans-serif",
          }} placeholder="jean@exemple.fr" />
        </div>

        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, color:TEXT_MUTED, display:"block", marginBottom:6 }}>Mot de passe</label>
          <input type="password" style={{
            width:"100%", background:BG_DARK, border:`1px solid ${BORDER}`, borderRadius:10,
            padding:"12px 16px", color:TEXT, fontSize:14, fontFamily:"'Outfit',sans-serif",
          }} placeholder="••••••••" />
        </div>

        {!isLogin && (
          <div style={{ marginBottom:16 }}>
            <label style={{ fontSize:12, color:TEXT_MUTED, display:"block", marginBottom:6 }}>Je suis</label>
            <div style={{ display:"flex", gap:12 }}>
              {["Un particulier", "Un avocat"].map(t => (
                <button key={t} style={{
                  flex:1, padding:"10px 0", borderRadius:10, fontSize:13,
                  border:`1px solid ${BORDER}`, background:"none", color:TEXT_MUTED,
                  transition:"all 0.2s",
                }}
                  onFocus={e => { e.target.style.borderColor = GOLD; e.target.style.color = GOLD; e.target.style.background = `${GOLD}15`; }}
                >{t}</button>
              ))}
            </div>
          </div>
        )}

        <button style={{
          width:"100%", padding:"14px 0", borderRadius:10, fontSize:14, fontWeight:600,
          border:"none", letterSpacing:0.5, marginTop:8,
          background:`linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`,
          color:BG_DARK,
        }}>{isLogin ? "Se connecter" : "Créer mon compte"}</button>

        <div style={{ textAlign:"center", marginTop:24 }}>
          <span style={{ color:TEXT_MUTED, fontSize:13 }}>
            {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
          </span>
          <button onClick={() => setPage(isLogin ? "register" : "login")} style={{
            background:"none", border:"none", color:GOLD, fontSize:13, fontWeight:500,
          }}>{isLogin ? "S'inscrire" : "Se connecter"}</button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top:0, behavior:"smooth" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={setPage} setSearchQuery={setSearchQuery} setSearchCity={setSearchCity} />;
      case "search":
        return <SearchPage setPage={setPage} searchQuery={searchQuery} searchCity={searchCity} setSelectedLawyer={setSelectedLawyer} />;
      case "profile":
        return <ProfilePage lawyer={selectedLawyer} setPage={setPage} />;
      case "how":
        return <HowItWorksPage setPage={setPage} />;
      case "login":
        return <AuthPage type="login" setPage={setPage} />;
      case "register":
        return <AuthPage type="register" setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} setSearchQuery={setSearchQuery} setSearchCity={setSearchCity} />;
    }
  };

  return (
    <div style={{ background:BG_DARK, minHeight:"100vh" }}>
      <Header page={page} setPage={setPage} isScrolled={isScrolled} />
      {renderPage()}
    </div>
  );
}