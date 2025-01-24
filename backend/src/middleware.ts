//Middleware is code that is executed during the lifecycle of an HTTP request, typically before a request handler (route) is executed
export function initMiddleware(app) { //app is presumably a Hono application or an instance of a web framework.
    app.use('/api/v1/blog/*', async (c, next) => {
        //The context object, which contains information about the request (like headers, body, and parameters). //adds a middleware to the app that will match all routes starting with /api/v1/blog/ and will run whenever an HTTP request is made to those routes.
        const header = c.req.header("authorization") || "";
        console.log(header)
        // Bearer token => ["Bearer", "token"];
        const token = header.split(" ")[1]
        
        // @ts-ignore
        const response = await verify(token, c.env.JWT_SECRET)
        if (response.id) {
          next()
        } else {
          c.status(403)
          return c.json({ error: "unauthorized" })
        }
      })
      
}