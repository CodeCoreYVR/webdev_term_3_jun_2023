fetch("http://localhost:3000/api/v1/products")
      .then(response => response.json())
      .then(console.log)
