const faunadb = require(`faunadb`)
const  q = faunadb.query
const item = `task`

const connect = ()=>new faunadb.Client({ secret: process.env.FAUNA_KEY })



exports.getByAuthor = async (from)=>{
    const client = connect()
    let retorno = []
    var helper = await client.paginate(
        q.Match(
          q.Index(process.env.FAUNA_FROM),
          from
        )
      )
    await helper.map((ref)=>q.Get(ref))
         .each((page)=>{
            retorno = page.map((d)=>d.data)
    })
      
    console.log(retorno)
     return retorno
}
const getByAuthorAndName = async (from,name)=>{
    const client = connect()
    let retorno = []
    try{
        var helper = await client.paginate(q.Match(q.Index(process.env.FAUNA_NAME), name,parseInt(from))) 
        await helper.map((ref)=>q.Get(ref))
            .each((page)=>{                
                retorno = page.map((d)=>{
                d.data.id=d.ref.id
                return d.data
            })
        })
    }catch(e){
        console.error(e)
    }  
    if(retorno.length>0){
        return retorno[0]
    }else{
        return {}
    }
}
exports.getByAuthorAndName=getByAuthorAndName

exports.finishTask = async (from,name)=>{
    let retorno = false
    let doc = await getByAuthorAndName(from,name)
    if((doc==undefined)||(doc=={})){
        return false
    }
    doc.done=true
    client = connect()
    await client.query(
        q.Update(
          q.Ref(q.Collection(process.env.FAUNA_COLLECTION), doc.id),
          { data: doc },
        )
      )
      .then((ret) => {
          //console.log(ret)
          retorno = true
      })
      .catch((e)=>console.log(e))
      return retorno

}
exports.createDocument = (document)=> {
  let bOk = true
  const client = connect()
  var createP = client.query(
    q.Create(
      q.Collection(process.env.FAUNA_COLLECTION),
      { data: document }
    )
  )  
  createP.then(function(response) {
    console.log(response.ref); // Logs the ref to the console.
  }).catch(function (e){
      console.error(`ERROR: `+e)
      bOk=false
  })
  return bOk
}
