const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const newGroupSlug = process.argv[2]
if (!newGroupSlug) {
  console.error('newGroupSlug is required')
  process.exit(1)
}

const typeFilePath = path.join(__dirname, 'lib/constants/type.ts')
const constantsFilePath = path.join(__dirname, 'lib/constants/index.ts')
const packageJsonPath = path.join(__dirname, 'package.json')
const readmePath = path.join(__dirname, 'README.md')
const directoryPath = path.join(__dirname, 'lib')

fs.readFile(typeFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading type.ts file:', err)
    return
  }

  const slugGroupValues = data
    .replace(/'/g, '')
    .split('|')
    .map(slug => slug.trim())
  slugGroupValues[slugGroupValues.length - 1] = slugGroupValues[slugGroupValues.length - 1].replace(/;|,/g, '')

  slugGroupValues.shift()

  if (!slugGroupValues.includes(newGroupSlug)) {
    console.error('newGroupSlug is invalid')
    process.exit(1)
  }

  // 2️⃣ Cập nhật GROUP_SLUG trong constants/index.ts
  fs.readFile(constantsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading constants file:', err)
      return
    }

    const updatedData = data.replace(/export const GROUP_SLUG: SlugGroup = '.*?'/, `export const GROUP_SLUG: SlugGroup = '${newGroupSlug}'`)

    fs.writeFile(constantsFilePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing constants file:', err)
        return
      }

      console.log('Updated GROUP_SLUG successfully')

      // 3️⃣ Đọc version từ package.json và cập nhật VERSION_SDK
      fs.readFile(packageJsonPath, 'utf8', (err, packageData) => {
        if (err) {
          console.error('Error reading package.json:', err)
          return
        }

        const packageJson = JSON.parse(packageData)
        const version = packageJson.version // Lấy version từ package.json
        const searchString = packageJson.name
        const replaceString = `sdk-v2-${newGroupSlug}`

        // Cập nhật VERSION_SDK trong constants/index.ts
        fs.readFile(constantsFilePath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading constants file:', err)
            return
          }

          const versionUpdatedData = data.replace(/export const VERSION_SDK = '.*?'/, `export const VERSION_SDK = '${version}'`)

          fs.writeFile(constantsFilePath, versionUpdatedData, 'utf8', (err) => {
            if (err) {
              console.error('Error writing constants file:', err)
              return
            }
            console.log(`Updated VERSION_SDK to ${version} in constants/index.ts`)
          })
        })

        // 4️⃣ Thay thế searchString trong toàn bộ thư mục lib và README.md
        function replaceInFile (filePath) {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              return console.log(err)
            }
            const result = data.replace(new RegExp(searchString, 'g'), replaceString)
            fs.writeFile(filePath, result, 'utf8', (err) => {
              if (err) return console.log(err)
            })
          })
        }

        function traverseDirectory (directory) {
          fs.readdir(directory, (err, files) => {
            if (err) {
              return console.log('Unable to scan directory: ' + err)
            }
            files.forEach((file) => {
              const filePath = path.join(directory, file)
              fs.stat(filePath, (err, stat) => {
                if (err) {
                  return console.log(err)
                }
                if (stat.isDirectory()) {
                  traverseDirectory(filePath)
                } else {
                  replaceInFile(filePath)
                }
              })
            })
          })
        }

        traverseDirectory(directoryPath)
        replaceInFile(readmePath)
        replaceInFile(packageJsonPath)

        // 5️⃣ Chạy lệnh yarn build
        console.log('Building...')
        exec('yarn build', (err, stdout, stderr) => {
          if (err) {
            console.error('Error executing yarn build:', err)
            return
          }
          console.log('Build completed successfully')
          console.log(stdout)
          console.log(stderr)
          console.log(`Publish ${replaceString} ver-${version}`)

          console.log('Start publishing...')
          // 6️⃣ Chạy lệnh yarn publish
          // exec('yarn publish', (err, stdout, stderr) => {
          //   if (err) {
          //     console.error('Error executing yarn publish:', err)
          //     return
          //   }
          //   console.log('Publish completed successfully')
          //   console.log(stdout)
          //   console.log(stderr)

          //   // 7️⃣ Commit và push các thay đổi
          //   exec(`git add . && git commit -m "Build & publish ${replaceString} ver.${version}" && git push`, (err, stdout, stderr) => {
          //     if (err) {
          //       console.error('Error committing and pushing changes:', err)
          //       return
          //     }
          //     console.log('Changes committed and pushed successfully')
          //     console.log(stdout)
          //     console.log(stderr)
          //   })
          // })
        })
      })
    })
  })
})
