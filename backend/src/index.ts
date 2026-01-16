import fastify from 'fastify'
import fastifyCors from '@fastify/cors'

const server = fastify()

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

// frontend
server.post('/createCoupon', async (request, reply) => {
  const coupon = request.body; // JSON from frontend
  console.log('Received coupon:', coupon);

  // TODO: save coupon, validate, etc.
  return { status: 'success', coupon };
});
