import React from "react";
import { Bell, CalendarDays } from "lucide-react";
import "./Topbar.css";
export default function Topbar({title,subtitle}) {
 return <header className="topbar"><div><h1>{title}</h1><p>{subtitle}</p></div><div className="top-actions"><span className="today"><CalendarDays size={15}/> 12 Nov 2026</span><button className="bell"><Bell size={18}/></button><div className="top-avatar">A</div></div></header>;
}