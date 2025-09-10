// Global settings
Globals = Obj(new
{
    debugOn = true,
    detailedAclDebug = false,
    aclOn = true,
    isSpa = true,
    port = 5001,
    serverName = "Minimal API Backend",
    frontendPath = args[0],
    dbPath = args[1],
    sessionLifeTimeHours = 2
});

Server.Start();