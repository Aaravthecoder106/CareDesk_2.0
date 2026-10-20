# CareDesk 💙

**Remote Elder-Care & Health Tracking, Simplified.**

Keeping track of aging parents' health shouldn't require a medical degree or endless phone calls. CareDesk is a zero-friction, modern dashboard built to help families track daily vitals, analyze complex medical reports, and ensure their loved ones are safe—no matter how far apart they live.

## ✨ Core Features

*   **🧠 AI Report Analyzer (Bilingual):** Upload medical lab reports and get instant, easy-to-understand summaries in **English & Hinglish**. Powered by Gemini, it breaks down complex medical jargon and suggests specific questions to ask the doctor.
*   **📊 Daily Vitals Check-In:** A strict, deterministic parser for daily readings (Blood Pressure, Blood Sugar, Weight). Rejects ambiguous inputs to ensure 100% medical data integrity.
*   **🚥 Traffic-Light Dashboard:** Instantly know your loved one's health status at a glance with simple Green, Yellow, or Red indicators based on recent vitals.
*   **🔒 Secure by Design:** Built with Role-Level Security (RLS), explicit patient consent architecture, and rigorous audit logging. 

## 🛠️ Tech Stack

CareDesk V2 is built for speed, scale, and clean architecture:
*   **Frontend:** [Next.js](https://nextjs.org/) (App Router), React, Tailwind CSS
*   **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security)
*   **AI Pipeline:** Google Gemini API
*   **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

Follow these steps to run CareDesk locally:

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/caredesk.git
cd caredesk
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 🗺️ Roadmap
- [x] Foundation & User Authentication
- [x] Family Care Dashboard (UI)
- [x] Bilingual Medical Report Analysis
- [ ] Daily Vitals Check-in & Trend Charts
- [ ] Automated SMS/WhatsApp Reminders

## 👨‍💻 About the Builder

Built with relentless focus and metacognition by **Aarav**. 
Follow the journey of building this product from scratch in public: 
🐦 **X (Twitter):** [@builder_aarav](https://x.com/builder_aarav)
# instructions for ai coding agnet :-
use this for github repo :- "https://github.com/Aaravthecoder106/CareDesk_2.0"
use this for supabse :- "https://supabase.com/dashboard/project/nfeapcllinavvdnrchyf"
use this for vercel :- "https://vercel.com/ay473671-8942s-projects/caredesk2.0/5pRZT8xfmgWByHxUYoM2kH1AQDaa"

---
*Note: CareDesk is a health-tracking tool, not a replacement for professional medical advice.*