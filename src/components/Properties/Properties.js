import React,{useState} from "react";
import {Plus,Building2,Trash2} from "lucide-react";
import Modal from "../common/Modal";
import Status from "../common/Status";
import "./Properties.css";
export default function Properties({properties,setProperties,rooms,setRooms}) {
 const [open,setOpen]=useState(false),[form,setForm]=useState({name:"",type:"Hotel",city:"",address:"",contact:""});
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const add= e=>{e.preventDefault();setProperties([...properties,{...form,id:Date.now(),status:"Active"}]);setForm({name:"",type:"Hotel",city:"",address:"",contact:""});setOpen(false)};
 const remove=id=>{if(window.confirm("Delete this property? Related rooms will also be removed.")){setProperties(properties.filter(p=>p.id!==id));setRooms(rooms.filter(r=>r.propertyId!==id))}};
 return <><div className="section-head"><h2>All properties <span className="muted">({properties.length})</span></h2><button className="btn" onClick={()=>setOpen(true)}><Plus size={16}/> Add Property</button></div>
 <div className="card"><div className="table-wrap"><table><thead><tr><th>Property</th><th>Type</th><th>Location</th><th>Contact</th><th>Rooms / Beds</th><th>Status</th><th>Action</th></tr></thead><tbody>{properties.map(p=><tr key={p.id}><td><strong className="with-icon"><Building2 size={17}/>{p.name}</strong><small className="sub-cell">{p.address}</small></td><td><span className="pill">{p.type}</span></td><td>{p.city}</td><td>{p.contact}</td><td>{rooms.filter(r=>r.propertyId===p.id).length}</td><td><Status value={p.status}/></td><td><button className="icon-btn" onClick={()=>remove(p.id)}><Trash2 size={15}/></button></td></tr>)}</tbody></table>{!properties.length&&<div className="empty">Add your first property to get started.</div>}</div></div>
 {open&&<Modal title="Add New Property" onClose={()=>setOpen(false)}><form onSubmit={add}><div className="form-grid">
 <div className="field"><label>Property Name *</label><input name="name" required value={form.name} onChange={change} placeholder="e.g. Ashoka Hotel"/></div>
 <div className="field"><label>Property Type *</label><select name="type" value={form.type} onChange={change}><option>Hotel</option><option>PG</option><option>Hostel</option><option>Guest House</option><option>Service Apartment</option></select></div>
 <div className="field"><label>City *</label><input name="city" required value={form.city} onChange={change}/></div>
 <div className="field"><label>Full Address</label><input name="address" value={form.address} onChange={change}/></div>
 <div className="field"><label>Contact Number</label><input name="contact" value={form.contact} onChange={change}/></div></div><div className="modal-actions"><button className="btn">Save Property</button></div></form></Modal>}</>;
}