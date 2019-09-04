import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Text } from 'rebass'
import KeyTabDetail from './keyTabDetail'

const MyFlex = styled(Flex)`
  transition: all 200ms;
  &:hover {
    box-shadow: 4px 3px 9px -2px rgba(0, 50, 100, 0.25);
  }
`

export default props => {
  const [expanded, setExpanded] = useState(false)
  const { reportedKey, dataSetAddress, timeStamp } = props
  return (
    <MyFlex
      my="5px"
      flexDirection="column"
      bg="hsl(0, 0%, 90%)"
      style={{ borderRadius: '4px', width: '100%' }}
    >
      <Flex
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: 'pointer', minHeight: '100%' }}
        flexWrap="wrap"
        width="100%"
        p="20px"
      >
        <Flex flex={1} my="5px">
          <Flex style={{ minWidth: '100px' }}>
            <Text fontWeight={500} mr="5px">
              Key
            </Text>
          </Flex>
          {reportedKey}
        </Flex>
        <Flex my="5px">
          <Flex style={{ minWidth: '100px' }}>
            <Text fontWeight={500} mr="5px">
              Dataset
            </Text>
          </Flex>
          <Text style={{ wordBreak: 'break-word' }}>{dataSetAddress}</Text>
        </Flex>
        <Flex my="5px" flex={1} justifyContent="flex-end">
          <Flex style={{ minWidth: '100px' }}>
            <Text fontWeight={500} mr="5px">
              TimeStamp
            </Text>
          </Flex>
          {timeStamp}
        </Flex>
      </Flex>
      {expanded && <KeyTabDetail />}
    </MyFlex>
  )
}
