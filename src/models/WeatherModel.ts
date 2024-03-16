import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: true,
    tableName: "Weather"
}) 

export class WeatherModel extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: String;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!: String;
}