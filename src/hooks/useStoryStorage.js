import React from 'react';

const STORAGE_KEY = 'the-chair-data';

// Convert file to base64 for persistence
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const createDefaultStory = () => ({
  name: 'The Chair - Dolores Story',
  characters: [
    {
      id: 'dolores',
      name: 'Dolores Klugel',
      years: '1927-2026',
      role: 'Rocketdyne 1965-1968, Apollo Program',
      description: 'Woman who worked at Rocketdyne during the Apollo program. Passed away July 2026 at age 99.',
      images: []
    }
  ],
  items: [
    {
      id: 'chair',
      name: 'Turquoise Chair',
      description: 'Mid-century modern, star-shaped base, asset tag #N1055671',
      images: []
    },
    {
      id: 'asset-tag',
      name: 'Asset Tag #N1055671',
      description: 'PROPERTY OF ROCKWELL CORPORATION NORTH AMERICAN',
      images: []
    }
  ],
  acts: [
    {
      actNum: 1,
      actTitle: 'The Discovery',
      summary: 'A turquoise chair is found at a yard sale. The buyer notices an asset tag from Rockwell Corporation — the beginning of an unexpected journey.',
      mood: 'Nostalgic, curious, warm golden hour light',
      frames: [
        { 
          frameNum: 1, 
          title: 'FB Listing Overlay', 
          status: 'SHARED', 
          promptStatus: 'ready',
          prompt: 'Screenshot of Facebook Marketplace listing titled "FREE - Multi-Item Yard Sale". White umbrellas visible in background, white birdcage on stand left, blue dress hanging on house, scattered items on tables (books, decorative items, golf bag), gravel driveway, residential home with garage. Warm afternoon lighting. Listing text visible: "Had yard sell all weekend and everything must go now - FREE!"',
          style: 'Screenshot style, iPhone/phone screen mockup, clean UI frame, warm afternoon light',
          notes: 'Recreated FB Marketplace listing image. Combines listing text overlay with yard sale scene. Chair subtly visible behind birdcage. This IS the listing the buyer saw.',
          duration: 3,
          transition: 'CUT',
          imageUrl: '/act1/01-fb-listing-recreated.png'
        },
        { 
          frameNum: 2, 
          title: 'Text Messages', 
          status: 'PENDING', 
          promptStatus: 'reference',
          prompt: 'Text message conversation from Facebook Marketplace between buyer (Natalie) and seller. Buyer asks about "turquoise retro looking plastic chair", seller confirms "yes that is for grabs" and mentions "its free". Message bubbles on white background, timestamps visible (JUL 20, 2:46 PM), casual warm tone. iOS/messaging UI style.',
          style: 'Screenshot, iOS messaging UI, white background, message bubbles, timestamps visible',
          notes: 'Combine act1/02-text-convo-1.jpg and act1/02-text-convo-2.jpg. Shows the conversation that confirmed the chair was free.',
          duration: 3,
          transition: 'CUT',
          imageUrl: '/act1/02-text-convo-1.jpg'
        },
        { 
          frameNum: 3, 
          title: 'Yard Sale Pile Wide', 
          status: 'PENDING', 
          promptStatus: 'reference',
          prompt: 'Wide shot of yard sale pile on gravel driveway. Bird cage prominent left-center on stand, white umbrella providing shade, cardboard boxes scattered, various household items. Turquoise chair partially hidden behind bird cage and items, barely visible but there (blue outline hints at position). Late afternoon golden hour light. Residential home background with garage door.',
          style: 'Cinematic wide shot, golden hour warm tones, slight lens flare, nostalgic home video feel',
          notes: 'Reference act1/03-yard-sale-wide.jpg - blue outline shows chair position. This is the pile the chair was hidden in.',
          duration: 4,
          transition: 'CUT',
          imageUrl: '/act1/03-yard-sale-wide.jpg'
        },
        { 
          frameNum: 4, 
          frameSubNum: 1,
          title: 'Chair Reveal - Still 1: Pile', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Cluttered yard sale pile with bird cage, white umbrellas, cardboard boxes, various items. Turquoise chair barely visible peeking from behind the bird cage, almost hidden. Golden hour late afternoon light casting long shadows. Wide establishing shot.',
          style: 'Cinematic wide shot, golden hour, warm orange-gold light, lens flare, nostalgic',
          notes: 'Frame 4a of 3-still reveal sequence. Chair is barely visible, hidden by debris. Use /act1/04-chair-reveal-slide.png for the slide animation.',
          duration: 2,
          transition: 'HOLD'
        },
        { 
          frameNum: 4, 
          frameSubNum: 2,
          title: 'Chair Reveal - Still 2: Emerge', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Items (bird cage, boxes, umbrellas) dissolving/fading away like mist. Turquoise chair emerging from behind debris, silhouette becoming clearer. Slight blue ethereal glow beginning around chair edges. Golden hour light. Medium shot.',
          style: 'Cinematic, magic realism, ethereal glow, dissolving effects, medium shot',
          notes: 'Frame 4b of 3-still reveal sequence. Transition moment - debris fading, chair emerging.',
          duration: 2,
          transition: 'DISSOLVE'
        },
        { 
          frameNum: 4, 
          frameSubNum: 3,
          title: 'Chair Reveal - Still 3: Revealed', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Turquoise chair fully revealed, star-shaped base visible, slight supernatural glow around edges. Cleared space around chair - debris gone. Golden hour light, dust motes floating in air. Hero shot with chair centered. Sense of discovery/wonder.',
          style: 'Cinematic hero shot, dramatic reveal, golden hour, warm glow, dust particles in light',
          notes: 'Frame 4c of 3-still reveal sequence. Chair fully revealed, moment of discovery.',
          duration: 3,
          transition: 'HOLD'
        },
        { 
          frameNum: 5, 
          title: 'Turquoise Chair Close-up', 
          status: 'PENDING', 
          promptStatus: 'reference',
          prompt: 'Close-up of turquoise mid-century modern chair. Molded plastic shell with curved armrests forming high back. Star-shaped base with 4 splayed legs. Four circular mounting screw holes visible on seat. Slight wear, scuffs, and dirt marks on plastic. Ground is dirt with dry leaves. Natural daylight, slight shadow from chair. Cluttered background with cardboard boxes, other items in blur.',
          style: 'Product photography, natural daylight, close-up to mid-shot, slight depth of field, authentic worn look',
          notes: 'Reference act1/05-chair-front.jpg and act1/05-chair-profile.jpg. Real photos of the actual chair.',
          duration: 3,
          transition: 'CUT',
          imageUrl: '/act1/05-chair-front.jpg'
        },
        { 
          frameNum: 6, 
          title: 'Asset Tag #N1055671', 
          status: 'PENDING', 
          promptStatus: 'reference',
          prompt: 'Extreme close-up of white asset tag on turquoise chair leg. Black text reads: "PROPERTY OF ROCKWELL CORPORATION NORTH AMERICAN N1055671". Worn label with creases, slightly faded. Industrial/military marking style. Turquoise chair leg visible in frame. Slight blur on background (dirt/grass).',
          style: 'Macro shot, shallow depth of field, industrial aesthetic, slight blur background',
          notes: 'Reference act1/06-asset-tag.jpg - actual tag number N1055671. The portal to the past.',
          duration: 3,
          transition: 'CUT',
          imageUrl: '/act1/06-asset-tag.jpg'
        }
      ]
    },
    {
      actNum: 2,
      actTitle: 'The History',
      summary: 'The asset tag becomes a portal to 1965. We meet Dolores Klugel at Rocketdyne, working on the Apollo program.',
      mood: 'Nostalgic 1960s industrial, warm amber light, wonder',
      frames: [
        { 
          frameNum: 7, 
          title: 'Portal Transition', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Twilight Zone style zoom into the asset tag. Camera slowly moves closer to the tag, blue light begins emanating from it. Reality distorts around edges. Portal opening effect - swirling blue/white light. Surreal, otherworldly transition. The chair leg and tag become a window to another time.',
          style: 'Surreal, sci-fi transition, blue ethereal glow, slow zoom, Twilight Zone aesthetic',
          notes: 'Transition frame - zooms from tag to portal. Gateway to the past.',
          duration: 2,
          transition: 'ZOOM'
        },
        { 
          frameNum: 8, 
          title: 'Rocketdyne Printing Room', 
          status: 'SHARED', 
          promptStatus: 'ready',
          prompt: '1960s Rocketdyne Division printing room. Vintage industrial setting with printing presses, paper stacks, industrial lights hanging from ceiling. Printing press on left, papers and blueprints everywhere. Dolores at a desk in background, back to camera, working. Warm amber industrial lighting. Wood and metal furniture. 1960s office aesthetic.',
          style: '1960s period accuracy, warm amber industrial lighting, vintage industrial, detailed period-specific details',
          notes: 'AI generated. SETTING ESTABLISHED - Dolores workplace.',
          duration: 5,
          transition: 'DISSOLVE',
          imageUrl: '/01-rocketdyne-printing-room.png'
        },
        { 
          frameNum: 9, 
          title: 'Dolores at Desk', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: '1960s Rocketdyne office. Woman (Dolores Klugel) at a printing press desk, focused on printing Apollo program documents. Side profile or 3/4 view. Wearing 1960s work attire (blouse, cardigan). Industrial lighting, warm tones. Stacks of paper, printing press visible. Focused, workmanlike expression.',
          style: '1960s period accuracy, warm amber light, documentary feel, intimate work shot',
          notes: 'First real glimpse of Dolores. Working at Rocketdyne 1965-1968.',
          duration: 4,
          transition: 'CUT'
        },
        { 
          frameNum: 10, 
          title: 'Blueprints Stacking', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Close-up of blueprints and Apollo program documents stacking on table or printing press. Technical drawings of Saturn V rocket, command module, lunar lander. Paper stacks, some rolling off table. Industrial setting in background. Warm amber light from overhead lights.',
          style: 'Technical, close-up, warm amber, period-accurate blueprints',
          notes: 'The work Dolores does - Apollo program documents.',
          duration: 3,
          transition: 'CUT'
        },
        { 
          frameNum: 11, 
          title: 'Dolores Smiles', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: '1960s Rocketdyne, woman (Dolores Klugel) looking at camera and smiling. Warm lighting, slightly backlit. Printers and papers in background. Wearing 1960s attire. Slight smile, warm friendly expression. 1960s portrait aesthetic. Slight film grain for period authenticity.',
          style: '1960s portrait, warm backlight, slight film grain, nostalgic, friendly',
          notes: 'Dolores - the person behind the chair. Brief moment of connection.',
          duration: 3,
          transition: 'CUT'
        },
        { 
          frameNum: 12, 
          title: 'Walls Glow Blue', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Rocketdyne printing room beginning to glow. Walls emitting ethereal blue-white light. Industrial interior transformed - blue luminescence spreading across surfaces. Printing presses, papers, desks now bathed in soft blue light. Sense of otherworldly transformation. Wonder/magical realism.',
          style: 'Magical realism, ethereal blue glow, transformation, wide shot',
          notes: 'The room begins to transform - magic entering the mundane.',
          duration: 2,
          transition: 'DISSOLVE'
        },
        { 
          frameNum: 13, 
          title: 'Ceiling Reveals Stars', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Ceiling of Rocketdyne room opening like a hatch or dissolving to reveal night sky. Stars visible, then Saturn V rocket constellation forming in the sky above. Cosmic view through the "ceiling." The room is now both industrial interior AND cosmic space. Breathtaking wide shot.',
          style: 'Surreal, cosmic, wide shot, stars, Saturn V constellation, breathtaking',
          notes: 'The revelation - space is everywhere. Transformative moment.',
          duration: 4,
          transition: 'MATCH CUT'
        }
      ]
    },
    {
      actNum: 3,
      actTitle: 'The Journey',
      summary: 'The chair transforms into a rocket and blasts off into space. It becomes the Saturn V constellation.',
      mood: 'Epic, cosmic, wonder, magical realism',
      frames: [
        { 
          frameNum: 14, 
          title: 'Chair Transformation', 
          status: 'SHARED', 
          promptStatus: 'ready',
          prompt: 'The turquoise chair transforming in mid-air. Glowing blue energy surrounding it. Chair beginning to elongate into rocket shape. Levitation effect. Magic realism - chair IS becoming a rocket. Blue energy trails. Against night sky background.',
          style: 'Magical realism, blue energy glow, transformation, levitation, cinematic',
          notes: 'AI generated. Chair becomes rocket. Magic moment.',
          duration: 3,
          transition: 'DISSOLVE',
          imageUrl: '/03-chair-transformation.png'
        },
        { 
          frameNum: 15, 
          title: 'Blast Off', 
          status: 'SHARED', 
          promptStatus: 'ready',
          prompt: 'Chair rocket blasting off upward. Dramatic fire/exhaust trail. Upward trajectory toward space. Dramatic angle from below. Fire and smoke, motion blur. Going to space. Epic, dramatic, cinematic.',
          style: 'Epic, dramatic, fire trail, upward motion, cinematic, high action',
          notes: 'AI generated. The journey begins.',
          duration: 4,
          transition: 'MATCH CUT',
          imageUrl: '/04-blast-off-1.png'
        },
        { 
          frameNum: 16, 
          title: 'Blueprint Trails', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Chair rocket in space. Blueprint paper trails flowing behind like comet tails. Apollo program documents, Saturn V schematics streaming behind the rocket. Blueprints in space - technical documents becoming stars. Surreal, magical, cosmic.',
          style: 'Surreal, cosmic, blueprints as stars/streams, magical',
          notes: 'The work that sent her to space becomes the trail.',
          duration: 3,
          transition: 'CUT'
        },
        { 
          frameNum: 17, 
          title: 'Saturn V Constellation', 
          status: 'SHARED', 
          promptStatus: 'ready',
          prompt: 'The Saturn V rocket HAS BECOME the constellation. In night sky, the stars align into Saturn V rocket shape. The rocket IS the stars. Cosmic view, Milky Way visible. The chair/dolores journey complete - now eternal in the stars.',
          style: 'Cosmic, breathtaking, constellation, Milky Way, eternal',
          notes: 'AI generated. The chair/dolores become eternal.',
          duration: 5,
          transition: 'HOLD',
          imageUrl: '/06-saturn-v-constellation.png'
        }
      ]
    },
    {
      actNum: 4,
      actTitle: 'The Return',
      summary: 'From space we transition to Dolores\'s bedroom. She passes peacefully. The chair returns to the yard sale for a new owner to begin their own journey.',
      mood: 'Peaceful, nostalgic, bittersweet, cyclical',
      frames: [
        { 
          frameNum: 18, 
          title: 'Space to Bedroom', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Transition from cosmic space view (Saturn V constellation) to bedroom. Stars morphing into ceiling stars (glow-in-dark). Camera pans down from night sky through ceiling to bedroom below. Stars become ceiling stars. Cosmic to domestic. Smooth transition.',
          style: 'Surreal transition, morphing, stars to ceiling stars, seamless',
          notes: 'The connection between space and home.',
          duration: 3,
          transition: 'MATCH CUT'
        },
        { 
          frameNum: 19, 
          title: 'Dolores\'s Bedroom', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Elderly woman\'s bedroom, cozy retro style. Star lamps on nightstand, moon poster on wall, astronaut memorabilia (model rockets, space posters). Warm, nostalgic, lived-in. 1970s-80s aesthetic. Inviting, peaceful. The room of someone who loved space.',
          style: 'Cozy retro, nostalgic, warm lighting, lived-in, 1970s-80s aesthetic',
          notes: 'Dolores\'s room - full of space memorabilia.',
          duration: 4,
          transition: 'CUT'
        },
        { 
          frameNum: 20, 
          title: 'Looking at Ceiling Stars', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Elderly woman (Dolores, elderly now) lying in bed, looking up at glowing stars on ceiling. Glow-in-dark stars. Peaceful expression, slight smile. Warm bedside lamp light. Intimate, tender, nostalgic. The stars she helped send to space now surround her.',
          style: 'Tender, intimate, warm lighting, nostalgic, close-up',
          notes: 'Dolores at peace, surrounded by her stars.',
          duration: 4,
          transition: 'CUT'
        },
        { 
          frameNum: 21, 
          title: 'Dolores Closes Eyes', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Elderly woman (Dolores) smiling, eyes closing peacefully. Bedside light. Tender moment - falling asleep or passing peacefully. Slight smile remains. Warm tones. Respectful, gentle, bittersweet.',
          style: 'Tender, bittersweet, warm tones, gentle, respectful',
          notes: 'The end of Dolores\' journey. Peaceful.',
          duration: 3,
          transition: 'CUT'
        },
        { 
          frameNum: 22, 
          title: 'Pull Back to Yard Sale', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Camera pulling back from Dolores\'s bedroom (or from ceiling stars) to reveal... it was all a memory. Pull back through ceiling, through space, through time - to reveal we\'re back at the same yard sale location. Same driveway, same setup. But chair is gone from the pile. Free furniture remains.',
          style: 'Surreal pull-back, time jump, nostalgic reveal, wide shot',
          notes: 'The reveal - it was always a memory. We\'re back at the yard sale.',
          duration: 4,
          transition: 'PULL BACK'
        },
        { 
          frameNum: 23, 
          title: 'Chair Alone', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Turquoise chair is GONE from the yard sale pile. Empty spot where chair was. Free stuff pile still there (cardboard boxes, umbrellas), but chair is missing. Sunny day, golden hour light. The empty space tells the story.',
          style: 'Cinematic, subtle, golden hour, wide shot, storytelling through absence',
          notes: 'The chair is gone - taken on its journey.',
          duration: 3,
          transition: 'CUT'
        },
        { 
          frameNum: 24, 
          title: 'New Person Arrives', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'New person (different from original buyer) walking toward yard sale pile. Walking from left to right, approaching. Curious expression, looking at the pile. Sunny day. The cycle begins again.',
          style: 'Cinematic, approaching shot, sunny day, hopeful',
          notes: 'A new person arrives. The cycle continues.',
          duration: 3,
          transition: 'CUT'
        },
        { 
          frameNum: 25, 
          title: 'Taking the Chair', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'New person carrying the turquoise chair away from yard sale. Over their shoulder or carrying in arms. Walking away from camera. Sunny day, golden hour. Starting their own journey with the chair. Hopeful, circular ending.',
          style: 'Cinematic, golden hour, hopeful, circular ending, walking away shot',
          notes: 'A new journey begins. The chair finds a new owner.',
          duration: 4,
          transition: 'CUT'
        },
        { 
          frameNum: 26, 
          title: 'End Card: Asset #', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Minimal black screen. White text centered: "Asset #N1055671". Simple, stark, memorable. Last 4 digits visible.',
          style: 'Minimal, stark, black background, white text, simple',
          notes: 'Text only. The asset tag number.',
          duration: 2,
          transition: 'FADE IN'
        },
        { 
          frameNum: 27, 
          title: 'End Card: Dolores Info', 
          status: 'PENDING', 
          promptStatus: 'draft',
          prompt: 'Minimal black screen. White text centered: "Dolores Klugel 1927-2026". Below: "Rocketdyne 1965-1968 • Apollo Program". Simple, tribute style.',
          style: 'Minimal, tribute style, black background, white text',
          notes: 'Text only. Honoring Dolores.',
          duration: 3,
          transition: 'CUT'
        },
        { 
          frameNum: 28, 
          title: 'Chair Under Stars', 
          status: 'SHARED', 
          promptStatus: 'ready',
          prompt: 'The turquoise chair sitting alone under a night sky filled with stars. Milky Way visible. The same chair, now in a peaceful backyard setting. The Saturn V constellation visible among the stars. Chair has slight glow. Peaceful, eternal, full circle. Channel signature shot.',
          style: 'Cinematic, night sky, Milky Way, peaceful, signature shot, full circle',
          notes: 'AI generated. Channel signature. Full circle - the chair under the stars it helped create.',
          duration: 5,
          transition: 'FADE OUT',
          imageUrl: '/02-chair-grass-stars.png'
        }
      ]
    }
  ]
});

export function useStoryStorage() {
  const [story, setStory] = React.useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : createDefaultStory();
  });

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(story));
  }, [story]);

  const updateFrame = (actNum, frameNum, updates, frameSubNum = null) => {
    setStory(prev => ({
      ...prev,
      acts: prev.acts.map(act => 
        act.actNum === actNum
          ? { ...act, frames: act.frames.map(frame =>
              frame.frameNum === frameNum && (frameSubNum === null || frame.frameSubNum === frameSubNum)
                ? { ...frame, ...updates } : frame
            )}
          : act
      )
    }));
  };

  const deleteFrame = (actNum, frameNum, frameSubNum = null) => {
    setStory(prev => ({
      ...prev,
      acts: prev.acts.map(act => 
        act.actNum === actNum
          ? { ...act, frames: act.frames.filter(frame =>
              !(frame.frameNum === frameNum && (frameSubNum === null || frame.frameSubNum === frameSubNum))
            )}
          : act
      )
    }));
  };

  const deleteAct = (actNum) => {
    setStory(prev => ({
      ...prev,
      acts: prev.acts.filter(act => act.actNum !== actNum)
    }));
  };

  const insertFrame = (actNum, frameNum) => {
    setStory(prev => ({
      ...prev,
      acts: prev.acts.map(act =>
        act.actNum === actNum
          ? {
              ...act,
              frames: [
                ...act.frames.slice(0, frameNum - 1),
                {
                  frameNum,
                  title: `Scene ${frameNum}`,
                  status: 'PENDING',
                  promptStatus: 'draft',
                  prompt: '',
                  style: '',
                  notes: '',
                  filename: '',
                  duration: 3,
                  transition: 'CUT',
                  sharedLinks: []
                },
                ...act.frames.slice(frameNum - 1).map(f => ({ ...f, frameNum: f.frameNum + 1 }))
              ]
            }
          : act
      )
    }));
  };

  const insertAct = (actNum) => {
    setStory(prev => ({
      ...prev,
      acts: [
        ...prev.acts.slice(0, actNum - 1),
        {
          actNum,
          actTitle: `Act ${actNum}`,
          summary: '',
          mood: '',
          frames: Array.from({ length: 3 }, (_, i) => ({
            frameNum: i + 1,
            title: `Scene ${i + 1}`,
            status: 'PENDING',
            promptStatus: 'draft',
            prompt: '',
            style: '',
            notes: '',
            filename: '',
            duration: 3,
            transition: 'CUT',
            sharedLinks: []
          }))
        },
        ...prev.acts.slice(actNum - 1).map(a => ({ ...a, actNum: a.actNum + 1 }))
      ]
    }));
  };

  const getProgress = () => {
    let total = 0, completed = 0;
    story.acts.forEach(act => {
      act.frames.forEach(frame => {
        total++;
        if (frame.status === 'SHARED') completed++;
      });
    });
    return { total, completed, percent: total ? Math.round((completed / total) * 100) : 0 };
  };

  return { story, setStory, updateFrame, deleteFrame, deleteAct, insertFrame, insertAct, getProgress };
}

export function exportJSON(story) {
  return JSON.stringify(story, null, 2);
}

export function exportEDL(story) {
  let edl = 'TITLE: UNTITLED\nFCM: NON-DROP FRAME\n\n';
  let timecode = 0;
  story.acts.forEach(act => {
    act.frames.forEach(frame => {
      const tc = new Date(timecode * 1000).toISOString().substr(11, 8);
      edl += `${String(frame.frameNum).padStart(3, '0')}  001      V     C        ${tc}  00:00:00:00\n`;
      timecode += frame.duration;
    });
  });
  return edl;
}
