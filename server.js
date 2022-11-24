const { PeerRPCServer } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')
var _ = require('lodash');

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout: 300000
})
peer.init()

const service = peer.transport('server')
service.listen(_.random(1000) + 1024)


setInterval(function () {
  link.announce('rpc_test', service.port, {})
}, 1000)

service.on('request', (rid, key, payload, handler) => {
  console.log(`Ping from client ${payload}`)
  handler.reply(null, `Pong from server for client ${payload}`)
})