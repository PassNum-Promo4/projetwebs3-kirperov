const router = require('express').Router();

const algoliasearch = require('algoliasearch');
const client = algoliasearch('Q6NFWKIY6I', 'd136472c9827ade9c463823dc81dd00f');
const index = client.initIndex('kirillapp');


router.get('/', (req, res, next) => {
    if (req.query.query) {
        index.search({
            query: req.query.query,
            page: req.query.page,
        }, (err, content) => {
            res.json({
                success: true,
                message: "Here is your search",
                status: 200,
                content: content,
                search_result: req.query.query
            });
        });
    }
});

module.exports = router;