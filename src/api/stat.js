import { get } from 'axios'

const randomString = length => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const randomMockKey = () => {
  let d = new Date().toGMTString().split(' ')
  let key = 'SPOTPX/' + randomString(Math.floor(Math.random() * 2) + 2)
  if (Math.floor(Math.random() * 2) === 0) {
    key += '-' + randomString(Math.floor(Math.random() * 2) + 2)
  }
  return {
    reportedKey: key,
    dataSetAddress: '0xa24dF0420dE1f3b8d740A52AAEB9d55d6D64478e',
    timeStamp: [d[4], ...d].splice(0, 5).join(' '),
  }
}

const getARandomNodeReport = () => {
  const addrs = [
    '0x65Df1D4E9C63B5070812261672C6ecAa1d4A35de',
    '0xF4F9994D5E59aEf6281739b046f0E28c33b3A847',
    '0xe38475F47166d30A6e4E2E2C37e4B75E88Aa8b5B',
    '0x0ff1ce7cFf3f93f64432738B1a3742e72783A444',
    '0xc0ffee695Bc80a97007BF3463FcAfD09b7540b0B',
    '0xfACeB00cCC40D220de2A22aA206A43e7A49d54CB',
  ]
  return {
    nodeName: randomString(Math.floor(Math.random() * 3) + 3),
    address: addrs[Math.floor(Math.random() * 6)],
    value: Math.floor(1e18 * Math.random() + 1e17),
    timeStamp: Math.floor(Date.now() / 1000),
    sig:
      '0x038daeae8a6f4e8cf60809ba5f63206d8fc62bcc61dbdda82fe3f61dd04eceac13a0188b2431e5e0c03826eb163051bf8ae4c1d85f2dffd2316d827a7e0bc1811b',
  }
}

const getAnAgreement = () => {
  return {
    ...getARandomNodeReport(),
    status: 'OK',
  }
}

const randomReportDetail = () => {
  const sm = [
    '0x4496a4713eec6bb21c891d454ce7b9f57334d3451d025b5b518c767d404b24b2',
    'not submitted',
    'revert',
  ]
  const st = ['OK', 'Not OK']
  return {
    methodName: 'median',
    conslusion: {
      value: Math.floor(1e18 * Math.random() + 1e17),
      timeStamp: Math.floor(Date.now() / 1000),
      status: st[Math.floor(Math.random() * 2)],
      submission: sm[Math.floor(Math.random() * 3)],
    },
    reports: new Array(5).fill(0).map(() => getARandomNodeReport()),
    agreements: new Array(5).fill(0).map(() => getAnAgreement()),
  }
}

export const getNumPages = async () => {
  return 15
}

export const getKeysByPageId = async () => {
  return new Array(10).fill(0).map(() => randomMockKey())
}

export const getReportDetail = async () => {
  return randomReportDetail()
}
