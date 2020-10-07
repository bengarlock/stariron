const signObjectUrl = "http://127.0.0.1:3000/sign_object/"
const favoritesUrl = "http://127.0.0.1:3000/favorites/"
const usersUrl = "http://127.0.0.1:3000/users/"


document.addEventListener("DOMContentLoaded", e => {

    const pullSignObjects = () => {
        fetch(signObjectUrl)
            .then(res => res.json())
            .then(data => data.forEach(item => renderSign(item)))
    }

    const renderSign = (item) => {
        const signObjectContainer = document.getElementById("sign-object-list")
        const signObject = document.createElement("div")

        console.log(signObjectContainer.firstChild)

        signObject.innerHTML = `
        <div>${item.description}
        <button id="delete">DELETE</button></div>        
        `
        signObject.dataset.id = item.id
        signObjectContainer.append(signObject)

    }


    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault()
            const button = e.target
            submitForm(button)

        })
    }

    const submitForm = (button) => {
        const form = button

        const data = {
            description: form.description.value
        }

        const packet = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(signObjectUrl, packet)
            .then(res => res.json())
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {

            if(e.target.matches("button#delete")){
                const button = e.target
                deleteObject(button)
            }
        })
    }

    const deleteObject = (button) => {
        const objectId = button.parentElement.parentElement.dataset.id

        const packet = {
            method: "DELETE"
        }

        fetch(signObjectUrl + objectId, packet)
            .then(res => res.json())
    }

    pullSignObjects()
    submitHandler()
    clickHandler()


})