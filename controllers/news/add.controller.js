exports.add=(req,res)=>{
    const db = require('../../models')
    const News=db.News;
    if(!req.body.title){
        res.status(400).send({
            messege:"Content not Created!"
        })
    }
    const news = new News({
        title: req.body.title,
        news: req.body.news,
        published: req.body.published,
        author: req.body.author
    })
    news.save(news)
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            messege:
                err.messege||`Some Error Occured!`
        })
    })
}
