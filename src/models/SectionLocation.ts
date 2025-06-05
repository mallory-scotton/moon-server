import {
  DataTypes,
  Model,
  Optional,
  Association,
  ForeignKey,
  HasManyGetAssociationsMixin,
  BelongsToGetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToSetAssociationMixin,
  HasManyAddAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin
} from 'sequelize';
import { sequelize } from '../config';
import MediaItem from './MediaItem';
import LibrarySection from './LibrarySection';

interface SectionLocationAttributes {
  id: number;
  library_section_id: number;
  root_path: string;
  available: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface SectionLocationCreationAttributes extends Optional<SectionLocationAttributes, 'id'> {}

class SectionLocation
  extends Model<SectionLocationAttributes, SectionLocationCreationAttributes>
  implements SectionLocationAttributes
{
  declare id: number;
  declare library_section_id: ForeignKey<LibrarySection['id']>;
  declare root_path: string;
  declare available: boolean;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  declare getLibrarySection: BelongsToGetAssociationMixin<LibrarySection>;
  declare setLibrarySection: BelongsToSetAssociationMixin<LibrarySection, number>;
  declare createLibrarySection: BelongsToCreateAssociationMixin<LibrarySection>;

  declare getMediaItems: HasManyGetAssociationsMixin<MediaItem>;
  declare addMediaItem: HasManyAddAssociationMixin<MediaItem, number>;
  declare addMediaItems: HasManyAddAssociationsMixin<MediaItem, number>;
  declare setMediaItems: HasManySetAssociationsMixin<MediaItem, number>;
  declare removeMediaItem: HasManyRemoveAssociationMixin<MediaItem, number>;
  declare removeMediaItems: HasManyRemoveAssociationsMixin<MediaItem, number>;
  declare hasMediaItem: HasManyHasAssociationMixin<MediaItem, number>;
  declare hasMediaItems: HasManyHasAssociationsMixin<MediaItem, number>;
  declare countMediaItems: HasManyCountAssociationsMixin;
  declare createMediaItem: HasManyCreateAssociationMixin<MediaItem>;

  declare readonly mediaItems?: MediaItem[];
  declare readonly librarySection?: LibrarySection;

  declare static associations: {
    mediaItems: Association<SectionLocation, MediaItem>;
    librarySection: Association<SectionLocation, LibrarySection>;
  };
}

SectionLocation.init(
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
    root_path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'SectionLocation',
    tableName: 'section_locations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default SectionLocation;
