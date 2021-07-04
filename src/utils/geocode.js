const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGFydXNoaSIsImEiOiJja3FlNHN4cG0xZ3FxMnBxdHZrbjF5aXR1In0.cQtdyCN3uKCVrKHUoI8KpA&limit=1'
    
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect the location services',undefined)
        }else if(response.body.message||response.body.features.length==0){
            callback('unable to find the location Try another search',undefined)
        }else{
            
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
    
    }




    module.exports=geocode