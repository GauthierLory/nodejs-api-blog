module.exports = {
    async error404(request, response){
        response.status(404).json({
            error: {
                message: "Ressource not found",
                url: request.url,
                method: request.method
            }
        })
    },

    // Pour la gestion d'erreur express utilise aussi les middleware
    // Mais des middlewares différents des autres.
    // Les middlewares de gestion d'erreur doivent avoir exactement
    // 4 param.
    // Le premier est un objet contenant les informations sur l'erreur
    // le reste est constitué des param. classique des middleware
    // Pour "tomber" dans ce middleware il faut appelercreate db  next() depuis un autre
    // en lui passant un argument.
    // Cet argument deviendra le premier param. de notre middleware
    async error500(error, _, response, __) {
        response.status(500).json({
            error: {
                message: "Fatal error",
                messageDetail: error.message,
                infos: error
            }
        })
    },
}