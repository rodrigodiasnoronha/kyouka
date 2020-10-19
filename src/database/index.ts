import { connect } from 'mongoose';

const { DB_NAME, DB_USER, DB_PASS } = process.env;

export const databaseConnect = async () => {
    connect(
        `mongodb+srv://${DB_USER}:${DB_PASS}@fujiwarachikabot.dx1tg.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        { useUnifiedTopology: true, useNewUrlParser: true }
    )
        .then(() => {})
        .catch((err) =>
            console.log(`erro ao conectar ao banco de dados: ${err}`)
        );
};
