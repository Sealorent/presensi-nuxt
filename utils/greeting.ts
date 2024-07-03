export const greetingUtils = () => {
    const date = new Date()
    const hour = date.getHours()

    let greetingMessage = ''
    if (hour >= 6 && hour < 12) {
        greetingMessage = 'Selamat Pagi,'
    } else if (hour >= 12 && hour < 15) {
        greetingMessage = 'Selamat Siang,'
    } else if(hour >= 15 && hour < 18) {
        greetingMessage = 'Selamat Sore,'
    }else if (hour >= 18 && hour < 24) {
        greetingMessage = 'Selamat Malam,'
    } else {
        greetingMessage = 'Good Night,'
    }
    return `${greetingMessage}`
}