import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import http from 'http';
import createHandler from 'github-webhook-handler';
import git from 'simple-git';

import { Config } from './types/Config';
import { PushEvent } from './types/GitHub';
import { CommitData } from './types/CommitData';
import { RunRcon } from './util/RunRcon';

const conf: Config = yaml.load(readFileSync('config.yaml', 'utf-8'));

const handler = createHandler({
    path: '/',
    secret: conf.github.secretKey
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

handler.on('push', async (ev: PushEvent) => {
    const payload = ev.payload;
    const repoName = payload.repository.name;
    const branch = payload.ref.split('/').pop();

    if (repoName === conf.github.repositoryName && branch === 'master') {
        const commits: CommitData[] = ev.payload.commits.map(x => {
            return {
                name: x.committer.username,
                id: x.id.slice(0, 7),
                url: x.url,
                message: x.message
            };
        });

        await git(conf.repositoryPath).pull();
        await RunRcon(commits, conf.rcon);
    }
});
