@app
hyp

@static
folder build

@http
get /login
get /https://github.com/login

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
