const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')


const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

//console.log(__dirname)
//console.log(__filename)
//both above __dirname & __filename are provided by wrapper function used while doing debugging 

//define paths for express config
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup the static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Andrew Mead'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me ',
        name:'Andrew Mead'
    })
})
app.get('/products',(req,res)=>{
    if(req.query.search==null){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send(
        {
            prodcts:[]
        }
    )
})
//rmbr http requests can be sent only once i.e u cant send req.send() twice in above callback
app.get('/help',(req,res)=>{

    res.render('help',{
        HelpText:'This is some helpful text.',
        title:'help',
        name:'Andrew'
    })
})
//below code wont run once app.us is added as above due to confilicting paths
// app.get('',(req,res)=>{
//     res.send('<h1>Hello express</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Andrew',
//         age:27
//     },
//     {
//         name:'rew2',
//         age:27
//     }]
//     )
    
// })
// app.get('/about',(req,res)=>{
//     res.send('<h1>about</h1>')
    
// })
app.get('/weather',(req,res)=>{
    if(req.query.address==null){
        return res.send({
            error:'You must provide a address term'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){return res.send({error})}
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){return res.send({error})}
            res.send({
                  forecast:forecastData,
                  location,
                  address:req.query.address
               })
        })
    })
    // res.send({
    //     forecast:'it is forecase',
    //     location:'Philadelplhia',
    //     address:req.query.address
    // })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Article',
        name:'Andrew Mead',
        errorMessage:'Article not found'
      })
})
app.get('*',(req,res)=>{
    res.render('404',{
      title:'404 ',
      name:'Andrew Mead',
      errorMessage:'Page Not found '
    })
})
app.listen(3000,()=>{
    console.log('server is up on port no 3000')
})