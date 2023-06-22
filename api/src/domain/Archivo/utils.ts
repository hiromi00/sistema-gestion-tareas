import path from 'path';
import fs from 'fs';

const validatePath = (filePath: string) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
  return filePath;
};

export const buildFileRouter = (fieldName: string, tareaId: number) => {
  const filePath = validatePath(`storage/${fieldName}/${tareaId}`);
  const fileRouter = path.join(filePath);
  return fileRouter;
};
