import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/authService'
import { useToast } from './ToastProvider'


export default function Signup(){
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [error,setError]=useState(null)
const push = useToast()
const nav = useNavigate()


function handle(e){
e.preventDefault(); setError(null)
if(!name||!email||!password){ setError('All fields required'); return }
const res = signup({name,email,password})
if(!res.ok){ setError(res.error); push(res.error); return }
push('Signup success — you are logged in')
nav('/dashboard')
}


return (
<section className="form" aria-labelledby="signup-heading">
<h2 id="signup-heading">Create account</h2>
<form onSubmit={handle}>
<label>Full name
<input className="input" value={name} onChange={e=>setName(e.target.value)} />
</label>
<label>Email
<input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
</label>
<label>Password
<input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
</label>
{error && <p className="inline-error">{error}</p>}
<div style={{marginTop:12}}>
<button className="btn-primary" type="submit">Sign up</button>
</div>
</form>
</section>
)
}