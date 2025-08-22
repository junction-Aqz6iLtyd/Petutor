import { writable } from 'svelte/store';
import { DEFAULT_DURATION } from '../utils/time';

export interface Settings {
  pauseDuration: number; // 분 단위로 저장
  selectedCharacter: number;
}

const defaultSettings: Settings = {
  pauseDuration: DEFAULT_DURATION, // 2시간 = 120분
  selectedCharacter: 0
};

// 로컬 스토리지에서 설정 불러오기
function loadSettings(): Settings {
  try {
    const saved = localStorage.getItem('waui-settings');
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
      
      return { ...defaultSettings, ...parsedSettings };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return defaultSettings;
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
export const settings = writable<Settings>(loadSettings());

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