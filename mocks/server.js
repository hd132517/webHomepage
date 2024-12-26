// mocks/server.js
import { setupServer } from 'msw'; // 최신 경로로 수정
import { handlers } from './handlers'; // 요청 핸들러 가져오기

if (!handlers || !Array.isArray(handlers)) {
    console.error("Handlers are not properly defined:", handlers);
    throw new Error("Handlers must be defined as an array.");
}

export const server = setupServer(...handlers);

console.log("Mock server initialized:", server);