import request from 'supertest';
import { app } from '../../app';
import { mongoDB } from '../../db/mongodb';
import { userService } from '../../services/user.service';
import { groupService } from '../../services/group.service';
import { channelService } from '../../services/channel.service';

describe('Messages Routes', () => {
    let authToken: string;
    let userId: string;
    let groupId: string;
    let channelId: string;

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

        // Create test group
        const group = await groupService.createGroup({
            name: 'Test Group',
            description: 'A test group',
            isPrivate: false,
            createdBy: userId
        });
        groupId = group._id;

        // Create test channel
        const channel = await channelService.createChannel({
            name: 'general',
            description: 'General channel',
            groupId: groupId,
            createdBy: userId,
            isPrivate: false
        });
        channelId = channel._id;
    });

    afterAll(async () => {
        await mongoDB.disconnect();
    });

    describe('POST /api/messages', () => {
        it('should create a new message', async () => {
            const messageData = {
                channelId: channelId,
                text: 'Hello, this is a test message!',
                type: 'text'
            };

            const response = await request(app)
                .post('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .send(messageData)
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data.text).toBe(messageData.text);
            expect(response.body.data.channelId).toBe(channelId);
            expect(response.body.data.userId).toBe(userId);
        });

        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .send({})
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/messages/channel/:channelId', () => {
        beforeEach(async () => {
            // Create a test message
            await request(app)
                .post('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    channelId: channelId,
                    text: 'Test message for channel',
                    type: 'text'
                });
        });

        it('should get messages by channel', async () => {
            const response = await request(app)
                .get(`/api/messages/channel/${channelId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        it('should support pagination', async () => {
            const response = await request(app)
                .get(`/api/messages/channel/${channelId}?limit=1&offset=0`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBeLessThanOrEqual(1);
        });
    });

    describe('GET /api/messages/search', () => {
        beforeEach(async () => {
            // Create a test message with searchable content
            await request(app)
                .post('/api/messages')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    channelId: channelId,
                    text: 'This is a searchable message with unique content',
                    type: 'text'
                });
        });

        it('should search messages', async () => {
            const response = await request(app)
                .get('/api/messages/search?query=searchable')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });
});
