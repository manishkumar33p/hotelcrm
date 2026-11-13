import React,{useMemo,useState} from "react";
import {Search,Users} from "lucide-react";
import "./Customers.css";
export default function Customers({bookings}) {
 const [q,setQ]=useState("");
 const customers=useMemo(()=>{const map={};bookings.forEach(b=>{const key=b.phone||b.guest;if(!map[key])map[key]={name:b.guest,phone:b.phone,bookings:0,spent:0,last:b.checkIn};map[key].bookings++;if(b.status!=="Cancelled")map[key].spent+=Number(b.amount||0);if(b.checkIn>map[key].last)map[key].last=b.checkIn});return Object.values(map)},[bookings]);
 const list=customers.filter(c=>(c.name+" "+c.phone).toLowerCase().includes(q.toLowerCase()));
 return <><div className="section-head"><div><h2>Customer Directory <span className="muted">({customers.length})</span></h2><p className="muted tiny">Customer records are automatically created from bookings.</p></div><div className="searchbox"><Search size={16}/><input placeholder="Search name or phone" value={q} onChange={e=>setQ(e.target.value)}/></div></div><div className="card"><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Phone</th><th>Total Bookings</th><th>Total Booking Value</th><th>Last Stay Start</th></tr></thead><tbody>{list.map(c=><tr key={c.phone}><td><strong className="with-icon"><Users size={16}/>{c.name}</strong></td><td>{c.phone}</td><td>{c.bookings}</td><td>₹{c.spent.toLocaleString("en-IN")}</td><td>{c.last}</td></tr>)}</tbody></table>{!list.length&&<div className="empty">No customer records found.</div>}</div></div></>;
}