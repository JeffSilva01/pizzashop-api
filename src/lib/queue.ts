import Queue from 'bull'

import { env } from '../env'
import * as jobs from '../jobs'

type dataJob = {
  email: string
  authLink: URL
}

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, {
    redis: { host: env.REDIS_HOST, port: env.REDIS_PORT },
  }),
  name: job.key,
  handle: job.handle,
}))

export default {
  queues,
  add(name: string, data: dataJob) {
    const queue = this.queues.find((queue) => queue.name === name)

    return queue?.bull.add(data)
  },
  process() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.handle)

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.name, job.data)
        console.log(err)
      })
    })
  },
}
