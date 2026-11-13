import React,{useState} from "react";
import {Plus,Trash2} from "lucide-react";
import Modal from "../common/Modal";
import Status from "../common/Status";
import "./Rooms.css";
export default function Rooms({properties,rooms,setRooms}) {
 const [open,setOpen]=useState(false),[filter,setFilter]=useState("All"),[form,setForm]=useState({propertyId:properties[0]?.id||"",number:"",category:"Deluxe",capacity:2,price:"",floor:"1",status:"Available"});
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const add=e=>{e.preventDefault();setRooms([...rooms,{...form,id:Date.now(),propertyId:Number(form.propertyId),capacity:Number(form.capacity),price:Number(form.price)}]);setOpen(false)};
 const update=(id,status)=>setRooms(rooms.map(r=>r.id===id?{...r,status}:r));
 const name=id=>properties.find(p=>p.id===id)?.name||"Deleted property";
 const visible=rooms.filter(r=>filter==="All"||r.status===filter);
 return <><div className="section-head"><div><h2>Rooms & Beds <span className="muted">({rooms.length})</span></h2><p className="muted tiny">Hotel rooms, PG beds and shared occupancy inventory</p></div><button className="btn" onClick={()=>setOpen(true)}><Plus size={16}/> Add Room / Bed</button></div>
 <div className="room-filters">{["All","Available","Occupied","Maintenance"].map(x=><button key={x} className={filter===x?"selected":""} onClick={()=>setFilter(x)}>{x}</button>)}</div>
 <div className="card"><div className="table-wrap"><table><thead><tr><th>Room / Bed</th><th>Property</th><th>Category</th><th>Capacity</th><th>Monthly / Nightly Rate</th><th>Floor</th><th>Status</th><th>Change Status</th></tr></thead><tbody>{visible.map(r=><tr key={r.id}><td><strong>{r.number}</strong></td><td>{name(r.propertyId)}</td><td>{r.category}</td><td>{r.capacity}</td><td>₹{Number(r.price).toLocaleString("en-IN")}</td><td>{r.floor}</td><td><Status value={r.status}/></td><td><select className="inline-select" value={r.status} onChange={e=>update(r.id,e.target.value)}><option>Available</option><option>Occupied</option><option>Maintenance</option></select></td></tr>)}</tbody></table>{!visible.length&&<div className="empty">No rooms found for this filter.</div>}</div></div>
 {open&&<Modal title="Add Room / Bed" onClose={()=>setOpen(false)}><form onSubmit={add}><div className="form-grid">
 <div className="field"><label>Property *</label><select required name="propertyId" value={form.propertyId} onChange={change}>{properties.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></div>
 <div className="field"><label>Room / Bed Number *</label><input required name="number" value={form.number} onChange={change} placeholder="e.g. 101 / A-01"/></div>
 <div className="field"><label>Category</label><select name="category" value={form.category} onChange={change}>{["Standard","Deluxe","Suite","Single Sharing","Double Sharing","Triple Sharing","Dormitory Bed"].map(x=><option>{x}</option>)}</select></div>
 <div className="field"><label>Capacity</label><input type="number" min="1" name="capacity" value={form.capacity} onChange={change}/></div>
 <div className="field"><label>Rate (₹) *</label><input type="number" min="0" required name="price" value={form.price} onChange={change}/></div>
 <div className="field"><label>Floor</label><input name="floor" value={form.floor} onChange={change}/></div></div><div className="modal-actions"><button className="btn">Save Room / Bed</button></div></form></Modal>}</>;
}