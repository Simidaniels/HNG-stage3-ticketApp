import React, {createContext, useState, useContext} from 'react'
const ToastContext = createContext()


export default function ToastProvider({children}){
const [toasts,setToasts] = useState([])
function push(message, opts={timeout:3000}){
const id = Date.now()
setToasts(t=>[...t,{id,message}])
setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)), opts.timeout)
}
return (
<ToastContext.Provider value={{push}}>
{children}
<div aria-live="polite">
{toasts.map(t=> (
<div key={t.id} className="toast">{t.message}</div>
))}
</div>
</ToastContext.Provider>
)
}
export const useToast = ()=>useContext(ToastContext)