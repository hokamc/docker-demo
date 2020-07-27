import { Request, Response } from "express";

interface HelloResponse {
    name: string;
}

const createHello = (name: string) : HelloResponse => {
    return {
        name: name
    };
}

export const rootHandler = (_: Request, res: Response) => {
    res.send('Root');
}

export const helloHandler = (req: Request, res: Response) => {
    const name = req.query.name as string || "guest";
    res.send(createHello(name));
}