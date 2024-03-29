
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Workspace extends Model {
  user() {
    return this.belongsTo('App/Models/User', 'userId', 'id');
  }
}

module.exports = Workspace;
