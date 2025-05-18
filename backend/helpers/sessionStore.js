import path from 'path';
import SQLiteStore from 'better-express-store';
// import MySQLStore from 'express-mysql-session';
// import MongoDBStore from 'connect-mongodb-session';
import PathFinder from '../helpers/PathFinder.js';


// choose the correct sessionStore depending on DB
export default function sessionStore(settings, _session) {
  let dbPath = settings.dbPath;
  if (settings.dbType === 'SQLite') {
    let dbAbsPath = globalThis.orgBackendFolder ? // from react-rapide
      path.join(globalThis.orgBackendFolder, dbPath) :
      PathFinder.relToAbs('../' + dbPath);
    return SQLiteStore({
      dbPath: PathFinder.relToAbs(dbAbsPath),
      deleteAfterInactivityMinutes: 120
    });
  }
  /*else if (settings.dbType === 'MySQL') {
    const { dbHost: host, dbPort: port, dbUser: user,
      dbPassword: password, dbDatabase: database } = settings;
    return new (MySQLStore(session))({
      host, port, user, password, database
    });
  }
  else if (settings.dbType === 'MongoDB') {
    return new (MongoDBStore(session))({
      uri: settings.mongoDbConnectionURI,
      databaseName: settings.mongoDbDatabase,
      collection: 'sessions'
    });
  }*/
}