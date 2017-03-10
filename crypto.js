const nacl = require('tweetnacl')
const util = require('tweetnacl-util')

const crypto = (pub, priv) => {
  const privBin = util.decodeBase64(priv)
  return {
    sign: (object = null) => {
      const binObject = util.decodeUTF8(JSON.stringify(object))
      const hash = nacl.hash(binObject)
      const sig = nacl.sign.detached(hash, privBin)
      return Object.assign({}, object, {
        signedBy: {
          publicKey: pub,
          signature: util.encodeBase64(sig)
        }
      })
    }
  }
}

module.exports = crypto
