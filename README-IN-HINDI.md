# StayNest Hotel & PG CRM – Multi-Owner Local Demo

## चलाने का तरीका
1. ZIP extract करें।
2. Project folder में CMD / Terminal खोलें।
3. `npm install` चलाएँ।
4. `npm start` चलाएँ।
5. Browser में `http://localhost:3000` खुलेगा।

## Super Admin Login
- Login Type: Super Admin
- Login ID: `admin`
- Password: `admin123`

## Demo Flow
1. Super Admin Portal में `Create Owner Account` दबाएँ।
2. Business Type, Business Name, Owner Name और Phone भरें।
3. सिस्टम Owner का Login ID और Password generate करेगा। इन्हें Owner को दें।
4. Logout करके Login screen के `Owner` tab से generated credentials डालें।
5. Owner का अलग Dashboard खुलेगा। Owner अपनी properties, rooms, bookings, customers और employees manage कर सकता है।
6. Owner के Employees module में `Create Employee Login` से staff / warden के अलग credentials बनेंगे।
7. Logout करके `Employee` tab से employee credentials डालें। Employee को सीमित Dashboard, Bookings और Rooms workspace दिखेगा।

## Data storage
सभी Super Admin accounts, Owner accounts, employee credentials और business records इस browser के `localStorage` में सेव होते हैं। एक ही browser/profile में data बना रहेगा। Browser data clear करने या दूसरे browser/computer पर खोलने से data साझा नहीं होगा।

## Demo limitations / Security
यह केवल local demonstration है। localStorage में credentials plain text में रहते हैं और यह secure authentication, production multi-tenancy या server-side access control नहीं है। असली ग्राहकों के उपयोग से पहले backend authentication, database और server-side tenant isolation जोड़ना जरूरी होगा।

## Project structure
हर feature अपने folder में है; जैसे `components/Dashboard/Dashboard.js` और `Dashboard.css`, `components/Properties/Properties.js` और `Properties.css`, `components/Auth/Login.js` और `Login.css`, `components/SuperAdmin/SuperAdmin.js` और `SuperAdmin.css`।
