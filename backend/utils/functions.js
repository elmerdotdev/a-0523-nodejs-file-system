const fs = require('fs')
const path = require('path')

const directory = 'docs'
const docsDirectory = path.join(__dirname, '../', directory)

// List directory files
const listFiles = () => {
  try {
    const files = fs.readdirSync(docsDirectory)
    return files
  } catch (err) {
    console.error('Error reading directory: ', err)
  }
}

// Read one file
const readAFile = (filename) => {
  try {
    const filePath = path.join(docsDirectory, filename)
    const data = fs.readFileSync(filePath, 'utf8')
    return data
  } catch (err) {
    console.error('Error: ', err)
  }
}

// Delete one file
const deleteAFile = (filename) => {
  try {
    const filePath = path.join(docsDirectory, filename)
    fs.unlinkSync(filePath)
    console.log('File was deleted!')
    return filename
  } catch (err) {
    console.error('Error deleting file: ', err)
  }
}

module.exports = {
  listFiles,
  readAFile,
  deleteAFile
}