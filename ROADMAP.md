# The Chair - Storyboard

**Project:** Dolores Klugel / The Chair AI YouTube Video
**Setup:** 2026-09-11
**Live URL:** https://the-chair-storyboard.vercel.app
**GitHub:** https://github.com/CuriousCornucopious/the-chair-storyboard
**Purpose:** Pre-loaded storyboard for The Chair video project

---

## Project Rules (2026-09-15)

- **Generation:** Higgsfield ONLY for all new image/video generations
- **References:** Pull from Google Photos, local storage, file cabinet, previously generated Higgsfield images
- **My Role:** Prewrite/rewrite/finalize prompts, confirm settings, provide usage guidance
- **Storyboard Usage:** Bare minimum — just for visual placement/preview
- **Desired Tool:** Cloud-based, cross-device, real-time updates (current app is clunky)

---

## Current Assets Received (2026-09-15)

### User Photos Uploaded to Storyboard
Located in media/inbound (pending copy to public/assets/):

| Filename | Description | Frame |
|----------|-------------|-------|
| `ChairListingDesc-Anon.jpg` | FB listing text screenshot | 1 |
| `ChairText_Anon.jpg` | Text conversation part 1 | 2 |
| `ChairText2_Anon.jpg` | Text conversation part 2 | 2 |
| `ChairListing_Blue.jpg` | Yard sale with blue outline | 3 |
| `ChairListing.jpg` | Yard sale photo | 3 |
| `ChairListing_2.jpg` | Yard sale photo | 3 |
| `Chair_Front.jpg` | Turquoise chair front | 5 |
| `Chair_RightProfile.jpg` | Turquoise chair side | 5 |
| `TAG_OG.jpg` | Asset tag original | 6 |
| `TAG_EDIT.jpg` | Asset tag edited | 6 |
| `TAG_EDIT2.jpg` | Asset tag edited v2 | 6 |
| `AI_Chair.jpg` | AI chair sketch (reference only) | N/A |

---

# EXECUTION PLAN - DETAILED

## ⚠️ CRITICAL: Complete This Before Writing Any Code

### Phase 1: Backup Current State (DO FIRST)

1. **Verify Git Status**
   ```bash
   cd /home/openclaw/.openclaw/workspace/the-chair-storyboard
   git status
   ```
   - Confirm working tree is clean OR note any uncommitted changes

2. **Create Backup Branch**
   ```bash
   git checkout -b backup-pre-ui-overhaul-$(date +%Y%m%d)
   ```
   - Creates timestamped backup of current state
   - Push to GitHub: `git push -u origin backup-pre-ui-overhaul-YYYYMMDD`

3. **Verify Backup Exists on GitHub**
   - Go to https://github.com/CuriousCornucopious/the-chair-storyboard/branches
   - Confirm backup branch exists

4. **Report: "Backup complete"** — Wait for user approval before proceeding

---

### Phase 2: Copy Images to public/assets/

**Goal:** All user photos stored in repo for permanent reference

1. **Create new folder for Act 1 images**
   ```bash
   mkdir -p /home/openclaw/.openclaw/workspace/the-chair-storyboard/public/assets/act1
   ```

2. **Copy images from media/inbound** (files identified above):
   - `ChairListingDesc-Anon.jpg` → `act1/01-fb-listing-text.jpg`
   - `ChairText_Anon.jpg` → `act1/02-text-convo-1.jpg`
   - `ChairText2_Anon.jpg` → `act1/02-text-convo-2.jpg`
   - `ChairListing_Blue.jpg` → `act1/03-yard-sale-wide.jpg`
   - `Chair_Front.jpg` → `act1/05-chair-front.jpg`
   - `Chair_RightProfile.jpg` → `act1/05-chair-profile.jpg`
   - `TAG_OG.jpg` → `act1/06-asset-tag.jpg`

3. **Use `cp` or `rsync`** — Preserve originals in media/inbound

4. **Verify copy** — `ls -la public/assets/act1/`

---

### Phase 3: Update useStoryStorage.js

**Goal:** Rewrite prompts with full detail + style/tone for each Act 1 frame

1. **Open file:**
   ```bash
   /home/openclaw/.openclaw/workspace/the-chair-storyboard/src/hooks/useStoryStorage.js
   ```

2. **Update Frame 1 - FB Listing Overlay:**
   ```
   title: "FB Listing Overlay"
   prompt: "Screenshot of Facebook Marketplace listing titled 'FREE - Multi-Item Yard Sale', white umbrellas visible in background, white birdcage on stand left, blue dress hanging, scattered items on tables, gravel driveway, residential house background. Warm afternoon lighting."
   notes: "Use act1/01-fb-listing-text.jpg as overlay reference"
   status: "PENDING" (or "DONE" if using real screenshot)
   imageUrl: "assets/act1/01-fb-listing-text.jpg"
   ```

3. **Update Frame 2 - Text Messages:**
   ```
   title: "Text Messages"
   prompt: "Text message conversation from Facebook Marketplace. 'Natalie' asking about 'turquoise retro looking plastic chair', seller replies 'its free'. Message bubbles on white background, timestamps visible (JUL 20), casual warm tone. Screenshot style."
   notes: "Combine act1/02-text-convo-1.jpg and act1/02-text-convo-2.jpg"
   style: "Screenshot, clean white background, iOS messaging UI"
   ```

4. **Update Frame 3 - Yard Sale Pile Wide:**
   ```
   title: "Yard Sale Pile Wide"
   prompt: "Wide shot of yard sale pile on gravel driveway. Bird cage prominent left-center, white umbrellas, cardboard boxes, cluttered items. Turquoise chair partially hidden behind items, barely visible. Golden hour late afternoon light. Residential home background."
   notes: "Reference act1/03-yard-sale-wide.jpg - blue outline shows chair position"
   style: "Cinematic, golden hour, wide angle, warm tones"
   ```

5. **Update Frame 4 - Chair Reveal (3-still animation):**
   ```
   title: "Chair Reveal - Still 1: Pile"
   prompt: "Cluttered yard sale pile with bird cage, umbrellas, boxes. Turquoise chair hidden barely visible behind bird cage. Golden hour light."
   style: "Cinematic, golden hour, wide shot"
   
   title: "Chair Reveal - Still 2: Emerge"
   prompt: "Items (bird cage, boxes, umbrellas) dissolving/fading away. Chair emerging from behind debris. Turquoise glow beginning. Golden hour."
   style: "Cinematic, magic realism, ethereal glow"
   
   title: "Chair Reveal - Still 3: Revealed"
   prompt: "Turquoise chair fully revealed, star base visible, slight glow. Golden hour light, dust motes in air. Chair alone in frame, cleared space around it."
   style: "Cinematic, dramatic reveal, golden hour, hero shot"
   ```

6. **Update Frame 5 - Turquoise Chair Close-up:**
   ```
   title: "Turquoise Chair Close-up"
   prompt: "Close-up of turquoise mid-century modern chair. Molded plastic shell with armrests, star-shaped base with 4 legs. 4 mounting screws visible on seat. Slight wear and scuffs. Ground is dirt with dry leaves. Natural daylight, slight shadow. Cluttered background (cardboard boxes, other items)."
   notes: "Reference act1/05-chair-front.jpg and act1/05-chair-profile.jpg"
   style: "Product photography, natural light, close-up"
   imageUrl: "assets/act1/05-chair-front.jpg"
   ```

7. **Update Frame 6 - Asset Tag:**
   ```
   title: "Asset Tag #N1055671"
   prompt: "Close-up of asset tag on chair leg. White label with black text: 'PROPERTY OF ROCKWELL CORPORATION NORTH AMERICAN N1055671'. Worn label, industrial markings. Turquoise chair leg visible in frame. Slight blur on background."
   notes: "Reference act1/06-asset-tag.jpg - actual tag number N1055671"
   style: "Macro shot, shallow depth of field, industrial"
   imageUrl: "assets/act1/06-asset-tag.jpg"
   ```

8. **Remove Developer Notes** from data structure entirely

---

### Phase 4: UI Overhaul - New Features

**After prompts are done, implement:**

1. **Remove Developer Notes UI**
   - Delete `DeveloperNotes` component
   - Remove from App.jsx

2. **Add Act Summaries**
   - Add `summary` field to each Act object
   - Click Act header → expand/collapse summary
   - Summary includes: brief description, mood, key frames

3. **Add Character/Item Boxes** (Collapsed by default)
   - New data section: `characters: [{name, description, images}]`, `items: [{name, description, images}]`
   - + Button to add new character/item
   - Modal to upload photos + description
   - Collapsed by default to reduce vertical space

> **FUTURE IMPROVEMENT (Deferred):**
> - Current: Character/Item sections take up too much vertical space (only 1 frame visible per Act)
> - **Preferred Solution (Option B):** Move to filters sidebar alongside Status/Platform filters
>   - Characters and Items auto-populate as created
>   - Filter by clicking on them
>   - Keeps UI clean, scales better
> - Alternative (Option A): Collapsible sections - less ideal, still takes header space

4. **Optional: Timeline View** (if time permits)
   - Horizontal strip at top showing all 28 frames
   - Click to jump

5. **Optional: Story Progress Bar** (if time permits)
   - Visual bar: Act 1 ██░░░░ Act 2 ░░░░░░

---

### Phase 5: Test & Deploy

1. **Test locally** (if possible)
2. **Git add + commit**
   ```bash
   git add -A
   git commit -m "Act 1 prompts complete + UI overhaul: removed dev notes, added act summaries, character boxes"
   ```
3. **Push to main**
   ```bash
   git push origin main
   ```
4. **Vercel auto-deploy** — Verify deployment succeeds

5. **Report completion** — Confirm to user

---

# IMPORTANT NOTES FOR FUTURE SELF

- **DO NOT skip the backup phase** — Branch before making changes
- **Images must be in public/assets/** — Not media/inbound (those are temp)
- **Higgsfield workflow:** User takes prompts → generates in Higgsfield → uploads back → I link to frame
- **Confirmation protocol lifted** for this project — User approved "go" at start
- **Any changes to useStoryStorage.js** — Test that JSON export/import still works
- **User wants cross-device sync** — Current app doesn't support this. Future: build SaaS version or use cloud DB

---

# FRAME STATUS TRACKING

| Act | Frames | Done | Pending |
|-----|--------|------|---------|
| 1 | 1-6 | ??? | ??? |
| 2 | 7-13 | 8 | 6 |
| 3 | 14-17 | 14,15,17 | 16 |
| 4 | 18-28 | 28 | 11 |

---

*Created 2026-09-11 from storyboard-app template*
*Updated 2026-09-15 - Project rules, 28 frames, Act 1 breakdown, EXECUTION PLAN added*
