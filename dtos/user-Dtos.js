module.exports = class userDto {
  email;
  id;
  rol;
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.rol = model.rol;
  }
};
