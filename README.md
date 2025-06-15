# 🎉 Eventify - Event Creation & Management Platform

Eventify is a modern, responsive event management web application that enables users to create, manage, and share events with others. Built using **React.js** and **Firebase**, it supports RSVP tracking, Google Maps integration, image uploads via Cloudinary, and multi-step event creation wizards.

---
## Deplolyed App
Frontend: https://revamped-event-creation-and-managemen.netlify.app/



## 🚀 Features

- ✅ User Authentication (Login/Register) via Firebase
- 🧙 Multi-step Event Creation Wizard  
  - Event Details (title, description, tags)  
  - Location with Google Maps + Autocomplete  
  - Date and Time Pickers  
  - Media Upload with Cloudinary  
  - Invite People via Email
- 📍 Real-time Location Selection with Google Maps
- 📅 RSVP Tracking (Attending, Maybe, Not Attending)
- 🖼️ Event Banners/Media Upload
- 🔐 Private & Protected Routes
- 💬 Interactive Event Cards

---

## 🛠️ Tech Stack

| Technology   | Description                     |
|--------------|---------------------------------|
| React.js     | Frontend library                |
| Firebase     | Auth, Firestore (DB), Hosting   |
| tailwind     | Component styling               |
| Cloudinary   | Media (image) uploads           |
| Google Maps  | Autocomplete & Map Selection    |
| TypeScript   | Type safety & scalability       |
| Framer Motion| Animations                      |

---

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components (EventCard, Navbar, etc.)
├── contexts/          # AuthContext and ThemeContext
├── pages/             # Page components (Dashboard, CreateEvent, etc.)
├── services/          # Firebase config & eventService.ts
├── types/             # TypeScript interfaces & models
├── utils/             # Date and formatting utilities
├── App.tsx
└── main.tsx
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/eventify.git
cd eventify
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root and add your Firebase and Cloudinary credentials:

```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_messaging_id
VITE_APP_ID=your_app_id
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
```

### 4. Start the dev server

```bash
npm run dev
```

---

## 🚀 Deployment (Netlify)

### Netlify Build Settings:

- **Base Directory:** (leave blank or use `client` if it's in a subfolder)
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`

> 💡 Make sure to add the same environment variables in **Netlify > Site Settings > Environment Variables**

---

## 👥 Contributing

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature/your-feature`  
3. Commit your changes: `git commit -m "Added feature"`  
4. Push to the branch: `git push origin feature/your-feature`  
5. Open a pull request

---

## 🙌 Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

> 
