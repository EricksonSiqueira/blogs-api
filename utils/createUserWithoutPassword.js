const createUserWithoutPassword = ({ id, displayName, email, image }) => ({
    id,
    displayName,
    email,
    image,
  });

module.exports = createUserWithoutPassword;
