import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  ArrowDown, ArrowLeftRight, ArrowRight, Armchair, Award, Briefcase, Building2, Check, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, CirclePlay, Clock, Compass, Gift, Globe2, GraduationCap, Headphones, HeartPulse,
  Layers, Leaf, MapPin, Menu, Minus, PackageCheck, Plane, Plus, ShieldCheck, Sparkles, TrendingUp, UtensilsCrossed, UserRound, Users, Wrench,
  X, Zap,
} from 'lucide-react'

type TripType = 'one-way' | 'round-trip' | 'multi-city'
type PassengerCounts = { adults: number; children: number; infants: number }

interface DestinationItem {
  name: string
  code: string
  state: string
  country: string
  region: 'Domestic' | 'International'
  desc: string
  image: string
  alt: string
}

const destinations: DestinationItem[] = [
  {
    name: 'Bengaluru',
    code: 'BLR',
    state: 'Karnataka',
    country: 'India',
    region: 'Domestic',
    desc: 'Silicon Valley of India with Vidhana Soudha, lush gardens & IT tech hubs.',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=85',
    alt: 'Vidhana Soudha and Bengaluru city landmark in Karnataka',
  },
  {
    name: 'Kochi',
    code: 'COK',
    state: 'Kerala',
    country: 'India',
    region: 'Domestic',
    desc: 'Queen of the Arabian Sea with historic Chinese fishing nets & backwaters.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85',
    alt: 'Kochi backwaters and traditional houseboat in Kerala',
  },
  {
    name: 'Goa',
    code: 'GOA',
    state: 'Goa',
    country: 'India',
    region: 'Domestic',
    desc: 'Sun-kissed beaches, golden sands & Portuguese heritage.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85',
    alt: 'Goa palm trees and beach in Goa',
  },
  {
    name: 'Tirupati',
    code: 'TIR',
    state: 'Andhra Pradesh',
    country: 'India',
    region: 'Domestic',
    desc: 'Spiritual sanctuary nestled in the sacred Seshachalam Hills.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=85',
    alt: 'Tirupati temple architecture in Andhra Pradesh',
  },
  {
    name: 'Chennai',
    code: 'MAA',
    state: 'Tamil Nadu',
    country: 'India',
    region: 'Domestic',
    desc: 'Cultural capital of South India with timeless traditions and coastal beauty.',
    image: 'https://images.unsplash.com/photo-1590421959604-741d0eec0a2e?auto=format&fit=crop&w=900&q=85',
    alt: 'Chennai coastline and culture in Tamil Nadu',
  },
  {
    name: 'Hyderabad',
    code: 'HYD',
    state: 'Telangana',
    country: 'India',
    region: 'Domestic',
    desc: 'City of Pearls blending royal Nizami architecture with modern tech.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85',
    alt: 'Hyderabad Charminar architecture in Telangana',
  },
  {
    name: 'Mumbai',
    code: 'BOM',
    state: 'Maharashtra',
    country: 'India',
    region: 'Domestic',
    desc: 'City of Dreams, bustling sea promenades, and iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=900&q=85',
    alt: 'Mumbai Gateway of India skyline in Maharashtra',
  },
  {
    name: 'Trivandrum',
    code: 'TRV',
    state: 'Kerala',
    country: 'India',
    region: 'Domestic',
    desc: 'Evergreen city of India surrounded by coastal beauty and grand temples.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85',
    alt: 'Trivandrum lush green landscape in Kerala',
  },
  {
    name: 'Madurai',
    code: 'IXM',
    state: 'Tamil Nadu',
    country: 'India',
    region: 'Domestic',
    desc: 'Ancient Lotus City famous for heritage & Meenakshi Temple.',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=900&q=85',
    alt: 'Madurai Meenakshi Temple in Tamil Nadu',
  },
  {
    name: 'Vijayawada',
    code: 'VGA',
    state: 'Andhra Pradesh',
    country: 'India',
    region: 'Domestic',
    desc: 'Place of Victory along the banks of the sacred Krishna River.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=900&q=85',
    alt: 'Vijayawada Krishna River viewpoint in Andhra Pradesh',
  },
  {
    name: 'Dubai',
    code: 'DXB',
    state: 'Dubai',
    country: 'United Arab Emirates',
    region: 'International',
    desc: 'Futuristic metropolis of luxury, soaring skyscrapers & desert dunes.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85',
    alt: 'Dubai skyline and architecture',
  },
  {
    name: 'Singapore',
    code: 'SIN',
    state: 'Singapore',
    country: 'Singapore',
    region: 'International',
    desc: "South East Asia's premier aviation gateway and garden city.",
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=85',
    alt: 'Singapore Marina Bay Sands',
  },
]

const fleetData = [
  {
    name: 'ATR 72-600',
    title: 'The Regional Workhorse',
    category: 'Short-Haul Regional Turboprop',
    desc: "Designed for efficient regional connectivity, the ATR 72-600 forms the foundation of MMM Airways' regional network across South India's Tier-2 & Tier-3 airports.",
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=85',
    specs: [
      { label: 'Seating Capacity', value: '72 Seats' },
      { label: 'Cruise Speed', value: '510 km/h' },
      { label: 'Flight Range', value: '1,528 km' },
      { label: 'Fuel Burn', value: '~900 L/hr' },
    ],
    actionText: 'Explore ATR Network',
    actionHref: '#schedule',
  },
  {
    name: 'Airbus A320 NEO',
    title: 'The Growth Catalyst',
    category: 'High-Demand Narrowbody Jet',
    desc: "As MMM Airways expands beyond regional connectivity, the Airbus A320 NEO fleet will connect South India with India's major metropolitan markets and future international destinations.",
    image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1000&q=85',
    specs: [
      { label: 'Seating Capacity', value: '180 Seats' },
      { label: 'Cruise Speed', value: '833 km/h' },
      { label: 'Flight Range', value: '6,300 km' },
      { label: 'Fuel Burn', value: '2,400 kg/hr' },
    ],
    actionText: 'Explore Metro Routes',
    actionHref: '#schedule',
  },
]

const fleetRoadmap = [
  { year: 'Year 1', fy: 'FY2027', phase: 'Launch Phase', count: '5 Aircraft', detail: '5 ATR' },
  { year: 'Year 2', fy: 'FY2028', phase: 'Regional Expansion', count: '8 Aircraft', detail: '8 ATR' },
  { year: 'Year 3', fy: 'FY2029', phase: 'Metro Induction', count: '15 Aircraft', detail: '12 ATR + 3 A320 NEO' },
  { year: 'Year 4', fy: 'FY2030', phase: 'Network Scaling', count: '24 Aircraft', detail: '18 ATR + 6 A320 NEO' },
  { year: 'Year 5', fy: 'FY2031', phase: 'Full Maturity & IPO Target', count: '35 Aircraft', detail: '25 ATR + 10 A320 NEO' },
]

const faresData = [
  {
    name: 'Saver',
    tagline: 'Best for Early Planners',
    popular: false,
    features: [
      'Basic comfortable seat',
      'Standard cabin baggage (7kg)',
      'Lowest available fare',
      'RCS subsidy seats available',
    ],
    cta: 'Select Saver',
  },
  {
    name: 'Economy',
    tagline: 'Best for Everyday Travel',
    popular: false,
    features: [
      'Standard seat selection',
      'Cabin baggage + check-in bag',
      'Flexible change options',
      'Complimentary snack',
    ],
    cta: 'Select Economy',
  },
  {
    name: 'Flex',
    tagline: 'Best for Business Travellers',
    popular: true,
    features: [
      'Free seat selection',
      'Zero date change fee',
      'Priority check-in & boarding',
      'Extra baggage allowance',
    ],
    cta: 'Select Flex',
  },
  {
    name: 'Premium',
    tagline: 'Best for Maximum Flexibility',
    popular: false,
    features: [
      'Front-row extra legroom seat',
      'Full flexibility & refundability',
      'Priority baggage delivery',
      'Lounge access where available',
    ],
    cta: 'Select Premium',
  },
]

const leadershipData = [
  {
    name: 'Mr. M. Arunkumar',
    role: 'Founder & Chairman',
    expertise: 'SOP, NSOP, MRO, Airline Ticketing – Strategic Growth & Partnerships',
    tag: 'Executive Leadership',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Mr. V.P. Balaji',
    role: 'CEO',
    expertise: 'Corporate Governance, Financial Strategy, Regulatory Coordination',
    tag: 'Executive Leadership',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'L. Meena',
    role: 'Director',
    expertise: 'Business Operations & Quality Management',
    tag: 'Executive Leadership',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'T V Aarshid',
    role: 'Director',
    expertise: 'Business Operations & Regional Route Expansion',
    tag: 'Executive Leadership',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Gnanasekar',
    role: 'Board Member',
    expertise: 'DGCA, AAI, BCAS — Aviation Security & Regulatory Compliance',
    tag: 'Board & Governance',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Karunagaran',
    role: 'Board Member',
    expertise: 'DGCA, AAI, BCAS — Aviation Security & Regulatory Compliance',
    tag: 'Board & Governance',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Air Cmdre Anil Kumar Sinha',
    role: 'Board Member',
    expertise: 'DGCA, AAI, BCAS — Aviation & Security Expert',
    tag: 'Board & Governance',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Mr. Mohan Chunduri (USA)',
    role: 'Aviation Consultant',
    expertise: 'Global Aviation, Business & Operating Planning, Regulatory Affairs',
    tag: 'Advisory Board',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Capt Ekta Gandhi',
    role: 'Investment Banker / Advisor',
    expertise: '4,800+ Flight Hrs | Former IAF Sqn Leader | IndiGo A320 Captain',
    tag: 'Advisory Board',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'Rajesh',
    role: 'Financial Advisor',
    expertise: 'Financial Advisory & Capital Structuring',
    tag: 'Advisory Board',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=85',
  },
  {
    name: 'S. Deepika',
    role: 'Administration',
    expertise: 'Executive Administration & Operations',
    tag: 'Management',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=85',
  },
]

const benefits = [
  { icon: ShieldCheck, title: 'Safe & Secure', text: 'Your safety is our top priority.' },
  { icon: Armchair, title: 'Comfortable Seating', text: 'Relax in spacious, modern cabins.' },
  { icon: UtensilsCrossed, title: 'Delicious Meals', text: 'A taste of the world on board.' },
  { icon: Headphones, title: '24/7 Support', text: 'We’re always here for you.' },
  { icon: Gift, title: 'Exclusive Rewards', text: 'Fly more, earn more.' },
  { icon: Leaf, title: 'Sustainable Skies', text: 'A greener tomorrow for generations.' },
]

const values = [
  { icon: ShieldCheck, title: 'Safety First', text: 'Advanced safety standards and professional operations.' },
  { icon: Sparkles, title: 'Premium Comfort', text: 'Thoughtful details for a comfortable, relaxing journey.' },
  { icon: Globe2, title: 'Global Connectivity', text: 'Connecting people to the destinations that matter.' },
  { icon: UserRound, title: 'Customer First', text: 'Care and support at every stage of your journey.' },
]

const experiences = [
  { title: 'A quieter kind of luxury', label: 'THE PREMIUM CABIN', image: 'https://images.unsplash.com/photo-1529990131237-cfa5ce9517b6?auto=format&fit=crop&w=1100&q=85', alt: 'A calm, blue-toned passenger aircraft cabin' },
  { title: 'Room to settle in', label: 'COMFORT, CONSIDERED', image: 'https://images.unsplash.com/photo-1597388522516-a755e0fcfc72?auto=format&fit=crop&w=900&q=85', alt: 'Comfortable passenger aircraft seating' },
  { title: 'A view worth lingering over', label: 'THE JOURNEY, IN FRAME', image: 'https://images.unsplash.com/photo-1530469641172-8ac15d0a7d6a?auto=format&fit=crop&w=900&q=85', alt: 'Airplane wing and clouds seen from the cabin' },
  { title: 'A little something delicious', label: 'DINING ABOVE THE CLOUDS', image: 'https://images.unsplash.com/photo-1661354421565-74ffd9650918?auto=format&fit=crop&w=1000&q=85', alt: 'A thoughtfully plated meal served at a dining table' },
  { title: 'A softer start to your journey', label: 'THE MMM LOUNGE', image: 'https://images.unsplash.com/photo-1627750673161-02af15c7c722?auto=format&fit=crop&w=1000&q=85', alt: 'A bright airport lounge with window-side seating' },
]

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'MMM Airways — Fly Beyond Boundaries' },
      { name: 'description', content: 'Discover a more considered way to travel. Explore destinations and plan your next journey with MMM Airways.' },
      { property: 'og:title', content: 'MMM Airways — Fly Beyond Boundaries' },
      { property: 'og:description', content: 'Your journey, our priority. Discover destinations and plan your next journey with MMM Airways.' },
    ],
  }),
  component: Home,
})

function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dialog, setDialog] = useState<'story' | 'account' | null>(null)
  const [accountMode, setAccountMode] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    document.body.classList.add('motion-ready')
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      })
    }, { rootMargin: '-35% 0px -55% 0px' })
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section))
    return () => {
      document.body.classList.remove('motion-ready')
      window.removeEventListener('scroll', onScroll)
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Book Flight', href: '#book', id: 'book' },
    { label: 'Destinations', href: '#destinations', id: 'destinations' },
    { label: 'Our Fleet', href: '#fleet', id: 'fleet' },
    { label: 'Fare Options', href: '#fares', id: 'fares' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Leadership', href: '#leadership', id: 'leadership' },
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <a className="brand-lockup" href="#home" aria-label="MMM Airways home" onClick={() => setMobileOpen(false)}>
          <img src={scrolled ? "/logo.png" : "/logo-light.png"} alt="MMM Airways" className="brand-logo-img" />
        </a>
        <nav className={`desktop-nav ${mobileOpen ? 'mobile-nav-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.id} className={activeSection === item.id ? 'nav-link nav-link-active' : 'nav-link'} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>
          ))}
          <button className="mobile-account" onClick={() => { setDialog('account'); setMobileOpen(false) }}>Login / Sign Up <ArrowRight size={15} /></button>
        </nav>
        <div className="header-actions">
          <button className="login-button" onClick={() => { setAccountMode('login'); setDialog('account') }}>Login / Sign Up</button>
          <button className="account-icon" aria-label="Open account sign-in" onClick={() => { setAccountMode('login'); setDialog('account') }}><UserRound size={17} /></button>
          <button className="menu-button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src="https://images.unsplash.com/photo-1762900583344-3831126349b9?auto=format&fit=crop&w=2400&q=90" alt="Passenger aircraft soaring above the clouds" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" />FLY BEYOND BOUNDARIES</div>
              <h1>Your Journey<br /><span>Our Priority</span></h1>
              <p>Experience comfort, safety and world-class service with MMM Airways. We connect you to the places that matter most.</p>
              <div className="hero-actions">
                <a className="button button-blue" href="#book">Book Your Flight <ArrowRight size={17} /></a>
                <button className="story-button" onClick={() => setDialog('story')}><span className="play-circle"><CirclePlay size={27} /></span><span>Watch Our Story</span></button>
              </div>
              <div className="hero-footnote"><span className="footnote-dot" /> A more considered way to travel</div>
            </div>
            <div className="hero-aside"><span>MM</span><span>WORLDWIDE<br />CONNECTIONS</span></div>
          </div>
          <a className="scroll-cue" href="#book" aria-label="Scroll to flight search"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
          <div className="hero-coordinate">17° 24’ N&nbsp;&nbsp; 78° 28’ E <span>—&nbsp; 35,000 FT</span></div>
        </section>

        <FlightSearch />

        <section className="benefits page-width" aria-label="The MMM Airways difference">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <article className="benefit reveal" data-reveal key={title} style={{ animationDelay: `${index * 65}ms` }}>
              <span className="benefit-icon"><Icon size={22} strokeWidth={1.7} /></span>
              <h2>{title}</h2><p>{text}</p>
            </article>
          ))}
        </section>

        <DestinationsSection />

        <DualFleetSection />

        <FareStructureSection />

        <section className="offer-section page-width" id="offers" data-reveal>
          <img src="https://images.unsplash.com/photo-1762486979891-b31db208ce3e?auto=format&fit=crop&w=2200&q=85" alt="Golden clouds and the wing of an aircraft at sunset" loading="lazy" />
          <div className="offer-overlay" />
          <div className="offer-content"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />THE WORLD, A LITTLE CLOSER</span><h2>Exclusive Offers<br /><em>Just for You</em></h2><p>Find the right moment to go. Discover seasonal fares and thoughtful extras for your next journey.</p><a className="button button-light" href="#book">View Offers <ArrowRight size={17} /></a></div>
          <div className="offer-stamp"><Compass size={19} /><span>YOUR NEXT<br />CHAPTER</span></div>
        </section>

        <ServicesEcosystemSection />

        <section className="why-section section-pad">
          <div className="page-width why-layout">
            <div className="why-intro" data-reveal><span className="eyebrow"><span className="eyebrow-line" />THE MMM STANDARD</span><h2>Why Fly With<br /><em>MMM Airways?</em></h2><p>It’s the small details, the steady reassurance and the care you feel from takeoff to arrival that make a journey truly memorable.</p><a className="text-link" href="#about">Discover what sets us apart <ArrowRight size={16} /></a></div>
            <div className="values-grid">
              {values.map(({ icon: Icon, title, text }, index) => <article className="value-card reveal" data-reveal key={title} style={{ animationDelay: `${index * 80}ms` }}><span className="value-number">0{index + 1}</span><Icon size={23} strokeWidth={1.7} /><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <LeadershipSection />

        <AboutSection />

        <section className="experience-section section-pad" id="experience">
          <div className="page-width">
            <div className="section-heading experience-heading" data-reveal><div><span className="eyebrow"><span className="eyebrow-line" />A JOURNEY THAT FEELS LIKE YOURS</span><h2>Make yourself<br /><em>at home in the sky.</em></h2></div><p>Considered comfort, a warm welcome, and thoughtful touches that make the miles feel a little shorter.</p></div>
            <div className="experience-grid">{experiences.map((item, index) => <article className={`experience-card experience-card-${index + 1} reveal`} data-reveal key={item.title} style={{ animationDelay: `${index * 100}ms` }}><img src={item.image} alt={item.alt} loading="lazy" /><div className="experience-shade" /><div className="experience-caption"><span>{item.label}</span><h3>{item.title}</h3></div><span className="experience-arrow"><ArrowRight size={18} /></span></article>)}</div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer onAccount={() => { setAccountMode('signup'); setDialog('account') }} />

      {dialog === 'story' && <Modal title="A different point of view" onClose={() => setDialog(null)}><div className="story-modal-image"><img src="https://images.unsplash.com/photo-1769945967065-ec805ecc7e6b?auto=format&fit=crop&w=1200&q=85" alt="An aircraft passing through the clouds" /><span className="story-modal-play"><CirclePlay size={38} /></span></div><span className="eyebrow"><span className="eyebrow-line" />THE MMM AIRWAYS STORY</span><p>Every journey is a chance to feel closer to somewhere — and to someone. We’re here to make every mile matter.</p><button className="button button-blue" onClick={() => { setDialog(null); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}>Get to know us <ArrowRight size={16} /></button></Modal>}
      {dialog === 'account' && <Modal title={accountMode === 'login' ? 'Welcome aboard' : 'Start your journey'} onClose={() => setDialog(null)}><AccountForm mode={accountMode} setMode={setAccountMode} /></Modal>}
    </div>
  )
}

function FlightSearch() {
  const [trip, setTrip] = useState<TripType>('round-trip')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [depart, setDepart] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const [passengers, setPassengers] = useState<PassengerCounts>({ adults: 1, children: 0, infants: 0 })
  const [passengerOpen, setPassengerOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [extraCity, setExtraCity] = useState(false)
  const [nextCity, setNextCity] = useState('')
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const passengerLabel = [
    passengers.adults > 0 ? `${passengers.adults} ${passengers.adults === 1 ? 'Adult' : 'Adults'}` : '',
    passengers.children > 0 ? `${passengers.children} ${passengers.children === 1 ? 'Child' : 'Children'}` : '',
    passengers.infants > 0 ? `${passengers.infants} ${passengers.infants === 1 ? 'Infant' : 'Infants'}` : '',
  ].filter(Boolean).join(', ')

  const updatePassenger = (key: keyof PassengerCounts, change: number) => setPassengers((current) => {
    const nextCount = current[key] + change
    const currentTotal = current.adults + current.children + current.infants
    if (change > 0 && (currentTotal >= 9 || (key === 'infants' && nextCount > current.adults))) return current
    return { ...current, [key]: Math.max(key === 'adults' ? 1 : 0, Math.min(9, nextCount)) }
  })

  useEffect(() => {
    const handleDestination = (event: Event) => setTo((event as CustomEvent<string>).detail)
    window.addEventListener('mmm-destination', handleDestination)
    return () => window.removeEventListener('mmm-destination', handleDestination)
  }, [])

  const submitSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('')
    if (!from.trim() || !to.trim() || !depart) {
      setStatus('Add your departure, arrival and travel date to continue.')
      return
    }
    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setStatus('Choose two different cities for your journey.')
      return
    }
    if (trip === 'round-trip' && !returnDate) {
      setStatus('Choose a return date for your round trip.')
      return
    }
    if (trip === 'round-trip' && returnDate < depart) {
      setStatus('Your return date needs to be after your departure date.')
      return
    }
    if (trip === 'multi-city' && extraCity && !nextCity.trim()) {
      setStatus('Add the next city in your multi-city journey.')
      return
    }
    setLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    setLoading(false)
    const journey = trip === 'multi-city' && extraCity ? `${from.trim()} to ${to.trim()}, then ${nextCity.trim()}` : `${from.trim()} to ${to.trim()}`
    setStatus(`Journey details are ready for ${journey}. Live flight availability will appear when booking is connected.`)
  }

  return (
    <section className="booking-wrap page-width" id="book" aria-label="Search for flights">
      <div className="booking-card">
        <div className="booking-topline"><div><span className="eyebrow"><span className="eyebrow-line" />PLAN YOUR NEXT JOURNEY</span><h2>Where will you go?</h2></div><span className="booking-ref">MMM&nbsp; / &nbsp;FLIGHT SEARCH</span></div>
        <div className="trip-tabs" role="tablist" aria-label="Trip type">
          {([{ key: 'one-way', text: 'One Way', icon: Plane }, { key: 'round-trip', text: 'Round Trip', icon: ArrowLeftRight }, { key: 'multi-city', text: 'Multi-City', icon: Plus }] as const).map(({ key, text, icon: Icon }) => <button type="button" role="tab" aria-selected={trip === key} className={`trip-tab ${trip === key ? 'trip-tab-active' : ''}`} key={key} onClick={() => { setTrip(key); setStatus(''); setExtraCity(false) }}><Icon size={16} />{text}</button>)}
        </div>
        <form className="flight-form" onSubmit={submitSearch} noValidate>
          <div className="flight-fields">
            <label className="field-box"><span>FROM</span><span className="field-input-row"><MapPin size={17} /><input aria-label="Departure city or airport" value={from} onChange={(event) => setFrom(event.target.value)} placeholder="Departure city / Airport" autoComplete="off" /></span></label>
            <button className="route-swap" aria-label="Swap departure and arrival" type="button" onClick={() => { setFrom(to); setTo(from) }}><ArrowLeftRight size={17} /></button>
            <label className="field-box"><span>TO</span><span className="field-input-row"><MapPin size={17} /><input aria-label="Arrival city or airport" value={to} onChange={(event) => setTo(event.target.value)} placeholder="Arrival city / Airport" autoComplete="off" /></span></label>
            <label className="field-box date-field"><span>DEPARTURE</span><span className="field-input-row"><input aria-label="Departure date" type="date" min={today} value={depart} onChange={(event) => setDepart(event.target.value)} /></span></label>
            {trip === 'round-trip' && <label className="field-box date-field"><span>RETURN</span><span className="field-input-row"><input aria-label="Return date" type="date" min={depart || today} value={returnDate} onChange={(event) => setReturnDate(event.target.value)} /></span></label>}
            {trip === 'multi-city' && <button className="add-city-button" type="button" onClick={() => setExtraCity(!extraCity)}>{extraCity ? <Minus size={15} /> : <Plus size={15} />}{extraCity ? 'Remove city' : 'Add another city'}</button>}
            {trip === 'multi-city' && extraCity && <label className="field-box extra-city-field"><span>ADDITIONAL CITY</span><span className="field-input-row"><MapPin size={17} /><input aria-label="Additional city" value={nextCity} onChange={(event) => setNextCity(event.target.value)} placeholder="Next city / Airport" /></span></label>}
            <div className="passenger-field">
              <span className="field-label">TRAVELERS</span>
              <button className="field-box passenger-button" type="button" aria-expanded={passengerOpen} onClick={() => setPassengerOpen(!passengerOpen)}><span className="field-input-row"><UserRound size={17} /><span>{passengerLabel}</span><ChevronDown className="passenger-chevron" size={15} /></span></button>
              {passengerOpen && <div className="passenger-popover"><div className="passenger-popover-heading"><strong>Travelers</strong><button type="button" aria-label="Close travelers selector" onClick={() => setPassengerOpen(false)}><X size={16} /></button></div>{([{ key: 'adults', label: 'Adults', note: 'Age 12+' }, { key: 'children', label: 'Children', note: 'Age 2–11' }, { key: 'infants', label: 'Infants', note: 'Under 2' }] as const).map(({ key, label, note }) => <div className="counter-row" key={key}><span><b>{label}</b><small>{note}</small></span><span className="counter-controls"><button type="button" aria-label={`Remove one ${label.toLowerCase()}`} onClick={() => updatePassenger(key, -1)}><Minus size={14} /></button><b>{passengers[key]}</b><button type="button" aria-label={`Add one ${label.toLowerCase()}`} onClick={() => updatePassenger(key, 1)}><Plus size={14} /></button></span></div>)}<button className="passenger-done" type="button" onClick={() => setPassengerOpen(false)}>Done</button></div>}
            </div>
          </div>
          <div className="flight-submit-row"><p>Ready when you are. Let’s find your way there.</p><button className="button button-blue search-button" type="submit" disabled={loading}>{loading ? <><span className="button-spinner" /> Finding your way…</> : <>Search Flights <ArrowRight size={17} /></>}</button></div>
          {status && <p className={`booking-status ${status.startsWith('Journey') ? 'booking-status-success' : ''}`} role="status">{status.startsWith('Journey') && <Check size={15} />}{status}</p>}
        </form>
      </div>
      <div className="booking-trust"><span><ShieldCheck size={14} />Secure booking</span><span>Care in every detail</span><span>Here for you, 24/7</span></div>
    </section>
  )
}

function DestinationsSection() {
  const [filter, setFilter] = useState<'all' | 'Domestic' | 'International'>('all')
  const [viewMode, setViewMode] = useState<'cylinder' | 'grid'>('cylinder')
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isSpinning, setIsSpinning] = useState(true)

  const filteredDestinations = destinations.filter(
    (d) => filter === 'all' || d.region === filter
  )

  const N = filteredDestinations.length

  const handlePrev = () => {
    setIsSpinning(false)
    const step = 360 / Math.max(1, N)
    setRotationAngle((prev) => prev + step)
  }

  const handleNext = () => {
    setIsSpinning(false)
    const step = 360 / Math.max(1, N)
    setRotationAngle((prev) => prev - step)
  }

  return (
    <section className="destinations-section section-pad" id="destinations">
      <div className="page-width">
        <div className="section-heading destination-heading" data-reveal>
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />POPULAR DESTINATIONS</span>
            <h2>Explore the World<br /><em>with MMM Airways</em></h2>
          </div>
          <div className="section-heading-aside">
            <p>Discover 10 domestic and 2 international hub destinations across India, UAE &amp; Singapore.</p>
            <div className="destination-controls-row">
              <div className="filter-tabs">
                <button
                  type="button"
                  className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => { setFilter('all'); setRotationAngle(0); }}
                >
                  All ({destinations.length})
                </button>
                <button
                  type="button"
                  className={`filter-tab ${filter === 'Domestic' ? 'active' : ''}`}
                  onClick={() => { setFilter('Domestic'); setRotationAngle(0); }}
                >
                  Domestic (10)
                </button>
                <button
                  type="button"
                  className={`filter-tab ${filter === 'International' ? 'active' : ''}`}
                  onClick={() => { setFilter('International'); setRotationAngle(0); }}
                >
                  International (2)
                </button>
              </div>

              <div className="view-toggle">
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'cylinder' ? 'active' : ''}`}
                  onClick={() => setViewMode('cylinder')}
                  title="3D Cylinder Showcase"
                >
                  <Sparkles size={13} /> 3D View
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid Layout"
                >
                  Grid View
                </button>
              </div>
            </div>
          </div>
        </div>

        {viewMode === 'cylinder' ? (
          <div className="scene-container">
            <button
              type="button"
              className="cylinder-nav prev"
              aria-label="Previous destination"
              onClick={handlePrev}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Reference 3D Cylinder Scene HTML structure */}
            <div className="scene">
              <div
                className={`a3d ${isSpinning ? 'auto-spin' : ''}`}
                style={
                  {
                    '--n': N,
                    transform: isSpinning ? undefined : `rotateY(${rotationAngle}deg)`,
                  } as React.CSSProperties
                }
              >
                {filteredDestinations.map((destination, i) => (
                  <div
                    key={destination.code}
                    className="card destination-3d-card"
                    style={{ '--i': i } as React.CSSProperties}
                  >
                    <DestinationCard destination={destination} index={i} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="cylinder-nav next"
              aria-label="Next destination"
              onClick={handleNext}
            >
              <ChevronRight size={22} />
            </button>

            <div className="cylinder-play-controls">
              <button
                type="button"
                className="spin-toggle-btn"
                onClick={() => setIsSpinning(!isSpinning)}
              >
                {isSpinning ? 'Pause Rotation' : 'Auto Rotate'}
              </button>
            </div>
          </div>
        ) : (
          <div className="destination-grid">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard key={destination.code} destination={destination} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function DestinationCard({ destination, index }: { destination: DestinationItem; index: number }) {
  const [selected, setSelected] = useState(false)
  const chooseDestination = () => {
    setSelected(true)
    window.dispatchEvent(new CustomEvent('mmm-destination', { detail: destination.name }))
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => setSelected(false), 1500)
  }
  return (
    <article className="destination-card reveal" data-reveal style={{ animationDelay: `${(index % 4) * 85}ms` }}>
      <img src={destination.image} alt={destination.alt} />
      <div className="destination-gradient" />
      <div className="destination-badges">
        <span className="destination-region-badge">{destination.region}</span>
        <span className="destination-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="destination-info">
        <div>
          <span className="destination-code"><Plane size={13} /> {destination.code}</span>
          <h3>{destination.name}</h3>
          <span className="destination-country">{destination.state}, {destination.country}</span>
          <p className="destination-desc">{destination.desc}</p>
        </div>
        <button
          className="destination-arrow"
          onClick={chooseDestination}
          aria-label={`Plan a trip to ${destination.name}`}
          title={`Book flight to ${destination.name}`}
        >
          {selected ? <Check size={19} /> : <ArrowRight size={19} />}
        </button>
      </div>
    </article>
  )
}

function DualFleetSection() {
  return (
    <section className="fleet-section section-pad" id="fleet">
      <div className="page-width">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />DUAL-FLEET STRATEGY</span>
            <h2>Our Fleet<br /><em>Built for Efficiency &amp; Reach</em></h2>
          </div>
          <p className="max-w-xl text-muted-foreground text-sm">
            Combines high-efficiency turboprops for unserved regional routes with modern narrowbody jets for high-density metropolitan routes.
          </p>
        </div>

        <div className="fleet-grid">
          {fleetData.map((fleet) => (
            <article key={fleet.name} className="fleet-card reveal" data-reveal>
              <div className="fleet-image-wrap">
                <img src={fleet.image} alt={fleet.name} loading="lazy" />
                <span className="fleet-badge">{fleet.category}</span>
              </div>
              <div className="fleet-body">
                <span className="fleet-subtitle">{fleet.title}</span>
                <h3>{fleet.name}</h3>
                <p className="fleet-desc">{fleet.desc}</p>
                <div className="fleet-specs">
                  {fleet.specs.map((spec) => (
                    <div key={spec.label} className="spec-item">
                      <small>{spec.label}</small>
                      <strong>{spec.value}</strong>
                    </div>
                  ))}
                </div>
                <a className="button button-blue w-full justify-center" href={fleet.actionHref}>
                  {fleet.actionText} <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="roadmap-wrap reveal" data-reveal>
          <div className="roadmap-header">
            <span className="eyebrow eyebrow-light"><span className="eyebrow-line" />FLEET ROADMAP</span>
            <h3>5-Year Fleet Growth Timeline</h3>
            <p className="text-sm text-blue-200 mt-1">Scaling from 5 regional aircraft to a 35-aircraft dual-fleet platform by FY2031.</p>
          </div>
          <div className="roadmap-grid">
            {fleetRoadmap.map((step) => (
              <div key={step.year} className="roadmap-step">
                <div className="step-year">{step.year}</div>
                <div className="step-fy">{step.fy}</div>
                <div className="step-phase">{step.phase}</div>
                <div className="step-count">{step.count} ({step.detail})</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FareStructureSection() {
  return (
    <section className="fares-section section-pad bg-secondary/30" id="fares">
      <div className="page-width">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />FARE STRUCTURE</span>
            <h2>Transparent &amp; Flexible<br /><em>Fare Options</em></h2>
          </div>
          <p className="max-w-xl text-muted-foreground text-sm">
            Designed around dynamic pricing, UDAN-RCS seats, and customer flexibility.
          </p>
        </div>

        <div className="fares-grid">
          {faresData.map((fare) => (
            <article key={fare.name} className={`fare-card ${fare.popular ? 'fare-card-popular' : ''} reveal`} data-reveal>
              {fare.popular && <span className="popular-badge">Most Popular</span>}
              <h3 className="fare-title">{fare.name}</h3>
              <p className="fare-tagline">{fare.tagline}</p>
              <ul className="fare-features">
                {fare.features.map((feat) => (
                  <li key={feat}><CheckCircle2 size={16} /> <span>{feat}</span></li>
                ))}
              </ul>
              <a className={`button ${fare.popular ? 'button-blue' : 'button-light'} w-full justify-center`} href="#book">
                {fare.cta} <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesEcosystemSection() {
  return (
    <section className="services-section section-pad" id="services">
      <div className="page-width">
        <div className="section-heading" data-reveal>
          <div>
            <span className="eyebrow"><span className="eyebrow-line" />INTEGRATED AVIATION PLATFORM</span>
            <h2>Cargo, Charter, MRO<br /><em>&amp; Flight Training</em></h2>
          </div>
          <p className="max-w-xl text-muted-foreground text-sm">
            Building a complete South Indian aviation ecosystem extending far beyond passenger travel.
          </p>
        </div>

        <div className="services-tabs">
          <article className="service-box reveal" data-reveal>
            <div className="service-icon"><PackageCheck size={26} /></div>
            <h3>Cargo &amp; Supply Chain</h3>
            <p>Moving India's Business Forward. Regional ATR &amp; A320 belly-cargo network connecting key production hubs with same-day express delivery.</p>
            <div className="text-xs font-semibold text-primary mb-3">Capacity: Up to 1,500kg (ATR) / 3,500kg (A320 NEO) per flight</div>
            <div className="service-list">
              <span className="service-tag">Pharmaceutical Logistics</span>
              <span className="service-tag">Fresh Seafood Transport</span>
              <span className="service-tag">Floriculture &amp; Agriculture</span>
              <span className="service-tag">E-commerce Express</span>
            </div>
          </article>

          <article className="service-box reveal" data-reveal style={{ animationDelay: '100ms' }}>
            <div className="service-icon"><Plane size={26} /></div>
            <h3>NSOP Charter Operations</h3>
            <p>Your Journey. Your Aircraft. Customized corporate, luxury, group, and emergency medical charter services across South India.</p>
            <div className="service-list">
              <span className="service-tag">Corporate Travel</span>
              <span className="service-tag">Medical Evacuation</span>
              <span className="service-tag">Pilgrimage (Tirupati/Goa)</span>
              <span className="service-tag">Tourism &amp; Resorts</span>
              <span className="service-tag">Special Missions</span>
              <span className="service-tag">Sports Delegations</span>
            </div>
          </article>

          <article className="service-box reveal" data-reveal style={{ animationDelay: '200ms' }}>
            <div className="service-icon"><Wrench size={26} /></div>
            <h3>CAR-145 MRO Hub</h3>
            <p>Keeping Aircraft Ready. Third-party CAR-145 MRO operation supporting ATR 72-600 and A320 NEO fleet maintenance.</p>
            <div className="service-list">
              <span className="service-tag">Line Maintenance &amp; Checks</span>
              <span className="service-tag">Heavy Maintenance</span>
              <span className="service-tag">Avionics Support</span>
              <span className="service-tag">Engineering Services</span>
            </div>
          </article>

          <article className="service-box reveal" data-reveal style={{ animationDelay: '300ms' }}>
            <div className="service-icon"><GraduationCap size={26} /></div>
            <h3>FTO Aviation Academy</h3>
            <p>MMM Flight Academy. Training future pilots, cabin crew, and safety engineers through CPL/ATPL cadet programs and simulator centers.</p>
            <div className="service-list">
              <span className="service-tag">CPL &amp; ATPL Training</span>
              <span className="service-tag">ATR &amp; A320 Type Rating</span>
              <span className="service-tag">Cabin Crew &amp; Safety</span>
              <span className="service-tag">Simulator Center</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function LeadershipSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const updateCarousel = (newIndex: number) => {
    const total = leadershipData.length
    setCurrentIndex((newIndex + total) % total)
  }

  const activeMember = leadershipData[currentIndex]

  return (
    <section className="leadership-carousel-section section-pad bg-secondary/20" id="leadership">
      <div className="about-title-bg" aria-hidden="true">OUR LEADERSHIP</div>
      <div className="page-width relative z-10">
        <div className="section-heading text-center items-center" data-reveal>
          <span className="eyebrow"><span className="eyebrow-line" />LEADERSHIP &amp; ADVISORY BOARD</span>
          <h2>Guided by Industry Pioneers</h2>
          <p className="max-w-xl text-muted-foreground text-sm mx-auto">
            Experienced aviation executives, regulatory authorities, and financial advisors driving MMM Airways forward.
          </p>
        </div>

        <div className="leadership-carousel-container">
          <button
            type="button"
            className="leadership-nav-arrow left"
            aria-label="Previous leader"
            onClick={() => updateCarousel(currentIndex - 1)}
          >
            ‹
          </button>

          <div className="leadership-carousel-track">
            {leadershipData.map((member, i) => {
              const total = leadershipData.length
              const offset = (i - currentIndex + total) % total

              let positionClass = 'hidden'
              if (offset === 0) positionClass = 'center'
              else if (offset === 1) positionClass = 'right-1'
              else if (offset === 2) positionClass = 'right-2'
              else if (offset === total - 1) positionClass = 'left-1'
              else if (offset === total - 2) positionClass = 'left-2'

              return (
                <div
                  key={member.name}
                  className={`leadership-card ${positionClass}`}
                  onClick={() => updateCarousel(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${member.name}`}
                >
                  <img src={member.image} alt={member.name} />
                </div>
              )
            })}
          </div>

          <button
            type="button"
            className="leadership-nav-arrow right"
            aria-label="Next leader"
            onClick={() => updateCarousel(currentIndex + 1)}
          >
            ›
          </button>
        </div>

        <div className="leadership-member-info">
          <span className="leadership-member-tag">{activeMember.tag}</span>
          <div>
            <h3 className="leadership-member-name">{activeMember.name}</h3>
          </div>
          <p className="leadership-member-role">{activeMember.role}</p>
          <p className="leadership-member-exp">{activeMember.expertise}</p>
        </div>

        <div className="leadership-dots">
          {leadershipData.map((member, i) => (
            <button
              key={member.name}
              type="button"
              className={`leadership-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => updateCarousel(i)}
              aria-label={`Go to ${member.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section section-pad" id="about">
      <div className="page-width">
        <div className="about-layout">
          <div className="about-image-wrap" data-reveal>
            <img src="https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=1300&q=85" alt="Warm, welcoming interior of a passenger aircraft" loading="lazy" />
            <div className="image-caption"><span>01 / 03</span><span>THE MMM EXPERIENCE</span></div>
            <div className="about-image-mark">MMM<br /><span>BEYOND THE EXPECTED</span></div>
          </div>
          <div className="about-copy" data-reveal>
            <span className="eyebrow"><span className="eyebrow-line" />ABOUT MMM AIRWAYS</span>
            <h2>Connecting People.<br /><em>Connecting Possibilities.</em></h2>
            <p>MMM Airways is building a new aviation platform for South India. Our vision is to connect emerging regional markets with India's major metropolitan centres through an efficient regional fleet, a growing network and a customer-focused travel experience.</p>
            <p className="text-xs text-muted-foreground mt-2">Starting with ATR 72-600 regional aircraft, MMM Airways plans to expand into Airbus A320 NEO operations, cargo, charter, MRO and aviation training — building a 35-aircraft fleet and establishing a major aviation platform by FY2031.</p>
            <a className="text-link" href="#fleet">Discover Our Fleet Strategy <ArrowRight size={16} /></a>
            <div className="about-signoff"><span className="signoff-rule" /><span>Fly beyond boundaries</span></div>
          </div>
        </div>

        <div className="platform-stats reveal" data-reveal>
          <div className="stat-box">
            <div className="stat-number">20+</div>
            <div className="stat-label">Initial City-Pairs</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">17</div>
            <div className="stat-label">Phase-1 Airports</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">80+</div>
            <div className="stat-label">Target Airports</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">35</div>
            <div className="stat-label">Aircraft by FY2031</div>
          </div>
        </div>

        <div className="vm-grid reveal" data-reveal>
          <div className="vm-card">
            <h3><Compass size={22} className="text-primary" /> Our Vision</h3>
            <p>To become one of India's leading regional aviation platforms, connecting people, businesses and communities beyond the major metropolitan hubs.</p>
          </div>
          <div className="vm-card">
            <h3><Globe2 size={22} className="text-primary" /> Our Mission</h3>
            <p>To make regional air travel accessible, reliable and efficient while building a sustainable aviation ecosystem across passenger travel, cargo, charter, MRO and aviation training.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address to continue.')
      return
    }
    setMessage('Thanks for your interest. Newsletter sign-up is a preview and won’t store your address yet.')
  }
  return <section className="newsletter-section section-pad" id="newsletter"><div className="page-width newsletter-layout"><div className="newsletter-copy" data-reveal><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />A NOTE FROM MMM</span><h2>Stay Ahead of<br /><em>Your Journey</em></h2><p>Travel inspiration, considered offers and the latest from MMM Airways — delivered occasionally, never excessively.</p></div><form className="newsletter-form" onSubmit={submit} noValidate><label htmlFor="newsletter-email">YOUR EMAIL ADDRESS</label><div className="newsletter-input-row"><input id="newsletter-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setMessage(''); setError('') }} placeholder="Your email address" autoComplete="email" /><button className="button button-light" type="submit">Subscribe <ArrowRight size={17} /></button></div>{error && <p className="newsletter-feedback" role="alert">{error}</p>}{message && <p className="newsletter-feedback" role="status"><Check size={15} />{message}</p>}</form></div></section>
}

function Footer({ onAccount }: { onAccount: () => void }) {
  return <footer className="site-footer" id="contact"><div className="page-width"><div className="footer-top"><a className="brand-lockup footer-brand" href="#home"><img src="/logo-light.png" alt="MMM Airways" className="brand-logo-img footer-logo-img" /></a><p className="footer-promise">Thoughtful travel.<br /><span>Remarkable journeys.</span></p></div><div className="footer-columns"><div><h2>Quick Links</h2><a href="#home">Home</a><a href="#book">Book Flight</a><a href="#destinations">Destinations</a><a href="#about">About Us</a><a href="#contact">Contact</a></div><div><h2>Support</h2><a href="#contact">Help Center</a><a href="#contact">FAQs</a><a href="#contact">Terms &amp; Conditions</a><a href="#contact">Privacy Policy</a></div><div><h2>Company</h2><a href="#about">About MMM Airways</a><a href="#about">Careers</a><a href="#offers">News &amp; Offers</a><a href="#experience">Sustainability</a></div><div><h2>Follow Us</h2><p className="social-list">Facebook <span>·</span> Instagram <span>·</span> X<br />LinkedIn <span>·</span> YouTube</p><button className="footer-login" onClick={onAccount}>Join MMM Airways <ArrowRight size={15} /></button></div></div><div className="footer-bottom"><span>© 2026 MMM Airways. All rights reserved.</span><span>Designed for the journey ahead&nbsp; <Plane size={13} /></span></div></div></footer>
}

function AccountForm({ mode, setMode }: { mode: 'login' | 'signup'; setMode: (mode: 'login' | 'signup') => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [feedback, setFeedback] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFeedback('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFeedback('Enter a valid email address.'); return }
    if (password.length < 8) { setFeedback('Your password must be at least 8 characters.'); return }
    setFeedback('Your account access will be available when member sign-in is connected.')
  }
  return <form className="account-form" onSubmit={submit} noValidate><p className="account-description">{mode === 'login' ? 'Sign in to access your MMM Airways journey.' : 'Create an account to keep your journeys close.'}</p><label htmlFor="account-email">EMAIL ADDRESS</label><input id="account-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" autoComplete="email" /><label htmlFor="account-password">PASSWORD</label><input id="account-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /><button className="button button-blue account-submit" type="submit">{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={16} /></button>{feedback && <p className="account-feedback" role="status">{feedback}</p>}<p className="account-switch">{mode === 'login' ? 'New to MMM Airways?' : 'Already have an account?'} <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setFeedback('') }}>{mode === 'login' ? 'Sign up' : 'Sign in'}</button></p></form>
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" aria-label="Close dialog" onClick={onClose}><X size={19} /></button><span className="eyebrow"><span className="eyebrow-line" />MMM AIRWAYS</span><h2 id="modal-title">{title}</h2>{children}</section></div>
}
