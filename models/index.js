import UserModel from '../src/api/user/models/user.model.js';
import GroupModel from '../src/api/group/models/group.model.js';
import UserGroup from '../src/api/userGroup/models/userGroup.model.js';

UserModel.belongsToMany(GroupModel, { through: UserGroup });
GroupModel.belongsToMany(UserModel, { through: UserGroup });

export default {
    UserModel,
    GroupModel,
    UserGroup
};
