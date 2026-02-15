# Task Board Application

A modern, feature-rich task management application built with React, Vite, and Tailwind CSS. This application provides a complete task board experience with drag-and-drop functionality, activity tracking, and persistent storage.

## Features

### Authentication
- **Static Login Flow**: Hardcoded credentials for demo purposes
  - Email: `intern@demo.com`
  - Password: `intern123`
- **Remember Me**: Persist login session using localStorage
- **Protected Routes**: Secure access to the task board
- **Logout Functionality**: Clear session and return to login

### Task Management
- **Three Fixed Columns**: Todo, Doing, Done
- **Task Properties**:
  - Title (required)
  - Description
  - Priority (Low, Medium, High)
  - Due Date
  - Tags (comma-separated)
  - Created At (auto-generated)
- **CRUD Operations**: Create, Edit, and Delete tasks
- **Drag & Drop**: Move tasks between columns seamlessly
- **Search**: Filter tasks by title
- **Filter**: Filter tasks by priority level
- **Sort**: Sort tasks by due date (empty values appear last)

### Persistence & Reliability
- **localStorage**: All data persists across browser refresh
- **Safe Handling**: Gracefully handles missing or corrupted storage
- **Reset Board**: Clear all tasks and activities with confirmation

### Activity Log
- **Real-time Tracking**: Monitor all task operations
- **Activity Types**:
  - Task created
  - Task edited
  - Task moved between columns
  - Task deleted
- **Timestamp**: Each activity includes date and time

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **@hello-pangea/dnd** - Drag and drop functionality
- **Lucide React** - Icon library
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing

## Project Structure

```
task-board/
├── src/
│   ├── components/
│   │   ├── ActivityLog.jsx      # Activity tracking display
│   │   ├── ProtectedRoute.jsx   # Route protection wrapper
│   │   ├── TaskCard.jsx         # Individual task card
│   │   └── TaskModal.jsx        # Task create/edit modal
│   ├── hooks/
│   │   └── useAuth.jsx          # Authentication context & hook
│   ├── pages/
│   │   ├── Board.jsx            # Main task board page
│   │   └── Login.jsx            # Login page
│   ├── utils/
│   │   └── storage.js           # localStorage utilities
│   ├── __tests__/
│   │   ├── auth.test.jsx        # Authentication tests
│   │   ├── storage.test.js      # Storage utility tests
│   │   ├── TaskCard.test.jsx    # TaskCard component tests
│   │   └── setup.js             # Test configuration
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global styles
│   └── main.jsx                 # App entry point
├── package.json
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

1. **Login**: Use the credentials `intern@demo.com` / `intern123`
2. **Create Task**: Click the "+" button in any column
3. **Edit Task**: Click the edit icon on any task card
4. **Delete Task**: Click the trash icon on any task card
5. **Move Task**: Drag and drop tasks between columns
6. **Search**: Use the search bar to filter tasks by title
7. **Filter**: Select priority level from the dropdown
8. **Sort**: Toggle "Sort by Due Date" button
9. **Reset**: Click "Reset Board" to clear all data
10. **Logout**: Click "Logout" to end your session

## Design Philosophy

The application features a clean, professional design with:
- **Gradient backgrounds** for visual appeal
- **Smooth animations** for better UX
- **Responsive layout** that works on all devices
- **Intuitive interactions** with hover states and transitions
- **Clear visual hierarchy** with proper spacing and typography
- **Accessible color contrasts** for readability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built as a demonstration of modern React development practices.
