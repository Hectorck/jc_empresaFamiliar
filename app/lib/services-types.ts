// Tipos para Servicios y Conferencias

export type ContentType = 'service' | 'conference';
export type ContentStatus = 'draft' | 'published' | 'hidden';

// Base fields compartidos
export interface BaseContent {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  coverImage: string;
  categoryId: string;
  status: ContentStatus;
  featured?: boolean;
  createdAt: number;
  updatedAt: number;
  metaTitle?: string;
  metaDescription?: string;
}

// Secciones de Servicios
export interface ServiceSection {
  title: string;
  description: string;
  image?: string;
  visible: boolean;
}

export interface TargetAudience {
  title: string;
  description: string;
  profiles: string[];
  visible: boolean;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceBenefits {
  title: string;
  benefits: Benefit[];
  visible: boolean;
}

export interface ServiceIncludes {
  title: string;
  description: string;
  items: string[];
  visible: boolean;
}

export interface MethodologyStep {
  number: number;
  title: string;
  description: string;
}

export interface ServiceMethodology {
  title: string;
  description: string;
  steps: MethodologyStep[];
  visible: boolean;
}

export interface Specialist {
  speakerId?: string; // Referencia opcional al ID del conferencista en la colección speakers
}

export interface SpecialistSection {
  title: string;
  specialist: Specialist;
  visible: boolean;
}

// Para backwards compatibility con datos existentes
export interface SpecialistWithDetails extends Specialist {
  name?: string;
  photo?: string;
  role?: string;
  bio?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQSection {
  title: string;
  faqs: FAQ[];
  visible: boolean;
}

export interface CTASection {
  title: string;
  description: string;
  buttonText: string;
  whatsappNumber: string;
  visible: boolean;
}

// Servicio completo
export interface Service extends BaseContent {
  type: 'service';

  // Hero
  category: string;
  subtitle: string;
  briefDescription: string;

  // Secciones
  whatIsSection: ServiceSection;
  targetAudience: TargetAudience;
  benefits: ServiceBenefits;
  includes: ServiceIncludes;
  methodology: ServiceMethodology;
  specialist?: SpecialistSection;
  faqs: FAQSection;
  cta: CTASection;
}

// Secciones de Conferencias
export interface ConferenceHero {
  category: string;
  subtitle: string;
  briefDescription: string;
  date: string;
  startTime: string;
  endTime?: string;
  modality: 'presencial' | 'virtual' | 'híbrido';
  location: string;
}

export interface ConferenceDescription {
  title: string;
  description: string;
  image?: string;
  visible: boolean;
}

export interface Topic {
  title: string;
  description: string;
}

export interface ConferenceTopics {
  title: string;
  description: string;
  topics: Topic[];
  visible: boolean;
}

export interface ConferenceSpeaker {
  speakerId: string; // Referencia al ID del conferencista en la colección speakers
}

export interface ConferenceSpeakers {
  title: string;
  description?: string;
  speakers: ConferenceSpeaker[];
  visible: boolean;
}

export interface EventInformation {
  date: string;
  startTime: string;
  endTime?: string;
  duration: string;
  modality: 'presencial' | 'virtual' | 'híbrido';
  location: string;
  capacity?: number;
  targetAudience: string;
  price?: string;
  additionalInfo?: string;
  visible: boolean;
}

export interface LearningOutcome {
  title: string;
  description: string;
}

export interface LearningOutcomes {
  title: string;
  description: string;
  outcomes: LearningOutcome[];
  visible: boolean;
}

// Conferencia completa
export interface Conference extends BaseContent {
  type: 'conference';

  // Hero
  hero: ConferenceHero;

  // Secciones
  description: ConferenceDescription;
  topics: ConferenceTopics;
  speakers: ConferenceSpeakers;
  eventInfo: EventInformation;
  learningOutcomes: LearningOutcomes;
  faqs: FAQSection;
  cta: CTASection;
}

// Conferencista (Speaker) - Entidad independiente
export interface Speaker {
  id: string;
  name: string;
  photo: string;
  role: string;
  bio: string;
  experience?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  status: 'active' | 'inactive';
  createdAt: number;
  updatedAt: number;
}

export interface SpeakerFormData {
  name: string;
  photo: string;
  role: string;
  bio: string;
  experience?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  status: 'active' | 'inactive';
}

// Tipo unión para contenido
export type Content = Service | Conference;

// Tipo para formularios (parcial, para edición)
export interface ServiceFormData {
  title: string;
  slug: string;
  categoryId: string;
  status: ContentStatus;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  coverImage: string;
  category: string;
  subtitle: string;
  briefDescription: string;
  whatIsSection: ServiceSection;
  targetAudience: TargetAudience;
  benefits: ServiceBenefits;
  includes: ServiceIncludes;
  methodology: ServiceMethodology;
  specialist?: SpecialistSection;
  faqs: FAQSection;
  cta: CTASection;
}

export interface ConferenceFormData {
  title: string;
  slug: string;
  categoryId: string;
  status: ContentStatus;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  coverImage: string;
  hero: ConferenceHero;
  description: ConferenceDescription;
  topics: ConferenceTopics;
  speakers: ConferenceSpeakers;
  eventInfo: EventInformation;
  learningOutcomes: LearningOutcomes;
  faqs: FAQSection;
  cta: CTASection;
}
