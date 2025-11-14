# Community Module - Frontend Implementation

## 📋 Overview

A complete **frontend-only** Community Module built for the CivicSense MERN application. This module enables users to join communities, view announcements, track local issues, and upvote complaints - all using mock data with no backend dependencies.

## ✨ Features Implemented

### 1. **Community List Page** (`/communities`)

- Displays all available communities in a responsive grid layout
- Each community card shows:
  - Community name and description
  - Location information
  - Member count and active issues
  - Join/Leave button with state management
- Separate sections for "My Communities" and "Discover More"
- Real-time statistics dashboard
- Beautiful gradient designs matching the app's design system

### 2. **Community Feed Page** (`/community/:id/feed`)

- Access control: Only accessible to joined communities
- Two-tab interface:
  - **Announcements Tab**: System updates and notices
  - **Local Issues Tab**: Community complaints with upvoting
- Community header with stats and leave functionality
- Responsive mobile-first layout

### 3. **Upvote System**

- Click to upvote local issues
- Increases upvote count in real-time
- Updates urgency score dynamically
- Visual feedback (disabled state after upvoting)
- Persistent state during session

### 4. **State Management**

- Context API implementation (`CommunityContext`)
- Manages:
  - Joined communities (persisted to localStorage)
  - All communities data
  - Announcements data
  - Complaints/issues data
  - Upvote functionality
- No Redux needed - lightweight Context API solution

## 📁 File Structure

```
client/src/
├── context/
│   └── CommunityContext.jsx          # State management for Community module
├── data/
│   └── mockCommunityData.js          # Mock data (communities, announcements, complaints)
├── components/
│   └── community/
│       ├── CommunityCard.jsx         # Community display card with join/leave
│       ├── AnnouncementCard.jsx      # Announcement display with severity badges
│       ├── CommunityComplaintCard.jsx # Issue card with upvote button
│       └── TabSwitch.jsx             # Reusable tab switcher component
├── pages/
│   └── community/
│       ├── CommunityListPage.jsx     # Main communities listing page
│       └── CommunityFeedPage.jsx     # Individual community feed
└── App.jsx                            # Updated with Community routes
```

## 🎨 Components

### CommunityCard

- **Props**: `community` object
- **Features**: Join/Leave toggle, stats display, gradient banner
- **Styling**: Hover effects, responsive design

### AnnouncementCard

- **Props**: `announcement` object
- **Features**: Type icons (power-cut, water, event), severity badges, timestamp formatting
- **Display**: Affected areas, description, relative time

### CommunityComplaintCard

- **Props**: `complaint` object
- **Features**: Upvote button, category badges, urgency level, status display
- **Interaction**: One-click upvote with visual feedback

### TabSwitch

- **Props**: `tabs` array, `activeTab`, `onTabChange` callback
- **Features**: Badge counts, smooth transitions, gradient active state
- **Reusable**: Can be used anywhere in the app

## 🔌 Mock Data Structure

### Communities (6 sample communities)

```javascript
{
  id: 'comm-1',
  name: 'Downtown District',
  description: '...',
  location: 'Downtown, City Center',
  memberCount: 1248,
  activeIssues: 15,
  imageUrl: '...'
}
```

### Announcements (6 sample announcements)

```javascript
{
  id: 'ann-1',
  communityId: 'comm-1',
  title: 'Scheduled Power Maintenance',
  type: 'power-cut', // power-cut, water, event, infrastructure
  description: '...',
  timestamp: '2025-12-10T09:00:00',
  severity: 'medium', // low, medium, high
  affectedAreas: ['Sector A', 'Sector B']
}
```

### Complaints/Issues (8 sample complaints)

```javascript
{
  id: 'comp-1',
  communityId: 'comm-1',
  title: 'Broken Street Light',
  description: '...',
  category: 'infrastructure',
  urgencyScore: 0.65,
  status: 'pending', // pending, in-progress, resolved
  upvotes: 23,
  createdAt: '2025-11-28T18:30:00',
  location: 'Main Avenue, Downtown'
}
```

## 🛠️ Installation & Setup

### No additional dependencies needed!

All components use existing packages:

- React Router (already installed)
- Lucide React icons (already installed)
- Tailwind CSS (already configured)
- AOS animations (already installed)

### Integration Steps

1. **Context Provider** - Already wrapped in `App.jsx`:

```jsx
<CommunityProvider>{/* App content */}</CommunityProvider>
```

2. **Routes** - Already added to `App.jsx`:

```jsx
<Route path="/communities" element={<CommunityListPage />} />
<Route path="/community/:id/feed" element={<CommunityFeedPage />} />
```

3. **Navigation** - Already added to `Navbar.jsx`:

- Desktop and mobile menu items
- "Communities" link with Users icon

## 🚀 Usage

### Accessing the Module

1. **Navigate to Communities**:

   - Click "Communities" in the navbar
   - Or visit `/communities` directly

2. **Join a Community**:

   - Browse available communities
   - Click "Join Community" button
   - Community moves to "My Communities" section
   - State persists in localStorage

3. **View Community Feed**:

   - Click "View Feed →" on joined communities
   - Access announcements and local issues
   - Switch between tabs

4. **Upvote Issues**:
   - Navigate to "Local Issues" tab
   - Click upvote button (↑) on any issue
   - Watch counter increase and urgency score update
   - Button becomes disabled after upvoting

## 🎯 Key Features

### State Persistence

- Joined communities saved to `localStorage`
- Survives page refreshes
- Clear on logout

### Access Control

- Community feed redirects to list if not joined
- Protects feed pages from unauthorized access

### Responsive Design

- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly buttons
- Optimized card layouts

### Professional UI/UX

- Consistent with existing design system
- Gradient accents (blue → purple → pink)
- Smooth hover animations
- AOS scroll animations
- Loading states and empty states

## 🔄 Future Backend Integration

When backend APIs are ready, update these areas:

### CommunityContext.jsx

Replace mock data calls with API calls:

```javascript
// Example:
const joinCommunity = async (communityId) => {
  const response = await communityAPI.join(communityId);
  // Update state
};
```

### API Endpoints Needed

```
GET    /api/communities           - List all communities
POST   /api/communities/:id/join  - Join a community
DELETE /api/communities/:id/leave - Leave a community
GET    /api/communities/:id/announcements - Get announcements
GET    /api/communities/:id/complaints    - Get complaints
POST   /api/complaints/:id/upvote         - Upvote a complaint
```

### Data Flow

1. Replace `useState` with API fetch on mount
2. Update `join/leave` functions to make API calls
3. Add loading states during API calls
4. Add error handling and toast notifications
5. Implement real-time updates (optional: WebSockets)

## 📊 Mock Data Summary

- **6 Communities**: Diverse locations and member counts
- **6 Announcements**: Various types (power, water, events, infrastructure)
- **8 Complaints**: Different categories, urgency levels, and statuses
- All timestamps use ISO format
- Realistic data for demo purposes

## 🎨 Design System Integration

### Colors Used

- Primary: Blue (blue-600) → Purple (purple-600)
- Success: Green (green-500) → Emerald (emerald-600)
- Warning: Orange/Yellow
- Danger: Red
- Neutral: Gray scale

### Icons (Lucide React)

- `Users`: Community, members
- `Bell`: Announcements
- `AlertCircle`: Issues, warnings
- `ArrowUp`: Upvote
- `MapPin`: Location
- `Clock`: Timestamps
- `Zap`, `Droplet`, `Construction`: Announcement types

### Typography

- Headers: Bold, 2xl-4xl
- Body: Regular, sm-base
- Badges: Semibold, xs-sm

## ✅ Testing Checklist

- [x] Community list page loads with 6 communities
- [x] Join/Leave functionality works
- [x] Joined communities persist in localStorage
- [x] Community feed shows correct data for each community
- [x] Tab switching works smoothly
- [x] Announcements display with correct icons and severity
- [x] Complaints show upvote counts
- [x] Upvote button increases count and disables
- [x] Urgency score updates on upvote
- [x] Mobile responsive on all screen sizes
- [x] Navigation links work correctly
- [x] Empty states display when no data
- [x] Access control redirects non-members

## 🎓 Learning Points

This implementation demonstrates:

- Context API for global state management
- localStorage for data persistence
- Nested routing with React Router
- Compound component patterns
- Controlled vs uncontrolled components
- Mock data strategy for frontend development
- Responsive design with Tailwind CSS
- Component composition and reusability

## 📝 Notes

- **No backend code modified** - 100% frontend implementation
- **Production-ready** - Clean, well-structured code
- **Scalable** - Easy to extend with more features
- **Maintainable** - Clear separation of concerns
- **Documented** - Inline comments and this README

## 🤝 Contributing

To add more mock data:

1. Edit `client/src/data/mockCommunityData.js`
2. Follow existing data structure
3. Maintain ID consistency (communityId references)

To add new features:

1. Update CommunityContext with new functions
2. Create new components in `components/community/`
3. Add routes in App.jsx if needed

---

**Built with ❤️ for CivicSense by GitHub Copilot**
