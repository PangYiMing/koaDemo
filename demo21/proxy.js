module.exports = new Promise((resolve, reject) => {
    console.log("hello1");
    // reject("fail");
    let index = 0;
    this.listen = setInterval(() => {
        index++;
        if (index === 10) {
            resolve("succ");
            clearInterval(this.listen)
        }
    }, 1000)
    setTimeout(() => {
        clearInterval(this.listen)
    }, 1000 * 11)
})

