import express, {Application, Request, Response} from 'express'

const app: Application = express()
const PORT: number = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(PORT, (error: void) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // @ts-ignore
    error ? console.error(error) : console.log(`App listening on port ${PORT}`)
})
