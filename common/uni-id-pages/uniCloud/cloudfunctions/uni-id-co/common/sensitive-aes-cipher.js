const crypto = require('crypto')

function checkSecret (secret) {
  if (!secret) {
    throw {
      errCode: '请在config.json中配置sensitiveInfoEncryptSecret字段'
    }
  }

  if (secret.length < 32) {
    throw {
      errCode: 'sensitiveInfoEncryptSecret字段长度不能小于32位'
    }
  }
}
function encryptData (text = '') {
  if (!text) return text

  const encryptSecret = this.config.sensitiveInfoEncryptSecret

  checkSecret(encryptSecret)

  const iv = encryptSecret.slice(-16)

  const cipher = crypto.createCipheriv('aes-256-cbc', encryptSecret, iv)

  const encrypted = Buffer.concat([
    cipher.update(Buffer.from(text, 'utf-8')),
    cipher.final()
  ])

  return encrypted.toString('base64')
}

function decryptData (text = '') {
  if (!text) return text

  const encryptSecret = this.config.sensitiveInfoEncryptSecret

  checkSecret(encryptSecret)

  const iv = encryptSecret.slice(-16)

  const cipher = crypto.createDecipheriv('aes-256-cbc', encryptSecret, iv)

  const decrypted = Buffer.concat([
    cipher.update(Buffer.from(text, 'base64')),
    cipher.final()
  ])

  return decrypted.toString('utf-8')
}

module.exports = {
  encryptData,
  decryptData
}
