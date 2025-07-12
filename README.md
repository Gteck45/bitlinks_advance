# BitLinks (LiShort) Information

## Summary
BitLinks (branded as "LiShort") is a URL shortener application that helps users create, manage, and track shortened links. The application provides user authentication, link management, and analytics features.

## Structure
- **src/app**: Main application code with Next.js App Router structure
  - **components**: Reusable UI components
  - **api**: API routes for authentication, link generation, and user management
  - **models**: Mongoose data models
  - **db**: Database utilities
- **lib**: Utility functions including MongoDB connection
- **public**: Static assets

## Language & Runtime
**Language**: JavaScript (Node.js)
**Framework**: Next.js 15.3.3
**Build System**: Next.js build system
**Package Manager**: npm/yarn

## Dependencies
**Main Dependencies**:
- next: 15.3.3 - React framework
- react: 19.0.0 - UI library
- mongodb: 6.16.0 - MongoDB driver
- mongoose: 8.15.1 - MongoDB ODM
- next-auth: 4.24.11 - Authentication
- flowbite-react: 0.11.7 - UI component library
- @reduxjs/toolkit: 2.8.2 - State management

**Development Dependencies**:
- eslint: 9.x - Code linting
- tailwindcss: 4.x - CSS framework
- @tailwindcss/postcss: 4.x - PostCSS integration

## Build & Installation
```bash
# Install dependencies
npm install

# Development server with turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

## Database
**Type**: MongoDB
**Connection**: Environment variable `MONGODB_URI` required
**Models**:
- User: User profile with authentication and social links

## API Routes
- **/api/auth/[...nextauth]**: Authentication endpoints
- **/api/generate**: URL shortening service
- **/api/links**: Link management
- **/api/user**: User profile management

## Main Features
- URL shortening
- User authentication (via NextAuth)
- Link management dashboard
- User profiles with social links
- Analytics for shortened links

## Frontend
**UI Framework**: React with Tailwind CSS
**Component Library**: Flowbite React
**State Management**: Redux Toolkit
**Fonts**: Geist, Geist Mono, Poppins