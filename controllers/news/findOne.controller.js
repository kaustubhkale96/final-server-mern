exports.findOne=(req,res)=>{
    const db=require('../../models')
    const News=db.News;
    const id=req.params.id;
    News.findById(id)
    .then(data=>{
        if(!data){
            res.status(404).send({
                message:`Cannot Find Data with ${id}`
            })
        }
        else res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message||`Some Error Occured!`
        })
    })
}