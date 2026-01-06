
export interface Experience {
  id: number;
  title: string;
  tagline: string;
  description: string;
  history?: string;
  discover?: string[];
  entryFee?: string;
  requirements?: string;
  restrictions?: string;
  image: string;
  score: number;
  tags: string[];
  category: 'Journey' | 'Gourmet' | 'Culture' | 'Accommodation' | 'Seoul' | 'Korea' | 'Domestic';
}

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
  image?: string;
}

export interface NavLink {
  label: string;
  href: string;
}
