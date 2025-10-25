import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Landing.css'

export default function Landing(){
return (
<section className="hero container" aria-label="Hero">
<div className="circle circle--a" aria-hidden></div>
<div className="circle circle--b" aria-hidden></div>


<div className="hero-inner">
<div className="hero-card">
<h1>TicketApp — Manage requests, faster.</h1>
<p>Lightweight ticket management for teams and projects. Create, track and resolve issues with a clean UI and clear workflow.</p>
<div style={{marginTop:16}}>
<Link to="/auth/login" className="btn-primary" style={{marginRight:8}}>Login</Link>
<Link to="/auth/signup" className="link-btn">Get Started</Link>
</div>


<div className="stats-grid" style={{marginTop:20}}>
<div className="card"><h3>Total tickets</h3><p>—</p></div>
<div className="card"><h3>Open</h3><p>—</p></div>
<div className="card"><h3>Resolved</h3><p>—</p></div>
</div>
</div>


<div className="hero-illustration" aria-hidden>
{/* Wave svg at bottom */}
<svg className="wave" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden>
<path fill="#0ea5e9" fillOpacity="0.12" d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,245.3C672,245,768,203,864,165.3C960,128,1056,96,1152,80C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
</svg>
</div>
</div>
</section>
)
}