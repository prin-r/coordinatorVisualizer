import React, { useState, useEffect } from 'react'
import { Flex, Text } from 'rebass'
import { getReportDetail } from '../api/stat'

const Table = props => {
  const { arr, style } = props
  return (
    <Flex style={{ ...style, fontSize: '14px' }}>
      {arr.map(e => (
        <Flex
          flexDirection="column"
          p="10px"
          style={{ borderBottom: '1px solid hsl(0,0%,60%)' }}
        >
          {Object.keys(e).map(k => (
            <Flex flexDirection="row">
              <Flex style={{ minWidth: '150px', fontWeight: 500 }}>
                {k[0].toUpperCase() + k.slice(1)}
              </Flex>
              <Flex flex={1} style={{ wordBreak: 'break-word' }}>
                {e[k]}
              </Flex>
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

export default () => {
  const [report, setReport] = useState({
    methodName: '',
    conslusion: { value: '0', timeStamp: '0', status: '0', submission: '' },
    reports: [],
    agreements: [],
  })
  useEffect(() => {
    ;(async () => {
      setReport(await getReportDetail())
    })()
  }, [])

  return (
    <Flex
      flexDirection="column"
      px="20px"
      bg="hsl(0, 0%, 95%)"
      style={{ width: '100%' }}
    >
      <Text
        my="10px"
        py="10px"
        fontWeight={500}
        style={{ borderBottom: '2px solid hsl(0,0%,50%)' }}
      >
        Reports from each node
      </Text>
      <Table
        arr={report.reports}
        style={{ flexDirection: 'column', mt: '10px' }}
      />
      <Flex
        py="10px"
        flexDirection="column"
        style={{ borderBottom: '2px solid hsl(0,0%,50%)' }}
      >
        <Text my="10px" fontWeight={500}>
          Agreements
        </Text>
        <Text fontWeight={500}>Method : {report.methodName}</Text>
      </Flex>
      <Table
        arr={report.agreements}
        style={{ flexDirection: 'column', mt: '10px' }}
      />
      <Flex
        py="10px"
        flexDirection="column"
        style={{ borderTop: '2px solid hsl(0,0%,50%)', fontWeight: 500 }}
      >
        <Text my="10px">Conclusion</Text>
        <Flex flexWrap="wrap">
          {Object.keys(report.conslusion).map(k => (
            <Text m="10px">
              {k[0].toUpperCase() + k.slice(1)}
              <i
                style={{
                  fontWeight: 400,
                  marginLeft: '10px',
                  wordBreak: 'break-word',
                }}
              >
                {k === 'submission' &&
                report.conslusion[k].slice(0, 2) === '0x' ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://kovan.etherscan.io/tx/${report.conslusion[k]}`}
                    style={{ color: 'hsl(0,0%,10%)' }}
                  >
                    {report.conslusion[k]}
                  </a>
                ) : (
                  report.conslusion[k]
                )}
              </i>
            </Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}
