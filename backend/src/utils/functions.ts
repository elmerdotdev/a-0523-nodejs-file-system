import fs from 'fs';
import path from 'path';

const directory = 'docs';
const docsDirectory = path.join(__dirname, '../../', directory);

// List directory files
export const listFiles = async (): Promise<string[] | undefined> => {
  try {
    const files = await fs.promises.readdir(docsDirectory);
    return files;
  } catch (err) {
    console.error('Error reading directory: ', err);
    return undefined;
  }
};

// Read one file
export const readAFile = async (filename: string): Promise<string | undefined> => {
  try {
    const filePath = path.join(docsDirectory, filename);
    const data = await fs.promises.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error('Error reading file: ', err);
    return undefined;
  }
};

// Create a new file
export const createFile = async (filename: string, content: string): Promise<boolean> => {
  try {
    const filePath = path.join(docsDirectory, filename);
    await fs.promises.writeFile(filePath, content);
    return true;
  } catch (err) {
    console.error('Error creating file: ', err);
    return false;
  }
};

// Update an existing file
export const updateFile = async (filename: string, content: string): Promise<boolean> => {
  try {
    const filePath = path.join(docsDirectory, filename);
    await fs.promises.writeFile(filePath, content);
    return true;
  } catch (err) {
    console.error('Error updating file: ', err);
    return false;
  }
};

// Delete one file
export const deleteAFile = async (filename: string): Promise<string | undefined> => {
  try {
    const filePath = path.join(docsDirectory, filename);
    await fs.promises.unlink(filePath);
    console.log('File was deleted!');
    return filename;
  } catch (err) {
    console.error('Error deleting file: ', err);
    return undefined;
  }
};
