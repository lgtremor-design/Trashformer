// TRASHFORMERS - From Waste to Worth
// Everything lives in this one file. Sections, top to bottom:
//   1. Data   2. Demo state   3. Components   4. Pages   5. CSS   6. App + routes
import { createContext, useContext, useEffect, useState } from 'react';
import { HashRouter, Routes, Route, NavLink, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftRight, ArrowRight, BadgeCheck, CalendarDays, Check, CheckCircle2, Circle, Clock, Coins, Eye, Gift, HandHeart, Handshake, ImageOff, ImagePlus, LayoutDashboard, LogOut, MapPin, Menu, MessageCircle, Palette, Plus, Recycle, ShoppingBag, Store, Target, Ticket, Trophy, User, UserPlus, X, XCircle, icons } from 'lucide-react';

// ======================================================================
// DATA: Festival info (EDIT date / municipality / venue here)
// ======================================================================

// EDIT HERE: festival date, municipality and venue are used across the whole site.
const festivalInfo = {
  date: 'Date to be announced (during school break)',
  municipality: 'Your Municipality',
  venue: 'Municipal Gymnasium',
  fee: 'Free admission',
};

const days = [
  { day: 1, title: 'Collect & Discover', icon: 'Recycle', summary: 'Collect and sort reusable materials while discovering the possibilities of upcycling.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=85&fit=crop', imageAlt: 'Community recycling and sorting activity',
    items: ['Opening program and festival orientation', 'Collection and sorting of recyclable materials', 'Environmental awareness activities and demonstrations', 'Upcycling workshops and creative discovery'] },
  { day: 2, title: 'Create & Experiment', icon: 'Palette', summary: 'Turn collected materials into original artworks with guidance from local artists and facilitators.',
    image: 'images/festival-day2.jpg', imageAlt: 'Participants working together in a creative workshop',
    items: ['Create artworks using the collected recyclable materials', 'Explore different techniques and experiment with materials', 'Receive guidance from local artists and facilitators', 'Share ideas and collaborate with fellow participants'] },
  { day: 3, title: 'Exhibit, Award & Exchange', icon: 'Store', summary: 'Celebrate completed artworks through a public exhibition, awards, and a community art exchange.',
    image: 'images/festival-day3.jpg', imageAlt: 'Artwork displayed in an exhibition space',
    items: ['Public exhibition of completed artworks', 'Judging and evaluation of festival entries', 'Awarding ceremony and TrashPoints recognition', 'Art exchange and marketplace activities', 'Closing program and pledge to reuse'] },
];

const activities = [
  { icon: 'Wrench', title: 'Upcycling workshops', text: 'Guided sessions on turning plastics, textiles, wood, and metal into new pieces.' },
  { icon: 'Palette', title: 'Community mural', text: 'A collaborative wall piece built from bottle caps and cardboard.' },
  { icon: 'ArrowLeftRight', title: 'Swap and donate corner', text: 'Trade finished pieces and leftover materials with other participants.' },
  { icon: 'Mic', title: 'Talks and demos', text: 'Local makers and environmental groups share practical reuse tips.' },
];

const materials = [
  { icon: 'CupSoda', name: 'Plastic bottles and caps', ok: true },
  { icon: 'Shirt', name: 'Old clothes and fabric scraps', ok: true },
  { icon: 'Package', name: 'Cardboard and paper packaging', ok: true },
  { icon: 'Wine', name: 'Clean glass jars and bottles', ok: true },
  { icon: 'Trees', name: 'Scrap wood and pallets', ok: true },
  { icon: 'Cog', name: 'Metal cans and small hardware', ok: true },
  { icon: 'Biohazard', name: 'Hazardous or medical waste', ok: false },
  { icon: 'FlaskConical', name: 'Chemical containers (used)', ok: false },
];

const criteria = [
  { label: 'Creativity and originality', pct: 30 },
  { label: 'Use of discarded materials', pct: 25 },
  { label: 'Craftsmanship and durability', pct: 20 },
  { label: 'Usefulness or message', pct: 15 },
  { label: 'Presentation', pct: 10 },
];

const awards = [
  { icon: 'Trophy', title: 'Grand Prize', text: 'Best overall artwork. Art supply bundle, trophy made from scrap, and 500 TrashPoints.' },
  { icon: 'Lightbulb', title: 'Most Innovative', text: 'For the cleverest transformation of an unexpected material.' },
  { icon: 'HeartHandshake', title: 'Community Choice', text: 'Voted by festival visitors on Day 3.' },
  { icon: 'Sprout', title: 'Zero-Waste Maker', text: 'For the project with the least new material added.' },
];


// ======================================================================
// DATA: Artworks and photo references
// ======================================================================

// Remote Unsplash images are used for the prototype. An internet connection
// is required for these photos to load. Replace any URL with a local path
// such as 'images/my-artwork.jpg' when you have your own photographs.
const photoUrls = {
  11: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=85&fit=crop',
  12: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=900&q=85&fit=crop',
  13: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=900&q=85&fit=crop',
  14: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=85&fit=crop',
  15: 'https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=900&q=85&fit=crop',
  16: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=85&fit=crop',
  17: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=900&q=85&fit=crop',
  18: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85&fit=crop',
  19: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=900&q=85&fit=crop',
  20: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=85&fit=crop',
  21: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=900&q=85&fit=crop',
  22: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=900&q=85&fit=crop',
  31: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&q=85&fit=crop',
  32: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&q=85&fit=crop',
  33: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=85&fit=crop',
};
const img = (_tags, n) => photoUrls[n] || photoUrls[11];

const artworks = [
  { id: 1, title: 'Bottle-Cap Tide Mural', creator: 'Maria Santos', type: 'sale', style: 'Installation', price: 'PHP 1,800', materials: 'Plastic bottle caps, plywood', img: 'images/bottle-cap-tide-mural.jpg', desc: 'A wall panel of 2,400 sorted bottle caps arranged as ocean waves.' },
  { id: 2, title: 'Tin-Can Lantern Set', creator: 'Jun Reyes', type: 'sale', style: 'Home Decor', price: 'PHP 650', materials: 'Tin cans, wire, LED tea lights', img: 'images/tin-can-lantern-set.jpg', desc: 'Three punched-pattern lanterns that cast star shadows at night.' },
  { id: 3, title: 'Denim Patch Tote', creator: 'Ana Villanueva', type: 'sale', style: 'Wearables', price: 'PHP 420', materials: 'Old jeans, cotton thread', img: 'images/denim-patch-tote.jpg', desc: 'Sturdy shopping tote stitched from retired jeans.' },
  { id: 4, title: 'Pallet Garden Bench', creator: 'Carlo Mendoza', type: 'exchange', style: 'Furniture', price: 'Exchange', want: 'Paint or garden tools', materials: 'Wood pallets,reclaimedscrews.jpg', img: 'images/Wood_pallets,reclaimedscrews.jpg', desc: 'A two-seat bench with a planter box built into the backrest.' },
  { id: 5, title: 'Jar Herb Planters', creator: 'Grade 9 Eco Club', type: 'donation', style: 'Home Decor', price: 'Donation', materials: 'Glass jars, twine, soil', img: 'images/jar-herb-planters.jpg', desc: 'Twelve planters donated to the school canteen and senior center.' },
  { id: 6, title: 'Fabric Scrap Wall Quilt', creator: 'Elena Cruz', type: 'sale', style: 'Installation', price: 'PHP 1,200', materials: 'Textile offcuts, recycled frame', img: 'images/fabric-scrap-wall-quilt.jpg', desc: 'A patchwork wall hanging made from tailor shop remnants.' },
];

const workshopImgs = [
  { img: img('workshop,craft', 31), caption: 'Hands-on upcycling workshop' },
  { img: img('recycling,art', 32), caption: 'Sorting materials at the collect station' },
  { img: img('children,craft', 33), caption: 'Students building together' },
];


// ======================================================================
// DATA: Partners
// ======================================================================

// Potential partners. Contributions are proposals, not confirmed commitments.
const partners = [
  { name: 'Local Government Unit (LGU)', icon: 'Landmark', type: 'Government', gives: ['Municipal Gymnasium venue', 'Permits and security', 'Waste collection support'] },
  { name: 'Department of Education (DepEd)', icon: 'GraduationCap', type: 'Education', gives: ['Student participation', 'Teacher mentors', 'Schedule alignment with school break'] },
  { name: 'DENR / Environmental Office', icon: 'Leaf', type: 'Government', gives: ['Environmental talks', 'Recycling guidance', 'Material safety review'] },
  { name: 'Local Hardware and Paint Shops', icon: 'Hammer', type: 'Business', gives: ['Tools and paint', 'Discounted supplies', 'Prize vouchers'] },
  { name: 'Local Artists Guild', icon: 'Palette', type: 'Community', gives: ['Workshop facilitators', 'Judging panel', 'Mentoring sessions'] },
  { name: 'Barangay Youth Councils', icon: 'HeartHandshake', type: 'Community', gives: ['Volunteers', 'Material collection drives', 'Promotion'] },
  { name: 'Supermarkets and Cafes', icon: 'ShoppingBag', type: 'Business', gives: ['Clean packaging donations', 'Snack sponsorship', 'Reward vouchers'] },
  { name: 'Local Radio and Media', icon: 'Radio', type: 'Media', gives: ['Event announcements', 'Coverage of exhibit day'] },
];
const partnerTypes = ['All', 'Government', 'Education', 'Business', 'Community', 'Media'];


// ======================================================================
// DATA: TrashPoints and rewards
// ======================================================================

// Every way to earn TrashPoints. `stage` 0 = registration, 1-3 = festival days.
// `mode` decides which demo button is shown on the My Progress page.
const pointActivities = [
  { id: 'registration', stage: 0, icon: 'UserCheck', title: 'Register for the festival', points: 20, mode: 'auto', hint: 'Your account is created automatically when you sign up.' },
  { id: 'd1-qr', stage: 1, icon: 'QrCode', title: 'QR code attendance', points: 30, mode: 'demo', cta: 'Scan QR (demo)', hint: 'Scan the QR code at the Day 1 entrance.' },
  { id: 'd1-materials', stage: 1, icon: 'Recycle', title: 'Contribute recyclable materials', points: 30, mode: 'demo', cta: 'Log materials (demo)', hint: 'Drop off clean bottles, cloth, cardboard, or scrap.' },
  { id: 'd2-qr', stage: 2, icon: 'QrCode', title: 'QR code attendance', points: 30, mode: 'demo', cta: 'Scan QR (demo)', hint: 'Scan the QR code at the Day 2 entrance.' },
  { id: 'd2-materials', stage: 2, icon: 'Recycle', title: 'Contribute recyclable materials', points: 30, mode: 'demo', cta: 'Log materials (demo)', hint: 'Bring more materials for the workshop.' },
  { id: 'artwork', stage: 2, icon: 'Brush', title: 'Submit your artwork', points: 50, mode: 'link', cta: 'Go to My Artwork', hint: 'Upload a photo of your piece in My Artwork.' },
  { id: 'd3-qr', stage: 3, icon: 'QrCode', title: 'QR code attendance', points: 30, mode: 'demo', cta: 'Scan QR (demo)', hint: 'Scan the QR code at the Day 3 entrance.' },
  { id: 'transaction', stage: 3, icon: 'Handshake', title: 'Complete a sale, exchange, or donation', points: 50, mode: 'link', cta: 'Go to My Artwork', hint: 'Share an approved artwork through the Marketplace.' },
];
const totalActivityPoints = pointActivities.reduce((sum, a) => sum + a.points, 0);

const rewards = [
  { icon: 'BookOpen', name: 'Sketchbook and pencil bundle', cost: 100 },
  { icon: 'PaintBucket', name: 'Acrylic paint set', cost: 150 },
  { icon: 'Scissors', name: 'Craft tool kit', cost: 200 },
  { icon: 'Ticket', name: 'PHP 100 hardware voucher', cost: 250 },
];

// Artwork review statuses and the three ways an approved artwork can be shared.
const statusInfo = { Pending: Clock, Approved: BadgeCheck, Rejected: XCircle };
const listingTypes = [
  { id: 'sale', label: 'Sale', icon: ShoppingBag, text: 'Set a price and sell your artwork.' },
  { id: 'exchange', label: 'Exchange', icon: ArrowLeftRight, text: 'Trade it for materials, tools, or another artwork.' },
  { id: 'donation', label: 'Donation', icon: HandHeart, text: 'Give it to a school, community center, or neighbor.' },
];


// ======================================================================
// DEMO STATE: registration, points, toast (no backend)
// ======================================================================

// Demo-only state. Saved in localStorage so the dashboard survives a refresh.
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

const load = () => {
  try { return JSON.parse(localStorage.getItem('trashformers')) || {}; } catch { return {}; }
};

// Older saved demos stored artworks as { title, status }. Upgrade them to the new shape.
const normalizeArtworks = (list = []) => list.map((a, i) => {
  const status = String(a.status || 'Pending');
  return {
    id: a.id ?? `legacy-${i}`, title: a.title || 'Untitled', description: a.description || '', materials: a.materials || '',
    image: a.image || '', listing: a.listing || null, completed: !!a.completed,
    status: status.startsWith('Approved') ? 'Approved' : status.startsWith('Rejected') ? 'Rejected' : 'Pending',
  };
});

function AppProvider({ children }) {
  const saved = load();
  const [participant, setParticipant] = useState(saved.participant || null);
  const [points, setPoints] = useState(saved.points ?? 0);
  const [done, setDone] = useState(saved.done || (saved.participant ? ['registration'] : []));
  const [redeemed, setRedeemed] = useState(saved.redeemed || []);
  const [myArtworks, setMyArtworks] = useState(normalizeArtworks(saved.myArtworks));
  const [toast, setToast] = useState('');

  useEffect(() => {
    try { localStorage.setItem('trashformers', JSON.stringify({ participant, points, done, redeemed, myArtworks })); } catch { /* storage full: demo keeps working in memory */ }
  }, [participant, points, done, redeemed, myArtworks]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = (msg) => setToast(msg);
  const earn = (amount, reason) => { setPoints((p) => p + amount); notify(`+${amount} TrashPoints: ${reason}`); };

  // Simulated "automatic account creation". Registration is the first earned activity.
  const register = (form) => {
    setParticipant({ ...form, id: 'TF-' + Math.floor(1000 + Math.random() * 9000), status: 'Registered' });
    setPoints(pointActivities[0].points);
    setDone(['registration']);
    setRedeemed([]);
    setMyArtworks([]);
  };
  const resetDemo = () => { setParticipant(null); setRedeemed([]); setMyArtworks([]); setPoints(0); setDone([]); };

  // Marks one activity as done (once only) and awards its points.
  const complete = (id) => {
    const a = pointActivities.find((x) => x.id === id);
    if (!a || done.includes(id)) return;
    setDone((d) => [...d, id]);
    earn(a.points, a.title);
  };

  const redeem = (reward) => {
    if (redeemed.includes(reward.name)) return notify(`You already redeemed ${reward.name}.`);
    if (points < reward.cost) return notify(`You need ${reward.cost - points} more TrashPoints for ${reward.name}.`);
    setPoints((p) => p - reward.cost);
    setRedeemed((r) => [...r, reward.name]);
    notify(`Redeemed: ${reward.name}`);
  };

  // Artwork flow: submit (Pending) -> review (Approved / Rejected) -> list -> complete deal.
  const updateArtwork = (id, patch) => setMyArtworks((list) => list.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  const submitArtwork = (data) => {
    setMyArtworks((list) => [{ id: Date.now(), ...data, status: 'Pending', listing: null, completed: false }, ...list]);
    if (done.includes('artwork')) notify('Artwork submitted. It is now waiting for review.');
    else complete('artwork');
  };
  const setArtworkStatus = (id, status) => { updateArtwork(id, { status }); notify(`Demo: artwork ${status.toLowerCase()}.`); };
  const listArtwork = (id, listing) => { updateArtwork(id, { listing }); notify('Your artwork is now in the Marketplace.'); };
  const finishDeal = (id) => {
    updateArtwork(id, { completed: true });
    if (done.includes('transaction')) notify('Marked as completed.');
    else complete('transaction');
  };

  return (
    <AppContext.Provider value={{ participant, points, done, redeemed, myArtworks, toast, notify, register, resetDemo, earn, complete, redeem, submitArtwork, setArtworkStatus, listArtwork, finishDeal }}>
      {children}
    </AppContext.Provider>
  );
}


// ======================================================================
// SHARED COMPONENTS
// ======================================================================

// Use <Icon name="Recycle" /> with any Lucide icon name (PascalCase).
function Icon({ name, size = 22, ...rest }) {
  const L = icons[name] || Circle;
  return <L size={size} aria-hidden="true" {...rest} />;
}

// Shows a green placeholder if the photo fails to load, so the layout never breaks.
function SmartImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`img-fallback ${className}`} role="img" aria-label={alt}><ImageOff size={28} /></div>;
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return <div className="toast" role="status"><CheckCircle2 size={18} /> {toast}</div>;
}

function PageHeader({ title, text }) {
  return (
    <header className="page-header">
      <div className="container">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </header>
  );
}

const links = [
  ['/', 'Home'], ['/festival', 'Festival'], ['/marketplace', 'Marketplace'],
  ['/partners', 'Partners'],
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const { participant } = useApp();
  const close = () => setOpen(false);
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={close}><img src="logo-horizontal.svg" alt="TRASHFORMERS – From Waste to Worth" /></Link>
        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={close}>{label}</NavLink>
          ))}
          {participant ? (
            <Link to="/dashboard" className="btn btn-primary btn-sm" onClick={close}><LayoutDashboard size={16} /> My Dashboard</Link>
          ) : (
            <Link to="/join" className="btn btn-primary btn-sm" onClick={close}>Join Now</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <div className="brand"><img src="logo-horizontal-dark.svg" alt="TRASHFORMERS – From Waste to Worth" /></div>
          <p>From Waste to Worth. A proposed community upcycling art festival at the {festivalInfo.venue}, {festivalInfo.municipality}.</p>
        </div>
        <div className="footer-links">
          <Link to="/festival">Festival</Link><Link to="/marketplace">Marketplace</Link>
          <Link to="/partners">Partners</Link><Link to="/join">Join Now</Link>
        </div>
      </div>
      <div className="container footer-note"></div>
    </footer>
  );
}

const labels = { sale: 'For Sale', exchange: 'For Exchange', donation: 'For Donation' };

// The main demo action for each kind of listing.
function getPrimary(art) {
  return {
    sale: { icon: ShoppingBag, label: 'Reserve this artwork', short: 'Reserve', msg: `Demo: ${art.title} reserved. No payment needed.` },
    exchange: { icon: ArrowLeftRight, label: 'Propose an exchange', short: 'Exchange', msg: `Demo: exchange offer sent to ${art.creator}.` },
    donation: { icon: HandHeart, label: 'Request this donation', short: 'Request', msg: `Demo: request sent. ${art.creator} will be notified.` },
  }[art.type];
}

function ArtworkCard({ art, onOpen }) {
  const { notify } = useApp();
  const primary = getPrimary(art);
  const P = primary.icon;
  return (
    <article className="card art-card">
      <button className="art-img-btn" onClick={() => onOpen(art)} aria-label={`View ${art.title}`}>
        <SmartImage src={art.img} alt={art.title} />
        <span className={`tag tag-${art.type}`}>{labels[art.type]}</span>
      </button>
      <div className="card-body">
        <h3>{art.title}</h3>
        <p className="muted">by {art.creator}</p>
        <p className="art-desc">{art.desc}</p>
        <div className="art-foot"><strong>{art.price}</strong></div>
        <div className="art-actions">
          <button className="btn btn-outline btn-sm" onClick={() => onOpen(art)}>View Artwork</button>
          {!art.mine && (
            <>
              <button className="btn btn-outline btn-sm" onClick={() => notify(`Demo: message sent to ${art.creator}.`)}><MessageCircle size={14} /> Contact Creator</button>
              <button className="btn btn-primary btn-sm" onClick={() => notify(primary.msg)}><P size={14} /> {primary.short}</button>
            </>
          )}
        </div>
        {art.mine && <p className="fine art-own">This is your listing.</p>}
      </div>
    </article>
  );
}

function ArtworkModal({ art, onClose, showActions = true }) {
  const { notify } = useApp();
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  if (!art) return null;

  const contact = () => { notify(`Demo: message sent to ${art.creator}.`); onClose(); };
  const primary = getPrimary(art);
  const P = primary.icon;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={art.title} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <SmartImage src={art.img} alt={art.title} className="modal-img" />
        <div className="modal-body">
          <span className={`tag tag-${art.type} static`}>{labels[art.type]}</span>
          <h2>{art.title}</h2>
          <p className="muted">by {art.creator} &middot; {art.style}</p>
          <p>{art.desc}</p>
          <dl className="details">
            <dt>Materials</dt><dd>{art.materials}</dd>
            <dt>{art.type === 'exchange' ? 'Looking for' : art.type === 'sale' ? 'Price' : 'Offer'}</dt>
            <dd>{art.type === 'exchange' ? art.want : art.price}</dd>
          </dl>
          {showActions && !art.mine && (
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => { notify(primary.msg); onClose(); }}><P size={18} /> {primary.label}</button>
              <button className="btn btn-outline" onClick={contact}><MessageCircle size={18} /> Contact Creator</button>
            </div>
          )}
          <p className="fine">Demonstration only. No payments or real transactions happen on this site.</p>
        </div>
      </div>
    </div>
  );
}

function FilterBar({ options, value, onChange, labelFor = (o) => o }) {
  return (
    <div className="filters" role="group" aria-label="Filters">
      {options.map((o) => (
        <button key={o} className={`chip ${value === o ? 'active' : ''}`} onClick={() => onChange(o)} aria-pressed={value === o}>
          {labelFor(o)}
        </button>
      ))}
    </div>
  );
}


// ======================================================================
// PAGES
// ======================================================================

const steps = [
  { icon: 'Recycle', title: 'Collect', text: 'Gather clean discarded materials from home, school, and your barangay.' },
  { icon: 'Lightbulb', title: 'Create', text: 'Join workshops and turn your materials into art or useful objects.' },
  { icon: 'Users', title: 'Collaborate', text: 'Team up, share tools, and learn from local artists and mentors.' },
  { icon: 'Store', title: 'Exhibit and exchange', text: 'Show your work, then sell, swap, or donate it in the marketplace.' },
];

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Turn Waste Into Something Wonderful</h1>
            <p className="lead">TRASHFORMERS is a proposed three-day community art festival where bottles, cloth, cardboard, and scrap become artworks people can use, display, and share.</p>
            <div className="btn-row">
              <Link to="/join" className="btn btn-primary">Join Now <ArrowRight size={18} /></Link>
              <Link to="/festival" className="btn btn-outline">See the festival</Link>
            </div>
            <ul className="hero-facts">
              <li><CalendarDays size={18} /> 3 days, {festivalInfo.date}</li>
              <li><MapPin size={18} /> {festivalInfo.venue}, {festivalInfo.municipality}</li>
              <li><Ticket size={18} /> {festivalInfo.fee}</li>
            </ul>
          </div>
          <div className="hero-collage">
              
              <SmartImage src="images/home-1.jpg" alt="Recycled artwork" className="c1" />
              <SmartImage src="images/home-2.jpg" alt="Creative recycling" className="c2" />
              <SmartImage src="images/home-3.jpg" alt="Upcycling workshop" className="c3" />

          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>What is TRASHFORMERS?</h2>
            <p>Every community throws away materials that still have life in them. TRASHFORMERS invites students, families, and local makers to rethink that waste, using it as the raw material for creative and useful artworks.</p>
            <p>Held at the municipal gymnasium during school break, the festival is free and open to everyone. It combines workshops, an exhibit, a marketplace, and a points-based rewards system that keeps people reusing long after the event.</p>
          </div>
          <div className="stack">
            <div className="card pad"><span className="icon-badge"><Target size={22} /></span><h3>Mission</h3><p>To make reuse a shared, hands-on habit by giving communities the space, skills, and recognition to turn discarded materials into art with value.</p></div>
            <div className="card pad"><span className="icon-badge"><Eye size={22} /></span><h3>Vision</h3><p>A community where nothing useful is thrown away, and where creativity is the first answer to waste.</p></div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>How it works</h2>
          <div className="grid g4">
            {steps.map((s, i) => (
              <div className="card pad" key={s.title}>
                <span className="icon-badge"><Icon name={s.icon} /></span>
                <h3>{i + 1}. {s.title}</h3><p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Festival highlights</h2>
          <div className="grid g3">
            {workshopImgs.map((w) => (
              <figure className="photo" key={w.caption}><SmartImage src={w.img} alt={w.caption} /><figcaption>{w.caption}</figcaption></figure>
            ))}
          </div>
          <div className="grid g4 mt">
            {days.map((d) => (
              <div className="card pad" key={d.day}>
                <span className="icon-badge"><Icon name={d.icon} /></span>
                <h3>Day {d.day}: {d.title}</h3><p>{d.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Your discarded materials could win a prize</h2>
          <p>Register in under a minute. Your dashboard and TrashPoints are ready immediately.</p>
          <Link to="/join" className="btn btn-light">Register now <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}

function Festival() {
  const [active, setActive] = useState(0);
  const d = days[active];
  return (
    <>
      <PageHeader title="The Festival" text="Three days of creativity, collaboration, and sustainability. Join us as we transform discarded materials into meaningful artworks and give waste a new purpose." />
      <section className="section">
        <div className="container">
          <div className="info-bar">
            <span><CalendarDays size={18} /> {festivalInfo.date}</span>
            <span><MapPin size={18} /> {festivalInfo.venue}, {festivalInfo.municipality}</span>
            <span><Ticket size={18} /> {festivalInfo.fee}</span>
          </div>

          <h2>Three-day schedule</h2>
          <div className="tabs" role="tablist">
            {days.map((x, i) => (
              <button key={x.day} role="tab" aria-selected={i === active} className={`tab ${i === active ? 'active' : ''}`} onClick={() => setActive(i)}>
                Day {x.day}
              </button>
            ))}
          </div>
          <div className="card day-panel">
            <SmartImage src={d.image} alt={d.imageAlt} className="day-panel-image" />
            <div className="day-panel-content">
              <span className="icon-badge"><Icon name={d.icon} /></span>
              <h3>Day {d.day}: {d.title}</h3>
              <p className="muted">{d.summary}</p>
              <ul className="checks">{d.items.map((it) => <li key={it}><Check size={18} /> {it}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Activities</h2>
          <div className="grid g4">
            {activities.map((a) => (
              <div className="card pad" key={a.title}><span className="icon-badge"><Icon name={a.icon} /></span><h3>{a.title}</h3><p>{a.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Accepted materials</h2>
          <p className="muted">Please bring items clean and dry.</p>
          <div className="grid g4">
            {materials.map((m) => (
              <div className={`card pad mat ${m.ok ? '' : 'no'}`} key={m.name}>
                <Icon name={m.icon} />
                <span>{m.name}</span>
                {m.ok ? <Check size={18} className="ok" /> : <X size={18} className="bad" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <div>
            <h2>Judging criteria</h2>
            {criteria.map((c) => (
              <div className="bar-row" key={c.label}>
                <div className="bar-label"><span>{c.label}</span><strong>{c.pct}%</strong></div>
                <div className="bar"><div style={{ width: `${c.pct * 3}%` }} /></div>
              </div>
            ))}
          </div>
          <div>
            <h2>Awards</h2>
            <div className="stack">
              {awards.map((a) => (
                <div className="card pad row" key={a.title}><span className="icon-badge"><Icon name={a.icon} /></span><div><h3>{a.title}</h3><p>{a.text}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Sample artworks plus any of the participant's own approved and listed artworks.
function useMarketArtworks() {
  const { participant, myArtworks } = useApp();
  const mine = myArtworks.filter((a) => a.status === 'Approved' && a.listing).map((a) => ({
    id: `mine-${a.id}`, mine: true, title: a.title, creator: `${participant?.name || 'You'} (you)`, type: a.listing.type, style: 'Participant artwork',
    price: a.listing.type === 'sale' ? `PHP ${Number(a.listing.price).toLocaleString('en-US')}` : a.listing.type === 'exchange' ? 'Exchange' : 'Donation',
    want: a.listing.want, materials: a.materials, img: a.image, desc: a.description,
  }));
  return [...mine, ...artworks];
}

// Category filter + artwork grid. Used by the public page and the dashboard tab.
function MarketBrowser() {
  const [type, setType] = useState('all');
  const [selected, setSelected] = useState(null);
  const all = useMarketArtworks();
  const list = type === 'all' ? all : all.filter((a) => a.type === type);
  const countFor = (o) => (o === 'all' ? all.length : all.filter((a) => a.type === o).length);
  return (
    <>
      <FilterBar options={['all', 'sale', 'exchange', 'donation']} value={type} onChange={setType} labelFor={(o) => `${o === 'all' ? 'All' : labels[o]} (${countFor(o)})`} />
      <p className="muted">{list.length} artworks</p>
      <div className="grid g3">{list.map((a) => <ArtworkCard key={a.id} art={a} onOpen={setSelected} />)}</div>
      <ArtworkModal art={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function Marketplace() {
  return (
    <>
      <PageHeader title="Marketplace" text="Upcycled artworks to buy, exchange, or receive as a gift. Every piece has a story, transformed from something once discarded into something worth sharing." />
      <section className="section">
        <div className="container">
          <MarketBrowser />
          <p className="fine center">Demonstration only. Items are samples and no payments are processed. <Link to="/join">Register</Link> to list your own artwork.</p>
        </div>
      </section>
    </>
  );
}


function Partners() {
  const [type, setType] = useState('All');
  const { notify } = useApp();
  const list = type === 'All' ? partners : partners.filter((p) => p.type === type);
  return (
    <>
      <PageHeader title="Partners" text="Meet the organizations we'd love to partner with and discover how each can help turn Trashformers into a meaningful community initiative." />
      <section className="section">
        <div className="container">
          <FilterBar options={partnerTypes} value={type} onChange={setType} />
          <div className="grid g3">
            {list.map((p) => (
              <div className="card pad" key={p.name}>
                <span className="icon-badge"><Icon name={p.icon} /></span>
                <h3>{p.name}</h3><p className="muted">{p.type}</p>
                <ul className="checks">{p.gives.map((g) => <li key={g}><Check size={16} /> {g}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="card pad center mt">
            <h3>Want to support the festival?</h3>
            <p>Sponsors can provide materials, prizes, tools, venue support, or volunteers.</p>
            <button className="btn btn-primary" onClick={() => notify('Demo: partnership inquiry sent. Thank you!')}><Handshake size={18} /> Become a partner</button>
          </div>
        </div>
      </section>
    </>
  );
}

const types = ['Individual artist', 'Student', 'School group', 'Organization', 'Volunteer', 'Visitor'];
const empty = { name: '', email: '', phone: '', org: '', type: '', agree: false };

function Field({ id, label, optional, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{optional && <span className="muted"> (optional)</span>}</label>
      {children}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

function JoinNow() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const { register, notify } = useApp();
  const navigate = useNavigate();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email, like name@email.com.';
    if (!/^[0-9+\-\s()]{7,15}$/.test(form.phone)) e.phone = 'Enter a contact number with 7 to 15 digits.';
    if (!form.type) e.type = 'Choose how you want to take part.';
    if (!form.agree) e.agree = 'Please agree to continue.';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    register(form);
    notify(`Welcome, ${form.name.split(' ')[0]}! Your account was created.`);
    navigate('/dashboard');
  };

  return (
    <>
      <PageHeader title="Join Now" text="Register for free, earn your first TrashPoints, track your festival progress, and unlock rewards as you participate in activities." />
      <section className="section">
        <div className="container narrow">
          <form className="card pad form" onSubmit={submit} noValidate>
            <Field id="name" error={errors.name} label="Full name"><input id="name" value={form.name} onChange={set('name')} autoComplete="name" /></Field>
            <Field id="email" error={errors.email} label="Email"><input id="email" type="email" value={form.email} onChange={set('email')} autoComplete="email" /></Field>
            <Field id="phone" error={errors.phone} label="Contact number"><input id="phone" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" /></Field>
            <Field id="org" error={errors.org} label="School / Organization" optional><input id="org" value={form.org} onChange={set('org')} /></Field>
            <Field id="type" error={errors.type} label="Participation type">
              <select id="type" value={form.type} onChange={set('type')}>
                <option value="">Select one</option>
                {types.map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <div className="field">
              <label className="check"><input type="checkbox" checked={form.agree} onChange={set('agree')} /> I agree to follow the festival guidelines and to use only safe, clean materials.</label>
              {errors.agree && <p className="error">{errors.agree}</p>}
            </div>
            <button className="btn btn-primary" type="submit"><UserPlus size={18} /> Register Now</button>
          </form>
        </div>
      </section>
    </>
  );
}

// ----------------------------------------------------------------------
// DASHBOARD: only 3 pages (My Progress, My Artwork, Marketplace).
// The participant's name, profile icon and status live in the header.
// ----------------------------------------------------------------------
const dashTabs = [['progress', 'My Progress', Trophy], ['artwork', 'My Artwork', Palette], ['market', 'Marketplace', Store]];

// Resizes the uploaded photo so it fits comfortably in browser storage.
const readImage = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    const image = new Image();
    image.onerror = reject;
    image.onload = () => {
      const scale = Math.min(1, 900 / Math.max(image.width, image.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.82));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});

function DashHeader() {
  const { participant, points } = useApp();
  return (
    <div className="dash-head card pad">
      <div className="dash-id">
        <span className="avatar" aria-hidden="true"><User size={28} /></span>
        <div>
          <h1>Hello, {participant.name}</h1>
          <p className="muted">{participant.type}{participant.org ? ` · ${participant.org}` : ''} · ID {participant.id}</p>
        </div>
      </div>
      <div className="dash-meta">
        <span className="status"><BadgeCheck size={18} /> {participant.status}</span>
        <span className="points-pill"><Coins size={18} /> {points} pts</span>
      </div>
    </div>
  );
}

// ---- Page 1: My Progress (dashboard + TrashPoints) ----
function ProgressTab({ go }) {
  const { points, done, complete, redeem, redeemed } = useApp();
  const stages = [{ label: 'Registration', sub: 'Sign up' }, ...days.map((d) => ({ label: `Day ${d.day}`, sub: d.title }))]
    .map((s, i) => ({ ...s, items: pointActivities.filter((a) => a.stage === i) }));
  const stageDone = (s) => s.items.every((a) => done.includes(a.id));
  const currentIdx = stages.findIndex((s) => !stageDone(s));
  const doneCount = pointActivities.filter((a) => done.includes(a.id)).length;
  const earnedPts = pointActivities.filter((a) => done.includes(a.id)).reduce((sum, a) => sum + a.points, 0);

  return (
    <div>
      <div className="prog-top">
        <div className="card pad points-card">
          <Coins size={32} />
          <div><p className="muted">Total TrashPoints balance</p><h2>{points} TrashPoints</h2></div>
        </div>
        <div className="card pad prog-card">
          <h3>Festival progress: {doneCount} of {pointActivities.length} activities</h3>
          <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((doneCount / pointActivities.length) * 100)}>
            <div style={{ width: `${(doneCount / pointActivities.length) * 100}%` }} />
          </div>
          <p className="fine mt-s">{earnedPts} of {totalActivityPoints} activity points earned. {festivalInfo.date} at the {festivalInfo.venue}.</p>
        </div>
      </div>

      <h2>Your festival journey</h2>
      <ol className="timeline">
        {stages.map((s, i) => {
          const state = stageDone(s) ? 'done' : i === currentIdx ? 'current' : 'todo';
          return (
            <li key={s.label} className={`tl-step ${state}`}>
              <span className="tl-dot">{state === 'done' ? <Check size={20} /> : i + 1}</span>
              <strong>{s.label}</strong><small>{s.sub}</small>
            </li>
          );
        })}
      </ol>

      <div className="grid g2">
        {stages.map((s, i) => {
          const state = stageDone(s) ? 'done' : i === currentIdx ? 'current' : 'todo';
          const n = s.items.filter((a) => done.includes(a.id)).length;
          return (
            <div className={`card pad stage ${state}`} key={s.label}>
              <div className="stage-head"><h3>{s.label}: {s.sub}</h3><span className="muted">{n}/{s.items.length} done</span></div>
              <div className="bar"><div style={{ width: `${(n / s.items.length) * 100}%` }} /></div>
              <ul className="acts">
                {s.items.map((a) => {
                  const ok = done.includes(a.id);
                  return (
                    <li key={a.id} className={ok ? 'ok' : ''}>
                      <span className="act-icon">{ok ? <CheckCircle2 size={20} /> : <Icon name={a.icon} size={20} />}</span>
                      <div className="act-text"><strong>{a.title}</strong><small>{a.hint}</small></div>
                      <span className="pts">+{a.points} pts</span>
                      <div className="act-action">
                        {ok ? <span className="earned"><Check size={14} /> Completed, +{a.points} pts earned</span>
                          : a.mode === 'demo' ? <button className="btn btn-primary btn-sm" onClick={() => complete(a.id)}>{a.cta}</button>
                          : <button className="btn btn-outline btn-sm" onClick={() => go('artwork')}>{a.cta}</button>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      <h2 className="mt">Available rewards</h2>
      <div className="grid g4">
        {rewards.map((r) => {
          const got = redeemed.includes(r.name);
          const enough = points >= r.cost;
          return (
            <div className="card pad reward" key={r.name}>
              <span className="icon-badge"><Icon name={r.icon} /></span>
              <h3>{r.name}</h3>
              <p className="muted">{r.cost} points</p>
              <div className="bar"><div style={{ width: `${Math.min(100, (points / r.cost) * 100)}%` }} /></div>
              <p className="fine mt-s">{got ? 'Redeemed' : enough ? 'You have enough points.' : `${r.cost - points} more points needed`}</p>
              <button className={`btn btn-sm ${enough && !got ? 'btn-primary' : 'btn-outline'}`} disabled={got} onClick={() => redeem(r)}><Gift size={15} /> {got ? 'Redeemed' : 'Redeem'}</button>
            </div>
          );
        })}
      </div>
      <p className="fine mt-s">Rewards are samples for the demonstration. No real items are issued.</p>
    </div>
  );
}

// ---- Page 2: My Artwork ----
function StatusTag({ status }) {
  const I = statusInfo[status];
  return <span className={`status-tag st-${status.toLowerCase()}`}><I size={14} /> {status}</span>;
}

function SubmissionCard({ art, go }) {
  const { done, setArtworkStatus, listArtwork, finishDeal, notify } = useApp();
  const [choice, setChoice] = useState('');
  const [price, setPrice] = useState('');
  const [want, setWant] = useState('');

  const publish = () => {
    if (choice === 'sale' && !(Number(price) > 0)) return notify('Enter a price in PHP first.');
    listArtwork(art.id, { type: choice, price: choice === 'sale' ? Number(price) : null, want: want.trim() || 'Open to offers' });
  };

  return (
    <div className="sub-card">
      <SmartImage src={art.image} alt={art.title} className="sub-img" />
      <div>
        <div className="sub-top"><h3>{art.title}</h3><StatusTag status={art.status} /></div>
        {art.description && <p className="sub-desc">{art.description}</p>}
        {art.materials && <p className="fine"><strong>Materials:</strong> {art.materials}</p>}
      </div>

      <div className="sub-actions">
        {art.status === 'Pending' && (
          <>
            <p className="fine">Under review by the festival team. Use the demo buttons to simulate the decision.</p>
            <div className="btn-row tight">
              <button className="btn btn-primary btn-sm" onClick={() => setArtworkStatus(art.id, 'Approved')}><Check size={15} /> Demo: Approve</button>
              <button className="btn btn-outline btn-sm" onClick={() => setArtworkStatus(art.id, 'Rejected')}><X size={15} /> Demo: Reject</button>
            </div>
          </>
        )}

        {art.status === 'Rejected' && <p className="fine">This artwork was not approved. Improve it and submit a new one using the form.</p>}

        {art.status === 'Approved' && !art.listing && (
          <>
            <p><strong>Approved! How would you like to share it?</strong></p>
            <div className="choice-row">
              {listingTypes.map((t) => { const T = t.icon; return (
                <button key={t.id} className={`chip ${choice === t.id ? 'active' : ''}`} aria-pressed={choice === t.id} onClick={() => setChoice(t.id)}><T size={16} /> {t.label}</button>
              ); })}
            </div>
            {choice && <p className="fine">{listingTypes.find((t) => t.id === choice).text}</p>}
            {choice === 'sale' && <input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price in PHP, e.g. 500" aria-label="Price in PHP" />}
            {choice === 'exchange' && <input value={want} onChange={(e) => setWant(e.target.value)} placeholder="What would you like in exchange? (optional)" aria-label="Exchange wish" />}
            {choice && <div className="btn-row tight"><button className="btn btn-primary btn-sm" onClick={publish}>Publish to Marketplace</button></div>}
          </>
        )}

        {art.status === 'Approved' && art.listing && (
          <>
            <p><span className={`tag tag-${art.listing.type} static`}>{labels[art.listing.type]}</span>{' '}
              <strong>{art.listing.type === 'sale' ? `PHP ${Number(art.listing.price).toLocaleString('en-US')}` : art.listing.type === 'exchange' ? `Looking for: ${art.listing.want}` : 'Free to a good home'}</strong></p>
            <div className="btn-row tight">
              <button className="btn btn-outline btn-sm" onClick={() => go('market')}><Store size={15} /> View in Marketplace</button>
              {art.completed
                ? <span className="earned"><Check size={14} /> {art.listing.type === 'sale' ? 'Sale' : art.listing.type === 'exchange' ? 'Exchange' : 'Donation'} completed</span>
                : <button className="btn btn-primary btn-sm" onClick={() => finishDeal(art.id)}>Demo: complete {art.listing.type}{done.includes('transaction') ? '' : ' (+50 pts)'}</button>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ArtworkTab({ go }) {
  const { myArtworks, submitArtwork, notify, done } = useApp();
  const blank = { title: '', description: '', materials: '' };
  const [form, setForm] = useState(blank);
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const pick = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return notify('Please choose an image file (JPG or PNG).');
    try { setImage(await readImage(file)); } catch { notify('That photo could not be read. Please try another one.'); }
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!image) er.image = 'Upload a photo of your artwork.';
    if (form.title.trim().length < 2) er.title = 'Give your artwork a title.';
    if (!form.description.trim()) er.description = 'Add a short description.';
    if (!form.materials.trim()) er.materials = 'List the materials you used.';
    setErrors(er);
    if (Object.keys(er).length) return;
    submitArtwork({ title: form.title.trim(), description: form.description.trim(), materials: form.materials.trim(), image });
    setForm(blank);
    setImage('');
  };

  return (
    <div className="split">
      <form className="card pad form" onSubmit={submit} noValidate>
        <h3>Submit an artwork</h3>
        <Field id="photo" error={errors.image} label="Artwork photo">
          <label className="upload-drop" htmlFor="photo">
            {image ? <img src={image} alt="Preview of your artwork" /> : <><ImagePlus size={30} /><strong>Tap to upload a photo</strong><span className="fine">JPG or PNG</span></>}
            <input id="photo" className="file-input" type="file" accept="image/*" onChange={pick} />
          </label>
          {image && <p className="fine">Tap the photo to change it.</p>}
        </Field>
        <Field id="at" error={errors.title} label="Artwork title"><input id="at" value={form.title} onChange={set('title')} placeholder="e.g. Cap Mosaic Turtle" /></Field>
        <Field id="ad" error={errors.description} label="Description"><textarea id="ad" rows={3} value={form.description} onChange={set('description')} placeholder="What is it, and what inspired it?" /></Field>
        <Field id="am" error={errors.materials} label="Materials used"><input id="am" value={form.materials} onChange={set('materials')} placeholder="e.g. Bottle caps, cardboard, twine" /></Field>
        <button className="btn btn-primary" type="submit"><Plus size={18} /> Submit artwork</button>
        <p className="fine">{done.includes('artwork') ? 'Your first submission already earned its 50 TrashPoints.' : 'Your first submission earns 50 TrashPoints.'}</p>
      </form>

      <div className="card pad">
        <h3>Your submissions</h3>
        <p className="fine">Status: Pending (waiting for review), Approved, or Rejected.</p>
        {myArtworks.length === 0 && <p className="muted">Nothing yet. Submit your first artwork to see it here.</p>}
        <div className="sub-list">{myArtworks.map((a) => <SubmissionCard key={a.id} art={a} go={go} />)}</div>
      </div>
    </div>
  );
}

// ---- Page 3: Marketplace (inside the dashboard) ----
function MarketTab() {
  return (
    <div>
      <MarketBrowser />
      <p className="center mt"><Link to="/marketplace" className="btn btn-outline">Open full marketplace page</Link></p>
    </div>
  );
}

function Dashboard() {
  const app = useApp();
  const [tab, setTab] = useState('progress');
  if (!app.participant) return <Navigate to="/join" replace />;
  const go = (id) => { setTab(id); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <section className="section dash">
      <div className="container">
        <DashHeader />

        <div className="tabs" role="tablist">
          {dashTabs.map(([id, label, I]) => (
            <button key={id} role="tab" aria-selected={tab === id} className={`tab ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}><I size={16} /> {label}</button>
          ))}
        </div>

        {tab === 'progress' && <ProgressTab go={go} />}
        {tab === 'artwork' && <ArtworkTab go={go} />}
        {tab === 'market' && <MarketTab />}

        <p className="center mt"><button className="btn btn-outline btn-sm" onClick={() => { app.resetDemo(); app.notify('Demo reset. You can register again.'); }}><LogOut size={16} /> Reset demo</button></p>
      </div>
    </section>
  );
}


// ======================================================================
// STYLES (green palette #19372D #527A5A #D5E5D4 #F1F5EF #FAFAF6)
// ======================================================================

const CSS = `
:root{--forest:#19372D;--moss:#527A5A;--sage:#D5E5D4;--mist:#F1F5EF;--paper:#FAFAF6;--line:#d7e0d4;--radius:14px;
--head:'Space Grotesk','Poppins',sans-serif;--body:'Inter',system-ui,sans-serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:var(--body);color:var(--forest);background:var(--paper);line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--head);line-height:1.15;margin:0 0 .6rem;letter-spacing:-.02em}
h1{font-size:clamp(2.3rem,5.5vw,4rem)}h2{font-size:clamp(1.6rem,3.2vw,2.3rem);margin-bottom:1.2rem}h3{font-size:1.15rem}
p{margin:0 0 1rem;max-width:68ch}a{color:var(--moss)}img{display:block;max-width:100%}
.container{width:min(1140px,92%);margin:0 auto}.narrow{width:min(620px,92%)}
.section{padding:4.5rem 0}.alt{background:var(--mist)}.mt{margin-top:2rem}.center{text-align:center;margin-inline:auto}
.muted{color:var(--moss)}.fine{font-size:.85rem;color:var(--moss)}.lead{font-size:1.2rem;max-width:52ch}
:focus-visible{outline:3px solid var(--moss);outline-offset:2px}
/* Buttons */
.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.8rem 1.4rem;border-radius:999px;font:600 .95rem var(--body);border:2px solid transparent;cursor:pointer;text-decoration:none;transition:background .2s,color .2s,transform .1s}
.btn:active{transform:scale(.97)}
.btn-primary{background:var(--forest);color:var(--paper)}.btn-primary:hover{background:var(--moss)}
.btn-outline{border-color:var(--forest);color:var(--forest);background:transparent}.btn-outline:hover{background:var(--forest);color:var(--paper)}
.btn-light{background:var(--paper);color:var(--forest)}.btn-light:hover{background:var(--sage)}
.btn-sm{padding:.45rem 1rem;font-size:.85rem}.btn:disabled{opacity:.55;cursor:default}.btn:disabled:hover{background:transparent;color:var(--forest)}.btn-row{display:flex;flex-wrap:wrap;gap:.8rem;margin:1.5rem 0}
/* Nav */
.nav{position:sticky;top:0;z-index:50;background:rgba(250,250,246,.94);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;height:68px}
.brand{display:flex;align-items:center;gap:.5rem;font:700 1.15rem var(--head);color:var(--forest);text-decoration:none;letter-spacing:.02em}
.nav-links{display:flex;align-items:center;gap:1.6rem}
.nav-links a:not(.btn){color:var(--forest);text-decoration:none;font-weight:500;padding:.3rem 0;border-bottom:2px solid transparent}
.nav-links a.active{border-color:var(--moss)}
.nav-toggle{display:none;background:none;border:0;color:var(--forest);cursor:pointer}
/* Hero */
.hero{padding:4.5rem 0 5rem;background:linear-gradient(180deg,var(--mist),var(--paper))}
.hero-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:3rem;align-items:center}
.hero-facts{list-style:none;padding:0;margin:0;display:grid;gap:.5rem;color:var(--moss)}
.hero-facts li{display:flex;gap:.6rem;align-items:center}
.hero-collage{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:200px 200px;gap:1rem}
.hero-collage img,.hero-collage .img-fallback{width:100%;height:100%;object-fit:cover;border-radius:var(--radius)}
.hero-collage .c1{grid-row:span 2}
/* Cards & grids */
.grid{display:grid;gap:1.4rem}.g2{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}
.card{background:#fff;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}
.pad{padding:1.5rem}.stack{display:grid;gap:1.2rem}.split{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}
.row{display:flex;gap:1rem;align-items:flex-start}.row .icon-badge{flex:none}
.icon-badge{display:inline-flex;width:46px;height:46px;border-radius:12px;background:var(--sage);color:var(--forest);align-items:center;justify-content:center;margin-bottom:1rem}
.row .icon-badge{margin-bottom:0}
.photo{margin:0;border-radius:var(--radius);overflow:hidden;position:relative;background:var(--sage)}
.photo img,.photo .img-fallback{width:100%;height:260px;object-fit:cover}
.photo figcaption{position:absolute;inset:auto 0 0;padding:1.5rem 1rem .8rem;color:#fff;background:linear-gradient(transparent,rgba(25,55,45,.85));font-weight:500}
.img-fallback{background:var(--sage);color:var(--moss);display:flex;align-items:center;justify-content:center;min-height:180px}
/* Page header */
.page-header{background:var(--forest);color:var(--paper);padding:3.5rem 0}.page-header h1{font-size:clamp(2rem,4.5vw,3rem)}.page-header p{color:var(--sage);margin:0}
.cta{background:var(--forest);color:var(--paper);text-align:center;padding:4.5rem 0}.cta p{margin:0 auto 1.5rem;color:var(--sage)}
/* Art */
.art-card .art-img-btn{display:block;width:100%;padding:0;border:0;background:var(--sage);position:relative;cursor:pointer}
.art-card img,.art-card .img-fallback{width:100%;height:220px;object-fit:cover;transition:transform .3s}
.art-card .art-img-btn:hover img{transform:scale(1.03)}.art-card .art-img-btn{overflow:hidden}
.art-card{display:flex;flex-direction:column;container-type:inline-size}.art-card .card-body{flex:1;display:flex;flex-direction:column}
.art-desc{font-size:.92rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.art-foot{margin-top:auto;padding-top:.4rem}.art-actions{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.7rem}
.art-actions .btn{flex:1 1 auto;justify-content:center;white-space:nowrap;gap:.3rem;font-size:.76rem;padding:.45rem .6rem}
@container (max-width:420px){.art-actions .btn{font-size:.7rem;padding:.4rem .45rem}.art-actions .btn svg{display:none}}
@container (max-width:320px){.art-actions{gap:.3rem}.art-actions .btn{font-size:.66rem;padding:.38rem .3rem}}.art-own{margin:.9rem 0 0!important}
.card-body{padding:1.2rem}.card-body p{margin:0 0 .8rem}.art-foot{display:flex;justify-content:space-between;align-items:center}
.tag{position:absolute;top:.8rem;left:.8rem;padding:.25rem .7rem;border-radius:999px;font:600 .78rem var(--body);background:var(--paper);color:var(--forest)}
.tag.static{position:static;display:inline-block;margin-bottom:.6rem}
.tag-sale{background:var(--sage)}.tag-exchange{background:var(--moss);color:#fff}.tag-donation{background:var(--forest);color:#fff}
.filters{display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:1.2rem}
.chip{padding:.5rem 1.1rem;border-radius:999px;border:1.5px solid var(--moss);background:transparent;color:var(--forest);font:500 .9rem var(--body);cursor:pointer}
.chip.active{background:var(--forest);border-color:var(--forest);color:#fff}
/* Modal */
.modal-backdrop{position:fixed;inset:0;background:rgba(25,55,45,.65);display:flex;align-items:center;justify-content:center;padding:1rem;z-index:100;animation:fade .2s}
.modal{background:#fff;border-radius:var(--radius);max-width:860px;width:100%;max-height:92vh;overflow:auto;display:grid;grid-template-columns:1fr 1fr;position:relative}
.modal-img{width:100%;height:100%;min-height:280px;object-fit:cover}.modal-body{padding:2rem}
.modal-close{position:absolute;top:.7rem;right:.7rem;z-index:2;background:var(--paper);border:0;border-radius:50%;width:36px;height:36px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--forest)}
.details{display:grid;grid-template-columns:auto 1fr;gap:.4rem 1rem;margin:1rem 0}.details dt{font-weight:600}.details dd{margin:0}
@keyframes fade{from{opacity:0}to{opacity:1}}
/* Festival */
.info-bar{display:flex;flex-wrap:wrap;gap:1.5rem;padding:1rem 1.4rem;background:var(--sage);border-radius:var(--radius);margin-bottom:.6rem}
.info-bar span{display:flex;align-items:center;gap:.5rem;font-weight:500}
.tabs{display:flex;flex-wrap:wrap;gap:.5rem;margin:1.2rem 0}
.tab{display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1.2rem;border-radius:10px;border:1.5px solid var(--line);background:#fff;color:var(--forest);font:500 .92rem var(--body);cursor:pointer}
.tab.active{background:var(--forest);color:#fff;border-color:var(--forest)}
.checks{list-style:none;padding:0;margin:1rem 0 0;display:grid;gap:.6rem}.checks li{display:flex;gap:.6rem;align-items:flex-start}.checks svg{color:var(--moss);flex:none;margin-top:3px}
.day-panel{display:grid;grid-template-columns:minmax(0, .95fr) minmax(0, 1.05fr);align-items:stretch}
.day-panel-image{width:100%;height:100%;min-height:340px;object-fit:cover;background:var(--sage)}
.day-panel-content{padding:1.7rem}.day-panel-content h3{margin-top:0}
.mat{display:flex;align-items:center;gap:.8rem;padding:1rem 1.2rem}.mat span{flex:1;font-weight:500}.mat .ok{color:var(--moss)}.mat .bad{color:#9b3d2e}.mat.no{background:#fbf3f1}
.bar-row{margin-bottom:1.1rem}.bar-label{display:flex;justify-content:space-between;margin-bottom:.3rem}
.bar{height:10px;background:var(--sage);border-radius:99px;overflow:hidden}.bar div{height:100%;background:var(--moss);border-radius:99px}
/* Form */
.form{display:grid;gap:1.1rem}.field label{display:block;font-weight:600;margin-bottom:.35rem;font-size:.92rem}
input:not([type=checkbox]),select,textarea{width:100%;padding:.8rem 1rem;border:1.5px solid var(--line);border-radius:10px;font:1rem var(--body);background:#fff;color:var(--forest)}
input:focus,select:focus,textarea:focus{border-color:var(--moss)}
textarea{resize:vertical;min-height:90px}
.check{display:flex!important;gap:.7rem;font-weight:400!important}.check input{margin-top:.35rem;accent-color:var(--forest)}
.error{color:#9b3d2e;font-size:.85rem;margin:.3rem 0 0}
/* Dashboard */
.dash-head{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1rem}.dash-head h1{font-size:2rem;margin:0}.dash-head p{margin:0}
.dash-meta{display:flex;gap:.8rem;flex-wrap:wrap}.status,.points-pill{display:inline-flex;gap:.4rem;align-items:center;padding:.5rem 1rem;border-radius:999px;font-weight:600;font-size:.9rem}
.status{background:var(--sage)}.points-pill{background:var(--forest);color:#fff}
.points-card{display:flex;gap:1.2rem;align-items:center;background:var(--forest);color:#fff;border:0}.points-card .muted{color:var(--sage);margin:0}.points-card h2{margin:0}
.list{list-style:none;padding:0;margin:0;display:grid;gap:.6rem}.list li{display:flex;justify-content:space-between;align-items:center;padding:.7rem 0;border-bottom:1px solid var(--line)}
/* Dashboard: header, progress, artwork */
.dash-id{display:flex;align-items:center;gap:1rem}.avatar{width:60px;height:60px;border-radius:50%;background:var(--sage);color:var(--forest);display:inline-flex;align-items:center;justify-content:center;flex:none;border:3px solid var(--moss)}
.mt-s{margin-top:.6rem}
.prog-top{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem;margin-bottom:2rem}.prog-card .bar{height:12px}.prog-card h3{margin-bottom:.9rem}
.timeline{list-style:none;margin:0 0 1.8rem;padding:0;display:grid;grid-template-columns:repeat(4,1fr)}
.tl-step{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 .3rem}
.tl-step::before{content:'';position:absolute;top:19px;right:50%;width:100%;height:4px;background:var(--line)}.tl-step:first-child::before{display:none}
.tl-step.done::before,.tl-step.current::before{background:var(--moss)}
.tl-dot{position:relative;z-index:1;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 1rem var(--head);background:#fff;border:3px solid var(--line);color:var(--moss);margin-bottom:.4rem}
.tl-step.done .tl-dot{background:var(--forest);border-color:var(--forest);color:#fff}.tl-step.current .tl-dot{border-color:var(--moss);color:var(--forest);box-shadow:0 0 0 5px var(--sage)}
.tl-step small{color:var(--moss);font-size:.8rem;line-height:1.3}
.stage.done{border-color:var(--moss)}.stage.current{border-color:var(--forest);box-shadow:0 4px 18px rgba(25,55,45,.1)}
.stage-head{display:flex;justify-content:space-between;align-items:baseline;gap:.6rem;flex-wrap:wrap;margin-bottom:.6rem}.stage-head h3{margin:0}
.acts{list-style:none;padding:0;margin:1.1rem 0 0;display:grid;gap:.8rem}
.acts li{display:grid;grid-template-columns:auto 1fr auto;gap:.2rem .8rem;align-items:start;padding:.9rem;border:1px solid var(--line);border-radius:12px;background:var(--paper)}
.acts li.ok{background:var(--mist);border-color:var(--sage)}.act-icon{color:var(--moss);margin-top:2px}.acts li.ok .act-icon{color:var(--forest)}
.act-text small{display:block;color:var(--moss);font-size:.82rem;line-height:1.4}
.pts{background:var(--sage);color:var(--forest);font:700 .8rem var(--body);padding:.2rem .65rem;border-radius:999px;white-space:nowrap}.acts li.ok .pts{background:var(--forest);color:#fff}
.act-action{grid-column:2 / -1;margin-top:.5rem}
.earned{display:inline-flex;align-items:center;gap:.35rem;font-weight:600;font-size:.85rem;color:var(--forest)}
.reward .bar{height:8px}.reward .btn{margin-top:.4rem}
.field .upload-drop{display:flex;margin-bottom:0;flex-direction:column;align-items:center;justify-content:center;gap:.3rem;min-height:170px;border:2px dashed var(--moss);border-radius:var(--radius);background:var(--mist);color:var(--moss);cursor:pointer;text-align:center;padding:1rem;overflow:hidden;position:relative;font-weight:400!important}
.field .upload-drop:hover,.field .upload-drop:focus-within{background:var(--sage)}.upload-drop img{width:100%;max-height:260px;object-fit:cover;border-radius:10px}
.upload-drop input.file-input{position:absolute;width:1px;height:1px;padding:0;border:0;opacity:0;pointer-events:none}
.sub-list{display:grid;gap:1rem;margin-top:1rem}
.sub-card{display:grid;grid-template-columns:96px 1fr;gap:.9rem 1rem;padding:1rem;border:1px solid var(--line);border-radius:12px;background:var(--paper)}
.sub-card .sub-img{width:96px;height:96px;min-height:0;object-fit:cover;border-radius:10px;background:var(--sage)}
.sub-top{display:flex;justify-content:space-between;align-items:flex-start;gap:.6rem;flex-wrap:wrap;margin-bottom:.3rem}.sub-top h3{margin:0}
.sub-desc{margin:0 0 .4rem;font-size:.92rem}.sub-card .fine{margin:0 0 .4rem}
.sub-actions{grid-column:1 / -1;border-top:1px solid var(--line);padding-top:.9rem}.sub-actions p{margin:0 0 .6rem}.sub-actions input{margin-top:.6rem}
.btn-row.tight{margin:.6rem 0 0;align-items:center}
.choice-row{display:flex;flex-wrap:wrap;gap:.5rem}.choice-row .chip{display:inline-flex;align-items:center;gap:.4rem}
.status-tag{display:inline-flex;align-items:center;gap:.3rem;padding:.2rem .7rem;border-radius:999px;font:600 .8rem var(--body)}
.st-pending{background:var(--sage);color:var(--forest)}.st-approved{background:var(--forest);color:#fff}.st-rejected{background:#f6dfda;color:#9b3d2e}
/* Footer & toast */
.footer{background:var(--forest);color:var(--sage);padding:3rem 0 1.5rem}.footer .brand{color:#fff;margin-bottom:.6rem}
.brand img{height:44px;width:auto;display:block}.footer .brand img{height:56px;margin-left:-20px}@media(max-width:640px){.brand img{height:38px}}
.footer-inner{display:flex;justify-content:space-between;gap:2rem;flex-wrap:wrap}.footer-links{display:flex;gap:1.4rem;flex-wrap:wrap;align-items:flex-start}.footer-links a{color:var(--sage)}
.footer-note{margin-top:2rem;padding-top:1rem;border-top:1px solid rgba(213,229,212,.25);font-size:.85rem}
.toast{position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);background:var(--forest);color:#fff;padding:.9rem 1.4rem;border-radius:12px;display:flex;gap:.6rem;align-items:center;z-index:200;box-shadow:0 8px 30px rgba(0,0,0,.25);animation:fade .2s;max-width:92vw}
/* Responsive */
@media(max-width:960px){.prog-top{grid-template-columns:1fr}.g4{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(2,1fr)}.hero-grid,.split{grid-template-columns:1fr}.modal{grid-template-columns:1fr}.modal-img{min-height:220px;max-height:260px}}
@media(max-width:720px){
.nav-toggle{display:block}
.nav-links{position:absolute;top:68px;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;background:var(--paper);border-bottom:1px solid var(--line);padding:.5rem 4%;display:none}
.nav-links.open{display:flex}.nav-links a:not(.btn){padding:.9rem 0;border-bottom:1px solid var(--line)}.nav-links .btn{justify-content:center;margin:.8rem 0}
.g2,.g3,.g4{grid-template-columns:1fr}.day-panel{grid-template-columns:1fr}.day-panel-image{height:230px;min-height:0}.day-panel-content{padding:1.25rem}.section{padding:3rem 0}.hero-collage{grid-template-rows:150px 150px}.tl-step small{display:none}.sub-card{grid-template-columns:72px 1fr}.sub-card .sub-img{width:72px;height:72px}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

// ======================================================================
// APP + ROUTES
// ======================================================================

function AppRoutes() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <style>{CSS}</style>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/festival" element={<Festival />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/join" element={<JoinNow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </HashRouter>
  );
}