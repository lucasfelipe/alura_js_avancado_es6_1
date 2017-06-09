class NegociacoesService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {
        return Promise.all([
            this._obterNegociacoesDaSemana(),
            this._obterNegociacoesDaSemanaAnterior(),
            this._obterNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes => {
            return negociacoes.reduce((allNegociacoes, neg) =>
                allNegociacoes.concat(neg), []);
        }).catch(error => { throw new Error(error); });
    }

    _obterNegociacoesDaSemana() {
        return this._http.get('negociacoes/semana')
            .then(negociacoes => {
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data),
                        objeto.quantidade,
                        objeto.valor));
            }).catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana');
            });
    }

    _obterNegociacoesDaSemanaAnterior() {
        return this._http.get('negociacoes/anterior')
            .then(negociacoes => {
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data),
                        objeto.quantidade,
                        objeto.valor));
            }).catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana');
            });


    }

    _obterNegociacoesDaSemanaRetrasada() {
        return this._http.get('negociacoes/retrasada')
            .then(negociacoes => {
                return negociacoes.map(objeto =>
                    new Negociacao(new Date(objeto.data),
                        objeto.quantidade,
                        objeto.valor));
            }).catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociações da semana');
            });

    }

    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação cadastrada com sucesso')
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível adicionar a negociação')
            });
    }

    lista() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.listaTodos())
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível obter as negociações');
            });
    }

    apaga() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDAO(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(error => {
                console.log(error);
                throw new Error('Não foi possível apagar as negociações');
            });
    }

    importa(listaAtual) {
        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                    !listaAtual.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)))
            ).catch(error => {
                console.log(error);
                throw new Error('Não foi possível importar as negociações');
            });
    }
}