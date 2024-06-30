import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getNextHour } from "../utils/getNextHour";

const prisma = new PrismaClient();

export const getDevices = async (req: Request, res: Response) => {
    const { email } = req.body;    
    const devices = await prisma.device.findMany();
    res.json(devices);
};

export const getHour = async (req: Request, res: Response) => {
    const { id } = req.params;

    const device = await prisma.device.findFirst({ where: { id } });

    if (!device) {
        return res.status(404).json({ error: "Device not found" });
    }

    const horario = getNextHour(device.hourFeed);
    res.json({ horario  , doorTime : device.doorTime});
};

export const getDevice = async (req: Request, res: Response) => {
    const { email } = req.params;
   
    const device = await prisma.device.findMany({ where: { email } });
    if (device) {
        res.json(device);
    } else {
        res.status(404).json({ error: "Device not found" });
    }
};

export const getDeviceById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const device = await prisma.device.findFirst({ where: { id } });
    if (device) {
        res.json(device);
    } else {
        res.status(404).json({ error: "Device not found" });
    }
};

export const createDevice = async (req: Request, res: Response) => {
    const { name, description, email, image, hourFeed, doorTime } = req.body;

    const newDevice = await prisma.device.create({
        data: {
            name,
            description,
            email,
            image,
            hourFeed,
            doorTime,
            amountFood: "VAZIO",
        },
    });

    res.status(201).json(newDevice);
};

export const updateDevice = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, image, hourFeed, doorTime } = req.body;

    const updatedDevice = await prisma.device.update({
        where: { id },
        data: {
            name,
            description,
            image,
            hourFeed,
            doorTime,
        },
    });

    res.json(updatedDevice);
};

export const deleteDevice = async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.device.delete({ where: { id } });

    res.status(204).end();
};
