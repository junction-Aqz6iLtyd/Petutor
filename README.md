# Svelte Side Panel Chrome Extension

Chrome Side Panel API를 활용한 Svelte 기반 확장 프로그램입니다.

## 🔧 기술 스택

<div align="center">

|      Type       |                                                                                                             Tool                                                                                                             |
| :-------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     Bundler     |                                                               ![VITE](https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=Vite&logoColor=white)                                                                |
|   Framework     |                                                         ![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)                                                          |
|    Language     | ![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) |
|     Styling     | ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white) |
|   Extension     | ![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white) ![Manifest V3](https://img.shields.io/badge/Manifest%20V3-4285F4?style=for-the-badge) |
| Package Manager |                                                                 ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)                                                                 |
| Version Control |       ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)       |

</div>

&nbsp;

## 주요 특징

- 🎨 **Modern UI**: TailwindCSS와 DaisyUI를 활용한 깔끔한 디자인
  
- ⚡ **Svelte 5**: 최신 Svelte 5.0 next 버전 사용
- 🔧 **TypeScript**: 완전한 타입 안전성 지원
- 📱 **Side Panel**: Chrome Side Panel API 활용

## 프로젝트 구조

```
src/
├── App.svelte              # 메인 앱 컴포넌트
├── main.ts                 # 앱 엔트리 포인트
├── app.css                 # 글로벌 스타일
├── lib/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── MainContent.svelte
│   │   ├── Sidebar.svelte  
│   ├── stores/             # Svelte 스토어
│   ├── constants/          # 상수 정의
│   │   └── menu.ts
│   ├── types/              # TypeScript 타입 정의
│   │   └── index.ts
│   └── createApp.ts        # 앱 생성 유틸리티
└── assets/                 # 정적 에셋
    └── svelte.svg
```

## 🔩 프로젝트 설정 및 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 빌드

```bash  
npm run build
```

### 4. 타입 체크

```bash
npm run check
```

## Chrome 확장 프로그램 설치

1. `npm run build` 명령어로 확장 프로그램 빌드
2. Chrome에서 `chrome://extensions/` 페이지 접속
3. "개발자 모드" 활성화
4. "압축해제된 확장 프로그램을 로드합니다." 클릭  
5. `dist` 폴더 선택

## 사용법

1. 확장 프로그램 설치 후 Chrome 사이드 패널에서 확인 가능
2. 사이드바를 통한 네비게이션 지원

&nbsp;

## 개발 참고사항

- **Manifest V3**: 최신 Chrome Extension API 사용
- **Side Panel API**: `sidePanel` 권한 필요
- **Build Output**: `dist` 폴더에 확장 프로그램 파일 생성
- **Hot Reload**: 개발 모드에서 실시간 코드 변경 반영

## 라이선스

이 프로젝트는 개인 프로젝트입니다.
