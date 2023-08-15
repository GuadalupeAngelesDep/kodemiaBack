const fs = require("node:fs");
const KodersBD = JSON.parse(fs.readFileSync("bdKoders.json", "utf-8")) ;
const express = require("express")
const server = express();

server.use(express.json())
let koders=[]
const createDbKoders= (koderlist) => {
    fs.writeFileSync('bdKoders.json',JSON.stringify(koderlist));
};

server.get('/koders',(request,response)=>{
    response.json(KodersBD)
})

server.post('/koders',(request,response)=>{
    KodersBD.push(request.body)
    createDbKoders(KodersBD)
    response.json({
        message: "koder added",
        KodersBD,
    })
})

server.delete('/koders/:name',(request,response)=>{
    const koderExists =KodersBD.find(
        (koder)=> koder.name === request.params.name
    );
    if(!koderExists){
        response.status(404)
        response.json({message:"koder no found"})
        return;
    }
    const  newkoder =  KodersBD.filter(
        (koder)=> koder.name != request.params.name
        
    )
    createDbKoders(newkoder)
    response.json({ message: "koder delete",  KodersBD})
})


server.listen(8000, ()=>{
    console.log("server listening onpost 8000")
})



