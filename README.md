# Sistema Juguetería

A comprehensive toy store management system built with Go (Fiber) backend and a modern web frontend.

## Features

- **Sales Management**: Complete point of sale system with cash register operations
- **Inventory Control**: Article and category management with stock tracking
- **Purchase Orders**: Supplier management and purchase tracking
- **Customer Management**: Customer records and transaction history
- **Financial Tracking**: Expenses, petty cash, and refunds management
- **Reporting**: Business analytics and reports
- **Backup System**: Automated database backups
- **Multi-user**: Authentication and user management with CSRF protection
- **Embedded Frontend**: Self-contained binary with embedded web interface

## Tech Stack

### Backend
- **Go 1.22.6**
- **Fiber v2**: High-performance web framework
- **GORM**: ORM with support for MySQL and SQLite
- **SQLite/MySQL**: Flexible database options
- **JWT Authentication**: Secure token-based authentication

### Frontend
- Located in `/web` directory
- Built with modern JavaScript tooling (Vite, TypeScript)
- Static files embedded in the Go binary

## Project Structure

```
SistemJugueteria/
├── config/          # Database and app configuration
├── controllers/     # API request handlers
├── helpers/         # Utility functions
├── middleware/      # HTTP middleware (CSRF, auth, etc.)
├── models/          # Database models
├── routes/          # API route definitions
├── types/           # Type definitions
├── validation/      # Input validation rules
├── web/            # Frontend application
├── uploads/        # User uploaded files
├── backups/        # Database backups
├── main.go         # Application entry point
└── system.db       # SQLite database (development)
```

## Getting Started

### Prerequisites

- Go 1.22.6 or higher
- MySQL (for production) or SQLite (development)
- Bun (for frontend development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SistemJugueteria
```

2. Install Go dependencies:
```bash
go mod download
```

3. Build and run the application:
```bash
go run main.go
```

The server will start on `http://localhost:1200` by default.

### Development with Air (Hot Reload)

For development with automatic reloading:

```bash
air
```

### Environment Variables

- `PORT`: Server port (default: 1200)

## Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up -d
```

This will start:
- Application container on port 5000
- MySQL database container

## API Endpoints

The API is available at `/api` and includes:

- `/api/auth` - Authentication
- `/api/articles` - Article management
- `/api/categories` - Category management
- `/api/sales` - Sales operations
- `/api/purchases` - Purchase management
- `/api/customers` - Customer management
- `/api/suppliers` - Supplier management
- `/api/expenses` - Expense tracking
- `/api/reports` - Business reports
- `/api/cash-register` - Cash register operations
- `/api/petty-cash` - Petty cash management
- `/api/refunds` - Refund processing
- `/api/backups` - Database backup operations
- `/api/users` - User management
- `/api/business` - Business settings
- `/api/company` - Company information

## Security Features

- CSRF protection on all API endpoints
- Secure HTTP headers (CSP, XSS Protection, HSTS)
- Content Security Policy
- Password hashing with bcrypt
- JWT-based authentication
- SQL injection prevention via GORM

## Frontend Access

- Root: `http://localhost:1200/`
- System Interface: `http://localhost:1200/sis`

## Build for Production

Build a single binary with embedded frontend:

```bash
go build -ldflags "-s -w" -o jugueteria .
```

This creates a self-contained executable with the frontend assets embedded.

## Backup System

The system automatically:
- Creates backup and upload folders on startup
- Runs periodic token cleanup for SQLite
- Provides manual backup endpoints via the API

## License

[Add your license here]

## Author

Powered by Triceratox Software

## Contributing

[Add contribution guidelines here]
