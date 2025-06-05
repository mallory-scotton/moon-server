import {
  DataTypes,
  Model,
  Optional,
  ForeignKey,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Association
} from 'sequelize';
import { sequelize } from '../config';
import Tag from './Tag';
import MetadataItem from './MetadataItem';

interface TaggingAttributes {
  id: number;
  tag_id: number;
  metadata_item_id: number;
  created_at?: Date;
  updated_at?: Date;
}

interface TaggingCreationAttributes extends Optional<TaggingAttributes, 'id'> {}

class Tagging extends Model<TaggingAttributes, TaggingCreationAttributes> implements TaggingAttributes {
  declare id: number;
  declare tag_id: ForeignKey<Tag['id']>;
  declare metadata_item_id: ForeignKey<MetadataItem['id']>;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare getTag: BelongsToGetAssociationMixin<Tag>;
  declare setTag: BelongsToSetAssociationMixin<Tag, number>;
  declare createTag: BelongsToCreateAssociationMixin<Tag>;

  declare getMetadataItem: BelongsToGetAssociationMixin<MetadataItem>;
  declare setMetadataItem: BelongsToSetAssociationMixin<MetadataItem, number>;
  declare createMetadataItem: BelongsToCreateAssociationMixin<MetadataItem>;

  declare readonly metadataItem?: MetadataItem;
  declare readonly tag?: Tag;

  declare static associations: {
    metadataItem: Association<Tagging, MetadataItem>;
    tag: Association<Tagging, Tag>;
  };
}

Tagging.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id'
      }
    },
    metadata_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'metadata_items',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Tagging',
    tableName: 'taggings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['tag_id', 'metadata_item_id']
      }
    ]
  }
);

export default Tagging;
