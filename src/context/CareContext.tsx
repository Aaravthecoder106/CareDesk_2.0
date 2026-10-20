'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuditLogItem, Elder, MedicalReport, VitalReading, VitalsParseResult } from '@/lib/types';
import { INITIAL_AUDIT_LOGS, INITIAL_ELDERS, INITIAL_REPORTS, INITIAL_VITALS } from '@/lib/mockData';
import { parseAndEvaluateVitals, VitalsInputRaw } from '@/lib/vitalsEngine';
import { isLiveSupabaseConfigured } from '@/lib/supabase/client';

interface CareContextType {
  elders: Elder[];
  activeElderId: string;
  activeElder: Elder;
  setActiveElderId: (id: string) => void;
  vitals: VitalReading[];
  activeElderVitals: VitalReading[];
  reports: MedicalReport[];
  activeElderReports: MedicalReport[];
  auditLogs: AuditLogItem[];
  activeElderAuditLogs: AuditLogItem[];
  addVitalReading: (raw: VitalsInputRaw, recordedByName?: string) => { success: boolean; result?: VitalsParseResult; error?: string };
  addReport: (report: MedicalReport) => void;
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
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      setIsLiveMode(isLiveSupabaseConfigured());
      const storedElders = localStorage.getItem('caredesk_elders');
      const storedVitals = localStorage.getItem('caredesk_vitals');
      const storedReports = localStorage.getItem('caredesk_reports');
      const storedLogs = localStorage.getItem('caredesk_audit');
      const storedActive = localStorage.getItem('caredesk_active_elder');

      if (storedElders) setElders(JSON.parse(storedElders));
      if (storedVitals) setVitals(JSON.parse(storedVitals));
      if (storedReports) setReports(JSON.parse(storedReports));
      if (storedLogs) setAuditLogs(JSON.parse(storedLogs));
      if (storedActive) setActiveElderId(storedActive);
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
      localStorage.setItem('caredesk_active_elder', activeElderId);
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [elders, vitals, reports, auditLogs, activeElderId, isLoaded]);

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

  const resetToMockData = () => {
    localStorage.removeItem('caredesk_elders');
    localStorage.removeItem('caredesk_vitals');
    localStorage.removeItem('caredesk_reports');
    localStorage.removeItem('caredesk_audit');
    localStorage.removeItem('caredesk_active_elder');
    setElders(INITIAL_ELDERS);
    setActiveElderId(INITIAL_ELDERS[0].id);
    setVitals(INITIAL_VITALS);
    setReports(INITIAL_REPORTS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
  };

  return (
    <CareContext.Provider
      value={{
        elders,
        activeElderId,
        activeElder,
        setActiveElderId,
        vitals,
        activeElderVitals,
        reports,
        activeElderReports,
        auditLogs,
        activeElderAuditLogs,
        addVitalReading,
        addReport,
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
