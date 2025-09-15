
export interface JobPosition {
  id: number;
  title: string;
  description: string;
  requirements: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  applicantCount: number;
  trend?: 'up' | 'down' | 'stable'; // For dashboard display
}