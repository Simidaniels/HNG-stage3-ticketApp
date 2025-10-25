import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/authService'
import { useToast } from './ToastProvider'


export default function Login(){
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [error,setError]=useState(null)
const push = useToast()
const nav = useNavigate()


function handle(e){
e.preventDefault(); setError(null)
if(!email||!password){ setError('Please provide email and password'); return }
const res = login({email,password})
if(!res.ok){ setError(res.error); push(res.error); return }
push('Login successful')
nav('/dashboard')
}


return (
<section className="form" aria-labelledby="login-heading">
<h2 id="login-heading">Login</h2>
<form onSubmit={handle}>
<label>Email
<input className="input" value={email} onChange={e=>setEmail(e.target.value)} aria-label="Email" />
</label>
<label>Password
<input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} aria-label="Password" />
</label>
{error && <p className="inline-error">{error}</p>}
<div style={{marginTop:12}}>
<button className="btn-primary" type="submit">Login</button>
<Link to="/auth/signup" style={{marginLeft:8}}>Create account</Link>
</div>
</form>
<p style={{marginTop:12,fontSize:'.9rem'}}>Test user: <strong>test@ticketapp.local</strong> / <strong>Password123</strong></p>
</section>
)
}