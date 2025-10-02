import { ObjectId, Document } from 'mongodb';

export interface IGroupRequest extends Document {
    _id?: ObjectId;
    groupId: ObjectId;
    groupName: string;
    userId: ObjectId;
    username: string;
    requestType: 'register_interest' | 'request_invite';
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: Date;
    reviewedBy?: ObjectId;
    reviewedAt?: Date;
    message?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGroupRequestCreate {
    groupId: ObjectId;
    groupName: string;
    userId: ObjectId;
    username: string;
    requestType: 'register_interest' | 'request_invite';
    message?: string;
}

export interface IGroupRequestUpdate {
    status: 'pending' | 'approved' | 'rejected';
    reviewedBy?: ObjectId;
    reviewedAt?: Date;
    message?: string;
}

export interface IGroupRequestResponse {
    _id: string;
    groupId: string;
    groupName: string;
    userId: string;
    username: string;
    requestType: 'register_interest' | 'request_invite';
    status: 'pending' | 'approved' | 'rejected';
    requestedAt: string;
    reviewedBy?: string;
    reviewedAt?: string;
    message?: string;
    createdAt: string;
    updatedAt: string;
}

export class GroupRequestModel {
    static toResponse(request: IGroupRequest): IGroupRequestResponse {
        return {
            _id: request._id?.toString() || '',
            groupId: request.groupId.toString(),
            groupName: request.groupName,
            userId: request.userId.toString(),
            username: request.username,
            requestType: request.requestType,
            status: request.status,
            requestedAt: request.requestedAt.toISOString(),
            reviewedBy: request.reviewedBy?.toString(),
            reviewedAt: request.reviewedAt?.toISOString(),
            message: request.message,
            createdAt: request.createdAt.toISOString(),
            updatedAt: request.updatedAt.toISOString()
        };
    }

    static toCreate(data: IGroupRequestCreate): Omit<IGroupRequest, '_id' | 'createdAt' | 'updatedAt'> {
        return {
            groupId: data.groupId,
            groupName: data.groupName,
            userId: data.userId,
            username: data.username,
            requestType: data.requestType,
            status: 'pending',
            requestedAt: new Date(),
            message: data.message
        };
    }

    static toUpdate(data: IGroupRequestUpdate): Partial<IGroupRequest> {
        const update: Partial<IGroupRequest> = {};

        if (data.status !== undefined) update.status = data.status;
        if (data.reviewedBy !== undefined) update.reviewedBy = data.reviewedBy;
        if (data.reviewedAt !== undefined) update.reviewedAt = data.reviewedAt;
        if (data.message !== undefined) update.message = data.message;

        update.updatedAt = new Date();

        return update;
    }
}

export { IGroupRequest as GroupRequest };
