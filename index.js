
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const express = require("express")
const app = express()

app.use(express.json())

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: "1.0.0"
        },
        consumes: ["application/json"],
        servers: ["http://localhost:3000/"]
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

let contacts = [{"name": "Damian"}, {"name": "Diana"}]

app.get("/", (req, res) => {
    res.send("Hello World!")
})

/**
 * @swagger
 * /contacts:
 *  get:
 *      description: Get list of contacts
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: List of Contacts
 *              schema:
 *                  type: array
 *                  items:
 *                      type: string
 */
app.get("/contacts", (req, res) => {
    res.send(contacts)
})

/**
 * @swagger
 * /contacts:
 *  post:
 *      description: Create a new contact
 *      content: application/json
 *      parameters:
 *          - in: body
 *            name: name
 *            required: true
 *            example: {"name": "Lukas"}
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      example: Lukas
 *  responses:
 *      200:
 *          description: Successfully created
 *
 */
app.post("/contacts", (req, res) => {
    contacts.push({"name": req.body.name})
    res.send(`added ${req.body.name} to contacts`)
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))


app.listen(3000, () => {
    console.log("Listening on 0.0.0.0:3000")
})