const fs = require('fs');
const path = require('path');
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.match(/\.(js|jsx|css|html|json|ts|tsx)$/)) {
        results.push(file);
      }
    }
  });
  return results;
};
const files = [...walk('d:/AifutureIndia/realstate/frontend/src'), 'd:/AifutureIndia/realstate/frontend/index.html'];
let changedFiles = 0;
files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    // Special handling for the styled span
    content = content.replace(/GreenValley\s*<span[^>]*>\s*Estates\s*<\/span>/gi, 'Prop<span style={{ color: \'#D4AF37\' }}>tix</span>');
    content = content.replace(/GreenValley\s*Estates/gi, 'Proptix');
    content = content.replace(/GreenValley/gi, 'Proptix');
    content = content.replace(/Green Valley/gi, 'Proptix');
    content = content.replace(/info@greenvalleyestates\.com/gi, 'info@proptix.com');
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated ' + file);
      changedFiles++;
    }
  } catch (e) { }
});
console.log('Total files updated: ' + changedFiles);
