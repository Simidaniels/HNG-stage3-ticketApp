const SESSION_KEY = 'ticketapp_session'
const USERS_KEY = 'ticketapp_users'


function _getUsers(){
try{ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }catch(e){ return [] }
}


function _saveUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)) }


export function signup({name,email,password}){
const users = _getUsers()
if(users.find(u=>u.email===email)){
return {ok:false, error:'User already exists'}
}
const newUser = {id:Date.now(), name, email, password}
users.push(newUser)
_saveUsers(users)
const token = { token: 'mock-'+Date.now(), email }
localStorage.setItem(SESSION_KEY, JSON.stringify(token))
return {ok:true, token}
}


export function login({email,password}){
const users = _getUsers()
const user = users.find(u=>u.email===email && u.password===password)
if(!user) return {ok:false, error:'Invalid credentials'}
const token = { token:'mock-'+Date.now(), email }
localStorage.setItem(SESSION_KEY, JSON.stringify(token))
return {ok:true, token}
}


export function logout(){ localStorage.removeItem(SESSION_KEY) }
export function getSession(){ try{ return JSON.parse(localStorage.getItem(SESSION_KEY)) }catch(e){return null} }
export function requireAuth(){ if(!getSession()) throw new Error('Unauthorized') }


// Add initial test user
(function ensureTestUser(){
const users = _getUsers()
if(!users.find(u=>u.email==='test@ticketapp.local')){
users.push({id:1,name:'Test User',email:'test@ticketapp.local',password:'Password123'})
_saveUsers(users)
}
})()