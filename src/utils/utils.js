export function generateName () {
  const possible = 'абвгдеёжзийклмнопрстуфхцчщзъыьэюя'
  const lineName = Array.from({ length: 5 }, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('')
  return lineName[0].toUpperCase() + lineName.slice(1)
}

export function generateNumber (type, min, max) {
  if (type === 'int') {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  return (Math.random() * (max - min + 1) + min).toFixed(2)
}
