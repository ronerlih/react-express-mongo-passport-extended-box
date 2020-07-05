## Readme.. TBD

* index.js : entry point, set up dev env vars and other config before starting server, run server.

* server.js parts by order (mainly):
   * express
   * mongoose 
   * session storage (for user authentication) + hanler in scripts.
   * request body parsing middlewere (json, urlencoded)
   * serving static files
   * routes
   * serve react app (last result to pick up request)
   * error handling middleware (handler in scripts)
   * connection to db
   * listen to port (server starts)
  
  * coverall specs 

  * travis

  * jest client and express

  * folder structure

  * env vars (session pass)

  * 

  --- added
  * morgan custom log

  **add crypto env locally and remotely**
CRYPTO_SALT=d931ea313942dfa0df363983b044dae9
CRYPTO_PASS=sa%%m__2e%!ma'!mak#ss
CRYPTO_ALGO=aes256

* supertest session
* supertest user controller