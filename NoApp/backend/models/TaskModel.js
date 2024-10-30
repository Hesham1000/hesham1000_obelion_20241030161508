const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('NoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

class Task extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true
        }
      }
    }, {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: false
    });
  }
}

Task.init(sequelize);

module.exports = Task;
