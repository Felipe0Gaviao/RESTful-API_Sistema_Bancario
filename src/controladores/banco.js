const fs = require('fs/promises')
const { format } = require('date-fns')

const receberBancoDeDados = async () => {
    try {
        const bancoDeDados = await fs.readFile('./src/bancodedados.js')

        const obj = JSON.parse(bancoDeDados.toString().slice(17))

        return obj
    } catch (erro) {
        return erro
    }
}

const modificarBancoDeDados = async(objeto) => {
    try {
        await fs.writeFile('./src/bancodedados.js', `module.exports = ${JSON.stringify(objeto)}`)
    } catch (erro) {
        return erro
    }
}

const acharConta = async (num) => {
    try {
        const obj = await receberBancoDeDados()

        const conta = obj.contas.find((c) => c.numero === num)

        return conta
    } catch (erro) {
        return erro
    }
}

const listar = async (req, res) => {
    const { senha_banco } = req.query

    try {
        const obj = await receberBancoDeDados()

        if (senha_banco === undefined) {
            return res.status(401).json({mensagem: 'Senha é necessária para acessar essa informação'})
        }
        
        if (senha_banco !== obj.banco.senha) {
            return res.status(401).json({mensagem: 'Senha do banco informada está incorreta'})
        }

        return res.status(200).json(obj.contas)
    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }
}

const criar = async (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body

    try {

        const obj = await receberBancoDeDados()

        obj.contas.push({
            numero: obj.contas.length > 0 ? String(Number(obj.contas[obj.contas.length-1].numero) + 1) : "1",
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
            })
        
        await modificarBancoDeDados(obj)

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }

    return res.status(204).send()

}

const atualizarDados = async (req, res) => {
    const { numeroConta } = req.params
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body

    try {

        const obj = await receberBancoDeDados()

        const conta = await acharConta(numeroConta)

        obj.contas.splice(obj.contas.indexOf(conta),1,{
            numero: numeroConta,
            saldo: conta.saldo,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }})
        
        await modificarBancoDeDados(obj)

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }

    return res.status(204).send()
}

const excluir = async (req, res) => {
    const { numeroConta } = req.params

    try {
        const obj = await receberBancoDeDados()

        const conta = await acharConta(numeroConta)

        if (conta.saldo !== 0) {
            return res.status(403).json({mensagem: 'A Conta só pode ser removida se o saldo for zero!'})
        }

        obj.contas.splice(obj.contas.indexOf(conta),1)

        await modificarBancoDeDados(obj)

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }

    return res.status(204).send()
}

const depositar = async (req, res) => {
    const {numero_conta, valor} = req.body

    try {
        const obj = await receberBancoDeDados()

        obj.contas.find((c) => c.numero === numero_conta).saldo += valor

        obj.depositos.push({
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta,
            valor
        })

        await modificarBancoDeDados(obj)

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }

    return res.status(204).send()
}

const sacar = async (req, res) => {
    const {numero_conta, valor} = req.body

    try {
        const obj = await receberBancoDeDados()

        const conta = await acharConta(numero_conta)

        if (valor > conta.saldo) {
            return res.status(403).json({mensagem: 'Você não tem saldo suficiente para executar essa ação'})
        }

        obj.contas.find((c) => c.numero === numero_conta).saldo -= valor

        obj.saques.push({
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta,
            valor
        })

        await modificarBancoDeDados(obj)

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }

    return res.status(204).send()
}

const transferir = async (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        const faltando = ['numero_conta_origem', 'numero_conta_destino', 'valor', 'senha'].filter((falta) => {
            return req.body[falta] === undefined || req.body[falta] === ''
        })

        return res.status(400).json({mensagem: `há campos faltando: ${faltando.slice(0,-1).join(', ') + ' e ' + faltando.slice(-1)}`})
    }

    try {
        const obj = await receberBancoDeDados()

        const conta_origem = await acharConta(numero_conta_origem) 

        if (!conta_origem) {
            return res.status(400).json({mensagem: 'Conta de Origem Não Existe'})
        }

        if (senha !== conta_origem.usuario.senha) {
            return res.status(401).json({mensagem: 'Conta de Destino Não Existe'})
        }

        if (valor > conta_origem.saldo) {
            return res.status(403).json({mensagem: 'Você não tem saldo suficiente para executar essa ação'})
        }

        const conta_destino = await acharConta(numero_conta_destino)

        if (!conta_destino) {
            return res.status(400).json({mensagem: 'Conta de Destino Não Existe'})
        }

        obj.contas.find((c) => c.numero === conta_origem.numero).saldo -= valor

        obj.contas.find((c) => c.numero === conta_destino.numero).saldo += valor

        obj.transferencias.push({
            data: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
            numero_conta_origem,
            numero_conta_destino,
            valor
        })

        await modificarBancoDeDados(obj)
        
    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }

    return res.status(204).send()
}

const consultarSaldo = async (req, res) => {
    const {numero_conta} =  req.query

    try {

        const conta = await acharConta(numero_conta)

        return res.status(200).json({saldo: conta.saldo})

    } catch (erro) {
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }
}

const emitirExtrato = async (req, res) => {
    const {numero_conta} =  req.query

    try {
        const obj = await receberBancoDeDados()

        const conta = await acharConta(numero_conta)

        return res.status(200).json({
            depositos: obj.depositos.filter((c) => c.numero_conta === conta.numero),
            saques: obj.saques.filter((c) => c.numero_conta === conta.numero),
            transferencias: obj.transferencias.filter((c) => [c.numero_conta_origem, c.numero_conta_destino].includes(conta.numero))
        })

    } catch (erro) {
        console.log(erro)
        return res.status(500).json({mensagem: 'Erro do servidor'})
    }
}

module.exports = {
    criar,
    listar,
    atualizarDados,
    excluir,
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    emitirExtrato
}