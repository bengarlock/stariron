const proxyurl = "https://cors-anywhere.herokuapp.com/"
const url = "https://zodiacal.herokuapp.com/" 
const sunUrl = proxyurl + url + "api"
const moonUrl = proxyurl + url + "moon"
const risingUrl = proxyurl + url + "rising"
const elementsUrl = proxyurl + url + "elements"
const cardinalityUrl = proxyurl + url + "cardinalities"
const signObjectUrl = "http://127.0.0.1:3000/sign_object/"
const favoritesUrl = "http://127.0.0.1:3000/favorites/"
const usersUrl = "http://127.0.0.1:3000/users/1"

let w = window.innerWidth - 20;
let h = window.innerHeight - 20;

const menuStars = document.getElementById("menu-stars")
const formCard = document.createElement('div')
formCard.setAttribute('class', 'card')
const form = document.createElement('form')
form.classList = "form"

document.addEventListener("DOMContentLoaded", evt => {

    let mainButton = document.createElement('button')
    mainButton.classList = "form-back-btn", "btn btn-white btn-animated"
    mainButton.innerText = "X"

    let backToForm = document.createElement('button')
    backToForm.setAttribute('id', 'sign-back-btn')
    backToForm.classList = "btn btn-white btn-animated"
    backToForm.innerText = "back to form"

    const signCard = document.createElement('div')
    signCard.setAttribute('class', 'card')
    signCard.setAttribute('id', 'sign-card')

    formCard.append(form)

    const submitHandler = (user) => {
        form.addEventListener('submit', e => {
            e.preventDefault()
            const form = e.target
            updateUser(form, user)
        })
    }

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if (e.target.id === "1"){
                menuStars.innerHTML = ""
                getUser()
                formCard.append(mainButton)
                menuStars.append(formCard)
                form.reset()
            } else if(e.target.matches(".form-back-btn")){
                menuStars.innerHTML = ""
                getMainStars()
            } else if(e.target.id === "sign-back-btn"){
                menuStars.innerHTML = ""
                formCard.append(mainButton)
                menuStars.append(formCard)
            } else if(e.target.id === "2"){
                menuStars.innerHTML = ""
                signCard.append(mainButton)
                menuStars.append(signCard)
                getSunDataAgain(menuStars)

            }  else if(e.target.matches(".fav-btn")){
                const button = e.target
                button.setAttribute("style", "color: red")
                addToFavorite(button)
            } else if(e.target.id === "3"){
                menuStars.innerHTML = ""
                renderFavCard(menuStars)
            } else if(e.target.matches("button.delete-fav-button")) {
                const button = e.target
                deleteFav(button)
            }
        })
    }

    const updateUser = (form, user) => {
        const newUserName = form.name.value
        const newUserBirthday = form.birthday.value

        const data = {
            name: newUserName,
            birthday: newUserBirthday
        }
        const packet = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch(usersUrl, packet)
            .then(res => res.json())

        let date = newUserBirthday.split('-')
        let month = date[1]
        let day = date[2]
        menuStars.innerHTML = ""
        let sign = calculateSun(month, day)

        signCard.innerHTML = ""

        getSunSign(user, sign)
    }

    const getSunSign = (user, sign) => {

        fetch(sunUrl)
            .then(resp => resp.json())
            .then(signs => renderSigns(signs, user, sign))
    }

    function renderSigns(signs, user, signName){

        menuStars.innerHTML = ""

        let favBtn = document.createElement('button')
        favBtn.classList = "fav-btn", "btn btn-white btn-animated"
        favBtn.innerHTML = `&#x2665;`

        signCard.innerHTML = ''
        let br = document.createElement('br')
        favBtn.dataset.id = user.id
        if (signName != null || undefined) {
            favBtn.dataset.id = user.id
            let signObj = signs.filter(name => name.name === signName)
            signCard.innerHTML = `
            <h2 id="sign-name">${signName}</h2>
            <p>${signObj[0].mental_traits}</p>            
            `
            signCard.append(br, favBtn)
            signCard.append(mainButton, backToForm)
            menuStars.append(signCard)

            renderCelebBox(signObj)
        }}

    const renderCelebBox = (signObj) => {

        const celebCard = document.createElement('div')
        celebCard.setAttribute('class', 'card')
        celebCard.setAttribute('id', 'celeb-card')

        const celebContainerUl = document.createElement("ul")
        signObj.forEach(item => {

            item.famous_people.forEach(celeb => {
                const celebLi = document.createElement('li')
                celebLi.textContent = celeb
                celebContainerUl.appendChild(celebLi)
            })
        })
        celebCard.innerHTML = `
            <h2>Celebrities</h2>
        `
        celebCard.appendChild(celebContainerUl)

        menuStars.appendChild(celebCard)
    }

    const getMainStars = () => {
      for(let i=1; i < 4; i++) {
        const x10star = document.createElement('div')
        x10star.classList.add("star10px", "avatar")
        x10star.setAttribute('id', `${i}`)
        const randomLength = Math.floor(Math.random() * 150)
        const randomHeight = Math.floor(Math.random() * 150)
        x10star.setAttribute("style", `margin-left:${randomLength}px; margin-top: ${randomHeight}px`)
        menuStars.append(x10star)
    }
    const mainStar1 = document.getElementById('1')
    mainStar1.dataset.tooltip = "My Sign"
    const mainStar2 = document.getElementById('2')
    mainStar2.dataset.tooltip = "thinkingCat"
    const mainStar3 = document.getElementById('3')
    mainStar3.dataset.tooltip = "Favorite Collection"

    }

    const generateStars = () => {
        const starContainer = document.getElementById("star-cluster")

        //tiny stars
        for(let i=1; i < h; i++) {
            const x2star = document.createElement('div')
            x2star.classList.add("star2px")
            const randomLength = Math.floor(Math.random() * w)
            const randomHeight = Math.floor(Math.random() * h)
            x2star.setAttribute("style", `margin-left: ${randomLength}px; margin-top: ${randomHeight}px`)
            starContainer.append(x2star)
        }

        //slightly larger stars
        for(let i=1; i < h; i++) {
            const x5star = document.createElement('div')
            x5star.classList.add("star5px")
            const randomLength = Math.floor(Math.random() * w)
            const randomHeight = Math.floor(Math.random() * h)
            x5star.setAttribute("style", `margin-left:${randomLength}px; margin-top: ${randomHeight}px`)
            starContainer.append(x5star)

        }

        //Menu Stars
        getMainStars()

    }

    const addToFavorite = (button) => {
        const content = button.parentElement.textContent
        const sign = document.getElementById("sign-name").textContent

        const data = {
            sign: sign,
            content: content
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
            .then(sign_object => {

                const data = {
                    user_id: 1,
                    sign_object_id: sign_object.id
                }

                const packet = {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json"
                    },
                    body: JSON.stringify(data)
                }

                fetch(favoritesUrl, packet)
                    .then(res => res.json())

            })
    }

    const getUser = () => {
      fetch(usersUrl)
        .then(resp => resp.json())
        .then(data => renderUser(data))
    }

    function renderUser(user){
        form.innerHTML = ""
        form.innerHTML = `
        <h2 class="header-two">Welcome</h2>
        <label>What is your name?</label>
        <br>
        <input type="text" name="name" placeholder="name" value="${user.name}">
        </br>
        </br>
        <label>Date of Birth</label>
        <br>
        <input type="date" id="birth-date" name="birthday"
           value="${user.birthday}"
           min="1900-01-01" max="2022-12-31">
           <br>
           </br>
        <input type="submit" name="submit"></br></br>
        `
        submitHandler(user)
    }
    
    const calculateSun = (month, day) => {
        let sign 

        if((month == 1 && day <= 20) || (month == 12 && day >=22)) {
            sign = "Capricorn";
            return sign
          } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            sign = "Aquarius";
            return sign
          } else if((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            sign = "Pisces";
            return sign
          } else if((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            sign = "Aries";
            return sign
          } else if((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            sign = "Taurus";
            return sign
          } else if((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            sign = "Gemini";
            return sign
          } else if((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            sign = "Cancer";
            return sign
          } else if((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            sign = "Leo";
            return sign
          } else if((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            sign = "Virgo";
            return sign
          } else if((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            sign = "Libra";
            return sign
          } else if((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            sign = "Scorpio";
            return sign
          } else if((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            sign = "Sagittarius";
            return sign
          }
    }

    const renderFavCard = (menuStars) => {
        const favCard = document.createElement('div')
        favCard.innerHTML =
            `
            <h3>My Favorite Signs</h3>
            <br />
            `
        const favList = document.createElement("div")
        favList.classList.add("fav-container")

        favCard.setAttribute("class", "card")
        favCard.append(favList)

        fetch(favoritesUrl)
            .then(res => res.json())
            .then(favorites => favorites.forEach(fav => {
                const signId = fav.sign_object_id

                fetch(signObjectUrl + signId)
                    .then(res => res.json())
                    .then(signObj => {

                        const signObjDiv = document.createElement('div')
                        signObjDiv.classList.add("fav-object-div")
                        signObjDiv.innerHTML = `<b>${signObj.sign}</b><br />${signObj.content}<br /><br />`
                        signObjDiv.dataset.id = fav.id
                        const deleteButton = document.createElement("button")
                        deleteButton.textContent = "Delete"
                        deleteButton.classList.add("delete-fav-button")
                        signObjDiv.append(deleteButton)
                        favList.append(signObjDiv)
                    })
            }))
        favCard.append(mainButton)

        menuStars.append(favCard)
    }
    
    const deleteFav = (button) => {
        const favId = button.parentElement.dataset.id
        const packet = {
            method: "DELETE"
        }
        fetch(favoritesUrl + favId, packet)
            .then(res => res.json())
            .then(item => button.parentElement.remove())
    }

    const getSunDataAgain = (menuStars) => {
        fetch(sunUrl)
            .then(res => res.json())
            .then(data => renderSignIndex(data))
    }

    const renderSignIndex = (data) => {

        let aris = data[0].mental_traits
        let taurus = data[1].mental_traits
        let gemini = data[2].mental_traits
        let cancer = data[3].mental_traits
        let leo = data[4].mental_traits
        let virgo = data[5].mental_traits
        let libra = data[6].mental_traits
        let scorpio = data[7].mental_traits
        let sagittarius = data[8].mental_traits
        let capricorn = data[9].mental_traits
        let aquarius = data[10].mental_traits
        let pisces = data[11].mental_traits




        const signCard = document.querySelector("#sign-card")
        signCard.innerHTML = ""
        signCard.append(mainButton)

        const indexContainer = document.createElement("div")
        indexContainer.classList.add("sign-index-container")

        const indexTable = document.createElement('table')
        indexTable.classList.add("index-table")

        const tableRow1 = document.createElement('tr')
        const tableRow2 = document.createElement('tr')
        const tableRow3 = document.createElement('tr')

        tableRow1.innerHTML = `
                <td class="avatar" data-tooltip="Aris - ${aris}"><img src="./img/aries.jpg" alt="aries" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Tarus - ${taurus}"><img src="./img/taurus.jpg" alt="tarus" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Gemini - ${gemini}"><img src="./img/gemini.jpg" alt="Gemini" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Cancer - ${cancer}"><img  src="./img/cancer.jpg" alt="cancer" class="sign-index-image"/></td>
            `

        tableRow2.innerHTML = `
                <td class="avatar" data-tooltip="Leo - ${leo}"><img src="./img/leo.jpg" alt="leo" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Virgo - ${virgo}"><img src="./img/virgo.jpg" alt="virgo" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Libra - ${libra}"><img src="./img/libra.jpg" class="sign-index-image" alt="Libra"/></td>
                <td class="avatar" data-tooltip="Scorpio - ${scorpio}"><img src="./img/scorpio.jpg" alt="scorpio" class="sign-index-image"/></td>
            `

        tableRow3.innerHTML = `
                <td class="avatar" data-tooltip="Sagittarius - ${sagittarius}"><img src="./img/sagittarius.jpg" alt="sagittarius" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Capricorn - ${capricorn}"><img src="./img/capricorn.jpg" alt="capricorn" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Aquarius - ${aquarius}"><img src="./img/aquarius.jpg" alt="aquarius" class="sign-index-image"/></td>
                <td class="avatar" data-tooltip="Pisces - ${pisces}"><img src="./img/pisces.jpg" alt="pisces" class="sign-index-image"/></td>
            `

        indexTable.append(tableRow1)
        indexTable.append(tableRow2)
        indexTable.append(tableRow3)

        indexContainer.append(indexTable)

        signCard.append(indexContainer)
    }

    generateStars()
    clickHandler()

})
