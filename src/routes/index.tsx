import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import {
  ArrowDown, ArrowLeftRight, ArrowRight, Armchair, Check, ChevronDown,
  CirclePlay, Compass, Gift, Globe2, Headphones, Leaf, MapPin, Menu,
  Minus, Plane, Plus, ShieldCheck, Sparkles, UtensilsCrossed, UserRound,
  X,
} from 'lucide-react'

type TripType = 'one-way' | 'round-trip' | 'multi-city'
type PassengerCounts = { adults: number; children: number; infants: number }

const destinations = [
  { name: 'Dubai', code: 'DXB', country: 'United Arab Emirates', image: 'https://images.unsplash.com/photo-1634007626524-f47fa37810a7?auto=format&fit=crop&w=900&q=85', alt: 'Dubai skyline with the Burj Khalifa at golden hour' },
  { name: 'Singapore', code: 'SIN', country: 'Singapore', image: 'https://images.unsplash.com/photo-1572148884483-794c9b6c6963?auto=format&fit=crop&w=900&q=85', alt: 'Marina Bay Sands illuminated at night in Singapore' },
  { name: 'New York', code: 'JFK', country: 'United States', image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=900&q=85', alt: 'The Empire State Building above the New York skyline' },
  { name: 'Bangkok', code: 'BKK', country: 'Thailand', image: 'https://images.unsplash.com/photo-1714672709462-de21a12a1339?auto=format&fit=crop&w=900&q=85', alt: 'Wat Arun temple beside the river in Bangkok at sunset' },
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
    { label: 'About Us', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <a className="brand-lockup" href="#home" aria-label="MMM Airways home" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark"><Plane aria-hidden="true" /></span>
          <span className="brand-name">MMM <b>AIRWAYS</b></span>
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

        <section className="destinations-section section-pad" id="destinations">
          <div className="page-width">
            <div className="section-heading destination-heading" data-reveal>
              <div><span className="eyebrow"><span className="eyebrow-line" />POPULAR DESTINATIONS</span><h2>Explore the World<br /><em>with MMM Airways</em></h2></div>
              <div className="section-heading-aside"><p>Discover incredible cities, unforgettable experiences and new adventures with MMM Airways.</p><a className="text-link" href="#book">View All Destinations <ArrowRight size={16} /></a></div>
            </div>
            <div className="destination-grid">
              {destinations.map((destination, index) => <DestinationCard key={destination.code} destination={destination} index={index} />)}
            </div>
          </div>
        </section>

        <section className="offer-section page-width" id="offers" data-reveal>
          <img src="https://images.unsplash.com/photo-1762486979891-b31db208ce3e?auto=format&fit=crop&w=2200&q=85" alt="Golden clouds and the wing of an aircraft at sunset" loading="lazy" />
          <div className="offer-overlay" />
          <div className="offer-content"><span className="eyebrow eyebrow-light"><span className="eyebrow-line" />THE WORLD, A LITTLE CLOSER</span><h2>Exclusive Offers<br /><em>Just for You</em></h2><p>Find the right moment to go. Discover seasonal fares and thoughtful extras for your next journey.</p><a className="button button-light" href="#book">View Offers <ArrowRight size={17} /></a></div>
          <div className="offer-stamp"><Compass size={19} /><span>YOUR NEXT<br />CHAPTER</span></div>
        </section>

        <section className="why-section section-pad">
          <div className="page-width why-layout">
            <div className="why-intro" data-reveal><span className="eyebrow"><span className="eyebrow-line" />THE MMM STANDARD</span><h2>Why Fly With<br /><em>MMM Airways?</em></h2><p>It’s the small details, the steady reassurance and the care you feel from takeoff to arrival that make a journey truly memorable.</p><a className="text-link" href="#about">Discover what sets us apart <ArrowRight size={16} /></a></div>
            <div className="values-grid">
              {values.map(({ icon: Icon, title, text }, index) => <article className="value-card reveal" data-reveal key={title} style={{ animationDelay: `${index * 80}ms` }}><span className="value-number">0{index + 1}</span><Icon size={23} strokeWidth={1.7} /><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="page-width about-layout">
            <div className="about-image-wrap" data-reveal><img src="https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=1300&q=85" alt="Warm, welcoming interior of a passenger aircraft" loading="lazy" /><div className="image-caption"><span>01 / 03</span><span>THE MMM EXPERIENCE</span></div><div className="about-image-mark">MMM<br /><span>BEYOND THE EXPECTED</span></div></div>
            <div className="about-copy" data-reveal><span className="eyebrow"><span className="eyebrow-line" />ABOUT MMM AIRWAYS</span><h2>Connecting People.<br /><em>Connecting Possibilities.</em></h2><p>MMM Airways is built around a simple vision — making every journey comfortable, reliable and memorable. From the first welcome to the moment you arrive, we put people at the heart of every mile.</p><a className="text-link" href="#experience">Discover MMM Airways <ArrowRight size={16} /></a><div className="about-signoff"><span className="signoff-rule" /><span>Fly beyond boundaries</span></div></div>
          </div>
        </section>

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

function DestinationCard({ destination, index }: { destination: (typeof destinations)[number]; index: number }) {
  const [selected, setSelected] = useState(false)
  const chooseDestination = () => {
    setSelected(true)
    window.dispatchEvent(new CustomEvent('mmm-destination', { detail: destination.name }))
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => setSelected(false), 1500)
  }
  return <article className="destination-card reveal" data-reveal style={{ animationDelay: `${index * 85}ms` }}><img src={destination.image} alt={destination.alt} loading="lazy" /><div className="destination-gradient" /><span className="destination-index">0{index + 1} / DESTINATION</span><div className="destination-info"><div><span className="destination-code"><Plane size={13} /> {destination.code}</span><h3>{destination.name}</h3><span className="destination-country">{destination.country}</span></div><button className="destination-arrow" onClick={chooseDestination} aria-label={`Plan a trip to ${destination.name}`}>{selected ? <Check size={19} /> : <ArrowRight size={19} />}</button></div></article>
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
  return <footer className="site-footer" id="contact"><div className="page-width"><div className="footer-top"><a className="brand-lockup footer-brand" href="#home"><span className="brand-mark"><Plane aria-hidden="true" /></span><span className="brand-name">MMM <b>AIRWAYS</b><small>FLY BEYOND BOUNDARIES</small></span></a><p className="footer-promise">Thoughtful travel.<br /><span>Remarkable journeys.</span></p></div><div className="footer-columns"><div><h2>Quick Links</h2><a href="#home">Home</a><a href="#book">Book Flight</a><a href="#destinations">Destinations</a><a href="#about">About Us</a><a href="#contact">Contact</a></div><div><h2>Support</h2><a href="#contact">Help Center</a><a href="#contact">FAQs</a><a href="#contact">Terms &amp; Conditions</a><a href="#contact">Privacy Policy</a></div><div><h2>Company</h2><a href="#about">About MMM Airways</a><a href="#about">Careers</a><a href="#offers">News &amp; Offers</a><a href="#experience">Sustainability</a></div><div><h2>Follow Us</h2><p className="social-list">Facebook <span>·</span> Instagram <span>·</span> X<br />LinkedIn <span>·</span> YouTube</p><button className="footer-login" onClick={onAccount}>Join MMM Airways <ArrowRight size={15} /></button></div></div><div className="footer-bottom"><span>© 2026 MMM Airways. All rights reserved.</span><span>Designed for the journey ahead&nbsp; <Plane size={13} /></span></div></div></footer>
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
