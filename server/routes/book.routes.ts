import { Router } from 'express';
import { searchBooks, getBook, getRecommendBooksToUser, getPopularBooks } from '../controllers/book.controller';
import { validate, bookSearchValidations, getBookValidations } from '../config/validation.config';
import { checkJwt, checkJwtOrIgnore } from '../config/auth.config';
const route = Router();

/**
 * @swagger
 * /books:
 *  get:
 *    tags:
 *    - "book"
 *    summary: performs a book search
 *    description: performs a book search
 *    parameters:
 *      - in: query
 *        name: q
 *        schema:
 *          type: string
 *        description: Full-text search query string
 *      - in: query
 *        name: startIndex
 *        schema:
 *          type: number
 *        description: Index of the first result to return (starts at 0)
 *      - in: query
 *        name: maxResults
 *        schema:
 *          type: number
 *        description: Maximum number of results to return. Acceptable values are 0 to 40, inclusive.
 *      - in: query
 *        name: orderBy
 *        schema:
 *          type: string
 *          enum:
 *            - newest
 *            - relevance
 *        description: Sort search results.
 *    responses:
 *      '200':
 *        description: Success!
 *        schema:
 *          type: object
 *          properties:
 *            totalItems:
 *              type: number
 *            items:
 *              type: array
 *              items:
 *                $ref: "#/definitions/Volume"
 */
route.get('/', bookSearchValidations, validate, searchBooks);

/**
 * @swagger
 * /books/recommendations:
 *  get:
 *    tags:
 *    - "book"
 *    summary: get a list of recomendations to the user
 *    description: get a list of recomendations to the user
 *    parameters:
 *      - in: query
 *        name: category
 *        schema:
 *          type: string
 *        description: A categorie of books to get recomendations from
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.get('/recommendations', checkJwtOrIgnore, getRecommendBooksToUser);

/**
 * @swagger
 * /books/popular:
 *  get:
 *    tags:
 *    - "book"
 *    summary: get a list of popular to the user
 *    description: get a list of popular to the user
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.get('/popular', checkJwtOrIgnore, getPopularBooks);

/**
 * @swagger
 * /books/{bookId}:
 *  parameters:
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *      required: true
 *      description: the id of a book
 *    - in: query
 *      name: rid
 *      schema:
 *        type: string
 *      description: recommendation id
 *    - in: query
 *      name: short
 *      schema:
 *        type: boolean
 *      allowEmptyValue: true
 *      default: false
 *      description: if true send only book info, rating and no recomendations
 *  get:
 *    tags:
 *    - "book"
 *    summary: get a book info
 *    description: get a book info
 *    parameters:
 *    responses:
 *      '200':
 *        description: Success!
 *        schema:
 *          $ref: "#/definitions/Book"
 *    security:
 *      - bearerAuth: []
 */
route.get('/:bookId', checkJwtOrIgnore, getBookValidations, validate, getBook);
export default route;
