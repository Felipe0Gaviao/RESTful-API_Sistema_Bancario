const express = require('express');
const { verificarFaltando, verificarUnicos, verificarContaParam, verificarContaBody, verificarSenha, verificarTransacoesCampos, verificarSaldoExtrato } = require('./intermediarios');
const banco = require('./controladores/banco');

const rotas = express();

rotas.get('/contas', banco.listar)

rotas.post('/contas', verificarFaltando, verificarUnicos, banco.criar)

rotas.put('/contas/:numeroConta/usuario', verificarFaltando, verificarUnicos, verificarContaParam, banco.atualizarDados)

rotas.delete('/contas/:numeroConta', verificarContaParam, banco.excluir)

rotas.post('/transacoes/depositar', verificarTransacoesCampos, verificarContaBody, banco.depositar)

rotas.post('/transacoes/sacar', verificarTransacoesCampos , verificarContaBody, verificarSenha, banco.sacar)

rotas.post('/transacoes/transferir', banco.transferir)

rotas.get('/contas/saldo', verificarSaldoExtrato, banco.consultarSaldo)

rotas.get('/contas/extrato', verificarSaldoExtrato, banco.emitirExtrato)

module.exports = rotas;