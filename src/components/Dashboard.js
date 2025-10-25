import React from 'react'
import { Link } from 'react-router-dom'
import { listTickets } from '../services/ticketService'
import '../styles/Dashboard.css'



export default function Dashboard(){
const tickets = listTickets()
const total = tickets.length
const open = tickets.filter(t=>t.status==='open').length
const resolved = tickets.filter(t=>t.status==='closed').length


return (
<div className='stats-wrapper'>
<h1>Dashboard</h1>
    <div className="stats-grid" aria-live="polite">
    <div className="card"><h3>Total tickets</h3><p>{total}</p></div>
    <div className="card"><h3>Open</h3><p>{open}</p></div>
    <div className="card"><h3>Resolved</h3><p>{resolved}</p></div>
</div>


<section style={{marginTop:20}}>
    <h2>Manage tickets</h2>
    <p><Link to="/tickets" className="btn-primary">Go to Tickets</Link></p>
</section>
</div>
)
}