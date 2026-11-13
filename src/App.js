// import React,{useEffect,useMemo,useState} from "react";
// import {LogOut,ShieldCheck,Users,Building2,LayoutDashboard,BedDouble,CalendarCheck,UserRoundCog,Search} from "lucide-react";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Properties from "./components/Properties/Properties";
// import Rooms from "./components/Rooms/Rooms";
// import Bookings from "./components/Bookings/Bookings";
// import Customers from "./components/Customers/Customers";
// import Employees from "./components/Employees/Employees";
// import CustomerPortal from "./components/CustomerPortal/CustomerPortal";
// import Login from "./components/Auth/Login";
// import SuperAdmin from "./components/SuperAdmin/SuperAdmin";
// import "./App.css";
// // Owner and employee workspace shell styles
// import "./components/Layout/Sidebar.css";
// import "./components/Layout/Topbar.css";

// const DB_KEY="staynest_multi_accounts_v1", SESSION_KEY="staynest_demo_session_v1";
// const read=(key,fallback)=>{try{const x=localStorage.getItem(key);return x?JSON.parse(x):fallback}catch{return fallback}};
// const makeId=(prefix,name)=>`${prefix}${String(name||"USER").replace(/[^a-z0-9]/gi,"").toUpperCase().slice(0,5)}${Math.floor(100+Math.random()*900)}`;
// const makePassword=()=>`SN${Math.random().toString(36).slice(2,6).toUpperCase()}${Math.floor(10+Math.random()*90)}`;
// const blankData=()=>({properties:[],rooms:[],bookings:[],employees:[]});
// const defaultAccounts=[{id:"niss-super-admin",type:"superadmin",name:"NISS Super Admin",loginId:"admin",password:"admin123",status:"Active",createdAt:new Date().toISOString()}];

// export default function App(){
//  const [accounts,setAccounts]=useState(()=>read(DB_KEY,defaultAccounts));
//  const [session,setSession]=useState(()=>read(SESSION_KEY,null));
//  const [page,setPage]=useState("Dashboard");
//  const [notice,setNotice]=useState("");
//  useEffect(()=>localStorage.setItem(DB_KEY,JSON.stringify(accounts)),[accounts]);
//  useEffect(()=>{if(session)localStorage.setItem(SESSION_KEY,JSON.stringify(session));else localStorage.removeItem(SESSION_KEY)},[session]);
//  const currentBase=accounts.find(a=>a.id===session?.accountId && a.status!=="Inactive");
//  const current=currentBase&&session?.employeeId?{...currentBase,employee:(currentBase.data?.employees||[]).find(e=>e.id===session.employeeId)}:currentBase;
//  const updateAccount=(id,patch)=>setAccounts(old=>old.map(a=>a.id===id?{...a,...patch}:a));
//  const login=(loginId,password,roleTab)=>{
//    const enteredId=String(loginId||"").trim().toLowerCase();
//    const enteredPassword=String(password||"").trim();
//    const active=(status)=>String(status||"Active").trim().toLowerCase()!=="inactive";
//    const found=accounts.find(a=>String(a.loginId||a.username||"").trim().toLowerCase()===enteredId&&String(a.password??a.ownerPassword??"").trim()===enteredPassword&&active(a.status)&&(!roleTab||roleTab===a.type|| (roleTab==="owner"&&String(a.type||a.role||"").toLowerCase().includes("owner"))));
//    if(found){setSession({accountId:found.id});setPage(found.type==="superadmin"?"Accounts":"Dashboard");return {ok:true};}
//    if(roleTab==="employee"||!roleTab){for(const owner of accounts.filter(a=>a.type==="owner"&&active(a.status))){const emp=(owner.data?.employees||[]).find(e=>String(e.loginId||"").trim().toLowerCase()===enteredId&&String(e.password||"").trim()===enteredPassword&&active(e.status));if(emp){setSession({accountId:owner.id,employeeId:emp.id});setPage("Dashboard");return {ok:true};}}}
//    return {ok:false,message:"Login ID या Password match नहीं हुआ। ID/Password को copy करके दोबारा डालें और सही Owner tab चुनें।"};
//  };
//  const logout=()=>{setSession(null);setPage("Dashboard")};
//  const createOwner=(form)=>{
//    const loginId=makeId(form.businessType==="Hotel"?"HTL":"PG",form.ownerName||form.businessName);
//    const password=makePassword();
//    const account={id:`owner-${Date.now()}`,type:"owner",businessType:form.businessType,businessName:form.businessName,ownerName:form.ownerName,phone:form.phone,email:form.email,loginId,password,status:"Active",createdAt:new Date().toISOString(),data:blankData()};
//    setAccounts(old=>{const next=[...old,account];try{localStorage.setItem(DB_KEY,JSON.stringify(next));}catch(e){console.error("Could not save owner account",e);}return next;});return {loginId,password};
//  };
//  const createEmployee=(form)=>{
//    const loginId=makeId("STF",form.name);const password=makePassword();
//    const employee={id:`emp-${Date.now()}`,name:form.name,role:form.role,phone:form.phone,propertyId:Number(form.propertyId)||null,loginId,password,status:"Active"};
//    updateAccount(current.id,{data:{...current.data,employees:[...(current.data?.employees||[]),employee]}});
//    return {loginId,password};
//  };
//  if(!current)return <Login onLogin={login} />;
//  if(current.type==="superadmin")return <SuperAdmin accounts={accounts.filter(a=>a.type==="owner")} onCreateOwner={createOwner} onToggle={(id)=>{const a=accounts.find(x=>x.id===id);updateAccount(id,{status:a.status==="Active"?"Inactive":"Active"})}} onLogout={logout}/>;
//  const isOwner=current.type==="owner"&&!current.employee;
//  const data=current.data||blankData();

// //  const patchData=(patch)=>updateAccount(current.id,{data:{...data,...patch}});
 
// const patchData = (patch) => {
//   setAccounts((old) =>
//     old.map((account) => {
//       if (account.id !== current.id) return account;

//       const previousData = account.data || blankData();

//       const changes =
//         typeof patch === "function"
//           ? patch(previousData)
//           : patch;

//       return {
//         ...account,
//         data: {
//           ...previousData,
//           ...changes,
//         },
//       };
//     })
//   );
// };

 
//  const titles={Dashboard:["Dashboard",`Welcome to ${current.businessName}`],Properties:["Properties","Manage your business locations"],Rooms:["Rooms & Beds","Manage room inventory and availability"],Bookings:["Bookings","Reservations, check-ins and check-outs"],Customers:["Customers","Your customer directory"],Employees:["Employees","Create and manage your team login accounts"],"Customer Portal":["Customer Portal","Demo property discovery and booking"]};
//  const pages=isOwner?["Dashboard","Properties","Rooms","Bookings","Customers","Employees","Customer Portal"]:["Dashboard","Bookings","Rooms"];
//  const visiblePage=pages.includes(page)?page:"Dashboard";
//  const navIcons={Dashboard:LayoutDashboard,Properties:Building2,Rooms:BedDouble,Bookings:CalendarCheck,Customers:Users,Employees:UserRoundCog,"Customer Portal":Search};
//  const navTitles={Dashboard:"Dashboard",Properties:"Properties",Rooms:"Rooms",Bookings:"Bookings",Customers:"Customers",Employees:"My Employees","Customer Portal":"Customer Portal"};
//  const employeeName=current.employee?.name;
//  const content=<>
//    {visiblePage==="Dashboard"&&<Dashboard {...data} setPage={setPage}/>}
//    {visiblePage==="Properties"&&<Properties {...data} setProperties={v=>patchData({properties:typeof v==="function"?v(data.properties):v})} setRooms={v=>patchData({rooms:typeof v==="function"?v(data.rooms):v})}/>}
//    {visiblePage==="Rooms"&&<Rooms {...data} setRooms={v=>patchData({rooms:typeof v==="function"?v(data.rooms):v})}/>}
  
//    {/* {visiblePage==="Bookings"&&<Bookings {...data} setBookings={v=>patchData({bookings:typeof v==="function"?v(data.bookings):v})} setRooms={v=>patchData({rooms:typeof v==="function"?v(data.rooms):v})}/>}
//    */}


// {visiblePage==="Bookings"&&
// <Bookings
//   {...data}
//   setBookings={v=>patchData(prev=>({
//     bookings:typeof v==="function"?v(prev.bookings):v
//   }))}
//   setRooms={v=>patchData(prev=>({
//     rooms:typeof v==="function"?v(prev.rooms):v
//   }))}
// />}

//    {visiblePage==="Customers"&&<Customers bookings={data.bookings}/>}
//    {visiblePage==="Employees"&&<Employees properties={data.properties} employees={data.employees} onCreateEmployee={createEmployee} onUpdate={list=>patchData({employees:list})}/>}
//    {visiblePage==="Customer Portal"&&<CustomerPortal {...data} setBookings={v=>patchData({bookings:typeof v==="function"?v(data.bookings):v})} setRooms={v=>patchData({rooms:typeof v==="function"?v(data.rooms):v})}/>}
//  </>;
//  return <div className="app-shell">
//    <aside className="sidebar"><div className="brand"><div className="brand-mark"><Building2 size={22}/></div><div><b>StayNest</b><small>HOTEL & PG CRM</small></div></div><div className="nav-label">{isOwner?"OWNER WORKSPACE":"EMPLOYEE WORKSPACE"}</div><nav>{pages.map(p=>{const Icon=navIcons[p];return <button key={p} className={`nav-link ${visiblePage===p?"active":""}`} onClick={()=>setPage(p)}><Icon size={18}/><span>{navTitles[p]}</span></button>})}</nav><div className="sidebar-bottom"><div className="profile-dot">{(current.ownerName||employeeName||current.businessName||"SN").slice(0,2).toUpperCase()}</div><div><b>{isOwner?current.ownerName:employeeName||current.name}</b><small>{isOwner?`${current.businessType} Owner`:current.employee?.role||"Employee"}</small></div><button className="icon-btn" title="Logout" onClick={logout}><LogOut size={17}/></button></div></aside>
//    <main className="main-area"><header className="topbar"><div><h1>{titles[visiblePage][0]}</h1><p>{titles[visiblePage][1]}</p></div><div className="top-actions"><span className="today">{current.businessName||"StayNest Demo"}</span><div className="top-avatar">{isOwner?"O":"E"}</div></div></header><div className="page-content">{!isOwner&&<div className="card" style={{padding:14,marginBottom:16}}><b>Employee access:</b> You are signed in as {employeeName}. Your access is limited to the employee workspace.</div>}{content}</div></main>
//  </div>;
// }



import React, { useEffect, useState } from "react";
import {
  LogOut,
  Building2,
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  Users,
  UserRoundCog,
  Search
} from "lucide-react";

import Dashboard from "./components/Dashboard/Dashboard";
import Properties from "./components/Properties/Properties";
import Rooms from "./components/Rooms/Rooms";
import Bookings from "./components/Bookings/Bookings";
import Customers from "./components/Customers/Customers";
import Employees from "./components/Employees/Employees";
import CustomerPortal from "./components/CustomerPortal/CustomerPortal";
import Login from "./components/Auth/Login";
import SuperAdmin from "./components/SuperAdmin/SuperAdmin";

import "./App.css";
import "./components/Layout/Sidebar.css";
import "./components/Layout/Topbar.css";

const DB_KEY = "staynest_multi_accounts_v1";
const SESSION_KEY = "staynest_demo_session_v1";

const read = (key, fallback) => {
  try {
    const x = localStorage.getItem(key);
    return x ? JSON.parse(x) : fallback;
  } catch {
    return fallback;
  }
};

const makeId = (prefix, name) =>
  `${prefix}${String(name || "USER")
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase()
    .slice(0, 5)}${Math.floor(100 + Math.random() * 900)}`;

const makePassword = () =>
  `SN${Math.random().toString(36).slice(2, 6).toUpperCase()}${Math.floor(
    10 + Math.random() * 90
  )}`;

const blankData = () => ({
  properties: [],
  rooms: [],
  bookings: [],
  employees: []
});

const defaultAccounts = [
  {
    id: "niss-super-admin",
    type: "superadmin",
    name: "NISS Super Admin",
    loginId: "admin",
    password: "admin123",
    status: "Active",
    createdAt: new Date().toISOString()
  }
];

export default function App() {
  const [accounts, setAccounts] = useState(() =>
    read(DB_KEY, defaultAccounts)
  );

  const [session, setSession] = useState(() =>
    read(SESSION_KEY, null)
  );

  const [page, setPage] = useState("Dashboard");

  useEffect(() => {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(accounts));
    } catch (error) {
      console.error("Account save error:", error);
    }
  }, [accounts]);

  useEffect(() => {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [session]);

  const currentBase = accounts.find(
    (a) =>
      a.id === session?.accountId &&
      a.status !== "Inactive"
  );

  const current =
    currentBase && session?.employeeId
      ? {
          ...currentBase,
          employee: (currentBase.data?.employees || []).find(
            (e) => e.id === session.employeeId
          )
        }
      : currentBase;

  const updateAccount = (id, patch) => {
    setAccounts((old) =>
      old.map((a) =>
        a.id === id ? { ...a, ...patch } : a
      )
    );
  };

  // LOGIN
  const login = (loginId, password, roleTab) => {
    const enteredId = String(loginId || "")
      .trim()
      .toLowerCase();

    const enteredPassword = String(password || "").trim();

    const active = (status) =>
      String(status || "Active").trim().toLowerCase() !== "inactive";

    const found = accounts.find(
      (a) =>
        String(a.loginId || a.username || "")
          .trim()
          .toLowerCase() === enteredId &&
        String(a.password ?? a.ownerPassword ?? "").trim() ===
          enteredPassword &&
        active(a.status) &&
        (
          !roleTab ||
          roleTab === a.type ||
          (
            roleTab === "owner" &&
            String(a.type || a.role || "")
              .toLowerCase()
              .includes("owner")
          )
        )
    );

    if (found) {
      setSession({ accountId: found.id });
      setPage(
        found.type === "superadmin" ? "Accounts" : "Dashboard"
      );
      return { ok: true };
    }

    if (roleTab === "employee" || !roleTab) {
      for (const owner of accounts.filter(
        (a) => a.type === "owner" && active(a.status)
      )) {
        const emp = (owner.data?.employees || []).find(
          (e) =>
            String(e.loginId || "").trim().toLowerCase() === enteredId &&
            String(e.password || "").trim() === enteredPassword &&
            active(e.status)
        );

        if (emp) {
          setSession({
            accountId: owner.id,
            employeeId: emp.id
          });

          setPage("Dashboard");
          return { ok: true };
        }
      }
    }

    return {
      ok: false,
      message:
        "Login ID या Password match नहीं हुआ। ID/Password को copy करके दोबारा डालें और सही Login tab चुनें।"
    };
  };

  // LOGOUT
  const logout = () => {
    setSession(null);
    setPage("Dashboard");
  };

  // CREATE OWNER
  const createOwner = (form) => {
    const loginId = makeId(
      form.businessType === "Hotel" ? "HTL" : "PG",
      form.ownerName || form.businessName
    );

    const password = makePassword();

    const account = {
      id: `owner-${Date.now()}`,
      type: "owner",
      businessType: form.businessType,
      businessName: form.businessName,
      ownerName: form.ownerName,
      phone: form.phone,
      email: form.email,
      loginId,
      password,
      status: "Active",
      createdAt: new Date().toISOString(),
      data: blankData()
    };

    setAccounts((old) => {
      const next = [...old, account];

      try {
        localStorage.setItem(DB_KEY, JSON.stringify(next));
      } catch (error) {
        console.error("Could not save owner account:", error);
      }

      return next;
    });

    return { loginId, password };
  };

  // CREATE EMPLOYEE
  const createEmployee = (form) => {
    const loginId = makeId("STF", form.name);
    const password = makePassword();

    const employee = {
      id: `emp-${Date.now()}`,
      name: form.name,
      role: form.role,
      phone: form.phone,
      propertyId: Number(form.propertyId) || null,
      loginId,
      password,
      status: "Active"
    };

    updateAccount(current.id, {
      data: {
        ...(current.data || blankData()),
        employees: [
          ...(current.data?.employees || []),
          employee
        ]
      }
    });

    return { loginId, password };
  };

  // IF NOT LOGGED IN
  if (!current) {
    return <Login onLogin={login} />;
  }

  // SUPER ADMIN
  if (current.type === "superadmin") {
    return (
      <SuperAdmin
        accounts={accounts.filter((a) => a.type === "owner")}
        onCreateOwner={createOwner}
        onToggle={(id) => {
          const account = accounts.find((x) => x.id === id);

          if (account) {
            updateAccount(id, {
              status:
                account.status === "Active"
                  ? "Inactive"
                  : "Active"
            });
          }
        }}
        onLogout={logout}
      />
    );
  }

  const isOwner =
    current.type === "owner" && !current.employee;

  const data = current.data || blankData();

  // IMPORTANT:
  // This function now updates the latest account data.
  // Booking and Room updates will not overwrite each other.
  const patchData = (patch) => {
    setAccounts((old) =>
      old.map((account) => {
        if (account.id !== current.id) {
          return account;
        }

        const previousData = account.data || blankData();

        const changes =
          typeof patch === "function"
            ? patch(previousData)
            : patch;

        return {
          ...account,
          data: {
            ...previousData,
            ...changes
          }
        };
      })
    );
  };

  const titles = {
    Dashboard: [
      "Dashboard",
      `Welcome to ${current.businessName}`
    ],
    Properties: [
      "Properties",
      "Manage your business locations"
    ],
    Rooms: [
      "Rooms & Beds",
      "Manage room inventory and availability"
    ],
    Bookings: [
      "Bookings",
      "Reservations, check-ins and check-outs"
    ],
    Customers: [
      "Customers",
      "Your customer directory"
    ],
    Employees: [
      "Employees",
      "Create and manage your team login accounts"
    ],
    "Customer Portal": [
      "Customer Portal",
      "Demo property discovery and booking"
    ]
  };

  const pages = isOwner
    ? [
        "Dashboard",
        "Properties",
        "Rooms",
        "Bookings",
        "Customers",
        "Employees",
        "Customer Portal"
      ]
    : [
        "Dashboard",
        "Bookings",
        "Rooms"
      ];

  const visiblePage = pages.includes(page)
    ? page
    : "Dashboard";

  const navIcons = {
    Dashboard: LayoutDashboard,
    Properties: Building2,
    Rooms: BedDouble,
    Bookings: CalendarCheck,
    Customers: Users,
    Employees: UserRoundCog,
    "Customer Portal": Search
  };

  const navTitles = {
    Dashboard: "Dashboard",
    Properties: "Properties",
    Rooms: "Rooms",
    Bookings: "Bookings",
    Customers: "Customers",
    Employees: "My Employees",
    "Customer Portal": "Customer Portal"
  };

  const employeeName = current.employee?.name;

  // MODULE CONTENT
  const content = (
    <>
      {visiblePage === "Dashboard" && (
        <Dashboard
          {...data}
          setPage={setPage}
        />
      )}

      {visiblePage === "Properties" && (
        <Properties
          {...data}
          setProperties={(value) =>
            patchData((prev) => ({
              properties:
                typeof value === "function"
                  ? value(prev.properties)
                  : value
            }))
          }
          setRooms={(value) =>
            patchData((prev) => ({
              rooms:
                typeof value === "function"
                  ? value(prev.rooms)
                  : value
            }))
          }
        />
      )}

      {visiblePage === "Rooms" && (
        <Rooms
          {...data}
          setRooms={(value) =>
            patchData((prev) => ({
              rooms:
                typeof value === "function"
                  ? value(prev.rooms)
                  : value
            }))
          }
        />
      )}

      {visiblePage === "Bookings" && (
        <Bookings
          {...data}
          setBookings={(value) =>
            patchData((prev) => ({
              bookings:
                typeof value === "function"
                  ? value(prev.bookings)
                  : value
            }))
          }
          setRooms={(value) =>
            patchData((prev) => ({
              rooms:
                typeof value === "function"
                  ? value(prev.rooms)
                  : value
            }))
          }
        />
      )}

      {visiblePage === "Customers" && (
        <Customers
          bookings={data.bookings}
        />
      )}

      {visiblePage === "Employees" && (
        <Employees
          properties={data.properties}
          employees={data.employees}
          onCreateEmployee={createEmployee}
          onUpdate={(list) =>
            patchData({ employees: list })
          }
        />
      )}

      {visiblePage === "Customer Portal" && (
        <CustomerPortal
          {...data}
          setBookings={(value) =>
            patchData((prev) => ({
              bookings:
                typeof value === "function"
                  ? value(prev.bookings)
                  : value
            }))
          }
          setRooms={(value) =>
            patchData((prev) => ({
              rooms:
                typeof value === "function"
                  ? value(prev.rooms)
                  : value
            }))
          }
        />
      )}
    </>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Building2 size={22} />
          </div>

          <div>
            <b>StayNest</b>
            <small>HOTEL & PG CRM</small>
          </div>
        </div>

        <div className="nav-label">
          {isOwner ? "OWNER WORKSPACE" : "EMPLOYEE WORKSPACE"}
        </div>

        <nav>
          {pages.map((item) => {
            const Icon = navIcons[item];

            return (
              <button
                key={item}
                className={`nav-link ${
                  visiblePage === item ? "active" : ""
                }`}
                onClick={() => setPage(item)}
              >
                <Icon size={18} />
                <span>{navTitles[item]}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-dot">
            {(
              current.ownerName ||
              employeeName ||
              current.businessName ||
              "SN"
            )
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div>
            <b>
              {isOwner
                ? current.ownerName
                : employeeName || current.name}
            </b>

            <small>
              {isOwner
                ? `${current.businessType} Owner`
                : current.employee?.role || "Employee"}
            </small>
          </div>

          <button
            className="icon-btn"
            title="Logout"
            onClick={logout}
          >
            <LogOut size={17} />
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <h1>{titles[visiblePage][0]}</h1>
            <p>{titles[visiblePage][1]}</p>
          </div>

          <div className="top-actions">
            <span className="today">
              {current.businessName || "StayNest Demo"}
            </span>

            <div className="top-avatar">
              {isOwner ? "O" : "E"}
            </div>
          </div>
        </header>

        <div className="page-content">
          {!isOwner && (
            <div
              className="card"
              style={{
                padding: 14,
                marginBottom: 16
              }}
            >
              <b>Employee access:</b> You are signed in as{" "}
              {employeeName}. Your access is limited to the employee
              workspace.
            </div>
          )}

          {content}
        </div>
      </main>
    </div>
  );
}
