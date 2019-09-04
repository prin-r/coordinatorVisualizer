import React, { useState, useEffect } from 'react'
import { Flex, Text, Button } from 'rebass'
import KeyTab from '../components/keyTab'
import PageSelection from '../components/pageSelection'
import { getKeysByPageId } from '../api/stat'

export default () => {
  const [reports, setReports] = useState([])

  useEffect(() => {
    ;(async () => {
      setReports(await getKeysByPageId())
    })()
  }, [])

  return (
    <Flex flexDirection="column">
      <Flex px="30px" flexDirection="row" style={{ height: '120px' }}>
        <Flex flex={1} alignItems="center">
          <Text
            fontWeight={700}
            fontSize="20px"
            style={{ textDecoration: 'underline' }}
          >
            Stats
          </Text>
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          <Flex>
            <input
              placeholder="Search"
              style={{
                border: '1px solid hsl(0,0%,50%)',
                outline: 'none',
                borderRadius: '20px',
                padding: '10px',
                width: '250px',
                height: '40px',
                margin: 'auto',
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex px="30px" flexDirection="column">
        {reports.map(report => (
          <KeyTab {...report} />
        ))}
      </Flex>
      <PageSelection />
    </Flex>
  )
}
