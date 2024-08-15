import express from "express"
const router = express.Router();
import { getProjects, getUserProjects, getSavedProjects, createProject, shareProject, shareProjectInGroups, saveProject, saveProjectInCollections, updateProject, likeProject, commentProject, deleteProject, deleteProjectCollection, getLikedProjects, } from "../controllers/project.js"
import { verifyToken } from "../middleware/auth.js"


router.get('/get/all', getProjects)
router.get('/get/user/:userId', verifyToken, getUserProjects)
router.get('/get/saved', verifyToken, getSavedProjects)    // get logged user' saved projects
router.get('/get/liked', verifyToken, getLikedProjects)    // get logged user' liked projects

router.post('/create', verifyToken, createProject)

router.put('/update/:projectId', verifyToken, updateProject)
router.put('/like/:projectId', verifyToken, likeProject)
router.put('/save/:projectId', verifyToken, saveProject)
router.put('/save-in-collections/:projectId', verifyToken, saveProjectInCollections)
router.put('/share/:projectId', verifyToken, shareProject)
router.put('/share-in-groups/:projectId', verifyToken, shareProjectInGroups)
router.put('/comment/:projectId', verifyToken, commentProject)

router.delete('/delete/:projectId', verifyToken, deleteProject)
router.delete('/delete-collection', verifyToken, deleteProjectCollection)


export default router