const { userCollection, REAL_NAME_STATUS, frvLogsCollection } = require('../../common/constants')
const { dataDesensitization, catchAwait } = require('../../common/utils')
const { encryptData, decryptData } = require('../../common/sensitive-aes-cipher')
const { ERROR } = require('../../common/error')

/**
 * 查询认证结果
 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#get-frv-auth-result
 * @param {Object} params
 * @param {String} params.certifyId       认证ID
 * @param {String} params.needAlivePhoto  是否获取认证照片，Y_O （原始图片）、Y_M（虚化，背景马赛克）、N（不返图）
 * @returns
 */
module.exports = async function (params) {
  const schema = {
    certifyId: 'string',
    needAlivePhoto: {
      required: false,
      type: 'string'
    }
  }

  this.middleware.validate(params, schema)

  const { uid } = this.authInfo
  const { certifyId } = params
  const frvNeedAlivePhoto = this.config.frvNeedAlivePhoto || 'Y_O'

  const user = await userCollection.doc(uid).get()
  const userInfo = user.data && user.data[0]

  if (!userInfo) {
    throw {
      errCode: ERROR.ACCOUNT_NOT_EXISTS
    }
  }

  const { realname_auth: realNameAuth = {} } = userInfo

  // 已认证的用户不可再次认证
  if (realNameAuth.auth_status === REAL_NAME_STATUS.CERTIFIED) {
    throw {
      errCode: ERROR.REAL_NAME_VERIFIED
    }
  }

  const frvManager = uniCloud.getFacialRecognitionVerifyManager({
    requestId: this.getUniCloudRequestId()
  })

  const [error, res] = await catchAwait(frvManager.getAuthResult({
    certifyId,
    needAlivePhoto: frvNeedAlivePhoto
  }))

  if (error) {
    console.log(ERROR.UNKNOWN_ERROR, 'error: ', error)
    throw error
  }

  if (res.authState === 'PROCESSING') {
    throw {
      errCode: ERROR.FRV_PROCESSING
    }
  }

  if (res.authState === 'FAIL') {
    await frvLogsCollection.where({
      certify_id: certifyId
    }).update({
      status: REAL_NAME_STATUS.CERTIFY_FAILED
    })

    throw {
      errCode: ERROR.FRV_FAIL
    }
  }

  if (res.authState !== 'SUCCESS') {
    console.log(ERROR.UNKNOWN_ERROR, 'source res: ', res)
    throw {
      errCode: ERROR.UNKNOWN_ERROR
    }
  }

  const frvLogs = await frvLogsCollection.where({
    certify_id: certifyId
  }).get()

  const log = frvLogs.data && frvLogs.data[0]

  const updateData = {
    realname_auth: {
      auth_status: REAL_NAME_STATUS.CERTIFIED,
      real_name: log.real_name,
      identity: log.identity,
      auth_date: Date.now(),
      type: 0
    }
  }

  if (res.base64Photo) {
    const {
      fileID
    } = await uniCloud.uploadFile({
      cloudPath: `user/id-card/${uid}.bin`,
      fileContent: Buffer.from(encryptData.call(this, res.base64Photo))
    })
    updateData.realname_auth.in_hand = fileID
  }

  await Promise.all([
    userCollection.doc(uid).update(updateData),
    frvLogsCollection.where({
      certify_id: certifyId
    }).update({
      status: REAL_NAME_STATUS.CERTIFIED
    })
  ])

  return {
    errCode: 0,
    authStatus: REAL_NAME_STATUS.CERTIFIED,
    realName: dataDesensitization(decryptData.call(this, log.real_name), { onlyLast: true }),
    identity: dataDesensitization(decryptData.call(this, log.identity))
  }
}
