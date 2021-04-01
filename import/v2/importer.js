module.exports = {

    client: null,

    async clearDataBase() {
        await this.client.query('TRUNCATE TABLE category, post RESTART IDENTITY;')
    }
};