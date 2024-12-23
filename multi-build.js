const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

// Đọc các giá trị SlugGroup từ file type.ts
const typeFilePath = path.join(__dirname, 'lib/constants/type.ts')
fs.readFile(typeFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading type.ts file:', err)
    return
  }

  const slugGroupValues = data
    .replace(/'/g, '') // Loại bỏ dấu nháy đơn
    .split('|') // Tách các giá trị
    .map(slug => slug.trim()) // Loại bỏ khoảng trắng
  // remove ';' or ',' from the last element
  slugGroupValues[slugGroupValues.length - 1] = slugGroupValues[slugGroupValues.length - 1].replace(/;|,/g, '')
  // remove the first element
  slugGroupValues.shift()
  console.log('🚀 ~ fs.readFile ~ slugGroupValues:', slugGroupValues)

  // Hàm đệ quy để chạy build.js tuần tự với từng giá trị SlugGroup
  function runBuild (index) {
    if (index >= slugGroupValues.length) {
      console.log('All builds completed')
      return
    }

    const slug = slugGroupValues[index]
    console.log(`Building with newGroupSlug: ${slug}`)
    exec(`node build.js ${slug}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing build.js with newGroupSlug: ${slug}`, err)
        return
      }
      console.log(`Build completed successfully with newGroupSlug: ${slug}`)
      console.log(stdout)
      console.log(stderr)

      // Chạy build.js với giá trị SlugGroup tiếp theo
      runBuild(index + 1)
    })
  }

  // Bắt đầu chạy build.js với giá trị SlugGroup đầu tiên
  runBuild(0)
})
