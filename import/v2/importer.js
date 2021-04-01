module.exports = {

    client: null,

    async clearDataBase() {
        await this.client.query('TRUNCATE TABLE category, post RESTART IDENTITY;')
    },

    async createCategory(categoryData) {
        const result = await this.client.query(`INSERT INTO category(label, route)
            VALUES ($1, $2)`, this.extractCategoryData(categoryData));
    },

    extractCategoryData(categoryData) {
        return [categoryData.label, categoryData.route];
    },

    async createPost(postData) {
        const result = await this.client.query(`INSERT INTO post (slug, title, excerpt, content, category_id)
            VALUES ($1, $2, $3, $4, (
                SELECT id
                  FROM category
                 WHERE label = $5
            ))`, this.extractPostData(postData));
    },

    extractPostData(postData) {
        return [postData.slug, postData.title, postData.excerpt, postData.content, postData.category]
    },

    async run(categoriesList, postsList) {
        await this.clearDataBase();

        for (let category of categoriesList) {
            await this.createCategory(category);
        }

        for (let post of postsList) {
            await this.createPost(post);
        }

    }
};