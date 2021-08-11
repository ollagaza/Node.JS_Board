module.exports = (function () {
    return {
        local: {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '1234',
            database: 'testdb'
        },
        real: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        staging: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();
