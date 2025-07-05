def get_prompt():
    prompt = """
Render a realistic image of this character:
Blobby Alien Character Spec Name: Glorptak (or nickname: "Glorp")
Visual Appearance Body Shape: Amorphous and gelatinous. Overall silhouette resembles a teardrop or melting marshmallow, shifting slightly over time. Can squish and elongate when emotional or startled.
Material Texture: Semi-translucent, bio-luminescent goo with a jelly-like wobble. Surface occasionally ripples when communicating or moving quickly.
Color Palette:
- Base: Iridescent lavender or seafoam green
- Accents: Subsurface glowing veins of neon pink, electric blue, or golden yellow
- Mood-based color shifts (anger = dark red, joy = bright aqua, fear = pale gray)
Facial Features:
- Eyes: 3–5 asymmetrical floating orbs inside the blob that rotate or blink independently
- Mouth: Optional—appears as a rippling crescent on the surface when speaking or emoting
- No visible nose or ears; uses vibration-sensitive receptors embedded in goo
- Limbs: None by default, but can extrude pseudopods (tentacle-like limbs) when needed for interaction or locomotion. Can manifest temporary feet or hands.
Movement & Behavior Locomotion:
- Slides, bounces, and rolls.
- Can stick to walls and ceilings via suction. When scared, may flatten and ooze away quickly.
Mannerisms:
- Constant wiggling or wobbling even at rest
- Leaves harmless glowing slime trails
- Tends to absorb nearby small objects temporarily out of curiosity
"""
    return prompt


def get_prompt_edit():
    prompt = """
Combine the images of the cat and the hat to show the cat wearing the hat while being perched in a tree, still in pixel-art style.
"""
    return prompt

def get_aiweekend_prompt(user_input = ""):
    prompt = """
{user_input}

Follow the following brand identity and style:
{{
  "brandIdentity": {{
    "name": "AI Weekend (AIWKND)",
    "tagline": "Impulsando el futuro, hoy.",
    "tone": "Futuristic, Playful, Bold, Professional",
    "colorPalette": {{
      "primary": "#FF2D87",  // Hot pink
      "secondary": "#6C2BFF", // Purple
      "accent1": "#00C2FF",   // Neon cyan
      "accent2": "#0A0A0A",   // Near black
      "background": "#1E1E1E", // Charcoal dark
      "textLight": "#FFFFFF",
      "textMuted": "#B0B0B0"
    }},
    "typography": {{
      "headingFont": "Montserrat, sans-serif",
      "bodyFont": "Roboto, sans-serif",
      "headingWeight": "800",
      "bodyWeight": "400",
      "textTransform": "uppercase for headings",
      "textColor": "#FFFFFF"
    }},
    "mascot": {{
      "description": "3D stylized mascot with glasses, headphones or megaphone, energetic pose",
      "style": "Cartoonish 3D, colorful gradients, expressive gestures",
      "uses": ["Hero sections", "Call to actions", "Support bubble"]
    }},
    "graphics": {{
      "style": "Gradient overlays, neomorphic elements, glowing effects",
      "iconography": "Minimal, neon-outline icons or glyphs",
      "shapes": ["Blobs", "Spheres", "Geometric stars", "Rounded rectangles"]
    }},
    "layout": {{
      "structure": "Hero first, followed by key event details",
      "alignment": "Center-aligned headers, grid-based sections",
      "callToAction": {{
        "style": "Rounded buttons",
        "color": "#FF2D87",
        "textColor": "#FFFFFF",
        "hoverEffect": "Glow or slight enlargement"
      }}
    }},
    "components": {{
      "navbar": {{
        "background": "black",
        "textColor": "white",
        "fontSize": "14px",
        "items": ["Speakers", "Sponsors", "Agenda", "Próximos Eventos", "Blog"]
      }},
      "footer": {{
        "style": "Minimal dark footer with social links",
        "backgroundColor": "#0A0A0A",
        "textColor": "#B0B0B0"
      }},
      "chatWidget": {{
        "style": "Mascot-themed assistant in corner",
        "position": "bottom-right",
        "messageStyle": "Speech bubble"
      }}
    }}
  }},
  "eventStructure": {{
    "highlights": ["Conferencias", "Workshops", "Hackaton"],
    "duration": "3 days",
    "locations": ["Buenos Aires", "Rosario", "Mendoza", "Salta"],
    "companies": ["Google", "AWS", "X", "Microsoft", "Vercel"],
    "targetAudience": ["Developers", "Students", "Startups", "Tech Enthusiasts"],
    "sponsorsCall": {{
      "style": "Highlighted section with CTA",
      "button": {{
        "text": "QUIERO SPONSOREAR",
        "color": "#FF2D87",
        "rounded": true
      }}
    }}
  }},
  "animationStyle": {{
    "transitions": "Smooth fade-ins, slides",
    "interactiveElements": ["Hover glowing buttons", "Mascot animation", "Scrolling reveals"]
  }},
  "brandingPrinciples": {{
    "consistency": "Maintain visual style across locations and dates",
    "engagement": "Use of mascot and vibrant CTA to keep user attention",
    "energy": "Colorful, exciting, fast-paced aesthetic for innovation"
  }}
}}
"""
    prompt = prompt.format(user_input=user_input)

    return prompt