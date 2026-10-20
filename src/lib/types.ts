export type StatusLevel = 'green' | 'yellow' | 'red';

export interface Elder {
  id: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  primaryDoctorName: string;
  primaryDoctorPhone: string;
  conditions: string[];
  allergies: string[];
  notes?: string;
  avatarUrl?: string;
  currentStatus: StatusLevel;
}

export type BloodSugarType = 'fasting' | 'post_prandial' | 'random';

export interface VitalReading {
  id: string;
  elderId: string;
  recordedAt: string; // ISO date string
  systolic?: number;
  diastolic?: number;
  bloodPressureStatus?: StatusLevel;
  bloodSugarValue?: number;
  bloodSugarType?: BloodSugarType;
  bloodSugarStatus?: StatusLevel;
  heartRate?: number;
  heartRateStatus?: StatusLevel;
  spo2?: number;
  spo2Status?: StatusLevel;
  weightKg?: number;
  overallStatus: StatusLevel;
  notes?: string;
  recordedByName?: string;
}

export interface Biomarker {
  name: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  explanationEn: string;
  explanationHinglish: string;
}

export interface MedicalReport {
  id: string;
  elderId: string;
  title: string;
  testDate: string;
  category: string;
  status: 'analyzed' | 'pending' | 'failed';
  summaryEn: string;
  summaryHinglish: string;
  biomarkers: Biomarker[];
  doctorQuestionsEn: string[];
  doctorQuestionsHinglish: string[];
  uploadedByName: string;
  createdAt: string;
  fileUrl?: string;
}

export interface AuditLogItem {
  id: string;
  elderId: string;
  actorName: string;
  actionType: 'vitals_logged' | 'report_analyzed' | 'elder_updated' | 'alert_triggered' | 'user_registered' | 'consent_granted';
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface VitalsParseResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
  systolic?: number;
  diastolic?: number;
  bpStatus?: StatusLevel;
  bloodSugar?: number;
  sugarType?: BloodSugarType;
  sugarStatus?: StatusLevel;
  heartRate?: number;
  heartRateStatus?: StatusLevel;
  spo2?: number;
  spo2Status?: StatusLevel;
  weight?: number;
  overallStatus: StatusLevel;
  recommendations: string[];
}
