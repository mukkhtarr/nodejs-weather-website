const theForm = document.querySelector('form');
const searchText = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

theForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = searchText.value
    messageOne.textContent = `Loading weather data for ${location}...`
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                messageOne.textContent = data.error;
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})