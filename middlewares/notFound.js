// Gestiamo eventuali errori 404 e 500 tramite dei middleware dedicati.

module.exports = (req, res, next) => {
    res.format({
      
        default: () => {
            res.status(404).send("Oops mi sa che ti sei perso");
        }})
      
 
}

