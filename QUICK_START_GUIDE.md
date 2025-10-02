# 🚀 Quick Start Guide - API Integration
## Bắt đầu tích hợp API trong 30 phút

---

## ⚡ **Step 1: Backend Setup (5 phút)**

### **1.1 Start Backend Server**
```bash
cd Backend_system
npm install
npm run dev
```

### **1.2 Seed Database**
```bash
npm run seed:fake
```

### **1.3 Verify Backend**
```bash
# Test health check
curl http://localhost:3000/health

# Test API info
curl http://localhost:3000/api
```

**Expected Response:**
```json
{
  "success": true,
  "message": "API is running",
  "data": {
    "version": "1.0.0",
    "endpoints": 54,
    "status": "healthy"
  }
}
```

---

## ⚡ **Step 2: Test API với Postman (10 phút)**

### **2.1 Import Collection**
1. Mở Postman
2. Import → `Chat_System_API.postman_collection.json`
3. Set baseUrl: `http://localhost:3000`

### **2.2 Test Basic Flow**
```bash
# 1. Register User
POST /api/auth/register
{
  "username": "testuser",
  "email": "test@example.com", 
  "password": "password123"
}

# 2. Login (auto-sets authToken)
POST /api/auth/login
{
  "username": "testuser",
  "password": "password123"
}

# 3. Get Groups
GET /api/groups

# 4. Create Group
POST /api/groups
{
  "name": "My Test Group",
  "description": "Testing group creation",
  "category": "technology"
}
```

---

## ⚡ **Step 3: Frontend API Service (15 phút)**

### **3.1 Create Base API Service**
```typescript
// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, this.getHeaders());
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, this.getHeaders());
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, this.getHeaders());
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, this.getHeaders());
  }

  private getHeaders() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      })
    };
  }
}
```

### **3.2 Create Auth Service**
```typescript
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadUserFromStorage();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('/auth/login', {
      username,
      password
    });
  }

  register(userData: any): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('/auth/register', userData);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode token to get user info
      // Implementation depends on your JWT structure
    }
  }
}
```

### **3.3 Update App Module**
```typescript
// src/app/app.module.ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    // ... other imports
    HttpClientModule
  ],
  // ... rest of module
})
export class AppModule { }
```

---

## ⚡ **Step 4: Test Integration (5 phút)**

### **4.1 Update Login Component**
```typescript
// src/app/components/auth/login.component.ts
import { AuthService } from '../../services/auth.service';

export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('authToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          this.authService.currentUserSubject.next(response.data.user);
          // Redirect to dashboard
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Show error message
      }
    });
  }
}
```

### **4.2 Test Login Flow**
1. Start frontend: `npm start`
2. Navigate to login page
3. Enter credentials: `testuser` / `password123`
4. Check browser console for success
5. Verify token in localStorage

---

## 🎯 **Next Steps**

### **Immediate (Next 1-2 hours):**
1. ✅ Create Groups Service
2. ✅ Create Channels Service  
3. ✅ Create Messages Service
4. ✅ Test all services with Postman

### **Short Term (Next 1-2 days):**
1. ✅ Integrate services with components
2. ✅ Add error handling
3. ✅ Add loading states
4. ✅ Test real-time features

### **Medium Term (Next 1-2 weeks):**
1. ✅ Complete all 54 API integrations
2. ✅ Add file upload functionality
3. ✅ Add video call features
4. ✅ Add admin panel

---

## 🚨 **Troubleshooting**

### **Backend Issues:**
```bash
# Check if backend is running
curl http://localhost:3000/health

# Check MongoDB connection
# Look for connection errors in console

# Restart backend
npm run dev
```

### **Frontend Issues:**
```bash
# Check if frontend is running
# Navigate to http://localhost:4200

# Check console for errors
# Check network tab for API calls

# Restart frontend
npm start
```

### **CORS Issues:**
```typescript
// Backend: src/app.ts
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

### **Token Issues:**
```typescript
// Check if token is stored
console.log(localStorage.getItem('authToken'));

// Check if token is sent in requests
// Look in Network tab → Headers → Authorization
```

---

## 📊 **Success Indicators**

### **Backend Working:**
- [ ] Health check returns 200
- [ ] API info returns 200
- [ ] Database seeded successfully
- [ ] All 54 endpoints accessible

### **Frontend Working:**
- [ ] Login form submits successfully
- [ ] Token stored in localStorage
- [ ] API calls return data
- [ ] No CORS errors in console

### **Integration Working:**
- [ ] Login → Get token → API calls work
- [ ] Services return data from backend
- [ ] Components display API data
- [ ] Error handling works

---

## 📚 **Resources**

### **API Documentation:**
- Postman Collection: `Chat_System_API.postman_collection.json`
- API Guide: `POSTMAN_GUIDE.md`
- Integration Plan: `API_INTEGRATION_PLAN.md`

### **Backend Files:**
- Routes: `src/routes/*.routes.ts`
- Controllers: `src/controllers/*.controller.ts`
- Models: `src/models/*.model.ts`

### **Frontend Files:**
- Services: `src/app/services/*.service.ts`
- Components: `src/app/components/*/`
- Models: `src/app/models/*.model.ts`

---

**Ready to start? Let's go! 🚀**

**Last Updated:** October 1, 2025  
**Version:** 1.0.0  
**Author:** David Nguyen
