const Cliente = require('../models/cliente');

// Criar cliente
exports.createCliente = async (req, res) => {
  try {
    const { nome, data_nascimento, rg, cpf, telefone, endereco, numero, cidade, uf, cep } = req.body;

    if (!nome || nome.trim() === '') {
      return res.status(400).json({ error: 'O campo nome é obrigatório.' });
    }

    // Validações básicas (pode melhorar)
    const cpfRegex = /^\d{11}$/;
    if (!cpf || !cpfRegex.test(cpf)) {
      return res.status(400).json({ error: 'CPF inválido. Deve conter 11 números.' });
    }

    const clienteExistente = await Cliente.findOne({ where: { cpf } });
    if (clienteExistente) {
      return res.status(400).json({ error: 'CPF já cadastrado.' });
    }

    const novoCliente = await Cliente.create({
      nome, data_nascimento, rg, cpf, telefone, endereco, numero, cidade, uf, cep
    });

    res.status(201).json(novoCliente);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

// Buscar cliente por código
exports.getClienteById = async (req, res) => {
  try {
    const { codigo } = req.params;
    const cliente = await Cliente.findByPk(codigo);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

// Listar clientes com filtros
exports.listClientes = async (req, res) => {
  try {
    const { nome, cidade, uf } = req.query;
    const where = {};

    if (nome) where.nome = { [require('sequelize').Op.like]: `%${nome}%` };
    if (cidade) where.cidade = { [require('sequelize').Op.like]: `%${cidade}%` };
    if (uf) where.uf = uf;

    const clientes = await Cliente.findAll({ where });
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

// Atualizar cliente
exports.updateCliente = async (req, res) => {
  try {
    const { codigo } = req.params;
    const dadosAtualizados = req.body;

    const cliente = await Cliente.findByPk(codigo);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    if (dadosAtualizados.cpf && dadosAtualizados.cpf !== cliente.cpf) {
      const cpfExistente = await Cliente.findOne({ where: { cpf: dadosAtualizados.cpf } });
      if (cpfExistente) {
        return res.status(400).json({ error: 'CPF já cadastrado para outro cliente.' });
      }
    }

    await cliente.update(dadosAtualizados);
    res.status(200).json(cliente);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

// Excluir cliente
exports.deleteCliente = async (req, res) => {
  try {
    const { codigo } = req.params;
    const cliente = await Cliente.findByPk(codigo);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }
    await cliente.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};
