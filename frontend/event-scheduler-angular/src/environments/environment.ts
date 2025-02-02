import packageJson from '../../package.json';
import { IEnvironment } from './env.types';

export const environment: IEnvironment = {
    production: true,
    apiUrl: 'http://localhost:8080',
    version: packageJson.version,
};
