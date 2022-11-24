const { PeerRPCClient } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

// stress test
const reqs = 10000
let reps = 0

const t1 = Date.now()
for (let i = 0; i < reqs; i++) {
  peer.request('rpc_test', '1', { timeout: 10000, compress: true }, (err, data) => {
    if (err) {
      console.error(err)
      process.exit(-1)
    }
    console.log(err, data)
    if (++reps === reqs) {
      const t2 = Date.now()
      console.log(`${t2 - t1}ms, Requests: ${reps}`)
    }
  })
}

