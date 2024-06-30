import * as express from "express";
import * as bodyParser from "body-parser";
import deviceRoutes from "./routes/deviceRoutes";
import * as cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())
app.use("/devices", deviceRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
