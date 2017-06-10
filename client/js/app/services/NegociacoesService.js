'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDAO', '../models/Negociacao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDAO, Negociacao, _createClass, NegociacoesService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDAO) {
            NegociacaoDAO = _daoNegociacaoDAO.NegociacaoDAO;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacoesService', NegociacoesService = function () {
                function NegociacoesService() {
                    _classCallCheck(this, NegociacoesService);

                    this._http = new HttpService();
                }

                _createClass(NegociacoesService, [{
                    key: 'obterNegociacoes',
                    value: function obterNegociacoes() {
                        return Promise.all([this._obterNegociacoesDaSemana(), this._obterNegociacoesDaSemanaAnterior(), this._obterNegociacoesDaSemanaRetrasada()]).then(function (negociacoes) {
                            return negociacoes.reduce(function (allNegociacoes, neg) {
                                return allNegociacoes.concat(neg);
                            }, []);
                        }).catch(function (error) {
                            throw new Error(error);
                        });
                    }
                }, {
                    key: '_obterNegociacoesDaSemana',
                    value: function _obterNegociacoesDaSemana() {
                        return this._http.get('negociacoes/semana').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível obter as negociações da semana');
                        });
                    }
                }, {
                    key: '_obterNegociacoesDaSemanaAnterior',
                    value: function _obterNegociacoesDaSemanaAnterior() {
                        return this._http.get('negociacoes/anterior').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível obter as negociações da semana');
                        });
                    }
                }, {
                    key: '_obterNegociacoesDaSemanaRetrasada',
                    value: function _obterNegociacoesDaSemanaRetrasada() {
                        return this._http.get('negociacoes/retrasada').then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível obter as negociações da semana');
                        });
                    }
                }, {
                    key: 'cadastra',
                    value: function cadastra(negociacao) {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negociação cadastrada com sucesso';
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível adicionar a negociação');
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível obter as negociações');
                        });
                    }
                }, {
                    key: 'apaga',
                    value: function apaga() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDAO(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).then(function () {
                            return 'Negociações apagadas com sucesso';
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível apagar as negociações');
                        });
                    }
                }, {
                    key: 'importa',
                    value: function importa(listaAtual) {
                        return this.obterNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return negociacao.isEquals(negociacaoExistente);
                                });
                            });
                        }).catch(function (error) {
                            console.log(error);
                            throw new Error('Não foi possível importar as negociações');
                        });
                    }
                }]);

                return NegociacoesService;
            }());

            _export('NegociacoesService', NegociacoesService);
        }
    };
});