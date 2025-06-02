const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

// Rota raiz para confirmar que a API está rodando
app.get('/', (req, res) => {
  res.send('API rodando! Use a rota /clientes para acessar os clientes.');
});

// Configuração do banco de dados
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'adimin', 
  database: 'tfretro'
});

// Testar conexão com o banco
db.getConnection((err, connection) => {
  if (err) {
    console.error('Erro de conexão com o banco:', err);
  } else {
    console.log('Conexão com o banco estabelecida.');
    connection.release();
  }
});

// Rota GET /clientes com filtros opcionais
app.get('/clientes', (req, res) => {
  const { nome, cidade, uf } = req.query;

  let sql = 'SELECT * FROM clientes WHERE 1=1';
  const params = [];

  if (nome) {
    sql += ' AND nome LIKE ?';
    params.push(`%${nome}%`);
  }

  if (cidade) {
    sql += ' AND cidade LIKE ?';
    params.push(`%${cidade}%`);
  }

  if (uf) {
    sql += ' AND uf = ?';
    params.push(uf);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
    res.status(200).json(results);
  });
});

// Rota POST /clientes para inserir um novo cliente com campos extras
app.post('/clientes', (req, res) => {
  const {
    nome,
    cidade,
    uf,
    data_nascimento,
    rg,
    cpf,
    telefone,
    endereco,
    numero,
    cep
  } = req.body;

  if (!nome || !cidade || !uf || !data_nascimento) {
    return res.status(400).json({ error: 'Nome, cidade, UF e data de nascimento são obrigatórios.' });
  }

  const sql = `
    INSERT INTO clientes 
    (nome, cidade, uf, data_nascimento, rg, cpf, telefone, endereco, numero, cep) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [nome, cidade, uf, data_nascimento, rg, cpf, telefone, endereco, numero, cep], (err, results) => {
    if (err) {
      console.error('Erro no banco:', err);
      return res.status(500).json({ error: 'Erro ao inserir cliente.', details: err.message });
    }

    res.status(201).json({ message: 'Cliente criado com sucesso', clienteId: results.insertId });
  });
});

// Rota DELETE /clientes/:id para deletar um cliente pelo ID
app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM clientes WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar cliente:', err);
      return res.status(500).json({ error: 'Erro ao deletar cliente.' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado.' });
    }

    res.status(200).json({ message: `Cliente com id ${id} deletado com sucesso.` });
  });
});

// Rodar o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});







  




  
  
