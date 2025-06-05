import { Sequelize } from 'sequelize';
import { getDatabasePath } from '../utils';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: getDatabasePath()
});
