@app
begin-app

@static
folder build

@http
get /https://jsonplaceholder.typicode.com/todos/1

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
