import { Pool } from 'pg';

class GabaritoProvasModel {
    static pool: Pool;

    static initialize() {
        GabaritoProvasModel.pool = new Pool({
            ssl: {
                rejectUnauthorized: false,
            },
            connectionString: process.env.DATABASE_URL,
        });
    }

    static async getAll(): Promise<GabaritoProvas[]> {
        const result = await GabaritoProvasModel.pool.query('SELECT * FROM gabarito_provas');
        return result.rows;
    }

    static async getByNivel(prova_nivel: string): Promise<GabaritoProvas | null> {
        const result = await GabaritoProvasModel.pool.query('SELECT * FROM gabarito_provas WHERE prova_nivel = $1', [prova_nivel]);
        return result.rows[0] || null;
    }

    static async create(gabaritoProvas: GabaritoProvas): Promise<void> {
        //Pensando em colocar o número max de questão e o front exclui os null
        await GabaritoProvasModel.pool.query('INSERT INTO gabarito_provas VALUES ()',
            [
            
            ]);
    }

    static async updateByMatricula(numeroMatricula: string, gabaritoProvas: GabaritoProvas): Promise<void> {
        await GabaritoProvasModel.pool.query('UPDATE gabaritos_provas SET ',
            [
            ]);
    }

    static async deleteByMatricula(nivel_prova: string): Promise<void> {
        await GabaritoProvasModel.pool.query('DELETE FROM gabarito_provas WHERE nivel_prova = $1', [nivel_prova]);
    }
}

GabaritoProvasModel.initialize();

export interface GabaritoProvas {
    id?: number;
    data: Date;
    nivel_prova: number;
    respostas_lingua_portuguesa: string[];
    respostas_matematica: string[];
    dificuldade_lingua_portuguesa: string[];
    dificuldade_matematica: string[];
}

export default GabaritoProvasModel;
