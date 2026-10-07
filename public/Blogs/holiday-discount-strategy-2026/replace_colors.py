import os

svg1 = r"d:\14_Mehul Labs\Labs-landing\public\Blogs\holiday-discount-strategy-2026\holiday-discount-strategy-2026-hero.svg"
svg2 = r"d:\14_Mehul Labs\Labs-landing\public\Blogs\holiday-discount-strategy-2026\holiday-discount-strategy-2026-diagram.svg"

replacements = {
    # Eyebrow text
    'letter-spacing="3" fill="#496546"': 'letter-spacing="3" fill="#6b675c"',
    
    # Generic mappings
    '#eeefe7': '#efede7',
    '#e4e8da': '#ebe8dd',
    'stroke="#496546"': 'stroke="#ffcb16"',
    'fill="#496546"': 'fill="#18181b"',
    '#1a1d18': '#18181b',
    '#3b4138': '#605d56',
    '#5d6558': '#605d56',
    '#d8ddd1': '#dddad1',
    '#c9cfc0': '#dddad1',
    '#f0c9a8': '#ffcb16',
    '#7a4a1f': '#18181b',
    '#b9c0b0': '#dddad1',
    'fill="#a9c6a3"': 'fill="#ffcb16"',
}

for fp in [svg1, svg2]:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replacement complete.")
