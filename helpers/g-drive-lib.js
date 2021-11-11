async function copyFileInPlace(drive, fileId, name) {
  const newFile = await drive.files.copy({
    fileId,
    requestBody: {
      name,
    },
  })
  return newFile
}

export {
  copyFileInPlace,
}