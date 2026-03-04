# The CrackedMilk AI Video Growth Engine: Exact Workflow & Tool Stack (2026)

This document outlines the **exact, step-by-step technical workflow** for creating high-converting, faceless short-form video content at scale. This pipeline completely replaces traditional video production.

## The Core Tool Stack Options (Flexible Architecture)
We remain strictly tool-agnostic. We constantly evaluate and switch to whatever model provides the highest fidelity and most competitive edge. The current top-tier stack includes:
*   **Ideation & Scripting:** ChatGPT (Custom GPT), Claude, or Gemini
*   **Visual Generation:** Midjourney v6+, Flux, or Stable Diffusion (for static base assets)
*   **Animation & B-Roll:** Runway Gen-3 Alpha, Luma Dream Machine, Sora, or Kling
*   **Voice Synthesis:** ElevenLabs, Murf, or PlayHT (with custom voice cloning)
*   **Assembly & Editing:** CapCut Pro, Premiere, or automated timeline APIs
*   **Automation:** n8n, Zapier, or Make (for tying the pipeline together)

---

## The Step-by-Step Workflow

### Step 1: Data-Driven Ideation & Script Generation
We do not guess what works. We use data to drive the narrative.
1.  **Analyze Trends:** Scrape TikTok/Reels for breakout formats (e.g., "3 luxury marketing secrets," "POV: you hired the wrong agency").
2.  **Prompt the Custom GPT:** Use our proprietary "CrackedMilk Scriptwriter" GPT. Give it the trending topic and strict parameters (hook in first 2 seconds, edgy tone, CTA at the end).
3.  **Output:** A 3-column script: [Timecode] | [Visual Prompt] | [Voiceover Text].

### Step 2: Visual Asset Creation (The High-End Baseline)
We use the current best-in-class image generator (e.g., Midjourney v6+, Flux, or whatever dominates the benchmarks) to establish the incredibly high-end visual baseline (the "CrackedMilk Aesthetic").
1.  **Take the Visual Prompts:** Copy the visual prompts from the LLM output.
2.  **Format for Vertical:** Append the correct aspect ratio commands (e.g., `--ar 9:16`) to every prompt.
3.  **Maintain Consistency:** Use style reference features (like `--sref` in Midjourney) pointing to our agency's core moodboard to ensure every generated image has our signature dark, luxury aesthetic regardless of the subject matter.
4.  **Output:** A folder of 5-10 ultra-high-resolution, perfectly branded static images representing the key frames of the video.

### Step 3: Animation (The Motion Pipeline)
Static images don't hold attention on TikTok. We must animate the baseline using top-tier motion models (e.g., Runway Gen-3, Luma, Kling, or Sora).
1.  **Image-to-Video:** Import the static images into the selected motion generator.
2.  **Prompt the Motion:** Provide text prompts to guide the animation (e.g., "Slow, cinematic push-in. Liquid mercury dripping from the text"). Use motion brush tools to isolate exactly which parts of the image should move.
3.  **Output:** 5-10 cinematic, photorealistic 4-second video clips.

### Step 4: Voice Synthesis (The Sonic Brand)
The voice must sound human, authoritative, and perfectly paced using advanced cloning (e.g., ElevenLabs, Murf).
1.  **Text-to-Speech:** Drop the voiceover script from Step 1 into the synthesis engine.
2.  **Voice Selection:** Use our cloned "Brand Voice" (a curated, slightly raspy, authoritative tone).
3.  **Pacing Adjustments:** Adjust the slider for stability and clarity. Ensure there are no dead spaces between sentences.
4.  **Output:** A broadcast-quality `.wav` audio file.

### Step 5: Assembly and Dynamic Editing (The Assembly Layer)
This is where the assets are merged into an algorithm-ready dopamine hit (using CapCut Pro, Premiere, or API-driven timeline assemblers).
1.  **Timeline Assembly:** Drop the generated video clips and the synthesized audio into the editor.
2.  **Sync Editing:** Cut the video clips exactly to the beat/pacing of the voiceover.
3.  **Dynamic Captions (Crucial):** Use Auto-Captions. Style them with the agency font (e.g., bold, thick stroke, yellow highlight on the spoken word). Position them in the center-middle of the screen (the "safe zone").
4.  **Sound Design:** Add subtle sound effects (whooshes, risers, bass drops) on every visual transition to retain attention. Add trending background music at 15% volume.
5.  **Output:** The final, polished `.mp4` file.

---

## Step 6: The "Infinite" A/B Testing Loop (Automation)
To achieve the volume of 50-100 videos a week, we use logic platforms (n8n, Make, or custom scripts):
1.  **Isolate Variables:** We take the final video from Step 5 and use our workflow automation to swap out *only one element at a time*.
2.  **The Hook Swap:** We run the first 3 seconds through the voice engine again with 5 different text hooks, keeping the rest of the video identical.
3.  **The Visual Swap:** We change the opening visual using a new image/motion prompt, keeping the audio identical.
4.  **Publish & Measure:** We push all 20 variations. The algorithm tells us within 24 hours which variant has the highest watch time. We kill the losers and double down on the winner.
