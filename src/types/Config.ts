export type Config = {
    serverPort: number;
    repositoryPath: string;
    github: {
        repositoryName: string;
        secretKey: string;
    };
    rcon: {
        host: string;
        port: number;
        password: string;
    };
};
