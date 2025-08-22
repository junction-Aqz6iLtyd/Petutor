/**
 * 시간 관련 유틸리티 함수들
 */

export interface TimeOption {
  duration: number; // 분 단위
  label: string;
  value: string;
}

/**
 * 현재 시간에서 지정된 분만큼 더한 시간을 계산
 */
export function addMinutesToNow(minutes: number): Date {
  const now = new Date();
  return new Date(now.getTime() + minutes * 60 * 1000);
}

/**
 * Date 객체를 "오전/오후 HH:MM" 형식으로 변환
 */
export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? '오전' : '오후';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  return `${period} ${displayHours}:${displayMinutes}`;
}

/**
 * 시간 옵션을 생성하는 함수
 */
export function generateTimeOptions(): TimeOption[] {
  const baseOptions = [
    { duration: 60, label: '1시간' },      // 60분
    { duration: 120, label: '2시간' },     // 120분
    { duration: 240, label: '4시간' },     // 240분
    { duration: 720, label: '12시간' },    // 720분
    { duration: 1440, label: '24시간' }    // 1440분
  ];

  return baseOptions.map(option => {
    const futureTime = addMinutesToNow(option.duration);
    const timeString = formatTime(futureTime);
    
    return {
      duration: option.duration,
      label: option.label,
      value: `${option.label} 뒤에 다시 만나요(${timeString})`
    };
  });
}

/**
 * 선택된 값에서 duration을 추출하는 함수
 */
export function extractDurationFromValue(value: string): number | null {
  const options = generateTimeOptions();
  const found = options.find(option => option.value === value);
  return found ? found.duration : null;
}

/**
 * duration으로 값을 찾는 함수
 */
export function findValueByDuration(duration: number): string | null {
  const options = generateTimeOptions();
  const found = options.find(option => option.duration === duration);
  return found ? found.value : null;
}

/**
 * 기본 duration (2시간)
 */
export const DEFAULT_DURATION = 120;

/**
 * 헤더 텍스트
 */
export const HEADER_OPTION = "재활성화까지:";