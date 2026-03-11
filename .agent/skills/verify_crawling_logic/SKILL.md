---
name: verify_crawling_logic
description: 크롤링 모듈이 대상 사이트의 HTML 구조 변화에도 안정적으로 동작하는지 테스트 코드를 통해 검증합니다.
---

# Crawling Logic Verifier

사이트 개편으로 인해 CSS 선택자가 바뀌어 크롤링이 깨지는 상황을 방지하기 위한 검증 스킬입니다.

## 실행 절차

1. **정적 리소스 기반 테스트**: 실제 사이트 호출 대신, 미리 저장된 `sample.html` 파일을 읽어 파서가 정상적으로 필드(가격, 재고 등)를 추출하는지 검증하는 JUnit 코드를 생성/실행합니다.
2. **Mock Server 테스트**: `MockRestServiceServer` 등을 활용하여 네트워크 레이어에서의 오류 케이스를 시뮬레이션합니다.
3. 위반 사항 발견 시, 어떤 CSS 선택자(`select(".product-price")` 등)가 문제를 일으켰는지 상세 보고합니다.
