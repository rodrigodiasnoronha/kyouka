import { AppDataSource } from '../data-source';

import { GuildEntity } from '../entities/GuildEntity';

export const GuildRepository = AppDataSource.getRepository(GuildEntity).extend({
    // custom methods here...
});
