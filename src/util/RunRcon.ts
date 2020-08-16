import { Rcon } from 'rcon-client';

import { Config } from '../types/Config';
import { CommitData } from '../types/CommitData';

export const RunRcon = async (commits: CommitData[], conf: Config['rcon']): Promise<void> => {
    try {
        const rcon = await Rcon.connect({
            host: conf.host,
            port: conf.port,
            password: conf.password
        });

        const json: { [key: string]: unknown }[] = [
            { text: '' },
            { text: 'Datapackに更新がありました\\n', bold: true },
            { text: 'Commits: ' }
        ];

        for (const commit of commits) {
            json.push({
                text: commit.id,
                color: '#0077cc',
                clickEvent: { action: 'open_url', value: commit.url },
                hoverEvent: { action: 'show_text', contents: `${commit.message} - ${commit.name}` }
            });
            json.push({ text: ' ' });
        }

        await rcon.send(`tellraw @a ${JSON.stringify(json)}`);
        await rcon.end();
    }
    catch {
        console.error('サーバーに接続できませんでした');
    }
};
