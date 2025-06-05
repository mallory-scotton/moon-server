import {
  DataTypes,
  Model,
  Optional,
  Association,
  BelongsToManyAddAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin
} from 'sequelize';
import { sequelize } from '../config';
import { TagType } from '../types';
import MetadataItem from './MetadataItem';

interface TagAttributes {
  id: number;
  tag_type: TagType;
  tag: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, 'id'> {}

class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes {
  declare id: number;
  declare tag_type: TagType;
  declare tag: string;

  declare getMetadataItems: BelongsToManyGetAssociationsMixin<MetadataItem>;
  declare addMetadataItem: BelongsToManyAddAssociationMixin<MetadataItem, number>;
  declare addMetadataItems: BelongsToManyAddAssociationsMixin<MetadataItem, number>;
  declare setMetadataItems: BelongsToManySetAssociationsMixin<MetadataItem, number>;
  declare removeMetadataItem: BelongsToManyRemoveAssociationMixin<MetadataItem, number>;
  declare removeMetadataItems: BelongsToManyRemoveAssociationsMixin<MetadataItem, number>;
  declare hasMetadataItem: BelongsToManyHasAssociationMixin<MetadataItem, number>;
  declare hasMetadataItems: BelongsToManyHasAssociationsMixin<MetadataItem, number>;
  declare countMetadataItems: BelongsToManyCountAssociationsMixin;
  declare createMetadataItem: BelongsToManyCreateAssociationMixin<MetadataItem>;

  declare readonly metadataItems?: MetadataItem[];

  declare static associations: {
    metadataItems: Association<Tag, MetadataItem>;
  };
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tag_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Tag',
    tableName: 'tags',
    timestamps: false
  }
);

export default Tag;
