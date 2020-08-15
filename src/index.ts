import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import http from 'http';
import createHandler from 'github-webhook-handler';
import { exec } from 'child_process';

import { Config } from './types/Config';
import { PushEvent } from './types/GitHub';

const conf: Config = yaml.load(readFileSync('config.yaml', 'utf-8'));

const handler = createHandler({
    path: '/',
    secret: conf.secretKey
});

http.createServer((req, res) => {
    handler(req, res, () => {
        res.statusCode = 404;
        res.end('404 Not Found');
        console.log('404');
    });
}).listen(conf.serverPort);

handler.on('error', err => {
    console.error('Error:', err.message);
});

handler.on('push', (ev: PushEvent) => {
    const payload = ev.payload;
    const repoName = payload.repository.name;
    const branch = payload.ref.split('/').pop();

    if (repoName === conf.repositoryName && branch === 'master') {
        const commits = ev.payload.commits.map(x => {
            return {
                name: x.committer.username,
                id: x.id.slice(0, 7),
                url: x.url,
                message: x.message
            };
        });
        exec(`${conf.scriptPath} '${JSON.stringify(commits)}'`);
        console.log(JSON.stringify(commits));
    }
});
