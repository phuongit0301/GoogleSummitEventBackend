const Group = require('../models/group-model');
const jsonResponse = require('../config/mockData');

createGroup = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a group',
        })
    }

    const group = new Group(body)

    if (!group) {
        return res.status(400).json({ success: false, error: err })
    }

    group
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: group._id,
                message: 'Group created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Group not created!',
            })
        })
}

updateGroup = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Group.findOne({ _id: req.params.id }, (err, group) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Group not found!',
            })
        }
        group.isUsed = body.isUsed;
        if(body.name) {
            group.name = body.name;
        }
        group
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: group._id,
                    message: 'Group updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Group not updated!',
                })
            })
    })
}

updateAllGroup = async (req, res) => {
    // const body = req.body

    // if (!body) {
    //     return res.status(400).json({
    //         success: false,
    //         error: 'You must provide a body to update',
    //     })
    // }

    const query = { isUsed: true };
    var valueUpdate = {$set: {isUsed: false} };
    Group.updateMany(query, valueUpdate, (err, group) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Group not found!',
            })
        }
 
        return res.status(200).json({
            success: true,
            message: 'Group updated!',
        })
    })
}

deleteGroup = async (req, res) => {
    await Group.findOneAndDelete({ _id: req.params.id }, (err, group) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!group) {
            return res
                .status(404)
                .json({ success: false, error: `Group not found` })
        }

        return res.status(200).json({ success: true, data: group })
    }).catch(err => console.log(err))
}

getGroupById = async (req, res) => {
    await Group.findOne({ _id: req.params.id }, (err, group) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!group) {
            return res
                .status(404)
                .json({ success: false, error: `Group not found` })
        }
        return res.status(200).json({ success: true, data: group })
    }).catch(err => console.log(err))
}

getGroups = async (req, res) => {
    await Group.find({}, (err, groups) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!groups.length) {
            return res
                .status(404)
                .json({ success: false, error: `Group not found` })
        }
        jsonResponse.data.groups = groups;
        return res.status(200).json({ success: true, data: jsonResponse })
    }).catch(err => console.log(err))
}

socketGetGroups = async () => {
    const groups = await Group.find({}).catch(err => {
        return {
            error: true,
            message: err
        }
    });
    return {
        error: false,
        message: 'Get groups successfully',
        groups: groups
    }
}

module.exports = {
    createGroup,
    updateGroup,
    deleteGroup,
    getGroups,
    getGroupById,
    updateAllGroup,
    socketGetGroups
}