# 🚀 Phase 2 Implementation Steps
## Các bước thực hiện Assignment Phase 2

---

## 📋 **BƯỚC 1: Chuyển đổi Mongoose → MongoDB Driver (2-3 ngày)**

### **1.1 Cài đặt MongoDB Driver**
```bash
cd Backend_system
npm uninstall mongoose
npm install mongodb
```

### **1.2 Tạo MongoDB Connection Service**
```typescript
// src/config/database.ts
import { MongoClient, Db } from 'mongodb';

class DatabaseService {
  private client: MongoClient;
  private db: Db;

  async connect(): Promise<void> {
    this.client = new MongoClient(process.env.MONGODB_URI!);
    await this.client.connect();
    this.db = this.client.db('chat_system');
  }

  getCollection(name: string) {
    return this.db.collection(name);
  }
}

export const database = new DatabaseService();
```

### **1.3 Chuyển đổi Models**
```typescript
// src/models/user.model.ts (MongoDB Driver version)
export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  roles: string[];
  avatarUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// src/services/user.service.ts
export class UserService {
  async createUser(userData: Omit<User, '_id'>): Promise<User> {
    const collection = database.getCollection('users');
    const result = await collection.insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return { _id: result.insertedId.toString(), ...userData };
  }

  async findUserById(id: string): Promise<User | null> {
    const collection = database.getCollection('users');
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user ? { _id: user._id.toString(), ...user } : null;
  }
}
```

### **1.4 Cập nhật Controllers**
- Chuyển đổi tất cả controllers từ Mongoose sang MongoDB Driver
- Update error handling
- Update response formats

---

## 📋 **BƯỚC 2: Hoàn thiện Frontend Integration (2-3 ngày)**

### **2.1 Tạo API Services**
```typescript
// src/app/services/api.service.ts
// src/app/services/auth.service.ts
// src/app/services/groups.service.ts
// src/app/services/channels.service.ts
// src/app/services/messages.service.ts
// src/app/services/upload.service.ts
// src/app/services/video-call.service.ts
```

### **2.2 Cập nhật Components**
```typescript
// Chat components với real-time
// Avatar display trong messages
// Image upload trong chat
// Video call interface
// Group/Channel selection
```

### **2.3 Socket Integration**
```typescript
// Real-time message updates
// User join/leave notifications
// Typing indicators
// Online status
```

---

## 📋 **BƯỚC 3: Tạo Tests (2-3 ngày)**

### **3.1 Server Tests**
```typescript
// src/__tests__/routes/
// - auth.test.ts
// - users.test.ts
// - groups.test.ts
// - channels.test.ts
// - messages.test.ts
// - upload.test.ts
// - video-calls.test.ts
```

### **3.2 Angular Unit Tests**
```typescript
// src/app/services/*.service.spec.ts
// src/app/components/*/*.component.spec.ts
// src/app/guards/*.guard.spec.ts
// src/app/interceptors/*.interceptor.spec.ts
```

### **3.3 Angular E2E Tests**
```typescript
// e2e/src/
// - auth.e2e-spec.ts
// - chat.e2e-spec.ts
// - groups.e2e-spec.ts
// - video-calls.e2e-spec.ts
```

---

## 📋 **BƯỚC 4: Cập nhật Documentation (1 ngày)**

### **4.1 README.md**
```markdown
# Chat System - Phase 2

## Architecture
## Data Structures
## API Routes
## Client-Server Interaction
## Git Repository Organization
## Testing
## Deployment
```

### **4.2 API Documentation**
- Update Postman collection
- Update API documentation
- Add testing examples

---

## 📋 **BƯỚC 5: Git Workflow Optimization (1 ngày)**

### **5.1 Git Setup**
```bash
git init
git remote add origin <github-repo-url>
git branch -M main
```

### **5.2 Commit Strategy**
```bash
# Feature branches
git checkout -b feature/mongodb-driver
git checkout -b feature/frontend-integration
git checkout -b feature/testing
git checkout -b feature/documentation
```

### **5.3 Frequent Commits**
- Commit mỗi feature hoàn thành
- Commit mỗi test passing
- Commit mỗi bug fix
- Commit mỗi documentation update

---

## 📋 **BƯỚC 6: Elf Deployment Setup (1 ngày)**

### **6.1 Production Build**
```bash
# Frontend
ng build --prod

# Backend
npm run build
```

### **6.2 Deployment Files**
```bash
# package.json production scripts
# Dockerfile
# .env production
# nginx configuration
```

---

## 🎯 **Timeline Tổng thể**

| Bước | Thời gian | Ưu tiên | Dependencies |
|------|-----------|---------|--------------|
| 1. MongoDB Driver | 2-3 ngày | Cao | None |
| 2. Frontend Integration | 2-3 ngày | Cao | Bước 1 |
| 3. Testing | 2-3 ngày | Cao | Bước 1,2 |
| 4. Documentation | 1 ngày | Trung bình | Bước 1,2,3 |
| 5. Git Workflow | 1 ngày | Trung bình | None |
| 6. Elf Deployment | 1 ngày | Thấp | Bước 1,2,3 |

**Total: 9-12 ngày**

---

## 🚨 **Rủi ro và Giải pháp**

### **Rủi ro 1: Mongoose → MongoDB Driver**
- **Vấn đề**: Refactor lớn, có thể gây bugs
- **Giải pháp**: Test kỹ từng bước, backup code cũ

### **Rủi ro 2: Testing Coverage**
- **Vấn đề**: Thiếu thời gian viết tests
- **Giải pháp**: Ưu tiên tests quan trọng, sử dụng test generators

### **Rủi ro 3: Frontend Integration**
- **Vấn đề**: API changes ảnh hưởng frontend
- **Giải pháp**: Maintain API compatibility, versioning

---

## ✅ **Success Criteria**

### **MongoDB**
- [ ] Không sử dụng Mongoose
- [ ] Sử dụng MongoDB Driver
- [ ] Tất cả CRUD operations hoạt động
- [ ] Database seeding hoạt động

### **Sockets**
- [ ] Real-time chat hoạt động
- [ ] User join/leave notifications
- [ ] Previous messages hiển thị
- [ ] Typing indicators

### **Images**
- [ ] Avatar upload/display
- [ ] Image messages
- [ ] File storage working
- [ ] Paths stored in MongoDB

### **Video**
- [ ] Video chat hoạt động
- [ ] PeerJS integration
- [ ] Peer server running
- [ ] Elf deployment ready

### **Testing**
- [ ] Server tests passing
- [ ] Angular unit tests passing
- [ ] E2E tests passing
- [ ] Coverage > 80%

### **Documentation**
- [ ] README.md complete
- [ ] API documentation updated
- [ ] Architecture documented
- [ ] Git workflow documented

---

**Ready to start? Bắt đầu với Bước 1! 🚀**
