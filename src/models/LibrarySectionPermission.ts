import {
  DataTypes,
  Model,
  Optional,
  Association,
  ForeignKey,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin
} from 'sequelize';
import { sequelize } from '../config';
import User from './User';
import LibrarySection from './LibrarySection';

interface LibrarySectionPermissionAttributes {
  id: number;
  library_section_id: number;
  user_id: number;
  read: boolean;
  write: boolean;
  delete: boolean;
  admin: boolean;
}

interface LibrarySectionPermissionCreationAttributes extends Optional<LibrarySectionPermissionAttributes, 'id'> {}

class LibrarySectionPermission
  extends Model<LibrarySectionPermissionAttributes, LibrarySectionPermissionCreationAttributes>
  implements LibrarySectionPermissionAttributes
{
  declare id: number;
  declare library_section_id: ForeignKey<LibrarySection['id']>;
  declare user_id: ForeignKey<User['id']>;
  declare read: boolean;
  declare write: boolean;
  declare delete: boolean;
  declare admin: boolean;

  declare getLibrarySection: BelongsToGetAssociationMixin<LibrarySection>;
  declare setLibrarySection: BelongsToSetAssociationMixin<LibrarySection, number>;
  declare createLibrarySection: BelongsToCreateAssociationMixin<LibrarySection>;

  declare getUser: BelongsToGetAssociationMixin<User>;
  declare setUser: BelongsToSetAssociationMixin<User, number>;
  declare createUser: BelongsToCreateAssociationMixin<User>;

  declare readonly librarySection?: LibrarySection;
  declare readonly user?: User;

  declare static associations: {
    librarySection: Association<LibrarySectionPermission, LibrarySection>;
    user: Association<LibrarySectionPermission, User>;
  };
}

LibrarySectionPermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    library_section_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'library_sections',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    write: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'LibrarySectionPermission',
    tableName: 'library_section_permissions',
    timestamps: false
  }
);

export default LibrarySectionPermission;
