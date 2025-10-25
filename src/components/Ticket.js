import React, {useState} from 'react'

export default function Ticket({
  tickets = [],
  createTicket = () => {},
  updateTicket = () => {},
  deleteTicket = () => {},
  validate = () => ({}),
  push = () => {},
  reload = () => {},
  StatusBadge = ({status}) => <span>{status}</span>
}) {
  const [form, setForm] = useState({ title: '', description: '', status: 'open' })
  const [errors, setErrors] = useState({})
  const [editing, setEditing] = useState(null)

  function startEdit(t){ setEditing(t); setForm({...t}) }
  function handleCreate(e){
	e.preventDefault()
	const eobj = validate(form)
	if(Object.keys(eobj).length){ setErrors(eobj); return }
	try{
	  createTicket(form)
	  push('Created')
	  setForm({ title: '', description: '', status: 'open' })
	  setErrors({})
	  reload()
	}catch(err){
	  push(err.message)
	}
  }
  function handleUpdate(e){ 
	e.preventDefault()
	const eobj = validate(form)
	if(Object.keys(eobj).length){ setErrors(eobj); return }
	try{
	  updateTicket(editing.id, form)
	  push('Updated')
	  setEditing(null)
	  setForm({ title: '', description: '', status: 'open' })
	  reload()
	}catch(err){
	  push(err.message)
	}
  }
  function handleDelete(id){
	if(!window.confirm('Delete this ticket?')) return
	try{
	  deleteTicket(id)
	  push('Deleted')
	  reload()
	}catch(err){
	  push('Failed to delete')
	}
  }


  return (
	<div>
	  <h1>Tickets</h1>
	  <section className="card" aria-labelledby="create-heading">
		<h2 id="create-heading">Create ticket</h2>
		<form onSubmit={handleCreate}>
		  <label>Title<input className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></label>
		  {errors.title && <p className="inline-error">{errors.title}</p>}

		  <label>Description<textarea className="textarea" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></label>
		  {errors.description && <p className="inline-error">{errors.description}</p>}

		  <label>Status
			<select className="select" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
			  <option value="open">open</option>
			  <option value="in_progress">in_progress</option>
			  <option value="closed">closed</option>
			</select>
		  </label>
		  {errors.status && <p className="inline-error">{errors.status}</p>}

		  <div style={{marginTop:8}}>
			<button className="btn-primary" type="submit">Create</button>
		  </div>
		</form>
	  </section>

	  <section style={{marginTop:16}}>
		<h2>Existing tickets</h2>
		<div className="tickets-grid">
		  {tickets.map(t=> (
			<article key={t.id} className="ticket-card" aria-labelledby={`t-${t.id}`}>
			  <h3 id={`t-${t.id}`}>{t.title}</h3>
			  <p>{t.description}</p>
			  <p><StatusBadge status={t.status} /></p>
			  <div style={{marginTop:8}}>
				<button onClick={()=>startEdit(t)} style={{marginRight:8}}>Edit</button>
				<button onClick={()=>handleDelete(t.id)}>Delete</button>
			  </div>
			</article>
		  ))}
		</div>
	  </section>

	  {editing && (
		<aside className="card" style={{marginTop:16}} aria-labelledby="edit-heading">
		  <h3 id="edit-heading">Edit ticket</h3>
		  <form onSubmit={handleUpdate}>
			<label>Title<input className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></label>
			{errors.title && <p className="inline-error">{errors.title}</p>}

			<label>Description<textarea className="textarea" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></label>

			<label>Status
			  <select className="select" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
				<option value="open">open</option>
				<option value="in_progress">in_progress</option>
				<option value="closed">closed</option>
			  </select>
			</label>

			<div style={{marginTop:8}}>
			  <button className="btn-primary" type="submit">Save</button>
			  <button type="button" onClick={()=>setEditing(null)} style={{marginLeft:8}}>Cancel</button>
			</div>
		  </form>
		</aside>
	  )}
	</div>
  )
}