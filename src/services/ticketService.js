const TICKETS_KEY = 'ticketapp_tickets'
const VALID_STATUS = ['open','in_progress','closed']


function _get(){ try{ return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]') }catch(e){ return [] } }
function _save(data){ localStorage.setItem(TICKETS_KEY, JSON.stringify(data)) }


export function listTickets(){ return _get() }
export function getTicket(id){ return _get().find(t=>t.id===id) }


export function createTicket({title,description='',status='open',priority='low'}){
if(!title) throw new Error('Title required')
if(!VALID_STATUS.includes(status)) throw new Error('Invalid status')
const t = { id: Date.now(), title, description, status, priority, createdAt: new Date().toISOString() }
const all = _get(); all.unshift(t); _save(all); return t
}


export function updateTicket(id, fields){
const all = _get();
const idx = all.findIndex(t=>t.id===id)
if(idx===-1) throw new Error('Ticket not found')
if(fields.title==='' || fields.title===undefined) throw new Error('Title required')
if(fields.status && !VALID_STATUS.includes(fields.status)) throw new Error('Invalid status')
all[idx] = {...all[idx], ...fields}
_save(all)
return all[idx]
}


export function deleteTicket(id){
const all = _get();
const filtered = all.filter(t=>t.id!==id); _save(filtered); return true
}


// Seed sample tickets if empty
(function ensureSeed(){
const all = _get()
if(all.length===0){
const sample = [
{id:1111,title:'Cannot login',description:'I get 401 when logging in',status:'open',priority:'high',createdAt:new Date().toISOString()},
{id:2222,title:'Feature request: dark mode',description:'Please add dark theme',status:'in_progress',priority:'low',createdAt:new Date().toISOString()},
{id:3333,title:'Typo on homepage',description:'Fix heading',status:'closed',priority:'low',createdAt:new Date().toISOString()}
]
localStorage.setItem(TICKETS_KEY, JSON.stringify(sample))
}
})()