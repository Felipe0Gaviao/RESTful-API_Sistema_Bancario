const { contas } = require('./bancodedados')

const verificarFaltando = (req, res, next) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        const faltando = ['nome', 'cpf', 'data_nascimento', 'telefone', 'email', 'senha'].filter((falta) => {
            return req.body[falta] === undefined || req.body[falta] === ''
        })

        return res.status(400).json({mensagem: `há campos faltando: ${faltando.slice(0,-1).join(', ') + ' e ' + faltando.slice(-1)}`})
    }

    next()
}

const verificarUnicos = (req, res, next) => {
    const {cpf, email} = req.body

    if (contas.find((conta) => conta.usuario.cpf === cpf)) {
        return res.status(403).json({mensagem: 'Já existe uma conta com o cpf informado!'})
    }

    if (contas.find((conta) => conta.usuario.email === email)) {
        return res.status(403).json({mensagem: 'Já existe uma conta com o e-mail informado!'})
    }

    next()
}

const verificarContaParam = (req, res, next) => {
    const { numeroConta } = req.params

    if(!(contas.find((conta) => conta.numero === numeroConta))) {
        return res.status(404).json({ mensagem: 'Não existe uma conta nesse número'})
    }

    next()
}

const verificarContaBody = (req, res, next) => {
    const {numero_conta} = req.body

    if(!(contas.find((conta) => conta.numero === numero_conta))) {
        return res.status(404).json({ mensagem: 'Não existe uma conta nesse número'})
    }

    next()
}

const verificarSenha = (req, res, next) => {
    const {numero_conta, senha} = req.body

    if (senha === undefined) {
        res.status(401).json({mensagem: 'Senha é obrigatória'})
    }

    const conta = contas.find((c) => c.numero === numero_conta)

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({mensagem: 'Senha Incorreta'})
    }

    next()
}

const verificarTransacoesCampos = (req, res, next) => {
    const {numero_conta, valor} = req.body

    if (!numero_conta || !valor) {
        const faltando = ['numero_conta','valor'].filter((falta) => {
            return req.body[falta] === undefined || req.body[falta] === ''
        })

        return res.status(400).json({mensagem: `há campos faltando: ${faltando.join(' e ')}`})
    }

    next()
}

const verificarSaldoExtrato = (req, res, next) => {
    const {numero_conta, senha} =  req.query

    const conta = contas.find((conta) => numero_conta === conta.numero)

    if (!conta) {
        return res.status(400).json({mensagem: 'Conta bancária não encontrada'})
    }

    if (senha !== conta.usuario.senha) {
        return res.status(401).json({mensagem: 'Senha incorreta!'})
    }

    next()
}

module.exports = {
    verificarFaltando,
    verificarUnicos,
    verificarContaParam,
    verificarTransacoesCampos,
    verificarContaBody,
    verificarSenha,
    verificarSaldoExtrato
};