export interface User {
    userId: number;
    username: string;
    email: string;
    fullName: string;
    role: 'RESIDENT' | 'ADMIN';
    status?: 'ACTIVE' | 'LOCKED';
    householdId?: number | null;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
}
