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
  
  // Load OGads script immediately when device is selected
  loadOGadsScript();
  
  // Close device modal
  document.getElementById('device-modal').classList.remove('active');
  
  // Show quick loading transition then go straight to verification
  showQuickLoading();
}

// Quick loading transition (under 1 second)
function showQuickLoading() {
  const terminalOverlay = document.getElementById('terminal-overlay');
  const terminalOutput = document.getElementById('terminal-output');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  terminalOverlay.classList.add('active');
  
  // Quick loading sequence
  let outputText = '> [INIT] Preparing download...\n';
  terminalOutput.textContent = outputText;
  
  // Smoother progress animation (1.5 seconds total)
  let progress = 0;
  let step = 0;
  const progressInterval = setInterval(() => {
    progress += 5;
    step++;
    
    // Add messages at intervals
    if (step === 5) {
      outputText += '> [OK] Loading script...\n';
      terminalOutput.textContent = outputText;
    }
    if (step === 12) {
      outputText += '> [OK] Initializing...\n';
      terminalOutput.textContent = outputText;
    }
    if (step === 18) {
      outputText += '> [DONE] Ready!\n';
      terminalOutput.textContent = outputText;
    }
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      
      // Go to verification immediately - no extra delay
      showVerification();
    }
    progressFill.style.width = progress + '%';
    progressText.textContent = progress + '%';
  }, 75); // 75ms * 20 = 1500ms total
}

// Load OGads script dynamically
function loadOGadsScript() {
  if (!document.getElementById('ogjs')) {
    console.log('🔄 Loading OGads script...');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'ogjs';
    script.src = 'https://mirror.lootquest.me/cl/js/m55o98';
    document.head.appendChild(script);
    
    script.onload = function() {
      console.log('✅ OGads script loaded successfully');
    };
    
    script.onerror = function() {
      console.error('❌ Failed to load OGads script');
    };
  }
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
      // Animation complete - move to verification immediately
      showVerification();
    }
  }
  
  displayNextLog();
  
  // Show verification screen early (during animation at 50% progress)
  // This ensures locker starts loading while terminal is still animating
  setTimeout(() => {
    showVerification();
  }, 1200); // Trigger after ~1.2 seconds (around 50% of terminal animation)
}

// Show Verification Screen
function showVerification() {
  // Prevent multiple calls
  if (document.getElementById('verification').classList.contains('active')) {
    return;
  }
  
  // Show verification FIRST (before hiding terminal)
  const verificationScreen = document.getElementById('verification');
  verificationScreen.classList.add('active');
  
  // Update device info
  document.getElementById('verify-device').textContent = selectedDevice;
  
  // Hide landing
  document.getElementById('landing').classList.add('hidden');
  
  // Then hide terminal after a brief overlap (smooth transition)
  setTimeout(() => {
    document.getElementById('terminal-overlay').classList.remove('active');
  }, 300);
  
  // Trigger OGAds locker immediately
  if (typeof og_load === 'function') {
    console.log('✅ Triggering OGAds locker...');
    og_load();
    
    // Hide loading spinner once locker container appears
    setTimeout(() => {
      const lockerLoading = document.getElementById('locker-loading');
      if (lockerLoading) {
        lockerLoading.style.display = 'none';
      }
    }, 1500); // Give locker 1.5s to render
  } else {
    console.warn('⏳ OGAds not ready yet, will retry...');
    // Retry every 100ms until og_load is available (max 20 attempts = 2 seconds)
    let attempts = 0;
    const retryInterval = setInterval(() => {
      attempts++;
      if (typeof og_load === 'function') {
        console.log('✅ Triggering OGAds locker (retry)...');
        og_load();
        clearInterval(retryInterval);
        
        // Hide loading spinner
        setTimeout(() => {
          const lockerLoading = document.getElementById('locker-loading');
          if (lockerLoading) {
            lockerLoading.style.display = 'none';
          }
        }, 1500);
      } else if (attempts >= 20) {
        console.error('❌ OGAds failed to load after 2 seconds');
        document.getElementById('locker-loading').innerHTML = '<p class="locker-note" style="color: #ff4444;">⚠️ Loading failed. Please refresh the page.</p>';
        clearInterval(retryInterval);
      }
    }, 100);
  }
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
