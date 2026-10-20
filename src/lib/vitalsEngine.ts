import { BloodSugarType, StatusLevel, VitalsParseResult } from './types';

export function parseBloodPressure(input: string): { systolic?: number; diastolic?: number; error?: string } {
  if (!input || input.trim() === '') {
    return {};
  }

  const clean = input.trim();
  // Match formats like "120/80", "120 / 80", "120-80"
  const match = clean.match(/^(\d{2,3})\s*[\/\-]\s*(\d{2,3})$/);
  if (!match) {
    return { error: 'Invalid BP format. Please enter as Systolic/Diastolic (e.g., 120/80).' };
  }

  const sys = parseInt(match[1], 10);
  const dia = parseInt(match[2], 10);

  if (sys < 50 || sys > 260) {
    return { error: `Systolic (${sys}) is outside realistic physiological range (50–260 mmHg).` };
  }
  if (dia < 30 || dia > 160) {
    return { error: `Diastolic (${dia}) is outside realistic physiological range (30–160 mmHg).` };
  }
  if (sys <= dia) {
    return { error: `Systolic (${sys}) must be strictly higher than Diastolic (${dia}).` };
  }
  if (sys - dia < 15) {
    return { error: `Pulse pressure (${sys - dia} mmHg) is unusually narrow. Please re-check the reading.` };
  }

  return { systolic: sys, diastolic: dia };
}

export function evaluateBloodPressure(sys: number, dia: number): { status: StatusLevel; description: string; advice: string } {
  if (sys >= 180 || dia >= 120) {
    return {
      status: 'red',
      description: 'Hypertensive Crisis',
      advice: 'Extremely high blood pressure! Rest for 5 minutes and re-test. If still high or accompanied by chest pain/headache, seek emergency medical care immediately.',
    };
  }
  if (sys >= 140 || dia >= 90) {
    return {
      status: 'red',
      description: 'Stage 2 Hypertension',
      advice: 'High blood pressure reading. Ensure prescribed medications have been taken and notify the primary doctor if this persists for 2 consecutive days.',
    };
  }
  if (sys >= 130 || dia >= 80) {
    return {
      status: 'yellow',
      description: 'Stage 1 Hypertension',
      advice: 'Mildly elevated blood pressure. Monitor daily, limit dietary sodium, and ensure adequate hydration and rest.',
    };
  }
  if (sys >= 120 && dia < 80) {
    return {
      status: 'yellow',
      description: 'Elevated BP',
      advice: 'Systolic pressure is slightly above ideal. Healthy lifestyle, low salt, and regular gentle walking recommended.',
    };
  }
  if (sys < 90 || dia < 60) {
    return {
      status: sys < 80 || dia < 50 ? 'red' : 'yellow',
      description: 'Hypotension (Low BP)',
      advice: 'Blood pressure is unusually low. Offer electrolyte fluids or water, avoid sudden standing up, and consult doctor if lightheaded.',
    };
  }

  return {
    status: 'green',
    description: 'Normal Blood Pressure',
    advice: 'Great! Blood pressure is within optimal healthy range (<120/80 mmHg).',
  };
}

export function evaluateBloodSugar(value: number, type: BloodSugarType = 'fasting'): { status: StatusLevel; description: string; advice: string } {
  if (value < 70) {
    return {
      status: 'red',
      description: 'Hypoglycemia (Low Sugar)',
      advice: 'Blood sugar is dangerously low (<70 mg/dL)! Give 15-20g of fast-acting sugar (fruit juice, candy, or glucose water) immediately and recheck in 15 minutes.',
    };
  }

  if (type === 'fasting') {
    if (value <= 99) {
      return {
        status: 'green',
        description: 'Normal Fasting Glucose',
        advice: 'Optimal fasting blood sugar level (70–99 mg/dL).',
      };
    }
    if (value <= 125) {
      return {
        status: 'yellow',
        description: 'Impaired Fasting Glucose (Pre-diabetes)',
        advice: 'Fasting glucose is slightly high (100–125 mg/dL). Review recent carbohydrate intake and monitor morning trends.',
      };
    }
    return {
      status: 'red',
      description: 'Elevated Fasting Glucose',
      advice: 'Fasting blood sugar is significantly elevated (≥126 mg/dL). Ensure diabetes medication was taken and review with physician.',
    };
  }

  // Post-prandial (2 hrs post-meal) or Random
  if (value < 140) {
    return {
      status: 'green',
      description: 'Normal Post-Meal Glucose',
      advice: 'Healthy post-prandial blood sugar level (<140 mg/dL).',
    };
  }
  if (value <= 199) {
    return {
      status: 'yellow',
      description: 'Elevated Post-Meal Glucose',
      advice: 'Blood sugar is elevated (140–199 mg/dL). Encourage water intake and a light post-meal walk.',
    };
  }

  return {
    status: 'red',
    description: 'High Blood Sugar (Diabetic Spike)',
    advice: 'Blood sugar is critically high (≥200 mg/dL). Check for symptoms of dry mouth or lethargy, and contact treating doctor if sustained.',
  };
}

export function evaluateHeartRate(bpm: number): { status: StatusLevel; description: string; advice: string } {
  if (bpm < 50) {
    return {
      status: 'red',
      description: 'Severe Bradycardia',
      advice: 'Heart rate is below 50 bpm. If accompanied by fatigue or dizziness, contact physician immediately.',
    };
  }
  if (bpm < 60) {
    return {
      status: 'yellow',
      description: 'Mild Bradycardia',
      advice: 'Resting pulse is slightly slow (50–59 bpm). Common in well-conditioned seniors or on beta-blockers.',
    };
  }
  if (bpm <= 100) {
    return {
      status: 'green',
      description: 'Normal Heart Rate',
      advice: 'Resting pulse is healthy and within standard limits (60–100 bpm).',
    };
  }
  if (bpm <= 120) {
    return {
      status: 'yellow',
      description: 'Mild Tachycardia',
      advice: 'Resting heart rate is elevated (101–120 bpm). Ensure hydration, calm breathing, and check for fever or stress.',
    };
  }
  return {
    status: 'red',
    description: 'High Tachycardia',
    advice: 'Heart rate exceeds 120 bpm at rest. Sit comfortably, take slow breaths, and contact healthcare provider if persistent.',
  };
}

export function evaluateSpO2(spo2: number): { status: StatusLevel; description: string; advice: string } {
  if (spo2 >= 95) {
    return {
      status: 'green',
      description: 'Normal Oxygen Saturation',
      advice: 'SpO2 is optimal (≥95%). Lungs and circulation are operating normally.',
    };
  }
  if (spo2 >= 90) {
    return {
      status: 'yellow',
      description: 'Borderline Oxygenation',
      advice: 'SpO2 is slightly low (90–94%). Check pulse oximeter probe placement, practice deep upright breathing, and monitor.',
    };
  }
  return {
    status: 'red',
    description: 'Hypoxemia (Low Oxygen)',
    advice: 'Critically low oxygen saturation (<90%)! Ensure senior is sitting upright and seek urgent medical evaluation or supplemental oxygen.',
  };
}

export interface VitalsInputRaw {
  bloodPressure?: string;
  bloodSugar?: string | number;
  sugarType?: BloodSugarType;
  heartRate?: string | number;
  spo2?: string | number;
  weight?: string | number;
  notes?: string;
}

export function parseAndEvaluateVitals(input: VitalsInputRaw): VitalsParseResult {
  const errors: Record<string, string> = {};
  const warnings: string[] = [];
  const recommendations: string[] = [];
  let overallStatus: StatusLevel = 'green';

  const upgradeStatus = (newStatus: StatusLevel) => {
    if (newStatus === 'red') overallStatus = 'red';
    else if (newStatus === 'yellow' && overallStatus !== 'red') overallStatus = 'yellow';
  };

  let systolic: number | undefined;
  let diastolic: number | undefined;
  let bpStatus: StatusLevel | undefined;

  // 1. Blood Pressure
  if (input.bloodPressure && input.bloodPressure.trim()) {
    const bpResult = parseBloodPressure(input.bloodPressure);
    if (bpResult.error) {
      errors.bloodPressure = bpResult.error;
    } else if (bpResult.systolic && bpResult.diastolic) {
      systolic = bpResult.systolic;
      diastolic = bpResult.diastolic;
      const bpEval = evaluateBloodPressure(systolic, diastolic);
      bpStatus = bpEval.status;
      upgradeStatus(bpStatus);
      recommendations.push(`BP (${systolic}/${diastolic} mmHg): ${bpEval.advice}`);
    }
  }

  // 2. Blood Sugar
  let bloodSugar: number | undefined;
  let sugarStatus: StatusLevel | undefined;
  const sugarType = input.sugarType || 'fasting';

  if (input.bloodSugar !== undefined && input.bloodSugar !== '') {
    const val = typeof input.bloodSugar === 'number' ? input.bloodSugar : parseFloat(input.bloodSugar.toString());
    if (isNaN(val) || val < 20 || val > 700) {
      errors.bloodSugar = 'Blood sugar must be a realistic number between 20 and 700 mg/dL.';
    } else {
      bloodSugar = val;
      const sugarEval = evaluateBloodSugar(bloodSugar, sugarType);
      sugarStatus = sugarEval.status;
      upgradeStatus(sugarStatus);
      recommendations.push(`Sugar (${bloodSugar} mg/dL, ${sugarType}): ${sugarEval.advice}`);
    }
  }

  // 3. Heart Rate
  let heartRate: number | undefined;
  let heartRateStatus: StatusLevel | undefined;
  if (input.heartRate !== undefined && input.heartRate !== '') {
    const val = typeof input.heartRate === 'number' ? input.heartRate : parseInt(input.heartRate.toString(), 10);
    if (isNaN(val) || val < 30 || val > 240) {
      errors.heartRate = 'Heart rate must be between 30 and 240 bpm.';
    } else {
      heartRate = val;
      const hrEval = evaluateHeartRate(heartRate);
      heartRateStatus = hrEval.status;
      upgradeStatus(heartRateStatus);
      recommendations.push(`Pulse (${heartRate} bpm): ${hrEval.advice}`);
    }
  }

  // 4. SpO2
  let spo2: number | undefined;
  let spo2Status: StatusLevel | undefined;
  if (input.spo2 !== undefined && input.spo2 !== '') {
    const val = typeof input.spo2 === 'number' ? input.spo2 : parseInt(input.spo2.toString(), 10);
    if (isNaN(val) || val < 50 || val > 100) {
      errors.spo2 = 'SpO2 must be a percentage between 50% and 100%.';
    } else {
      spo2 = val;
      const spo2Eval = evaluateSpO2(spo2);
      spo2Status = spo2Eval.status;
      upgradeStatus(spo2Status);
      recommendations.push(`SpO2 (${spo2}%): ${spo2Eval.advice}`);
    }
  }

  // 5. Weight
  let weight: number | undefined;
  if (input.weight !== undefined && input.weight !== '') {
    const val = typeof input.weight === 'number' ? input.weight : parseFloat(input.weight.toString());
    if (isNaN(val) || val < 20 || val > 300) {
      errors.weight = 'Weight must be between 20 and 300 kg.';
    } else {
      weight = val;
    }
  }

  // Validation check: at least one vital must be entered
  const hasAnyVital = systolic !== undefined || bloodSugar !== undefined || heartRate !== undefined || spo2 !== undefined || weight !== undefined;
  if (!hasAnyVital && Object.keys(errors).length === 0) {
    errors.general = 'Please enter at least one health vital (e.g. Blood Pressure, Sugar, or Pulse).';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    warnings,
    systolic,
    diastolic,
    bpStatus,
    bloodSugar,
    sugarType,
    sugarStatus,
    heartRate,
    heartRateStatus,
    spo2,
    spo2Status,
    weight,
    overallStatus: isValid ? overallStatus : 'yellow',
    recommendations,
  };
}
