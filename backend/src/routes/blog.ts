import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

interface JwtPayload {
    id: string;
}

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();
//bookRouter: This creates a new router using the Hono framework, which handles requests for the /books routes.
// The Bindings object contains environment variables:
// DATABASE_URL: The URL to your database.
// JWT_SECRET: The secret used to sign the JWT token.
// The Variables object is used to store variables like userId, which is set in the middleware and accessed in the routes.
//set and get are use to pass userid in context(c) in middleware and later can be used in later routes.
blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload || typeof payload !== 'object' || !('id' in payload)) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
    const jwtPayload = payload as unknown as JwtPayload;
	c.set('userId', jwtPayload.id);
	await next()
});
//JWT Middleware:
// Extract the JWT: The middleware looks for the Authorization header in the request and checks if it's there. If it is missing, it returns a 401 Unauthorized response.
// Token Parsing: If the Authorization header is present, it splits the value (which should be in the format Bearer <token>) and extracts the actual token.
// Verify the Token: The verify function is used to validate and decode the token. It uses the JWT_SECRET environment variable to verify the token's signature. The result (payload) is the decoded JWT.
// Payload Check: The payload is checked to ensure it is an object and contains an id field. If not, the middleware responds with a 401 Unauthorized error.
// Type Casting: The payload is then cast to the JwtPayload interface (this is safe because we've verified that it contains the id).
// Setting userId: Finally, the userId (from jwtPayload.id) is set in the context, so it can be used in the routes that follow.
// Next Middleware: Calls await next() to continue processing the request.

blogRouter.post('/create', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	const body = await c.req.json();

	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})
//Route Handler:
// This route creates a new post.
// Extract userId: It retrieves the userId set earlier by the middleware (this represents the authenticated user).
// Prisma Client: A new instance of PrismaClient is created to interact with the database. The datasourceUrl is passed from the environment variable.
// Request Body: The body of the request is parsed to get the title and content of the post.
// Create Post: The prisma.post.create method is called to create a new post in the database with the title, content, and the authorId (which is the userId).
// Response: Once the post is created, the id of the new post is returned in the response as JSON

blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});
//This route updates an existing post.
// Extract userId: The userId is retrieved from the context, as before.
// Prisma Client: A new instance of PrismaClient is created to interact with the database.
// Request Body: The body is parsed to get the id, title, and content of the post to be updated.
// Update Post: The prisma.post.update method is called to update the post in the database. It finds the post by id and checks that the authorId matches the userId to ensure the user is authorized to update the post.
// Response: After updating the post, a plain text message 'updated post' is returned.

blogRouter.get('/one/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate()); //ithAccelerate() could be adding some performance accelerators, like connection pooling or query caching, to PrismaClient.
	//$extends is a feature that allows you to customize the PrismaClient by adding or modifying the methods, middlewares, and other behaviors.
	//c.env?.DATABASE_URL is using optional chaining (?.) to access the DATABASE_URL from the environment configuration c.env. This suggests that the connection string (URL) for the database is stored in an environment variable (DATABASE_URL), and this code is using it to configure the PrismaClien
	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	console.log('Fetching posts...111');

    // Fetch multiple posts from the database
    const posts = await prisma.post.findMany();
    console.log('Fetched posts:', posts);
    // Return the posts as a JSON response
    return c.json(posts);
});

//This route fetches a post by its id.
// Extract Post ID: The id parameter is extracted from the URL using c.req.param('id').
// Prisma Client: A new instance of PrismaClient is created to interact with the database.
// Find Post: The prisma.post.findUnique method is called to find a unique post by id.
// Response: The post data is returned as a JSON response.