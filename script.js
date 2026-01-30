// Global Variables
let selectedDevice = '';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set current date
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  document.getElementById('current-date').textContent = dateStr;
  
  // Animate download counter
  animateCounter('download-count', 45123, 47382, 3000);
  
  // Animate viewer counter with fluctuation
  setInterval(() => {
    const randomCount = Math.floor(Math.random() * 50) + 100;
    document.getElementById('viewer-count').textContent = randomCount;
  }, 5000);
  
  // Start countdown timer
  startCountdown();
  
  // Auto-detect device
  autoDetectDevice();
});

// Animate counter
function animateCounter(elementId, start, end, duration) {
  const element = document.getElementById(elementId);
  const range = end - start;
  const increment = range / (duration / 50);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 50);
}

// Countdown timer
function startCountdown() {
  let hours = 23;
  let minutes = 59;
  let seconds = 45;
  
  setInterval(() => {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
      if (minutes < 0) {
        minutes = 59;
        hours--;
        if (hours < 0) {
          hours = 23;
        }
      }
    }
    
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('countdown-timer').textContent = timeStr;
  }, 1000);
}

// Auto-detect device
function autoDetectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  let detectedDevice = '';
  
  if (userAgent.includes('windows')) {
    detectedDevice = 'windows';
  } else if (userAgent.includes('android')) {
    detectedDevice = 'android';
  } else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('mac')) {
    detectedDevice = 'ios';
  }
  
  if (detectedDevice) {
    const deviceBtn = document.querySelector(`[data-device="${detectedDevice}"]`);
    if (deviceBtn) {
      deviceBtn.style.borderColor = 'rgba(0, 230, 118, 0.8)';
      deviceBtn.style.background = 'rgba(0, 230, 118, 0.15)';
    }
  }
}

// Show Device Selection Modal
function showDeviceModal() {
  document.getElementById('device-modal').classList.add('active');
  
  // Decrease slots
  const slotsElement = document.getElementById('slots-remaining');
  let currentSlots = parseInt(slotsElement.textContent);
  if (currentSlots > 5) {
    currentSlots--;
    slotsElement.textContent = currentSlots;
    document.getElementById('slots-fill').style.width = (currentSlots / 100 * 100) + '%';
  }
}

// Select Device and Start Terminal
function selectDevice(device) {
  selectedDevice = device;
  
  // Close device modal
  document.getElementById('device-modal').classList.remove('active');
  
  // Start terminal animation
  setTimeout(() => {
    startTerminalAnimation();
  }, 300);
}

// Terminal Processing Animation
function startTerminalAnimation() {
  const terminalOverlay = document.getElementById('terminal-overlay');
  const terminalOutput = document.getElementById('terminal-output');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  terminalOverlay.classList.add('active');
  
  const logs = [
    { text: '> [INIT] Accessing Brainrot Script API...', delay: 200, progress: 0 },
    { text: '> [OK] Connection established', delay: 200, progress: 15 },
    { text: '> [INFO] Fetching latest script version...', delay: 200, progress: 25 },
    { text: `> [INFO] Target Device: ${selectedDevice}`, delay: 200, progress: 35 },
    { text: '> [INFO] Bypassing Roblox Anti-Cheat...', delay: 300, progress: 50 },
    { text: '> [OK] Anti-Cheat bypassed successfully', delay: 200, progress: 65 },
    { text: '> [INFO] Obfuscating script for keyless access...', delay: 200, progress: 75 },
    { text: '> [OK] Obfuscation complete', delay: 200, progress: 85 },
    { text: '> [INFO] Generating injection payload...', delay: 200, progress: 92 },
    { text: '> [DONE] Package ready for local injection', delay: 200, progress: 98 },
    { text: '> [SUCCESS] Script prepared successfully', delay: 200, progress: 100 }
  ];
  
  let currentLog = 0;
  let outputText = '';
  
  function displayNextLog() {
    if (currentLog < logs.length) {
      const log = logs[currentLog];
      
      // Add log line
      outputText += log.text + '\n';
      terminalOutput.textContent = outputText;
      
      // Update progress
      progressFill.style.width = log.progress + '%';
      progressText.textContent = log.progress + '%';
      
      // Scroll terminal to bottom
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
      
      currentLog++;
      setTimeout(displayNextLog, log.delay);
    } else {
      // Animation complete - move to verification
      setTimeout(() => {
        showVerification();
      }, 300);
    }
  }
  
  displayNextLog();
}

// Show Verification Screen
function showVerification() {
  // Hide terminal
  document.getElementById('terminal-overlay').classList.remove('active');
  
  // Hide landing
  document.getElementById('landing').classList.add('hidden');
  
  // Show verification
  const verificationScreen = document.getElementById('verification');
  verificationScreen.classList.add('active');
  
  // Update device info
  document.getElementById('verify-device').textContent = selectedDevice;
  
  // Trigger OGAds locker
  setTimeout(() => {
    if (typeof og_load === 'function') {
      console.log('✅ Triggering OGAds locker...');
      og_load();
    } else {
      console.error('❌ OGAds not loaded');
    }
  }, 100);
}

// Live Activity Feed
const activityFeed = document.getElementById('activity-feed');
const usernames = [
  'User772', 'ScriptKing99', 'RobloxPro_21', 'GamerX_2024', 'Luna_Scripts', 
  'Tyler_xX', 'ProPlayer88', 'NinjaExe', 'Elite_Gamer', 'Zara_Dev',
  'Alex2024', 'BloxMaster', 'CodeRunner_77', 'CoolDev456', 'Sigma_User'
];

function showActivityNotification() {
  const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
  const randomTime = Math.floor(Math.random() * 45) + 5;
  
  const notification = document.createElement('div');
  notification.className = 'activity-notification';
  notification.innerHTML = `
    <span class="activity-icon">✓</span>
    <span class="activity-text">
      <strong>${randomUser}</strong> just downloaded Steal a Brainrot Script
      <span class="time-ago">${randomTime} seconds ago</span>
    </span>
  `;
  
  activityFeed.appendChild(notification);
  
  setTimeout(() => notification.classList.add('show'), 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 500);
  }, 6000);
}

// Start activity feed
setTimeout(() => {
  showActivityNotification();
  setInterval(showActivityNotification, Math.random() * 4000 + 6000);
}, 2000);
