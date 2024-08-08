import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'Books';

const handleConnection = (req: Request, res: Response, query: string) => {
    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all books');

    let query = 'SELECT * FROM books';
    handleConnection(req, res, query);
};

const createBook = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Creating book');

    let { author, title, genre } = req.body;
    let query = `INSERT INTO books (title, author, genre) VALUES ("${title}", "${author}", "${genre}")`;
    handleConnection(req, res, query);
};

const editBook = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Editing book');
    let { id } = req.query;
    let { author, title, genre } = req.body;

    let query = `UPDATE books SET author = "${author}", title = "${title}", genre = "${genre}" WHERE id = ${id}`;
    handleConnection(req, res, query);
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Deleting book');
    let { id } = req.query;

    let query = `DELETE FROM books WHERE id = ${id};`;
    handleConnection(req, res, query);
};

const getInfoBook = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting info from book');
    let { id } = req.query;

    let query = `SELECT * FROM books WHERE id = ${id};`;
    handleConnection(req, res, query);
};

const getBooksByAuthor = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting books by author');
    let { author } = req.query;

    let query = `SELECT * FROM books WHERE author = "${author}";`;
    handleConnection(req, res, query);
};

const getBooksByGenre = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting books by genre');
    let { genre } = req.query;

    let query = `SELECT * FROM books WHERE genre = "${genre}";`;
    handleConnection(req, res, query);
};

export default { getAllBooks, createBook, editBook, deleteBook, getInfoBook, getBooksByAuthor, getBooksByGenre };
