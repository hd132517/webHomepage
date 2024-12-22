# 캘린더 및 1:1 채팅 애플리케이션

## 개요

이 프로젝트는 **캘린더 일정 관리**와 **1:1 실시간 채팅** 기능을 제공하는 웹 애플리케이션입니다.  
캘린더에서는 일정 등록, 수정, 삭제 및 조회 기능을 제공합니다.  
채팅에서는 실시간으로 로그인 중인 사용자를 확인하고, 1:1로 대화할 수 있습니다.

## 주요 기능

### 캘린더
- **일정 등록**: 이름, 제목, 기간을 입력하여 일정을 추가.
- **일정 조회**: 캘린더와 별도로 날짜를 클릭하면 해당 날짜의 일정 표시.
- **일정 수정 및 삭제**: 등록된 일정을 선택하여 수정하거나 삭제 가능.
- **기간 설정**: 일정의 시작일과 종료일 지정 가능.
- **일정 표시**: 등록된 일정이 캘린더에 표시됨.

### 채팅
- **실시간 사용자 목록**: 로그인 중인 사용자를 확인 가능.
- **1:1 채팅**: 사용자 선택 후 1:1 실시간 대화.
- **파일 전송**: 텍스트뿐만 아니라 파일도 전송 가능.
- **확장성 있는 데이터 구조**: 채팅 메시지는 JSON 형식으로 구조화되어 다양한 형식 지원.

## 기술 스택

### 프론트엔드
- **React**: UI 구성.
- **react-calendar**: 캘린더 UI 구현.
- **CSS Modules**: 컴포넌트 단위 스타일링.

### 백엔드
- **Node.js**: 서버 구축.
- **Socket.IO**: 실시간 통신 구현.

### 개발 환경
- **Docker**: 애플리케이션 실행 환경 컨테이너화.
- **Docker Compose**: 멀티 컨테이너 관리.

## 프로젝트 실행 방법

### 1. 도커 설치
프로젝트 실행을 위해 Docker와 Docker Compose가 필요합니다.  
[Docker 공식 사이트](https://www.docker.com/)에서 설치하세요.

### 2. 프로젝트 클론
```bash
git clone <프로젝트 URL>
cd <프로젝트 디렉토리>