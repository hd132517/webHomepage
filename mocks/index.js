const isServer = typeof window === 'undefined';

if (isServer) {
    const { server } = require('./server');

    if (!server) {
        console.error('Server initialization failed in mocks/server.js.');
        throw new Error('Mock server is not defined.');
    }

    console.log('Starting server...');
    server.listen({
        onUnhandledRequest: 'warn',
    });
    console.log('Mock server running...');
} else {
    const { worker } = require('./browser');

    if (!worker) {
        console.error('Worker initialization failed in mocks/browser.js.');
        throw new Error('Mock worker is not defined.');
    }

    console.log('Starting worker...');
    worker.start({
        onUnhandledRequest: 'warn',
    });
    console.log('Mock worker running...');
}
