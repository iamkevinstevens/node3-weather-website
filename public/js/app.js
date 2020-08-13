
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const formResponse = document.querySelector('div.form-response')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    console.clear()
    formResponse.className = "form-response"
    formResponse.innerHTML = "Loading..."
    formResponse.classList.add("loading")

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            
            formResponse.className = "form-response"
            formResponse.innerHTML = "" 

            let head = document.createElement("p")
            head.classList.add("form-head")
            formResponse.appendChild(head)

            if(data.error){
                formResponse.classList.add("error")
                head.innerHTML = "Error"

                let err = document.createElement("p")
                err.innerHTML = data.error
                formResponse.appendChild(err)
            } else {
                formResponse.classList.add("success")
                head.innerHTML = "Your forecast"

                let loc = document.createElement("p")
                let fore = document.createElement("p")

                loc.innerHTML = data.location
                fore.innerHTML = data.forecast

                formResponse.appendChild(loc)
                formResponse.appendChild(fore)
            }
        })
    })
})