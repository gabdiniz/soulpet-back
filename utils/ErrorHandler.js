function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(409).json({
      message: `Esse(a) ${Object.keys(err.fields)[0]} já está cadastrado.`,
      hora: new Date(),
      rota: req.path
    });
  }
  else if (err.name === 'SequelizeConnectionError') {
    res.status(503).json({
      message: "Não foi possível conectar ao banco de dados.",
      hora: new Date(),
      rota: req.path
    });
  }
  else if (err.name === 'SequelizeTimeoutError') {
    res.status(408).json({
      message: "A operação excedeu o tempo limite.",
      hora: new Date(),
      rota: req.path
    });
  }
  else if (err.name === 'SequelizeValidationError') {
    res.status(400).json({
      message: "Os dados fornecidos são inválidos.",
      hora: new Date(),
      rota: req.path
    });
  }
  else if (err.name === 'SequelizeDatabaseError') {
    res.status(500).json({
      message: "Ocorreu um erro no banco de dados.",
      hora: new Date(),
      rota: req.path
    });
  }
  else if (err.name === 'SequelizeForeignKeyConstraintError') {
    res.status(400).json({
      message: "O registro que você tentou acessar não existe ou foi excluído.",
      hora: new Date(),
      rota: req.path
    });
  }
  else if (err.name === 'SequelizeExclusionConstraintError') {
    res.status(400).json({
      message: "Não foi possível excluir o registro solicitado devido a restrições de exclusão.",
      hora: new Date(),
      rota: req.path
    });
  }
  else if (err.name === 'SequelizeAccessDeniedError') {
    res.status(403).json({
      message: "Você não tem permissão para acessar este recurso.",
      hora: new Date(),
      rota: req.path
    });
  }
  else if (err.name === 'SequelizeEmptyResultError') {
    res.status(404).json({
      message: "Não foi possível encontrar o registro solicitado.",
      hora: new Date(),
      rota: req.path
    });
  }
  else {
    res.status(500).json({
      message: "Ocorreu um erro interno no servidor.",
      hora: new Date(),
      roda: req.path
    })
  }
}

module.exports = errorHandler;