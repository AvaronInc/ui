import { FileType } from '@/types/storage';
import { 
  File, 
  FileText, 
  Image, 
  FileVideo, 
  FileAudio, 
  FileSpreadsheet, 
  FileCode, 
  Archive, 
  Folder, 
  Presentation
} from 'lucide-react';

export const getFileIcon = (fileType: FileType) => {
  switch (fileType) {
    case 'folder':
      return Folder;
    case 'pdf':
      return FileText;
    case 'image':
      return Image;
    case 'text':
      return FileText;
    case 'video':
      return FileVideo;
    case 'audio':
      return FileAudio;
    case 'spreadsheet':
      return FileSpreadsheet;
    case 'presentation':
      return Presentation;
    case 'archive':
      return Archive;
    case 'code':
      return FileCode;
    default:
      return File;
  }
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

export const getFileTypeFromExtension = (extension: string): FileType => {
  extension = extension.toLowerCase();
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'm4a'];
  const spreadsheetExtensions = ['xlsx', 'xls', 'csv', 'ods'];
  const presentationExtensions = ['pptx', 'ppt', 'odp'];
  const textExtensions = ['txt', 'rtf', 'doc', 'docx', 'odt'];
  const codeExtensions = ['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'json', 'py', 'java', 'c', 'cpp', 'php', 'rb'];
  const archiveExtensions = ['zip', 'rar', '7z', 'tar', 'gz'];
  
  if (extension === 'pdf') return 'pdf';
  if (imageExtensions.includes(extension)) return 'image';
  if (videoExtensions.includes(extension)) return 'video';
  if (audioExtensions.includes(extension)) return 'audio';
  if (spreadsheetExtensions.includes(extension)) return 'spreadsheet';
  if (presentationExtensions.includes(extension)) return 'presentation';
  if (textExtensions.includes(extension)) return 'text';
  if (codeExtensions.includes(extension)) return 'code';
  if (archiveExtensions.includes(extension)) return 'archive';
  
  return 'other';
};
