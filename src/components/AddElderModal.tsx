'use client';

import React, { useState } from 'react';
import { useCare } from '@/context/CareContext';
import { X, UserPlus, Heart, Phone, ShieldCheck, Stethoscope } from 'lucide-react';

interface AddElderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddElderModal({ isOpen, onClose }: AddElderModalProps) {
  const { addElder } = useCare();

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('65');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [conditions, setConditions] = useState('Hypertension, Osteoarthritis');
  const [allergies, setAllergies] = useState('None');
  const [doctorName, setDoctorName] = useState('Dr. S. K. Gupta');
  const [doctorPhone, setDoctorPhone] = useState('+91 98111 55667');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98765 43210');
  const [notes, setNotes] = useState('Requires morning blood pressure check.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    addElder({
      fullName: fullName.trim(),
      age: parseInt(age, 10) || 65,
      gender,
      bloodGroup,
      emergencyContactName: 'Aarav (Son)',
      emergencyContactPhone: emergencyPhone.trim() || '+91 98765 43210',
      primaryDoctorName: doctorName.trim(),
      primaryDoctorPhone: doctorPhone.trim(),
      conditions: conditions.split(',').map((c) => c.trim()).filter(Boolean),
      allergies: allergies.split(',').map((a) => a.trim()).filter(Boolean),
      notes: notes.trim(),
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black">Add Monitored Parent / Elder</h2>
              <p className="text-xs text-slate-500">Add profile, clinical conditions, &amp; doctors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Full Name & Age */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Elder Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Nirmala Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Age</label>
              <input
                type="number"
                min="50"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Gender & Blood Group */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Blood Group</label>
              <input
                type="text"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                placeholder="O+, B+, A-, etc."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Health Conditions */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              Chronic Conditions (comma separated)
            </label>
            <input
              type="text"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              placeholder="e.g. Hypertension, Diabetes, Thyroid"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Primary Doctor Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Doctor Name</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Doctor Phone</label>
              <input
                type="text"
                value={doctorPhone}
                onChange={(e) => setDoctorPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="font-bold text-slate-700 dark:text-slate-300">Care Notes &amp; Habits</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Takes medicine post breakfast, requires gentle walking reminder"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-md transition"
            >
              Save Elder Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
