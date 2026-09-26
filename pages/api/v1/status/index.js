import database from "../../../../infra/database.js";

async function status(request, response) {
  // consultando a versao do banco de dados
  const databaseResult = await database.query("SELECT version()");
  // Pegando a primeira linha, no objeto version
  const databaseVersion = databaseResult.rows[0].version;
  // Formatado a String do banco de dados
  const databaseVersionFormated = databaseVersion.slice(11, 15);
  // Pegando o maximo de conexoes do banco de dados
  const databaseMaxConnectionResponse = await database.query(
    "SHOW max_connections",
  );
  const databaseMaxConnection =
    databaseMaxConnectionResponse.rows[0].max_connections;
  // Views do Db Estatisticas
  const databaseName = process.env.POSTGRES_DB;
  const dataBaseOpenConnectionsResponse = await database.query({
    text: "Select count(*)::int from pg_stat_activity where datname = $1;",
    values: [databaseName],
  });
  const dataBaseOpenConnections = dataBaseOpenConnectionsResponse.rows[0].count;
  console.log(dataBaseOpenConnections);
  // const msgLeozinho = request.query.leozinhoParameter;
  // console.log(msgLeozinho);

  const updatedAt = new Date().toISOString();
  response.status(200).json({
    updatedAt: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionFormated,
        max_connections: Number(databaseMaxConnection),
        dataBaseOpenConnections: dataBaseOpenConnections,
      },
    },
  });
}

export default status;
