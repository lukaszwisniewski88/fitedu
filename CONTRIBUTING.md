# Contributing to FitEdu

Thank you for your interest in contributing to FitEdu! This document provides guidelines and workflows for contributing to the project.

## Development Workflow

### 1. Branch Naming Convention
```bash
<type>/<issue-number>-<short-description>
```

Types:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests

Example:
```bash
git checkout -b docs/5-contributing-guidelines
```

### 2. Commit Message Convention
We follow the Conventional Commits specification:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```bash
git commit -m "docs(project): add contributing guidelines

- Add branch naming conventions
- Add commit message format
- Add PR guidelines

Resolves #5"
```

### 3. Pull Request Process
1. Create a new branch following the naming convention
2. Make your changes
3. Push your branch
4. Create a Pull Request using the PR template
5. Wait for review and address any comments
6. Once approved, merge using squash merge

### 4. Code Style Guidelines
- Use TypeScript
- Follow biome linter rules
- Write unit tests for new features
- Update documentation as needed

### 5. Testing
- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Include integration tests where applicable

### 6. Documentation
- Update README.md if needed
- Add JSDoc comments for new functions
- Update API documentation
