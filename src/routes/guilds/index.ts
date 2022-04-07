import { Router } from "express";
import {getGuildController, getGuildPermissionsController, getGuildsController, getIdController} from "../../controllers/guilds";
import { isAuthenticated } from "../../utils/middlewares";
const router = Router();

router.get('/', isAuthenticated, getGuildsController);

router.get('/:id/permissions', isAuthenticated, getGuildPermissionsController);


router.get('/:id', isAuthenticated, getGuildController)


router.get('/final', isAuthenticated, getIdController)


export default router;