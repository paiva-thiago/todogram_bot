const faunadb = require(`faunadb`)
const  q = faunadb.query
const item = `task`

const connect = ()=>new faunadb.Client({ secret: process.env.FAUNA_KEY })


exports.getByAuthor = async (from)=>{
    let retorno = {}
    const client = connect()
    let helper = await client.paginate(q.Match(q.Index(process.env.FAUNA_NAME),from))
    console.log(helper.lenght)
    let lst = await helper.map((ref)=>q.Get(ref))
    console.log(JSON.stringify(lst))
    await helper.map((ref)=>{
        console.log(JSON.stringify(ref))            
        return q.Get(ref)
                    })
                          .each((page)=>{
                              console.log(from+"|"+page)
                            if(page!=undefined){
                              console.log(page)
                              retorno = page.map((d)=>d.data)
                            }
                          })
    return retorno
}
exports.getByAuthorAndName = async (from,name)=>{
    let retorno = {}
    const client = connect()
    console.log('gettin...'+from)
    console.log('gettin...'+name)
    await client.query(    
      q.Get(q.Match(q.Index(process.env.FAUNA_NAME), {from:from,name:name}))
    )
    .then((ret) =>{      
      console.log(ret)
        retorno = ret 
    }).catch((x)=>{
      retorno.data = {cod:-2,msg:`${item} not found!`}
    })
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
