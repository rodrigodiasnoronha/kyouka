import { connect } from 'mongoose';

const { DATABASE_URL = '' } = process.env;

async () => {
    try {
        await connect(DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (error) {
        console.log(`Erro ao conectar ao banco de dados: ${error}`);
    }
};
