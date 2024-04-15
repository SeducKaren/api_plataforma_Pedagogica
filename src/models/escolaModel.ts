import { Pool } from "pg";

class EscolaModel {
  static pool = new Pool({
    ssl: {
      rejectUnauthorized: false,
    },
    connectionString: process.env.DATABASE_URL,
  });

  codigo_inep: string;
  escola: string;
  sigla: string;
  zona_de_localidade: string;
  cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  municipio: string;
  estado: string;
  telefone1: string;
  telefone2: string;
  email: string;
  ano_do_aluno: string;
  curso: string;
  serie: string;
  quantidades_de_aluno: number | undefined;

  constructor(data: any) {
    this.codigo_inep = data.codigo_inep || "";
    this.escola = data.escola || "";
    this.sigla = data.sigla || "";
    this.zona_de_localidade = data.zona_de_localidade || "";
    this.cnpj = data.cnpj || "";
    this.cep = data.cep || "";
    this.endereco = data.endereco || "";
    this.numero = data.numero || "";
    this.complemento = data.complemento || "";
    this.municipio = data.municipio || "";
    this.estado = data.estado || "";
    this.telefone1 = data.telefone1 || "";
    this.telefone2 = data.telefone2 || "";
    this.email = data.email || "";
    this.ano_do_aluno = data.ano_do_aluno || "";
    this.curso = data.curso || "";
    this.serie = data.serie || "";
    this.quantidades_de_aluno = data.quantidades_de_aluno || undefined;
  }

  static async findByCodigoInep(codigoInep: string): Promise<EscolaModel | undefined> {
    try {
      const result = await this.pool.query("SELECT * FROM escola WHERE codigo_inep = $1", [codigoInep]);
      return result.rows[0] ? new EscolaModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar escola por código INEP:", error);
      throw error;
    }
  }

  static async findAll(): Promise<EscolaModel[]> {
    try {
      const result = await this.pool.query("SELECT * FROM escola");
      return result.rows.map((data: any) => new EscolaModel(data));
    } catch (error) {
      console.error("Erro ao buscar todas as escolas:", error);
      throw error;
    }
  }

  async save(): Promise<EscolaModel> {
    try {
      const result = await EscolaModel.pool.query(
        `INSERT INTO escola (
          codigo_inep,
          escola,
          sigla,
          zona_de_localidade,
          cnpj,
          cep,
          endereco,
          numero,
          complemento,
          municipio,
          estado,
          telefone1,
          telefone2,
          email,
          ano_do_aluno,
          curso,
          serie,
          quantidades_de_aluno
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        RETURNING *`,
        [
          this.codigo_inep,
          this.escola,
          this.sigla,
          this.zona_de_localidade,
          this.cnpj,
          this.cep,
          this.endereco,
          this.numero,
          this.complemento,
          this.municipio,
          this.estado,
          this.telefone1,
          this.telefone2,
          this.email,
          this.ano_do_aluno,
          this.curso,
          this.serie,
          this.quantidades_de_aluno,
        ]
      );
      return new EscolaModel(result.rows[0]);
    } catch (error) {
      console.error("Erro ao salvar nova escola:", error);
      throw error;
    }
  }

  async update(): Promise<void> {
    try {
      await EscolaModel.pool.query(
        `UPDATE escola
        SET
          escola = $1,
          sigla = $2,
          zona_de_localidade = $3,
          cnpj = $4,
          cep = $5,
          endereco = $6,
          numero = $7,
          complemento = $8,
          municipio = $9,
          estado = $10,
          telefone1 = $11,
          telefone2 = $12,
          email = $13,
          ano_do_aluno = $14,
          curso = $15,
          serie = $16,
          quantidades_de_aluno = $17
        WHERE codigo_inep = $18`,
        [
          this.escola,
          this.sigla,
          this.zona_de_localidade,
          this.cnpj,
          this.cep,
          this.endereco,
          this.numero,
          this.complemento,
          this.municipio,
          this.estado,
          this.telefone1,
          this.telefone2,
          this.email,
          this.ano_do_aluno,
          this.curso,
          this.serie,
          this.quantidades_de_aluno,
          this.codigo_inep,
        ]
      );
    } catch (error) {
      console.error("Erro ao atualizar escola por código INEP:", error);
      throw error;
    }
  }

  static async deleteByCodigoInep(codigoInep: string): Promise<void> {
    try {
      await this.pool.query("DELETE FROM escola WHERE codigo_inep = $1", [codigoInep]);
    } catch (error) {
      console.error("Erro ao excluir escola por código INEP:", error);
      throw error;
    }
  }

  static async findByNome(nome: string): Promise<EscolaModel | undefined> {
    try {
      // Certifique-se de que o parâmetro esteja em minúsculas para corresponder ao banco de dados
      const nomeLowercase = nome.toLowerCase();
      
      // Use ILIKE para uma correspondência de caso insensitivo
      const result = await this.pool.query("SELECT * FROM escola WHERE LOWER(escola) LIKE $1", [`%${nomeLowercase}%`]);
      
      return result.rows[0] ? new EscolaModel(result.rows[0]) : undefined;
    } catch (error) {
      console.error("Erro ao buscar escola por nome:", error);
      throw error;
    }
  }
}

export default EscolaModel;
