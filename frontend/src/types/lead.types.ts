export interface Lead {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
    createdAt: string;
}

export interface LeadsResponse {
    success: boolean;

    data: Lead[];

    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}