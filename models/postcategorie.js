module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', 
    {},
    { timestamps: false, tableName: 'PostsCategories' });

  PostCategorie.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogposts',
      through: PostCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategorie;
};