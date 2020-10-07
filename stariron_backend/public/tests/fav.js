
const favURL = "http://localhost:3000/favorites/ "

document.addEventListener("DOMContentLoaded", e => {

    document.addEventListener("submit", e=> {
        e.preventDefault()

        const favForm = document.getElementById("fav-form")


        const userValue = favForm.user.value
        const signObject = favForm.sign_object.value

        const data = {
            user_id: userValue,
            sign_object_id: signObject
        }

        console.log(data)

        const packet = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }

        fetch(favURL, packet)
            .then(res=> res.json())
            .then(data => console.log(data))

    })


})