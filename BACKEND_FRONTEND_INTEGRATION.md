# 🔗 Backend-Frontend Integration Guide

## 📋 Tổng quan

Hướng dẫn này mô tả cách kết nối Backend (Node.js/Express) với Frontend (Angular) trong hệ thống Chat System.

## 🏗️ Kiến trúc hệ thống

```
Frontend (Angular)          Backend (Node.js/Express)
├── Port: 4200              ├── Port: 3000
├── API Calls: HTTP         ├── REST API: /api/*
├── Real-time: Socket.io    ├── WebSocket: Socket.io
├── Video: PeerJS           ├── PeerJS Server: /peerjs
└── Upload: FormData        └── File Upload: /api/upload
```

## 🔧 Cấu hình Backend

### 1. Environment Variables
```bash
# Backend/.env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chat-system
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:4200
FRONTEND_URL=http://localhost:4200
```

### 2. CORS Configuration
```typescript
// Backend/src/app.ts
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
```

### 3. Socket.io Configuration
```typescript
// Backend/src/sockets/socket.server.ts
this.io = new SocketIOServer(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:4200",
        methods: ["GET", "POST"],
        credentials: true
    }
});
```

## 🔧 Cấu hình Frontend

### 1. Environment Variables
```typescript
// Frontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  socketUrl: 'http://localhost:3000',
  appName: 'Chat System',
  version: '1.0.0'
};
```

### 2. HTTP Interceptor
```typescript
// Frontend/src/app/interceptors/auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('accessToken');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
```

### 3. Socket.io Client
```typescript
// Frontend/src/app/services/socket.service.ts
connect(): void {
  const token = localStorage.getItem('accessToken');
  
  this.socket = io(environment.socketUrl, {
    transports: ['websocket', 'polling'],
    autoConnect: true,
    auth: {
      token: token
    }
  });
}
```

## 🚀 Cách chạy hệ thống

### 1. Chạy Backend
```bash
cd Backend_system
npm install
npm run dev
```

### 2. Chạy Frontend
```bash
cd Frontend_system/chat-system-frontend
npm install
npm start
```

### 3. Kiểm tra kết nối
- Backend: http://localhost:3000/health
- Frontend: http://localhost:4200
- Socket.io: ws://localhost:3000
- PeerJS: http://localhost:3000/peerjs

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/logout` - Đăng xuất
- `POST /api/auth/refresh` - Làm mới token

### Users
- `GET /api/users` - Lấy danh sách users
- `GET /api/users/:id` - Lấy thông tin user
- `PUT /api/users/:id` - Cập nhật user
- `DELETE /api/users/:id` - Xóa user

### Groups
- `GET /api/groups` - Lấy danh sách groups
- `POST /api/groups` - Tạo group
- `PUT /api/groups/:id` - Cập nhật group
- `DELETE /api/groups/:id` - Xóa group
- `POST /api/groups/:id/join` - Tham gia group
- `POST /api/groups/:id/leave` - Rời group

### Channels
- `GET /api/channels` - Lấy danh sách channels
- `POST /api/channels` - Tạo channel
- `PUT /api/channels/:id` - Cập nhật channel
- `DELETE /api/channels/:id` - Xóa channel

### Messages
- `GET /api/messages/:channelId` - Lấy messages
- `POST /api/messages` - Gửi message
- `PUT /api/messages/:id` - Cập nhật message
- `DELETE /api/messages/:id` - Xóa message

### Upload
- `POST /api/upload` - Upload file
- `POST /api/upload/multiple` - Upload nhiều files

### Video Calls
- `GET /api/video-calls/history` - Lịch sử cuộc gọi
- `GET /api/video-calls/active` - Cuộc gọi đang hoạt động
- `GET /api/video-calls/stats` - Thống kê cuộc gọi

## 🔌 Socket.io Events

### Client → Server
- `joinChannel` - Tham gia channel
- `leaveChannel` - Rời channel
- `sendMessage` - Gửi message
- `typing` - Đang gõ
- `stopTyping` - Dừng gõ

### Server → Client
- `message` - Nhận message mới
- `typing` - User đang gõ
- `stopTyping` - User dừng gõ
- `onlineUsers` - Danh sách users online
- `userJoinedChannel` - User tham gia channel
- `userLeftChannel` - User rời channel

## 🎥 Video Call Integration

### PeerJS Configuration
```typescript
// Frontend
const peer = new Peer(userId, {
    host: 'localhost',
    port: 3000,
    path: '/peerjs'
});

// Backend
app.use('/peerjs', peerServer);
```

## 🔒 Authentication Flow

1. **Login**: Frontend gửi credentials → Backend trả về JWT token
2. **Storage**: Frontend lưu token vào localStorage
3. **API Calls**: Interceptor tự động thêm Bearer token
4. **Socket.io**: Kết nối với token trong auth object
5. **Logout**: Xóa token và redirect về login

## 🛠️ Error Handling

### Backend Error Response
```typescript
{
  success: false,
  message: "Error message",
  error: "Detailed error info",
  status: 400
}
```

### Frontend Error Handling
```typescript
// ErrorHandlerService
handleError(error: any, context?: string): void {
  // Log error
  // Show user-friendly message
  // Handle specific error types (401, 403, 404, etc.)
}
```

## 📊 Monitoring & Debugging

### 1. Backend Logs
```bash
# Xem logs real-time
npm run dev

# Xem logs chi tiết
DEBUG=* npm run dev
```

### 2. Frontend DevTools
- Network tab: Xem API calls
- Console: Xem logs và errors
- Application tab: Xem localStorage/sessionStorage

### 3. Socket.io Debug
```typescript
// Frontend
this.socket.on('connect', () => console.log('Connected'));
this.socket.on('disconnect', () => console.log('Disconnected'));
this.socket.on('error', (error) => console.error('Socket error:', error));
```

## 🚨 Troubleshooting

### 1. CORS Errors
- Kiểm tra CORS_ORIGIN trong Backend
- Đảm bảo Frontend URL đúng

### 2. Socket.io Connection Failed
- Kiểm tra token authentication
- Kiểm tra network connectivity
- Xem Backend logs

### 3. API 401 Unauthorized
- Kiểm tra token trong localStorage
- Kiểm tra token expiration
- Kiểm tra JWT_SECRET

### 4. File Upload Failed
- Kiểm tra file size limits
- Kiểm tra file type restrictions
- Kiểm tra upload directory permissions

## 📈 Performance Optimization

### 1. Backend
- Sử dụng Redis cho session storage
- Implement rate limiting
- Optimize database queries
- Use compression middleware

### 2. Frontend
- Lazy loading modules
- OnPush change detection
- Virtual scrolling cho large lists
- Image optimization

## 🔐 Security Best Practices

### 1. Backend
- Validate all inputs
- Sanitize user data
- Use HTTPS in production
- Implement rate limiting
- Regular security updates

### 2. Frontend
- Sanitize user inputs
- Validate file uploads
- Use Content Security Policy
- Regular dependency updates

## 📝 Next Steps

1. **Testing**: Implement unit tests và integration tests
2. **CI/CD**: Setup automated deployment
3. **Monitoring**: Add application monitoring
4. **Documentation**: API documentation với Swagger
5. **Performance**: Load testing và optimization

---

## 🎯 Kết luận

Hệ thống Backend-Frontend đã được cấu hình đầy đủ với:
- ✅ REST API communication
- ✅ Real-time messaging với Socket.io
- ✅ Video calls với PeerJS
- ✅ File upload functionality
- ✅ Authentication & Authorization
- ✅ Error handling
- ✅ CORS configuration

Sẵn sàng cho development và testing! 🚀
