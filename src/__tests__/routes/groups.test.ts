import request from 'supertest';
import { app } from '../../app';
import { mongoDB } from '../../db/mongodb';
import { userService } from '../../services/user.service';

describe('Groups Routes', () => {
    let authToken: string;
    let userId: string;

    beforeAll(async () => {
        await mongoDB.connect();

        // Create test user and get auth token
        const user = await userService.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        });
        userId = user._id;

        // Login to get token
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        authToken = loginResponse.body.data.token;
    });

    afterAll(async () => {
        await mongoDB.disconnect();
    });

    describe('GET /api/groups', () => {
        it('should get all groups', async () => {
            const response = await request(app)
                .get('/api/groups')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should require authentication', async () => {
            const response = await request(app)
                .get('/api/groups')
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/groups', () => {
        it('should create a new group', async () => {
            const groupData = {
                name: 'Test Group',
                description: 'A test group',
                isPrivate: false
            };

            const response = await request(app)
                .post('/api/groups')
                .set('Authorization', `Bearer ${authToken}`)
                .send(groupData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe(groupData.name);
            expect(response.body.data.description).toBe(groupData.description);
        });

        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/groups')
                .set('Authorization', `Bearer ${authToken}`)
                .send({})
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/groups/:id', () => {
        let groupId: string;

        beforeEach(async () => {
            const groupData = {
                name: 'Test Group for Get',
                description: 'A test group for get operation',
                isPrivate: false
            };

            const response = await request(app)
                .post('/api/groups')
                .set('Authorization', `Bearer ${authToken}`)
                .send(groupData);

            groupId = response.body.data._id;
        });

        it('should get group by ID', async () => {
            const response = await request(app)
                .get(`/api/groups/${groupId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data._id).toBe(groupId);
        });

        it('should return 404 for non-existent group', async () => {
            const fakeId = '507f1f77bcf86cd799439011';
            const response = await request(app)
                .get(`/api/groups/${fakeId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(404);

            expect(response.body.success).toBe(false);
        });
    });
});
