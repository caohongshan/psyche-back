const { userCollection, REAL_NAME_STATUS, frvLogsCollection, dbCmd } = require('../../common/constants')
const { ERROR } = require('../../common/error')
const { encryptData } = require('../../common/sensitive-aes-cipher')
const { getCurrentDateTimestamp } = require('../../common/utils')
/**
 * 获取认证ID
 * @tutorial https://uniapp.dcloud.net.cn/uniCloud/uni-id-pages.html#get-frv-certify-id
 * @param {Object} params
 * @param {String} params.realName  真实姓名
 * @param {String} params.idCard    身份证号码
 * @returns
 */
module.exports = async function (params) {
  const schema = {
    realName: 'realName',
    idCard: 'idCard'
  }

  this.middleware.validate(params, schema)

  const { realName: originalRealName, idCard: originalIdCard } = params
  const realName = encryptData.call(this, originalRealName)
  const idCard = encryptData.call(this, originalIdCard)

  const { uid } = this.authInfo
  const idCardCertifyLimit = this.config.idCardCertifyLimit || 1
  const readNameCertifyLimit = this.config.readNameCertifyLimit || 5
  const user = await userCollection.doc(uid).get()
  const userInfo = user.data && user.data[0]
  const { realname_auth: realNameAuth = {} } = userInfo

  // 已认证的用户不可再次认证
  if (realNameAuth.auth_status === REAL_NAME_STATUS.CERTIFIED) {
    throw {
      errCode: ERROR.REAL_NAME_VERIFIED
    }
  }

  const idCardAccount = await userCollection.where({
    realname_auth: {
      type: 0,
      auth_status: REAL_NAME_STATUS.CERTIFIED,
      identity: idCard
    }
  }).get()

  // 限制一个身份证可以认证几个账号
  if (idCardAccount.data.length >= idCardCertifyLimit) {
    throw {
      errCode: ERROR.ID_CARD_EXISTS
    }
  }

  const frvLogs = await frvLogsCollection.where({
    user_id: uid,
    real_name: realName,
    identity: idCard,
    status: REAL_NAME_STATUS.WAITING_CERTIFIED,
    created_date: dbCmd.gt(Date.now() - (22 * 60 * 60 * 1000))
  }).get()

  // 用户发起了人脸识别但未刷脸并且 certifyId 还在有效期内就还可以用上次的 certifyId
  if (frvLogs.data.length) {
    const record = frvLogs.data[0]
    if (record.certify_id) {
      return {
        certifyId: record.certify_id
      }
    }
  }

  const userFrvLogs = await frvLogsCollection.where({
    user_id: uid,
    created_date: dbCmd.gt(getCurrentDateTimestamp())
  }).get()

  // 限制用户每日认证次数
  if (userFrvLogs.data && userFrvLogs.data.length >= readNameCertifyLimit) {
    throw {
      errCode: ERROR.REAL_NAME_VERIFY_UPPER_LIMIT
    }
  }

  const frvManager = uniCloud.getFacialRecognitionVerifyManager({
    requestId: this.getUniCloudRequestId()
  })

  const res = await frvManager.getCertifyId({
    realName: originalRealName,
    idCard: originalIdCard
  })

  await frvLogsCollection.add({
    user_id: uid,
    certify_id: res.certifyId,
    real_name: realName,
    identity: idCard,
    status: REAL_NAME_STATUS.WAITING_CERTIFIED,
    created_date: Date.now()
  })

  return {
    certifyId: res.certifyId
  }
}
