import { DataTypes, Model, Optional, Association, ForeignKey, BelongsToGetAssociationMixin } from 'sequelize';
import { sequelize } from '../config';
import { LanguageCode, StreamType } from '../types';
import MediaItem from './MediaItem';

interface MediaStreamAttributes {
  id: number;
  media_item_id: number;
  type: StreamType;
  codec: string;
  language: LanguageCode;
  channels: number;
  bitrate: number;
  forced: boolean;
  extra_data: string;
  index: number;
  created_at?: Date;
  updated_at?: Date;
}

interface MediaStreamCreationAttributes extends Optional<MediaStreamAttributes, 'id'> {}

class MediaStream extends Model<MediaStreamAttributes, MediaStreamCreationAttributes> implements MediaStreamAttributes {
  declare id: number;
  declare media_item_id: ForeignKey<MediaItem['id']>;
  declare type: StreamType;
  declare codec: string;
  declare language: LanguageCode;
  declare channels: number;
  declare bitrate: number;
  declare forced: boolean;
  declare extra_data: string;
  declare index: number;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare getMediaItem: BelongsToGetAssociationMixin<MediaItem>;

  declare readonly mediaItem?: MediaItem;

  declare static associations: {
    mediaItem: Association<MediaStream, MediaItem>;
  };
}

MediaStream.init(
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
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codec: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.ENUM(...Object.values(LanguageCode)),
      allowNull: true
    },
    channels: {
      type: DataTypes.INTEGER
    },
    bitrate: {
      type: DataTypes.INTEGER
    },
    forced: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    extra_data: {
      type: DataTypes.TEXT
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'MediaStream',
    tableName: 'media_streams',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default MediaStream;
