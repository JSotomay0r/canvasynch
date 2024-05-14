document.addEventListener('DOMContentLoaded', e => {
    const USER_INPUT_SEL = { name: 'input.user-name', email: 'input.user-email' }

    const updateAvatar = () => {
        const userEmail = document.querySelector(USER_INPUT_SEL.email).value
        const userName = document.querySelector(USER_INPUT_SEL.name).value
        const userPics = document.querySelectorAll('.user-pic')
        const seed = `${userName}${userEmail}`.replace(/#|\?|%/g, '_')
        const randomAvatarSrc = `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${seed}.svg`
        userPics.forEach(x => {
            x.src = randomAvatarSrc
            x.alt = userName
        })
        UTILS.digestMessage(seed)
            .then(hex => parseInt(hex, 16))
            .then(num => '' + num)
            .then(str => str.slice(0, 6))
            .then(str => parseFloat(str))
            .then(num => num / 10)
            .then(num =>
                userPics.forEach(x => {
                    x.style.setProperty('--huerotation', num)
                })
            )
    }

    //randomize user
    const randomName = UTILS.getRandomFrom(NAMES)
    const randomId = UTILS.getRandomInt(0, 9999)
    document
        .querySelectorAll('.user-name')
        .forEach(x => (x.value = `${randomName}#${String(randomId).padStart(4, '0')}`))
    document.querySelectorAll('.user-email').forEach(x => (x.value = `${randomName}@${randomName}.com`.toLowerCase()))
    updateAvatar()

    document.addEventListener('keyup', e => {
        if (e.target.matches(Object.values(USER_INPUT_SEL).join(','))) updateAvatar()
    })
})
