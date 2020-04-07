/**
 * @author {[Monty Khanna]}
 */
let path = '';
 if (process.env.NODE_ENV === 'development') {
    path = 'http://0.0.0.0:4000';
 } else {
    path = 'https://getting-react.herokuapp.com/' + process.env.PORT
 }

export default {
    apiPath: path
};
