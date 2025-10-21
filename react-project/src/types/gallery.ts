
export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: 'achievements' | 'seminars' | 'teamActivities' | 'certificates';
  title: string;
  featured?: boolean;
  date: string;
}

export interface Gallery {
  achievements: GalleryItem[];
  seminars: GalleryItem[];
  teamActivities: GalleryItem[];
  certificates: GalleryItem[];
}
