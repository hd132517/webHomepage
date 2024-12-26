const { rest } = require('msw');
if (!rest) { throw new Error('Failed to import "rest" from "msw".'); }

let users = [];
let messages = {};
let events = [];

export const handlers = [
    rest.get('/api/hello', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: 'Hello, world!' }));
    }),

    // 사용자 목록 업데이트
    rest.get('/api/users', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(users));
    }),

    // 사용자 추가
    rest.post('/api/users', async (req, res, ctx) => {
        const { username } = await req.json();
        users.push(username);
        return res(ctx.status(201), ctx.json({ success: true }));
     }),

    // 메시지 전송
    rest.post('/api/messages', async (req, res, ctx) => {
        const { room, sender, content, fileName, type } = await req.json();
        if (!messages[room]) messages[room] = [];
        messages[room].push({ sender, content, fileName, type });
        return res(ctx.status(201));
    }),

    // 메시지 가져오기
    rest.get('/api/messages', (req, res, ctx) => {
        const room = req.url.searchParams.get('room');
        return res(ctx.json(messages[room] || []));
    }),

    // 일정 추가
    rest.post('/api/events', async (req, res, ctx) => {
        const newEvent = await req.json();
        events.push(newEvent);
        return res(ctx.status(201));
    }),

    // 일정 가져오기
    rest.get('/api/events', (req, res, ctx) => {
       return res(ctx.json(events));
    }),
];