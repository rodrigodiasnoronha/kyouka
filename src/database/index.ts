import { connect } from 'mongoose';

const { DB_NAME, DB_USER, DB_PASS } = process.env;

export const databaseConnect = async () => {
    return await connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@fujiwarachikabot.dx1tg.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        { useUnifiedTopology: true, useNewUrlParser: true }
    );
};
