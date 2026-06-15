const fs = require('fs');
const path = require('path');

const mappings = {
  'text-[#1A1A2E]': 'text-foreground',
  'text-[#6B7280]': 'text-muted-foreground',
  'bg-[#F9F7F4]': 'bg-muted',
  'border-[#e8e3db]': 'border-border',
  'bg-white': 'bg-background', // Will change most bg-white to bg-background, which will flip to dark in dark mode
  'bg-[#1E3A5F]/8': 'bg-primary/10', // some subtle backgrounds
  'bg-[#C69C3F]/15': 'bg-secondary/15',
};

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const [key, value] of Object.entries(mappings)) {
        if (content.includes(key)) {
          content = content.split(key).join(value);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}
replaceInDir('./src/app');
replaceInDir('./src/components');
