import { AppDataSource } from '../data-source';

import { GuildWelcomeEntity } from '../entities/GuildWelcomeEntity';

export const GuildWelcomeRepository = AppDataSource.getRepository(GuildWelcomeEntity).extend({
    // custom methods here...
});
