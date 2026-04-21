export type RequestStatus = 'new' | 'in_progress' | 'done' | 'canceled';
export type RequestPriority = 'low' | 'medium' | 'high';

export interface Request {
    id: string;
    title: string;
    description: string;
    status: RequestStatus;
    priority: RequestPriority;
    clientName: string;
    createdAt: string;
    updatedAt: string;
    assignee?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;
    hasNextPage: boolean;
}

export interface RequestFilter {
	search?: string
	status?: RequestStatus
	priority?: RequestPriority
	assignee?: string
	sortBy?: 'createdAt' | 'priority'
	sortOrder?: 'asc' | 'desc'
	page: number
	limit: number
	[key: string]: string | number | undefined
}
