import type { Phase, Task } from '../types'

export const PHASES: Phase[] = [
  { number: 1, name: 'Painkiller Audit', description: 'Is this worth marketing?' },
  { number: 2, name: 'Strategy', description: '7 questions that prevent 90% of mistakes' },
  { number: 3, name: 'Landing Page', description: 'Fix before driving any traffic' },
  { number: 4, name: 'First Customers', description: 'Get 10 manually before running ads' },
  { number: 5, name: 'Channel Mix', description: 'Build sustainable traffic' },
  { number: 6, name: 'SEO', description: 'Start after first customers' },
  { number: 7, name: 'Email Marketing', description: 'Nurture every lead captured' },
  { number: 8, name: 'Paid Ads + Pipeline', description: 'Scale only after funnel is proven' },
]

// Seed tasks per phase — transcribed from project_onboarding_process.md
// These are inserted when a new project is created.
export type SeedTask = Omit<Task, 'id' | 'project_id'>

export const SEED_TASKS: SeedTask[] = [
  // ── Phase 1: Painkiller Audit ──────────────────────────────────────
  { phase_number: 1, sort_order: 0, completed: false, text: 'Answer: What does this product do in one sentence?' },
  { phase_number: 1, sort_order: 1, completed: false, text: 'Answer: What happens to the customer if they DON\'T solve this problem?' },
  { phase_number: 1, sort_order: 2, completed: false, text: 'Answer: How often do customers use this? (daily/weekly/monthly)' },
  { phase_number: 1, sort_order: 3, completed: false, text: 'Answer: Is this B2B, B2C, or mixed?' },
  { phase_number: 1, sort_order: 4, completed: false, text: 'Make the call: Painkiller ✅ or Vitamin ⚠️ — document the verdict in strategy_brief' },
  { phase_number: 1, sort_order: 5, completed: false, text: 'If Vitamin: find the Painkiller angle or reposition before proceeding' },

  // ── Phase 2: Strategy ──────────────────────────────────────────────
  { phase_number: 2, sort_order: 0, completed: false, text: 'Q1: What is the ONE specific problem this product solves?' },
  { phase_number: 2, sort_order: 1, completed: false, text: 'Q2: Which audience segment craves this most? (be specific — not "small businesses")' },
  { phase_number: 2, sort_order: 2, completed: false, text: 'Q3: What is their current go-to solution (the status quo)?' },
  { phase_number: 2, sort_order: 3, completed: false, text: 'Q4: What is good AND bad about that status quo?' },
  { phase_number: 2, sort_order: 4, completed: false, text: 'Q5: How is this product genuinely better? (real angle, not just "easier" or "cheaper")' },
  { phase_number: 2, sort_order: 5, completed: false, text: 'Q6: What is the pricing, and why is it a no-brainer for the customer but profitable?' },
  { phase_number: 2, sort_order: 6, completed: false, text: 'Q7: How will you get the first 10 customers — specifically?' },
  { phase_number: 2, sort_order: 7, completed: false, text: 'Validate: reject any generic answers and push for specificity' },
  { phase_number: 2, sort_order: 8, completed: false, text: 'Save all answers to strategy_brief in Supabase' },

  // ── Phase 3: Landing Page ──────────────────────────────────────────
  { phase_number: 3, sort_order: 0, completed: false, text: 'Audit: review existing landing page (or note that one needs to be built)' },
  { phase_number: 3, sort_order: 1, completed: false, text: 'Rewrite copy: replace all "we/our" with "you/your"' },
  { phase_number: 3, sort_order: 2, completed: false, text: 'Fix every heading to follow: Emotional Promise + Rational Explanation' },
  { phase_number: 3, sort_order: 3, completed: false, text: 'Add social proof (testimonials, founder story) above the fold' },
  { phase_number: 3, sort_order: 4, completed: false, text: 'Record a Loom-style demo video with founder commentary' },
  { phase_number: 3, sort_order: 5, completed: false, text: 'Write a founder message explaining WHY this product was built' },
  { phase_number: 3, sort_order: 6, completed: false, text: 'Remove all superlatives ("best", "fastest", "most popular")' },
  { phase_number: 3, sort_order: 7, completed: false, text: 'Cap all feature lists to 3–5 points max' },
  { phase_number: 3, sort_order: 8, completed: false, text: 'Remove "subscribe for updates" CTAs; make the one CTA simple and desirable' },
  { phase_number: 3, sort_order: 9, completed: false, text: 'Roast Protocol: find 5–10 people who\'ve never seen the page, watch them use it on screen share' },
  { phase_number: 3, sort_order: 10, completed: false, text: 'Fix the top 3 issues identified in the Roast session' },

  // ── Phase 4: First Customers ───────────────────────────────────────
  { phase_number: 4, sort_order: 0, completed: false, text: 'Identify where the audience hangs out online (specific platforms, groups, communities)' },
  { phase_number: 4, sort_order: 1, completed: false, text: 'Choose 1–2 first-customer tactics: cold DMs / community posts / email list pre-launch / Product Hunt' },
  { phase_number: 4, sort_order: 2, completed: false, text: 'Execute manual, personalized outreach — NO automation, no spam' },
  { phase_number: 4, sort_order: 3, completed: false, text: 'Offer free access in exchange for feedback and testimonial' },
  { phase_number: 4, sort_order: 4, completed: false, text: 'Collect testimonials from the happiest first users' },
  { phase_number: 4, sort_order: 5, completed: false, text: 'Add testimonials to landing page' },
  { phase_number: 4, sort_order: 6, completed: false, text: 'Milestone: 10 real customers acquired. DO NOT run ads before this.' },

  // ── Phase 5: Channel Mix ───────────────────────────────────────────
  { phase_number: 5, sort_order: 0, completed: false, text: 'Define the primary channel for the first 6 months' },
  { phase_number: 5, sort_order: 1, completed: false, text: 'Set up audience building on the right social platform (Twitter→founders, LinkedIn→B2B, TikTok→B2C)' },
  { phase_number: 5, sort_order: 2, completed: false, text: 'Start cold outreach cadence (B2B): 20 manual DMs/emails per week' },
  { phase_number: 5, sort_order: 3, completed: false, text: 'Plan a free SEO tool that matches this product\'s search intent' },
  { phase_number: 5, sort_order: 4, completed: false, text: 'Set up weekly newsletter (even at 0 subscribers — start the habit)' },
  { phase_number: 5, sort_order: 5, completed: false, text: 'Document which channels to AVOID for this project and why' },

  // ── Phase 6: SEO ───────────────────────────────────────────────────
  { phase_number: 6, sort_order: 0, completed: false, text: 'Do keyword research: find what the audience already searches for' },
  { phase_number: 6, sort_order: 1, completed: false, text: 'Build or plan the first free SEO tool (easiest to rank, easiest to promote)' },
  { phase_number: 6, sort_order: 2, completed: false, text: 'Plan long-tail blog posts close to purchase intent (not top-of-funnel "how to" posts)' },
  { phase_number: 6, sort_order: 3, completed: false, text: 'Submit to product directories to get initial Domain Authority bump' },
  { phase_number: 6, sort_order: 4, completed: false, text: 'Plan one programmatic SEO page cluster (data-driven, NOT AI-generated spam)' },

  // ── Phase 7: Email Marketing ───────────────────────────────────────
  { phase_number: 7, sort_order: 0, completed: false, text: 'Set up email capture: free tool or content in exchange for email (no hard gatekeeping)' },
  { phase_number: 7, sort_order: 1, completed: false, text: 'Write onboarding sequence for new signups (freebie → paid product CTA)' },
  { phase_number: 7, sort_order: 2, completed: false, text: 'Write activation sequence for product users (onboarding → story → testimonials → discount)' },
  { phase_number: 7, sort_order: 3, completed: false, text: 'Write post-purchase sequence (thank you → feature ideas → upsell)' },
  { phase_number: 7, sort_order: 4, completed: false, text: 'Send first weekly newsletter to all emails' },

  // ── Phase 8: Paid Ads + AI Video Pipeline ─────────────────────────
  { phase_number: 8, sort_order: 0, completed: false, text: 'Confirm funnel is proven: landing page Roast done, 10+ customers, conversion rate known' },
  { phase_number: 8, sort_order: 1, completed: false, text: 'Calculate max customer acquisition cost (CAC) before spending on ads' },
  { phase_number: 8, sort_order: 2, completed: false, text: 'Start Facebook Ads (retarget website visitors first before cold audiences)' },
  { phase_number: 8, sort_order: 3, completed: false, text: 'AI Pipeline: define moodboard and Midjourney --sref style reference' },
  { phase_number: 8, sort_order: 4, completed: false, text: 'AI Pipeline: clone Brand Voice in ElevenLabs (authoritative, slightly raspy tone)' },
  { phase_number: 8, sort_order: 5, completed: false, text: 'AI Pipeline: configure CrackedMilk Scriptwriter GPT for this project\'s niche and CTA' },
  { phase_number: 8, sort_order: 6, completed: false, text: 'AI Pipeline: select tool stack (image gen / motion gen / voice / assembly / automation)' },
  { phase_number: 8, sort_order: 7, completed: false, text: 'AI Pipeline: test end-to-end with one dummy video before going live' },
  { phase_number: 8, sort_order: 8, completed: false, text: 'AI Pipeline: publish first batch of 5–10 videos' },
  { phase_number: 8, sort_order: 9, completed: false, text: 'AI Pipeline: start A/B testing loop — 5 hook variants + 3 visual variants of the top performer' },
  { phase_number: 8, sort_order: 10, completed: false, text: 'AI Pipeline: target 50–100 videos/week by end of Month 1' },
]
