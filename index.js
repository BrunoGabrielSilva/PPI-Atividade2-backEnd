import PacoteViagem from './Model/pacote-viagem.js';


const pacote = new PacoteViagem( 'Paris', 
                                '2025-12-13', 
                                10000, 
                                'Paris ratatouille',
                            );
                            

/*                               
pacote.excluir().then(() => {
    console.log('Pacote excluído com sucesso!');
}).catch((erro) => {
    console.log('Erro ao excluir pacote: ' + erro);
});

pacote.buscarTodos().then((pacotes) => {        
    for (const pacote of pacotes) {
        console.log(pacote.toJSON());
    }
});

pacote.gravar().then(() => {
    console.log('Pacote gravado com sucesso!');
}).catch((erro) => {
    console.log('Erro ao gravar pacote: ' + error);
});

pacote.id = 1;
pacote.alterar().then(() => {
    console.log('INDEX: Pacote alterado com sucesso!');
}).catch((erro) => {
    console.log('Erro ao alterar pacote: ' + erro);
});

*/


