import { AppDataSource } from './data-source';
import colors from 'colors';

(async () => {
    try {
        await AppDataSource.initialize();
        console.log(colors.green('database connected'));
    } catch (err) {
        console.log(colors.red('error connecting with database'), err);
    }
})();
