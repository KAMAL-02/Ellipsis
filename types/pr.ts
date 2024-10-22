export interface PRFile {
    sha: string
    filename: string
    status: string
    additions: number
    deletions: number
    changes: number
    patch?: string
  }

export interface PRFilesResponse {
    prFiles: PRFile[];
    aiSummary: string;
}