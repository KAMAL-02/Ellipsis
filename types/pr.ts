export interface PRFile {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
}

export interface PRFilesResponse {
    prFiles: PRFile[];
    summary: string;
}