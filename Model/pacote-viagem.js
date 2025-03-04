import PacoteDB from '../DB/pacoteViagemDB.js';

export default class PacoteViagem {
    destino; 
    dataPartida;
    preco;
    descricao;
    id;

    constructor(destino, dataPartida, preco, descricao) {
        this.destino = destino;
        this.dataPartida = dataPartida;
        this.preco = preco;
        this.descricao = descricao;
    }

    
    get destino() {
        return this.destino;
    }
    set destino(NovoDestino) {
        this.destino = NovoDestino;
    }

    get dataPartida() {
        return this.dataPartida;
    }
    set dataPartida(NovaDataPartida) {
        this.dataPartida = NovaDataPartida;
    }

    get preco() {
        return this.preco;
    }
    set preco(NovoPreco) {
        this.preco = NovoPreco;
    }

    get descricao() {
        return this.descricao;
    }
    set descricao(NovaDescricao) {
        this.descricao = NovaDescricao;
    }

    toJSON() {
        return {
            id: this.id, 
            destino: this.destino,
            dataPartida: this.dataPartida,
            preco: this.preco,
            descricao: this.descricao,
        };
    }

    
    async gravar() {
        try {
            const PctDB = new PacoteDB();
            await PctDB.gravar(this); 
            console.log('Pacote gravado com sucesso!');
        } catch (error) {
            console.error('Erro ao gravar o pacote:', error);
        }
    }

    async alterar() {
        try {
            const PctDB = new PacoteDB();
            await PctDB.alterar(this);
            console.log('MODEL: Pacote alterado com sucesso!');
        } catch (error) {
            console.error('Erro ao alterar o pacote:', error);
        }
    }

    async excluir() {
        try {
            const PctDB = new PacoteDB();
            await PctDB.excluir(); 
            console.log('Ultimo pacote excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir o pacote:', error);
        }
    }

    async buscarTodos() {
        try {
            const PctDB = new PacoteDB();
            const pacotes = await PctDB.buscarTodos();
            return pacotes; 
        } catch (error) {
            console.error('Erro ao buscar todos os pacotes:', error);
            throw error; 
        }
    }
}
