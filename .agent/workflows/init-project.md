---
description: Spring Boot + Next.js 전체 프로젝트 초기화 및 환경 구축
---

# Project Initialization Workflow

이 워크플로는 `booklink-web-v2` 프로젝트의 전체 뼈대를 잡고 로컬 개발 환경을 구축하는 절차를 안내합니다.

## 1. 백엔드 초기화 (Spring Boot)

// turbo

1. `backend/` 디렉토리를 생성하고 Spring Initializr(또는 이미 준비된 스크립트)를 사용하여 Gradle 기반 Spring Boot 프로젝트를 생성합니다.
   - 선호 기술: Java 17+, Spring Web, Data JPA, PostgreSQL Driver, Validation, Lombok.
2. `ARCHITECTURE.md`에 정의된 4계층 패키지(`presentation`, `application`, `domain`, `infrastructure`)를 기본 생성합니다.

## 2. 프론트엔드 초기화 (Next.js)

// turbo

1. `frontend/` 디렉토리에서 `pnpm create next-app@latest ./` 명령을 실행하여 프로젝트를 초기화합니다.
   - 옵션: TypeScript, ESLint, Tailwind CSS, App Router.
2. `src/lib/api/` 폴더를 생성하고 기본 Axios 또는 Fetch 클라이언트 설정을 완료합니다.

## 3. 개발 인프라 세팅 (Docker)

1. 프로젝트 루트에 `docker-compose.yml`을 작성하여 PostgreSQL DB와 pgAdmin을 설정합니다.
2. `backend/src/main/resources/application.yml`에 DB 연결 정보를 구성합니다.

## 4. 최종 확인

1. 백엔드와 프론트엔드를 각각 실행하여 헬스체크 API 응답을 확인합니다.
2. 모든 설정이 완료되면 Git에 첫 커밋을 생성합니다.
