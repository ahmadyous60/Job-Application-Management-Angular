# Job Application Management System

A comprehensive Angular-based web application for managing job positions, candidate applications, and recruitment workflows. This system provides HR teams and hiring managers with tools to efficiently track job postings, review candidate applications, and manage the hiring process.

## 🚀 Features

### Core Functionality
- **Dashboard**: Overview of key metrics, job positions, and candidate statistics
- **Job Position Management**: Create, edit, and manage job postings with detailed descriptions and requirements
- **Candidate Management**: Track applications, review resumes, and manage candidate status through the hiring pipeline
- **Tenant Settings**: Configure system-wide settings for application limits, file formats, and notifications
- **File Upload**: Support for resume uploads with multiple format validation

### Key Modules
- **Dashboard Module**: Home dashboard with statistics and top job positions
- **Job Position Module**: Complete CRUD operations for job postings
- **Candidate Module**: Application tracking and candidate management
- **Shared Module**: Reusable components (header, footer, file upload)
- **Tenant Settings**: System configuration management

## 🛠️ Technology Stack

- **Frontend**: Angular 19.2.0
- **UI Framework**: PrimeNG 19.1.4 with Bootstrap 5.3.8
- **Styling**: SCSS with PrimeFlex 4.0.0
- **Icons**: PrimeIcons 7.0.0
- **File Upload**: ng2-file-upload 8.0.0
- **Backend**: JSON Server (for development/mock data)
- **Testing**: Jasmine with Karma

## 📋 Prerequisites

Before running this application, make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager
- Angular CLI (v19.2.15)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd job-application-management
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
# or
ng serve
```

### 4. Start the Mock Backend (Optional)
In a separate terminal, start the JSON server for mock data:
```bash
npm run json-server
```

### 5. Access the Application
Open your browser and navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

## 📁 Project Structure

```
src/
├── app/
│   ├── candidate/           # Candidate management module
│   ├── dashboard/           # Dashboard and analytics
│   ├── job-position/        # Job position management
│   ├── tenant-settings/     # System settings
│   ├── shared/             # Shared components and utilities
│   ├── services/           # API services and business logic
│   └── datamodels/         # TypeScript interfaces
├── assets/                 # Static assets
└── styles.scss            # Global styles
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server |
| `npm run build` | Build the project for production |
| `npm run watch` | Build and watch for changes |
| `npm test` | Run unit tests with Karma |
| `npm run json-server` | Start JSON server for mock data |

## 📊 Data Models

### Job Position
- Title, description, and requirements
- Active status and application tracking
- Creation and update timestamps
- Applicant count and trend analysis

### Candidate
- Personal information (name, email, phone)
- Job position association
- Application status tracking (new, reviewed, interviewed, hired, rejected)
- Resume file management

### Tenant Settings
- Application limits and thresholds
- File format restrictions
- Auto-expiration settings
- Notification preferences

## 🎨 UI Components

The application uses PrimeNG components for a modern, professional interface:
- Data tables with sorting and filtering
- Modal dialogs for forms
- File upload components
- Charts and statistics displays
- Responsive navigation

## 🧪 Testing

Run unit tests with:
```bash
ng test
```

The project uses Jasmine and Karma for testing. Tests are located alongside components with `.spec.ts` extensions.

## 🏗️ Building for Production

To build the project for production:
```bash
ng build
```

The build artifacts will be stored in the `dist/` directory with optimizations for performance.

## 📝 Development Notes

- The application uses standalone components (Angular 19 feature)
- Mock data is provided via JSON Server for development
- File uploads are handled with ng2-file-upload
- Responsive design with Bootstrap and PrimeFlex
- SCSS for styling with component-scoped styles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request

## 📄 License

This project is private and proprietary.
