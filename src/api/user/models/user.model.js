import { DataTypes, Model } from 'sequelize';

import db from '../../../data-access/db.js';

class User extends Model {}

const UserModel = User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isDeleted: {
        field: 'is_deleted',
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: db,
    tableName: 'users',
    timestamps: false
});

export default UserModel;
