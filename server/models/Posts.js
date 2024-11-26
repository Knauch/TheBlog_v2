
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    
    //making the conection with Post and COmments
    Posts.associate = (models) => {
      Posts.hasMany(models.Comments, {
        onDelete: 'cascade', //if deleting a POST will delete all the comments for that post
      });

    }

  
    return Posts;
  };
  