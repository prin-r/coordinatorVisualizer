import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import { getNumPages } from '../api/stat'

export default props => {
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPages] = useState(0)

  useEffect(() => {
    setCurrentPages(window.location.pathname.slice(1) - 1)
    ;(async () => {
      setNumPages(await getNumPages())
    })()
  }, [])

  return (
    <Flex
      bg="hsl(0,0%,80%)"
      mt="30px"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      style={{
        height: '60px',
        width: '100vw',
        bottom: '0px',
      }}
    >
      <p style={{ fontWeight: 700 }}>Pages</p>
      {new Array(numPages).fill(0).map((_, i) => (
        <a href={`/${i + 1}`}>
          <Flex
            mx="10px"
            onClick={() => setCurrentPages(i)}
            justifyContent="center"
            alignItems="center"
            style={{
              fontWeight: i === currentPage ? 700 : 400,
              hegiht: '30px',
              width: '30px',
              cursor: 'pointer',
              color: 'hsl(0,0%,30%)',
              textDecoration: i === currentPage ? 'underline' : 'none',
            }}
          >
            {i + 1}
          </Flex>
        </a>
      ))}
    </Flex>
  )
}
