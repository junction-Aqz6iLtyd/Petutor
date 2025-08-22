import { writable } from 'svelte/store';
import { DEFAULT_DURATION } from '../utils/time';

export interface Settings {
  pauseDuration: number; // 분 단위로 저장
  selectedCharacter: number;
  timerStartTime?: number; // 타이머 시작 시간 (timestamp)
  timerDuration?: number; // 타이머 지속 시간 (분 단위)
  isTimerActive: boolean; // 타이머 활성화 상태
}

const defaultSettings: Settings = {
  pauseDuration: DEFAULT_DURATION, // 2시간 = 120분
  selectedCharacter: 0,
  isTimerActive: false
};

// 로컬 스토리지에서 설정 불러오기
async function loadSettings(): Promise<Settings> {
  try {
    const saved = localStorage.getItem('waui-settings');
    let settings = defaultSettings;
    
    if (saved) {
      const parsedSettings = JSON.parse(saved);
      
      // 기존 pauseTime (string) 형태에서 pauseDuration (number) 형태로 마이그레이션
      if ('pauseTime' in parsedSettings && !('pauseDuration' in parsedSettings)) {
        // 기존 문자열에서 시간 추출해서 duration으로 변환
        const pauseTime = parsedSettings.pauseTime as string;
        let duration = DEFAULT_DURATION;
        
        if (pauseTime.includes('1시간')) duration = 60;
        else if (pauseTime.includes('2시간')) duration = 120;
        else if (pauseTime.includes('4시간')) duration = 240;
        else if (pauseTime.includes('12시간')) duration = 720;
        else if (pauseTime.includes('24시간')) duration = 1440;
        
        delete parsedSettings.pauseTime;
        parsedSettings.pauseDuration = duration;
        
        console.log('Settings migrated from pauseTime to pauseDuration:', duration);
      }
      
      settings = { ...defaultSettings, ...parsedSettings };
    }

    // Chrome storage에서 타이머 정보 확인
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      try {
        const result = await chrome.storage.local.get(['timerStartTime', 'timerDuration']);
        
        if (result.timerStartTime && result.timerDuration) {
          const currentTime = Date.now();
          const endTime = result.timerStartTime + (result.timerDuration * 60 * 1000);
          
          if (currentTime < endTime) {
            // 타이머가 아직 활성화 상태
            settings = {
              ...settings,
              timerStartTime: result.timerStartTime,
              timerDuration: result.timerDuration,
              isTimerActive: true
            };
            console.log('Existing timer found and restored');
          } else {
            // 타이머가 만료됨
            await chrome.storage.local.remove(['timerStartTime', 'timerDuration']);
            console.log('Expired timer cleaned up');
          }
        }
      } catch (chromeError) {
        console.log('Chrome storage not available, using fallback:', chromeError);
        // 폴백으로 localStorage에서 확인
        const startTimeStr = localStorage.getItem('timerStartTime');
        const durationStr = localStorage.getItem('timerDuration');
        
        if (startTimeStr && durationStr) {
          const startTime = parseInt(startTimeStr);
          const duration = parseInt(durationStr);
          const currentTime = Date.now();
          const endTime = startTime + (duration * 60 * 1000);
          
          if (currentTime < endTime) {
            settings = {
              ...settings,
              timerStartTime: startTime,
              timerDuration: duration,
              isTimerActive: true
            };
            console.log('Existing timer found in localStorage and restored');
          } else {
            localStorage.removeItem('timerStartTime');
            localStorage.removeItem('timerDuration');
            console.log('Expired timer cleaned up from localStorage');
          }
        }
      }
    } else {
      // Chrome API가 없는 경우 localStorage 폴백
      const startTimeStr = localStorage.getItem('timerStartTime');
      const durationStr = localStorage.getItem('timerDuration');
      
      if (startTimeStr && durationStr) {
        const startTime = parseInt(startTimeStr);
        const duration = parseInt(durationStr);
        const currentTime = Date.now();
        const endTime = startTime + (duration * 60 * 1000);
        
        if (currentTime < endTime) {
          settings = {
            ...settings,
            timerStartTime: startTime,
            timerDuration: duration,
            isTimerActive: true
          };
          console.log('Existing timer found in localStorage and restored (no Chrome API)');
        } else {
          localStorage.removeItem('timerStartTime');
          localStorage.removeItem('timerDuration');
          console.log('Expired timer cleaned up from localStorage (no Chrome API)');
        }
      }
    }
    
    return settings;
  } catch (error) {
    console.error('Failed to load settings:', error);
    return defaultSettings;
  }
}

// 설정을 로컬 스토리지에 저장
function saveSettings(settings: Settings) {
  try {
    localStorage.setItem('waui-settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

// Svelte store 생성
export const settings = writable<Settings>(defaultSettings);

// 비동기 설정 로딩
loadSettings().then(loadedSettings => {
  settings.set(loadedSettings);
});

// store 구독해서 자동 저장
settings.subscribe(saveSettings);

// 편의 함수들
export const updatePauseDuration = (duration: number) => {
  settings.update(s => ({ ...s, pauseDuration: duration }));
};

export const updateSelectedCharacter = (characterId: number) => {
  settings.update(s => ({ ...s, selectedCharacter: characterId }));
};

export const resetSettings = () => {
  settings.set(defaultSettings);
};

// 타이머 관련 함수들
export const startTimer = async (duration: number) => {
  const startTime = Date.now();
  
  try {
    // Chrome storage API 사용 (백그라운드 스크립트에서 접근 가능)
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({
        timerStartTime: startTime,
        timerDuration: duration
      });
      
      // Chrome alarm 설정
      if (chrome.alarms && chrome.alarms.create) {
        await chrome.alarms.create('pauseTimer', {
          delayInMinutes: duration
        });
      }
    }
  } catch (error) {
    console.warn('Chrome API not available, using fallback storage:', error);
    // 폴백으로 localStorage 사용
    localStorage.setItem('timerStartTime', startTime.toString());
    localStorage.setItem('timerDuration', duration.toString());
  }
  
  // 로컬 settings 업데이트
  settings.update(s => ({
    ...s,
    timerStartTime: startTime,
    timerDuration: duration,
    isTimerActive: true
  }));
  
  console.log(`Timer started: ${duration}분 타이머가 시작되었습니다.`);
};

export const stopTimer = async () => {
  try {
    // Chrome alarm 제거
    if (typeof chrome !== 'undefined' && chrome.alarms && chrome.alarms.clear) {
      await chrome.alarms.clear('pauseTimer');
    }
    
    // Chrome storage 정리
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      await chrome.storage.local.remove(['timerStartTime', 'timerDuration']);
    }
  } catch (error) {
    console.warn('Chrome API not available, using fallback cleanup:', error);
    // 폴백으로 localStorage 정리
    localStorage.removeItem('timerStartTime');
    localStorage.removeItem('timerDuration');
  }
  
  // 로컬 settings 업데이트
  settings.update(s => ({
    ...s,
    timerStartTime: undefined,
    timerDuration: undefined,
    isTimerActive: false
  }));
  
  console.log('Timer stopped');
};

export const getRemainingTime = (timerStartTime?: number, timerDuration?: number): number => {
  if (!timerStartTime || !timerDuration) return 0;
  
  const currentTime = Date.now();
  const endTime = timerStartTime + (timerDuration * 60 * 1000);
  const remaining = Math.max(0, endTime - currentTime);
  
  return Math.ceil(remaining / (60 * 1000)); // 분 단위로 반환
};