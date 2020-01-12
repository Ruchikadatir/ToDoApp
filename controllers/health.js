module.exports.get = () => {
    return new Promise((resolve, reject) => {
        resolve({
            code: 200,
            message: 'Alive \'n Kickin',
            data: {},
        })
    })
}
