# Tool Box

로컬에서 `npm run dev`로 실행하는 탭형 툴박스입니다.

## 기능

- AatroX 스타일(Dribbble 참고)의 미니멀 다크 대시보드 UI + 사이드 네비게이션
- 설정 패널: 언어(ko/en), 테마(다크/라이트/시스템)
- QR 도구
  - 생성 옵션: 사이즈, 오류 보정 레벨, 여백, 전경/배경 색상
  - 이미지 업로드 디코딩 + 카메라 실시간 디코딩
  - 벤치마킹 / 리얼 벤치마킹(기본 100회, 사용자 조절)
- Text Counter+
  - 글자수, 바이트수, 줄수, 공백 제외
  - 단어수, 문장수, 문단수, 예상 읽기 시간
- JSON Pretty Viewer
  - strict JSON
  - JSON fragment(`"name": "tool-box"`) 자동 보정
  - plain text(`hello`)도 JSON 문자열로 처리
- SmartThings TV 탭
  - 하위 탭: Extract tpk file from Cosmos URL
  - cosmos URL 입력 시 고정 repos 경로의 rpm 다운로드 및 `rpm2cpio`/`cpio` 추출 후 `com.samsung.tv.SmartThingsApp-*.tpk`를 다운로드 제공

## 실행

```bash
npm run dev
```

기본 포트 `3000`, 접속 `http://127.0.0.1:3000`.

## 참고

- QR 라이브러리는 CDN을 사용합니다.
- 카메라 기능과 리얼 벤치마킹은 브라우저 카메라 권한이 필요합니다.
- SmartThings 추출 API는 서버 실행 환경에 `rpm2cpio`, `cpio` 명령이 설치되어 있어야 동작합니다.
- Windows에서 서버를 CMD/PowerShell로 실행해도, WSL(Ubuntu)에 `rpm2cpio`, `cpio`가 설치되어 있으면 자동으로 WSL 명령을 사용해 추출을 진행합니다.

## SmartThings 추출 의존 명령어

```bash
# Ubuntu / Debian
sudo apt-get install rpm2cpio cpio

# Fedora / RHEL
sudo dnf install rpm-build cpio
```
