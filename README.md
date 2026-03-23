# Tool Box

로컬에서 `npm run dev`로 실행할 수 있는 세련된 탭형 툴박스입니다.

## 기능

- 상단 메인 탭 + SmartThings TV 하위 탭 UI
- QR Maker / Reader / 카메라 스캔 / 옵션 조절 / 자동 벤치마킹 / 리얼 카메라 벤치마킹
- 벤치마킹 반복 횟수 설정 (기본 100회)
- 언어 설정 / 테마 설정
- 텍스트 글자 수 / UTF-8 바이트 수 / 단어 수 / 문단 수 / 읽기 시간 / 공백 정리 / 복사
- JSON Pretty Viewer + 문자열/숫자/boolean 같은 primitive 값 처리
- SmartThings TV용 Cosmos URL 기반 TPK 추출 API 연동

## 실행 방법

```bash
npm run dev
```

기본 포트는 `3000`이며, 브라우저에서 `http://127.0.0.1:3000`으로 접속하면 됩니다.

## 참고

- QR 생성과 리딩은 브라우저에서 CDN으로 로드한 라이브러리를 사용합니다.
- 리얼 카메라 벤치마킹은 실제 카메라 프레임을 반복 디코드해서 성공률과 평균 시간을 계산합니다.
- SmartThings TV 추출 기능은 서버에서 rpm payload를 읽어 TPK를 추출합니다.
- 현재 rpm payload는 xz / gzip / raw cpio 형식을 지원합니다.
