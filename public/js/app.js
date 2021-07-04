console.log('javascript file is being loaded here')


//example to show how can u fetch a data in javascript from a URL
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Delhi').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//           console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
// weatherForm.addEventListener('submit',(e)=>{
//     e.preventDefault()
//     const location=search.value
//     console.log(location)
// })

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading ...'
    messageTwo.textContent=''
    //console.log(location)
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
          ///console.log(data.error)
          messageOne.textContent="Error is "+data.error
          messageTwo.textContent=''
        }else{
            //console.log(data.location+"  -- "+' After serahcing it ')
            //console.log(data.forecast)
            messageOne.textContent="Location is "+data.location
            messageTwo.textContent="Forecast is "+data.forecast
        }
    })
  })
})