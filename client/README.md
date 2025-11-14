# CivicSense Frontend

**React Frontend for AI-Powered Public Complaint Management Platform**

A modern, responsive React application built with Vite, TailwindCSS, and React Router for managing public complaints.

## 🚀 Features

- **Citizen Portal**: Registration, login, complaint submission, and tracking
- **Authority Dashboard**: View and manage assigned complaints
- **Admin Panel**: Full system management and analytics
- **AI Integration**: Real-time complaint classification and urgency detection
- **Responsive Design**: Mobile-first, modern UI with TailwindCSS
- **Protected Routes**: Role-based access control
- **Form Validation**: React Hook Form with Yup validation

## 📋 Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Backend API running (see server README)

## 🛠️ Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the client directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── api/              # API client and service functions
├── components/       # Reusable UI components
├── context/          # React Context (Auth)
├── layouts/          # Layout components
├── pages/            # Page components
│   ├── citizen/     # Citizen pages
│   ├── authority/    # Authority pages
│   └── admin/        # Admin pages
├── utils/            # Utility functions and constants
└── styles/           # Global styles
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 User Roles

1. **Citizen**: Can register, login, submit complaints, and track their submissions
2. **Authority**: Can login and manage assigned complaints
3. **Admin**: Full system access for management and analytics

## 📱 Pages

### Public Pages
- `/` - Landing page
- `/about` - About page
- `/contact` - Contact page

### Citizen Pages
- `/citizen/login` - Citizen login
- `/citizen/register` - Citizen registration
- `/citizen/dashboard` - Citizen dashboard
- `/complaint/submit` - Submit complaint
- `/complaint/confirmation` - Complaint confirmation

### Authority Pages
- `/authority/login` - Authority login
- `/authority/dashboard` - Authority dashboard
- `/authority/complaints` - View assigned complaints

### Admin Pages
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/complaints` - View all complaints
- `/admin/authorities` - Manage authority users
- `/admin/upload-csv` - Upload CSV files
- `/admin/analytics` - Analytics dashboard

## 🎨 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **TailwindCSS** - Styling
- **React Hook Form** - Form management
- **Yup** - Validation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 🔧 Configuration

### API Base URL

Update `VITE_API_BASE_URL` in `.env` to point to your backend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### TailwindCSS

TailwindCSS is configured in `tailwind.config.js`. Customize colors and theme as needed.

## 🚀 Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## 📝 Notes

- All API calls are handled through the axios client in `src/api/axiosClient.js`
- Authentication state is managed via Context API in `src/context/AuthContext.jsx`
- Protected routes automatically redirect unauthenticated users
- Role-based access is enforced at the route level

## 🐛 Troubleshooting

1. **API connection errors**: Verify backend is running and `VITE_API_BASE_URL` is correct
2. **Build errors**: Clear `node_modules` and reinstall dependencies
3. **Routing issues**: Ensure React Router is properly configured

## 📄 License

ISC
