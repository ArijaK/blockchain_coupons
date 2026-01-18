import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { blockchainRoutes, couponsRoutes, intraRoutes } from './api/routes.js'
import { startIndexer } from './indexer/indexer.js'

const server = fastify()

// Simple test that backend server is reachable
server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

server.register(fastifyCors, {
  origin: true,   // IMPORTANT: allows null origin (file://)
  methods: ['GET', 'POST', 'OPTIONS']
})

// NOTE: This should be how we structure frontend calls now
server.register(couponsRoutes, { prefix: "/coupons"});
server.register(blockchainRoutes, { prefix: "/blockchain"});
server.register(intraRoutes);

startIndexer();

// OLD frontend
server.post('/createCoupon', async (request, reply) => {
  const coupon = request.body; // JSON from frontend
  console.log('Received coupon:', coupon);

  // TODO: save coupon, validate, etc.
  return { status: 'success', coupon };
});
