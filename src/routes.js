
const Router = require('koa-router');

const Joi = require('joi');

const router = new Router()

const Topic = require('./models/topic')

router.get('/topics', async (context) => {
    const topics = await Topic.find({})        
    .catch(e => {
        console.error(e);
    });
    context.status = 200;
    context.body = topics;

    return;
})

router.post('/topics', async (context) => {
    const { name, author, locale } = context.request.body
    const schema = Joi.object({ 
        name: Joi.string().min(1),
        author: Joi.string().min(1),
        locale: Joi.string().min(1).max(5)
    }); 
    const { value, error } = schema.validate({ name: name,  author: author, locale: locale});
    if(!error){
        const newTopic = new Topic({ name, author, locale })
        const topic = await newTopic.save().catch(e => {
            console.error(e);
        })
        context.status = 400
        context.body = topic
    } else {
        context.status = 201
        context.body = error
    }

    return;
});

router.get('/topics/:id', async (context) => {
    context.body = context.params.id;
    const topic = await Topic.findOne({_id: context.body})
    .catch(e => {
        console.error(e);
    });

    context.status = 200;
    context.body = topic

    return;
});

router.put('/topics/:id', async (context) => {
    const _id =  context.params.id;
    const { name, author, locale } = context.request.body

    const schema = Joi.object({ 
        name: Joi.string().min(1),
        author: Joi.string().min(1),
        locale: Joi.string().min(1).max(5)
    }); 
    const { value, error } = schema.validate({ name: name,  author: author, locale: locale});

    if(!error){
        const topic = await Topic.findOneAndUpdate({ _id: _id }, { name })
        .catch(e => {
            console.error(e);
        });
        context.status = 400
        context.body = topic
    } else {
        context.status = 201
        context.body = error
    }
    return;
})

module.exports = router;