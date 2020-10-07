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

        signObject.innerHTML = `
        <div>${item.description}
        <button id="delete">DELETE</button></div>        
        `
        signObject.dataset.id = item.id
        signObjectContainer.append(signObject)

    }

    const renderUserForm = () => {

        fetch(usersUrl + 1)
            .then(res => res.json())
            .then(user => {
                console.log(user)
                const formsContainer = document.getElementById("forms-container")
                const userForm = document.createElement("div")
                userForm.innerHTML = `
                    <h3>New user object</h3>
                    <form id="user-form">
                    <label>Name</label>
                    <input name="name" type="text" value="${user.name}">
                    <label>Birthday</label>
                    <input name="birthday" type="date" value="${user.birthday}">
                    <input type="submit">
                    </form>
                    `
                formsContainer.append(userForm)
            })

    }


    const submitHandler = () => {
        document.addEventListener("submit", e => {
            e.preventDefault()
            if (e.target.id === "sign-form") {
                const button = e.target
                submitSignForm(button)
            } else if (e.target.id === "user-form"){
                const button = e.target
                submitUserForm(button)
            }
        })
    }

    const submitSignForm = (button) => {
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

    const submitUserForm = (button) => {
        const form = button
        console.log(form.name.value)
        console.log(form.birthday.value)

        const data = {
            name: form.name.value,
            birthday: form.birthday.value
        }

        const packet = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(usersUrl + 1, packet)
            .then(res => res.json())
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {

            console.log(e.target)

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
    renderUserForm()


})