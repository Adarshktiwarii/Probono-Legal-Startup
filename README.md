# IPBLI

IPBLI is a modern, scalable SaaS platform built for Section 8 legal aid organizations in India. It connects indigent citizens facing criminal charges with dedicated pro bono advocates.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4, Shadcn UI
- **Backend**: Next.js Server Actions
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **AI**: OpenAI (gpt-4o-mini) for case summarization and urgency scoring

## Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/Adarshktiwarii/Probono-Legal-Startup.git
   cd "Probono Legal Startup"
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   Copy `.env.example` to `.env.local` and fill in your keys:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Database Migration**
   \`\`\`bash
   \`\`\`

5. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## Security & Compliance
- **RLS**: Row Level Security is enforced at the database level ensuring Advocates only see assigned cases and Citizens only see their own applications.
- **AI Constraints**: OpenAI is strictly instructed NOT to provide legal advice, acting purely as an internal administrative assistant for triage.

## Production Deployment
The application is optimized for deployment on **Vercel**.
Ensure all environment variables are added to the Vercel project settings before deploying.
