// Background script for handling timer alarms
try {
  if (chrome && chrome.alarms) {
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === 'pauseTimer') {
        // Show notification when timer expires
        if (chrome.notifications) {
          chrome.notifications.create('timerExpired', {
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Petutor',
            message: '설정한 시간이 만료되었습니다!'
          }).catch(error => {
            console.error('Failed to create notification:', error);
          });
        }
        
        // Clear the alarm data from storage
        if (chrome.storage && chrome.storage.local) {
          chrome.storage.local.remove(['timerStartTime', 'timerDuration']).catch(error => {
            console.error('Failed to clear storage:', error);
          });
        }
      }
    });
  }
} catch (error) {
  console.error('Failed to set up alarm listener:', error);
}

// Handle notification clicks
try {
  if (chrome && chrome.notifications) {
    chrome.notifications.onClicked.addListener((notificationId) => {
      if (notificationId === 'timerExpired') {
        // Open the popup or perform desired action
        if (chrome.action && chrome.action.openPopup) {
          chrome.action.openPopup().catch(error => {
            console.error('Failed to open popup:', error);
          });
        }
        if (chrome.notifications.clear) {
          chrome.notifications.clear(notificationId).catch(error => {
            console.error('Failed to clear notification:', error);
          });
        }
      }
    });
  }
} catch (error) {
  console.error('Failed to set up notification click listener:', error);
}

// Listen for extension startup to check for existing timers
try {
  if (chrome && chrome.runtime) {
    if (chrome.runtime.onStartup) {
      chrome.runtime.onStartup.addListener(() => {
        checkExistingTimer();
      });
    }

    if (chrome.runtime.onInstalled) {
      chrome.runtime.onInstalled.addListener(() => {
        checkExistingTimer();
      });
    }
  }
} catch (error) {
  console.error('Failed to set up runtime listeners:', error);
}

async function checkExistingTimer() {
  try {
    if (!chrome || !chrome.storage || !chrome.storage.local) {
      console.log('Chrome storage API not available in checkExistingTimer');
      return;
    }

    const result = await chrome.storage.local.get(['timerStartTime', 'timerDuration']);
    
    if (result.timerStartTime && result.timerDuration) {
      const startTime = result.timerStartTime;
      const duration = result.timerDuration; // in minutes
      const currentTime = Date.now();
      const endTime = startTime + (duration * 60 * 1000);
      
      if (currentTime >= endTime) {
        // Timer has already expired
        if (chrome.notifications && chrome.notifications.create) {
          chrome.notifications.create('timerExpired', {
            type: 'basic',
            iconUrl: 'icons/icon48.png',
            title: 'Petutor',
            message: '설정한 시간이 만료되었습니다!'
          }).catch(error => {
            console.error('Failed to create notification:', error);
          });
        }
        
        chrome.storage.local.remove(['timerStartTime', 'timerDuration']).catch(error => {
          console.error('Failed to remove expired timer data:', error);
        });
      } else {
        // Timer is still running, recreate the alarm
        if (chrome.alarms && chrome.alarms.create) {
          const remainingTime = endTime - currentTime;
          chrome.alarms.create('pauseTimer', {
            delayInMinutes: remainingTime / (60 * 1000)
          }).catch(error => {
            console.error('Failed to recreate alarm:', error);
          });
          console.log('Timer alarm recreated for remaining time:', remainingTime / (60 * 1000), 'minutes');
        }
      }
    }
  } catch (error) {
    console.error('Error in checkExistingTimer:', error);
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Note: Navigation is now handled internally via router
  // These handlers are kept for backward compatibility but not used
  if (request.action === "openVocabulary") {
    // Navigation handled by internal router
    console.log('Vocabulary navigation handled internally');
  } else if (request.action === "openPetShop") {
    // Navigation handled by internal router
    console.log('PetShop navigation handled internally');
  } else if (request.action === "openSettings") {
    // Navigation handled by internal router
    console.log('Settings navigation handled internally');
  }
});