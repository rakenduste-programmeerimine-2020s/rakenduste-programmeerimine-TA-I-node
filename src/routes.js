const Router = require('koa-router');
const router = new Router();
const Topic = require('./models/topic')

router.get('/topics:id', async (context) => {
  const topic = await Topic.find({ id: context.params.id });

  context.status = 200;
  context.body = topic

  return;
});

router.get('/topics', async (context) => {
  const topics = await Topic.find({});

  context.status = 200;
  context.body = topics

  return;
});

router.put('/topics:id', async (context) => {
  const [id, name] = [context.params.id, context.request.body.name];
  await Topic.findOneAndUpdate({ id }, { name })
    .catch(e => {
      console.error(e);
    })
  return
});

router.post('/topics', async (context) => {
  const { name } = context.request.body

  const newTopic = new Topic({ name })
  const topic = await newTopic.save()

  context.status = 201;
  context.body = topic;

  return;
});

module.exports = router;