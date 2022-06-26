import { DataTypes, Model } from 'sequelize';
import db from '../../../data-access/db.js';

class Group extends Model {}

const GroupModel = Group.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING(255)),
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'groups',
    timestamps: false,
    paranoid: true
});

export default GroupModel;
