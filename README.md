<p align="center">
    <img src="./visuals/no_bg.png" width="120" alt="FitEdu Logo" />
</p>


# FitEdu API
FitEdu is a modern educational system API built with NestJS to manage courses, students, and educational events. This API provides a robust foundation for building educational technology solutions.

## Key Features

- 🔐 Secure Authentication System
  - Password-based login
  - Magic link authentication
  - Session management

- 👥 User Management
  - User registration with profile creation
  - Role-based access control (admin/user)
  - Profile management

- 📧 Email Communications
  - Configurable email service (Console/NodeMailer)
  - Email template system

- 🛠 Technical Features
  - PostgreSQL database with Drizzle ORM
  - Environment-based configuration
  - Zod validation

## Getting Started

### Prerequisites

- Bun runtime 1.2+
- PostgreSQL database

### Installation

```bash
# Install dependencies
$ bun install
```

### Configuration

Create an environment file `.env.development.local` with the following variables:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/fitedu
API_TOKEN=your-api-token
APP_JWT_SECRET=your-jwt-secret

# Optional email configuration
MAILER=nodemailer  # or 'console' for development
MAILER_HOST=smtp.example.com
MAILER_PORT=587
MAILER_USER=user
MAILER_PASS=pass
MAILER_SECURE=false
```

### Running the Application

```bash
# Development
$ bun run start:dev

# Production
$ bun run build
$ bun run start:prod
```

### Testing

```bash
# Unit tests
$ bun run test

# Test coverage
$ bun run test:cov
```

## API Documentation

[Coming soon]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Roadmap

- [ ] Course management system
- [ ] Event scheduling and registration
- [ ] Student progress tracking
- [ ] Assignment submission system
- [ ] Grading system
- [ ] Reporting and analytics
- [ ] API documentation
- [ ] Frontend application

## License

This project is MIT licensed.

## Support

For support, please open an issue in the GitHub repository.
