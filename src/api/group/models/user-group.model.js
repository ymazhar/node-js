import { DataTypes, Model } from 'sequelize';
import db from '../../../data-access/db.js';
import userModel from '../../user/models/user.model.js';
import groupModel from './group.model.js';

class UserGroup extends Model {
}

const UserGroupModel = UserGroup.init({
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    },
    group_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true
    }
}, {
    sequelize: db,
    tableName: 'user_group',
    timestamps: false,
    freezeTableName: true
});

userModel.belongsToMany(groupModel, { through: UserGroupModel });
groupModel.belongsToMany(userModel, { through: UserGroupModel });

export default UserGroupModel;
