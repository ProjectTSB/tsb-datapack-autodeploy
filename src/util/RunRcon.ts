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
            { text: 'Datapackに更新がありました\n', bold: true },
            { text: '最新: ' },
            {
                text: commits[0].id,
                color: '#0077cc',
                italic: true,
                clickEvent: { action: 'open_url', value: commits[0].url },
                hoverEvent: { action: 'show_text', contents: `${commits[0].message} - ${commits[0].name}` }
            }
        ];

        if (commits.length > 1) {
            json.push(
                {
                    text: `\n他${commits.length - 1}件のコミット`,
                    color: '#aaaaaa'
                }
            );
        }

        await rcon.send(`tellraw @a ${JSON.stringify(json)}`);
        await rcon.send('minecraft:reload');
        await rcon.end();
    }
    catch {
        console.error('サーバーに接続できませんでした');
    }
};
