import User from './User';
import MediaItem from './MediaItem';
import MediaStream from './MediaStream';
import SectionLocation from './SectionLocation';
import LibrarySection from './LibrarySection';
import LibrarySectionPermission from './LibrarySectionPermission';
import MetadataItem from './MetadataItem';
import Directory from './Directory';
import Tag from './Tag';
import Tagging from './Tagging';

MediaItem.belongsTo(LibrarySection, {
  foreignKey: 'library_section_id',
  as: 'librarySection'
});

MediaItem.belongsTo(SectionLocation, {
  foreignKey: 'section_location_id',
  as: 'sectionLocation'
});

MediaItem.belongsTo(MetadataItem, {
  foreignKey: 'metadata_item_id',
  as: 'metadataItem'
});

LibrarySection.hasMany(MediaItem, {
  foreignKey: 'library_section_id',
  as: 'mediaItems'
});

SectionLocation.hasMany(MediaItem, {
  foreignKey: 'section_location_id',
  as: 'mediaItems'
});

MetadataItem.hasMany(MediaItem, {
  foreignKey: 'metadata_item_id',
  as: 'mediaItems'
});

SectionLocation.belongsTo(LibrarySection, {
  foreignKey: 'library_section_id',
  as: 'librarySection'
});

LibrarySection.hasMany(SectionLocation, {
  foreignKey: 'library_section_id',
  as: 'sectionLocations'
});

LibrarySection.hasMany(LibrarySectionPermission, {
  foreignKey: 'library_section_id',
  as: 'librarySectionPermissions'
});

User.hasMany(LibrarySectionPermission, {
  foreignKey: 'user_id',
  as: 'librarySectionPermissions'
});

LibrarySectionPermission.belongsTo(LibrarySection, {
  foreignKey: 'library_section_id',
  as: 'librarySection'
});

LibrarySectionPermission.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Directory.belongsTo(Directory, {
  foreignKey: 'parent_directory_id',
  as: 'parentDirectory'
});

Directory.hasMany(Directory, {
  foreignKey: 'parent_directory_id',
  as: 'childrenDirectories'
});

Tag.belongsToMany(MetadataItem, {
  through: Tagging,
  foreignKey: 'tag_id',
  otherKey: 'metadata_item_id',
  as: 'metadataItems'
});

MetadataItem.belongsToMany(Tag, {
  through: Tagging,
  foreignKey: 'metadata_item_id',
  otherKey: 'tag_id',
  as: 'tags'
});

MediaItem.hasMany(MediaItem, {
  foreignKey: 'media_item_id',
  as: 'mediaStreams'
});

MediaItem.belongsTo(MediaItem, {
  foreignKey: 'media_item_id',
  as: 'mediaItem'
});

export {
  User,
  MediaItem,
  MediaStream,
  SectionLocation,
  LibrarySection,
  LibrarySectionPermission,
  MetadataItem,
  Directory
};
