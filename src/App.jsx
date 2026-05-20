import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');`;

const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --teal:      #6ECFBE;
  --teal-d:    #47A898;
  --teal-dim:  #D4F0EB;
  --amber:     #F0A832;
  --amber-d:   #C8861A;
  --slate:     #9B9BB4;
  --slate-d:   #6E6E8A;
  --pale:      #C5D5F0;
  --dark:      #1A1A2E;
  --dark2:     #2C2C44;
  --mid:       #5A5A74;
  --muted:     #8888A2;
  --off:       #F7F6F2;
  --serif: 'Playfair Display', Georgia, serif;
  --sans:  'DM Sans', system-ui, sans-serif;
}
body { background: var(--off); color: var(--dark); font-family: var(--sans); }
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-track { background: var(--off); }
::-webkit-scrollbar-thumb { background: var(--teal-dim); border-radius:3px; }

.nav {
  position:sticky; top:0; z-index:100;
  background:rgba(247,246,242,0.96); backdrop-filter:blur(10px);
  border-bottom:2px solid var(--teal-dim);
  padding:0 2rem; display:flex; align-items:center; justify-content:space-between; height:62px;
}
.nav-logo { font-family:var(--serif); font-size:1.15rem; color:var(--dark); cursor:pointer; }
.nav-logo span { color:var(--teal-d); }
.nav-links { display:flex; gap:1.75rem; align-items:center; }
.nav-link {
  font-size:0.73rem; font-weight:500; letter-spacing:0.08em; text-transform:uppercase;
  color:var(--muted); cursor:pointer; transition:color .2s; background:none; border:none; font-family:var(--sans);
}
.nav-link:hover,.nav-link.active { color:var(--dark); }
.nav-cta {
  font-size:0.7rem; font-weight:500; letter-spacing:0.06em; text-transform:uppercase;
  color:#fff; background:var(--amber); border:none; padding:.45rem 1.1rem;
  cursor:pointer; transition:background .2s; font-family:var(--sans); border-radius:2px;
}
.nav-cta:hover { background:var(--amber-d); }

.hero {
  background:var(--teal); padding:5rem 2rem 4.5rem;
  border-bottom:3px solid var(--amber); position:relative; overflow:hidden;
}
.hero::after {
  content:''; position:absolute; bottom:-80px; right:-60px;
  width:260px; height:260px; border-radius:50%;
  border:38px solid rgba(240,168,50,.15); pointer-events:none;
}
.hero-inner { max-width:820px; margin:0 auto; position:relative; }
.hero-eyebrow {
  font-size:0.67rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase;
  color:var(--dark); opacity:.6; margin-bottom:1.25rem; display:flex; align-items:center; gap:.75rem;
}
.hero-eyebrow::before { content:''; display:block; width:28px; height:1.5px; background:var(--dark); opacity:.4; }
.hero-title { font-family:var(--serif); font-size:clamp(2.1rem,5vw,3.6rem); font-weight:400; line-height:1.15; color:var(--dark); margin-bottom:1.2rem; }
.hero-title em { font-style:italic; color:var(--dark2); }
.hero-sub { font-size:.98rem; font-weight:300; line-height:1.8; color:var(--dark2); max-width:560px; margin-bottom:2.2rem; opacity:.82; }
.hero-actions { display:flex; gap:1rem; flex-wrap:wrap; }
.btn-primary {
  font-size:.76rem; font-weight:500; letter-spacing:.06em; text-transform:uppercase;
  color:#fff; background:var(--amber); border:none; padding:.75rem 2rem;
  cursor:pointer; transition:background .2s; font-family:var(--sans); border-radius:2px;
}
.btn-primary:hover { background:var(--amber-d); }
.btn-ghost {
  font-size:.76rem; font-weight:500; letter-spacing:.06em; text-transform:uppercase;
  color:var(--dark); background:rgba(255,255,255,.45); border:1.5px solid rgba(26,26,46,.22);
  padding:.75rem 1.75rem; cursor:pointer; transition:all .2s; font-family:var(--sans);
  border-radius:2px; display:flex; align-items:center; gap:.5rem;
}
.btn-ghost:hover { background:rgba(255,255,255,.7); }

.pillars-bar {
  background:var(--dark); padding:1.1rem 2rem;
  display:flex; gap:1.5rem; flex-wrap:wrap; justify-content:center;
}
.pillar-chip {
  font-size:.66rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase;
  padding:.3rem 1rem; border:1.5px solid rgba(110,207,190,.22); color:var(--muted);
  cursor:pointer; transition:all .2s; background:none; font-family:var(--sans); border-radius:99px;
}
.pillar-chip:hover,.pillar-chip.active { border-color:var(--teal); color:var(--teal); }

.page { max-width:1060px; margin:0 auto; padding:4rem 2rem; }
.sec-label { font-size:.62rem; font-weight:500; letter-spacing:.16em; text-transform:uppercase; color:var(--teal-d); margin-bottom:.85rem; }

.featured-wrap {
  border:1.5px solid var(--teal-dim); background:#fff;
  padding:2.5rem; cursor:pointer; transition:border-color .2s; margin-bottom:3.5rem;
  border-radius:4px; display:flex; gap:2.5rem; align-items:flex-start;
}
.featured-wrap:hover { border-color:var(--teal); }
.feat-accent { width:5px; flex-shrink:0; background:var(--amber); border-radius:3px; align-self:stretch; }
.card-meta { display:flex; gap:.6rem; align-items:center; margin-bottom:1rem; flex-wrap:wrap; }
.card-cat { font-size:.61rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--teal-d); background:var(--teal-dim); padding:.2rem .6rem; border-radius:2px; }
.card-pillar { font-size:.69rem; color:var(--muted); }
.card-date { font-size:.67rem; color:var(--slate); margin-left:auto; }
.card-title { font-family:var(--serif); font-size:1.65rem; font-weight:400; line-height:1.25; color:var(--dark); margin-bottom:.8rem; }
.card-excerpt { font-size:.89rem; font-weight:300; line-height:1.75; color:var(--mid); }
.card-footer { margin-top:1.5rem; display:flex; align-items:center; }
.read-time { font-size:.67rem; color:var(--slate); }
.card-arrow { margin-left:auto; font-size:.69rem; color:var(--amber-d); letter-spacing:.06em; text-transform:uppercase; font-weight:500; }

.posts-list { border-top:1.5px solid var(--teal-dim); }
.post-row {
  display:grid; grid-template-columns:7rem 1fr 8rem 5.5rem;
  align-items:center; gap:2rem; padding:1.2rem 0;
  border-bottom:1px solid var(--teal-dim); cursor:pointer; transition:all .18s;
}
.post-row:hover { padding-left:.6rem; background:rgba(110,207,190,.04); }
.post-row:hover .post-title { color:var(--teal-d); }
.post-date-col { font-size:.69rem; color:var(--slate); }
.post-title { font-family:var(--serif); font-size:1rem; color:var(--dark2); line-height:1.3; transition:color .18s; }
.post-cat-col { font-size:.61rem; color:var(--teal-d); text-align:right; letter-spacing:.06em; text-transform:uppercase; }
.post-time-col { font-size:.67rem; color:var(--slate); text-align:right; }

.article-page { max-width:700px; margin:0 auto; padding:4rem 2rem; }
.back-btn {
  font-size:.71rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase;
  color:var(--muted); background:none; border:none; cursor:pointer; transition:color .2s;
  font-family:var(--sans); display:flex; align-items:center; gap:.4rem; margin-bottom:3rem;
}
.back-btn:hover { color:var(--dark); }
.a-eyebrow { display:flex; gap:.75rem; align-items:center; margin-bottom:1.5rem; }
.a-title { font-family:var(--serif); font-size:clamp(1.8rem,4vw,2.55rem); font-weight:400; line-height:1.2; color:var(--dark); margin-bottom:1.5rem; }
.a-meta { display:flex; gap:2.5rem; padding:1.2rem 0; border-top:1.5px solid var(--teal-dim); border-bottom:1.5px solid var(--teal-dim); margin-bottom:2.5rem; }
.a-meta-item { font-size:.71rem; color:var(--mid); }
.a-meta-item strong { display:block; color:var(--muted); margin-bottom:.2rem; font-weight:500; font-size:.59rem; letter-spacing:.1em; text-transform:uppercase; }
.a-body { font-size:1.01rem; font-weight:300; line-height:1.9; color:var(--dark2); }
.a-body p { margin-bottom:1.6rem; }
.sub-btn {
  display:inline-flex; align-items:center; gap:.6rem; margin-top:2.5rem;
  font-size:.73rem; font-weight:500; letter-spacing:.06em; text-transform:uppercase;
  color:#fff; background:var(--teal-d); border:none; padding:.8rem 1.75rem;
  cursor:pointer; font-family:var(--sans); border-radius:2px; transition:background .2s;
}
.sub-btn:hover { background:var(--teal); }

.about-page { max-width:840px; margin:0 auto; padding:4rem 2rem; }
.about-grid { display:grid; grid-template-columns:210px 1fr; gap:4rem; align-items:start; }
.avatar {
  width:100%; aspect-ratio:1; background:var(--teal-dim);
  border:3px solid var(--amber); border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-family:var(--serif); font-size:3.2rem; color:var(--teal-d);
}
.about-name { font-family:var(--serif); font-size:2rem; color:var(--dark); margin-bottom:.4rem; }
.about-role { font-size:.7rem; color:var(--teal-d); letter-spacing:.12em; text-transform:uppercase; font-weight:500; margin-bottom:1.75rem; }
.about-bio { font-size:.94rem; font-weight:300; line-height:1.85; color:var(--mid); margin-bottom:1.25rem; }
.social-row { display:flex; gap:.75rem; margin-top:2rem; flex-wrap:wrap; }
.soc-btn {
  font-size:.67rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase;
  color:var(--mid); border:1.5px solid var(--teal-dim); padding:.4rem .9rem;
  cursor:pointer; transition:all .2s; background:none; font-family:var(--sans); border-radius:2px;
}
.soc-btn:hover { border-color:var(--teal); color:var(--teal-d); }
.cred-wrap { margin-top:2.5rem; border-top:1.5px solid var(--teal-dim); padding-top:2rem; }
.cred-row { display:flex; gap:1rem; padding:.85rem 0; border-bottom:1px solid var(--teal-dim); }
.cred-yr { font-size:.67rem; color:var(--slate); width:3.5rem; flex-shrink:0; padding-top:.2rem; }
.cred-t { font-size:.87rem; font-weight:500; color:var(--dark2); }
.cred-s { font-size:.79rem; color:var(--muted); margin-top:.2rem; font-weight:300; }

.crm-page { max-width:1100px; margin:0 auto; padding:3rem 2rem; }
.crm-hdr { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:2rem; }
.crm-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:1rem; margin-bottom:2.5rem; }
.stat-box { background:#fff; border:1.5px solid var(--teal-dim); padding:1.2rem 1.5rem; border-radius:4px; }
.stat-n { font-family:var(--serif); font-size:2rem; color:var(--dark); font-weight:400; }
.stat-l { font-size:.61rem; color:var(--muted); letter-spacing:.1em; text-transform:uppercase; margin-top:.2rem; }
.tbl-wrap { background:#fff; border:1.5px solid var(--teal-dim); border-radius:4px; overflow:auto; }
.tbl { width:100%; border-collapse:collapse; }
.tbl th { font-size:.61rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); font-weight:500; text-align:left; padding:.85rem 1rem; border-bottom:1.5px solid var(--teal-dim); white-space:nowrap; }
.tbl td { font-size:.83rem; padding:.85rem 1rem; border-bottom:1px solid rgba(110,207,190,.12); color:var(--mid); vertical-align:middle; }
.tbl tr:last-child td { border-bottom:none; }
.tbl tr:hover td { background:rgba(110,207,190,.04); }
.td-title { color:var(--dark2); font-family:var(--serif); font-size:.94rem; }
.spill { font-size:.58rem; font-weight:500; letter-spacing:.08em; text-transform:uppercase; padding:.2rem .55rem; border-radius:99px; }
.s-pub { color:#2D7A5F; background:#D4F0E8; }
.s-dra { color:#8A5E1A; background:#FAE8C0; }
.act { font-size:.61rem; color:var(--teal-d); cursor:pointer; background:none; border:none; font-family:var(--sans); font-weight:500; letter-spacing:.06em; text-transform:uppercase; padding:.2rem .4rem; transition:color .18s; }
.act:hover { color:var(--dark); }
.act-del { color:#C0392B; }
.act-del:hover { color:#E74C3C; }

.overlay { position:fixed; inset:0; background:rgba(26,26,46,.62); z-index:200; display:flex; align-items:center; justify-content:center; padding:2rem; }
.modal { background:#fff; border-top:4px solid var(--amber); width:100%; max-width:660px; max-height:90vh; overflow-y:auto; padding:2.25rem; border-radius:4px; }
.modal-ttl { font-family:var(--serif); font-size:1.4rem; color:var(--dark); margin-bottom:1.75rem; }
.modal-sec { font-size:.61rem; font-weight:500; letter-spacing:.14em; text-transform:uppercase; color:var(--teal-d); margin:1.75rem 0 1rem; padding-bottom:.4rem; border-bottom:1px solid var(--teal-dim); }
.fg { margin-bottom:1.1rem; }
.fl { font-size:.61rem; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); display:block; margin-bottom:.4rem; }
.fi,.fs,.ft { width:100%; background:var(--off); border:1.5px solid var(--teal-dim); color:var(--dark); padding:.6rem .8rem; font-size:.87rem; font-family:var(--sans); transition:border-color .2s; outline:none; border-radius:2px; }
.fi:focus,.fs:focus,.ft:focus { border-color:var(--teal); }
.ft { resize:vertical; min-height:90px; }
.fs option { background:#fff; }
.frow { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
.fcheck { display:flex; align-items:center; gap:.6rem; }
.fcheck input { accent-color:var(--teal-d); width:14px; height:14px; }
.fcheck label { font-size:.82rem; color:var(--mid); cursor:pointer; }
.hint { font-size:.7rem; color:var(--muted); margin-top:.3rem; font-weight:300; }
.cc { font-size:.64rem; text-align:right; margin-top:.25rem; color:var(--slate); }
.cc-warn { color:#C0392B; }
.serp-preview { background:var(--off); border:1.5px solid var(--teal-dim); padding:1rem 1.25rem; border-radius:4px; margin-top:.75rem; }
.serp-url { font-size:.71rem; color:#1A6334; margin-bottom:.2rem; }
.serp-t { font-size:.95rem; color:#1558D6; font-weight:500; }
.serp-d { font-size:.77rem; color:var(--mid); margin-top:.2rem; line-height:1.5; }
.mf { display:flex; gap:.75rem; justify-content:flex-end; margin-top:1.75rem; border-top:1px solid var(--teal-dim); padding-top:1.5rem; }
.btn-save { font-size:.71rem; font-weight:500; letter-spacing:.06em; text-transform:uppercase; color:#fff; background:var(--teal-d); border:none; padding:.6rem 1.5rem; cursor:pointer; font-family:var(--sans); border-radius:2px; transition:background .2s; }
.btn-save:hover { background:var(--teal); }
.btn-save:disabled { opacity:.4; cursor:not-allowed; }
.btn-cancel { font-size:.71rem; font-weight:500; letter-spacing:.06em; text-transform:uppercase; color:var(--mid); background:none; border:1.5px solid var(--teal-dim); padding:.6rem 1.5rem; cursor:pointer; font-family:var(--sans); border-radius:2px; transition:all .2s; }
.btn-cancel:hover { border-color:var(--teal); color:var(--dark); }

footer { background:var(--dark); border-top:3px solid var(--amber); padding:2.5rem 2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; }
.ft-logo { font-family:var(--serif); font-size:1rem; color:var(--teal); }
.ft-copy { font-size:.69rem; color:var(--slate-d); }
.ft-links { display:flex; gap:1rem; }
.ft-l { font-size:.67rem; color:var(--slate); cursor:pointer; background:none; border:none; font-family:var(--sans); transition:color .2s; text-transform:uppercase; letter-spacing:.06em; font-weight:500; }
.ft-l:hover { color:var(--teal); }

@media(max-width:680px){
  .about-grid{grid-template-columns:1fr;}
  .frow{grid-template-columns:1fr;}
  .crm-stats{grid-template-columns:1fr 1fr;}
  .post-row{grid-template-columns:1fr;gap:.15rem;}
  .post-cat-col,.post-time-col,.post-date-col{display:none;}
  .featured-wrap{flex-direction:column;gap:1.25rem;}
}
`;

const PILLARS = ["Technical PR Bridge","Trusted Advisor","Data-Led Strategy"];
const CATS = ["AI & Search","Client Management","Strategy & Commercial","Agency Life","Career & Growth"];

const SEED = [
  {
    id:1,title:"Why Most Agencies Are Failing Their Clients on AI Search",
    slug:"agencies-failing-ai-search",
    excerpt:"The shift from traditional search to AI-generated answers isn't a future problem — it's happening now, and most agencies are still selling yesterday's solution.",
    content:"The shift from traditional search to AI-generated answers isn't a future problem — it's happening now, and most agencies are still selling yesterday's solution.\n\nI've spent over a decade sitting across the table from clients who trust their agencies to keep them ahead. Right now, there's a quiet crisis unfolding in those relationships — and most agencies don't even know it's happening.\n\nGoogle's AI Overview, Bing Copilot, and a dozen AI-native discovery tools are fundamentally restructuring how people find answers. The click is dying. The impression is dying. What's replacing it is a synthesised answer, and if your brand isn't in the training data, the citations, or the structured content those systems draw from — you simply don't exist in that moment.\n\nMost agencies are still pitching DA scores and backlink profiles. That's not wrong — it's just incomplete in a way that quietly erodes client trust over time.\n\nThe real failure isn't technical. It's strategic. Agencies have become execution shops when what clients actually need is someone who can translate what's changing into commercial implications they can act on.",
    category:"AI & Search",pillar:"Technical PR Bridge",date:"2025-05-01",readTime:"6 min",
    status:"published",featured:true,substackUrl:"https://jamescodes.substack.com",
    seoTitle:"Why Most Agencies Are Failing Their Clients on AI Search | James Alderman",
    seoDesc:"The shift to AI-generated search answers is happening now, and most agencies are still selling yesterday's solution. Here's what's actually changing.",
    seoKeywords:"AI search, GEO, generative engine optimisation, digital marketing agency, AI overviews",
    ogImage:"",canonicalUrl:"",
  },
  {
    id:2,title:"The Trusted Advisor vs The Account Manager: A Career-Defining Distinction",
    slug:"trusted-advisor-vs-account-manager",
    excerpt:"There's a difference between managing an account and genuinely partnering with a client. After 11 years in agency-side relationships, I can tell you most people never cross that line.",
    content:"There's a difference between managing an account and genuinely partnering with a client. After 11 years in agency-side relationships, I can tell you most people never cross that line.\n\nThe account manager asks: what does the brief say?\nThe trusted advisor asks: what does the business actually need?\n\nIt sounds simple. It isn't. Becoming a trusted advisor requires you to absorb commercial risk, push back on bad briefs, and sometimes say things clients don't want to hear — all while maintaining the relationship that makes those conversations possible.\n\nI've worked with clients across B2B technology, professional services, and consumer sectors. The ones who brought me into boardroom conversations — not just quarterly reviews — were the ones where I'd earned the right to have a point of view that went beyond deliverables.\n\nHow do you get there? You stop reporting outputs and start framing outcomes. You connect performance data to the P&L. You think one quarter ahead of what they've asked for. And you never, ever hide behind the agency.",
    category:"Client Management",pillar:"Trusted Advisor",date:"2025-04-18",readTime:"5 min",
    status:"published",featured:false,substackUrl:"https://jamescodes.substack.com",
    seoTitle:"Trusted Advisor vs Account Manager | James Alderman",
    seoDesc:"After 11 years in agency relationships, here's the career-defining difference between managing an account and truly partnering with a client.",
    seoKeywords:"trusted advisor, key account management, client relationships, agency career",
    ogImage:"",canonicalUrl:"",
  },
  {
    id:3,title:"GEO Is Not SEO: Why the Metrics You're Reporting Don't Tell the Full Story",
    slug:"geo-is-not-seo",
    excerpt:"Generative Engine Optimisation requires a completely different measurement framework. Here's what I track instead.",
    content:"Generative Engine Optimisation requires a completely different measurement framework. Here's what I'm tracking instead.\n\nWhen I talk to clients about GEO, the first question is always: 'how do we measure it?' And that's exactly the right question — because the old metrics don't transfer cleanly.\n\nClick-through rate? Irrelevant when there's no blue link. Keyword ranking? Meaningless when the answer is synthesised. Domain authority? Helpful for context, not causation.\n\nWhat actually matters in a GEO world is citation frequency — are you being referenced by the AI systems your audience uses? Entity clarity — does the model understand who you are, what you do, and who you serve? And structured content coverage — do you have clear, authoritative answers to the specific questions your audience is actually asking?\n\nThis isn't just a technical problem. It's a content strategy problem, a PR problem, and a brand positioning problem all at once. The agencies that figure this out first will build an enormous competitive moat.",
    category:"AI & Search",pillar:"Data-Led Strategy",date:"2025-04-05",readTime:"7 min",
    status:"published",featured:false,substackUrl:"https://jamescodes.substack.com",
    seoTitle:"GEO Is Not SEO: A New Measurement Framework | James Alderman",
    seoDesc:"Generative Engine Optimisation needs completely different metrics. Here's what to track instead of rankings and click-through rates.",
    seoKeywords:"GEO, generative engine optimisation, SEO metrics, AI search measurement",
    ogImage:"",canonicalUrl:"",
  },
];

const BLANK = {
  title:"",slug:"",excerpt:"",content:"",category:CATS[0],pillar:PILLARS[0],
  date:new Date().toISOString().slice(0,10),readTime:"5 min",
  status:"draft",featured:false,substackUrl:"",
  seoTitle:"",seoDesc:"",seoKeywords:"",ogImage:"",canonicalUrl:"",
};

const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
const fmtDate = d => new Date(d).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
const SubIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>;

// ── Change this to your own password ────────────────────────────────────────
const CRM_PASSWORD = "strategylab25";
// To access the CRM: click the logo 5 times quickly, then enter the password.
// The CRM tab is invisible to all other visitors.
// ────────────────────────────────────────────────────────────────────────────

export default function Blog() {
  const [page, setPage] = useState("home");
  const [posts, setPosts] = useState(SEED);
  const [activePost, setActivePost] = useState(null);
  const [pillar, setPillar] = useState(null);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);

  // CRM auth state
  const [crmUnlocked, setCrmUnlocked] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimer = useState(null);

  // Secret unlock: click logo 5 times quickly
  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    clearTimeout(logoClickTimer[0]);
    logoClickTimer[0] = setTimeout(() => setLogoClicks(0), 2000);
    if (next >= 5) {
      setLogoClicks(0);
      if (crmUnlocked) { go("crm"); } else { setShowLogin(true); setPwInput(""); setPwError(false); }
    } else {
      go("home");
    }
  };

  const submitPassword = () => {
    if (pwInput === CRM_PASSWORD) {
      setCrmUnlocked(true);
      setShowLogin(false);
      go("crm");
    } else {
      setPwError(true);
      setPwInput("");
    }
  };

  const lockCrm = () => { setCrmUnlocked(false); go("home"); };

  const pub = posts.filter(p => p.status === "published");
  const filtered = pillar ? pub.filter(p => p.pillar === pillar) : pub;
  const feat = filtered.find(p => p.featured) || filtered[0];
  const rest = filtered.filter(p => p !== feat);

  const go = p => { setPage(p); setActivePost(null); window.scrollTo(0,0); };
  const read = post => { setActivePost(post); setPage("article"); window.scrollTo(0,0); };
  const newPost = () => { setEditing(null); setForm(BLANK); setModal(true); };
  const editPost = post => { setEditing(post); setForm({...post}); setModal(true); };
  const uf = (k,v) => setForm(f => ({...f,[k]:v,...(k==="title"&&!editing?{slug:slugify(v)}:{})}));

  const save = () => {
    const d = {
      ...form,
      slug: form.slug || slugify(form.title),
      seoTitle: form.seoTitle || form.title+" | James Alderman",
      seoDesc: form.seoDesc || form.excerpt,
    };
    if (editing) {
      const updated = posts.map(p => p.id===editing.id ? {...d,id:editing.id} : p);
      setPosts(updated);
      if (activePost?.id===editing.id) setActivePost({...d,id:editing.id});
    } else {
      setPosts(prev=>[...prev,{...d,id:Date.now()}]);
    }
    setModal(false);
  };

  const del = id => { if(window.confirm("Delete this post?")) setPosts(posts.filter(p=>p.id!==id)); };

  const stl = (form.seoTitle||form.title).length;
  const sdl = (form.seoDesc||form.excerpt).length;

  return (
    <>
      <style>{FONTS}</style>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={handleLogoClick} style={{cursor:"pointer",userSelect:"none"}}>James <span>Alderman</span></div>
        <div className="nav-links">
          {[["home","Writing"],["about","About"]].map(([k,l])=>(
            <button key={k} className={`nav-link${(page===k||(page==="article"&&k==="home"))?" active":""}`} onClick={()=>go(k)}>{l}</button>
          ))}
          {crmUnlocked && <>
            <button className={`nav-link${page==="crm"?" active":""}`} onClick={()=>go("crm")}>CRM</button>
            <button className="nav-link" onClick={lockCrm} style={{color:"var(--amber-d)"}}>Lock</button>
          </>}
          <button className="nav-cta" onClick={()=>window.open("https://jamescodes.substack.com","_blank")}>Subscribe</button>
        </div>
      </nav>

      {/* HOME */}
      {page==="home" && <>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-eyebrow">Digital Strategist · AI-Driven Visibility · Account Growth</div>
            <h1 className="hero-title">Where <em>strategy</em> meets<br/>the mechanics of the web</h1>
            <p className="hero-sub">11+ years in digital marketing agencies. Writing about what ACTUALLY happens behind the decisions, performance data, and the client relationships — and what it all means for AI-driven visibility.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={()=>document.getElementById("writing")?.scrollIntoView({behavior:"smooth"})}>Read the latest</button>
              <button className="btn-ghost" onClick={()=>window.open("https://jamescodes.substack.com","_blank")}><SubIcon /> Follow on Substack</button>
            </div>
          </div>
        </section>

        <div className="pillars-bar">
          {[["All",null],...PILLARS.map(p=>[p,p])].map(([l,v])=>(
            <button key={l} className={`pillar-chip${pillar===v?" active":""}`} onClick={()=>setPillar(v)}>{l}</button>
          ))}
        </div>

        <div className="page" id="writing">
          {filtered.length===0
            ? <p style={{color:"var(--muted)",textAlign:"center",padding:"4rem 0"}}>No posts in this pillar yet.</p>
            : <>
              {feat && <>
                <p className="sec-label">Featured</p>
                <div className="featured-wrap" onClick={()=>read(feat)}>
                  <div className="feat-accent"/>
                  <div style={{flex:1}}>
                    <div className="card-meta">
                      <span className="card-cat">{feat.category}</span>
                      <span className="card-pillar">{feat.pillar}</span>
                      <span className="card-date">{fmtDate(feat.date)}</span>
                    </div>
                    <h2 className="card-title">{feat.title}</h2>
                    <p className="card-excerpt">{feat.excerpt}</p>
                    <div className="card-footer">
                      <span className="read-time">{feat.readTime} read</span>
                      <span className="card-arrow">Read →</span>
                    </div>
                  </div>
                </div>
              </>}
              {rest.length>0 && <>
                <p className="sec-label" style={{marginTop:"2rem"}}>All Posts</p>
                <div className="posts-list">
                  {rest.map(p=>(
                    <div key={p.id} className="post-row" onClick={()=>read(p)}>
                      <span className="post-date-col">{fmtDate(p.date)}</span>
                      <span className="post-title">{p.title}</span>
                      <span className="post-cat-col">{p.category}</span>
                      <span className="post-time-col">{p.readTime}</span>
                    </div>
                  ))}
                </div>
              </>}
            </>
          }
        </div>
      </>}

      {/* ARTICLE */}
      {page==="article" && activePost && (
        <div className="article-page">
          <button className="back-btn" onClick={()=>go("home")}>← Back to writing</button>
          <div className="a-eyebrow">
            <span className="card-cat">{activePost.category}</span>
            <span className="card-pillar">{activePost.pillar}</span>
          </div>
          <h1 className="a-title">{activePost.title}</h1>
          <div className="a-meta">
            <div className="a-meta-item"><strong>Published</strong>{fmtDate(activePost.date)}</div>
            <div className="a-meta-item"><strong>Read time</strong>{activePost.readTime}</div>
            <div className="a-meta-item"><strong>Pillar</strong>{activePost.pillar}</div>
          </div>
          <div className="a-body">{activePost.content.split("\n\n").map((p,i)=><p key={i}>{p}</p>)}</div>
          {activePost.substackUrl && (
            <button className="sub-btn" onClick={()=>window.open(activePost.substackUrl,"_blank")}>
              <SubIcon /> Read on Substack & subscribe
            </button>
          )}
          <div style={{marginTop:"2rem"}}>
            <button className="btn-cancel" onClick={()=>editPost(activePost)} style={{fontSize:".68rem"}}>Edit this post</button>
          </div>
        </div>
      )}

      {/* ABOUT */}
      {page==="about" && (
        <div className="about-page">
          <div className="about-grid">
            <div>
              <div className="avatar" style={{padding:0,overflow:"hidden",background:"none"}}>
                <img
                  src="https://substackcdn.com/image/fetch/$s_!Np-V!,w_400,h_400,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe962542e-2165-46f3-94fd-73f4ff8fa69f_800x800.png"
                  alt="James Alderman"
                  style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",display:"block"}}
                />
              </div>
              <div className="social-row">
                {[["LinkedIn","https://www.linkedin.com/in/jamespalderman/"],["X / Twitter","https://x.com/JamesDoesGrowth"],["Instagram","https://www.instagram.com/jamesdoesmarketing/"],["Substack","https://jamescodes.substack.com"],["GitHub","https://github.com/JAldo1980"]].map(([l,u])=>(
                  <button key={l} className="soc-btn" onClick={()=>window.open(u,"_blank")}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <h1 className="about-name">James Alderman</h1>
              <p className="about-role">Digital Strategist · AI Visibility · Account Growth</p>
              <p className="about-bio">I work at the intersection of technical execution and commercial strategy. After 11+ years in digital marketing agencies, I've sat on both sides of the table: managing complex client portfolios, building data-led performance strategies, and translating what the algorithm is doing into language that means something to a business.</p>
              <p className="about-bio">My current focus is the evolution of search — specifically GEO (Generative Engine Optimisation), AI Overviews, and AI-driven discovery. Most brands and agencies are still measuring yesterday's game. I write about what's actually changing, and what to do about it.</p>
              <p className="about-bio">This isn't thought leadership for its own sake. It's practitioner thinking — written from inside the agency world, with real context about what makes clients trust you, what makes strategies land, and what's being quietly missed.</p>
              <div className="cred-wrap">
                <p className="sec-label" style={{marginBottom:"1.25rem"}}>Experience</p>
                {[
                  ["Now","Senior Account Manager — Extramile Digital","B2B digital marketing, key account management, GEO & AI search strategy"],
                  ["11+ yrs","Digital Marketing Agencies","SEO, paid media, data-led strategy, client leadership & commercial growth"],
                  ["Focus","GEO & AI-Driven Search","AI Overviews, AI Mode, generative discovery, strategic communication"],
                  ["Edu","University of Leeds",""],
                ].map(([y,t,s])=>(
                  <div key={y} className="cred-row">
                    <span className="cred-yr">{y}</span>
                    <div><p className="cred-t">{t}</p>{s&&<p className="cred-s">{s}</p>}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRM */}
      {page==="crm" && (
        <div className="crm-page">
          <div className="crm-hdr">
            <div>
              <p className="sec-label">Content Management</p>
              <h2 style={{fontFamily:"var(--serif)",fontSize:"1.6rem",color:"var(--dark)",fontWeight:400}}>Post CRM</h2>
            </div>
            <button className="btn-primary" onClick={newPost}>+ New Post</button>
          </div>
          <div className="crm-stats">
            {[["Total Posts",posts.length],["Published",posts.filter(p=>p.status==="published").length],["Drafts",posts.filter(p=>p.status==="draft").length],["Active Pillars",[...new Set(posts.map(p=>p.pillar))].length]].map(([l,n])=>(
              <div key={l} className="stat-box"><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
            ))}
          </div>
          <div className="tbl-wrap">
            <table className="tbl">
              <thead><tr><th>Title</th><th>Pillar</th><th>Category</th><th>Date</th><th>SEO</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {posts.map(p=>(
                  <tr key={p.id}>
                    <td className="td-title" style={{maxWidth:250}}>{p.title}</td>
                    <td>{p.pillar}</td><td>{p.category}</td>
                    <td style={{whiteSpace:"nowrap"}}>{fmtDate(p.date)}</td>
                    <td>{p.seoTitle?<span style={{color:"#2D7A5F",fontSize:".7rem"}}>✓ Set</span>:<span style={{color:"var(--muted)",fontSize:".7rem"}}>—</span>}</td>
                    <td><span className={`spill s-${p.status==="published"?"pub":"dra"}`}>{p.status}</span></td>
                    <td style={{whiteSpace:"nowrap"}}>
                      <button className="act" onClick={()=>editPost(p)}>Edit</button>
                      <button className="act" onClick={()=>read(p)}>View</button>
                      <button className="act act-del" onClick={()=>del(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="ft-logo">James Alderman</div>
        <div className="ft-copy">© 2025 · Digital Strategist · AI-Driven Visibility</div>
        <div className="ft-links">
          {[["X","https://x.com/JamesDoesGrowth"],["LinkedIn","https://www.linkedin.com/in/jamespalderman/"],["Instagram","https://www.instagram.com/jamesdoesmarketing/"],["Substack","https://jamescodes.substack.com"]].map(([l,u])=>(
            <button key={l} className="ft-l" onClick={()=>window.open(u,"_blank")}>{l}</button>
          ))}
        </div>
      </footer>

      {/* MODAL */}
      {modal && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div className="modal">
            <h2 className="modal-ttl">{editing?"Edit Post":"New Post"}</h2>

            <p className="modal-sec">Content</p>
            <div className="fg"><label className="fl">Title *</label><input className="fi" value={form.title} onChange={e=>uf("title",e.target.value)} placeholder="Post title..."/></div>
            <div className="frow">
              <div className="fg"><label className="fl">Slug</label><input className="fi" value={form.slug} onChange={e=>uf("slug",e.target.value)} placeholder="auto-generated"/></div>
              <div className="fg"><label className="fl">Date</label><input className="fi" type="date" value={form.date} onChange={e=>uf("date",e.target.value)}/></div>
            </div>
            <div className="frow">
              <div className="fg"><label className="fl">Pillar</label><select className="fs" value={form.pillar} onChange={e=>uf("pillar",e.target.value)}>{PILLARS.map(p=><option key={p}>{p}</option>)}</select></div>
              <div className="fg"><label className="fl">Category</label><select className="fs" value={form.category} onChange={e=>uf("category",e.target.value)}>{CATS.map(c=><option key={c}>{c}</option>)}</select></div>
            </div>
            <div className="frow">
              <div className="fg"><label className="fl">Read Time</label><input className="fi" value={form.readTime} onChange={e=>uf("readTime",e.target.value)} placeholder="5 min"/></div>
              <div className="fg"><label className="fl">Status</label><select className="fs" value={form.status} onChange={e=>uf("status",e.target.value)}><option>draft</option><option>published</option></select></div>
            </div>
            <div className="fg"><label className="fl">Excerpt</label><textarea className="ft" style={{minHeight:70}} value={form.excerpt} onChange={e=>uf("excerpt",e.target.value)} placeholder="Short description for the listing..."/></div>
            <div className="fg"><label className="fl">Content (separate paragraphs with blank lines)</label><textarea className="ft" style={{minHeight:180}} value={form.content} onChange={e=>uf("content",e.target.value)} placeholder="Your full article content..."/></div>
            <div className="fg"><label className="fl">Substack URL (optional)</label><input className="fi" value={form.substackUrl} onChange={e=>uf("substackUrl",e.target.value)} placeholder="https://jamescodes.substack.com/p/..."/></div>
            <div className="fcheck">
              <input type="checkbox" id="feat" checked={form.featured} onChange={e=>uf("featured",e.target.checked)}/>
              <label htmlFor="feat">Feature this post at the top</label>
            </div>

            <p className="modal-sec">SEO & Metadata</p>

            <div className="fg">
              <label className="fl">SEO Title</label>
              <input className="fi" value={form.seoTitle} onChange={e=>uf("seoTitle",e.target.value)} placeholder={`${form.title||"Post Title"} | James Alderman`}/>
              <div className={`cc${stl>60?" cc-warn":""}`}>{stl}/60 chars {stl>60?"⚠ too long — Google will truncate":stl>=50?"✓ good length":""}</div>
            </div>
            <div className="fg">
              <label className="fl">Meta Description</label>
              <textarea className="ft" style={{minHeight:70}} value={form.seoDesc} onChange={e=>uf("seoDesc",e.target.value)} placeholder="Compelling description for search results (150–160 chars)..."/>
              <div className={`cc${sdl>160?" cc-warn":""}`}>{sdl}/160 chars {sdl>160?"⚠ too long":sdl>=140?"✓ ideal range":sdl>=100?"↑ could be longer":""}</div>
            </div>
            <div className="fg">
              <label className="fl">Focus Keywords (comma-separated)</label>
              <input className="fi" value={form.seoKeywords} onChange={e=>uf("seoKeywords",e.target.value)} placeholder="AI search, GEO, digital strategy..."/>
              <p className="hint">Use as a writing reference — Google ignores meta keywords tags, but keeping them here helps you stay on-topic.</p>
            </div>
            <div className="frow">
              <div className="fg">
                <label className="fl">OG / Social Image URL</label>
                <input className="fi" value={form.ogImage} onChange={e=>uf("ogImage",e.target.value)} placeholder="https://..."/>
                <p className="hint">Shown when shared on LinkedIn, X, etc. 1200×630px recommended.</p>
              </div>
              <div className="fg">
                <label className="fl">Canonical URL</label>
                <input className="fi" value={form.canonicalUrl} onChange={e=>uf("canonicalUrl",e.target.value)} placeholder="Leave blank if this is the original"/>
                <p className="hint">Set if this post first appeared on Substack — prevents duplicate content issues.</p>
              </div>
            </div>

            {(form.seoTitle||form.title) && (
              <>
                <p className="fl" style={{marginTop:"1rem"}}>Live SERP Preview</p>
                <div className="serp-preview">
                  <div className="serp-url">jamesalderman.co.uk/{form.slug||"your-post-slug"}</div>
                  <div className="serp-t">{form.seoTitle||(form.title+" | James Alderman")}</div>
                  <div className="serp-d">{form.seoDesc||form.excerpt||"No meta description set yet — add one above."}</div>
                </div>
              </>
            )}

            <div className="mf">
              <button className="btn-cancel" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn-save" onClick={save} disabled={!form.title}>{editing?"Save Changes":"Add Post"}</button>
            </div>
          </div>
        </div>
      )}

      {/* CRM LOGIN MODAL */}
      {showLogin && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setShowLogin(false)}>
          <div className="modal" style={{maxWidth:380,padding:"2rem"}}>
            <div style={{textAlign:"center",marginBottom:"1.5rem"}}>
              <div style={{fontFamily:"var(--serif)",fontSize:"1.4rem",color:"var(--dark)",marginBottom:".3rem"}}>CRM Access</div>
              <div style={{fontSize:".75rem",color:"var(--muted)"}}>Enter your passphrase to continue</div>
            </div>
            <div className="fg">
              <label className="fl">Passphrase</label>
              <input
                className="fi"
                type="password"
                value={pwInput}
                onChange={e=>{setPwInput(e.target.value);setPwError(false);}}
                onKeyDown={e=>e.key==="Enter"&&submitPassword()}
                placeholder="••••••••••••"
                autoFocus
                style={pwError?{borderColor:"#C0392B"}:{}}
              />
              {pwError && <p style={{fontSize:".72rem",color:"#C0392B",marginTop:".35rem"}}>Incorrect passphrase — try again.</p>}
            </div>
            <div className="mf" style={{marginTop:"1.25rem"}}>
              <button className="btn-cancel" onClick={()=>setShowLogin(false)}>Cancel</button>
              <button className="btn-save" onClick={submitPassword} disabled={!pwInput}>Unlock CRM →</button>
            </div>
            <p style={{fontSize:".65rem",color:"var(--muted)",textAlign:"center",marginTop:"1rem"}}>
              Hint: click the logo 5× to open this again.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
