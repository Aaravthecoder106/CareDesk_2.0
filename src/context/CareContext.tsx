'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuditLogItem, Elder, ElderMedication, MedicalReport, VitalReading, VitalsParseResult } from '@/lib/types';
import { INITIAL_AUDIT_LOGS, INITIAL_ELDERS, INITIAL_MEDICATIONS, INITIAL_REPORTS, INITIAL_VITALS } from '@/lib/mockData';
import { parseAndEvaluateVitals, VitalsInputRaw } from '@/lib/vitalsEngine';
import { isLiveSupabaseConfigured } from '@/lib/supabase/client';

export type UserRole = 'caregiver' | 'patient';

export interface UserProfile {
  name: string;
  role: UserRole;
  phone?: string;
  language?: string;
  elderName?: string;
  relationship?: string;
  checkInMethod?: string;
  emergencyPhone?: string;
  createdAt: string;
}

interface CareContextType {
  elders: Elder[];
  activeElderId: string;
  activeElder: Elder;
  setActiveElderId: (id: string) => void;
  addElder: (elder: Omit<Elder, 'id' | 'currentStatus'>) => Elder;
  updateElder: (id: string, updates: Partial<Elder>) => void;
  vitals: VitalReading[];
  activeElderVitals: VitalReading[];
  reports: MedicalReport[];
  activeElderReports: MedicalReport[];
  auditLogs: AuditLogItem[];
  activeElderAuditLogs: AuditLogItem[];
  medications: ElderMedication[];
  activeElderMedications: ElderMedication[];
  toggleMedication: (id: string) => void;
  addMedication: (med: Omit<ElderMedication, 'id' | 'takenToday'>) => void;
  triggerEmergencySOS: (elderId: string, reason?: string) => { success: boolean; message: string; timestamp: string };
  addVitalReading: (raw: VitalsInputRaw, recordedByName?: string) => { success: boolean; result?: VitalsParseResult; error?: string };
  addReport: (report: MedicalReport) => void;
  currentUser: UserProfile | null;
  registerUser: (profile: Omit<UserProfile, 'createdAt'>) => void;
  logoutUser: () => void;
  isLiveMode: boolean;
  resetToMockData: () => void;
}

const CareContext = createContext<CareContextType | undefined>(undefined);

export function CareProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [elders, setElders] = useState<Elder[]>(INITIAL_ELDERS);
  const [activeElderId, setActiveElderId] = useState<string>(INITIAL_ELDERS[0].id);
  const [vitals, setVitals] = useState<VitalReading[]>(INITIAL_VITALS);
  const [reports, setReports] = useState<MedicalReport[]>(INITIAL_REPORTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [medications, setMedications] = useState<ElderMedication[]>(INITIAL_MEDICATIONS);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      setIsLiveMode(isLiveSupabaseConfigured());
      const storedElders = localStorage.getItem('caredesk_elders');
      const storedVitals = localStorage.getItem('caredesk_vitals');
      const storedReports = localStorage.getItem('caredesk_reports');
      const storedLogs = localStorage.getItem('caredesk_audit');
      const storedMeds = localStorage.getItem('caredesk_medications');
      const storedActive = localStorage.getItem('caredesk_active_elder');
      const storedUser = localStorage.getItem('caredesk_user');

      if (storedElders) setElders(JSON.parse(storedElders));
      if (storedVitals) setVitals(JSON.parse(storedVitals));
      if (storedReports) setReports(JSON.parse(storedReports));
      if (storedLogs) setAuditLogs(JSON.parse(storedLogs));
      if (storedMeds) setMedications(JSON.parse(storedMeds));
      if (storedActive) setActiveElderId(storedActive);
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
    } catch (e) {
      console.warn('Failed to load stored CareDesk data, using defaults', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('caredesk_elders', JSON.stringify(elders));
      localStorage.setItem('caredesk_vitals', JSON.stringify(vitals));
      localStorage.setItem('caredesk_reports', JSON.stringify(reports));
      localStorage.setItem('caredesk_audit', JSON.stringify(auditLogs));
      localStorage.setItem('caredesk_medications', JSON.stringify(medications));
      localStorage.setItem('caredesk_active_elder', activeElderId);
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [elders, vitals, reports, auditLogs, medications, activeElderId, isLoaded]);

  const activeElder = elders.find((e) => e.id === activeElderId) || elders[0];
  const activeElderVitals = vitals
    .filter((v) => v.elderId === activeElderId)
    .sort((a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime());
  const activeElderReports = reports
    .filter((r) => r.elderId === activeElderId)
    .sort((a, b) => new Date(b.testDate).getTime() - new Date(a.testDate).getTime());
  const activeElderAuditLogs = auditLogs
    .filter((l) => l.elderId === activeElderId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const activeElderMedications = medications.filter((m) => m.elderId === activeElderId);

  const toggleMedication = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          const newStatus = !med.takenToday;
          const updated = {
            ...med,
            takenToday: newStatus,
            lastTakenAt: newStatus ? new Date().toISOString() : med.lastTakenAt,
          };

          // Add audit log
          const newLog: AuditLogItem = {
            id: `a-${Date.now()}`,
            elderId: med.elderId,
            actorName: currentUser?.name || 'Elder / Caregiver',
            actionType: 'medication_taken',
            description: newStatus
              ? `Marked medication "${med.name} (${med.dosage})" as TAKEN today.`
              : `Unmarked medication "${med.name}" as pending.`,
            timestamp: new Date().toISOString(),
            metadata: { medicationId: med.id, status: newStatus },
          };
          setAuditLogs((l) => [newLog, ...l]);

          return updated;
        }
        return med;
      })
    );
  };

  const addMedication = (med: Omit<ElderMedication, 'id' | 'takenToday'>) => {
    const newMed: ElderMedication = {
      ...med,
      id: `m-${Date.now()}`,
      takenToday: false,
    };
    setMedications((prev) => [...prev, newMed]);

    const newLog: AuditLogItem = {
      id: `a-${Date.now()}`,
      elderId: med.elderId,
      actorName: currentUser?.name || 'Family Caregiver',
      actionType: 'elder_updated',
      description: `Added new prescription routine: "${med.name} (${med.dosage}) - ${med.timing}".`,
      timestamp: new Date().toISOString(),
      metadata: { medicationId: newMed.id },
    };
    setAuditLogs((l) => [newLog, ...l]);
  };

  const addElder = (elderData: Omit<Elder, 'id' | 'currentStatus'>): Elder => {
    const newElder: Elder = {
      ...elderData,
      id: `elder-${Date.now()}`,
      currentStatus: 'green',
    };
    setElders((prev) => [...prev, newElder]);
    setActiveElderId(newElder.id);

    const newLog: AuditLogItem = {
      id: `a-${Date.now()}`,
      elderId: newElder.id,
      actorName: currentUser?.name || 'Caregiver',
      actionType: 'consent_granted',
      description: `Added new elder profile: ${newElder.fullName} (${newElder.age} yrs). Baseline status set to Green.`,
      timestamp: new Date().toISOString(),
      metadata: { elderId: newElder.id },
    };
    setAuditLogs((l) => [newLog, ...l]);
    return newElder;
  };

  const updateElder = (id: string, updates: Partial<Elder>) => {
    setElders((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );

    const target = elders.find((e) => e.id === id);
    const newLog: AuditLogItem = {
      id: `a-${Date.now()}`,
      elderId: id,
      actorName: currentUser?.name || 'Caregiver',
      actionType: 'elder_updated',
      description: `Updated profile details and emergency preferences for ${target?.fullName || 'Elder'}.`,
      timestamp: new Date().toISOString(),
      metadata: updates,
    };
    setAuditLogs((l) => [newLog, ...l]);
  };

  const triggerEmergencySOS = (elderId: string, reason = 'Senior pressed 1-tap SOS distress button'): { success: boolean; message: string; timestamp: string } => {
    const target = elders.find((e) => e.id === elderId) || activeElder;
    const now = new Date().toISOString();

    // Mark elder status as Red
    setElders((prev) =>
      prev.map((e) => (e.id === target.id ? { ...e, currentStatus: 'red' } : e))
    );

    // Record high priority SOS audit log
    const sosLog: AuditLogItem = {
      id: `a-${Date.now()}`,
      elderId: target.id,
      actorName: `${target.fullName} (SOS Alert)`,
      actionType: 'sos_dispatched',
      description: `EMERGENCY SOS DISPATCHED: ${reason}. Automated SMS sent to ${target.emergencyContactName} (${target.emergencyContactPhone}). Primary Doctor ${target.primaryDoctorName} notified.`,
      timestamp: now,
      metadata: { priority: 'CRITICAL_P0', emergencyContact: target.emergencyContactPhone },
    };
    setAuditLogs((prev) => [sosLog, ...prev]);

    return {
      success: true,
      message: `Emergency SOS dispatched for ${target.fullName}. Contact ${target.emergencyContactName} and Doctor ${target.primaryDoctorName} notified immediately.`,
      timestamp: now,
    };
  };

  const addVitalReading = (raw: VitalsInputRaw, recordedByName = 'Aarav (Caregiver)') => {
    const evalResult = parseAndEvaluateVitals(raw);
    if (!evalResult.isValid) {
      const errorMsg = Object.values(evalResult.errors).join(' ');
      return { success: false, result: evalResult, error: errorMsg };
    }

    const newVital: VitalReading = {
      id: `v-${Date.now()}`,
      elderId: activeElderId,
      recordedAt: new Date().toISOString(),
      systolic: evalResult.systolic,
      diastolic: evalResult.diastolic,
      bloodPressureStatus: evalResult.bpStatus,
      bloodSugarValue: evalResult.bloodSugar,
      bloodSugarType: evalResult.sugarType,
      bloodSugarStatus: evalResult.sugarStatus,
      heartRate: evalResult.heartRate,
      heartRateStatus: evalResult.heartRateStatus,
      spo2: evalResult.spo2,
      spo2Status: evalResult.spo2Status,
      weightKg: evalResult.weight,
      overallStatus: evalResult.overallStatus,
      notes: raw.notes,
      recordedByName,
    };

    // Update vitals
    setVitals((prev) => [newVital, ...prev]);

    // Update elder's overall current status
    setElders((prev) =>
      prev.map((e) => (e.id === activeElderId ? { ...e, currentStatus: evalResult.overallStatus } : e))
    );

    // Add audit log
    const bpStr = evalResult.systolic ? `BP: ${evalResult.systolic}/${evalResult.diastolic} mmHg` : '';
    const sugarStr = evalResult.bloodSugar ? `Sugar: ${evalResult.bloodSugar} mg/dL (${evalResult.sugarType})` : '';
    const summary = [bpStr, sugarStr].filter(Boolean).join(', ');

    const newLog: AuditLogItem = {
      id: `a-${Date.now()}`,
      elderId: activeElderId,
      actorName: recordedByName,
      actionType: 'vitals_logged',
      description: `Logged vitals for ${activeElder.fullName} (${summary}). Traffic Light: ${evalResult.overallStatus.toUpperCase()}.`,
      timestamp: new Date().toISOString(),
      metadata: { vitalId: newVital.id, status: evalResult.overallStatus },
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    return { success: true, result: evalResult };
  };

  const addReport = (report: MedicalReport) => {
    setReports((prev) => [report, ...prev]);

    const newLog: AuditLogItem = {
      id: `a-${Date.now()}`,
      elderId: report.elderId || activeElderId,
      actorName: report.uploadedByName || 'Caregiver',
      actionType: 'report_analyzed',
      description: `Analyzed lab report: "${report.title}". Extracted ${report.biomarkers?.length || 0} biomarkers with bilingual summaries.`,
      timestamp: new Date().toISOString(),
      metadata: { reportId: report.id },
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const registerUser = (profileData: Omit<UserProfile, 'createdAt'>) => {
    const profile: UserProfile = {
      ...profileData,
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(profile);
    try {
      localStorage.setItem('caredesk_user', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }

    // Add audit log for signup
    const newLog: AuditLogItem = {
      id: `a-${Date.now()}`,
      elderId: activeElderId,
      actorName: profile.name,
      actionType: 'consent_granted',
      description: `New CareDesk signup: ${profile.name} registered as a ${profile.role.toUpperCase()} (${profile.relationship || 'Self'}).`,
      timestamp: new Date().toISOString(),
      metadata: { role: profile.role, language: profile.language },
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const logoutUser = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('caredesk_user');
    } catch (e) {
      console.error(e);
    }
  };

  const resetToMockData = () => {
    localStorage.removeItem('caredesk_elders');
    localStorage.removeItem('caredesk_vitals');
    localStorage.removeItem('caredesk_reports');
    localStorage.removeItem('caredesk_audit');
    localStorage.removeItem('caredesk_medications');
    setElders(INITIAL_ELDERS);
    setActiveElderId(INITIAL_ELDERS[0].id);
    setVitals(INITIAL_VITALS);
    setReports(INITIAL_REPORTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setMedications(INITIAL_MEDICATIONS);
    setCurrentUser(null);
  };

  return (
    <CareContext.Provider
      value={{
        elders,
        activeElderId,
        activeElder,
        setActiveElderId,
        addElder,
        updateElder,
        vitals,
        activeElderVitals,
        reports,
        activeElderReports,
        auditLogs,
        activeElderAuditLogs,
        medications,
        activeElderMedications,
        toggleMedication,
        addMedication,
        triggerEmergencySOS,
        addVitalReading,
        addReport,
        currentUser,
        registerUser,
        logoutUser,
        isLiveMode,
        resetToMockData,
      }}
    >
      {children}
    </CareContext.Provider>
  );
}

export function useCare(): CareContextType {
  const context = useContext(CareContext);
  if (!context) {
    throw new Error('useCare must be used within a CareProvider');
  }
  return context;
}
