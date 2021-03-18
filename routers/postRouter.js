const router = express.Router();

router.get('/', postsController.listPosts);
router.get('/:postId(\\d+)', postsController.postById);
router.get('/category/:categoryId(\\d+)', postsController.postByCategoryId);
router.post('/', postsController.createPost);

module.exports = router;