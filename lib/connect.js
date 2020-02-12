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
exports.getByAuthorAndName = async (from,name)=>{
    const client = connect()
    let retorno = []
    var helper = await client.paginate(
        q.Match(
          q.Index(process.env.FAUNA_NAME),
          from,
          name
        )
      )
    await helper.map((ref)=>q.Get(ref))
         .each((page)=>{
            retorno = page.map((d)=>d.data)
    })
      
    console.log(retorno)
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
