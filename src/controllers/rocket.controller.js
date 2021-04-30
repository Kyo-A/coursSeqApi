const rocket = require("../models").rocket;
const db = require("../models");
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: rockets } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, rockets, totalPages, currentPage };
};

module.exports = {

    async getPagingRockets(req, res) {

        const { page, size, organisation } = req.query;
        var condition = organisation ? { organisation: { [Op.like]: `%${organisation}%` } } : null;
        const { limit, offset } = getPagination(page, size);

        rocket.findAndCountAll({ where: condition, limit, offset })
            .then(data => {
                const response = getPagingData(data, page, limit);
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });

    },

    async getRockets(req, res) {
        rocket.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving rockets."
                });
            });

    },

    async createRocket(req, res) {

        if (!req.body.nom) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        rocket.create({
            nom: req.body.nom,
            annee_fab: req.body.annee_fab,
            organisation: req.body.organisation,
            password: req.body.destination
        }).then(data => {
            res.send(data);
        })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Rocket."
                });
            });

    },

    async getRocketById(req, res) {

        const id = req.params.id;

        rocket.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.send({
                        message: `Cannot update Rocket with id=${id}. Maybe Rocket was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Rocket with id=" + id
                });
            })
    },

    async updateRocket(req, res) {
        const id = req.params.id;

        rocket.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Rocket was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Rocket with id=${id}. Maybe Rocket was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating User with id=" + id
                });
            });
    },

    async deleteRocket(req, res) {
        const id = req.params.id;

        rocket.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Rocket was deleted successfully!"
                    });
                } else {
                    res.send({
                        message: `Cannot delete Rocket with id=${id}. Maybe Rocket was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Rocket with id=" + id
                });
            });

    },

    async deleteAll(req, res) {

        rocket.destroy({
            where: {},
            truncate: false
        })
            .then(nums => {
                res.send({ message: `${nums} Rockets were deleted successfully!` });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Rocket with id=" + id
                });
            });

    }
}