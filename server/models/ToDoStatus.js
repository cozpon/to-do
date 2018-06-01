module.exports = function(sequelize, DataType) {
  const ToDoStatus = sequelize.define('ToDoStatus', {
    done : {
      type : DataType.STRING,
      allowNull : false
    }
  },
  {
    tableName : 'ToDoStatus'
  });

  ToDoStatus.associate = function(models) {
    ToDoStatus.hasOne(models.ToDo, {
      foreignKey : 'is_done'
    });
  };

  return ToDoStatus;
};