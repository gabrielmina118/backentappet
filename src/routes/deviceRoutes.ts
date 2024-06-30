import { Router } from "express";
import {
    getDevices,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    getDeviceById,
    getHour,
} from "../controllers/deviceController";

const router = Router();

router.get("/", getDevices);
router.get("/proximo-horario/:id",getHour)
router.get("/:email", getDevice);
router.get("/getByid/:id", getDeviceById);
router.post("/create", createDevice);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);

export default router;
