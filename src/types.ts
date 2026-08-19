export interface GuidebookPage {
  id: number;
  fileName: string;
  fileNumber: string;
  sortOrder: number;
  category: 'roadmap' | 'internship' | 'location' | 'recruitment' | 'workplace';
  categoryLabel: string;
  title: string;
  subtitle: string;
  targetAudience: string[];
  summary: string;
  keyPoints: string[];
  subsidyOrBenefit?: string;
  requirements?: string;
  contactDepartment: string;
  contactPhone?: string;
  tags: string[];
  themeColor: {
    primary: string;
    light: string;
    border: string;
    text: string;
    badgeBg: string;
  };
  visualBadges?: string[];
  detailsList?: { label: string; value: string }[];
}

export type ViewMode = 'slide' | 'book' | 'grid' | 'print';

export interface PageNote {
  pageId: number;
  content: string;
  updatedAt: string;
}
