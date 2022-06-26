import { DataTypes } from 'sequelize';
import db from '../../../data-access/db.js';

const UserGroup = db.define('userGroup', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userIds: {
        type: DataTypes.STRING(255)
    },
    groupId: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'userGroup',
    timestamps: false
});

export default UserGroup;
