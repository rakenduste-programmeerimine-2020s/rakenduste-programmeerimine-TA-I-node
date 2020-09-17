
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
    if(!context.request.body) return;
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
    if(!context.request.body) return;
    const _id =  context.params.id;
    const { name } = context.request.body
    
    const topic = await Topic.findOneAndUpdate({ _id: _id }, { name })
    .catch(e => {
        console.error(e);
    });

    context.status = 200;
    context.body = topic;
    return;
})

module.exports = router;