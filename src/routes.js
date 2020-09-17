
const Router = require('koa-router');

const router = new Router()

const Topic = require('./models/topic')

router.get('/topics', async (context) => {
    const topics = await Topic.find({});
    console.log(topics)
    context.status = 200;
    context.body = topics

    return;
})

router.post('/topics', async (context) => {
    const { name } = context.request.body
    console.log(context.request.body.name);

    const newTopic = new Topic({ name })
    const topic = await newTopic.save()

    context.status = 201;
    context.body = topic;

    return;
});

router.get('/topics/:id', async (context) => {
    context.body = context.params.id;
    const topic = await Topic.findOne({_id: context.body});

    context.status = 200;
    context.body = topic

    return;
});

router.put('/topics/:id', async (context) => {
    console.log(context.params.id);
    const _id =  context.params.id;
    const topic = await Topic.findOne({ _id})
    const updates = Object.keys(context.request.body)
    
    if (!topic) {
        context.status = 400
    }
    updates.forEach((update) => topic[update] = context.request.body[update])
    await topic.save()
    context.status = 200
    context.body = topic

    return;
})

module.exports = router;