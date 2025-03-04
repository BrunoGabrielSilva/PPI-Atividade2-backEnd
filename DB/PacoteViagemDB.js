import conectar from './conexao.js';
import PacoteViagem from '../Model/pacote-viagem.js';

export default class PacoteDB {
    constructor() {
        this.init();
    }

    async init() {
        const conexao = await conectar();
        try {
            const sql = `CREATE TABLE IF NOT EXISTS PacoteViagem (
                id INT AUTO_INCREMENT PRIMARY KEY,
                destino VARCHAR(100) NOT NULL,
                dataPartida DATE NOT NULL,
                preco DECIMAL(10, 2) NOT NULL,
                descricao TEXT  
            )`;
            await conexao.execute(sql);
            console.log('INIT: Tabela Pacote Viagem criada ou já existe!');
        } catch (error) {
            console.log('Erro ao criar tabela PacoteViagem:', error);
        } finally {
            conexao.release(); 
        }
    }

    async gravar(pacote) {
        if (pacote instanceof PacoteViagem) {
            const conexao = await conectar();
            try {
                const sql = `INSERT INTO PacoteViagem (destino, dataPartida, preco, descricao) 
                             VALUES (?, ?, ?, ?)`;
                const values = [
                    pacote.destino,
                    pacote.dataPartida,
                    pacote.preco,
                    pacote.descricao,
                ];
                await conexao.execute(sql, values);
                console.log('Pacote gravado no BD com sucesso!');
            } catch (error) {
                console.log('Erro ao gravar o pacote:', error);
                throw error;
            } finally {
                conexao.release(); 
            }
        } else {
            console.error('Objeto informado não é uma instância de PacoteViagem.');
        }
    }

    async alterar(pacote) {
        const conexao = await conectar();
    
        try {
            const sql = `
                UPDATE PacoteViagem SET
                    destino = COALESCE(?, destino), 
                    dataPartida = COALESCE(?, dataPartida), 
                    preco = COALESCE(?, preco), 
                    descricao = COALESCE(?, descricao)
                WHERE id = ?
            `;
            const parametros = [
                pacote.destino,
                pacote.dataPartida,
                pacote.preco,
                pacote.descricao,
                pacote.id 
            ];
    
            const [resultado] = await conexao.execute(sql, parametros);
    
            if (resultado.affectedRows > 0) {
                console.log('DB: Pacote alterado com sucesso!');
            } else {
                console.log('Nenhum pacote foi encontrado para alterar.');
            }
        } catch (error) {
            console.error('Erro ao alterar o pacote:', error);
            throw error;
        } finally {
            if (conexao.release) {
                conexao.release();
            }
        }
    }
    

    async excluir() {
        const conexao = await conectar();
        try {
            const sql = `DELETE FROM PacoteViagem ORDER BY id DESC LIMIT 1`;
            await conexao.execute(sql);
            console.log('Último pacote excluído com sucesso!');
        } catch (error) {
            console.log('Erro ao excluir o pacote:', error);
            throw error;
        } finally {
            conexao.release();
        }
    }

    async buscarTodos() {
        const conexao = await conectar(); // Obtém conexão com o banco
        try {
            const sql = `SELECT * FROM pacoteviagem ORDER BY id`; // Consulta SQL
            const [linhas] = await conexao.execute(sql); // Executa a consulta e obtém os resultados
    
            // Verifica se há resultados na consulta
            if (!linhas || linhas.length === 0) {
                console.log('Nenhum pacote encontrado no banco de dados.');
                return []; // Retorna um array vazio
            }
    
            // Inicializa um array para armazenar os pacotes
            const pacotes = [];
            for (const linha of linhas) {
                const pacote = new PacoteViagem(
                    linha.destino,
                    linha.dataPartida,
                    linha.preco,
                    linha.descricao
                );
                pacote.id = linha.id; // Define o ID do pacote
                pacotes.push(pacote); // Adiciona o pacote ao array
            }
    
            // Retorna o array com os pacotes encontrados
            return pacotes;
        } catch (error) {
            console.error('Erro ao buscar todos os pacotes:', error);
            throw error; // Propaga o erro para o chamador
        } finally {
            if (conexao.release) {
                conexao.release(); // Libera a conexão de volta ao pool
            }
        }
    }
 
}