# Backend Git Workflow Configuration

## Backend Git Setup

### Initialize Backend Repository
```bash
cd "D:\Self learning\CODE WEB\CodeThue\David_Nguyen\Backend_system"
git init
```

### Backend Git Configuration
```bash
# Set backend-specific configuration
git config user.name "David Nguyen"
git config user.email "david.nguyen@example.com"
git config init.defaultBranch main

# Backend-specific settings
git config core.autocrlf true
git config core.safecrlf true
git config merge.tool vscode
git config mergetool.keepBackup false
```

### Backend Branch Strategy
```bash
# Main branches
main                    # Production-ready backend code
develop                 # Integration branch for backend features

# Backend feature branches
feature/mongodb-integration    # MongoDB direct driver integration
feature/socket-io-server       # Socket.io server implementation
feature/video-calls-backend    # Video call backend with PeerJS
feature/file-uploads-backend   # File upload middleware and routes
feature/admin-backend          # Admin dashboard backend
feature/testing-backend        # Backend testing suite
feature/api-routes             # REST API routes implementation
feature/middleware             # Authentication and validation middleware
feature/services               # Business logic services
feature/models                 # Data models and interfaces

# Backend hotfix branches
hotfix/auth-bug               # Authentication fixes
hotfix/database-connection    # Database connection fixes
hotfix/socket-issues          # Socket.io fixes

# Backend release branches
release/backend-v1.0.0        # Backend release preparation
```

### Backend Commit Message Convention
```
<type>(<scope>): <description>

Backend-specific types:
- feat: New backend feature
- fix: Backend bug fix
- refactor: Backend code refactoring
- test: Backend tests
- docs: Backend documentation
- chore: Backend maintenance
- perf: Backend performance improvements
- api: API changes
- db: Database changes
- socket: Socket.io changes
- middleware: Middleware changes
- service: Service layer changes
- controller: Controller changes
- route: Route changes
- model: Model changes

Examples:
feat(auth): add JWT authentication middleware
fix(mongodb): resolve collection initialization error
api(users): add user CRUD endpoints
socket(chat): implement real-time message broadcasting
test(routes): add unit tests for auth routes
refactor(services): optimize database queries
```

## Backend Git Workflow Implementation

### 1. Backend Repository Setup
```bash
# Navigate to backend directory
cd "D:\Self learning\CODE WEB\CodeThue\David_Nguyen\Backend_system"

# Create backend .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage/
.nyc_output/

# Uploads (keep structure but ignore files)
uploads/avatars/*
uploads/images/*
uploads/files/*
!uploads/avatars/.gitkeep
!uploads/images/.gitkeep
!uploads/files/.gitkeep

# Test files
*.spec.js.map
*.test.js.map

# TypeScript build info
*.tsbuildinfo

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
Thumbs.db
EOF

# Create initial backend commit
git add .
git commit -m "feat(backend): initial backend setup with Phase 2 requirements

- Add Node.js backend with Express.js
- Add MongoDB integration with direct driver
- Add Socket.io server for real-time communication
- Add PeerJS server for video calls
- Add file upload middleware and routes
- Add authentication and authorization middleware
- Add admin dashboard backend
- Add comprehensive testing suite
- Add TypeScript configuration
- Add API documentation structure"
```

### 2. Backend Feature Development Workflow
```bash
# Create feature branch
git checkout -b feature/mongodb-integration

# Make changes and commit frequently
git add src/db/mongodb.ts
git commit -m "feat(db): implement MongoDB connection management

- Add MongoDB connection setup
- Add collection initialization with lazy loading
- Add connection error handling and retry logic
- Add database health monitoring"

git add src/models/
git commit -m "feat(models): define data models and interfaces

- Add IUser interface with validation
- Add IGroup interface with member management
- Add IChannel interface with type support
- Add IMessage interface with file support
- Add model validation methods"

git add src/services/
git commit -m "feat(services): implement business logic services

- Add UserService with CRUD operations
- Add GroupService with member management
- Add ChannelService with channel operations
- Add MessageService with message handling
- Add lazy collection initialization"

# Merge feature branch
git checkout develop
git merge feature/mongodb-integration --no-ff -m "Merge feature/mongodb-integration: MongoDB integration complete"
git branch -d feature/mongodb-integration
```

### 3. Backend Frequent Commits Strategy
```bash
# API Routes Commits
git add src/routes/auth.routes.ts
git commit -m "api(auth): add authentication routes

- Add POST /auth/register endpoint
- Add POST /auth/login endpoint
- Add POST /auth/logout endpoint
- Add POST /auth/refresh endpoint
- Add input validation and error handling"

git add src/routes/users.routes.ts
git commit -m "api(users): add user management routes

- Add GET /users endpoint
- Add GET /users/:id endpoint
- Add PUT /users/:id endpoint
- Add DELETE /users/:id endpoint
- Add user validation middleware"

git add src/routes/groups.routes.ts
git commit -m "api(groups): add group management routes

- Add GET /groups endpoint
- Add POST /groups endpoint
- Add PUT /groups/:id endpoint
- Add DELETE /groups/:id endpoint
- Add group member management routes"

# Controller Commits
git add src/controllers/auth.controller.mongodb.ts
git commit -m "feat(controller): implement authentication controller

- Add user registration logic
- Add user login logic
- Add JWT token generation
- Add password hashing with bcrypt
- Add input validation and error handling"

git add src/controllers/groups.controller.mongodb.ts
git commit -m "feat(controller): implement group management controller

- Add group CRUD operations
- Add member management
- Add admin management
- Add group validation
- Add permission checks"

# Service Commits
git add src/services/user.service.ts
git commit -m "feat(service): implement user service with MongoDB

- Add user CRUD operations
- Add password hashing and validation
- Add user search and filtering
- Add lazy collection initialization
- Add error handling"

git add src/services/group.service.ts
git commit -m "feat(service): implement group service

- Add group CRUD operations
- Add member management
- Add admin management
- Add group validation
- Add MongoDB operations"

# Socket Commits
git add src/sockets/socket.server.ts
git commit -m "socket(chat): implement Socket.io server

- Add Socket.io server setup
- Add connection event handling
- Add authentication middleware for sockets
- Add error handling for socket connections"

git add src/sockets/
git commit -m "socket(chat): add real-time communication features

- Add message broadcasting to channels
- Add typing indicator events
- Add user presence tracking
- Add channel join/leave notifications
- Add video call signaling"

# Testing Commits
git add src/__tests__/routes/auth.test.ts
git commit -m "test(routes): add authentication route tests

- Add unit tests for auth endpoints
- Add mock services for testing
- Add test utilities and helpers
- Add error scenario testing"

git add src/__tests__/routes/
git commit -m "test(routes): add comprehensive route tests

- Add group management tests
- Add channel operation tests
- Add user management tests
- Add admin dashboard tests
- Add file upload tests"

# Documentation Commits
git add README.md
git commit -m "docs(backend): add backend documentation

- Add project overview
- Add API documentation
- Add installation guide
- Add testing guide"

git add ARCHITECTURE.md
git commit -m "docs(architecture): add backend architecture documentation

- Add project structure
- Add architecture patterns
- Add database design
- Add security implementation"
```

### 4. Backend Release Workflow
```bash
# Create backend release branch
git checkout -b release/backend-v1.0.0

# Update version
git add package.json
git commit -m "chore(version): bump backend version to 1.0.0

- Update package.json version
- Update dependencies
- Update scripts"

# Final testing and bug fixes
git add src/controllers/admin.controller.mongodb.ts
git commit -m "fix(admin): resolve admin controller issues

- Fix user management endpoints
- Fix statistics calculation
- Fix error handling
- Add input validation"

# Merge to main
git checkout main
git merge release/backend-v1.0.0 --no-ff -m "Release backend v1.0.0: Phase 2 Backend Complete"
git tag -a backend-v1.0.0 -m "Backend Release v1.0.0

Phase 2 Backend Implementation Complete:
✅ MongoDB integration with direct driver
✅ Socket.io server implementation
✅ Video call backend with PeerJS
✅ File upload middleware and routes
✅ Admin dashboard backend
✅ Comprehensive testing suite
✅ REST API with full CRUD operations
✅ Authentication and authorization
✅ Complete documentation"

# Clean up
git branch -d release/backend-v1.0.0
git checkout develop
git merge main
```

## Backend Git Hooks

### Backend Pre-commit Hook
```bash
# Create backend pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh

echo "🔍 Running backend pre-commit checks..."

# Check if we're in backend directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo "❌ Error: Not in backend directory"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  Warning: node_modules not found. Run 'npm install' first."
else
    # Run TypeScript type checking
    echo "🔧 Running TypeScript type check..."
    npm run type-check || {
        echo "❌ TypeScript type check failed"
        exit 1
    }
    
    # Run linting
    echo "🧹 Running ESLint..."
    npm run lint || {
        echo "❌ ESLint check failed"
        exit 1
    }
    
    # Run tests
    echo "🧪 Running backend tests..."
    npm test || {
        echo "❌ Backend tests failed"
        exit 1
    }
fi

echo "✅ Backend pre-commit checks passed!"
EOF

chmod +x .git/hooks/pre-commit
```

### Backend Commit Message Hook
```bash
# Create backend commit-msg hook
cat > .git/hooks/commit-msg << 'EOF'
#!/bin/sh

# Backend-specific commit message validation
commit_regex='^(feat|fix|docs|style|refactor|test|chore|perf|api|db|socket|middleware|service|controller|route|model)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ Invalid backend commit message format!"
    echo ""
    echo "📝 Required format: <type>(<scope>): <description>"
    echo ""
    echo "🔧 Backend-specific types:"
    echo "  feat      - New backend feature"
    echo "  fix       - Backend bug fix"
    echo "  api       - API changes"
    echo "  db        - Database changes"
    echo "  socket     - Socket.io changes"
    echo "  middleware - Middleware changes"
    echo "  service    - Service layer changes"
    echo "  controller - Controller changes"
    echo "  route      - Route changes"
    echo "  model      - Model changes"
    echo "  test       - Backend tests"
    echo "  docs       - Backend documentation"
    echo ""
    echo "📋 Examples:"
    echo "  feat(auth): add JWT authentication middleware"
    echo "  fix(mongodb): resolve collection initialization error"
    echo "  api(users): add user CRUD endpoints"
    echo "  socket(chat): implement real-time message broadcasting"
    echo ""
    echo "💡 Your message: $(cat "$1")"
    exit 1
fi

echo "✅ Backend commit message format is valid!"
EOF

chmod +x .git/hooks/commit-msg
```

## Backend Git Aliases

```bash
# Backend-specific git aliases
git config alias.backend-feature '!f() { git checkout -b feature/$1; }; f'
git config alias.backend-hotfix '!f() { git checkout -b hotfix/$1; }; f'
git config alias.backend-release '!f() { git checkout -b release/backend-$1; }; f'
git config alias.backend-test '!f() { npm test && git add . && git commit -m "test: $1"; }; f'
git config alias.backend-api '!f() { git add src/routes/ src/controllers/ && git commit -m "api: $1"; }; f'
git config alias.backend-service '!f() { git add src/services/ && git commit -m "service: $1"; }; f'
git config alias.backend-socket '!f() { git add src/sockets/ && git commit -m "socket: $1"; }; f'
git config alias.backend-db '!f() { git add src/db/ src/models/ && git commit -m "db: $1"; }; f'
```

## Backend Daily Workflow

### Morning Routine
```bash
cd "D:\Self learning\CODE WEB\CodeThue\David_Nguyen\Backend_system"
git checkout develop
git pull origin develop
git status
git log --oneline -5
```

### Development Session
```bash
# Create feature branch
git checkout -b feature/daily-backend-feature

# Make changes and commit frequently
git add src/controllers/
git commit -m "feat(controller): implement daily controller feature

- Add new controller methods
- Add input validation
- Add error handling
- Add response formatting"

git add src/services/
git commit -m "feat(service): implement daily service feature

- Add business logic
- Add database operations
- Add error handling
- Add data validation"

# Push to remote
git push origin feature/daily-backend-feature
```

### End of Day
```bash
# Review changes
git diff develop..HEAD

# Merge to develop
git checkout develop
git merge feature/daily-backend-feature --no-ff -m "Merge feature/daily-backend-feature: Daily backend feature complete"
git push origin develop

# Clean up
git branch -d feature/daily-backend-feature
```
