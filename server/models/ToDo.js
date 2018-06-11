module.exports = function(sequelize, DataType) {
  const ToDo = sequelize.define('ToDo', {
    description : {
      type : DataType.STRING,
      allowNull : false
    },
    deletedAt : {
      type : DataType.DATE,
      allowNull : true
    }
  },
  {
    tableName : 'ToDo'
  });

  ToDo.associate = function(models){
    ToDo.belongsTo(models.ToDoStatus, {
      foreignKey : "is_done",
      as : 'Status'
    });
    ToDo.belongsTo(models.User, {
      foreignKey : "user_id",
      as : 'Creator'
    });
  };

  return ToDo;
};