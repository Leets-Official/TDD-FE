# 🍊 TDD

<p align="center">
  <img src="docs/banner.png" alt="TDD 배너" width="800" />
</p>

기숙사생을 위한 배달 공유 플랫폼

[![TDD 바로가기](https://img.shields.io/badge/TDD%20바로가기-FF610D?style=for-the-badge)](https://tdd-orcin.vercel.app)

---

## 🛠️ 기술 스택

| 분류            | 기술                              |
| --------------- | --------------------------------- |
| **코어**        | React, TypeScript                 |
| **빌드 도구**   | Vite, PNPM                        |
| **스타일링**    | Tailwind CSS 4, Tailwind Variants |
| **상태 관리**   | Zustand, TanStack Query           |
| **라우팅**      | React Router                      |
| **폼 관리**     | React Hook Form, Zod              |
| **HTTP 통신**   | Axios                             |
| **실시간 통신** | STOMP                             |
| **PWA**         | Vite PWA , Workbox                |
| **코드 품질**   | ESLint , Prettier , Husky         |
| **개발 도구**   | Storybook, Chromatic              |

---

## 🍊 주요 기능

### 🍕 배달팟

- **메인**: 실시간 배달팟 목록 조회 및 카테고리별 필터링
- **생성**: 배달 카테고리, 인원, 시간 설정 후 배달팟 생성
- **채팅**: STOMP 기반 실시간 채팅 및 주문 완료·정산 정보 자동 전송
- **매너 평가**: 배달 완료 후 참여자 매너 평가 및 온도 조회

### 📋 게시판

- **게시글 작성**: 자유게시판 글 작성 및 목록 조회
- **댓글**: 게시글에 댓글 및 대댓글 작성

### 👤 마이페이지

- **프로필 관리**: 닉네임, 프로필 사진, 기숙사 정보 수정
- **기숙사 인증**: 기숙사 확인서 업로드를 통한 기숙사 재학생 인증
- **정산 계좌**: 배달 비용 정산을 위한 계좌 등록/관리
- **계정 관리**: 비밀번호 변경, 로그아웃, 회원 탈퇴

### 🔔 알림 설정

- **Push 알림**: PWA 기반 실시간 푸시 알림 수신
