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
        unique: true,
        primaryKey: true
    },
    group_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true
    }
}, {
    sequelize: db,
    tableName: 'user_group',
    timestamps: false,
    freezeTableName: true
});

userModel.belongsToMany(groupModel, { through: 'user_group', foreignKey: 'user_id', timestamps: false });
groupModel.belongsToMany(userModel, { through: 'user_group', foreignKey: 'group_id', timestamps: false });

export default UserGroupModel;
