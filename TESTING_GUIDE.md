# Testing Guide

## Overview
This guide covers testing implementation for the Chat System Backend, including unit tests, integration tests, and sample data seeding.

## Test Structure

### Test Files
- `src/__tests__/routes/auth.test.ts` - Authentication route tests
- `src/__tests__/routes/groups.test.ts` - Group management route tests  
- `src/__tests__/routes/messages.test.ts` - Message handling route tests

### Test Configuration
- Jest configuration in `jest.config.js`
- Test environment setup with MongoDB
- Supertest for API endpoint testing

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### CI Mode
```bash
npm run test:ci
```

## Test Categories

### 1. Authentication Tests
- User registration with valid/invalid data
- User login with correct/incorrect credentials
- Duplicate email handling
- Required field validation

### 2. Group Management Tests
- Creating groups with proper permissions
- Retrieving group lists
- Group member management
- Authentication requirements

### 3. Message Tests
- Creating messages in channels
- Retrieving message history
- Message search functionality
- Pagination support

## Sample Data

### Seeding Sample Data
```bash
npm run seed:sample
```

### Sample Data Includes:
- **6 Users**: Admin, developers, marketers with different roles
- **3 Groups**: General Discussion, Development Team, Marketing
- **5 Channels**: general, announcements, frontend, backend, campaigns
- **10 Messages**: Realistic conversation history across channels

### Sample Users:
- `admin@chatsystem.com` / `admin123` (Super Admin)
- `john@example.com` / `password123` (Developer)
- `jane@example.com` / `password123` (Developer)
- `mike@example.com` / `password123` (Developer)
- `sarah@example.com` / `password123` (Marketer)
- `alex@example.com` / `password123` (Inactive user)

### Sample Groups:
1. **General Discussion** (Public)
   - Channels: general, announcements
   - Members: admin, john, jane

2. **Development Team** (Private)
   - Channels: frontend, backend
   - Members: john, jane, mike

3. **Marketing** (Public)
   - Channels: campaigns
   - Members: sarah, jane

## Test Data Management

### Clearing Test Data
Tests automatically clear existing data before running to ensure clean state.

### Database Connection
Tests use the same MongoDB connection as the main application with proper setup/teardown.

## Writing New Tests

### Test Structure
```typescript
describe('Feature Name', () => {
    beforeAll(async () => {
        // Setup
    });

    afterAll(async () => {
        // Cleanup
    });

    describe('Specific Functionality', () => {
        it('should do something', async () => {
            // Test implementation
        });
    });
});
```

### Best Practices
- Use descriptive test names
- Test both success and failure cases
- Validate response structure and data
- Clean up test data after each test
- Use realistic test data

## Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure MongoDB is running
2. **Port Conflicts**: Check if test port is available
3. **Data Conflicts**: Clear database between test runs

### Debug Mode
```bash
npm run test:watch -- --verbose
```

## Coverage Goals
- Routes: 90%+ coverage
- Services: 85%+ coverage
- Controllers: 80%+ coverage
- Overall: 85%+ coverage
