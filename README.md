# Petutor 🐱
*On-screen Study Companion Pet*

![Petutor Banner](https://img.shields.io/badge/Junction_Asia_2025-Finalist-brightgreen)
![Team](https://img.shields.io/badge/Team-UNDEF!NED-blue)
![Track](https://img.shields.io/badge/Track-YBM-orange)

<div align="center">
  <img src="../slides/slide-1.png" width="33%" alt="슬라이드 1">
  <img src="../slides/slide-2.png" width="33%" alt="슬라이드 2">
  <img src="../slides/slide-3.png" width="33%" alt="슬라이드 3">
</div>

<div align="center">

### Frontend
![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Backend
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/typeorm-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)

### Infrastructure & Tools
![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome%20Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

</div>

## 📖 개요

**Petutor**는 크롬 확장 프로그램 형태의 학습 도우미 펫으로, 화면 위를 돌아다니며 사용자에게 학습을 재촉하고 퀴즈를 제공하는 교육 서비스입니다.

98%의 교육 앱 이탈율이라는 현실적 문제에 주목하여, 사용자가 직접 앱을 실행하지 않아도 되는 새로운 방식의 학습 경험을 제공합니다.

## 🎯 Problem

- **98%** - 교육 앱의 평균 이탈율 (앱스토어 최고 수준)
- 공부 계획은 세우지만 실제 실행에서의 어려움
- 기존 알람/일정 관리 앱의 한계: 단순 알림에 그쳐 쉽게 무시됨
- 지속적인 학습 참여 유도의 어려움

## 🚀 Solution

**화면을 돌아다니는 학습 펫**을 통한 3가지 핵심 가치 제공:

### 1. 👥 Participation (참여)
- 크롬 확장 프로그램으로 항상 화면에 존재
- 설정된 간격으로 자동 퀴즈 출제 (30분, 1시간 등)
- TOEIC 등 성인 대상 시험 문제 유형 지원
- 학습 목표 및 일정 리마인더

### 2. 🎮 Motivation (동기부여)
- 퀴즈 정답시 리워드 지급 (코인 50개)
- 캐릭터 커스터마이징 시스템
- 게이미피케이션을 통한 지속적 참여 유도
- 틀린 문제 반복 학습 시스템

### 3. 🎯 Targeting (개인화)
- YBM 데이터를 활용한 레벨별 맞춤 퀴즈
- 고교/대학/대학원 수준별 문제 제공
- 사용자 하이라이트 단어 기반 개인화 학습

## 📱 기능

### 🏠 홈
- 학습 목표 관리
- 일정 확인 및 리마인더 설정
- 학습 통계 및 진행 상황

### 📚 단어장
- 단어장 생성 및 관리
- 웹에서 하이라이트한 단어 자동 수집
- 예문 자동 생성
- 개인화된 단어 퀴즈

### 🎯 퀴즈 시스템
- **문장 퀴즈**: 영어 패턴 학습
- **어휘 퀴즈**: 단어 의미 맞추기
- **독해 퀴즈**: 웹 콘텐츠 기반 이해도 확인
- 사용자 레벨별 맞춤 문제

### 🛍 펫 커스타마이제이션
- 다양한 펫 캐릭터 해금
- 코인을 통한 아이템 구매
- 개성있는 펫 꾸미기

## 🏗 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Chrome Ext.    │───▶│   NestJS API    │───▶│     MySQL       │
│  (Frontend)     │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   Svelte + TS           Auth + Quiz +            User Data +
   Tailwind CSS          Words + Goals           Quiz Results
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MySQL
- Chromium 브라우저

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/junction-Aqz6iLtyd/petutor.git
cd petutor
```

2. **Backend Setup**
```bash
cd backend
bun install
cp .env.example .env
# Configure your database credentials in .env
bun run start:dev
```

3. **Frontend Setup**
```bash
cd frontend
bun install
bun run build
```

4. **Chrome Extension Setup**
```bash
1. Open Chrome and go to chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked" and select the built extension folder
```

## 📊 API 레퍼런스

**Base URL**: `https://junction-backend-production.up.railway.app`

### Authentication
- `POST /auth/login` - 사용자 로그인
- `POST /auth/register` - 회원가입
- `DELETE /auth/me` - 회원탈퇴

### Words Management
- `GET /words` - 단어장 목록 조회
- `POST /words` - 새 단어장 생성
- `POST /words/:listId` - 단어 추가

### Quiz System
- `GET /quiz/sentence/quiz1` - 문장 퀴즈
- `GET /quiz/voca/quiz1` - 어휘 퀴즈

### Pet & Customization
- `GET /pet` - 펫 정보 조회
- `GET /decos` - 장식품 목록
- `GET /decos/buy?decoId=1` - 장식품 구매

[📖 Full API Documentation](./docs/api.md)

## 🎨 스크린샷

### 📱 Chrome Extension Interface
<div align="center">
  <img src="../screenshots/dashboard.png" width="45%" alt="대시보드 - 학습 목표 관리 및 통계 확인">
  <img src="../screenshots/vocabulary.png" width="45%" alt="단어장 - 개인화된 단어 학습 관리">
</div>

### 🎯 Quiz System in Action
<div align="center">
  <img src="../screenshots/quiz_overlay.png" width="60%" alt="퀴즈 오버레이 - 웹 브라우징 중 나타나는 퀴즈">
</div>

### 🛍 Pet Customization
<div align="center">
  <img src="../screenshots/pet_customization.png" width="60%" alt="펫 커스터마이징 - 다양한 캐릭터와 아이템">
</div>

> **실제 동작 모습**: 
> - 🏠 **Dashboard**: 학습 목표 설정, 진행률 확인, 코인 관리
> - 📚 **Vocabulary**: 단어장 관리, 예문 확인, 개인화 학습
> - 🎯 **Quiz Overlay**: 웹 브라우징 중 자동으로 나타나는 학습 퀴즈
> - 🐱 **Pet System**: 귀여운 캐릭터와 함께하는 게이미피케이션 경험

## 🗺 로드 맵

### Phase 1: MVP (Current)
- ✅ 기본 펫 시스템
- ✅ 퀴즈 기능
- ✅ 단어장 관리
- ✅ 크롬 확장 프로그램

### Phase 2: AI Enhancement
- 🔄 AI 기반 맞춤 퀴즈 생성
- 🔄 NLP 기반 자동 문제 생성
- 🔄 학습 패턴 분석

### Phase 3: AI Tutor
- 📋 AI 펫 튜터 대화 기능
- 📋 실시간 코칭
- 📋 글로벌 서비스 확장

### Phase 4: Business Expansion
- 📋 B2B 파트너십 (대학, 기업, 학원)
- 📋 프리미엄 구독 모델
- 📋 다국어 지원

## 🏆 업적

- **Junction Asia 2025** - YBM Track 본선 진출
- **Team UNDEF!NED** (Team #10) - 혁신적인 학습 경험 제공으로 주목받음

## 👥 Team UNDEF!NED

| Role | Name | Contribution |
|------|------|-------------|
| PM | 남지윤 | Project Management, Strategy |
| Designer | 최효우 | UX/UI Design, 3D Character Design |
| Frontend Lead | 홍준우 | Chrome Extension, Svelte UI |
| Backend Lead | 이재헌 | NestJS API, Database Design |

---

<div align="center">
  <strong>Made with ❤️ by Team UNDEF!NED at Junction Asia 2025</strong><br>
  <em>Transforming language learning, one pet at a time</em> 🐱✨
</div>


## 📖 개요

**Petutor**는 크롬 확장 프로그램 형태의 학습 도우미 펫으로, 화면 위를 돌아다니며 사용자에게 학습을 재촉하고 퀴즈를 제공하는 혁신적인 교육 서비스입니다.

98%의 교육 앱 이탈율이라는 현실적 문제에 주목하여, 사용자가 직접 앱을 실행하지 않아도 되는 새로운 방식의 학습 경험을 제공합니다.

## 🎯 Problem

- **98%** - 교육 앱의 평균 이탈율 (앱스토어 최고 수준)
- 공부 계획은 세우지만 실제 실행에서의 어려움
- 기존 알람/일정 관리 앱의 한계: 단순 알림에 그쳐 쉽게 무시됨
- 지속적인 학습 참여 유도의 어려움

## 🚀 Solution

**화면을 돌아다니는 학습 펫**을 통한 3가지 핵심 가치 제공:

### 1. 👥 Participation (참여)
- 크롬 확장 프로그램으로 항상 화면에 존재
- 설정된 간격으로 자동 퀴즈 출제 (30분, 1시간 등)
- TOEIC 등 성인 대상 시험 문제 유형 지원
- 학습 목표 및 일정 리마인더

### 2. 🎮 Motivation (동기부여)
- 퀴즈 정답시 리워드 지급 (코인 50개)
- 캐릭터 커스터마이징 시스템
- 게이미피케이션을 통한 지속적 참여 유도
- 틀린 문제 반복 학습 시스템

### 3. 🎯 Targeting (개인화)
- YBM 데이터를 활용한 레벨별 맞춤 퀴즈
- 고교/대학/대학원 수준별 문제 제공
- 사용자 하이라이트 단어 기반 개인화 학습

## 🛠 기술 스택

<div align="center">

### Frontend
![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Backend
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/typeorm-%23FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)

### Infrastructure & Tools
![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)
![Chrome](https://img.shields.io/badge/Chrome%20Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

</div>

## 📱 기능

### 🏠 홈
- 학습 목표 관리
- 일정 확인 및 리마인더 설정
- 학습 통계 및 진행 상황

### 📚 단어장
- 단어장 생성 및 관리
- 웹에서 하이라이트한 단어 자동 수집
- 예문 자동 생성
- 개인화된 단어 퀴즈

### 🎯 퀴즈 시스템
- **문장 퀴즈**: 영어 패턴 학습
- **어휘 퀴즈**: 단어 의미 맞추기
- **독해 퀴즈**: 웹 콘텐츠 기반 이해도 확인
- 사용자 레벨별 맞춤 문제

### 🛍 펫 커스타마이제이션
- 다양한 펫 캐릭터 해금
- 코인을 통한 아이템 구매
- 개성있는 펫 꾸미기

## 🏗 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Chrome Ext.    │───▶│   NestJS API    │───▶│     MySQL       │
│  (Frontend)     │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   Svelte + TS           Auth + Quiz +            User Data +
   Tailwind CSS          Words + Goals           Quiz Results
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MySQL
- Chromium 브라우저

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/junction-Aqz6iLtyd/petutor.git
cd petutor
```

2. **Backend Setup**
```bash
cd backend
bun install
cp .env.example .env
# Configure your database credentials in .env
bun run start:dev
```

3. **Frontend Setup**
```bash
cd frontend
bun install
bun run build
```

4. **Chrome Extension Setup**
```bash
1. Open Chrome and go to chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked" and select the built extension folder
```

## 📊 API 레퍼런스

**Base URL**: `https://junction-backend-production.up.railway.app`

### Authentication
- `POST /auth/login` - 사용자 로그인
- `POST /auth/register` - 회원가입
- `DELETE /auth/me` - 회원탈퇴

### Words Management
- `GET /words` - 단어장 목록 조회
- `POST /words` - 새 단어장 생성
- `POST /words/:listId` - 단어 추가

### Quiz System
- `GET /quiz/sentence/quiz1` - 문장 퀴즈
- `GET /quiz/voca/quiz1` - 어휘 퀴즈

### Pet & Customization
- `GET /pet` - 펫 정보 조회
- `GET /decos` - 장식품 목록
- `GET /decos/buy?decoId=1` - 장식품 구매

[📖 Full API Documentation](./docs/api.md)

## 🎨 스크린샷

### 📱 Chrome Extension Interface
<div align="center">
  <img src="../screenshots/dashboard.png" width="45%" alt="대시보드 - 학습 목표 관리 및 통계 확인">
  <img src="../screenshots/vocabulary.png" width="45%" alt="단어장 - 개인화된 단어 학습 관리">
</div>

### 🎯 Quiz System in Action
<div align="center">
  <img src="../screenshots/quiz_overlay.png" width="60%" alt="퀴즈 오버레이 - 웹 브라우징 중 나타나는 퀴즈">
</div>

### 🛍 Pet Customization
<div align="center">
  <img src="../screenshots/pet_customization.png" width="50%" alt="펫 커스터마이징 - 다양한 캐릭터와 아이템">
</div>

> **실제 동작 모습**: 
> - 🏠 **Dashboard**: 학습 목표 설정, 진행률 확인, 코인 관리
> - 📚 **Vocabulary**: 단어장 관리, 예문 확인, 개인화 학습
> - 🎯 **Quiz Overlay**: 웹 브라우징 중 자동으로 나타나는 학습 퀴즈
> - 🐱 **Pet System**: 귀여운 캐릭터와 함께하는 게이미피케이션 경험

## 🗺 로드 맵

### Phase 1: MVP (Current)
- ✅ 기본 펫 시스템
- ✅ 퀴즈 기능
- ✅ 단어장 관리
- ✅ 크롬 확장 프로그램

### Phase 2: AI Enhancement
- 🔄 AI 기반 맞춤 퀴즈 생성
- 🔄 NLP 기반 자동 문제 생성
- 🔄 학습 패턴 분석

### Phase 3: AI Tutor
- 📋 AI 펫 튜터 대화 기능
- 📋 실시간 코칭
- 📋 글로벌 서비스 확장

### Phase 4: Business Expansion
- 📋 B2B 파트너십 (대학, 기업, 학원)
- 📋 프리미엄 구독 모델
- 📋 다국어 지원

## 🏆 업적

- **Junction Asia 2025** - YBM Track 본선 진출
- **Team UNDEF!NED** (Team #10) - 혁신적인 학습 경험 제공으로 주목받음

## 👥 Team UNDEF!NED

| Role | Name | Contribution |
|------|------|-------------|
| PM | 남지윤 | Project Management, Strategy |
| Designer | 최효우 | UX/UI Design, 3D Character Design |
| Frontend Lead | 홍준우 | Chrome Extension, Svelte UI |
| Backend Lead | 이재헌 | NestJS API, Database Design |

---

<div align="center">
  <strong>Made with ❤️ by Team UNDEF!NED at Junction Asia 2025</strong><br>
  <em>Transforming language learning, one pet at a time</em> 🐱✨
</div>
