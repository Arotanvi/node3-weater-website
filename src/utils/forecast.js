const request = require("request")

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=4715d2d68e2d9b4304f2d27e540a6c8d&query='+latitude+','+longitude+'&units=f'
   // console.log(latitude)
   // console.log(longitude)
   //request({url:url,json:true},(error,response)=>{ without destructuring & shorthand syntax and below one is with shorthand used in url:url & destructuring used in {body}
  request({url,json:true},(error,{body})=>{
      if(error){
         callback('unable to connect to weather service',undefined)
      }else if(body.error){
        callback('unable to find location',undefined)
      }else{
        const temp=body.current.temperature
             const atemp=(body.current.feelslike)
         callback(undefined,"It is "+temp+" outside . But feels like "+atemp+" outside. And humidity is "+body.current.humidity+"  And also it is "+body.current.weather_descriptions[0])
      }

  })
}

module.exports=forecast