#!/usr/bin/env node
/**
 * Simple Figma Sync Tool
 * 
 * Uses only Node.js built-in modules - no external dependencies required.
 * 
 * Usage:
 *   node scripts/figma-sync.js check   - Check for updates
 *   node scripts/figma-sync.js diff    - Generate diff report
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

// Repository URL - Use your fork for easier access
const FIGMA_REPO_URL = process.env.FIGMA_REPO_URL || 'https://github.com/Kharmon94/Preferreddeals.git';
// Original repository (if you need to compare):
// const FIGMA_REPO_URL = 'https://github.com/BlackCollar27/Preferreddeals.git';
// SSH URL (if you have SSH keys set up):
// const FIGMA_REPO_URL = 'git@github.com:Kharmon94/Preferreddeals.git';
const ROOT_DIR = path.resolve(__dirname, '..');
const FIGMA_REPO_PATH = path.join(ROOT_DIR, 'temp/figma-repo');
const FRONTEND_SRC_PATH = path.join(ROOT_DIR, 'src');
const STATE_FILE = path.join(ROOT_DIR, '.figma-sync-state.json');
const REPORTS_DIR = path.join(ROOT_DIR, 'reports');

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Load state from JSON file
function loadState() {
  try {
    const data = fs.readFileSync(STATE_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return {
      lastCheckedCommit: null,
      lastCheckedDate: null,
      ignoredFiles: ['node_modules', '.git', 'temp', 'reports', 'build', 'dist'],
    };
  }
}

// Save state to JSON file
function saveState(state) {
  const current = loadState();
  const updated = { ...current, ...state };
  fs.writeFileSync(STATE_FILE, JSON.stringify(updated, null, 2), 'utf8');
}

// Clone or fetch Figma repository
function ensureFigmaRepo() {
  ensureDir(path.dirname(FIGMA_REPO_PATH));
  
  if (fs.existsSync(FIGMA_REPO_PATH)) {
    console.log('📥 Fetching latest from Figma repository...');
    try {
      execSync('git fetch', { cwd: FIGMA_REPO_PATH, stdio: 'inherit' });
      execSync('git pull', { cwd: FIGMA_REPO_PATH, stdio: 'inherit' });
    } catch (error) {
      const errorMsg = error.message || '';
      
      if (errorMsg.includes('403') || errorMsg.includes('not granted') || errorMsg.includes('access denied')) {
        console.error('\n❌ Access denied (403): Cannot fetch updates');
        console.error('\n💡 Your Personal Access Token may need "repo" scope,');
        console.error('   or you don\'t have access to this repository.');
        console.error('   Check token permissions at: https://github.com/settings/tokens\n');
      } else {
        console.error('\n❌ Error fetching updates:', error.message);
        console.error('\n💡 Authentication help:');
        console.error('   GitHub requires a Personal Access Token (PAT) instead of password.');
        console.error('   Create one at: https://github.com/settings/tokens');
        console.error('   Use the PAT as your password when prompted.\n');
      }
      process.exit(1);
    }
  } else {
    console.log('📥 Cloning Figma repository...');
    console.log(`Repository: ${FIGMA_REPO_URL}\n`);
    
    // Check if repository might be private
    const isYourFork = FIGMA_REPO_URL.includes('Kharmon94');
    if (isYourFork) {
      console.log('💡 Using your fork: Kharmon94/Preferreddeals');
      console.log('   If this is a private repository, you need:');
      console.log('   1. A Personal Access Token with "repo" scope, OR');
      console.log('   2. Make the repository public (Settings → Danger Zone → Make public)\n');
    } else {
      console.log('⚠️  GitHub Authentication Required');
      console.log('GitHub no longer supports password authentication.');
      console.log('You need a Personal Access Token (PAT):\n');
      console.log('1. Create a token: https://github.com/settings/tokens');
      console.log('2. Click "Generate new token (classic)"');
      console.log('3. Select scope: "repo" (full control of private repositories)');
      console.log('4. Copy the token and use it as your password when prompted\n');
    }
    
    try {
      // Try HTTPS first
      execSync(`git clone ${FIGMA_REPO_URL} "${FIGMA_REPO_PATH}"`, { 
        stdio: 'inherit',
        env: { ...process.env, GIT_TERMINAL_PROMPT: '1' }
      });
    } catch (error) {
      const errorMsg = error.message || '';
      
      if (errorMsg.includes('Authentication failed') || errorMsg.includes('Invalid username')) {
        console.error('\n❌ Authentication failed!');
        console.error('\n💡 Solutions:');
        console.error('\nOption 1: Use Personal Access Token (Recommended)');
        console.error('   1. Go to: https://github.com/settings/tokens');
        console.error('   2. Click "Generate new token (classic)"');
        console.error('   3. Name it (e.g., "Figma Sync")');
        console.error('   4. Select scope: "repo" (full control of private repositories)');
        console.error('   5. Click "Generate token" and copy it');
        console.error('   6. When prompted for password, paste the token\n');
        console.error('\nOption 2: Use SSH (If you have SSH keys set up)');
        console.error('   Change the repo URL to SSH in the script:');
        console.error('   git@github.com:BlackCollar27/Preferreddeals.git\n');
      } else if (errorMsg.includes('403') || errorMsg.includes('not granted') || errorMsg.includes('access denied')) {
        console.error('\n❌ Access denied (403): Write access to repository not granted');
        console.error('\n💡 This usually means:');
        console.error('   1. Your Personal Access Token is missing required permissions');
        console.error('   2. You don\'t have access to this private repository');
        console.error('   3. The repository owner needs to grant you access\n');
        console.error('\n🔧 Solutions:');
        console.error('\nOption 1: Check Token Permissions (Most Common)');
        console.error('   - Make sure your token has "repo" scope selected');
        console.error('   - For private repos, you need "repo" scope');
        console.error('   - Go to: https://github.com/settings/tokens');
        console.error('   - Delete old token and create a new one with "repo" scope\n');
        console.error('\nOption 2: Make Your Fork Public (Easiest - Recommended!)');
        console.error('   - Go to: https://github.com/Kharmon94/Preferreddeals/settings');
        console.error('   - Scroll down to "Danger Zone"');
        console.error('   - Click "Change visibility" → "Make public"');
        console.error('   - Public repos don\'t require authentication');
        console.error('   - Then run this command again (no auth needed!)\n');
        console.error('\nOption 3: Make Repository Public (If you own it)');
        console.error('   - Go to your fork settings on GitHub');
        console.error('   - Scroll down to "Danger Zone"');
        console.error('   - Click "Change visibility" → "Make public"');
        console.error('   - Public repos don\'t require authentication\n');
        console.error('\nOption 4: Use SSH Authentication');
        console.error('   - If you have SSH keys set up with GitHub');
        console.error('   - Edit scripts/figma-sync.js line 18');
        console.error('   - Change to: git@github.com:Kharmon94/Preferreddeals.git\n');
      } else {
        console.error('\n❌ Error cloning repository:', error.message);
        console.error('\n💡 Try:');
        console.error('   - Check internet connection');
        console.error('   - Verify repository URL is correct');
        console.error('   - Check if repository exists and is accessible\n');
      }
      process.exit(1);
    }
  }
}

// Get current commit hash
function getCurrentCommit(repoPath) {
  try {
    const hash = execSync('git rev-parse HEAD', { cwd: repoPath, encoding: 'utf8' }).trim();
    return hash;
  } catch {
    return null;
  }
}

// Get file list from directory
function getFiles(dir, baseDir = dir, ignored = []) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);
      
      // Skip ignored files
      if (entry.name.startsWith('.') || ignored.includes(entry.name)) {
        continue;
      }
      
      if (entry.isDirectory()) {
        const subFiles = getFiles(fullPath, baseDir, ignored);
        files.push(...subFiles);
      } else {
        // Only include relevant file types
        if (['.tsx', '.ts', '.jsx', '.js', '.css', '.json', '.png', '.jpg', '.jpeg', '.svg'].some(
          ext => entry.name.endsWith(ext)
        )) {
          files.push(relativePath);
        }
      }
    }
  } catch (error) {
    // Directory might not exist or be inaccessible
  }
  
  return files;
}

// Check if file has backend integration (simple grep)
function hasBackendIntegration(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes('apiService.') || 
           content.includes('../services/api') ||
           content.includes('../types');
  } catch {
    return false;
  }
}

// Run git diff between two directories
function gitDiff(oldDir, newDir, file) {
  try {
    const oldPath = path.join(oldDir, file);
    const newPath = path.join(newDir, file);
    
    // Check if files exist
    const oldExists = fs.existsSync(oldPath);
    const newExists = fs.existsSync(newPath);
    
    if (!oldExists && newExists) {
      return { status: 'added', diff: null };
    }
    
    if (oldExists && !newExists) {
      return { status: 'deleted', diff: null };
    }
    
    if (!oldExists && !newExists) {
      return null;
    }
    
    // Compare file contents
    const oldContent = fs.readFileSync(oldPath, 'utf8');
    const newContent = fs.readFileSync(newPath, 'utf8');
    
    if (oldContent === newContent) {
      return null; // No changes
    }
    
    // Simple line-by-line diff
    const oldLines = oldContent.split('\n');
    const newLines = newContent.split('\n');
    
    return {
      status: 'modified',
      oldContent,
      newContent,
      oldLines,
      newLines,
    };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
}

// Command: Check for updates
function checkUpdates() {
  console.log('\n🔍 Checking for Figma Design Updates...\n');
  
  const state = loadState();
  if (state.lastCheckedDate) {
    console.log(`Last checked: ${state.lastCheckedDate}`);
  }
  if (state.lastCheckedCommit) {
    console.log(`Last commit: ${state.lastCheckedCommit.substring(0, 8)}\n`);
  }
  
  // Ensure Figma repo is up to date
  ensureFigmaRepo();
  
  // Get current commit
  const currentCommit = getCurrentCommit(FIGMA_REPO_PATH);
  if (!currentCommit) {
    console.error('❌ Could not get current commit');
    process.exit(1);
  }
  
  console.log(`✓ Repository up to date`);
  console.log(`Current commit: ${currentCommit.substring(0, 8)}\n`);
  
  // Check if there are new commits
  if (state.lastCheckedCommit && state.lastCheckedCommit === currentCommit) {
    console.log('⚠️  No new updates since last check.\n');
    return;
  }
  
  // Compare file structures
  console.log('📊 Comparing file structures...\n');
  
  const figmaSrcPath = path.join(FIGMA_REPO_PATH, 'src');
  const figmaFiles = getFiles(figmaSrcPath, figmaSrcPath, state.ignoredFiles);
  const currentFiles = getFiles(FRONTEND_SRC_PATH, FRONTEND_SRC_PATH, state.ignoredFiles);
  
  const figmaSet = new Set(figmaFiles);
  const currentSet = new Set(currentFiles);
  
  const added = figmaFiles.filter(f => !currentSet.has(f));
  const deleted = currentFiles.filter(f => !figmaSet.has(f));
  const common = figmaFiles.filter(f => currentSet.has(f));
  
  console.log('📁 Files Summary:');
  console.log(`  Added: ${added.length}`);
  console.log(`  Modified: ${common.length} (will be checked in diff)`);
  console.log(`  Deleted: ${deleted.length}\n`);
  
  if (added.length > 0) {
    console.log('➕ Added Files:');
    added.slice(0, 10).forEach(file => {
      console.log(`  ${file}`);
    });
    if (added.length > 10) {
      console.log(`  ... and ${added.length - 10} more\n`);
    } else {
      console.log();
    }
  }
  
  // Save state
  saveState({
    lastCheckedCommit: currentCommit,
    lastCheckedDate: new Date().toISOString(),
  });
  
  console.log('✓ State saved to .figma-sync-state.json');
  console.log('\n💡 Run "npm run figma:diff" to see detailed changes\n');
}

// Command: Generate diff report
function generateDiff() {
  console.log('\n📊 Generating Diff Report...\n');
  
  ensureDir(REPORTS_DIR);
  
  // Check if Figma repo exists
  if (!fs.existsSync(FIGMA_REPO_PATH)) {
    console.error('❌ Figma repository not found. Run "npm run figma:check" first.');
    process.exit(1);
  }
  
  const figmaSrcPath = path.join(FIGMA_REPO_PATH, 'src');
  const figmaFiles = getFiles(figmaSrcPath, figmaSrcPath);
  const currentFiles = getFiles(FRONTEND_SRC_PATH, FRONTEND_SRC_PATH);
  
  const allFiles = new Set([...figmaFiles, ...currentFiles]);
  console.log(`Comparing ${allFiles.size} files...\n`);
  
  const changes = [];
  let processed = 0;
  
  for (const file of allFiles) {
    processed++;
    if (processed % 10 === 0) {
      process.stdout.write(`\rProcessed ${processed}/${allFiles.size} files...`);
    }
    
    const diff = gitDiff(FRONTEND_SRC_PATH, figmaSrcPath, file);
    if (diff) {
      const currentPath = path.join(FRONTEND_SRC_PATH, file);
      const hasBackend = fs.existsSync(currentPath) && hasBackendIntegration(currentPath);
      
      changes.push({
        file,
        ...diff,
        hasBackendIntegration: hasBackend,
      });
    }
  }
  
  console.log(`\n✓ Compared ${allFiles.size} files\n`);
  
  // Generate markdown report
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = path.join(REPORTS_DIR, `figma-diff-${Date.now()}.md`);
  
  const summary = {
    added: changes.filter(c => c.status === 'added').length,
    modified: changes.filter(c => c.status === 'modified').length,
    deleted: changes.filter(c => c.status === 'deleted').length,
    withBackendIntegration: changes.filter(c => c.hasBackendIntegration).length,
  };
  
  let report = `# Figma Sync Diff Report\n\n`;
  report += `**Generated:** ${new Date().toLocaleString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- **Added:** ${summary.added}\n`;
  report += `- **Modified:** ${summary.modified}\n`;
  report += `- **Deleted:** ${summary.deleted}\n`;
  report += `- **With Backend Integration:** ${summary.withBackendIntegration}\n\n`;
  report += `---\n\n`;
  
  if (changes.length === 0) {
    report += `No changes detected.\n`;
  } else {
    // Group by status
    const byStatus = {
      added: changes.filter(c => c.status === 'added'),
      modified: changes.filter(c => c.status === 'modified'),
      deleted: changes.filter(c => c.status === 'deleted'),
    };
    
    if (byStatus.added.length > 0) {
      report += `## ➕ Added Files\n\n`;
      byStatus.added.forEach(change => {
        report += `### \`${change.file}\`\n`;
        if (change.hasBackendIntegration) {
          report += `⚠️ **Backend Integration Detected**\n\n`;
        }
        report += `\n`;
      });
    }
    
    if (byStatus.modified.length > 0) {
      report += `## 📝 Modified Files\n\n`;
      byStatus.modified.forEach(change => {
        report += `### \`${change.file}\`\n`;
        if (change.hasBackendIntegration) {
          report += `⚠️ **Backend Integration Detected** - Review carefully!\n\n`;
        }
        
        if (change.oldContent && change.newContent) {
          // Show a simple diff preview (first 50 lines)
          const oldPreview = change.oldContent.split('\n').slice(0, 50).join('\n');
          const newPreview = change.newContent.split('\n').slice(0, 50).join('\n');
          
          report += `<details>\n`;
          report += `<summary>Show diff preview</summary>\n\n`;
          report += `**Old (first 50 lines):**\n\`\`\`\n${oldPreview}\n\`\`\`\n\n`;
          report += `**New (first 50 lines):**\n\`\`\`\n${newPreview}\n\`\`\`\n\n`;
          report += `</details>\n\n`;
        }
        report += `\n`;
      });
    }
    
    if (byStatus.deleted.length > 0) {
      report += `## 🗑️ Deleted Files\n\n`;
      byStatus.deleted.forEach(change => {
        report += `- \`${change.file}\`\n`;
      });
      report += `\n`;
    }
  }
  
  fs.writeFileSync(reportPath, report, 'utf8');
  
  console.log('📊 Report Summary:');
  console.log(`  Added: ${summary.added}`);
  console.log(`  Modified: ${summary.modified}`);
  console.log(`  Deleted: ${summary.deleted}`);
  console.log(`  With Backend Integration: ${summary.withBackendIntegration}\n`);
  console.log(`✓ Markdown report generated: ${reportPath}\n`);
  console.log(`💡 Review the report and share it with your AI assistant to sync changes\n`);
}

// Main command handler
const command = process.argv[2];

if (command === 'check') {
  checkUpdates();
} else if (command === 'diff') {
  generateDiff();
} else {
  console.error('Usage: node scripts/figma-sync.js <check|diff>');
  console.error('\n  check  - Check for updates from Figma repository');
  console.error('  diff   - Generate diff report');
  process.exit(1);
}

