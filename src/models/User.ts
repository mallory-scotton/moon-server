import {
  DataTypes,
  Model,
  Optional,
  Association,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin
} from 'sequelize';
import { sequelize } from '../config';
import { LanguageCode } from '../types';
import LibrarySectionPermission from './LibrarySectionPermission';

interface UserAttributes {
  id: number;
  name: string;
  hashed_password: string | null;
  salt: string | null;
  default_audio_language: LanguageCode;
  default_subtitle_language: LanguageCode;
  auto_select_audio: boolean;
  auto_select_subtitle: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare name: string;
  declare hashed_password: string | null;
  declare salt: string | null;
  declare default_audio_language: LanguageCode;
  declare default_subtitle_language: LanguageCode;
  declare auto_select_audio: boolean;
  declare auto_select_subtitle: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare getLibrarySectionPermissions: HasManyGetAssociationsMixin<LibrarySectionPermission>;
  declare addLibrarySectionPermission: HasManyAddAssociationMixin<LibrarySectionPermission, number>;
  declare addLibrarySectionPermissions: HasManyAddAssociationsMixin<LibrarySectionPermission, number>;
  declare setLibrarySectionPermissions: HasManySetAssociationsMixin<LibrarySectionPermission, number>;
  declare removeLibrarySectionPermission: HasManyRemoveAssociationMixin<LibrarySectionPermission, number>;
  declare removeLibrarySectionPermissions: HasManyRemoveAssociationsMixin<LibrarySectionPermission, number>;
  declare hasLibrarySectionPermission: HasManyHasAssociationMixin<LibrarySectionPermission, number>;
  declare hasLibrarySectionPermissions: HasManyHasAssociationsMixin<LibrarySectionPermission, number>;
  declare countLibrarySectionPermissions: HasManyCountAssociationsMixin;
  declare createLibrarySectionPermission: HasManyCreateAssociationMixin<LibrarySectionPermission>;

  declare readonly librarySectionPermissions?: LibrarySectionPermission[];

  declare static associations: {
    librarySectionPermissions: Association<User, LibrarySectionPermission>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    default_audio_language: {
      type: DataTypes.ENUM(...Object.values(LanguageCode)),
      allowNull: false
    },
    default_subtitle_language: {
      type: DataTypes.ENUM(...Object.values(LanguageCode)),
      allowNull: false
    },
    auto_select_audio: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    auto_select_subtitle: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default User;
