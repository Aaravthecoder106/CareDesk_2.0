'use client';

import React from 'react';
import { Heart, Star, Quote } from 'lucide-react';

export function LandingTestimonials() {
  const testimonials = [
    {
      name: 'Aarav Sharma',
      role: 'Son & Tech Lead (Bengaluru)',
      parentInfo: 'Father Ramesh (68) in Lucknow',
      quote:
        'I used to call my father every morning asking "Papa, BP kitna aaya?". It always turned into an awkward conversation where he felt micromanaged. With CareDesk, he logs it via WhatsApp in 5 seconds. The green traffic light gives me instant peace of mind before my 9 AM standup.',
      avatar: 'AS',
      accent: 'border-blue-200 dark:border-blue-900',
    },
    {
      name: 'Dr. Priya Nair',
      role: 'Family Caregiver & Physician (San Jose)',
      parentInfo: 'Mother Sunita (64) in Pune',
      quote:
        'The bilingual Hinglish report translation is sheer genius. My mother was terrified after reading words like "Hypochromic Microcytic Anemia" on her blood test. CareDesk translated it into calm Hinglish explaining she just needed iron-rich palak and beetroot while doctor questions were prepared for me.',
      avatar: 'PN',
      accent: 'border-teal-200 dark:border-teal-900',
    },
    {
      name: 'Dr. Ananya Verma',
      role: 'Senior Geriatric Specialist (New Delhi)',
      parentInfo: 'Clinical Advisory Board',
      quote:
        'What sets CareDesk apart from silicon valley health apps is deterministic validation. They refused to let an LLM approximate blood pressure or sugar figures. For elderly cardiac patients, deterministic corridors prevent catastrophic misinterpretations.',
      avatar: 'AV',
      accent: 'border-indigo-200 dark:border-indigo-900',
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-3 py-1 rounded-full border border-rose-200/50">
            Real Family Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Built for Real Indian Families
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Hear from adult children and elderly parents who replaced anxious daily phone calls with quiet confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`rounded-3xl liquid-glass-card p-7 space-y-5 flex flex-col justify-between border ${t.accent}`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                    {t.parentInfo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
