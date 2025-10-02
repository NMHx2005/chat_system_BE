# 📮 Chat System API - Postman Collection Guide

## 🚀 Quick Start

### 1. Import Collection vào Postman
1. Mở Postman
2. Click **Import** → **Choose Files**
3. Chọn file: `Chat_System_API.postman_collection.json`
4. Click **Import**

### 2. Setup Environment Variables
Các variables đã được config sẵn trong collection:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `baseUrl` | Backend API URL | `http://localhost:3000` |
| `authToken` | JWT Access Token | Auto-set sau khi login |
| `refreshToken` | JWT Refresh Token | Auto-set sau khi login |
| `userId` | User ID | Set manual hoặc từ response |
| `groupId` | Group ID | Set manual hoặc từ response |
| `channelId` | Channel ID | Set manual hoặc từ response |
| `messageId` | Message ID | Set manual hoặc từ response |
| `filename` | Uploaded filename | Set manual hoặc từ response |

---

## 📋 API Endpoints Overview

### ✅ **General (2 endpoints)**
- `GET /health` - Health check
- `GET /api` - API info

### 🔐 **Authentication (5 endpoints)**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### 👥 **Users (6 endpoints)**
- `GET /api/users` - Get all users (Super Admin only)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user (Super Admin only)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Super Admin only)
- `GET /api/users/:id/groups` - Get user's groups

### 👨‍👩‍👧‍👦 **Groups (8 endpoints)**
- `GET /api/groups` - Get all groups
- `GET /api/groups/:id` - Get group by ID
- `POST /api/groups` - Create group
- `PUT /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group
- `POST /api/groups/:id/members` - Add member to group
- `DELETE /api/groups/:id/members/:userId` - Remove member
- `POST /api/groups/:id/admins` - Add admin (Super Admin only)
- `DELETE /api/groups/:id/admins/:userId` - Remove admin (Super Admin only)

### 📢 **Channels (8 endpoints)**
- `GET /api/channels` - Get all channels
- `GET /api/channels/group/:groupId` - Get channels by group
- `GET /api/channels/:id` - Get channel by ID
- `POST /api/channels` - Create channel
- `PUT /api/channels/:id` - Update channel
- `DELETE /api/channels/:id` - Delete channel
- `POST /api/channels/:id/members` - Add member to channel
- `DELETE /api/channels/:id/members/:userId` - Remove member

### 💬 **Messages (7 endpoints)**
- `GET /api/messages/channel/:channelId` - Get messages by channel
- `GET /api/messages/user/:userId` - Get messages by user
- `GET /api/messages/search` - Search messages
- `GET /api/messages/:id` - Get message by ID
- `POST /api/messages` - Create message
- `PUT /api/messages/:id` - Update message
- `DELETE /api/messages/:id` - Delete message

### 📤 **Upload (6 endpoints)**
- `POST /api/upload/avatar` - Upload avatar (auto-resize to 200x200)
- `POST /api/upload/image` - Upload image for chat
- `POST /api/upload/file` - Upload file for chat
- `POST /api/upload/multiple` - Upload multiple files (max 5)
- `GET /api/upload/info/:filename` - Get file info
- `DELETE /api/upload/:filename` - Delete file

### 📹 **Video Calls (4 endpoints)**
- `GET /api/video-calls/history` - Get call history
- `GET /api/video-calls/active` - Get active calls
- `GET /api/video-calls/stats` - Get call statistics
- `POST /api/video-calls/cleanup` - Cleanup expired calls (Admin only)

### 👨‍💼 **Admin (3 endpoints)**
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users (Super Admin only)
- `POST /api/admin/users` - Create user (Super Admin only)
- `DELETE /api/admin/users/:id` - Delete user (Super Admin only)

### 🙋 **Client (5 endpoints)**
- `GET /api/client/profile` - Get own profile
- `PUT /api/client/profile` - Update own profile
- `GET /api/client/groups` - Get my groups
- `GET /api/client/channels` - Get my channels
- `GET /api/client/messages` - Get my messages

---

## 🎯 Testing Workflow

### Step 1: Register & Login
```
1. Register User → POST /api/auth/register
   Body: {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }

2. Login → POST /api/auth/login
   Body: {
     "username": "testuser",
     "password": "password123"
   }
   
   Response sẽ chứa:
   - accessToken (authToken sẽ tự động set)
   - refreshToken
   - user data (copy userId nếu cần)
```

### Step 2: Test Groups & Channels
```
3. Get All Groups → GET /api/groups
   
4. Create Group → POST /api/groups
   Body: {
     "name": "My Test Group",
     "description": "Testing group creation",
     "category": "technology"
   }
   (Copy groupId từ response)

5. Create Channel → POST /api/channels
   Body: {
     "name": "general",
     "groupId": "{{groupId}}",
     "type": "TEXT"
   }
   (Copy channelId từ response)
```

### Step 3: Test Messages
```
6. Create Message → POST /api/messages
   Body: {
     "text": "Hello everyone!",
     "channelId": "{{channelId}}",
     "type": "text"
   }

7. Get Messages → GET /api/messages/channel/{{channelId}}
```

### Step 4: Test Uploads
```
8. Upload Avatar → POST /api/upload/avatar
   Form-data: avatar = [chọn file ảnh]

9. Upload Image → POST /api/upload/image
   Form-data: image = [chọn file ảnh]
```

### Step 5: Test Admin (Super Admin only)
```
10. Get Dashboard Stats → GET /api/admin/dashboard
11. Get All Users → GET /api/admin/users
```

---

## 🔑 Authentication

### Tất cả API (trừ Register & Login) đều require Authorization header:
```
Authorization: Bearer {{authToken}}
```

Token sẽ **tự động set** sau khi login thành công.

### Role-based Access:
- **Public**: Health check, API info
- **Authenticated**: Most APIs
- **Group Admin**: Group/Channel management
- **Super Admin**: User management, system stats

---

## 📝 Sample Request Bodies

### Create User
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "roles": ["user"]
}
```

### Create Group
```json
{
  "name": "Development Team",
  "description": "Core development team for the project",
  "category": "technology",
  "maxMembers": 50
}
```

### Create Channel
```json
{
  "name": "general",
  "groupId": "66f1234567890abcdef12345",
  "type": "TEXT"
}
```

### Create Message
```json
{
  "text": "Hello, this is a test message!",
  "channelId": "66f1234567890abcdef12345",
  "type": "text"
}
```

### Update Message
```json
{
  "text": "Updated message content"
}
```

---

## 🎨 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information"
}
```

---

## 📊 Total API Count

**Total: 54 API Endpoints**

- ✅ General: 2
- ✅ Authentication: 5
- ✅ Users: 6
- ✅ Groups: 8
- ✅ Channels: 8
- ✅ Messages: 7
- ✅ Upload: 6
- ✅ Video Calls: 4
- ✅ Admin: 4
- ✅ Client: 5

---

## 🚨 Common Issues

### 1. 401 Unauthorized
- Check if `authToken` is set
- Token might be expired → Use Refresh Token
- User might not have permission

### 2. 404 Not Found
- Check if IDs (userId, groupId, etc.) are correct
- Resource might not exist in database

### 3. 400 Bad Request
- Check request body format
- Required fields might be missing
- Field validation failed

### 4. 500 Internal Server Error
- Check backend server logs
- MongoDB connection might be down
- Check if database is seeded

---

## 💡 Tips

1. **Use Collection Runner** để test tất cả APIs
2. **Set up Environment** cho dev/staging/production
3. **Use Pre-request Scripts** để auto-set tokens
4. **Use Tests** để validate responses
5. **Export results** để share với team

---

## 🔗 Related Files

- `Chat_System_API.postman_collection.json` - Main collection file
- `Backend_system/src/routes/*.routes.ts` - API route definitions
- `Backend_system/src/controllers/*.controller.ts` - API controllers
- `Backend_system/src/middleware/auth.middleware.ts` - Authentication middleware

---

## 📚 Documentation

For detailed API documentation, see:
- Swagger/OpenAPI: `http://localhost:3000/api-docs` (if configured)
- Source code comments in controllers
- Route files for endpoint definitions

---

**Last Updated:** October 1, 2025
**Version:** 1.0.0
**Author:** David Nguyen

