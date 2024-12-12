
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      }


    });
    
    //making the conection with Post and Users
    // Users.associate = (models) => {
    //     Users.hasMany(models.Posts, {
    //     onDelete: 'cascade', 
    //   });

    // }

  
    return Users;
  };
  