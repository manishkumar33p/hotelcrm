import React from "react";
import { LayoutDashboard, Building2, BedDouble, CalendarCheck, Users, UserRoundCog, Search, Hotel } from "lucide-react";
import "./Sidebar.css";
const links = [
  ["Dashboard", LayoutDashboard], ["Properties", Building2], ["Rooms", BedDouble],
  ["Bookings", CalendarCheck], ["Customers", Users], ["Employees", UserRoundCog],
  ["Customer Portal", Search]
];
export default function Sidebar({page,setPage}) {
  return <aside className="sidebar">
    <div className="brand"><div className="brand-mark"><Hotel size={22}/></div><div><b>StayNest</b><small>HOTEL & PG CRM</small></div></div>
    <div className="nav-label">WORKSPACE</div>
    <nav>{links.map(([name,Icon])=><button key={name} className={`nav-link ${page===name?"active":""}`} onClick={()=>setPage(name)}><Icon size={18}/><span>{name}</span></button>)}</nav>
    <div className="sidebar-bottom"><div className="profile-dot">SN</div><div><b>Admin Account</b><small>Super Admin</small></div></div>
  </aside>;
}