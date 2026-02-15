# Task Board Application

A modern, professional task management application built with React, Vite, and Tailwind CSS. This application provides a complete task board experience with drag-and-drop functionality, pre-built templates, analytics, activity tracking, and persistent storage.

## Features

### Authentication
- Static Login Flow with demo credentials
  - Email: `intern@demo.com`
  - Password: `intern123`
- Remember Me functionality (30 days)
- Protected Routes for secure access
- Profile dropdown with user information
- Professional login page with product features showcase

### Task Management
- Three Fixed Columns: Todo, In Progress, Completed
- Task Properties:
  - Title (required)
  - Description
  - Priority (Low, Medium, High)
  - Due Date
  - Tags (comma-separated)
  - Created At (auto-generated)
- CRUD Operations: Create, Edit, and Delete tasks
- Drag & Drop: Move tasks between columns (not within same column)
- Search: Filter tasks by title, description, or tags
- Filter: Filter tasks by priority level
- Empty State: Helpful prompts when no tasks exist

### Pre-built Templates
- Professional task templates for different roles:
  - Startup Founder
  - Product Manager
  - CEO / Founder
  - CTO / Tech Lead
  - Engineering Manager
  - Team Lead
- Quick start with ready-to-use task lists
- One-click template application

### Analytics & Insights
- Real-time Statistics Dashboard:
  - Total Tasks
  - In Progress Tasks
  - Completed Tasks
  - Success Rate Percentage
- Visual progress tracking
- Task completion metrics

### Export Functionality
- Export to PDF with full task details
- Export to CSV for spreadsheet analysis
- Includes all task information and statistics

### Dark Mode
- Full dark mode support
- Smooth theme transitions
- Persistent theme preference
- Toggle between Light/Dark modes

### Activity Log
- Real-time Tracking of all operations
- Activity Types:
  - Task created
  - Task edited
  - Task moved between columns
  - Task deleted
  - Template tasks added
- Timestamp for each activity
- Color-coded activity indicators

### Persistence & Reliability
- localStorage for data persistence
- All data persists across browser refresh
- Safe handling of missing or corrupted storage
- Reset Board functionality with confirmation

## Tech Stack

- React 19 - UI library
- Vite - Build tool and dev server
- Tailwind CSS - Utility-first CSS framework
- PostCSS & Autoprefixer - CSS processing
- React Router DOM - Client-side routing
- @hello-pangea/dnd - Drag and drop functionality
- Lucide React - Icon library
- jsPDF & jsPDF-AutoTable - PDF generation
- Vitest - Unit testing framework
- Testing Library - React component testing

## Project Structure

```
task-board/
├── src/
│   ├── components/
│   │   ├── ActivityLog.jsx       # Activity tracking display
│   │   ├── Analytics.jsx         # Analytics dashboard
│   │   ├── AdvancedFilters.jsx   # Advanced filtering options
│   │   ├── ConfirmModal.jsx      # Confirmation dialogs
│   │   ├── ExportModal.jsx       # Export options modal
│   │   ├── ProtectedRoute.jsx    # Route protection wrapper
│   │   ├── TaskCard.jsx          # Individual task card
│   │   ├── TaskModal.jsx         # Task create/edit modal
│   │   └── TaskTemplates.jsx     # Pre-built templates
│   ├── hooks/
│   │   ├── useAuth.jsx           # Authentication context & hook
│   │   ├── useTheme.jsx          # Dark mode theme hook
│   │   └── useNotification.jsx   # Toast notifications hook
│   ├── pages/
│   │   ├── Board.jsx             # Main task board page
│   │   └── Login.jsx             # Professional login page
│   ├── utils/
│   │   └── storage.js            # localStorage utilities
│   ├── __tests__/
│   │   ├── auth.test.jsx         # Authentication tests
│   │   ├── storage.test.js       # Storage utility tests
│   │   ├── TaskCard.test.jsx     # TaskCard component tests
│   │   └── setup.js              # Test configuration
│   ├── App.jsx                   # Main app component
│   ├── index.css                 # Global styles & animations
│   └── main.jsx                  # App entry point
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── vitest.config.js
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-board
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Testing

The application includes comprehensive tests covering:
- Authentication flow (login/logout)
- Storage utilities (save/retrieve data)
- Component rendering and interactions

Run tests with:
```bash
npm run test
```

## Deployment

### Prerequisites
Ensure PostCSS and Autoprefixer are installed:
```bash
npm install -D autoprefixer postcss
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify:
```bash
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json:
```json
"homepage": "https://yourusername.github.io/task-board",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update vite.config.js:
```javascript
export default defineConfig({
  base: '/task-board/',
  plugins: [react()]
})
```

4. Deploy:
```bash
npm run deploy
```

## Usage

### Getting Started
1. Login with demo credentials: `intern@demo.com` / `intern123`
2. Choose to create a task manually or use a pre-built template

### Task Operations
- Create Task: Click the "+" button in any column header
- Edit Task: Click the three-dot menu on any task card
- Delete Task: Select delete from the task menu
- Move Task: Drag and drop tasks between different columns

### Features
- Templates: Click "Templates" in header to browse and apply templates
- Search: Use the search bar to find tasks by title, description, or tags
- Filter: Select priority level from the dropdown
- Analytics: Click "Analytics" to view task statistics
- Export: Click "Export" to download tasks as PDF or CSV
- Theme: Toggle between Light/Dark modes
- Reset: Click "Reset" to clear all tasks (with confirmation)
- Profile: Click profile dropdown to view email and logout

## Design Philosophy

The application features a clean, professional design inspired by modern productivity tools:
- Minimal and clean interface without icons clutter
- Text-based navigation for clarity
- Gradient accents for visual appeal
- Smooth animations for better UX
- Fully responsive layout for all devices
- Intuitive interactions with hover states
- Clear visual hierarchy with proper spacing
- Professional color scheme with dark mode
- Accessible design with proper contrasts

## Key Features Highlights

### Professional UI
- Jira-inspired clean header with text labels
- No emoji or icon clutter
- Professional gradient backgrounds
- Smooth transitions and animations

### Smart Task Management
- Drag between columns only (no reordering within column)
- Comprehensive search across title, description, and tags
- Priority-based filtering
- Empty state guidance for new users

### Productivity Boosters
- 6 professional templates for different roles
- Quick task creation from templates
- Real-time statistics dashboard
- Activity log for tracking changes

### Data Management
- Export to PDF with formatted reports
- Export to CSV for data analysis
- Persistent storage across sessions
- Safe reset with confirmation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built as a demonstration of modern React development practices and professional UI/UX design.
