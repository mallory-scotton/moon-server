import { DataTypes, Model, Optional, Association, ForeignKey, BelongsToGetAssociationMixin } from 'sequelize';
import { sequelize } from '../config';
import Directory from './Directory';
import MediaItem from './MediaItem';

interface MediaPartAttributes {
  id: number;
  media_item_id: number;
  directory_id: number;
  hash: string;
  open_subtitle_hash: string;
  file: string;
  size: number;
  duration: number;
  extra_data: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

interface MediaPartCreationAttributes extends Optional<MediaPartAttributes, 'id'> {}

class MediaPart extends Model<MediaPartAttributes, MediaPartCreationAttributes> implements MediaPartAttributes {
  declare id: number;
  declare media_item_id: ForeignKey<MediaItem['id']>;
  declare directory_id: ForeignKey<Directory['id']>;
  declare hash: string;
  declare open_subtitle_hash: string;
  declare file: string;
  declare size: number;
  declare duration: number;
  declare extra_data: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
  declare readonly deleted_at: Date;

  declare getMediaItem: BelongsToGetAssociationMixin<MediaItem>;

  declare getDirectory: BelongsToGetAssociationMixin<Directory>;

  declare readonly mediaItem?: MediaItem;
  declare readonly directory?: Directory;

  declare static associations: {
    mediaItem: Association<MediaPart, MediaItem>;
    directory: Association<MediaPart, Directory>;
  };
}

MediaPart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    media_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'media_items',
        key: 'id'
      }
    },
    directory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'directories',
        key: 'id'
      }
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    open_subtitle_hash: {
      type: DataTypes.STRING
    },
    file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration: {
      type: DataTypes.NUMBER
    },
    extra_data: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    modelName: 'MediaPart',
    tableName: 'media_parts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at'
  }
);

export default MediaPart;
