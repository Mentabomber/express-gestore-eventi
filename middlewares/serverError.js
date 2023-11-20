// Gestiamo eventuali errori 404 e 500 tramite dei middleware dedicati.

module.exports = (err, req, res, next) => {
    res.format({
        
        default: () => {
            res.status(500).send("server error " + err.message);
        }})
      
 
}

