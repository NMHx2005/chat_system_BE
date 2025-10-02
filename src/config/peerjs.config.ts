import { ExpressPeerServer } from 'peer';

export const createPeerServer = (server: any): any => {
    // Configure SSL only if both key and cert are provided
    const sslKey = process.env.SSL_KEY_PATH;
    const sslCert = process.env.SSL_CERT_PATH;
    const sslConfig = (process.env.NODE_ENV === 'production' && sslKey && sslCert)
        ? { key: sslKey, cert: sslCert }
        : undefined;

    const peerServer = ExpressPeerServer(server, {
        path: '/peerjs',
        proxied: true,
        allow_discovery: true,
        ...(sslConfig && { ssl: sslConfig })
    });

    // Handle peer server events
    peerServer.on('connection', (client) => {
        console.log('Peer connected:', client.getId());
    });

    peerServer.on('disconnect', (client) => {
        console.log('Peer disconnected:', client.getId());
    });

    return peerServer;
};
