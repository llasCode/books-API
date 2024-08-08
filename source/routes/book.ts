import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.get('/get/books', controller.getAllBooks);
router.post('/create/book', controller.createBook);
router.put('/edit/book', controller.editBook);
router.delete('/delete/book', controller.deleteBook);
router.get('/get/infoBook', controller.getInfoBook);
router.get('/get/getAuthorBooks', controller.getBooksByAuthor);
router.get('/get/getGenreBooks', controller.getBooksByGenre);

export = router;
