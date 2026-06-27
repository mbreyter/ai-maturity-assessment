# Enterprise AI Maturity Assessment

A comprehensive 30-question self-assessment that tells enterprise executives which of 6 stages of AI maturity their organization is at. Get a personalized Claude-powered report and shareable results card.

**By Mariya Breyter, Ph.D.**

## Features

- **30-Question Assessment** — Questions grouped by AI maturity stage (Awareness → Strategic Advantage)
- **Personalized Claude Report** — AI-generated analysis of your organization's AI readiness
- **Visual Stage Breakdown** — Bar charts showing your performance across all 6 maturity stages
- **Shareable Results** — Copy your results to share with colleagues and leadership
- **Beautiful, Responsive Design** — Built with Next.js, works perfectly on desktop and mobile

## The 6 AI Maturity Stages

1. **Awareness** — Beginning to recognize AI potential and discuss strategy
2. **Experimentation** — Running pilots and building internal AI knowledge
3. **Scaling** — Moving AI from pilots to production at scale
4. **Optimization** — Optimizing existing AI deployments across organization
5. **Embedded AI** — AI embedded in customer-facing products
6. **Strategic Advantage** — AI is a core competitive differentiator

## Setup

### Prerequisites

- Node.js 18+ and npm
- An Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com/account/keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-maturity-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [https://ai-maturity-assessment-ruby.vercel.app](https://ai-maturity-assessment-ruby.vercel.app) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.jsx           # Root layout with footer
│   ├── page.jsx             # Landing page with stage ladder
│   ├── assessment/
│   │   └── page.jsx         # 30-question assessment
│   ├── results/
│   │   └── page.jsx         # Results page with Claude report
│   └── api/
│       └── generate-report/
│           └── route.js     # API route for Claude report generation
├── data/
│   └── questions.js         # All 30 assessment questions
├── lib/
│   ├── scoring.js           # Scoring and maturity calculation logic
│   └── systemPrompt.js      # Claude system prompt
├── .env.local.example       # Environment variables template
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## How It Works

1. **Landing Page** — Users learn about AI maturity stages and click to start
2. **Assessment** — Users answer 30 questions (5 per stage) with radio options scored 0-2
3. **Processing** — Answers are sent to the Claude API for personalized analysis
4. **Results** — Users see their stage, score breakdown chart, and personalized report
5. **Sharing** — Results can be copied to clipboard for sharing with colleagues

## Technology Stack

- **Frontend** — Next.js 14, React, CSS-in-JS
- **Charts** — Recharts for stage breakdown visualization
- **AI** — Anthropic Claude API (claude-sonnet-4-6 model)
- **Styling** — Custom CSS with Georgia serif headings and warm cream background

## Design Highlights

- **Color Scheme** — Each stage has a distinct color (Stage 1: Red → Stage 6: Deep Blue)
- **Typography** — Georgia serif for headings, system sans-serif for body text
- **Background** — Warm cream (#F7F4EE) for comfortable viewing
- **Mobile Responsive** — Fully optimized for desktop and mobile devices
- **Accessibility** — Semantic HTML and clear radio button controls

## License
The Enterprise AI Maturity Assessment Framework, scoring model, dimensions, 
maturity levels, and all framework content are © Mariya Breyter and licensed 
under Creative Commons Attribution 4.0 International (CC BY 4.0).

You may use, share, and adapt this framework for any purpose, including 
commercially, provided you credit Mariya Breyter and link to the original:
https://github.com/mbreyter/ai-maturity-assessment

The underlying code is separately licensed under MIT.
[![CC BY 4.0](https://licensebuttons.net/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)

## Author

**Mariya Breyter, Ph.D.**
- LinkedIn: [linkedin.com/in/mariyabreyter](https://linkedin.com/in/mariyabreyter)
