import React from "react";
export default function Status({value}) {
 const cls = ["Available","Active","Confirmed","Checked In","Paid"].includes(value)?"green":["Maintenance","Pending","Reserved"].includes(value)?"orange":["Cancelled","Inactive","Overdue"].includes(value)?"red":"";
 return <span className={`pill ${cls}`}>{value}</span>;
}