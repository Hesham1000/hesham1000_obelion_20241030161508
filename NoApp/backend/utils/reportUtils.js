const Sequelize = require('sequelize');
const { Task } = require('../models/TaskModel');

const sequelize = new Sequelize('NoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

const fetchUpcomingTasks = async () => {
  try {
    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 86400000); // 24 hours in milliseconds

    const tasks = await Task.findAll({
      where: {
        dueDate: {
          [Sequelize.Op.gt]: now,
          [Sequelize.Op.lte]: oneDayFromNow,
        },
      },
    });

    return tasks;
  } catch (error) {
    throw new Error('Error fetching tasks: ' + error.message);
  }
};

module.exports = {
  fetchUpcomingTasks,
};
