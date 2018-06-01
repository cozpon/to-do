module.exports = function(sequelize, DataType) {
  const ToDo = sequelize.define('ToDo', {
    name : {
      type : DataType.STRING,
      allowNull : false
    },
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
    tableName : 'ToDos'
  });

  ToDo.associate = function(models){
    ToDo.belongsTo(models.User, {
      foreignKey : "user_id",
      as : 'User'
    });
  };

  return ToDo;
};