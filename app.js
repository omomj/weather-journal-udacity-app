
// Create a new date instance dynamically with JS
let d  = new Date();
let newDate = d.getMonth() + 1 +'.' + d.getDate()+'.'+ d.getFullYear();

/* Global Variables */
const createBtn = document.getElementById('generate');
const zipCode = document.getElementById('zip');

/*personal api */
const ApiKey = '&appid=8e5e86cc0a848808368642a7d48a1759';

// events 
createBtn.addEventListener('click', makeAction);

 function makeAction (e){
    const zipcode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    const baseUrl= 'https://api.openweathermap.org/data/2.5/weather?&units=metric&zip=';

    getNewCity( baseUrl, zipcode, ApiKey)

      .then(function(Data) { 
          console.log(Data);
          //adding data to post 
       postData('/weather',{date:newDate ,temp: Data.main.temp,content:feeling})
      })
       .then(()=>updateUI())

};
/* function to get api data*/
const getNewCity = async (baseUrl,zipcode,ApiKey) => {

    const res = await fetch (baseUrl + zipcode + ApiKey)
    try {
        const Data = await res.json();
        return Data;
    }catch(error){ //handling the error
        console.log("errorhappened", error);
    }
}
// function post data
const postData = async (url='', Data ={})=> {
    console.log(Data);
    const res = await fetch (url,{
        method :'POST',
        credentials:'same-origin',
        headers : {
            'content-type':'application/json',
        },
    // data type must match content type header
    body:JSON.stringify(Data),

});

try {
       const recentData = await response.json();
       console.log(recentData);
       return recentData;
  } catch(error){
    console.log("errorhappened",error);
    }
}

//get weather data
const updateUI = async() => {
    const order = await fetch ('/all');
    try {
        const getData = await order.json();
        document.getElementById('date').innerHTML = `date:${getData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${getData.temp}`;
        document.getElementById('content').innerHTML = `feel: ${getData.content}`;

    }catch(error){
        console.log("errorhappened", error);
      
    }
}