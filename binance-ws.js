const WebSocket = require('ws')

const link = 'wss://stream.binance.com:9443/ws/btcusdt@aggTrade'

function start () {
  const ws = new WebSocket(link)
  let timeout = null
  const heartbeat = () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      ws.terminate()
      start()
    }, 10000)
  }
  let time = new Date
  ws
    .on('open', heartbeat)
    .on('ping', heartbeat)
    .on('message', (data) => {
      const now = new Date
      if (now - time > 1000) {
        console.log(now.toISOString(), data)
        time = now
      }
    })
    .on('error', () => clearTimeout(timeout))
    .on('close', () => clearTimeout(timeout))
}

start()