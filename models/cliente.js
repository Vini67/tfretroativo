const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  rg: DataTypes.STRING,
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefone: DataTypes.STRING,
  endereco: DataTypes.STRING,
  numero: DataTypes.STRING,
  cidade: DataTypes.STRING,
  uf: DataTypes.STRING,
  cep: DataTypes.STRING
}, {
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente;
