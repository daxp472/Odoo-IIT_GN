# Contributing to OneFlow

Thank you for your interest in contributing to OneFlow! We welcome contributions from the community to help make this project better.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/oneflow.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m "Add some feature"`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Create a pull request

## 💡 How to Contribute

### Reporting Bugs
- Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/your-username/oneflow/issues)
- If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/your-username/oneflow/issues/new)
- Include a title and clear description with as much relevant information as possible
- Include steps to reproduce the bug

### Suggesting Enhancements
- Open a new issue with a clear title and detailed description
- Provide examples to demonstrate the enhancement
- Explain why this enhancement would be useful

### Code Contributions
- Write clear, concise code with appropriate comments
- Follow the existing code style and conventions
- Include tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting

## 🔧 Development Workflow

### Branch Naming Convention
- `feature/feature-name` - New features
- `bugfix/issue-name` - Bug fixes
- `hotfix/urgent-fix` - Urgent fixes to production
- `docs/documentation-update` - Documentation changes
- `refactor/refactoring-name` - Code refactoring

### Commit Messages
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
```
type(scope): description

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Example Commit Messages
```
feat(auth): add role-based access control
fix(api): resolve authentication token expiration issue
docs(readme): update installation instructions
```

## 💻 Coding Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint rules defined in the project
- Use async/await instead of callbacks
- Prefer const over let, and let over var
- Use meaningful variable and function names
- Write JSDoc comments for public APIs

### React
- Use functional components with hooks
- Follow the component composition pattern
- Use TypeScript interfaces for props
- Implement proper error boundaries
- Optimize performance with React.memo and useCallback when needed

### Backend (Node.js/Express)
- Use async/await for asynchronous operations
- Implement proper error handling with try/catch
- Use environment variables for configuration
- Follow REST API best practices
- Implement proper logging

### Database (Supabase/PostgreSQL)
- Use proper indexing for frequently queried columns
- Follow naming conventions (snake_case for database objects)
- Implement proper constraints and foreign key relationships
- Use transactions for related operations

### Testing
- Write unit tests for business logic
- Write integration tests for API endpoints
- Use descriptive test names
- Follow the AAA pattern (Arrange, Act, Assert)
- Aim for high test coverage

## 📤 Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you

### Pull Request Checklist
- [ ] Tests pass locally
- [ ] Code follows project coding standards
- [ ] Documentation updated (if applicable)
- [ ] Commit messages follow conventional commits
- [ ] Branch is up to date with main
- [ ] All required reviewers have approved

## 🐛 Reporting Issues

### Before Submitting an Issue
1. Check the documentation
2. Search existing issues
3. Try to reproduce the issue in the latest version

### Submitting a Good Bug Report
Include the following information:
- **Summary**: Clear, concise description of the issue
- **Steps to Reproduce**: Exact steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: Node.js version, OS, browser, etc.
- **Screenshots**: If applicable
- **Code Examples**: Minimal reproduction case

## 👥 Community

### Communication Channels
- GitHub Issues: For bug reports and feature requests
- GitHub Discussions: For general questions and community discussion
- Email: For private inquiries

### Recognition
Contributors will be recognized in:
- README.md contributors list
- Release notes
- Social media announcements (for significant contributions)

Thank you for contributing to OneFlow!