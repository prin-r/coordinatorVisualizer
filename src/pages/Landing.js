import React, { useState, useEffect } from 'react'
import Web3 from 'web3'
import { Flex, Text, Button } from 'rebass'

const ticketAddress = '0x91A9523A33B409599E20a37Bb3D3e56Ab517a44c'

const handleTxReceipt = (err, transactionHash, setTxStatus) => {
  if (!err)
    setTxStatus(
      <a
        style={{ color: 'white' }}
        href={`https://kovan.etherscan.io/tx/${transactionHash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {transactionHash}
      </a>,
    )
  else setTxStatus(<Text>Error! please the console</Text>) || console.log(err)
}

const buyTicket = async (sender, value, setTxStatus) => {
  try {
    await window.web3.eth.sendTransaction(
      {
        from: sender,
        value: value,
        to: ticketAddress,
        data: '0xedca914c',
      },
      (err, transactionHash) =>
        handleTxReceipt(err, transactionHash, setTxStatus),
    )
  } catch (e) {
    setTxStatus('Error wrong input format!')
    console.log(e)
  }
}

const sendTicket = async (sender, receiver, setTxStatus) => {
  try {
    await window.web3.eth.sendTransaction(
      {
        from: sender,
        to: ticketAddress,
        data: `0x8eb9f476${receiver.slice(2).padStart(64, '0')}`,
      },
      (err, transactionHash) =>
        handleTxReceipt(err, transactionHash, setTxStatus),
    )
  } catch (e) {
    setTxStatus('Error wrong input format!')
    console.log(e)
  }
}

const Input = ({ val, change }) => (
  <input
    value={val}
    onChange={e => change(e.target.value)}
    style={{
      marginLeft: 'auto',
      padding: '10px',
      borderRadius: '4px',
      border: 0,
      width: '42ch',
      fontSize: '16px',
    }}
  />
)

export default () => {
  const [account, setAccount] = useState(null)
  const [balance, setBalance] = useState(0)
  const [numTicket, setNumTicket] = useState(0)
  const [value, setValue] = useState(0)
  const [receiver, setReceiver] = useState('')
  const [txStatus, setTxStatus] = useState('')

  const init = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        alert('web3 has been connected!')
        setAccount((await window.web3.eth.getAccounts())[0])
      } catch (error) {
        alert('User denied account access')
      }
    } else {
      console.log('Non-Ethereum browser detected. Please use MetaMask!')
    }
  }

  useEffect(() => {
    window.addEventListener('load', init)
  }, [])

  const [clock, setClock] = useState(false)
  useEffect(() => {
    ;(async () => {
      const startTime = Date.now()
      let currentAccount = null
      try {
        currentAccount = (await window.web3.eth.getAccounts())[0]
      } catch (e) {}
      setAccount(currentAccount)
      if (currentAccount) {
        const [_balance, _numTicket] = await Promise.all([
          window.web3.eth.getBalance(currentAccount),
          window.web3.eth.call({
            to: ticketAddress,
            data: `0x5d288743${currentAccount.slice(2).padStart(64, '0')}`,
          }),
        ])
        setBalance(_balance)
        setNumTicket(parseInt(_numTicket))
      }
      const deltaTime = Date.now() - startTime
      if (deltaTime < 1000)
        await new Promise(r => setTimeout(r, 1000 - deltaTime))
      setClock(!clock)
    })()
  }, [account, clock])

  return (
    <Flex flexDirection="column" bg="#efefef" height="100vh">
      <Flex
        flexDirection="row"
        alignItems="center"
        bg="#2b314f"
        style={{ maxHeight: '60px', padding: '15px 0px' }}
      >
        <Flex flex={1}>
          <Text ml="30px" fontWeight={900} color="white">
            Ticket Seller
          </Text>
        </Flex>
        <Flex>
          <Text mr="30px" color="white">
            {account || (
              <Button onClick={init} bg="white" color="#4a4a4a">
                Connect To MetaMask
              </Button>
            )}
          </Text>
        </Flex>
      </Flex>
      <Flex
        flexDirection="column"
        bg="white"
        style={{
          margin: 'auto',
          width: '80%',
          opacity: account ? 1 : 0,
          transition: 'all 500ms',
        }}
      >
        <Text p="30px" fontSize="20px">
          Your ETH balance is{' '}
          <span style={{ fontWeight: 900 }}>{balance / 1e18}</span> Ether
        </Text>
        <Text p="30px" fontSize="20px">
          You have <span style={{ fontWeight: 900 }}>{numTicket}</span> ticket
          {numTicket > 1 && 's'}
        </Text>
        <Text p="30px" fontSize="20px">
          Current ticket price is <span style={{ fontWeight: 900 }}>100</span>{' '}
          baht
          {numTicket > 1 && 's'}
        </Text>
        <Flex p="30px" bg="#3a2b4f">
          <Button
            bg="white"
            color="#4a4a4a"
            onClick={() => buyTicket(account, value, setTxStatus)}
          >
            Buy Ticket With Ether
          </Button>
          <Input val={value} change={setValue} />
        </Flex>
        <Flex p="30px" bg="#3a2b4f">
          <Button
            bg="white"
            color="#4a4a4a"
            onClick={() => sendTicket(account, receiver, setTxStatus)}
          >
            Send a ticket to
          </Button>
          <Input val={receiver} change={setReceiver} />
        </Flex>
        <Flex p="30px" bg="#2b4f49" color="white">
          {txStatus}
        </Flex>
      </Flex>
    </Flex>
  )
}
