---
name: security_guidelines
description: 인증, 인가, 데이터 보호, 외부 API 키 관리 등 프로젝트 전반의 보안 원칙
---

# Security Guidelines

BookLink(Snap Trade) 서비스는 사용자의 위치 정보(LBS), 개인 거래 내역, 그리고 다수의 외부 API Key를 다룹니다. 따라서 안티그래비티는 코드를 작성할 때 항상 다음의 'Zero Trust' 기반 보안 규칙을 엄격히 준수해야 합니다.

## 1. 시크릿(Secret) 및 환경변수 격리

- **No Hardcoding**: 데이터베이스 비밀번호, JWT 시크릿, 카카오/알라딘/Google Vision API Key 등 어떠한 민감 정보도 소스 코드 내에 하드코딩하지 않습니다.
- **주입 방식**: Spring Boot는 `application.yml`의 `${ENV_VARIABLE}` 형식을 통해, Next.js는 `.env.local`의 `process.env.XXX` 형식을 통해 반드시 환경변수로 주입받아 사용합니다.

## 2. 파일 업로드 보안 (OCR 및 마켓플레이스 이미지)

- **확장자 검증**: 이미지 업로드 시 프론트엔드와 백엔드 양단에서 파일의 MIME 타입(예: `image/jpeg`, `image/png`)과 확장자를 이중 검증합니다.
- **용량 제한**: 스토리지(S3 등) 부하 및 DDoS 공격 방지를 위해 파일 사이즈 제한(예: Max 5MB)을 명시적으로 컨트롤러 계층(`@RequestPart`)과 Nginx/Spring 설정에서 강제합니다.

## 3. 인증(Authentication)과 인가(Authorization)

- **비밀번호 저장 원칙**: 자체 로그인 구현 시 비밀번호는 반드시 단방향 해시 알고리즘(예: `Bcrypt`)으로 암호화하여 DB에 저장합니다.
- **JWT 보안**: 액세스 토큰은 수명을 짧게 가져가고, 민감한 개인정보(비밀번호, 상세 주소 등)는 절대 페이로드(Payload)에 담지 않습니다. (예: `userId`, `role`만 포함)
- **CORS 설정**: 개발 환경 외 배포 시 프론트엔드 도메인만 명시적으로 허용(`allowedOrigins`)하도록 Spring Security 설정을 구성합니다.

## 4. 개인정보(PII) 로그 취급 제한

- **No PII Logging**: 사용자의 정확한 위경도(Geolocation) 좌표, 이메일, 휴대폰 번호 등은 일반 서버 로그(Console, 파일 로그)에 찍히지 않도록 마스킹하거나 로깅 레벨에서 제외해야 합니다.
