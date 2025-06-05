import {
  DataTypes,
  Model,
  Optional,
  Association,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin
} from 'sequelize';
import { sequelize } from '../config';
import { SectionType, LanguageCode } from '../types';
import MediaItem from './MediaItem';
import SectionLocation from './SectionLocation';
import LibrarySectionPermission from './LibrarySectionPermission';

interface LibrarySectionAttributes {
  id: number;
  section_type: SectionType;
  language: LanguageCode;
  user_thumb_url: string;
  user_art_url: string;
  user_theme_music_url: string;
  public: boolean;
  uuid: string;
  created_at?: Date;
  updated_at?: Date;
}

interface LibrarySectionCreationAttributes extends Optional<LibrarySectionAttributes, 'id'> {}

class LibrarySection
  extends Model<LibrarySectionAttributes, LibrarySectionCreationAttributes>
  implements LibrarySectionAttributes
{
  declare id: number;
  declare section_type: SectionType;
  declare language: LanguageCode;
  declare user_thumb_url: string;
  declare user_art_url: string;
  declare user_theme_music_url: string;
  declare public: boolean;
  declare uuid: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

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

  declare getSectionLocations: HasManyGetAssociationsMixin<SectionLocation>;
  declare addSectionLocation: HasManyAddAssociationMixin<SectionLocation, number>;
  declare addSectionLocations: HasManyAddAssociationsMixin<SectionLocation, number>;
  declare setSectionLocations: HasManySetAssociationsMixin<SectionLocation, number>;
  declare removeSectionLocation: HasManyRemoveAssociationMixin<SectionLocation, number>;
  declare removeSectionLocations: HasManyRemoveAssociationsMixin<SectionLocation, number>;
  declare hasSectionLocation: HasManyHasAssociationMixin<SectionLocation, number>;
  declare hasSectionLocations: HasManyHasAssociationsMixin<SectionLocation, number>;
  declare countSectionLocations: HasManyCountAssociationsMixin;
  declare createSectionLocation: HasManyCreateAssociationMixin<SectionLocation>;

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

  declare readonly mediaItems?: MediaItem[];
  declare readonly sectionLocations?: SectionLocation[];
  declare readonly librarySectionPermissions?: LibrarySectionPermission[];

  declare static associations: {
    mediaItems: Association<LibrarySection, MediaItem>;
    sectionLocations: Association<LibrarySection, SectionLocation>;
    librarySectionPermissions: Association<LibrarySection, LibrarySectionPermission>;
  };
}

LibrarySection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    section_type: {
      type: DataTypes.ENUM(...Object.values(SectionType)),
      allowNull: false
    },
    language: {
      type: DataTypes.ENUM(...Object.values(LanguageCode)),
      allowNull: false,
      defaultValue: LanguageCode.EN
    },
    user_thumb_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_art_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_theme_music_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    public: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  },
  {
    sequelize,
    modelName: 'LibrarySection',
    tableName: 'library_sections',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default LibrarySection;
